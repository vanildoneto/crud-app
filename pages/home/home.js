function logout() {
    firebase.auth().signOut().then(() => {
        window.location.href = "../../index.html";
    }).catch(() => {
        alert('Erro ao fazer logout !')
    })
}

firebase.auth().onAuthStateChanged(user => {
    if(user) {
        procurarTransacoes(user)
    }
});

function novaTransacao() {
    window.location.href = '../transacao/transacao.html';
}

function procurarTransacoes(user) {
    loading();
    firebase.firestore()
        .collection('transacoes')
        .where('user.uid', '==', user.uid)
        .orderBy('date', 'desc')
        .get()
        .then(snapshot => {
        esconderLoading();
        const transacoes = snapshot.docs.map(doc => doc.data());
        adicionarTransacoes(transacoes)
    })
    .catch(error => {
        esconderLoading();
        alert('Erro ao recuperar transações :( ')
    })
}

function adicionarTransacoes(transacao) {
    const listaOrdenada = document.getElementById('transacoes');

    transacao.forEach(element => {
        const li = document.createElement('li');
        li.classList.add(element.type);

        const date = document.createElement('p');
        date.innerHTML = formatarData(element.date);
        li.appendChild(date);

        const dinheiro = document.createElement('p');
        dinheiro.innerHTML = formatarDinheiro(element.dinheiro);
        li.appendChild(dinheiro);

        const tipoTransacao = document.createElement('p');
        tipoTransacao.innerHTML = element.tipoTransacao;
        li.appendChild(tipoTransacao);

        listaOrdenada.appendChild(li)
    });
}

function formatarData(date) {
    return new Date(date).toLocaleDateString('pt-br');
}

function formatarDinheiro(dinheiro) {
    return `${dinheiro.moeda} ${dinheiro.valor.toFixed(2)}`
}