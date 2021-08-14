const puppeteer = require("puppeteer");
const express = require("express");
const app = express();

app.get("/", async (request, response) => {
  console.log("entrou");
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  page.setDefaultNavigationTimeout(0);
  await page.goto("https://br.op.gg/champion/statistics");
  await page.click(
    `div:nth-child(9) > a > div.champion-index__champion-item__name`
  );
  //esperar alguns segundos 
  await new Promise(resolve => setTimeout(() => resolve(), 10000, console.log("espere")) );

  const pageContent = await page.evaluate(() => {
    let firtSkill = document.querySelector(
      "tbody:nth-child(5) > tr > td.champion-overview__data > table > tbody > tr:nth-child(2) > td:nth-child(9) > span"
    )
   // let secondSkill = document.querySelector(
     // "tbody:nth-child(5) > tr > td.champion-overview__data > table > tbody > tr:nth-child(2) > td:nth-child(13) > span"
    //)

    return firtSkill.innerHTML

  });
  //console.log(pageContent);

  await browser.close();
  response.send({
    pageContent
  });

  //console.log("entrou");
});

app.listen(3000, () => {
  console.log("server on!!");
});