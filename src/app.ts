import express from 'express'
import dotenv from 'dotenv'
import authRouters from './router/routes'
import { PrismaClient } from '@prisma/client';
import veiculoRoutes from "./router/veiculoRoutes";
import cors from 'cors'

dotenv.config()
const app = express()
const PORTA = process.env.PORT
const prisma = new PrismaClient();

dotenv.config();
console.log(`Porta carregada do .env: ${process.env.PORT}`);


app.use(express.json())
app.use(cors())
app.use('/api',authRouters)
app.use("/api", veiculoRoutes);


app.listen(PORTA,() =>{
    console.log(`Servidor executando na porta: ${PORTA}`)
})


