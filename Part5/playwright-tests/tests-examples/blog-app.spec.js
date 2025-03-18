const { test, expect, describe, beforeEach } = require("@playwright/test");

describe("Blog app", () => {
  beforeEach(async ({ page, request }) => {
    await request.post("/api/testing/reset");
    await request.post("/api/users", {
      data: {
        name: "Matti Luukkainen",
        username: "mluukkai",
        password: "salainen",
      },
    });

    await request.post("/api/users", {
      data: {
        username: "julesverne",
        name: "Jules Verne",
        password: "center",
      },
    });

    await page.goto("/");

    await page.getByTestId("username").fill("julesverne");
    await page.getByTestId("password").fill("center");
    await page.getByRole("button", { name: "Login" }).click();
    await expect(page.getByText("Welcome Jules Verne!")).toBeVisible();
  });

  test("front page can be opened", async ({ page }) => {
    const locator = await page.getByText("blogs");
    await expect(locator).toBeVisible();
  });

  test("login fails with wrong password", async ({ page }) => {
    await page.getByTestId("logout-button").click();

    await page.getByTestId("username").fill("julesverne");
    await page.getByTestId("password").fill("wrong");
    await page.getByRole("button", { name: "Login" }).click();

    await expect(page.getByText("Wrong username or password")).toBeVisible();

    await expect(page.getByText("Welcome Jules Verne!")).not.toBeVisible();
  });

  test("a new blog can be created", async ({ page }) => {
    await page.getByTestId("toggable").click();
    await page.getByTestId("title").fill("a new blog can be created");
    await page.getByTestId("author").fill("Jules Verne");
    await page.getByTestId("url").fill("test.com");
    await page.getByTestId("submit").click();

    await expect(page.getByText("a new blog can be created")).toBeVisible();
  });

  test("a blog can be liked", async ({ page }) => {
    await page.getByTestId("toggable").click();
    await page.getByTestId("title").fill("a blog can be liked");
    await page.getByTestId("author").fill("Jules Verne");
    await page.getByTestId("url").fill("test.com");
    await page.getByTestId("submit").click();

    await page.getByTestId("details-button").click();
    await page.getByTestId("like-button").click();
    await expect(page.getByText("1 likes")).toBeVisible();
  });

  test("a blog can be deleted", async ({ page }) => {
    await page.getByTestId("toggable").click();
    await page.getByTestId("title").fill("a blog can be deleted");
    await page.getByTestId("author").fill("Jules Verne");
    await page.getByTestId("url").fill("test.com");
    await page.getByTestId("submit").click();

    const locator = await page.getByText("a blog can be deleted");
    await expect(locator).toBeVisible();

    await page.getByTestId("details-button").click();
    await page.getByTestId("delete-button").click();

    page.on("dialog", async (dialog) => {
      await expect(dialog.message()).toContain(
        "Delete a blog can be deleted by Jules Verne?"
      );
      await dialog.accept();
    });

    await expect(locator).not.toBeVisible();
  });
});
