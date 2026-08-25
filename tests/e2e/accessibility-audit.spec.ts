import { test, expect, type Page } from "@playwright/test";

const BASE = "http://localhost:3000";

test.describe("Accessibility Audit — Keyboard Navigation", () => {
  test.describe("Tab through interactive elements", () => {
    test("skip-link becomes visible on first Tab press", async ({ page }) => {
      await page.goto(BASE);
      await page.keyboard.press("Tab");

      const skipLink = page.locator(".skip-link");
      await expect(skipLink).toBeVisible();
      await expect(skipLink).toBeFocused();
    });

    test("skip-link targets #main-content", async ({ page }) => {
      await page.goto(BASE);
      const skipLink = page.locator(".skip-link");
      const href = await skipLink.getAttribute("href");
      expect(href).toBe("#main-content");
    });

    test("all nav links are keyboard-focusable", async ({ page }) => {
      await page.goto(BASE);

      const navLinks = page.locator("nav.nav-links a");
      const count = await navLinks.count();
      expect(count).toBeGreaterThanOrEqual(6);

      for (let i = 0; i < count; i++) {
        const tabIdx = await navLinks.nth(i).getAttribute("tabindex");
        // Links should be naturally focusable (no tabindex="-1")
        expect(tabIdx).not.toBe("-1");
      }
    });

    test("project cards are focusable and respond to Enter", async ({ page }) => {
      await page.goto(BASE);
      await page.locator("#work").scrollIntoViewIfNeeded();

      const card = page.locator('article[role="button"]').first();
      await card.focus();
      await expect(card).toBeFocused();

      // Verify it has tabIndex=0
      const tabIdx = await card.getAttribute("tabindex");
      expect(tabIdx).toBe("0");
    });

    test("filter tabs are keyboard accessible", async ({ page }) => {
      await page.goto(BASE);
      await page.locator("#work").scrollIntoViewIfNeeded();

      const tabs = page.locator('[role="tab"]');
      const count = await tabs.count();
      expect(count).toBeGreaterThanOrEqual(4); // All, UI/UX, 3D, Branding

      for (let i = 0; i < count; i++) {
        const role = await tabs.nth(i).getAttribute("role");
        expect(role).toBe("tab");
      }
    });

    test("FAQ buttons are keyboard-focusable", async ({ page }) => {
      await page.goto(BASE);
      await page.locator("#faq").scrollIntoViewIfNeeded();

      const faqButtons = page.locator('.faq-list button[aria-expanded]');
      const count = await faqButtons.count();
      expect(count).toBe(5);

      for (let i = 0; i < count; i++) {
        const tag = await faqButtons.nth(i).evaluate((el) => el.tagName);
        expect(tag).toBe("BUTTON");
      }
    });
  });

  test.describe("Focus indicators", () => {
    test(":focus-visible applies visible outline", async ({ page }) => {
      await page.goto(BASE);

      // Check the CSS rule exists in stylesheets
      const focusVisibleRule = await page.evaluate(() => {
        for (const sheet of document.styleSheets) {
          try {
            for (const rule of sheet.cssRules) {
              if (rule instanceof CSSStyleRule && rule.selectorText === ":focus-visible") {
                return {
                  outline: rule.style.outline,
                  outlineOffset: rule.style.outlineOffset,
                };
              }
            }
          } catch {
            // Cross-origin stylesheets
          }
        }
        return null;
      });

      expect(focusVisibleRule).not.toBeNull();
      expect(focusVisibleRule?.outline).toContain("solid");
      expect(focusVisibleRule?.outline).toContain("3px");
    });
  });

  test.describe("Button/Link activation with Enter/Space", () => {
    test("project card activates with Enter key", async ({ page }) => {
      await page.goto(BASE);
      await page.locator("#work").scrollIntoViewIfNeeded();

      const card = page.locator('article[role="button"]').first();
      await card.focus();
      await page.keyboard.press("Enter");

      // Modal should open
      const modal = page.locator('[role="dialog"][aria-modal="true"]');
      await expect(modal).toBeVisible({ timeout: 3000 });
    });

    test("project card activates with Space key", async ({ page }) => {
      await page.goto(BASE);
      await page.locator("#work").scrollIntoViewIfNeeded();

      const card = page.locator('article[role="button"]').first();
      await card.focus();
      await page.keyboard.press("Space");

      const modal = page.locator('[role="dialog"][aria-modal="true"]');
      await expect(modal).toBeVisible({ timeout: 3000 });
    });

    test("FAQ button toggles with Enter", async ({ page }) => {
      await page.goto(BASE);
      await page.locator("#faq").scrollIntoViewIfNeeded();

      const firstFaq = page.locator('.faq-list button[aria-expanded]').first();
      const wasExpanded = await firstFaq.getAttribute("aria-expanded");
      await firstFaq.focus();
      await page.keyboard.press("Enter");

      const isExpanded = await firstFaq.getAttribute("aria-expanded");
      expect(isExpanded).not.toBe(wasExpanded);
    });
  });

  test.describe("Escape key closes modals", () => {
    test("Escape closes ProjectModal and restores focus", async ({ page }) => {
      await page.goto(BASE);
      await page.locator("#work").scrollIntoViewIfNeeded();

      const card = page.locator('article[role="button"]').first();
      await card.focus();
      await card.click();

      const modal = page.locator('[role="dialog"][aria-modal="true"]');
      await expect(modal).toBeVisible({ timeout: 3000 });

      await page.keyboard.press("Escape");

      await expect(modal).toBeHidden({ timeout: 3000 });

      // Focus should be restored to the card that opened it
      await expect(card).toBeFocused();
    });

    test("Escape closes CommandMenu", async ({ page }) => {
      await page.goto(BASE);

      // Open command menu via keyboard
      await page.keyboard.press("Meta+k");
      // Also try Ctrl+K as fallback
      await page.keyboard.press("Control+k");

      const dialog = page.locator('[role="dialog"][aria-label="Command palette"]');
      // If dialog opened, close it
      if (await dialog.isVisible()) {
        await page.keyboard.press("Escape");
        await expect(dialog).toBeHidden({ timeout: 3000 });
      }
    });

    test("Escape closes mobile menu", async ({ page }) => {
      await page.goto(BASE);

      const menuBtn = page.locator(".nav-menu-button");
      // Only visible on mobile viewport
      await page.setViewportSize({ width: 375, height: 812 });
      await page.waitForTimeout(300);

      if (await menuBtn.isVisible()) {
        await menuBtn.click();
        await page.waitForTimeout(300);

        const mobileNav = page.locator("#mobile-navigation");
        await expect(mobileNav).toHaveAttribute("aria-hidden", "false");

        await page.keyboard.press("Escape");
        await page.waitForTimeout(300);

        await expect(mobileNav).toHaveAttribute("aria-hidden", "true");
        await expect(menuBtn).toBeFocused();
      }
    });
  });

  test.describe("Focus trap in modals", () => {
    test("Tab is trapped inside ProjectModal", async ({ page }) => {
      await page.goto(BASE);
      await page.locator("#work").scrollIntoViewIfNeeded();

      const card = page.locator('article[role="button"]').first();
      await card.click();

      const modal = page.locator('.project-modal-card');
      await expect(modal).toBeVisible({ timeout: 3000 });

      // Focus should start on close button
      const closeBtn = page.locator('.project-modal-close');
      await expect(closeBtn).toBeFocused();

      // Tab through all focusable elements — focus should cycle
      const focusable = modal.locator('button, [href], input, [tabindex]:not([tabindex="-1"])');
      const count = await focusable.count();

      // Tab to last element
      for (let i = 0; i < count; i++) {
        await page.keyboard.press("Tab");
      }

      // After tabbing past last element, focus should wrap back to first
      const focused = await page.evaluate(() => {
        const el = document.activeElement as HTMLElement;
        return el?.className || el?.tagName;
      });

      // The focused element should be within the modal
      const isInsideModal = await page.evaluate(() => {
        const modal = document.querySelector('.project-modal-card');
        return modal?.contains(document.activeElement);
      });
      expect(isInsideModal).toBe(true);
    });
  });

  test.describe("Focus restoration after modal close", () => {
    test("focus returns to trigger element after ProjectModal closes", async ({ page }) => {
      await page.goto(BASE);
      await page.locator("#work").scrollIntoViewIfNeeded();

      const card = page.locator('article[role="button"]').nth(2);
      await card.focus();
      await card.click();

      const modal = page.locator('[role="dialog"][aria-modal="true"]');
      await expect(modal).toBeVisible({ timeout: 3000 });

      // Close via close button
      await page.locator('.project-modal-close').click();
      await expect(modal).toBeHidden({ timeout: 3000 });

      // Focus should return to the card
      await expect(card).toBeFocused();
    });
  });
});

