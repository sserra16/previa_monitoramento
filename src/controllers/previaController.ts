import { Monitora } from "../classes/Monitora";
import { PreviaRetorno } from "../types/PreviaRetorno";

export class PreviaController extends Monitora {
  constructor(idMarketplace: number, idPs: number) {
    super({ idMarketplace });

    this.IdPs = idPs;
  }

  private IdPs: number;

  private async insereListaPrevia(
    preco?: number,
    titulo?: string,
    url?: string
  ) {
    const { PrismaClient } = await import("@prisma/client");
    const prisma = new PrismaClient();

    await prisma.pS_LISTA_PREVIA.create({
      data: {
        ID_MARKETPLACE: this.IdMarketplace,
        ID_PS: this.IdPs,
        PRECO_PRODUTO_MARKETPLACE: preco || 0,
        TITULO_PRODUTO_MARKTPLACE: titulo || "",
        URL_PRODUTO_MARKETPLACE: url || "",
        DATA: new Date(),
      },
    });
  }

  public async get(): Promise<PreviaRetorno> {
    const { PrismaClient } = await import("@prisma/client");
    const prisma = new PrismaClient();
    /* Instanciando o serviço */
    const { PreviaService } = await import("../services/PreviaService");

    const { ID_PRODUTO } = await prisma.pS_PRODUTO.findFirstOrThrow({
      select: { ID_PRODUTO: true },
      where: { ID_PS: this.IdPs },
    });

    this.IdProduto = ID_PRODUTO;

    const produto = await this.getProduto();

    /* Tratando erros */
    if (produto.cod === 0) {
      return { cod: 0, msg: produto.msg };
    }

    if (produto.produto.length > 1) {
      return { cod: 0, msg: "Mais de um produto encontrado." };
    }

    if (produto.produto.length == 0) {
      return {
        cod: 0,
        msg: "Nenhum produto encontrado na nossa base de dados",
      };
    }

    /* Buscando o produto */
    const nomeProduto = produto.produto[0].descricao_completa;

    const service = new PreviaService(this.IdMarketplace, nomeProduto);

    const { previa, cod, msg } = await service.index();

    if (cod === 1) {
      let preco = previa?.preco?.replace("R$", "");
      preco = preco?.replace(",", ".");

      this.insereListaPrevia(
        Number(preco),
        previa?.descricao,
        previa?.urlProduto
      );

      return { cod: 1, previa };
    }

    return { cod, msg };
  }
}
