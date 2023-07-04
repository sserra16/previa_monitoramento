import { PreviaRetorno } from "../types/PreviaRetorno";

export class PreviaController {
  constructor(idMarketplace: number, descricaoProduto: string) {
    this.DescricaoProduto = descricaoProduto;
    this.IdMarketplace = idMarketplace;
  }

  private IdMarketplace: number;
  private DescricaoProduto: string;

  public async get(): Promise<PreviaRetorno> {
    const { PreviaService } = await import("../services/PreviaService");

    const service = new PreviaService(
      this.IdMarketplace,
      this.DescricaoProduto
    );

    const { previa, cod, msg } = await service.index();

    if (cod === 1) {
      return { cod: 1, previa };
    }

    return { cod, msg };
  }
}
