"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const veiculoController_1 = require("../controllers/veiculoController");
const router = express_1.default.Router();
router.post("/veiculos", veiculoController_1.criarVeiculo);
exports.default = router;
//# sourceMappingURL=veiculoRoutes.js.map