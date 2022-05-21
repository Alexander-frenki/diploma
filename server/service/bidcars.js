import { webkit } from "playwright";

// const SITE_URL = "https://en.bidfax.info";

// async function parseSiteData(vin) {
//   const browser = await webkit.launch({
//     headless: true,
//   });

//   const page = await browser.newPage();
//   await page.goto(SITE_URL, { waitUntil: "domcontentloaded", timeout: 5000 });

//   await page.fill(".search_form #search", vin);
//   await page.click(".search_form input[type=submit]");

//   await delay(500);

//   await page.waitForLoadState("domcontentloaded");
//   await page.click(".col-md-9 a");

//   await page.waitForLoadState("domcontentloaded");
//   const images = await page.$$eval(".fotorama__img", (imgs) =>
//     imgs.map((img) => img.src)
//   );
//   const price = await page.textContent(".prices");
//   const data = await page.$$eval(".full-side p:not(:first-of-type)", (data) =>
//     data.map((node) => node.textContent)
//   );

//   await browser.close();

//   return { images, price, data };
// }

const SITE_URL = "https://bid.cars/ua/search";

async function parseBidcarsData(vin) {
  const browser = await webkit.launch({
    headless: true,
  });

  const page = await browser.newPage();
  await page.goto(SITE_URL, { waitUntil: "domcontentloaded" });

  await page.fill("#search_field", vin);
  await page.waitForTimeout(500);
  await page.click("#submit_search");
  await page.waitForTimeout(1000);

  if (
    (await page.isVisible(".search-count")) &&
    (await page.textContent(".search-count")) === "(0)"
  ) {
    return null;
  }

  const images = await page.$$eval(
    ".main-content .gallery .carousel-item",
    (imgs) => imgs.map((img) => img.src)
  );

  const conditions = await page.$$eval(
    "#condition-details .options-list .option:not(.airbags)",
    (data) =>
      data.map((node) => [
        node.firstChild.textContent,
        node.lastChild.textContent.trim(),
      ])
  );

  const details = await page.$$eval(
    "#car-details .options-list .option:not(:last-child)",
    (data) =>
      data.map((node) => [
        node.firstChild.textContent,
        node.lastChild.textContent.trim(),
      ])
  );
  await page.waitForTimeout(500);
  const price = await page.textContent("#lot-price");

  await browser.close();
  return { images, conditions, details, price };
}

export { parseBidcarsData };
