// Lista de Avatares para a Roleta
const avatarSeeds = [
  'Pajama', 'Felix', 'Aneka', 'Zoe', 'Jack', 
  'Bella', 'Leo', 'Maya', 'Oliver', 'Ruby'
];

// Inicialização da Roleta
document.addEventListener('DOMContentLoaded', () => {
  renderAvatarCarousel();
});

function renderAvatarCarousel() {
  const container = document.getElementById('avatarsRow');
  if (!container) return;

  container.innerHTML = '';

  avatarSeeds.forEach((seed, index) => {
    const url = `https://api.dicebear.com/7.x/big-smile/svg?seed=${seed}&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf`;

    const div = document.createElement('div');
    div.className = `avatar-option ${index === 0 ? 'selected' : ''}`;
    div.onclick = function () { selectPreset(url, this); };

    const img = document.createElement('img');
    img.src = url;
    img.alt = seed;

    div.appendChild(img);
    container.appendChild(div);
  });
}

// Seleção de Avatar
function selectPreset(url, element) {
  document.querySelectorAll('.avatar-option').forEach(el => el.classList.remove('selected'));
  element.classList.add('selected');
  document.getElementById('avatarPreview').src = url;
}

// Preview da Foto do Usuário
function previewImage(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      document.getElementById('avatarPreview').src = e.target.result;
      document.querySelectorAll('.avatar-option').forEach(el => el.classList.remove('selected'));
    };
    reader.readAsDataURL(file);
  }
}

// Senha
function toggleVisibility(inputId, icon) {
  const input = document.getElementById(inputId);
  if (input.type === 'password') {
    input.type = 'text';
    icon.classList.remove('fa-eye');
    icon.classList.add('fa-eye-slash');
  } else {
    input.type = 'password';
    icon.classList.remove('fa-eye-slash');
    icon.classList.add('fa-eye');
  }
}

// Navegação das Telas
window.showLogin = function(e) {
  if (e) e.preventDefault();
  document.getElementById('loginStep').classList.remove('hidden');
  document.getElementById('registerStep1').classList.add('hidden');
  document.getElementById('registerStep2').classList.add('hidden');
  document.getElementById('stepDots').classList.add('hidden');
};

window.showRegister = function(e) {
  if (e) e.preventDefault();
  document.getElementById('loginStep').classList.add('hidden');
  document.getElementById('registerStep1').classList.remove('hidden');
  document.getElementById('registerStep2').classList.add('hidden');
  
  const dots = document.getElementById('stepDots');
  dots.classList.remove('hidden');
  document.getElementById('dot1').classList.add('active');
  document.getElementById('dot2').classList.remove('active');
};

window.goToRegisterStep2 = function() {
  const pass = document.getElementById('regPassword').value;
  const confirm = document.getElementById('regConfirmPassword').value;

  if (pass !== confirm) {
    alert('As senhas não coincidem!');
    return;
  }

  document.getElementById('registerStep1').classList.add('hidden');
  document.getElementById('registerStep2').classList.remove('hidden');
  document.getElementById('dot1').classList.remove('active');
  document.getElementById('dot2').classList.add('active');
};

window.goToRegisterStep1 = function() {
  document.getElementById('registerStep2').classList.add('hidden');
  document.getElementById('registerStep1').classList.remove('hidden');
  document.getElementById('dot2').classList.remove('active');
  document.getElementById('dot1').classList.add('active');
};

function setGender(button) {
  document.querySelectorAll('.gender-btn').forEach(btn => btn.classList.remove('active'));
  button.classList.add('active');
}

function handleSignin() {
  alert('Entrando na conta...');
}

function finishRegister() {
  const birthInput = document.querySelector('#registerStep2 input[type="date"]');
  
  if (!birthInput || !birthInput.value) {
    alert('Por favor, selecione sua data de nascimento.');
    return;
  }

  // Validação de 16 anos
  const birthDate = new Date(birthInput.value);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  if (age < 16) {
    alert('Você precisa ter pelo menos 16 anos para criar uma conta.');
    return;
  }

  // Validação do Gênero Obrigatório
  const selectedGender = document.querySelector('.gender-btn.active');
  if (!selectedGender) {
    alert('Por favor, selecione um gênero/pronome.');
    return;
  }

  alert('Conta criada com sucesso!');
}
