class Auth {
    constructor(apiBaseUrl) {
        this.apiBaseUrl = apiBaseUrl; // URL base da API
    }

// Método para registrar usuário
async registerUser(nome, email, password) {
    try {
        const response = await fetch(`${this.apiBaseUrl}/cliente`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nome, email, password }),
        });

        const data = await response.json();

        if (response.ok) {
            alert('Cadastro realizado com sucesso!');
            return true;
        } else {
            this.showError(data.message || 'Erro ao realizar o cadastro.');
            return false;
        }
    } catch (error) {
        console.error('Erro no registro:', error);
        this.showError('Erro de conexão com o servidor.');
        return false;
    }
}

    // Método para login de usuário (pesquisa pelo e-mail)
    async loginUser(email, password) {
        try {
            const response = await fetch(`${this.apiBaseUrl}/cliente/${email}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const data = await response.json();

            if (response.ok && data.password === password) {
                localStorage.setItem('userName', data.name); // Armazena o nome do usuário
                return true;
            } else {
                this.showError('E-mail e senha inválidos.');
                return false;
            }
        } catch (error) {
            console.error('Erro no login:', error);
            this.showError('Erro de conexão com o servidor.');
            return false;
        }
    }

    // Método para atualizar informações do cliente
    async updateUser(id, updatedData) {
        try {
            const response = await fetch(`${this.apiBaseUrl}/cliente/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedData),
            });

            const data = await response.json();

            if (response.ok) {
                alert('Informações atualizadas com sucesso!');
                return true;
            } else {
                this.showError(data.message || 'Erro ao atualizar as informações.');
                return false;
            }
        } catch (error) {
            console.error('Erro na atualização:', error);
            this.showError('Erro de conexão com o servidor.');
            return false;
        }
    }

    // Método para deletar um cliente
    async deleteUser(id) {
        try {
            const response = await fetch(`${this.apiBaseUrl}/cliente/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                alert('Usuário deletado com sucesso!');
                return true;
            } else {
                this.showError('Erro ao deletar o usuário.');
                return false;
            }
        } catch (error) {
            console.error('Erro ao deletar:', error);
            this.showError('Erro de conexão com o servidor.');
            return false;
        }
    }

    // Exibir mensagem de erro
    showError(message) {
        const errorMessage = document.getElementById('errorMessage') || document.getElementById('registerErrorMessage');
        if (errorMessage) {
            errorMessage.textContent = message;
        } else {
            alert(message);
        }
    }
}




