import { test, expect, type Page, type BrowserContext } from "@playwright/test";
import * as fs from "fs";
import * as path from "path";

const SCREENSHOT_DIR = path.resolve(
  __dirname,
  "../../test-results/responsive-screenshots"
);

const VIEWPORTS = [
  { name: "mobile-s", width: 320, height: 568, isMobile: true },
  { name: "mobile-m", width: 375, height: 667, isMobile: true },
  { name: "mobile-l", width: 430, height: 932, isMobile: true },
  { name: "tablet", width: 768, height: 1024, isMobile: false },
  { name: "laptop", width: 1280, height: 800, isMobile: false },
  { name: "desktop", width: 1920, height: 1080, isMobile: false },
] as const;

interface Finding {
  severity: "critical" | "warning" | "info";
  viewport: string;
  check: string;
  message: string;
  file?: string;
  line?: number;
}

const findings: Finding[] = [];

function addFinding(
  severity: "critical" | "warning" | "info",
  viewport: string,
  check: string,
  message: string,
  file?: string,
  line?: number
) {
  findings.push({ severity, viewport, check, message, file, line });
}

async function waitForFullLoad(page: Page) {
  await page.waitForLoadState("networkidle");
  await page.waitForTimeout(1500);
}

async function checkHorizontalOverflow(page: Page, viewport: string) {
  const result = await page.evaluate(() => {
    const doc = document.documentElement;
    const hasOverflow = doc.scrollWidth > doc.clientWidth;
    const overflowPx = doc.scrollWidth - doc.clientWidth;
    const bodyOverflow = document.body.scrollWidth > document.body.clientWidth;
    return {
      hasOverflow,
      overflowPx,
      bodyOverflow,
      scrollWidth: doc.scrollWidth,
      clientWidth: doc.clientWidth,
      bodyScrollWidth: document.body.scrollWidth,
      bodyClientWidth: document.body.clientWidth,
    };
  });

  if (result.hasOverflow) {
    addFinding(
      "critical",
      viewport,
      "horizontal-overflow",
      `Horizontal scrollbar detected: scrollWidth=${result.scrollWidth}px > clientWidth=${result.clientWidth}px (overflow: ${result.overflowPx}px). body: scrollWidth=${result.bodyScrollWidth}px, clientWidth=${result.bodyClientWidth}px`
    );
  } else {
    addFinding(
      "info",
      viewport,
      "horizontal-overflow",
      `No horizontal overflow (scrollWidth=${result.scrollWidth}px, clientWidth=${result.clientWidth}px)`
    );
  }
  return result;
}

async function checkOverflowingContent(page: Page, viewport: string) {
  const overflowingElements = await page.evaluate(() => {
    const results: Array<{
      tag: string;
      className: string;
      overflowPx: number;
      rect: string;
    }> = [];
    const allElements = document.querySelectorAll("*");
    for (const el of allElements) {
      const htmlEl = el as HTMLElement;
      if (htmlEl.offsetParent === null && htmlEl.style.position !== "fixed") continue;
      const rect = htmlEl.getBoundingClientRect();
      if (rect.right > window.innerWidth + 2) {
        results.push({
          tag: htmlEl.tagName.toLowerCase(),
          className: htmlEl.className.toString().slice(0, 80),
          overflowPx: Math.round(rect.right - window.innerWidth),
          rect: `${Math.round(rect.left)},${Math.round(rect.top)} ${Math.round(rect.width)}x${Math.round(rect.height)}`,
        });
      }
    }
    return results.slice(0, 15);
  });

  for (const el of overflowingElements) {
    addFinding(
      "warning",
      viewport,
      "content-overflow",
      `Element overflows right edge by ${el.overflowPx}px: <${el.tag} class="${el.className}"> at ${el.rect}`
    );
  }

  if (overflowingElements.length === 0) {
    addFinding("info", viewport, "content-overflow", "No content overflowing right edge");
  }
}

