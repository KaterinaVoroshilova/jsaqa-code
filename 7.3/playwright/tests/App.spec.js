const { test, expect } = require("@playwright/test");
const { email, password } = require("../user.js");
const { describe } = require("node:test");

describe("Authorization", async ({ page }) => {
  test("Success Authorization", async ({ page }) => {
    await page.goto("https://netology.ru/?modal=sign_in");
    await page.getByPlaceholder('Email').fill(email);
    await page.getByPlaceholder('Пароль').fill(password);
    await page.getByTestId('login-submit-btn').click();

    await expect(page).toHaveURL("https://netology.ru/profile/8698862");

    await page.waitForSelector("h2");

    const title = await page.$eval("h2", (element) => element.textContent);

    expect(title).toBe("Моё обучение");
  });

  test("Failed Authorization", async ({ page }) => {
    await page.goto("https://netology.ru/?modal=sign_in");
    await page.getByPlaceholder('Email').fill("test@111.ru");
    await page.getByPlaceholder('Пароль').fill("password");
    await page.getByTestId('login-submit-btn').click();

    const title = await page.$eval("[data-testid='login-error-hint']", (element) => element.textContent);

    expect(title).toBe("Вы ввели неправильно логин или пароль");
  });
});