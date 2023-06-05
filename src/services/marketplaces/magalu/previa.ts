import { By, Key, ThenableWebDriver } from "selenium-webdriver";
import { sleep } from "../../utils/sleep";
import { PreviaRetorno } from "../../../types/PreviaRetorno";

async function PreviaMagalu(
  driver: ThenableWebDriver,
  quantidadeProdutos: number,
  nomeDoProduto: string
): Promise<PreviaRetorno> {
  /* instanciando o retorno */
  let retorno: PreviaRetorno = {
    cod: 0,
  };
  retorno.listaPrevia = new Array(); 

  const url = "https://magazineluiza.com.br/";

  await driver.get(url);

  const input = await driver.findElement(By.xpath('//*[@id="input-search"]'));

  await input.sendKeys(nomeDoProduto + Key.ENTER);

  await sleep(4000);

  const precos = await driver.findElements(
    By.className("sc-kDvujY jDmBNY sc-hGglLj bQqJoc")
  );
  if (precos.length === 0) {
    console.log('chegou aqui')
    return { cod: 101, msg: "Nenhum produto encontrado" };
  }

  const titulos = await driver.findElements(By.className("sc-hFVsQR hQYVAI"));
  const links = await driver.findElements(
    By.className("sc-hhOBVt jZChDm sc-izDtrv cIroYa sc-izDtrv cIroYa")
  );

  for (let i = 0; i < quantidadeProdutos; i++) {
    const urlProduto = await links[i].getAttribute("href");

    retorno.listaPrevia.push({
      descricao: await titulos[i].getText(),
      preco: await precos[i].getText(),
      urlProduto,
      idMarketplace: 1,
    });
  }

  retorno.cod = 1;
  return retorno;
}

export default PreviaMagalu;
