import { By, Key, ThenableWebDriver } from "selenium-webdriver";
import { sleep } from "../../utils/sleep";
import { PreviaRetorno } from "../../../types/PreviaRetorno";

async function PreviaMagalu(
  driver: ThenableWebDriver,
  nomeDoProduto: string
): Promise<PreviaRetorno> {
  /* instanciando o retorno */
  let retorno: PreviaRetorno = {
    cod: 0,
  };

  const url = "https://magazineluiza.com.br/";

  await driver.get(url);

  const input = await driver.findElement(By.xpath('//*[@id="input-search"]'));

  await input.sendKeys(nomeDoProduto + Key.ENTER);

  await sleep(8000);

  const precos = await driver.findElements(
    By.className("sc-kpDqfm eCPtRw sc-hBtRBD fPPQXa")
  );

  const titulos = await driver.findElements(By.className("sc-ZEldx llMBjh"));
  const links = await driver.findElements(
    By.className("sc-kOPcWz dSFUBN sc-eWzREE jhhgth sc-eWzREE jhhgth")
  );

  if (precos.length === 0 || titulos.length === 0 || links.length === 0) {
    return { cod: 101, msg: "Nenhum produto encontrado" };
  }

  const urlProduto = await links[0].getAttribute("href");

  retorno.previa = {
    descricao: await titulos[0].getText(),
    preco: await precos[0].getText(),
    urlProduto,
  };

  retorno.cod = 1;
  return retorno;
}

export default PreviaMagalu;
