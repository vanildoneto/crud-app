var valorDoInputEmail = document.getElementById('email');
var valorDoInputSenha = document.getElementById('password');

firebase.auth().onAuthStateChanged(user => {
    if(user) {
        window.location.href = "pages/home/home.html"
    }
});

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
    firebase.auth().signInWithEmailAndPassword(valorDoInputEmail.value, valorDoInputSenha.value).then(() => {
        window.location.href = '/pages/home/home.html';
    }).catch(error => {
        setTimeout(function() {
            alert(tipoDeMensagemDeErro(error));
        }, 100);
        esconderLoading();
    });
}

function tipoDeMensagemDeErro(error) {
    if (error.code == 'auth/invalid-login-credentials') {
        return 'Usuário não encontrado';
    } else if (error.code == "auth/wrong-password") {
        return 'Senha inválida';
    } else if (error.code == 'auth/missing-email') {
        return 'Email Inválido';
    }

    return error.message;
}

function registro() {
    loading();
    setTimeout(function() {
        window.location.href = '/pages/registro/registro.html';
    }, 2000);
}

function recuperacaoDeSenha() {
    loading();
    firebase.auth().sendPasswordResetEmail(valorDoInputEmail.value).then(() => {
        alert('Email de recuperação enviado com sucesso');
        esconderLoading();
    }).catch(error => {
        setTimeout(function() {
            alert(tipoDeMensagemDeErro(error));
        }, 100);
        esconderLoading();
    });
}

function limpar() {
    valorDoInputEmail.value = '';
    valorDoInputSenha.value = '';

    document.getElementById('mensagem-de-erro-email').style.display = 'none';
    document.getElementById('email-invalido').style.display = 'none';
    document.getElementById('mensagem-de-erro-senha').style.display = 'none';
}
    