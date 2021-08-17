const puppeteer = require("puppeteer");
const express = require("express");
const app = express();

app.get("/", async (request, response) => {
  console.log("entrou");
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  page.setDefaultNavigationTimeout(0);

  //const champList = 1;
  //const count = 2;
  var arrayChamps = [];
  for (let i = 1; i < 50; i++) {
    console.log("entrou no for");
    await page.goto("https://br.op.gg/champion/statistics");
    await page.click(
      `div:nth-child(${[i]}) > a > div.champion-index__champion-item__name`
    ); // erro champ aphelios
    //esperar alguns segundos
    await new Promise((resolve) =>
      setTimeout(() => resolve(), 20000, console.log("espere"))
    );

    const pageContent = await page.evaluate(() => {
      console.log("entrou no pageContent");
      const infoChamp = {
        name: document.querySelector("div.champion-box-header__title > h4")
          .innerHTML,

        //ordem de up das skills
        skills: {
          firtSkill: document.querySelector(
            "tbody:nth-child(5) > tr > td.champion-overview__data > table > tbody > tr:nth-child(2) > td:nth-child(9) > span"
          ).innerHTML,
          secoundSkill: document.querySelector(
            "tbody:nth-child(5) > tr > td.champion-overview__data > table > tbody > tr:nth-child(2) > td:nth-child(13) > span"
          ).innerHTML,
          thirdskill: document.querySelector(
            " tbody:nth-child(5) > tr > td.champion-overview__data > table > tbody > tr:nth-child(2) > td:nth-child(14)"
          ).innerText,
        },
        //items inicial
        // starterItems : {

        // }
      };

      return infoChamp;
    });

    //await browser.close();

    arrayChamps.push(pageContent);
  }
  response.send({
    arrayChamps,
  });

  //console.log("entrou");
});

app.listen(3000, () => {
  console.log("server on!!");
});
