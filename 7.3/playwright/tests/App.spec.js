const { test, expect } = require("@playwright/test");
const { email, password } = require("../user.js");
const { describe } = require("node:test");

describe("Authorization", async ({ page }) => {

  test("Success Authorization With Screenshots", async ({ page }) => {
    await page.goto("https://netology.ru/?modal=sign_in");
    await page.screenshot({ path: './screenshots/screenshot1.png' });
    await page.getByPlaceholder('Email').fill(email);
    await page.screenshot({ path: './screenshots/screenshot2.png' });
    await page.getByPlaceholder('Пароль').fill(password);
    await page.screenshot({ path: './screenshots/screenshot3.png' });
    await page.getByTestId('login-submit-btn').click();
    await page.screenshot({ path: './screenshots/screenshot4.png' });

    await expect(page).toHaveURL("https://netology.ru/profile/8698862");
    await page.screenshot({ path: './screenshots/screenshot5.png' });

    await page.waitForSelector("h2");

    const title = await page.$eval("h2", (element) => element.textContent);

    expect(title).toBe("Моё обучение");
    await page.screenshot({ path: './screenshots/screenshot6.png' });
  });
});