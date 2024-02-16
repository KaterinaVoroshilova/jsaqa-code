let page;

beforeEach(async () => {
  page = await browser.newPage();
  await page.goto("https://github.com/");
});


afterEach(() => {
  page.close();
});

describe("Github page tests", () => {
  beforeEach(async () => {
    page = await browser.newPage();
    await page.goto("https://github.com/team");
  });

  test("The h1 header content", async () => {
      const firstLink = await page.$("header div div a");
      await firstLink.click();
      await page.waitForSelector('h1');
      const title2 = await page.title();
      expect(title2).toEqual('GitHub for teams · Build like the best teams on the planet · GitHub');
    }, 20000);

  test("The first link attribute", async () => {
      const actual = await page.$eval("a", link => link.getAttribute('href') );
      expect(actual).toEqual("#start-of-content");
    }, 20000);

  test("The page contains Sign in button", async () => {
      const btnSelector = ".btn-large-mktg.btn-mktg";
      await page.waitForSelector(btnSelector, {
      visible: true,
      });
      const actual = await page.$eval(btnSelector, link => link.textContent);
      expect(actual).toContain("Sign up for free")
    }, 20000);
});

describe("Should check titles for GitHub pages", () => {
  test("Should check Pricing page", async () => {
      await page.goto("https://github.com/pricing");
      const title = await page.title();
      expect(title).toEqual("Pricing · Plans for every developer · GitHub")
    }, 20000);

  test("The page contains Sign up button", async () => {
      const btnSelector = "body > div.logged-out.env-production.page-responsive.header-overlay.home-campaign > div.position-relative.js-header-wrapper > header > div > div.HeaderMenu--logged-out.p-responsive.height-fit.position-lg-relative.d-lg-flex.flex-column.flex-auto.pt-7.pb-4.top-0 > div > div > a";
      await page.waitForSelector(btnSelector, {
      visible: true,
      });
      const actual = await page.$eval(btnSelector, link => link.textContent);
      expect(actual).toContain("Sign up")
    }, 20000)

    test("Click on button Start a free enterprise trial title", async () => {
      const btn =await page.$("body > div.logged-out.env-production.page-responsive.header-overlay.home-campaign > div.application-main > main > div:nth-child(1) > div.px-3.home-campaign-hero > div > div > div.col-11.text-left.pl-2.pl-sm-0.mt-n4 > div.d-flex.flex-column.flex-md-row > a");
      await btn.click();
      await page.waitForSelector('body > div.logged-out.env-production.page-responsive > div.application-main > main > div > div.mb-4.mb-md-8.container-xl > h1');
      const title = await page.title();
      expect(title).toEqual("Choose an Enterprise plan · GitHub")
    }, 30000);
  
})