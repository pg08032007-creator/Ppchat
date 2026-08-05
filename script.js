let selectedGender = "";
let selectedAvatar = "avatar1.png";

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
    .getElementById("identityForm")
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
        "tempUser",
        JSON.stringify({
            usuario,
            senha
        })
    );

    msg.innerHTML =
    "Conta criada com sucesso!";

    msg.classList.add("success");

    setTimeout(() => {

        document
        .getElementById("signupForm")
        .classList.add("hidden");

        document
        .getElementById("identityForm")
        .classList.remove("hidden");

    },1500);
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

        // Futuramente:
        // window.location.href = "feed.html";

    },500);
}

function selectAvatar(element){

    document
    .querySelectorAll(".avatar-option")
    .forEach(avatar => {

        avatar.classList.remove(
        "active-avatar"
        );

    });

    element.classList.add(
    "active-avatar"
    );

    selectedAvatar =
    element.src;

    document
    .getElementById(
    "selectedAvatar"
    ).src = element.src;
}

function selectGender(element, gender){

    document
    .querySelectorAll(".gender-card")
    .forEach(card => {

        card.classList.remove(
        "selected"
        );

    });

    element.classList.add(
    "selected"
    );

    selectedGender = gender;
}

function validateAge(date){

    const today =
    new Date();

    const birth =
    new Date(date);

    let age =
    today.getFullYear() -
    birth.getFullYear();

    const month =
    today.getMonth() -
    birth.getMonth();

    if(
        month < 0 ||
        (
            month === 0 &&
            today.getDate() <
            birth.getDate()
        )
    ){
        age--;
    }

    return age >= 17;
}

function finishProfile(){

    const birthDate =
    document.getElementById(
    "birthDate"
    ).value;

    const bio =
    document.getElementById(
    "bio"
    ).value.trim();

    if(!birthDate){

        alert(
        "A data de nascimento é obrigatória."
        );

        return;
    }

    if(
        !validateAge(
        birthDate
        )
    ){

        alert(
        "Você precisa ter pelo menos 17 anos."
        );

        return;
    }

    if(
        selectedGender === ""
    ){

        alert(
        "Selecione um gênero."
        );

        return;
    }

    const tempUser =
    JSON.parse(
        localStorage.getItem(
        "tempUser"
        )
    );

    localStorage.setItem(
        "user_" + tempUser.usuario,
        JSON.stringify({

            usuario:
            tempUser.usuario,

            senha:
            tempUser.senha,

            avatar:
            selectedAvatar,

            bio:
            bio,

            birthDate:
            birthDate,

            gender:
            selectedGender

        })
    );

    localStorage.removeItem(
    "tempUser"
    );

    alert(
    "Perfil criado com sucesso!"
    );

    showLogin();
}
