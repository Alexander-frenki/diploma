const { webkit } = require("playwright");

const SITE_URL = "https://bidfax.info";

module.exports = async function parseSiteData(vin) {
  const browser = await webkit.launch({
    headless: true,
  });

  const page = await browser.newPage();
  await page.goto(SITE_URL);

  await page.fill(".search_form #search", vin);
  await page.click(".search_form input[type=submit]");

  await page.waitForLoadState("networkidle");
  await page.click(".col-md-9 a");

  await page.waitForLoadState("networkidle");
  const images = await page.$$eval(".fotorama__img", (imgs) =>
    imgs.map((img) => img.src)
  );
  const price = await page.textContent(".prices");
  const data = await page.$$eval(".full-side p:not(:first-of-type)", (data) =>
    data.map((node) => node.textContent)
  );

  return { images, price, data };
};
