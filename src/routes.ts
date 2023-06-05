import { Router } from "express";
import { PreviaController } from "./controllers/previaController";
import { monitoraController } from "./controllers/monitoraController";

const router = Router();

router.post("/previa", async (req, res) => {
  const body = req.body;

  const previa = new PreviaController(body.idProduto, body.idMarketplace);

  const result = await previa.get();

  res.json({ result });
});

router.post("/monitoramento", async (req, res) => {
  const body = req.body;

  const monitoramento = new monitoraController(
    body.idMarketplace,
    body.urlProduto,
    body.idPs
  );

  const result = await monitoramento.get();

  res.json({ result });
});

export default router;
