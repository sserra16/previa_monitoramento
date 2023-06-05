import { By, ThenableWebDriver } from "selenium-webdriver";

export async function monitoraBuscape(driver: ThenableWebDriver, url: string): Promise<number> {
  await driver.get(url);

  const preco = await driver.findElement(
    By.xpath('//*[@id="__next"]/div[1]/div[2]/div/div/div[1]/div[2]/div[2]/a/div/strong')
  );

  let precoFinal = await preco.getText();

  precoFinal = precoFinal.replace(",", ".");
  precoFinal = precoFinal.replace("R$", "");

  return Number(precoFinal);
}
