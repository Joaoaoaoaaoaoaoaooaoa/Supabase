function buscarUsuarios() {
 
    fetch("https://supabase-s6vb.onrender.com/usuarios")
 
        .then(response => response.json())
 
        .then(dados => {
 
            let lista =
                document.getElementById("listaUsuarios");
 
            lista.innerHTML = "";
 
 
            dados.forEach(usuario => {
 
                let item =
                    document.createElement("li");
 
                item.innerText =
                    usuario.id + " - " + usuario.nome;
 
                lista.appendChild(item);
 
            });
 
        });
 
}
 
 
 
function cadastrarUsuario() {
 
    let nome =
        document.getElementById("nome").value;
 
    let mensagem =
        document.getElementById("mensagem");
 
 
    if (nome === "") {
 
        mensagem.innerText =
            "Digite um nome.";
 
        return;
    }
 
 
    
    fetch("https://supabase-s6vb.onrender.com/usuarios", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ nome: nome })
    })
    .then(async response => {
        const dados = await response.json();

        if (!response.ok) {
            throw new Error(
                dados.detail || "Erro ao cadastrar usuário."
            );
        }

        return dados;
    })
    .then(usuario => {
        mensagem.innerText =
            "Usuário " + usuario.nome +
            " cadastrado com sucesso!";

        document.getElementById("nome").value = "";

        buscarUsuarios();
    })
    .catch(erro => {
        mensagem.innerText =
            "Não foi possível cadastrar: " + erro.message;

        console.error("Erro na API:", erro);
    });

}
 
 
 
function atualizarUsuario() {
 
    let id =
        document.getElementById("idAtualizar").value;
 
    let nome =
        document.getElementById("nomeAtualizar").value;
 
 
    if (id === "" || nome === "") {
 
        alert("Preencha o ID e o novo nome.");
 
        return;
    }
 
 
    fetch(
        "https://supabase-s6vb.onrender.com/usuarios/" + id,
        {
 
            method: "PUT",
 
            headers: {
                "Content-Type": "application/json"
            },
 
            body: JSON.stringify({
                nome: nome
            })
 
        }
    )
 
    .then(response => {
 
        if (!response.ok) {
            throw new Error("Usuário não encontrado");
        }
 
        return response.json();
 
    })
 
    .then(usuario => {
 
        alert(
            "Usuário atualizado para: " +
            usuario.nome
        );
 
        document.getElementById("idAtualizar").value = "";
 
        document.getElementById("nomeAtualizar").value = "";
 
        buscarUsuarios();
 
    })
 
    .catch(erro => {
 
        alert(erro.message);
 
    });
 
}
 
 
 
function excluirUsuario() {
 
    let id =
        document.getElementById("idExcluir").value;
 
 
    if (id === "") {
 
        alert("Digite o ID do usuário.");
 
        return;
    }
 
 
    fetch(
        "https://supabase-s6vb.onrender.com/usuarios/" + id,
        {
 
            method: "DELETE"
 
        }
    )
 
    .then(response => {
 
        if (!response.ok) {
            throw new Error("Usuário não encontrado");
        }
 
        return response.json();
 
    })
 
    .then(dados => {
 
        alert(dados.mensagem);
 
        document.getElementById("idExcluir").value = "";
 
        buscarUsuarios();
 
    })
 
    .catch(erro => {
 
        alert(erro.message);
 
    });
 
}
// function pegarUsuarios() {
//      let usuarios =
//         localStorage.getItem("usuarios");
  
//     if (usuarios === null) { 
//         return []; 
//     }  
//     return JSON.parse(usuarios); 
// }
  
// function salvarUsuarios(usuarios) { 
//     localStorage.setItem(
//         "usuarios",
//         JSON.stringify(usuarios)
//     ); 
// }
  
// function listarUsuarios() { 
//     let usuarios = pegarUsuarios(); 
//     let lista =
//         document.getElementById("listaUsuarios"); 
//     lista.innerHTML = "";
  
//     usuarios.forEach(usuario => { 
//         let item =
//             document.createElement("li");
//         item.innerText =
//             usuario.id + " - " + usuario.nome; 
//         lista.appendChild(item); 
//     }); 
// }
 
// function cadastrarUsuario() { 
//     let nome =
//         document.getElementById("nome").value; 
//     let mensagem =
//         document.getElementById("mensagem");
 
//     if (nome === "") { 
//         mensagem.innerText =
//             "Digite um nome."; 
//         return;
//     }
 
//     let usuarios = pegarUsuarios(); 
 
//     let novoId = 1;
 
//     if (usuarios.length > 0) { 
//         novoId =
//             usuarios[usuarios.length - 1].id + 1; 
//     } 
 
//     let novoUsuario = { 
//         id: novoId,
//         nome: nome
//     };
  
//     usuarios.push(novoUsuario); 
 
//     salvarUsuarios(usuarios); 
 
//     mensagem.innerText =
//         "Usuário cadastrado com sucesso!"; 
 
//     document.getElementById("nome").value = "";
  
//     buscarUsuarios(); 
// }  
 
// function atualizarUsuario() { 
//     let id =
//         Number(
//             document.getElementById("idAtualizar").value
//         ); 
//     let nome =
//         document.getElementById("nomeAtualizar").value; 
 
//     if (id === 0 || nome === "") { 
//         alert("Preencha o ID e o novo nome."); 
//         return; 
//     }
 
//     let usuarios = pegarUsuarios();
 
//     let usuarioEncontrado =
//         usuarios.find(
//             usuario => usuario.id === id
//         ); 
 
//     if (usuarioEncontrado === undefined) { 
//         alert("Usuário não encontrado."); 
//         return; 
//     } 
 
//     usuarioEncontrado.nome = nome; 
 
//     salvarUsuarios(usuarios); 
 
//     alert("Usuário atualizado com sucesso!");
 
//     document.getElementById("idAtualizar").value = "";
 
//     document.getElementById("nomeAtualizar").value = ""; 
 
//     buscarUsuarios(); 
// } 
 
// function deletarUsuario() { 
//     let id =
//         Number(
//             document.getElementById("idDeletar").value
//         ); 
 
//     if (id === 0) { 
//         alert("Digite o ID do usuário.");
//         return; 
//     }
 
//     let usuarios = pegarUsuarios();
  
//     let novosUsuarios =
//         usuarios.filter(
//             usuario => usuario.id !== id
//         ); 
 
//     if (novosUsuarios.length === usuarios.length) {
//         alert("Usuário não encontrado.");
//         return;
//     }
 
//     salvarUsuarios(novosUsuarios);
 
//     alert("Usuário excluído com sucesso!");
 
//     document.getElementById("idExcluir").value = "";
 
//     buscarUsuarios(); 
// }
  
// buscarUsuarios();