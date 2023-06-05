import { Monitora } from "../classes/Monitora";
import { IRetorno } from "../types/IRetorno";
import { listaProduto } from "../types/ListaProdutosType";

interface indexRetorno extends IRetorno {
  listaPrevia?: listaProduto[];
}

export class PreviaController extends Monitora {
  constructor(idProduto: number, idMarketplace: number) {
    super({ idMarketplace, idProduto });
  }

  public async get(): Promise<indexRetorno> {
    /* Instanciando o serviço */
    const { PreviaService } = await import("../services/PreviaService");

    const produto = await this.getProduto();

    /* Tratando erros */
    if (produto.cod === 0) {
      return { cod: 0, msg: produto.msg };
    }

    if (produto.produto.length > 1) {
      return { cod: 0, msg: "Mais de um produto encontrado." };
    }
 
    if (produto.produto.length == 0) {
      return { cod: 0, msg: "Nenhum produto encontrado" }
    }

    /* Buscando o produto */
    const nomeProduto = produto.produto[0].descricao_completa;

    const service = new PreviaService(this.IdMarketplace, 2, nomeProduto);

    const { listaPrevia, cod, msg } = await service.index();

    if (cod === 1) {
      return { cod: 1, listaPrevia };
    }

    return { cod, msg };
  }
}
