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
    
    if((loadingDiv.length) && (cloader.length)) {
        loadingDiv[0].remove();
        cloader[0].remove();
    } 
}