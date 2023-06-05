import { Monitora } from "../classes/Monitora";
import { MonitoraService } from "../services/MonitoraService";
import { MonitoraRetorno } from "../types/MonitoraRetorno";

export class monitoraController extends Monitora {
  constructor(idMarketplace: number, urlProduto: string, idPs: number) {
    super({ idMarketplace });

    this.IdPs = idPs;
    this.UrlProduto = urlProduto;
  }

  private IdPs: number;
  private UrlProduto: string;

  public async get(): Promise<MonitoraRetorno> {
    const monitoraService = new MonitoraService(
      this.IdMarketplace,
      this.UrlProduto,
      this.IdPs
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
      idMonitoramento: result.idMonitoramento,
      idRegistro: result.idRegistro,
      preco: result.preco,
    };
  }
}
