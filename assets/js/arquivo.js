// Função Factory para criar um novo usuário
function criarUsuario(nome, nascimento, telefone, email) {
    return { nome, nascimento, telefone, email };
}

// Função para salvar o usuário no localStorage
function salvarUsuario(usuario) {
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    usuarios.push(usuario);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
}

// Função para remover acentos e normalizar o texto
function removerAcentos(texto) {
    return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

// Função para deletar um usuário
function deletarUsuario(indice) {
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    usuarios.splice(indice, 1); // Remove o usuário pelo índice
    localStorage.setItem("usuarios", JSON.stringify(usuarios)); // Atualiza o localStorage
    exibirUsuarios(); // Atualiza a lista exibida
}

// Função para exibir os usuários na página
function exibirUsuarios(filtro = "") {
    const listaUsuarios = document.getElementById("userList");
    listaUsuarios.innerHTML = ""; // Limpa a lista antes de exibir

    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    // Filtra os usuários com base no filtro (nome)
    const usuariosFiltrados = usuarios.filter(usuario => {
        const nomeNormalizado = removerAcentos(usuario.nome.toLowerCase());
        const filtroNormalizado = removerAcentos(filtro.toLowerCase());
        return nomeNormalizado.includes(filtroNormalizado);
    });

    usuariosFiltrados.forEach((usuario, indice) => {
        const item = document.createElement("li");
        item.textContent = `Nome: ${usuario.nome}, Nascimento: ${usuario.nascimento}, Telefone: ${usuario.telefone}, Email: ${usuario.email}`;

        // Cria um botão de deletar
        const botaoDeletar = document.createElement("button");
        botaoDeletar.textContent = "Deletar";
        botaoDeletar.onclick = () => deletarUsuario(indice); // Adiciona o evento de clique

        item.appendChild(botaoDeletar); // Adiciona o botão à lista
        listaUsuarios.appendChild(item); // Adiciona o item à lista
    });
}

// Evento para o formulário de cadastro de usuário
document.getElementById("userForm").addEventListener("submit", function(evento) {
    evento.preventDefault();

    // Coleta os dados do formulário
    const nome = document.getElementById("name").value;
    const nascimento = document.getElementById("birthdate").value;
    const telefone = document.getElementById("phone").value;
    const email = document.getElementById("email").value;

    // Cria e salva o usuário usando o padrão Factory
    const novoUsuario = criarUsuario(nome, nascimento, telefone, email);
    salvarUsuario(novoUsuario);

    // Exibe os usuários atualizados e limpa o formulário
    exibirUsuarios();
    document.getElementById("userForm").reset();
});

// Evento para o campo de busca
document.getElementById("search").addEventListener("input", function() {
    const filtro = document.getElementById("search").value;
    exibirUsuarios(filtro);
});

// Exibe os usuários ao carregar a página
exibirUsuarios();
