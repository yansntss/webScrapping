const puppeteer = require("puppeteer");
const express = require("express");
const app = express();
const fs = require('fs')





app.get("/", async (request, response) => {
  console.log("entrou");
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  page.setDefaultNavigationTimeout(0);

  var arrayChamps = [];
//157 champs  
  for (let i = 1; i < 157; i++) {
    console.log("entrou no for");
    await page.goto("https://br.op.gg/champion/statistics");

    await page.click(
      `div:nth-child(${[i]}) > a > div.champion-index__champion-item__name`
    );

    //esperar alguns segundos
    await new Promise((resolve) =>
      setTimeout(() => resolve(), 10000, console.log("espere"))
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
            " tbody:nth-child(5) > tr > td.champion-overview__data > table > tbody > tr:nth-child(2) > td:nth-child(13)"
          ).innerText,
          thirdskill: document.querySelector(
            " tbody:nth-child(5) > tr > td.champion-overview__data > table > tbody > tr:nth-child(2) > td:nth-child(15)"
          ).innerText,
        },
      };

      return infoChamp;
    });

    //await browser.close();

    arrayChamps.push(pageContent);
  }
  response.send({
    arrayChamps,
  });
  fs.writeFile(__dirname + '/champLOL.json', JSON.stringify(arrayChamps), err => {
    console.log(err || "arquivo salvo! ")
  })
  //console.log("entrou");
});

app.listen(3000, () => {
  console.log("server on!!");
});
