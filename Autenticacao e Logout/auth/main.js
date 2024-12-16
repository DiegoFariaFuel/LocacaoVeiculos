document.addEventListener('DOMContentLoaded', () => {
    const apiBaseUrl = 'http://localhost:3000/api'; // URL base ajustada para as rotas da API
    const auth = new Auth(apiBaseUrl);

    // Login
    const loginForm = document.getElementById('loginForm');
    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        if (await auth.loginUser(email, password)) {
            window.location.href = 'cadrastro.html';
        }
    });

    // Registro
    const registerForm = document.getElementById('registerForm');
    registerForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const name = document.getElementById('registerName').value;
        const email = document.getElementById('registerEmail').value;
        const password = document.getElementById('registerPassword').value;
    
        if (await auth.registerUser(name, email, password)) {
            window.location.href = 'index.html';
        }
    });
});
