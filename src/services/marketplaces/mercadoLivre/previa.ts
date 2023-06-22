import { By, Key, ThenableWebDriver, until } from "selenium-webdriver";
import { sleep } from "../../utils/sleep";
import { PreviaRetorno } from "../../../types/PreviaRetorno";

async function previaMercadoLivre(
  driver: ThenableWebDriver,
  nomeDoProduto: string
): Promise<PreviaRetorno> {
  let retorno: PreviaRetorno = {
    cod: 0,
  };

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

  const urlProduto = await titulos[0].getAttribute("href");

  retorno.previa = {
    descricao: await titulos[0].getAttribute("title"),
    urlProduto,
  };

  retorno.cod = 1;

  return retorno;
}

export default previaMercadoLivre;
