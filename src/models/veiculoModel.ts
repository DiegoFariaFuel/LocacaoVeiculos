import { v4 as uuidv4 } from "uuid"; 

interface Veiculo {
    id: string;
    placa: string;
    modelo: string;
    marca: string;
    ano: number;
    status: string;  // Ex: 'Disponível', 'Alugado', etc.
}

export const veiculo: Veiculo[] = [];
