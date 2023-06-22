import { Builder, ThenableWebDriver } from "selenium-webdriver";
import PreviaMagalu from "./marketplaces/magalu/previa";
import PreviaBuscape from "./marketplaces/buscape/previa";
import PreviaAmericanas from "./marketplaces/americanas/previa";
import chrome from "selenium-webdriver/chrome";
import { PreviaRetorno } from "../types/PreviaRetorno";
import previaAmazon from "./marketplaces/amazon/previa";
import previaMercadoLivre from "./marketplaces/mercadoLivre/previa";

export class PreviaService {
  constructor(idMarketplace: number, nomeDoProduto: string) {
    this.IdMarketplace = idMarketplace;
    this.NomeDoProduto = nomeDoProduto;

    const service = new chrome.ServiceBuilder(__dirname + "/chromedriver.exe");

    const options = new chrome.Options();
    options.excludeSwitches("enable-logging");
    this.driver = new Builder()
      .forBrowser("chrome")
      .setChromeOptions(options)
      .setChromeService(service)
      .build();
  }

  private IdMarketplace: number;
  private driver: ThenableWebDriver;
  private NomeDoProduto: string;

  public async index(): Promise<PreviaRetorno> {
    switch (this.IdMarketplace) {
      case 1:
        const {
          previa: listaMagalu,
          cod: codMagalu,
          msg: msgMagalu,
        } = await PreviaMagalu(this.driver, this.NomeDoProduto);

        await this.driver.close();

        if (codMagalu === 1) {
          return {
            cod: 1,
            previa: listaMagalu,
            idMarketplace: this.IdMarketplace,
          };
        }

        return {
          cod: codMagalu,
          msg: msgMagalu,
          idMarketplace: this.IdMarketplace,
        };

      case 4:
        const {
          cod: codBuscape,
          previa: listaBuscape,
          msg: msgBuscape,
        } = await PreviaBuscape(this.driver, this.NomeDoProduto);

        await this.driver.close();

        if (codBuscape === 1) {
          return {
            cod: 1,
            previa: listaBuscape,
            idMarketplace: this.IdMarketplace,
          };
        }

        return {
          cod: codBuscape,
          msg: msgBuscape,
          idMarketplace: this.IdMarketplace,
        };

      case 5:
        const {
          cod: codAmericanas,
          msg: msgAmericanas,
          previa: listaAmericanas,
        } = await PreviaAmericanas(this.driver, this.NomeDoProduto);

        await this.driver.close();

        if (codAmericanas === 1) {
          return {
            cod: 1,
            previa: listaAmericanas,
            idMarketplace: this.IdMarketplace,
          };
        }

        return {
          cod: codAmericanas,
          msg: msgAmericanas,
          idMarketplace: this.IdMarketplace,
        };

      case 7:
        const {
          cod: codAmazon,
          msg: msgAmazon,
          previa: listaAmazon,
        } = await previaAmazon(this.driver, this.NomeDoProduto);

        await this.driver.close();

        if (codAmazon === 1) {
          return {
            cod: 1,
            previa: listaAmazon,
            idMarketplace: this.IdMarketplace,
          };
        }

        return {
          cod: codAmazon,
          msg: msgAmazon,
          idMarketplace: this.IdMarketplace,
        };

      case 8:
        const {
          cod: codMercadoLivre,
          msg: msgAMercadoLivre,
          previa: listaMercadoLivre,
        } = await previaMercadoLivre(this.driver, this.NomeDoProduto);

        await this.driver.close();

        if (codMercadoLivre === 1) {
          return {
            cod: 1,
            previa: listaMercadoLivre,
            idMarketplace: this.IdMarketplace,
          };
        }

        return {
          cod: codMercadoLivre,
          msg: msgAMercadoLivre,
          idMarketplace: this.IdMarketplace,
        };

      default:
        await this.driver.close();

        return {
          cod: 0,
          msg: "Não temos este marketplace ainda",
          idMarketplace: this.IdMarketplace,
        };
    }
  }
}
