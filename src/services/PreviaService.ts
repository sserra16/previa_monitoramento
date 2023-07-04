import { Builder, ThenableWebDriver } from "selenium-webdriver";
import PreviaMagalu from "./marketplaces/magalu/previa";
import PreviaBuscape from "./marketplaces/buscape/previa";
import PreviaAmericanas from "./marketplaces/americanas/previa";
import chrome from "selenium-webdriver/chrome";
import { PreviaRetorno } from "../types/PreviaRetorno";
import previaAmazon from "./marketplaces/amazon/previa";

export class PreviaService {
  constructor(idMarketplace: number, descricaoProduto: string) {
    this.IdMarketplace = idMarketplace;
    this.DescricaoProduto = descricaoProduto;

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
  private DescricaoProduto: string;
  private driver: ThenableWebDriver;

  public async index(): Promise<PreviaRetorno> {
    switch (this.IdMarketplace) {
      case 1:
        const {
          previa: listaMagalu,
          cod: codMagalu,
          msg: msgMagalu,
        } = await PreviaMagalu(this.driver, this.DescricaoProduto);

        await this.driver.close();

        if (codMagalu === 1) {
          return {
            cod: 1,
            previa: listaMagalu,
          };
        }

        return {
          cod: codMagalu,
          msg: msgMagalu,
        };

      case 4:
        const {
          cod: codBuscape,
          previa: listaBuscape,
          msg: msgBuscape,
        } = await PreviaBuscape(this.driver, this.DescricaoProduto);

        await this.driver.close();

        if (codBuscape === 1) {
          return {
            cod: 1,
            previa: listaBuscape,
          };
        }

        return {
          cod: codBuscape,
          msg: msgBuscape,
        };

      case 5:
        const {
          cod: codAmericanas,
          msg: msgAmericanas,
          previa: listaAmericanas,
        } = await PreviaAmericanas(this.driver, this.DescricaoProduto);

        await this.driver.close();

        if (codAmericanas === 1) {
          return {
            cod: 1,
            previa: listaAmericanas,
          };
        }

        return {
          cod: codAmericanas,
          msg: msgAmericanas,
        };

      case 7:
        const {
          cod: codAmazon,
          msg: msgAmazon,
          previa: listaAmazon,
        } = await previaAmazon(this.driver, this.DescricaoProduto);

        await this.driver.close();

        if (codAmazon === 1) {
          return {
            cod: 1,
            previa: listaAmazon,
          };
        }

        return {
          cod: codAmazon,
          msg: msgAmazon,
        };

      default:
        await this.driver.close();

        return {
          cod: 0,
          msg: "Não temos este marketplace ainda",
        };
    }
  }
}
