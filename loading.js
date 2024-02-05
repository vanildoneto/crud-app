function loading() {
    const div = document.createElement('div');
    div.classList.add('loading');

    const label = document.createElement('label');
    label.innerText = '';
    label.classList.add('c-loader');

    div.appendChild(label);
    document.body.appendChild(div);

}


function esconderLoading() {
    const loadingDiv = document.getElementsByClassName('loading');
    const cloader = document.getElementsByClassName('c-loader');

    if (loadingDiv.length > 0) {
        loadingDiv[0].remove();
    }

    if (cloader.length > 0) {
        cloader[0].remove();
    }
}

