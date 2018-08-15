/*
    This file should be responsable for the authenication
    and configuration of firebase inicialization.
 */

$(function () {
    // Initialize Firebase
    var config = {
    apiKey: "AIzaSyBj8_msY2rQopK3tDVQay5tYwFeSVuzG0E",
    authDomain: "myvet-32067.firebaseapp.com",
    databaseURL: "https://myvet-32067.firebaseio.com",
    projectId: "myvet-32067",
    storageBucket: "",
    messagingSenderId: "699330044185"
    };

    firebase.initializeApp(config);

    // Shared variables. 
    var email = null;
    var displayName = null;
    var uid = null;

    //const db = firebase.firestore();
   // db.settings({ timestampsInSnapshots: true });

    // Control variables;
    var signedout = false;
    var logged = false;

    // Shared variables. 
    var email = null;
    var displayName = null;
    var photoURL = null;
    var uid = null;

    /*
    const dbUser = db.collection("users");
    const dbPublications = db.collection("pets");
    const dbProjects = db.collection("clinics");
*/


    //Get Elements
    btnLogin = document.getElementById("login-btn"),
    btnSignUp = document.getElementById("signUp_btn"),
    btnLogout = document.getElementById("btn_logout");

    btnLogin.addEventListener('click', function () {
        //Get email and Pass
        const email = document.getElementById("login-txt").value,
            pass = document.getElementById("password-txt").value,
            auth = firebase.auth();
        auth.signInWithEmailAndPassword(email, pass).then(function () {
            logged = true;
            checkAuth();
        }).catch(function (error) {
            snackbar(error);
        });

    });

    btnSignUp.addEventListener('click', function () {
        //Get Email and confirm password
        const email = document.getElementById("email-signup").value,
            pass = document.getElementById("password-signup").value,
            confirmPass = document.getElementById("confirm-password").value,
            auth = firebase.auth();

        if (pass == confirmPass) {
            const promise = auth.createUserWithEmailAndPassword(email, pass).catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                if (errorCode == 'auth/invalid-email') {
                    snackbar('The email is invalid.');
                }
                if (errorCode == 'auth/weak-password') {
                    snackbar('The password is too weak.');
                } else {
                    snackbar(errorMessage);
                }
                console.log(error)
            });

            // [START sendemailverification]
            firebase.auth().currentUser.sendEmailVerification().then(function () {

                snackbar('Email de verificação enviado!');
            });
            // [END sendemailverification]
        } else {
            snackbar("Senhas não conferem");
        }
    });


    function logout_firebase() {

    }
    btnLogout.addEventListener('click', function () {
        firebase.auth().signOut().then(function () {
            logged = false;
            console.log('logout')
            checkAuth();
        }).catch(function (error) {
            console.log("Sign out error", error);
            snackbar(error);
        });
    });

    function checkAuth() {
        if (logged) {
            // User is signed in.
            // Reporting status.
            console.log("Signed in.");
            // Update the database.
            // Redirect to home.
            window.location.href = '/home.html';


        } else {
            // Redirect to login.
            window.location.href = "/index.html";


        }

    }
    function snackbar(string) {
        var snackbarContainer = document.querySelector('#demo-snackbar-example');
        var data = {
            message: string,
        };
        snackbarContainer.MaterialSnackbar.showSnackbar(data);
    };
})

//funções banco de dados de listagem
/*
var listaProf = db.collection('professores').get().then(function (querySnapshot) {
    querySnapshot.forEach(function (doc) {
        console.log(doc.idProf, "=>", doc.data());
    });
}).catch(function (error) {
    console.log("Erro ao acessar documentos: ", error);
});
*/


//funções de inserção ao banco de dados

/*
//deveria estar dentro de alguma função??
form.addEventListener('submit', (e) => {
    e.preventDefault();
    db.collection('financers').add({
        nomeFantasia: form.nomeFantasia.value,
        cnpj: form.cnpj.value,
        site: form.site.value,
        razaoSocial: form.razaoSocial.value,
        pais: form.pais.value,
        statusJuri: form.statusJuri.value
    })
    form.nomeFantasia.value = '';
    form.cnpj.value = '';
    form.site.value = '';
    form.razaoSocial.value = '';
    form.pais.value = '';
    form.statusJuri.value = '';
})

// Delete from db
/*
cross.addEventListener('click', (e) => {
    // Remove select
    e.stopPropagation();
    let id = e.target.parentElement.getAttribute('data-id');
    db.collection('financers').doc(id).delete();
});
*/

function openSignUp() {
    document.getElementById("sign-up-panel").style.display = "block";
}

/* Close when someone clicks on the "x" symbol inside the overlay */
function closeSignUp() {
    document.getElementById("sign-up-panel").style.display = "none";
    cleanFieldSignUp();
}

function signUp(){
    closeSignUp()
}
function cleanFieldSignUp(){

}
function enterPress(event) {
    if ((window.event ? event.keyCode : event.which) == 13) { btnLogin.click() }
}
