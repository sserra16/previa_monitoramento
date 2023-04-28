import { Builder, By, Key } from "selenium-webdriver";
import chrome from "selenium-webdriver/chrome";

const service = new chrome.ServiceBuilder("./chromedriver.exe");

const options = new chrome.Options();
options.excludeSwitches("enable-logging");

const driver = new Builder()
  .forBrowser("chrome")
  .setChromeOptions(options)
  .setChromeService(service)
  .build();

const url = "https://www.mercadolivre.com.br/";
const nomeDoProduto = "havaianas 4 nite preta";
const quantidadeProdutos = 4;

async function main(url = "", nomeDoProduto = "") {
  let isMercadoLivre = url.includes("mercadolivre");

  if (isMercadoLivre) {
    await driver.get(url);

    let input = driver.findElement(By.className("nav-search-input"));

    input.sendKeys(nomeDoProduto + Key.ENTER);

    setTimeout(getPrecos, 5000);
  }
}

async function getPrecos() {
  let precos = await driver.findElements(By.className("price-tag-fraction"));

  let listaPrecosString = [];

  for (let i = 0; i < quantidadeProdutos; i++) {
    listaPrecosString.push(await precos[i].getText());
  }

  listaPrecosString.filter((a) => a.split("\n"));

  console.log(listaPrecosString);
}

main(url, nomeDoProduto);