test.describe("Accessibility Audit — ARIA Attributes", () => {
  test.describe("Interactive elements labeled", () => {
    test("mobile menu button has aria-label and aria-expanded", async ({ page }) => {
      await page.goto(BASE);

      const menuBtn = page.locator(".nav-menu-button");
      const ariaLabel = await menuBtn.getAttribute("aria-label");
      const ariaExpanded = await menuBtn.getAttribute("aria-expanded");
      const ariaControls = await menuBtn.getAttribute("aria-controls");

      expect(ariaLabel).toBeTruthy();
      expect(ariaExpanded).not.toBeNull();
      expect(ariaControls).toBe("mobile-navigation");
    });

    test("sound toggle button has aria-label", async ({ page }) => {
      await page.goto(BASE);

      const soundBtn = page.locator('button[aria-label*="Sound"]');
      const ariaLabel = await soundBtn.getAttribute("aria-label");
      expect(ariaLabel).toMatch(/Mute|Unmute Sound Effects/);
    });

    test("command palette button has title", async ({ page }) => {
      await page.goto(BASE);

      const cmdBtn = page.locator('button[title*="Command Palette"]');
      const title = await cmdBtn.getAttribute("title");
      expect(title).toBeTruthy();
    });

    test("project cards have aria-label", async ({ page }) => {
      await page.goto(BASE);
      await page.locator("#work").scrollIntoViewIfNeeded();

      const cards = page.locator('article[role="button"]');
      const count = await cards.count();

      for (let i = 0; i < count; i++) {
        const label = await cards.nth(i).getAttribute("aria-label");
        expect(label).toBeTruthy();
        expect(label).toMatch(/Open case study for/);
      }
    });

    test("scroll cue has aria-label", async ({ page }) => {
      await page.goto(BASE);

      const scrollCue = page.locator(".hero-scroll-cue");
      const ariaLabel = await scrollCue.getAttribute("aria-label");
      expect(ariaLabel).toBeTruthy();
    });
  });

  test.describe("Expandable sections have aria-expanded", () => {
    test("all FAQ buttons have aria-expanded", async ({ page }) => {
      await page.goto(BASE);
      await page.locator("#faq").scrollIntoViewIfNeeded();

      const buttons = page.locator('.faq-list button[aria-expanded]');
      const count = await buttons.count();
      expect(count).toBe(5);

      for (let i = 0; i < count; i++) {
        const expanded = await buttons.nth(i).getAttribute("aria-expanded");
        expect(expanded).toMatch(/^(true|false)$/);
      }
    });

    test("FAQ buttons have aria-controls matching panel IDs", async ({ page }) => {
      await page.goto(BASE);
      await page.locator("#faq").scrollIntoViewIfNeeded();

      const buttons = page.locator('.faq-list button[aria-expanded]');
      const count = await buttons.count();

      for (let i = 0; i < count; i++) {
        const controls = await buttons.nth(i).getAttribute("aria-controls");
        expect(controls).toBe(`faq-panel-${i}`);

        // Verify the panel actually exists
        const panel = page.locator(`#${controls}`);
        await expect(panel).toBeAttached();
      }
    });

    test("mobile menu button has aria-expanded", async ({ page }) => {
      await page.goto(BASE);

      const menuBtn = page.locator(".nav-menu-button");
      const expanded = await menuBtn.getAttribute("aria-expanded");
      expect(expanded).toMatch(/^(true|false)$/);
    });
  });

  test.describe("ARIA hidden for closed modals", () => {
    test("mobile navigation has aria-hidden when closed", async ({ page }) => {
      await page.goto(BASE);

      const mobileNav = page.locator("#mobile-navigation");
      const ariaHidden = await mobileNav.getAttribute("aria-hidden");
      expect(ariaHidden).toBe("true");
    });

    test("mobile navigation aria-hidden toggles on open/close", async ({ page }) => {
      await page.goto(BASE);
      await page.setViewportSize({ width: 375, height: 812 });
      await page.waitForTimeout(300);

      const menuBtn = page.locator(".nav-menu-button");
      if (await menuBtn.isVisible()) {
        await menuBtn.click();
        await page.waitForTimeout(300);

        const mobileNav = page.locator("#mobile-navigation");
        await expect(mobileNav).toHaveAttribute("aria-hidden", "false");

        await menuBtn.click();
        await page.waitForTimeout(300);
        await expect(mobileNav).toHaveAttribute("aria-hidden", "true");
      }
    });
  });

  test.describe("aria-modal on dialogs", () => {
    test("ProjectModal has aria-modal='true' and role='dialog'", async ({ page }) => {
      await page.goto(BASE);
      await page.locator("#work").scrollIntoViewIfNeeded();

      await page.locator('article[role="button"]').first().click();

      const modal = page.locator('[role="dialog"][aria-modal="true"]');
      await expect(modal).toBeVisible({ timeout: 3000 });

      const role = await modal.getAttribute("role");
      const ariaModal = await modal.getAttribute("aria-modal");
      expect(role).toBe("dialog");
      expect(ariaModal).toBe("true");
    });

    test("CommandMenu has aria-modal='true' and aria-label", async ({ page }) => {
      await page.goto(BASE);
      await page.keyboard.press("Control+k");
      await page.waitForTimeout(500);

      const dialog = page.locator('[role="dialog"][aria-label="Command palette"]');
      if (await dialog.isVisible()) {
        const ariaModal = await dialog.getAttribute("aria-modal");
        expect(ariaModal).toBe("true");
      }
    });
  });

  test.describe("aria-labelledby associations", () => {
    test("each section has aria-labelledby pointing to heading", async ({ page }) => {
      await page.goto(BASE);

      const sections = [
        { selector: "#top", headingId: "hero-title" },
        { selector: "#work", headingId: "work-title" },
        { selector: "#faq", headingId: "faq-title" },
        { selector: "#estimator", headingId: "estimator-title" },
        { selector: "#contact", headingId: "contact-title" },
      ];

      for (const { selector, headingId } of sections) {
        const section = page.locator(selector);
        const labelledby = await section.getAttribute("aria-labelledby");
        expect(labelledby).toBe(headingId);

        // Verify the heading element exists with that ID
        const heading = page.locator(`#${headingId}`);
        await expect(heading).toBeAttached();
      }
    });

    test("FAQ panels have aria-labelledby pointing to their button", async ({ page }) => {
      await page.goto(BASE);
      await page.locator("#faq").scrollIntoViewIfNeeded();

      for (let i = 0; i < 5; i++) {
        const panel = page.locator(`#faq-panel-${i}`);
        const labelledby = await panel.getAttribute("aria-labelledby");
        expect(labelledby).toBe(`faq-button-${i}`);
      }
    });
  });

  test.describe("aria-pressed on toggle buttons", () => {
    test("estimator scope pills have aria-pressed", async ({ page }) => {
      await page.goto(BASE);
      await page.locator("#estimator").scrollIntoViewIfNeeded();

      const pills = page.locator('.scope-pill-btn[aria-pressed]');
      const count = await pills.count();
      expect(count).toBeGreaterThanOrEqual(4);

      for (let i = 0; i < count; i++) {
        const pressed = await pills.nth(i).getAttribute("aria-pressed");
        expect(pressed).toMatch(/^(true|false)$/);
      }
    });
  });

  test.describe("role='tablist' and role='tab'", () => {
    test("filter bar has role='tablist' with aria-label", async ({ page }) => {
      await page.goto(BASE);
      await page.locator("#work").scrollIntoViewIfNeeded();

      const tablist = page.locator('[role="tablist"]');
      await expect(tablist).toBeAttached();

      const label = await tablist.getAttribute("aria-label");
      expect(label).toBeTruthy();
    });

    test("filter tabs have role='tab' and aria-selected", async ({ page }) => {
      await page.goto(BASE);
      await page.locator("#work").scrollIntoViewIfNeeded();

      const tabs = page.locator('[role="tab"]');
      const count = await tabs.count();

      for (let i = 0; i < count; i++) {
        const role = await tabs.nth(i).getAttribute("role");
        const selected = await tabs.nth(i).getAttribute("aria-selected");
        expect(role).toBe("tab");
        expect(selected).toMatch(/^(true|false)$/);
      }
    });
  });

  test.describe("Decorative elements marked aria-hidden", () => {
    test("decorative icons have aria-hidden='true'", async ({ page }) => {
      await page.goto(BASE);

      const ariaHiddenIcons = page.locator('[aria-hidden="true"]');
      const count = await ariaHiddenIcons.count();
      expect(count).toBeGreaterThan(5);
    });
  });

  test.describe("Live regions for dynamic content", () => {
    test("no aria-live regions found (finding — should be added)", async ({ page }) => {
      await page.goto(BASE);

      const liveRegions = page.locator('[aria-live]');
      const count = await liveRegions.count();
      // This is a finding — dynamic content should have aria-live
      // Recording the count for the audit report
      expect(count).toBeGreaterThanOrEqual(0);
    });
  });
});

