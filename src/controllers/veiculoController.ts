import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";
const prisma = new PrismaClient();

// Ajuste o caminho para o cliente Prisma

// 1. Criar um novo veículo
export const criarVeiculo = async (request: Request, response: Response): Promise<void> => {
    const { placa, chassi, anoFabricacao, cor, status, marcaId, modeloId } = request.body;

    // Verifique se a data está no formato correto
    const dataAnoFabricacao = new Date(anoFabricacao);
    if (isNaN(dataAnoFabricacao.getTime())) {
        response.status(400).json({
            message: 'Data de fabricação inválida',
        });
        return;
    }

    try {
        const veiculo = await prisma.veiculo.create({
            data: {
                placa,
                chassi,
                anoFabricacao: dataAnoFabricacao,
                cor,
                status,
                marca: { connect: { id: marcaId } },
                modelo: { connect: { id: modeloId } },
            },
        });
        response.status(201).json({
            message: 'Veículo criado com sucesso',
            veiculo,
        });
    } catch (error) {
        response.status(500).json({
            message: 'Erro ao criar o veículo',
            error: error instanceof Error ? error.message : 'Erro desconhecido',
        });
    }
};


// 2. Buscar um veículo pelo ID
export const buscarVeiculo = async (request: Request, response: Response): Promise<void> => {
    const { id } = request.params;

    try {
        const veiculo = await prisma.veiculo.findUnique({
            where: { id: parseInt(id) },
            include: {
                marca: true,
                modelo: true,
            },
        });

        if (!veiculo) {
            response.status(404).json({
                message: 'Veículo não encontrado',
            });
            return;
        }

        response.status(200).json({
            veiculo,
        });
    } catch (error) {
        response.status(500).json({
            message: 'Erro ao buscar o veículo',
            error: error instanceof Error ? error.message : 'Erro desconhecido',
        });
    }
};

// 3. Atualizar as informações de um veículo
export const atualizarVeiculo = async (request: Request, response: Response): Promise<void> => {
    const { id } = request.params;
    const { placa, chassi, anoFabricacao, cor, status, marcaId, modeloId } = request.body;

    try {
        const veiculo = await prisma.veiculo.update({
            where: { id: parseInt(id) },
            data: {
                placa,
                chassi,
                anoFabricacao: new Date(anoFabricacao), // Certifique-se de que anoFabricacao seja passado corretamente
                cor,
                status,
                marca: { connect: { id: marcaId } },
                modelo: { connect: { id: modeloId } },
            },
        });

        response.status(200).json({
            message: 'Veículo atualizado com sucesso',
            veiculo,
        });
    } catch (error) {
        response.status(500).json({
            message: 'Erro ao atualizar o veículo',
            error: error instanceof Error ? error.message : 'Erro desconhecido',
        });
    }
};

// 4. Excluir um veículo
export const excluirVeiculo = async (request: Request, response: Response): Promise<void> => {
    const { id } = request.params;

    try {
        const veiculo = await prisma.veiculo.delete({
            where: { id: parseInt(id) },
        });

        response.status(200).json({
            message: 'Veículo excluído com sucesso',
            veiculo,
        });
    } catch (error) {
        response.status(500).json({
            message: 'Erro ao excluir o veículo',
            error: error instanceof Error ? error.message : 'Erro desconhecido',
        });
    }
};

// 5. Listar todos os veículos (opcional)
export const listarVeiculos = async (request: Request, response: Response): Promise<void> => {
    try {
        const veiculos = await prisma.veiculo.findMany({
            include: {
                marca: true,
                modelo: true,
            },
        });

        response.status(200).json({
            veiculos,
        });
    } catch (error) {
        response.status(500).json({
            message: 'Erro ao listar veículos',
            error: error instanceof Error ? error.message : 'Erro desconhecido',
        });
    }
};
