import { By, ThenableWebDriver } from "selenium-webdriver";
import { sleep } from "../../utils/sleep";

export async function monitoraAmazon(
  driver: ThenableWebDriver,
  url: string
): Promise<number> {
  await driver.get(url);

  await sleep(1500);

  const preco = await driver.findElement(
    By.className(
      "a-price aok-align-center reinventPricePriceToPayMargin priceToPay"
    )
  );

  let precoFinal = await preco.getText();

  precoFinal = precoFinal.replace("R$", "");
  precoFinal = precoFinal.replace("\n", ".");

  return Number(precoFinal);
}