async function checkImagesInContainers(page: Page, viewport: string) {
  const overflowingImages = await page.evaluate(() => {
    const results: Array<{
      src: string;
      naturalWidth: number;
      naturalHeight: number;
      containerOverflow: boolean;
    }> = [];
    const images = document.querySelectorAll("img");
    for (const img of images) {
      const htmlImg = img as HTMLImageElement;
      const parent = htmlImg.parentElement;
      if (!parent) continue;
      const imgRect = htmlImg.getBoundingClientRect();
      const parentRect = parent.getBoundingClientRect();
      const overflowing = imgRect.width > parentRect.width + 5 || imgRect.height > parentRect.height + 5;
      results.push({
        src: htmlImg.src.split("/").pop() || "unknown",
        naturalWidth: htmlImg.naturalWidth,
        naturalHeight: htmlImg.naturalHeight,
        containerOverflow: overflowing,
      });
    }
    return results;
  });

  for (const img of overflowingImages) {
    if (img.containerOverflow) {
      addFinding(
        "warning",
        viewport,
        "image-overflow",
        `Image "${img.src}" overflows its container (natural: ${img.naturalWidth}x${img.naturalHeight})`
      );
    }
  }

  addFinding(
    "info",
    viewport,
    "image-overflow",
    `Checked ${overflowingImages.length} images, ${overflowingImages.filter((i) => i.containerOverflow).length} overflowing`
  );
}

async function checkTextReadability(page: Page, viewport: string) {
  const tinyText = await page.evaluate(() => {
    const results: Array<{
      tag: string;
      className: string;
      fontSize: number;
      text: string;
    }> = [];
    const textElements = document.querySelectorAll("p, span, a, h1, h2, h3, h4, h5, h6, li, button, label");
    for (const el of textElements) {
      const htmlEl = el as HTMLElement;
      if (htmlEl.offsetParent === null && htmlEl.style.position !== "fixed") continue;
      const computed = window.getComputedStyle(htmlEl);
      const fontSize = parseFloat(computed.fontSize);
      if (fontSize < 10 && htmlEl.textContent?.trim()) {
        results.push({
          tag: htmlEl.tagName.toLowerCase(),
          className: htmlEl.className.toString().slice(0, 60),
          fontSize,
          text: htmlEl.textContent.trim().slice(0, 40),
        });
      }
    }
    return results.slice(0, 10);
  });

  for (const el of tinyText) {
    addFinding(
      "warning",
      viewport,
      "text-readability",
      `Tiny text (${el.fontSize}px) on <${el.tag}>: "${el.text}"`
    );
  }

  if (tinyText.length === 0) {
    addFinding("info", viewport, "text-readability", "All text is >= 10px");
  }
}

async function checkNavbarOverlap(page: Page, viewport: string) {
  const overlapResult = await page.evaluate(() => {
    const nav = document.querySelector(".portfolio-nav") || document.querySelector("header");
    if (!nav) return { found: false, overlap: false };
    const navRect = nav.getBoundingClientRect();
    const navBottom = navRect.bottom;

    const sections = document.querySelectorAll("section");
    for (const section of sections) {
      const sectionEl = section as HTMLElement;
      const rect = sectionEl.getBoundingClientRect();
      if (rect.top < navBottom && rect.top > navRect.top) {
        const overlapPx = navBottom - rect.top;
        if (overlapPx > 2 && sectionEl.id !== "top" && !sectionEl.classList.contains("illustrated-hero")) {
          return {
            found: true,
            overlap: true,
            sectionId: sectionEl.id || sectionEl.className.slice(0, 50),
            overlapPx: Math.round(overlapPx),
          };
        }
      }
    }
    return { found: true, overlap: false };
  });

  if (overlapResult.found && overlapResult.overlap) {
    addFinding(
      "warning",
      viewport,
      "navbar-overlap",
      `Navbar overlaps section "#${overlapResult.sectionId}" by ${overlapResult.overlapPx}px`
    );
  } else if (overlapResult.found) {
    addFinding("info", viewport, "navbar-overlap", "No navbar-content overlap detected");
  } else {
    addFinding("info", viewport, "navbar-overlap", "No header/nav element found");
  }
}

