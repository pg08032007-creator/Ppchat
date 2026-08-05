let selectedGender = "";
let selectedAvatar = "avatar1.png";

// Mostrar/ocultar senha
function togglePassword(id) {
    const campo = document.getElementById(id);
    campo.type = campo.type === "password" ? "text" : "password";
}

// Mostrar tela de cadastro
function showSignup() {
    document.getElementById("loginForm").classList.add("hidden");
    document.getElementById("signupForm").classList.remove("hidden");
}

// Mostrar tela de login
function showLogin() {
    document.getElementById("signupForm").classList.add("hidden");
    document.getElementById("identityForm").classList.add("hidden");
    document.getElementById("loginForm").classList.remove("hidden");
}

// Cadastro
async function signup() {
    const email = document.getElementById("signupEmail").value.trim();
    const usuario = document.getElementById("signupUser").value.trim();
    const senha = document.getElementById("signupPass").value;
    const confirmar = document.getElementById("signupPass2").value;
    const msg = document.getElementById("signupMessage");

    msg.innerHTML = "";
    msg.className = "message";

    if (!email || !email.includes("@")) {
        msg.innerHTML = "Digite um e-mail válido.";
        msg.classList.add("error");
        return;
    }

    if (usuario.length < 4) {
        msg.innerHTML = "Usuário deve ter no mínimo 4 caracteres.";
        msg.classList.add("error");
        return;
    }

    if (senha.length < 8) {
        msg.innerHTML = "Senha deve ter no mínimo 8 caracteres.";
        msg.classList.add("error");
        return;
    }

    if (senha !== confirmar) {
        msg.innerHTML = "As senhas não coincidem.";
        msg.classList.add("error");
        return;
    }

    // Verifica se o e-mail já existe
    const { data } = await supabase
        .from("users")
        .select("email")
        .eq("email", email)
        .single();

    if (data) {
        msg.innerHTML = "Este e-mail já está cadastrado.";
        msg.classList.add("error");
        return;
    }

    // Guarda temporariamente até completar o perfil
    localStorage.setItem(
        "tempUser",
        JSON.stringify({
            email,
            usuario,
            senha
        })
    );

    msg.innerHTML = "Conta criada com sucesso!";
    msg.classList.add("success");

    setTimeout(() => {
        document.getElementById("signupForm").classList.add("hidden");
        document.getElementById("identityForm").classList.remove("hidden");
    }, 1500);
}

// Login
async function login() {
    const email = document.getElementById("loginUser").value.trim();
    const senha = document.getElementById("loginPass").value;
    const msg = document.getElementById("loginMessage");

    msg.innerHTML = "";
    msg.className = "message";

    const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("email", email)
        .single();

    if (error || !data) {
        msg.innerHTML = "E-mail não encontrado.";
        msg.classList.add("error");
        return;
    }

    if (data.password !== senha) {
        msg.innerHTML = "Senha incorreta.";
        msg.classList.add("error");
        return;
    }

    msg.innerHTML = "Login realizado com sucesso!";
    msg.classList.add("success");

    setTimeout(() => {
        alert("Bem-vindo, " + data.username + "!");
        // window.location.href = "feed.html";
    }, 500);
}

// Seleção de avatar
function selectAvatar(element) {
    document.querySelectorAll(".avatar-option").forEach(avatar => {
        avatar.classList.remove("active-avatar");
    });

    element.classList.add("active-avatar");
    selectedAvatar = element.getAttribute("src");
    document.getElementById("selectedAvatar").src = selectedAvatar;
}

// Seleção de gênero
function selectGender(element, gender) {
    document.querySelectorAll(".gender-card").forEach(card => {
        card.classList.remove("selected");
    });

    element.classList.add("selected");
    selectedGender = gender;
}

// Validar idade
function validateAge(date) {
    const today = new Date();
    const birth = new Date(date);

    let age = today.getFullYear() - birth.getFullYear();
    const month = today.getMonth() - birth.getMonth();

    if (month < 0 || (month === 0 && today.getDate() < birth.getDate())) {
        age--;
    }

    return age >= 17;
}

// Finalizar perfil
async function finishProfile() {
    const birthDate = document.getElementById("birthDate").value;
    const bio = document.getElementById("bio").value.trim();

    if (!birthDate) {
        alert("A data de nascimento é obrigatória.");
        return;
    }

    if (!validateAge(birthDate)) {
        alert("Você precisa ter pelo menos 17 anos.");
        return;
    }

    if (selectedGender === "") {
        alert("Selecione um gênero.");
        return;
    }

    const tempUser = JSON.parse(localStorage.getItem("tempUser"));

    const { error } = await supabase
        .from("users")
        .insert({
            email: tempUser.email,
            username: tempUser.usuario,
            password: tempUser.senha,
            avatar: selectedAvatar,
            bio: bio,
            birth_date: birthDate,
            gender: selectedGender
        });

    if (error) {
        alert("Erro ao salvar perfil: " + error.message);
        return;
    }

    localStorage.removeItem("tempUser");

    alert("Perfil criado com sucesso!");
    showLogin();
}