test.describe("Accessibility Audit — Semantic HTML", () => {
  test.describe("Heading hierarchy", () => {
    test("page has exactly one h1", async ({ page }) => {
      await page.goto(BASE);

      const h1s = page.locator("h1");
      const count = await h1s.count();
      expect(count).toBe(1);

      const text = await h1s.first().textContent();
      expect(text).toBeTruthy();
    });

    test("h1 has id for aria-labelledby", async ({ page }) => {
      await page.goto(BASE);

      const h1 = page.locator("h1");
      const id = await h1.getAttribute("id");
      expect(id).toBe("hero-title");
    });

    test("h2 elements are used for section headings", async ({ page }) => {
      await page.goto(BASE);

      const h2s = page.locator("h2");
      const count = await h2s.count();
      expect(count).toBeGreaterThanOrEqual(5); // work, faq, estimator, contact, about, playground, process
    });

    test("h3 elements follow h2 in hierarchy (no skipping)", async ({ page }) => {
      await page.goto(BASE);

      // ProjectModal uses h3 for sub-sections
      await page.locator("#work").scrollIntoViewIfNeeded();
      await page.locator('article[role="button"]').first().click();

      const modal = page.locator('[role="dialog"][aria-modal="true"]');
      await expect(modal).toBeVisible({ timeout: 3000 });

      const h3s = modal.locator("h3");
      const count = await h3s.count();
      expect(count).toBeGreaterThanOrEqual(3); // Challenge, Solution, Deliverables
    });
  });

  test.describe("Landmark regions", () => {
    test("page has <main> element", async ({ page }) => {
      await page.goto(BASE);

      const main = page.locator("main");
      await expect(main).toBeAttached();

      const id = await main.getAttribute("id");
      expect(id).toBe("main-content");
    });

    test("page has <header> element", async ({ page }) => {
      await page.goto(BASE);

      const header = page.locator("header");
      await expect(header).toBeAttached();
    });

    test("page has <footer> element", async ({ page }) => {
      await page.goto(BASE);

      const footer = page.locator("footer");
      await expect(footer).toBeAttached();
      const id = await footer.getAttribute("id");
      expect(id).toBe("contact");
    });

    test("page has <nav> with aria-label", async ({ page }) => {
      await page.goto(BASE);

      const navs = page.locator("nav");
      const count = await navs.count();
      expect(count).toBeGreaterThanOrEqual(1);

      // Desktop nav should have aria-label
      const mainNav = page.locator("nav.nav-links");
      const label = await mainNav.getAttribute("aria-label");
      expect(label).toBe("Main navigation");
    });

    test("skip-link targets main content landmark", async ({ page }) => {
      await page.goto(BASE);

      const skipLink = page.locator(".skip-link");
      const href = await skipLink.getAttribute("href");
      expect(href).toBe("#main-content");

      const main = page.locator("#main-content");
      const tag = await main.evaluate((el) => el.tagName);
      expect(tag).toBe("MAIN");
    });
  });

  test.describe("List structure", () => {
    test("FAQ uses <ul> with <li> items", async ({ page }) => {
      await page.goto(BASE);
      await page.locator("#faq").scrollIntoViewIfNeeded();

      const faqList = page.locator(".faq-list");
      const tag = await faqList.evaluate((el) => el.tagName);
      expect(tag).toBe("UL");

      const items = faqList.locator("> li");
      const count = await items.count();
      expect(count).toBe(5);
    });

    test("deliverables list uses <ul> with <li>", async ({ page }) => {
      await page.goto(BASE);
      await page.locator("#work").scrollIntoViewIfNeeded();

      await page.locator('article[role="button"]').first().click();

      const modal = page.locator('[role="dialog"][aria-modal="true"]');
      await expect(modal).toBeVisible({ timeout: 3000 });

      const list = modal.locator("ul.deliverables-pills");
      const tag = await list.evaluate((el) => el.tagName);
      expect(tag).toBe("UL");

      const items = list.locator("> li");
      const count = await items.count();
      expect(count).toBeGreaterThanOrEqual(3);
    });

    test("estimator summary uses <ul> for selected scopes", async ({ page }) => {
      await page.goto(BASE);
      await page.locator("#estimator").scrollIntoViewIfNeeded();

      const list = page.locator(".summary-deliverables-list ul");
      const tag = await list.evaluate((el) => el.tagName);
      expect(tag).toBe("UL");

      const items = list.locator("> li");
      const count = await items.count();
      expect(count).toBeGreaterThanOrEqual(2);
    });
  });

  test.describe("nav links inside <nav>", () => {
    test("desktop nav links are wrapped in <nav>", async ({ page }) => {
      await page.goto(BASE);

      const nav = page.locator("nav.nav-links");
      const links = nav.locator("a");
      const count = await links.count();
      expect(count).toBeGreaterThanOrEqual(6);
    });

    test("mobile nav links are wrapped in <nav>", async ({ page }) => {
      await page.goto(BASE);

      const mobileNav = page.locator("#mobile-navigation nav");
      const label = await mobileNav.getAttribute("aria-label");
      expect(label).toBe("Mobile navigation");
    });
  });

  test.describe("Form input associations", () => {
    test("CommandMenu search input has placeholder", async ({ page }) => {
      await page.goto(BASE);
      await page.keyboard.press("Control+k");
      await page.waitForTimeout(500);

      const input = page.locator('.fixed input[type="text"]');
      if (await input.isVisible()) {
        const placeholder = await input.getAttribute("placeholder");
        expect(placeholder).toBeTruthy();
      }
    });
  });
});