async function checkModalFit(page: Page, viewport: string) {
  const modalExists = await page.$(".project-modal-backdrop");
  if (!modalExists) {
    addFinding("info", viewport, "modal-fit", "No modal open to check (by design - modal requires user interaction)");
    return;
  }

  const modalFit = await page.evaluate(() => {
    const card = document.querySelector(".project-modal-card");
    if (!card) return null;
    const htmlCard = card as HTMLElement;
    const rect = htmlCard.getBoundingClientRect();
    return {
      width: rect.width,
      height: rect.height,
      fitsWidth: rect.width <= window.innerWidth,
      fitsHeight: rect.height <= window.innerHeight,
      viewportWidth: window.innerWidth,
      viewportHeight: window.innerHeight,
    };
  });

  if (modalFit && (!modalFit.fitsWidth || !modalFit.fitsHeight)) {
    addFinding(
      "critical",
      viewport,
      "modal-fit",
      `Modal (${Math.round(modalFit.width)}x${Math.round(modalFit.height)}) exceeds viewport (${modalFit.viewportWidth}x${modalFit.viewportHeight})`
    );
  } else if (modalFit) {
    addFinding(
      "info",
      viewport,
      "modal-fit",
      `Modal fits within viewport (${Math.round(modalFit.width)}x${Math.round(modalFit.height)} in ${modalFit.viewportWidth}x${modalFit.viewportHeight})`
    );
  }
}

async function checkMobileMenu(page: Page, viewport: string, isMobile: boolean) {
  if (!isMobile) {
    addFinding("info", viewport, "mobile-menu", "Desktop viewport - mobile menu not expected");
    return;
  }

  const menuButton = await page.$(".nav-menu-button");
  if (!menuButton) {
    addFinding("warning", viewport, "mobile-menu", "Mobile menu button not found");
    return;
  }

  const isVisible = await menuButton.isVisible();
  addFinding("info", viewport, "mobile-menu", `Mobile menu button visible: ${isVisible}`);

  if (isVisible) {
    await menuButton.click();
    await page.waitForTimeout(500);

    const drawer = await page.$(".mobile-navigation.is-open");
    if (drawer) {
      addFinding("info", viewport, "mobile-menu", "Mobile menu drawer opens correctly");

      const drawerOverflow = await page.evaluate(() => {
        const nav = document.querySelector(".mobile-navigation.is-open");
        if (!nav) return null;
        const htmlNav = nav as HTMLElement;
        const rect = htmlNav.getBoundingClientRect();
        return {
          fitsWidth: rect.width <= window.innerWidth,
          fitsHeight: rect.height <= window.innerHeight,
          bodyScroll: document.body.style.overflow,
        };
      });

      if (drawerOverflow) {
        if (!drawerOverflow.fitsWidth) {
          addFinding("critical", viewport, "mobile-menu", "Mobile menu drawer overflows viewport width");
        }
        if (drawerOverflow.bodyScroll !== "hidden") {
          addFinding(
            "warning",
            viewport,
            "mobile-menu",
            `body overflow not set to hidden when menu open (got: "${drawerOverflow.bodyScroll}")`
          );
        }
      }

      const links = await page.$$(".mobile-navigation a, .mobile-navigation button");
      addFinding("info", viewport, "mobile-menu", `Mobile menu has ${links.length} interactive elements`);

      const closeBtn = await page.$(".nav-menu-button");
      if (closeBtn) {
        await closeBtn.click();
        await page.waitForTimeout(500);
        const closed = await page.$(".mobile-navigation.is-open");
        if (!closed) {
          addFinding("info", viewport, "mobile-menu", "Mobile menu closes correctly");
        } else {
          addFinding("warning", viewport, "mobile-menu", "Mobile menu did not close after clicking close button");
        }
      }
    } else {
      addFinding("warning", viewport, "mobile-menu", "Mobile menu drawer did not open");
    }
  }
}

async function checkFixedPositioning(page: Page, viewport: string) {
  const fixedElements = await page.evaluate(() => {
    const results: Array<{
      tag: string;
      className: string;
      width: number;
      height: number;
      overflows: boolean;
    }> = [];
    const allElements = document.querySelectorAll("*");
    for (const el of allElements) {
      const htmlEl = el as HTMLElement;
      const computed = window.getComputedStyle(htmlEl);
      if (computed.position === "fixed") {
        const rect = htmlEl.getBoundingClientRect();
        results.push({
          tag: htmlEl.tagName.toLowerCase(),
          className: htmlEl.className.toString().slice(0, 60),
          width: Math.round(rect.width),
          height: Math.round(rect.height),
          overflows: rect.width > window.innerWidth + 2,
        });
      }
    }
    return results;
  });

  for (const el of fixedElements) {
    if (el.overflows) {
      addFinding(
        "warning",
        viewport,
        "fixed-positioning",
        `Fixed element <${el.tag} class="${el.className}"> overflows viewport (${el.width}px wide)`
      );
    }
  }

  addFinding(
    "info",
    viewport,
    "fixed-positioning",
    `Found ${fixedElements.length} fixed elements, ${fixedElements.filter((e) => e.overflows).length} overflowing`
  );
}

