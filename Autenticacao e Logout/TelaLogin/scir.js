document.getElementById("veiculoForm").addEventListener("submit", async (event) => {
    event.preventDefault(); // Impede o comportamento padrão do formulário
  
    const messageElement = document.getElementById("message");
    messageElement.textContent = ""; // Limpa qualquer mensagem anterior
    messageElement.className = "message";
  
    // Coleta os dados do formulário
    const formData = {
      placa: document.getElementById("placa").value,
      chassi: document.getElementById("chassi").value,
      anoFabricacao: document.getElementById("anoFabricacao").value,
      cor: document.getElementById("cor").value,
      status: document.getElementById("status").value,
      marcaId: Number(document.getElementById("marcaId").value),
      modeloId: Number(document.getElementById("modeloId").value),
    };
  
    try {
      const response = await fetch("http://localhost:3000/api/veiculo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          anoFabricacao: new Date(formData.anoFabricacao).toISOString(), // Converte a data para ISO
        }),
      });
  
      if (response.ok) {
        const data = await response.json();
        messageElement.textContent = `Veículo criado com sucesso! ID: ${data.id}`;
        messageElement.classList.add("success");
  
        // Opcional: limpa os campos do formulário
        document.getElementById("veiculoForm").reset();
      } else {
        const errorData = await response.json();
        messageElement.textContent = `Erro: ${errorData.error}`;
        messageElement.classList.add("error");
        console.error("Detalhes do erro:", errorData.detalhes);
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
      messageElement.textContent = "Erro ao conectar ao servidor.";
      messageElement.classList.add("error");
    }
  });
  