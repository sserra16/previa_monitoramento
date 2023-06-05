import { By, Key, ThenableWebDriver } from "selenium-webdriver";
import { sleep } from "../../utils/sleep";
import { PreviaRetorno } from "../../../types/PreviaRetorno";

async function previaAmazon(
  driver: ThenableWebDriver,
  quantidadeProdutos: number,
  nomeDoProduto: string
): Promise<PreviaRetorno> {
  let retorno: PreviaRetorno = {
    cod: 0,
  };

  retorno.listaPrevia = new Array();

  const url = "https://amazon.com.br/";

  await driver.get(url);
  const input = await driver.findElement(By.id("twotabsearchtextbox"));

  await input.sendKeys(nomeDoProduto + Key.ENTER);

  await sleep(1000);

  const precos = await driver.findElements(By.className("a-price"));
  if (precos.length === 0) {
    console.log("chegou aqui");
    return { cod: 101, msg: "Nenhum produto encontrado" };
  }

  const titulos = await driver.findElements(
    By.className("a-size-mini a-spacing-none a-color-base s-line-clamp-4")
  );

  const links = await driver.findElements(
    By.className("a-link-normal s-no-outline")
  );

  for (let i = 0; i < quantidadeProdutos; i++) {
    const urlProduto = await links[i].getAttribute("href");

    const produto = await titulos[i].getText();
    const precoInicial = await precos[i].getText();
    const preco = precoInicial.replace("\n", ",");

    retorno.listaPrevia.push({
      descricao: produto,
      preco,
      urlProduto,
      idMarketplace: 7,
    });
  }
  retorno.cod = 1;

  return retorno;
}

export default previaAmazon;
