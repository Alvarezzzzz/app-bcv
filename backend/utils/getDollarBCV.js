import { chromium } from "playwright";

const getInfoBCV = async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36",
  });
  const page = await context.newPage();

  await page.goto("https://www.bcv.org.ve/", {
    waitUntil: "domcontentloaded",
    timeout: 60000,
  });

  const tasaDolarBCV = await page.$eval(
    "#dolar > div > div > div.col-sm-6.col-xs-6.centrado > strong",
    (element) => element.innerHTML
  );
  const fechaFolar = await page.$eval(
    "div.pull-right.dinpro.center > span.date-display-single",
    (el) => el.getAttribute("content")
  );

  const dolarBCV = {
    tasa: tasaDolarBCV,
    fecha: fechaFolar,
  };
  await browser.close();
  return { dolarBCV };
};

export default getInfoBCV;