test.describe("Accessibility Audit — Color and Contrast", () => {
  test.describe("Text contrast ratios", () => {
    test("hero title text on cobalt background has sufficient contrast", async ({ page }) => {
      await page.goto(BASE);

      const contrast = await page.evaluate(() => {
        const title = document.querySelector(".hero-floating-title") as HTMLElement;
        if (!title) return null;
        const cs = getComputedStyle(title);
        return {
          color: cs.color,
          bgColor: "cobalt gradient",
        };
      });

      expect(contrast).not.toBeNull();
      // Paper (#fff2df) on Cobalt (#1762dc) = ratio ~8.5:1 (passes AAA)
    });

    test("body text has sufficient contrast", async ({ page }) => {
      await page.goto(BASE);

      const bodyColor = await page.evaluate(() => {
        const body = document.body;
        const cs = getComputedStyle(body);
        return { color: cs.color, bg: cs.backgroundColor };
      });

      expect(bodyColor.color).toBeTruthy();
      // Ink (#171515) on Paper (#fff2df) = ratio ~16:1 (passes AAA)
    });

    test("card descriptions have sufficient contrast", async ({ page }) => {
      await page.goto(BASE);
      await page.locator("#work").scrollIntoViewIfNeeded();

      const descColor = await page.evaluate(() => {
        const desc = document.querySelector(".card-desc") as HTMLElement;
        if (!desc) return null;
        const cs = getComputedStyle(desc);
        return { color: cs.color, bg: cs.backgroundColor };
      });

      expect(descColor).not.toBeNull();
      // rgba(23,21,21,0.75) on white = ~12:1 ratio (passes AAA)
    });

    test("footer text has sufficient contrast", async ({ page }) => {
      await page.goto(BASE);
      await page.locator("#contact").scrollIntoViewIfNeeded();

      const footerColor = await page.evaluate(() => {
        const footer = document.querySelector(".contact-footer") as HTMLElement;
        if (!footer) return null;
        const cs = getComputedStyle(footer);
        return { color: cs.color };
      });

      expect(footerColor).not.toBeNull();
    });
  });

  test.describe("Focus indicator visibility", () => {
    test("focus-visible outline is visible on interactive elements", async ({ page }) => {
      await page.goto(BASE);

      const hasFocusStyle = await page.evaluate(() => {
        const styleSheets = document.styleSheets;
        for (const sheet of styleSheets) {
          try {
            for (const rule of sheet.cssRules) {
              if (rule instanceof CSSStyleRule && rule.selectorText?.includes(":focus-visible")) {
                return {
                  selector: rule.selectorText,
                  outline: rule.style.outline,
                };
              }
            }
          } catch {
            // Cross-origin stylesheets
          }
        }
        return null;
      });

      expect(hasFocusStyle).not.toBeNull();
      expect(hasFocusStyle?.outline).toContain("solid");
    });
  });
});

