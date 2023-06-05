import { By, ThenableWebDriver } from "selenium-webdriver";

export async function monitoraMercadoLivre(
  driver: ThenableWebDriver,
  url: string
): Promise<number> {
  await driver.get(url);

  const preco = await driver.findElement(
    By.xpath('//*[@id="price"]/div/div[1]/div[1]/span/meta')
  );

  let precoFinal = await preco.getAttribute("content");

  return Number(precoFinal);
}
