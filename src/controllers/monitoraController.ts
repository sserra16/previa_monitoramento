import { MonitoraService } from "../services/MonitoraService";
import { MonitoraRetorno } from "../types/MonitoraRetorno";

export class monitoraController {
  constructor(idMarketplace: number, urlProduto: string) {
    this.IdMarketplace = idMarketplace;
    this.UrlProduto = urlProduto;
  }

  private UrlProduto: string;
  private IdMarketplace: number;

  public async get(): Promise<MonitoraRetorno> {
    const monitoraService = new MonitoraService(
      this.IdMarketplace,
      this.UrlProduto,
    );

    const result = await monitoraService.index();

    if (result.cod != 1) {
      return {
        cod: result.cod,
        msg: result.msg,
      };
    }

    return {
      cod: 1,
      data: result.data,
      preco: result.preco,
    };
  }
}
