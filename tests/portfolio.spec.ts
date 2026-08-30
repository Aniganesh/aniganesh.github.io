import { expect, test } from "@playwright/test";

test.describe("network portfolio", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("starts on Projects and excludes removed personal projects", async ({ page }) => {
    await expect(page.getByTestId("network-tab-projects")).toHaveAttribute("aria-selected", "true");
    await expect(page.getByTestId("network-node-ren3")).toBeVisible();
    await expect(page.getByTestId("network-node-indic-games")).toBeVisible();
    await expect(page.getByTestId("network-node-rajini-lipsum")).toHaveCount(0);
    await expect(page.getByTestId("network-node-help-decide")).toHaveCount(0);
    await expect(page.getByTestId("network-node-colour-palette")).toHaveCount(0);
  });

  test("switches the connected node collection between tabs", async ({ page }) => {
    await page.getByTestId("network-tab-toolkit").click();
    await expect(page.getByTestId("network-tab-toolkit")).toHaveAttribute("aria-selected", "true");
    await expect(page.getByTestId("network-node-typescript")).toBeVisible();
    await expect(page.getByTestId("network-node-technical-leadership")).toHaveCount(0);
    await expect(page.getByTestId("network-node-typescript").locator("svg")).toHaveCount(1);

    await page.getByTestId("network-tab-contact").click();
    await expect(page.getByTestId("network-node-github")).toBeVisible();
    await expect(page.getByTestId("network-node-ren3")).toHaveCount(0);
  });

  test("connects each node only to the central profile", async ({ page }) => {
    await expect(page.locator(".secondary-line")).toHaveCount(0);
    await expect(page.locator(".connection-line")).toHaveCount(await page.locator(".node-placement").count());
  });

  test("opens and dismisses project details with close, Escape, and backdrop", async ({ page }) => {
    const project = page.getByTestId("network-node-ren3");
    await project.click({ force: true });
    const modal = page.getByTestId("project-modal");
    await expect(modal).toBeVisible();
    await expect(modal).toContainText("ReN3");
    await expect(page.getByTestId("project-modal-close")).toBeFocused();

    await page.getByTestId("project-modal-close").click();
    await expect(modal).toHaveCount(0);
    await expect(project).toBeFocused();

    await project.click({ force: true });
    await page.keyboard.press("Escape");
    await expect(modal).toHaveCount(0);

    await project.click({ force: true });
    await page.locator(".modal-backdrop").evaluate((element) => {
      element.dispatchEvent(new MouseEvent("mousedown", { bubbles: true }));
    });
    await expect(modal).toHaveCount(0);
  });

  test("opens and closes the profile modal from every tab", async ({ page }) => {
    const tabs = ["projects", "toolkit", "contact"];

    for (const tab of tabs) {
      await page.getByTestId(`network-tab-${tab}`).click();

      const profileNode = page.getByTestId("network-profile-node");
      await expect(profileNode).toBeVisible();
      await profileNode.click({ force: true });

      const modal = page.getByTestId("profile-modal");
      await expect(modal).toBeVisible();
      await expect(modal).toHaveRole("dialog");
      await expect(modal).toContainText("Aniruddha Ganesh");
      await expect(modal).toContainText(/experience/i);
      await expect(modal).toContainText(/AI systems/i);

      await page.getByTestId("profile-modal-close").click();
      await expect(modal).toHaveCount(0);
      await expect(profileNode).toBeFocused();
    }
  });

  test("drags a project node and springs it back to its home position", async ({ page }) => {
    const node = page.getByTestId("network-node-ren3");
    const home = await node.boundingBox();
    expect(home).not.toBeNull();

    const startX = home!.x + home!.width / 2;
    const startY = home!.y + home!.height / 2;
    const dragX = startX + 96;
    const dragY = startY + 48;

    await page.mouse.move(startX, startY);
    await page.mouse.down();
    await page.mouse.move(dragX, dragY, { steps: 8 });

    const displaced = await node.boundingBox();
    expect(displaced).not.toBeNull();
    expect(Math.hypot(displaced!.x - home!.x, displaced!.y - home!.y)).toBeGreaterThan(20);

    await page.mouse.up();
    await expect(page.getByTestId("project-modal")).toHaveCount(0);

    await expect
      .poll(async () => {
        const current = await node.boundingBox();
        if (!current) return Number.POSITIVE_INFINITY;
        return Math.hypot(current.x - home!.x, current.y - home!.y);
      }, { timeout: 2500, intervals: [50, 100, 200] })
      .toBeLessThan(6);
  });

  test("uses the Toolkit name and requested favicon logos", async ({ page }) => {
    await expect(page.getByTestId("network-tab-toolkit")).toContainText("Toolkit");
    await page.getByTestId("network-tab-toolkit").click();

    const toolkitFavicons = {
      nodejs: "/favicons/nodejs.ico",
      postgresql: "/favicons/postgresql.ico",
      pulumi: "/favicons/pulumi.ico",
      zustand: "/favicons/zustand.ico",
      "socket-io": "/favicons/socket-io.png",
    };

    for (const [id, src] of Object.entries(toolkitFavicons)) {
      const logo = page.getByTestId(`network-node-${id}`).locator("img");
      await expect(logo).toHaveAttribute("src", src);
      await expect(logo).toHaveCSS("object-fit", "contain");
      await expect(logo).toHaveCSS("border-radius", "50%");
    }

    await page.getByTestId("network-tab-projects").click();
    await expect(page.getByTestId("network-node-rebny").locator("img")).toHaveAttribute("src", "/favicons/rebny.ico");
  });

  test("uses borderless frosted glass modal chrome", async ({ page }) => {
    await page.getByTestId("network-node-ren3").click({ force: true });
    const modal = page.getByTestId("project-modal");
    const styles = await modal.evaluate((element) => {
      const close = element.querySelector(".modal-close");
      const modalStyle = getComputedStyle(element);
      const closeStyle = close ? getComputedStyle(close) : null;
      return {
        modalBorder: modalStyle.borderTopWidth,
        modalBackground: modalStyle.backgroundColor,
        modalBackdropFilter: modalStyle.backdropFilter,
        closeBorder: closeStyle?.borderTopWidth,
        closeBackground: closeStyle?.backgroundColor,
      };
    });

    expect(styles.modalBorder).toBe("0px");
    expect(styles.modalBackground).not.toBe("rgba(9, 36, 62, 0.91)");
    expect(styles.modalBackdropFilter).toContain("blur");
    expect(styles.closeBorder).toBe("0px");
    expect(styles.closeBackground).toBe("rgba(0, 0, 0, 0)");
    await expect(modal.locator(".modal-kicker, .modal-accent")).toHaveCount(0);
  });

  test("gives floating nodes independent wobble with reduced-motion support", async ({ page }) => {
    const placements = page.locator(".node-placement");
    const animationStyles = await placements.evaluateAll((elements) => elements.slice(0, 2).map((element) => {
      const style = getComputedStyle(element);
      return { name: style.animationName, delay: style.animationDelay };
    }));

    expect(animationStyles[0].name).toBe("node-wobble");
    expect(animationStyles[0].delay).not.toBe(animationStyles[1].delay);

    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.reload();
    await expect(page.locator(".node-placement").first()).toHaveCSS("animation-name", "none");
  });

  test("exposes safe external contact links", async ({ page }) => {
    await page.getByTestId("network-tab-contact").click();
    const github = page.getByTestId("network-node-github");
    await expect(github).toHaveAttribute("href", "https://github.com/aniganesh");
    await expect(github).toHaveAttribute("target", "_blank");
    await expect(github).toHaveAttribute("rel", /noopener/);
  });

  test("supports keyboard tab navigation and reduced motion", async ({ page }) => {
    const projects = page.getByTestId("network-tab-projects");
    await projects.focus();
    await projects.press("ArrowRight");
    await expect(page.getByTestId("network-tab-toolkit")).toBeFocused();
    await expect(page.getByTestId("network-tab-toolkit")).toHaveAttribute("aria-selected", "true");

    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.getByTestId("network-tab-contact").click();
    await expect(page.getByTestId("network-tab-contact")).toHaveAttribute("aria-selected", "true");
  });

  test("does not overflow a mobile viewport", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.reload();
    const dimensions = await page.evaluate(() => ({
      documentWidth: document.documentElement.scrollWidth,
      viewportWidth: window.innerWidth,
    }));
    expect(dimensions.documentWidth).toBeLessThanOrEqual(dimensions.viewportWidth);
    await expect(page.getByTestId("network-tab-projects")).toBeVisible();
    await expect(page.getByTestId("network-node-ren3")).toBeVisible();
  });

  test("keeps mobile nodes in the scaled radial network layout", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.reload();

    const layout = await page.locator(".network-nodes").evaluate((element) => {
      const placements = Array.from(element.querySelectorAll<HTMLElement>(".node-placement"));
      const center = document.querySelector<HTMLElement>(".network-center");
      const nodesStyle = getComputedStyle(element);
      const placementStyles = placements.map((placement) => getComputedStyle(placement));
      const boxes = placements.map((placement) => placement.getBoundingClientRect());
      const centerBox = center?.getBoundingClientRect();
      return {
        nodesPosition: nodesStyle.position,
        nodesDisplay: nodesStyle.display,
        placementsPosition: placementStyles.every((style) => style.position === "absolute"),
        nodeWidth: boxes[0]?.width ?? 0,
        hasNodeAboveCenter: Boolean(centerBox && boxes.some((box) => box.bottom < centerBox.top)),
        hasNodeBelowCenter: Boolean(centerBox && boxes.some((box) => box.top > centerBox.bottom)),
      };
    });

    expect(layout.nodesPosition).toBe("absolute");
    expect(layout.nodesDisplay).toBe("block");
    expect(layout.placementsPosition).toBe(true);
    expect(layout.nodeWidth).toBeLessThan(80);
    expect(layout.hasNodeAboveCenter).toBe(true);
    expect(layout.hasNodeBelowCenter).toBe(true);
  });
});
