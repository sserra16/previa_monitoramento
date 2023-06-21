import { By, Key, ThenableWebDriver } from "selenium-webdriver";
import { sleep } from "../../utils/sleep";
import { PreviaRetorno } from "../../../types/PreviaRetorno";

async function PreviaAmericanas(
  driver: ThenableWebDriver,
  nomeDoProduto: string
): Promise<PreviaRetorno> {
  let retorno: PreviaRetorno = {
    cod: 0,
  };

  const url = "https://americanas.com.br";

  await driver.get(url);

  const input = await driver.findElement(
    By.xpath(
      '//*[@id="rsyswpsdk"]/div/header/div[1]/div[1]/div/div[1]/form/input'
    )
  );

  await input.sendKeys(nomeDoProduto + Key.ENTER);

  await sleep(1000);

  const precos = await driver.findElements(
    By.className(
      "src__Text-sc-154pg0p-0 price__PromotionalPrice-sc-h6xgft-1 ctBJlj price-info__ListPriceWithMargin-sc-1xm1xzb-2 liXDNM"
    )
  );

  if (precos.length === 0) {
    return { cod: 101, msg: "Nenhum produto encontrado" };
  }

  const titulos = await driver.findElements(
    By.className("product-name__Name-sc-1shovj0-0 gUjFDF")
  );

  const links = await driver.findElements(
    By.className("inStockCard__Link-sc-1ngt5zo-1 JOEpk")
  );

  const urlProduto = await links[0].getAttribute("href");

  retorno.previa = {
    descricao: await titulos[0].getText(),
    preco: await precos[0].getText(),
    urlProduto,
    idMarketplace: 5,
  };

  retorno.cod = 1;
  return retorno;
}

export default PreviaAmericanas;
