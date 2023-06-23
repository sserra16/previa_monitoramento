import { IRetorno } from "./IRetorno";
import { listaProduto } from "./ListaProdutosType";

export interface PreviaRetorno extends IRetorno {
  previa?: listaProduto;
  idMarketplace?: number;
}
