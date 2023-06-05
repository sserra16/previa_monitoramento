import { PS_MARKETPLACE } from "@prisma/client";
import { IRetorno } from "../types/IRetorno";

interface retornoMarketplace extends IRetorno {
  marketplace?: PS_MARKETPLACE;
}

interface IMonitoraConstrutor {
  idMarketplace: number;
  idProduto?: number;
}

export class Monitora {
  constructor(monitoraContrutor: IMonitoraConstrutor) {
    this.IdMarketplace = monitoraContrutor.idMarketplace;
    this.IdProduto = monitoraContrutor.idProduto;
  }

  public IdMarketplace: number;
  public IdProduto?: number;

  protected async getMarketplace(): Promise<retornoMarketplace> {
    const { PrismaClient } = await import("@prisma/client");

    const prisma = new PrismaClient();
    const marketplace = await prisma.pS_MARKETPLACE.findFirst({
      where: { ID_MARKETPLACE: this.IdMarketplace },
    });

    if (!marketplace) {
      return { cod: 102, msg: "Este marketplace não está na nossa lista" };
    }

    if (!marketplace.ATIVO) {
      return { cod: 102, msg: "Este marketplace ainda não está ativo" };
    }

    return { cod: 1, marketplace };
  }

  protected async getUrlProduto(): Promise<any> {
    const { PrismaClient } = await import("@prisma/client");

    const prisma = new PrismaClient();
  }

  protected async getProduto(): Promise<any> {
    const { PrismaClient } = await import("@prisma/client");

    const prisma = new PrismaClient();

    const produto = await prisma.$queryRaw`SELECT 
		CADPRO.ID_PRODUTO
		, CADPRO.REFER
		, CADPRO.VR
		, CADPRO.TP
		, RIGHT(CADPRO.MASCABARRA, MODELEAN) ean
		, cadpron.DESCR + ' '+ cadpro.descr + ' ' + cadprov.DESCR + ' '+ cadpro_tp.DESCR descricao_completa
		FROM CADPRO 
		inner join CADPRON on cadpron.PRODUN = cadpro.MARCA
		INNER JOIN CADPROV ON CADPROV.VR = CADPRO.VR
		INNER JOIN CADPRO_TP ON CADPRO.TP = CADPRO_TP.ID_TP
		WHERE  ID_PRODUTO = ${this.IdProduto}
		and cadpro.INATI = 0`;

    if (!produto) {
      return { cod: 0, msg: "Este produto não existe" };
    }

    return { cod: 1, produto };
  }
}