async function checkCommandMenu(page: Page, viewport: string) {
  const cmdTrigger = await page.$('button:has-text("Cmd+K")');
  const isMobileCmdHidden = !cmdTrigger || !(await cmdTrigger.isVisible());

  if (isMobileCmdHidden) {
    addFinding("info", viewport, "command-menu", "Cmd+K trigger hidden on this viewport (expected on mobile)");
  } else {
    addFinding("info", viewport, "command-menu", "Cmd+K trigger visible");
  }
}

async function takeScreenshot(page: Page, viewport: string) {
  const screenshotPath = path.join(SCREENSHOT_DIR, `${viewport}.png`);
  await page.screenshot({ path: screenshotPath, fullPage: true });
  addFinding("info", viewport, "screenshot", `Full-page screenshot saved: ${screenshotPath}`);
}

test.describe("Responsive & Layout Audit", () => {
  for (const vp of VIEWPORTS) {
    test(`${vp.name} (${vp.width}x${vp.height}) - Full responsive audit`, async ({
      page,
    }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
      await waitForFullLoad(page);

      await checkHorizontalOverflow(page, vp.name);
      await checkOverflowingContent(page, vp.name);
      await checkImagesInContainers(page, vp.name);
      await checkTextReadability(page, vp.name);
      await checkNavbarOverlap(page, vp.name);
      await checkModalFit(page, vp.name);
      await checkMobileMenu(page, vp.name, vp.isMobile);
      await checkFixedPositioning(page, vp.name);
      await checkCommandMenu(page, vp.name);
      await takeScreenshot(page, vp.name);
    });
  }

  test("Write findings report", async ({ page }) => {
    const reportPath = path.join(SCREENSHOT_DIR, "responsive-audit-report.md");

    let report = "# Responsive & Layout Audit Report\n\n";
    report += `Generated: ${new Date().toISOString()}\n\n`;
    report += `## Viewports Tested\n\n`;
    for (const vp of VIEWPORTS) {
      report += `- **${vp.name}**: ${vp.width}x${vp.height} ${vp.isMobile ? "(mobile)" : "(desktop)"}\n`;
    }

    report += "\n## Summary\n\n";
    const critical = findings.filter((f) => f.severity === "critical");
    const warnings = findings.filter((f) => f.severity === "warning");
    const infos = findings.filter((f) => f.severity === "info");
    report += `- **Critical**: ${critical.length}\n`;
    report += `- **Warning**: ${warnings.length}\n`;
    report += `- **Info**: ${infos.length}\n`;

    report += "\n## Critical Findings\n\n";
    if (critical.length === 0) {
      report += "No critical findings.\n";
    } else {
      for (const f of critical) {
        report += `### [${f.viewport}] ${f.check}\n`;
        report += `${f.message}\n\n`;
      }
    }

    report += "\n## Warnings\n\n";
    if (warnings.length === 0) {
      report += "No warnings.\n";
    } else {
      for (const f of warnings) {
        report += `### [${f.viewport}] ${f.check}\n`;
        report += `${f.message}\n\n`;
      }
    }

    report += "\n## Per-Viewport Details\n\n";
    for (const vp of VIEWPORTS) {
      report += `### ${vp.name} (${vp.width}x${vp.height})\n\n`;
      const vpFindings = findings.filter((f) => f.viewport === vp.name);
      for (const f of vpFindings) {
        const icon = f.severity === "critical" ? "🔴" : f.severity === "warning" ? "🟡" : "🟢";
        report += `- ${icon} **${f.check}**: ${f.message}\n`;
      }
      report += "\n";
    }

    report += "\n## CSS Analysis (Static)\n\n";
    report += "See the detailed CSS analysis below for issues found by reading source files.\n";

    fs.writeFileSync(reportPath, report, "utf-8");
    console.log(`\nReport written to: ${reportPath}`);
    console.log(`\nSUMMARY: ${critical.length} critical, ${warnings.length} warnings, ${infos.length} info`);

    expect(true).toBe(true);
  });
});
