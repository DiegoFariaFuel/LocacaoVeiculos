"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const clienteController_1 = require("../controllers/clienteController");
const router = (0, express_1.Router)();
router.post('/cliente', clienteController_1.create);
router.get('/cliente', clienteController_1.researchAll);
router.get('/cliente/:email', clienteController_1.researchId);
router.put('/cliente/:id', clienteController_1.update);
router.delete('/cliente/:id', clienteController_1.deleted);
exports.default = router;
//# sourceMappingURL=routes.js.map