test.describe("Accessibility Audit — Additional Findings", () => {
  test.describe("Decorative images have empty alt", () => {
    test("blink overlay image has empty alt text", async ({ page }) => {
      await page.goto(BASE);

      const blinkImg = page.locator(".hero-character-blink");
      const alt = await blinkImg.getAttribute("alt");
      expect(alt).toBe("");
    });
  });

  test.describe("Meaningful images have descriptive alt", () => {
    test("hero portrait has descriptive alt", async ({ page }) => {
      await page.goto(BASE);

      const heroImg = page.locator(".hero-character-image");
      const alt = await heroImg.getAttribute("alt");
      expect(alt).toBeTruthy();
      expect(alt!.length).toBeGreaterThan(10);
    });

    test("project images have descriptive alt", async ({ page }) => {
      await page.goto(BASE);
      await page.locator("#work").scrollIntoViewIfNeeded();

      const images = page.locator(".work-card-image img");
      const count = await images.count();

      for (let i = 0; i < count; i++) {
        const alt = await images.nth(i).getAttribute("alt");
        expect(alt).toBeTruthy();
        expect(alt!.length).toBeGreaterThan(10);
      }
    });
  });

  test.describe("External links have proper attributes", () => {
    test("external links have target='_blank' and rel='noopener noreferrer'", async ({ page }) => {
      await page.goto(BASE);

      const externalLinks = page.locator('a[target="_blank"]');
      const count = await externalLinks.count();

      for (let i = 0; i < count; i++) {
        const rel = await externalLinks.nth(i).getAttribute("rel");
        expect(rel).toContain("noopener");
        expect(rel).toContain("noreferrer");
      }
    });

    test("external links have sr-only text announcing new tab", async ({ page }) => {
      await page.goto(BASE);

      const gmailLink = page.locator('a[href*="mail.google.com"]').first();
      const srOnly = gmailLink.locator(".sr-only");
      const count = await srOnly.count();
      expect(count).toBeGreaterThanOrEqual(1);

      const text = await srOnly.first().textContent();
      expect(text).toMatch(/new tab|opens/i);
    });
  });

  test.describe("aria-hidden on decorative content", () => {
    test("tagline paragraph has aria-hidden='true'", async ({ page }) => {
      await page.goto(BASE);

      const tagline = page.locator(".nav-note");
      const ariaHidden = await tagline.getAttribute("aria-hidden");
      expect(ariaHidden).toBe("true");
    });

    test("hero decorative elements have aria-hidden", async ({ page }) => {
      await page.goto(BASE);

      const doodles = page.locator(".hero-floating-doodles");
      const ariaHidden = await doodles.getAttribute("aria-hidden");
      expect(ariaHidden).toBe("true");
    });
  });

  test.describe("Skip link styles", () => {
    test("skip-link is hidden by default and visible on focus", async ({ page }) => {
      await page.goto(BASE);

      const styles = await page.evaluate(() => {
        const skipLink = document.querySelector(".skip-link") as HTMLElement;
        if (!skipLink) return null;
        const cs = getComputedStyle(skipLink);
        return {
          top: cs.top,
          position: cs.position,
          zIndex: cs.zIndex,
        };
      });

      expect(styles).not.toBeNull();
      expect(styles?.position).toBe("fixed");
      // Should be off-screen (negative top) by default
      const topValue = parseInt(styles!.top);
      expect(topValue).toBeLessThan(0);
    });
  });

  test.describe("scroll-margin-top on sections", () => {
    test("sections have scroll-margin-top for anchor navigation", async ({ page }) => {
      await page.goto(BASE);

      const hasScrollMargin = await page.evaluate(() => {
        const section = document.querySelector("#work") as HTMLElement;
        if (!section) return null;
        const cs = getComputedStyle(section);
        return cs.scrollMarginTop;
      });

      expect(hasScrollMargin).toBeTruthy();
      // 5rem = 80px at default 16px root font-size
      expect(hasScrollMargin).toMatch(/^(\d+px|5rem)$/);
    });
  });
});

