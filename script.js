function togglePassword(id){

    const campo = document.getElementById(id);

    campo.type =
    campo.type === "password"
    ? "text"
    : "password";
}

function showSignup(){

    document
    .getElementById("loginForm")
    .classList.add("hidden");

    document
    .getElementById("signupForm")
    .classList.remove("hidden");
}

function showLogin(){

    document
    .getElementById("signupForm")
    .classList.add("hidden");

    document
    .getElementById("loginForm")
    .classList.remove("hidden");
}

function signup(){

    const usuario =
    document.getElementById("signupUser")
    .value.trim();

    const senha =
    document.getElementById("signupPass")
    .value;

    const confirmar =
    document.getElementById("signupPass2")
    .value;

    const msg =
    document.getElementById("signupMessage");

    msg.innerHTML = "";
    msg.className = "message";

    if(usuario.length < 4){

        msg.innerHTML =
        "Usuário deve ter no mínimo 4 caracteres.";

        msg.classList.add("error");
        return;
    }

    if(senha.length < 8){

        msg.innerHTML =
        "Senha deve ter no mínimo 8 caracteres.";

        msg.classList.add("error");
        return;
    }

    if(senha !== confirmar){

        msg.innerHTML =
        "As senhas não coincidem.";

        msg.classList.add("error");
        return;
    }

    if(localStorage.getItem("user_" + usuario)){

        msg.innerHTML =
        "Este usuário já existe.";

        msg.classList.add("error");
        return;
    }

    localStorage.setItem(
        "user_" + usuario,
        JSON.stringify({
            usuario,
            senha
        })
    );

    msg.innerHTML =
    "Conta criada com sucesso!";

    msg.classList.add("success");

    setTimeout(() => {
        showLogin();
    }, 1500);
}

function login(){

    const usuario =
    document.getElementById("loginUser")
    .value.trim();

    const senha =
    document.getElementById("loginPass")
    .value;

    const msg =
    document.getElementById("loginMessage");

    msg.innerHTML = "";
    msg.className = "message";

    const conta =
    localStorage.getItem("user_" + usuario);

    if(!conta){

        msg.innerHTML =
        "Usuário não encontrado.";

        msg.classList.add("error");
        return;
    }

    const dados =
    JSON.parse(conta);

    if(dados.senha !== senha){

        msg.innerHTML =
        "Senha incorreta.";

        msg.classList.add("error");
        return;
    }

    msg.innerHTML =
    "Login realizado com sucesso!";

    msg.classList.add("success");

    setTimeout(() => {

        alert(
        "Bem-vindo, " +
        dados.usuario +
        "!"
        );

    },500);
}
