import { Router } from 'express';
import {create, researchId,researchAll,update,deleted, login } from '../controllers/clienteController'

const router = Router()

// Rota para criar um cliente
router.post('/cliente',create)

// Rota para pesquisar todos os clientes
router.get('/clientes',researchAll)

// Rota para pesquisar um cliente pelo email
router.get('/cliente/:email',researchId)

// Rota para atualizar um cliente
router.put('/cliente/:id',update)

// Rota para deletar um cliente
router.delete('/cliente/:id',deleted)

// Rota para login (nova rota)
router.post('/cliente/login', login);


export default router

