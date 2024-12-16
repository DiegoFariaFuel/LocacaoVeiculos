"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleted = exports.update = exports.researchId = exports.researchAll = exports.create = void 0;
const client_1 = require("@prisma/client");
const TratamentoErros_1 = require("../utils/TratamentoErros");
const prisma = new client_1.PrismaClient();
//********************************************************************************************* */
const create = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { nome, email, celular } = request.body;
    try {
        const result = yield prisma.cliente.create({
            data: {
                nome: nome,
                email: email,
                celular: celular
            }
        });
        response.status(201).send({
            "message": "Metodo HTTP: método create."
        });
    }
    catch (error) {
        if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
            console.log(error.code);
            response.status(409).json({
                error: {
                    message: TratamentoErros_1.ErrorRequest.errorRequest(error.code),
                    field: error.meta
                }
            });
        }
    }
});
exports.create = create;
//********************************************************************************************* */
const researchAll = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield prisma.cliente.findMany({});
        response.status(200).json(result);
        console.log(result);
    }
    catch (error) {
        if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
            console.log(error.code);
            response.status(409).json({
                error: {
                    message: TratamentoErros_1.ErrorRequest.errorRequest(error.code),
                    field: error.meta
                }
            });
        }
    }
});
exports.researchAll = researchAll;
//********************************************************************************************* */
const researchId = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const email = request.params.email;
    try {
        const result = yield prisma.cliente.findUnique({
            where: {
                email: email
            }
        });
        console.log(result);
        response.status(200).json(result);
    }
    catch (error) {
        if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
            console.log(error.code);
            response.status(409).json({
                error: {
                    message: TratamentoErros_1.ErrorRequest.errorRequest(error.code),
                    field: error.meta
                }
            });
        }
    }
});
exports.researchId = researchId;
//********************************************************************************************* */
const update = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const id = request.params.id;
    const { nome, email, celular } = request.body;
    try {
        const result = yield prisma.cliente.update({
            where: { id: Number(id) },
            data: {
                nome: nome,
                email: email,
                celular: celular
            }
        });
        console.log(result);
        response.status(200).json(result);
    }
    catch (error) {
        if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
            console.log(error.code);
            response.status(409).json({
                error: {
                    message: TratamentoErros_1.ErrorRequest.errorRequest(error.code),
                    field: error.meta
                }
            });
        }
    }
});
exports.update = update;
//********************************************************************************************* */
const deleted = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const id = request.params.id;
    const { nome, email, celular } = request.body;
    try {
        const result = yield prisma.cliente.delete({
            where: { id: Number(id) },
        });
        console.log(result);
        response.status(200).json(result);
    }
    catch (error) {
        if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
            console.log(error.code);
            response.status(409).json({
                error: {
                    message: TratamentoErros_1.ErrorRequest.errorRequest(error.code),
                    field: error.meta
                }
            });
        }
    }
});
exports.deleted = deleted;
//# sourceMappingURL=clienteController.js.map