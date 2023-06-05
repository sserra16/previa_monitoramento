import { By, ThenableWebDriver } from "selenium-webdriver";

export async function monitoraAmericanas(
  driver: ThenableWebDriver,
  url: string
): Promise<number> {
  await driver.get(url);

  const preco = await driver.findElement(
    By.xpath('//*[@id="rsyswpsdk"]/div/main/div[2]/div[2]/div[1]/div[2]/div')
  );

  let precoFinal = await preco.getText();

  precoFinal = precoFinal.replace("R$", "");
  precoFinal = precoFinal.replace(",", ".");

  return Number(precoFinal);
}
