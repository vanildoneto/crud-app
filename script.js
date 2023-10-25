var valorDoInputEmail = document.getElementById('email')
var valorDoInputSenha = document.getElementById('password')

function validacaoInputEmail() {
    habilitarBotoes();
    validacaoDeErrosEmail();
}

function validacaoInputSenha() {
    habilitarBotoes();
    validacaoDeErrosSenha();
}

function validacaoEmail() {
    const email = document.getElementById("email").value;
    if (!email) {
        return false;
    }
    return emailValido(email);
}

function validacaoSenha() {
    const password = document.getElementById("password").value;
    if (!password) {
        return false;
    }
    return true;
}

function emailValido(email) {
    return /\S+@\S+\.\S+/.test(email);
}

function habilitarBotoes() {
    const emailValid = validacaoEmail();
    document.getElementById("recover-password-button").disabled = !emailValid;

    const passwordValid = validacaoSenha();
    document.getElementById("login-button").disabled = !emailValid || !passwordValid;
}

function validacaoDeErrosEmail() {
    const email = document.getElementById('email').value;

    document.getElementById('mensagem-de-erro-email').style.display = email ? 'none' : 'block';

    document.getElementById('email-invalido').style.display = validacaoEmail(email) ? 'none' : 'block';
}

function validacaoDeErrosSenha() {
    const senha = document.getElementById('password').value;

    document.getElementById('mensagem-de-erro-senha').style.display = senha ? 'none' : 'block';
}

function login() {
    loading();
    firebase.auth().signInWithEmailAndPassword(valorDoInputEmail.value, valorDoInputSenha.value).then(response => {
        window.location.href = '/pages/home/home.html'
    }).catch(error => {
        setTimeout(function() {
            alert(tipoDeMensagemDeErro(error));
        }, 100);
        esconderLoading();
        
    })
}

function tipoDeMensagemDeErro(error) {
    if(error.code == 'auth/invalid-login-credentials') {
        return 'Usuário não encontrado';
    }

    return error.mensage;
}

function registro() {
    loading();
    setTimeout(function() {
        window.location.href = '/pages/registro/registro.html';
    }, 2000);
}