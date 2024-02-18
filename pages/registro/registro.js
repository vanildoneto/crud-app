var valorDoInputEmail = document.getElementById('email');
var valorDoInputSenha = document.getElementById('password');
var confirmarSenha = document.getElementById('confimr-password');

firebase.auth().onAuthStateChanged(user => {
    if(user) {
        window.location.href = "../home/home.html"
    }
});

function registrarButton() {
    loading();
    firebase.auth().createUserWithEmailAndPassword(valorDoInputEmail.value, valorDoInputSenha.value).then(() => {
        esconderLoading();
        window.location.href = '../../pages/home/home.html';
    }).catch(error => {
        esconderLoading();
        alert(mensagemError(error));
        limpar();
        document.getElementById('registrar').disabled = true;
    })
}


//#region validação email
function validacaoInputEmail() {
    const email = valorDoInputEmail.value;
    document.getElementById('mensagem-de-erro-email').style.display = email ? 'none' : 'block';
    document.getElementById('email-invalido').style.display = /\S+@\S+\.\S+/.test(email) ? 'none' : 'block';

    desabilitarBotaoRegistrar()
}
//#endregion



//#region validação senha
function validacaoInputSenha() {
    const senha = valorDoInputSenha.value;
    document.getElementById('mensagem-de-erro-senha-minima').style.display = senha.length >= 6 ? 'none' : 'block';
    document.getElementById('mensagem-de-erro-senha').style.display = senha ? 'none' : 'block';

    validarSenhaIguais();
    desabilitarBotaoRegistrar()
}
//#endregion



//#region Validação campo Confirmar Senha
function validacaoConfirmarSenha() {
    validarSenhaIguais();
    desabilitarBotaoRegistrar()
}

function validarSenhaIguais() {
    const senha = valorDoInputSenha.value;
    const confirmacaoSenha = confirmarSenha.value;

    document.getElementById('mensagem-confirma-senha').style.display =
        confirmacaoSenha === senha ? 'none' : 'block';
}
//#endregion


//#region habilitar botao Registrar
function desabilitarBotaoRegistrar() {
    document.getElementById('registrar').disabled = !formularioInvalido();
}

function formularioInvalido() {
    const email = valorDoInputEmail.value;
    if (!email || /\S+@\S+\.\S+/.test(email) === false) {
        return false;
    }

    const senha = valorDoInputSenha.value;
    if (!senha || senha.length < 6) {
        return false;
    }

    const confirmSenha = confirmarSenha.value;
    if (senha !== confirmSenha) {
        return false;
    }

    return true;
}
//#endregion


function mensagemError(error) {
    
    if(error.code == 'auth/email-already-in-use') {
        return 'Email já está em uso. Tente outro !'
    }
    return error.message;
}


function voltar() {
    window.history.back()
    esconderLoading();
}

function limpar() {
    document.getElementById('mensagem-confirma-senha').style.display = 'none';
    document.getElementById('mensagem-de-erro-email').style.display = 'none';
    document.getElementById('email-invalido').style.display = 'none'; 
    document.getElementById('mensagem-de-erro-senha-minima').style.display = 'none'; 
    document.getElementById('mensagem-de-erro-senha').style.display = 'none';
    document.getElementById('registrar').disabled = true;

    valorDoInputEmail.value = '';
    valorDoInputSenha.value = '';
    confirmarSenha.value = '';
}