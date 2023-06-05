import { By, ThenableWebDriver } from "selenium-webdriver";

export async function monitoraMagalu(
  driver: ThenableWebDriver,
  url: string
): Promise<number> {
  await driver.get(url);

  const preco = await driver.findElement(
    By.xpath('//*[@id="__next"]/div/main/section[4]/div[5]/div/div/div/p')
  );

  let precoFinal = await preco.getText();

  precoFinal = precoFinal.replace(",", ".");
  precoFinal = precoFinal.replace("R$", "");

  return Number(precoFinal);
}
