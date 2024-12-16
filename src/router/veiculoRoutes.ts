import express from "express";
import { criarVeiculo } from "../controllers/veiculoController";

const router = express.Router();

router.post("/veiculo", criarVeiculo);

export default router;