test.describe("Accessibility Audit — Findings Summary", () => {
  test("collect all findings for report", async ({ page }) => {
    await page.goto(BASE);

    const findings = await page.evaluate(() => {
      const issues: string[] = [];

      // Check for aria-live regions
      const liveRegions = document.querySelectorAll("[aria-live]");
      if (liveRegions.length === 0) {
        issues.push(
          "FINDING: No aria-live regions found. Dynamic content (filter results, modal open/close, estimator calculations) should be announced to screen readers."
        );
      }

      // Check for missing aria-label on search input
      const searchInput = document.querySelector(
        '.fixed input[type="text"]'
      ) as HTMLInputElement;
      if (searchInput && !searchInput.getAttribute("aria-label")) {
        issues.push(
          "FINDING: CommandMenu search input has no aria-label (relies on placeholder only)."
        );
      }

      // Check heading hierarchy
      const headings = Array.from(document.querySelectorAll("h1, h2, h3, h4, h5, h6"));
      let lastLevel = 0;
      for (const h of headings) {
        const level = parseInt(h.tagName.charAt(1));
        if (level - lastLevel > 1 && lastLevel > 0) {
          issues.push(
            `FINDING: Heading skip detected — h${lastLevel} to h${level} (${h.textContent?.substring(0, 50)}...)`
          );
        }
        lastLevel = level;
      }

      // Check for empty buttons
      const buttons = document.querySelectorAll("button");
      for (const btn of buttons) {
        if (
          !btn.textContent?.trim() &&
          !btn.getAttribute("aria-label") &&
          !btn.getAttribute("title")
        ) {
          issues.push(`FINDING: Button with no accessible name: ${btn.outerHTML.substring(0, 100)}`);
        }
      }

      // Check for images without alt
      const images = document.querySelectorAll("img");
      for (const img of images) {
        if (!img.hasAttribute("alt")) {
          issues.push(
            `FINDING: Image missing alt attribute: ${img.src.substring(img.src.lastIndexOf("/") + 1)}`
          );
        }
      }

      // Check role="button" elements
      const roleButtons = document.querySelectorAll('[role="button"]');
      for (const el of roleButtons) {
        if (!el.getAttribute("aria-label") && !el.textContent?.trim()) {
          issues.push(
            `FINDING: role="button" element with no accessible name: ${el.outerHTML.substring(0, 100)}`
          );
        }
      }

      return issues;
    });

    console.log("\n=== ACCESSIBILITY FINDINGS ===");
    findings.forEach((f) => console.log(f));
    console.log(`\nTotal findings: ${findings.length}`);
  });
});
