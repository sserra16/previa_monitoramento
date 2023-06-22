import { By, Key, ThenableWebDriver } from "selenium-webdriver";
import { sleep } from "../../utils/sleep";
import { PreviaRetorno } from "../../../types/PreviaRetorno";

async function previaAmazon(
  driver: ThenableWebDriver,
  nomeDoProduto: string
): Promise<PreviaRetorno> {
  let retorno: PreviaRetorno = {
    cod: 0,
  };

  const url = "https://amazon.com.br/";

  await driver.get(url);
  const input = await driver.findElement(By.id("twotabsearchtextbox"));

  await input.sendKeys(nomeDoProduto + Key.ENTER);

  await sleep(1000);

  const precos = await driver.findElements(By.className("a-price"));
  if (precos.length === 0) {
    return { cod: 101, msg: "Nenhum produto encontrado" };
  }

  const titulos = await driver.findElements(
    By.className("a-size-mini a-spacing-none a-color-base s-line-clamp-4")
  );

  const links = await driver.findElements(
    By.className("a-link-normal s-no-outline")
  );

  const urlProduto = await links[0].getAttribute("href");

  const produto = await titulos[0].getText();
  const precoInicial = await precos[0].getText();
  const preco = precoInicial.replace("\n", ",");

  retorno.previa = {
    descricao: produto,
    preco,
    urlProduto,
  };
  retorno.cod = 1;

  return retorno;
}

export default previaAmazon;
