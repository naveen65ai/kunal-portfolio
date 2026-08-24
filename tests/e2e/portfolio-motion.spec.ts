import { expect, test } from "@playwright/test";

test.describe("living illustrated portfolio", () => {
  test("layers the hero and gives each signature element intentional motion", async ({ page }) => {
    await page.goto("/");

    const scene = page.locator('[data-motion="hero-scene"]');
    const person = page.locator('[data-motion="hero-person"]');
    const blink = page.locator('[data-motion="hero-blink"]');
    const titleLetter = page.locator('[data-motion="portfolio-title"] span').first();

    await expect(scene).toBeVisible();
    await expect(person).toBeVisible();
    await expect(blink).toBeAttached();
    await expect(titleLetter).toBeVisible();

    await expect(person).not.toHaveCSS("animation-name", "none");
    await expect(blink).not.toHaveCSS("animation-name", "none");
    await expect(titleLetter).not.toHaveCSS("animation-name", "none");

    const box = await scene.boundingBox();
    expect(box).not.toBeNull();
    await page.mouse.move(box!.x + box!.width * 0.8, box!.y + box!.height * 0.35);
    await expect(scene).not.toHaveCSS("--hero-x", "0");
  });

  test("stops ambient motion when reduced motion is requested", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");

    await expect(page.locator('[data-motion="hero-person"]')).toHaveCSS("animation-name", "none");
    await expect(page.locator('[data-motion="hero-blink"]')).toHaveCSS("animation-name", "none");
    await expect(page.locator('[data-motion="portfolio-title"] span').first()).toHaveCSS(
      "animation-name",
      "none",
    );

    // The compact disc experiment lives on the playground page
    await page.goto("/playground");
    await expect(page.locator(".cd-disc")).toHaveCSS("animation-name", "none");
  });

  test("lets visitors pause the rotating disc without losing the email action", async ({
    page,
  }) => {
    await page.goto("/playground");

    const toggle = page.getByRole("button", { name: /rotating compact disc/i });
    const email = page.getByRole("link", { name: /start a project inspired by this vibe/i });

    await expect(toggle).toHaveAttribute("aria-pressed", "true");
    await expect(page.locator(".cd-disc")).toHaveCSS("animation-play-state", "running");
    await toggle.click();
    await expect(toggle).toHaveAttribute("aria-pressed", "false");
    await expect(page.locator(".cd-disc")).toHaveCSS("animation-play-state", "paused");
    await expect(email).toHaveAttribute("href", /^mailto:kkunalkumar0055@gmail\.com/);
  });

  test("keeps the mobile menu keyboard-operable and inside the viewport", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");

    const trigger = page.getByRole("button", { name: /navigation/ });
    await expect(trigger).toBeVisible();
    await trigger.click();
    await expect(trigger).toHaveAttribute("aria-expanded", "true");
    await expect(page.locator("#mobile-navigation")).toHaveAttribute("aria-hidden", "false");
    await expect(page.locator('#mobile-navigation a[href="/work"]')).toBeFocused();
    await page.keyboard.press("Escape");
    await expect(trigger).toBeFocused();
    await expect(trigger).toHaveAttribute("aria-expanded", "false");

    const hasOverflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
    expect(hasOverflow).toBe(false);
  });
});
