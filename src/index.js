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
  //156 champs no lol ate o dia 19/08/2021
  //pegar a quantidade de champ de forma dinamica
  for (let i = 1; i < 3; i++) {
    console.log("Champ -> " + [i]);
    await page.goto("https://br.op.gg/champion/statistics");

    await page.click(
      `div:nth-child(${[i]}) > a > div.champion-index__champion-item__name`
    );

    //esperar alguns segundos
    await new Promise((resolve) =>
      setTimeout(() => resolve(), 10000, console.log("aguarde..."))
    );

    const pageContent = await page.evaluate(() => {
      // console.log("entrou no pageContent");

      //Alguns champs upam a segunda e terceira skill, em level diferente. [resolvido]
      //criar uma resolução para quando der, pegar a skill-level mais prox.[analizando a viabilidade...]
      //erro ao pesquisar o nome do champ, em alguns champs o campo nao existe -> critico [resolvido]
      const infoChamp = {
        name: document.querySelector("div.champion-stats-header-info.champion-stats-header-info--tier-2 > h1"
        ).firstChild.data,
        skills: {
          firtSkill: document.querySelector(
            "tbody:nth-child(5) > tr > td.champion-overview__data > table > tbody > tr:nth-child(2) > td:nth-child(9) " || "tbody:nth-child(5) > tr > td.champion-overview__data > table > tbody > tr:nth-child(2) > td:nth-child(9) > span"
          ).innerText,
          secoundSkill: document.querySelector(
            " tbody:nth-child(5) > tr > td.champion-overview__data > table > tbody > tr:nth-child(2) > td:nth-child(10)" || "tbody:nth-child(5) > tr > td.champion-overview__data > table > tbody > tr:nth-child(2) > td:nth-child(10) > span"
          ).innerText,
          thirdskill: document.querySelector(
            " tbody:nth-child(5) > tr > td.champion-overview__data > table > tbody > tr:nth-child(2) > td:nth-child(15)" || "tbody:nth-child(5) > tr > td.champion-overview__data > table > tbody > tr:nth-child(2) > td:nth-child(15) > span"
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
