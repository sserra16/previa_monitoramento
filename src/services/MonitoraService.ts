import { Builder, ThenableWebDriver } from "selenium-webdriver";
import chrome from "selenium-webdriver/chrome";
import { monitoraMagalu } from "./marketplaces/magalu/monitora";
import { MonitoraRetorno } from "../types/MonitoraRetorno";
import { monitoraBuscape } from "./marketplaces/buscape/monitora";
import { monitoraAmericanas } from "./marketplaces/americanas/monitora";
import { monitoraAmazon } from "./marketplaces/amazon/monitora";
import { monitoraMercadoLivre } from "./marketplaces/mercadoLivre/monitora";

export class MonitoraService {
  constructor(idMarketplace: number, urlProduto: string) {
    this.IdMarketplace = idMarketplace;
    this.UrlProduto = urlProduto;

    // const service = new chrome.ServiceBuilder(__dirname + "/chromedriver.exe");

    const options = new chrome.Options();
    
    options.excludeSwitches("enable-logging");
    options.addArguments("--headless");
    this.driver = new Builder()
      .forBrowser("chrome")
      .setChromeOptions(options)
      // .setChromeService(service)
      .usingServer("http://localhost:4444/wd/hub")
      .build();
  }

  private IdMarketplace: number;
  private UrlProduto: string;
  private driver: ThenableWebDriver;

  private preco: number = 0;
  private RegistroData: Date = new Date();

  public async index(): Promise<MonitoraRetorno> {
    switch (this.IdMarketplace) {
      case 1:
        let precoMagalu = await monitoraMagalu(this.driver, this.UrlProduto);

        this.preco = precoMagalu;
        await this.driver.close();

      case 4:
        let precoBuscape = await monitoraBuscape(this.driver, this.UrlProduto);

        this.preco = precoBuscape;
        await this.driver.close();

      case 5:
        let precoAmericanas = await monitoraAmericanas(
          this.driver,
          this.UrlProduto
        );

        this.preco = precoAmericanas;

        await this.driver.close();

      case 7:
        let precoAmazon = await monitoraAmazon(this.driver, this.UrlProduto);

        this.preco = precoAmazon;

        await this.driver.close();
    }

    return {
      cod: 1,
      data: this.RegistroData,
      preco: this.preco,
    };
  }
}
