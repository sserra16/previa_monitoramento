import { IRetorno } from "./IRetorno";

export interface MonitoraRetorno extends IRetorno {
  preco?: number;
  data?: Date;
  idRegistro?: number;
  idMonitoramento?: number;
}
