import { Builder, ThenableWebDriver } from "selenium-webdriver";
import PreviaMagalu from "./marketplaces/magalu/previa";
import PreviaBuscape from "./marketplaces/buscape/previa";
import PreviaAmericanas from "./marketplaces/americanas/previa";
import chrome from "selenium-webdriver/chrome";
import { PreviaRetorno } from "../types/PreviaRetorno";
import previaAmazon from "./marketplaces/amazon/previa";
import previaMercadoLivre from "./marketplaces/mercadoLivre/previa";

export class PreviaService {
  constructor(
    idMarketplace: number,
    linhasPesquisa: number,
    nomeDoProduto: string
  ) {
    this.IdMarketplace = idMarketplace;
    this.LinhasPesquisa = linhasPesquisa;
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
  private LinhasPesquisa: number;
  private NomeDoProduto: string;

  public async index(): Promise<PreviaRetorno> {
    switch (this.IdMarketplace) {
      case 1:
        const {
          listaPrevia: listaMagalu,
          cod: codMagalu,
          msg: msgMagalu,
        } = await PreviaMagalu(
          this.driver,
          this.LinhasPesquisa,
          this.NomeDoProduto
        );

        if (codMagalu === 1) {
          return {
            cod: 1,
            listaPrevia: listaMagalu,
          };
        }

        return {
          cod: codMagalu,
          msg: msgMagalu,
        };

      case 4:
        const {
          cod: codBuscape,
          listaPrevia: listaBuscape,
          msg: msgBuscape,
        } = await PreviaBuscape(
          this.driver,
          this.LinhasPesquisa,
          this.NomeDoProduto
        );

        if (codBuscape === 1) {
          return {
            cod: 1,
            listaPrevia: listaBuscape,
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
          listaPrevia: listaAmericanas,
        } = await PreviaAmericanas(
          this.driver,
          this.LinhasPesquisa,
          this.NomeDoProduto
        );

        if (codAmericanas === 1) {
          return {
            cod: 1,
            listaPrevia: listaAmericanas,
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
          listaPrevia: listaAmazon,
        } = await previaAmazon(
          this.driver,
          this.LinhasPesquisa,
          this.NomeDoProduto
        );

        if (codAmazon === 1) {
          return {
            cod: 1,
            listaPrevia: listaAmazon,
          };
        }

        return {
          cod: codAmazon,
          msg: msgAmazon,
        };

      case 8:
        const {
          cod: codMercadoLivre,
          msg: msgAMercadoLivre,
          listaPrevia: listaMercadoLivre,
        } = await previaMercadoLivre(
          this.driver,
          this.LinhasPesquisa,
          this.NomeDoProduto
        );

        if (codMercadoLivre === 1) {
          return {
            cod: 1,
            listaPrevia: listaMercadoLivre,
          };
        }

        return {
          cod: codMercadoLivre,
          msg: msgAMercadoLivre,
        };

      default:
        return {
          cod: 0,
          msg: "Não temos este marketplace ainda",
        };
    }
  }
}
