import bcrypt from 'bcrypt';  // Importar bcrypt
import { Prisma, PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import { ErrorRequest } from '../utils/TratamentoErros';

const prisma = new PrismaClient();

// Função para criar um cliente
export const create = async (request: Request, response: Response): Promise<void> => {
    const { nome, email, password } = request.body;
    try {
        // Criptografar a senha antes de salvar
        //const hashedPassword = await bcrypt.hash(password, 10);

        const result = await prisma.cliente.create({
            data: {
                nome,
                email,
                password  //: hashedPassword, // Salvar a senha criptografada
            },
        });

        response.status(201).send({
            message: 'Cliente criado com sucesso.',
        });
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            console.error(error.code);
            response.status(409).json({
                error: {
                    message: ErrorRequest.errorRequest(error.code),
                    field: error.meta,
                },
            });
        } else {
            response.status(500).json({
                error: {
                    message: 'Erro interno no servidor.',
                },
            });
        }
    }
};

// Função de login
export const login = async (request: Request, response: Response): Promise<void> => {
    const { email, password } = request.body;

    try {
        // Procurar o cliente pelo email
        const cliente = await prisma.cliente.findUnique({
            where: { email },
        });

        // Verificar se o cliente existe
        if (!cliente) {
            response.status(404).json({
                message: 'E-mail senha inválidos',
            });
            return;
        }

        // Comparar a senha fornecida com a senha armazenada
        const isValidPassword = await bcrypt.compare(password, cliente.password);

        if (!isValidPassword) {
            response.status(401).json({
                message: 'E-mail ou senha inválidos',
            });
            return;
        }

        // Se o login for bem-sucedido
        response.status(200).json({
            message: 'Login bem-sucedido',
            cliente: {
                id: cliente.id,
                nome: cliente.nome,
                email: cliente.email,
            },
        });
    } catch (error) {
        // Verificar se o erro é uma instância de Error
        if (error instanceof Error) {
            response.status(500).json({
                message: 'Erro no servidor',
                error: error.message, // Acessa a mensagem do erro
            });
        } else {
            // Para erros desconhecidos, fornecer uma resposta genérica
            response.status(500).json({
                message: 'Erro no servidor desconhecido',
            });
        }
    }
};


//********************************************************************************************* */
export const researchAll = async (request: Request, response: Response) => {
    try {
        const result = await prisma.cliente.findMany({})
        response.status(200).json(result)
        console.log(result)
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError){
            console.log(error.code)
            response.status(409).json({
                error: {
                        message: ErrorRequest.errorRequest(error.code),
                        field: error.meta
                }
            })
        }
    }
}
//********************************************************************************************* */
export const researchId = async (request: Request, response: Response) => {
    const email = request.params.email
    try {
        const result = await prisma.cliente.findUnique({
            where:{
                email: email
            }
        })
        console.log(result)
        response.status(200).json(result)
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError){
            console.log(error.code)
            response.status(409).json({
                error: {
                        message: ErrorRequest.errorRequest(error.code),
                        field: error.meta
                }
            })
        }
    }
}
//********************************************************************************************* */
export const update = async (request: Request, response: Response) => {
    const id = request.params.id
    const {nome, email, password} = request.body

    try {
        const result = await prisma.cliente.update({
            where:{ id: Number(id)},
            data :{
                nome : nome,
                email : email,
                password : password
            }
        })
        console.log(result)
        response.status(200).json(result)
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError){
            console.log(error.code)
            response.status(409).json({
                error: {
                        message: ErrorRequest.errorRequest(error.code),
                        field: error.meta
                }
            })
        }
    } 
}
//********************************************************************************************* */
export const deleted = async (request: Request, response: Response) => {
    const id = request.params.id
    const {nome, email, password} = request.body

    try {
        const result = await prisma.cliente.delete({
            where:{ id: Number(id)},
           
        })
        console.log(result)
        response.status(200).json(result)
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError){
            console.log(error.code)
            response.status(409).json({
                error: {
                        message: ErrorRequest.errorRequest(error.code),
                        field: error.meta
                }
            })
        }
    } 
    
}