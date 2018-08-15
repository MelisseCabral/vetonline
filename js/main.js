/*
    This file should be responsable control behavior of interface.
 */

function openModal() {
    document.getElementById("new-add-panel").style.display = "-webkit-box";
}

/* Close when someone clicks on the "x" symbol inside the overlay */
function closeModal() {
    document.getElementById("new-add-panel").style.display = "none";
}

function confirmAdd() {
    closeModal()
}
function cleanFieldModal() {

}

document.getElementById("btnCadastro_bd").addEventListener('click', function () {
    //Proceder cadastro
    closeModal();
});

//Evento de clicks em itens do menu inicial

document.getElementById("history-btn").addEventListener('click', function () {
    console.log('clicked');
    hiddenAllPanels();
    document.getElementById('history_panel').style.display = "block";
    closeMenuMobile();
});

var divs = document.querySelectorAll(".option");

for (var i = 0; i < divs.length; i++) {
    divs[i].addEventListener('click', function () {
        var id_ = this.id + "_panel";
        var div = document.getElementById(id_);
        hiddenAllPanels();
        if (id_ != 'inicio_panel') {
            div.style.display = "block";
        } else {
            div.style.display = "-webkit-box";
        }
        changeTitleScreenById(id_);
        closeMenuMobile();
    })
}

var panels = document.querySelectorAll(".panel");

document.getElementById('item-drawer-inicio').addEventListener('click', function () {
    hiddenAllPanels();
    document.getElementById('inicio_panel').style.display = "-webkit-box";
    changeTitleScreen("Inicio");
});
document.getElementById('item-drawer-my_account').addEventListener('click', function () {
    hiddenAllPanels();
    document.getElementById('my_account_panel').style.display = "block";
    changeTitleScreen("Minha conta");
});

/*
document.getElementById('item-drawer-solicitations').addEventListener('click', function () {
    hiddenAllPanels();
    document.getElementById('solicitacoes_panel').style.display = "-webkit-box";
    changeTitleScreen("Minha conta");
    document.getElementsByClassName("mdl-layout__obfuscator is-visible").click;
});
*/

function hiddenAllPanels() {
    for (var i = 0; i < panels.length; i++) {
        panels[i].style.display = "none";
    }
}

function closeMenuMobile() {
    var menu = document.getElementById("container-menu");
}

function changeTitleScreenById(titleScreen_var) {
    var str;
    switch (true) {
        case titleScreen_var == '':
            str = '';
            break;
        case titleScreen_var == '':
            str = '';
            break;
        default:
            str = 'Inicio';
    }
    var titleScreen = document.getElementById("title-screen");
    titleScreen.innerHTML = str;
}
function changeTitleScreen(titleScreen_var) {
    var titleScreen = document.getElementById("title-screen");
    titleScreen.innerHTML = titleScreen_var;
}

// Snackbar function.
function snackbar(string) {
    var snackbarContainer = document.querySelector('#demo-snackbar-example');
    var data = {
        message: string,
    };
    snackbarContainer.MaterialSnackbar.showSnackbar(data);
};