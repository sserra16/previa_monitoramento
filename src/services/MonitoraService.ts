import { Builder, ThenableWebDriver } from "selenium-webdriver";
import chrome from "selenium-webdriver/chrome";
import { monitoraMagalu } from "./marketplaces/magalu/monitora";
import { IRetorno } from "../types/IRetorno";
import { MonitoraRetorno } from "../types/MonitoraRetorno";
import { monitoraBuscape } from "./marketplaces/buscape/monitora";
import { monitoraAmericanas } from "./marketplaces/americanas/monitora";
import { monitoraAmazon } from "./marketplaces/amazon/monitora";
import { monitoraMercadoLivre } from "./marketplaces/mercadoLivre/monitora";

export class MonitoraService {
  constructor(idMarketplace: number, urlProduto: string, idPs: number) {
    this.IdMarketplace = idMarketplace;
    this.UrlProduto = urlProduto;
    this.IdPs = idPs;

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
  private UrlProduto: string;
  private driver: ThenableWebDriver;
  private IdPs: number;

  private IdMonitoramento: number = 0;
  private preco: number = 0;
  private IdRegistro: number = 0;
  private RegistroData: Date = new Date();

  private async inserePsMonitoramento(): Promise<IRetorno> {
    const { PrismaClient, Prisma } = await import("@prisma/client");
    const prisma = new PrismaClient();

    try {
      const { ID_MONITORAMENTO } = await prisma.pS_MONITORAMENTO.create({
        data: {
          ID_MARKETPLACE: this.IdMarketplace,
          ID_PS: this.IdPs,
          URL_PRODUTO_MARKETPLACE: this.UrlProduto,
        },
      });

      this.IdMonitoramento = ID_MONITORAMENTO;
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        return {
          cod: Number(e.code),
          msg: e.message,
        };
      }
    }

    return {
      cod: 1,
      msg: "Monitoramento cadastrado com sucesso!",
    };
  }

  private async inserePsRegistro(preco: number): Promise<IRetorno> {
    const { PrismaClient, Prisma } = await import("@prisma/client");
    const prisma = new PrismaClient();

    if (!preco) {
      return {
        cod: 0,
        msg: "Preço não informado ao inserir o PsRegistro",
      };
    }

    try {
      const { ID_REGISTRO, DATA } =
        await prisma.pS_MONITORAMENTO_REGISTRO.create({
          data: {
            PRECO: preco,
            DATA: new Date(),
            ID_MONITORAMENTO: this.IdMonitoramento,
          },
        });

      this.IdRegistro = ID_REGISTRO;
      this.RegistroData = DATA;
    } catch (e) {
      console.log(e);
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        return {
          cod: Number(e.code),
          msg: e.message,
        };
      }
    }

    return {
      cod: 1,
      msg: "Registro criado com sucesso!",
    };
  }

  public async index(): Promise<MonitoraRetorno> {
    const resultMonitoramento = await this.inserePsMonitoramento();

    if (resultMonitoramento.cod != 1) {
      return {
        cod: resultMonitoramento.cod,
        msg: resultMonitoramento.msg,
      };
    }

    console.log(resultMonitoramento);

    switch (this.IdMarketplace) {
      case 1:
        let precoMagalu = await monitoraMagalu(this.driver, this.UrlProduto);

        this.preco = precoMagalu;
      case 4:
        let precoBuscape = await monitoraBuscape(this.driver, this.UrlProduto);

        this.preco = precoBuscape;

      case 5:
        let precoAmericanas = await monitoraAmericanas(
          this.driver,
          this.UrlProduto
        );

        this.preco = precoAmericanas;

      case 7:
        let precoAmazon = await monitoraAmazon(this.driver, this.UrlProduto);

        this.preco = precoAmazon;

      case 8:
        let precoMercadoLivre = await monitoraMercadoLivre(
          this.driver,
          this.UrlProduto
        );

        this.preco = precoMercadoLivre;
    }

    const resultRegistro = await this.inserePsRegistro(this.preco);

    if (resultRegistro.cod != 1) {
      return {
        cod: resultRegistro.cod,
        msg: resultRegistro.msg,
      };
    }

    console.log(resultRegistro);

    return {
      cod: 1,
      data: this.RegistroData,
      idMonitoramento: this.IdMonitoramento,
      idRegistro: this.IdRegistro,
      preco: this.preco,
    };
  }
}
