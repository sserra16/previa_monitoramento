import { By, Key, ThenableWebDriver } from "selenium-webdriver";
import { sleep } from "../../utils/sleep";
import { PreviaRetorno } from "../../../types/PreviaRetorno";

async function PreviaBuscape(
  driver: ThenableWebDriver,
  quantidadeProdutos: number,
  nomeDoProduto: string
): Promise<PreviaRetorno> {
  let retorno: PreviaRetorno = {
    cod: 0,
  };
  retorno.listaPrevia = new Array();

  const url = "https://buscape.com.br/";

  await driver.get(url);
  const input = await driver.findElement(
    By.xpath(
      '//*[@id="new-header"]/div[1]/div/div/div[3]/div/div/div[2]/div/div[1]/input'
    )
  );

  await input.sendKeys(nomeDoProduto + Key.ENTER);

  await sleep(5000);

  const precos = await driver.findElements(
    By.className("Text_Text__h_AF6 Text_MobileHeadingS__Zxam2")
  );

  if (precos.length === 0) {
    return { cod: 101, msg: "Nenhum produto encontrado" };
  }

  const titulos = await driver.findElements(
    By.className(
      "Text_Text__h_AF6 Text_MobileLabelXs__ER_cD Text_DesktopLabelSAtLarge__baj_g SearchCard_ProductCard_Name__ZaO5o"
    )
  );

  const links = await driver.findElements(
    By.className("SearchCard_ProductCard_Inner__7JhKb")
  );

  for (let i = 0; i < quantidadeProdutos; i++) {
    const urlProduto = await links[i].getAttribute("href");

    retorno.listaPrevia.push({
      descricao: await titulos[i].getText(),
      preco: await precos[i].getText(),
      urlProduto: urlProduto,
      idMarketplace: 2,
    });
  }

  retorno.cod = 1;
  return retorno;
}

export default PreviaBuscape;
