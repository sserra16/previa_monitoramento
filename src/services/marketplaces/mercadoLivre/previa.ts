import { By, Key, ThenableWebDriver, until } from "selenium-webdriver";
import { sleep } from "../../utils/sleep";
import { PreviaRetorno } from "../../../types/PreviaRetorno";

async function previaMercadoLivre(
  driver: ThenableWebDriver,
  quantidadeProdutos: number,
  nomeDoProduto: string
): Promise<PreviaRetorno> {
  let retorno: PreviaRetorno = {
    cod: 0,
  };

  retorno.listaPrevia = new Array();

  const url = "https://mercadolivre.com.br";

  await driver.get(url);

  let input = await driver.findElement(By.className("nav-search-input"));

  await input.sendKeys(nomeDoProduto + Key.ENTER);

  await sleep(1500);

  let titulos = await driver.findElements(
    By.className(
      "ui-search-item__group__element shops__items-group-details ui-search-link"
    )
  );

  await sleep(1500);

  for (let i = 0; i < quantidadeProdutos; i++) {
    const urlProduto = await titulos[i].getAttribute("href");

    retorno.listaPrevia.push({
      descricao: await titulos[i].getAttribute("title"),
      urlProduto,
      idMarketplace: 8,
    });
  }

  retorno.cod = 1;

  return retorno;
}

export default previaMercadoLivre;
