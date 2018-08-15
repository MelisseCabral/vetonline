/*
    This file will be responsable for the datebase manipuation.
 */
$(function () {
    //var db = firebase.firestore();

    var active_chip = 'pets';

    var btn_insertion_db = document.getElementById('btnCadastro_bd');

    //loadTables();

    btn_insertion_db.addEventListener('click', function () {
        console.log('clicked add')
        insertData(active_chip);
        active_chip = 'pets';
    });

    function getData(path) {
        db.collection(path).get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                console.log(`${doc.id} => ${doc.data()}`);
            });
        });
    }
    function insertData(path) {
        // Selection on Pet chip
        if (path == 'pets') {

            // Define obj to datebase
            obj = {
                name: document.getElementById('name_pet').value,
                cpf_owner: document.getElementById('cpf_owner_pet_form').value,
                data_nasc: document.getElementById('date_birth_pet').value,
            }

            snackbar("Adicionado");

            //Clean form fields
            document.getElementById('name_pet').value = '';
            document.getElementById('cpf_owner_pet_form').value = '';
            document.getElementById('date_birth_pet').value = '';
        }

        else if (path == 'clinics') {
            // Define obj to datebase
            obj = {
                cnpj: document.getElementById('cnpj_clinic_form').value,
                isPayed: '',
                name: '',
                phone:'',
                email:''
            }
        }
        else if (path == 'clients') {
            obj = {
                cpf: '',
                email: '',
                name: '',
                phone: ''
            }
        }
        else if (path == 'procedures') {
            obj = {
               date: '',
                name_procedure:'',
                price:'',
                id_pet:''
            }
        }
        else if (path == 'exams') {
            obj = {
                date: '',
                name_exam:'',
                price:'',
                id_pet:'',
                results:''
            }
        
        }

        db.collection(path).add(obj)
            .then(function (docRef) {
                closeModal();
                snackbar("Adicionado")
                loadTables();
            })
            .catch(function (error) {
                snackbar(error);
            });
    }

    function loadTables() {
        atualizaPetsTable();
    }

    //funções banco de dados de listagem

    function atualizaPetsTable() {
        db.collection('professores').get().then(function (querySnapshot) {
            $('#pets-table tbody tr').remove();

            querySnapshot.forEach(function (doc) {

                var content = '';

                content += '<tr>';
                content += '<td></td>';
                content += '<td class="mdl-data-table__cell--non-numeric">25</td>';
                content += '<td>' + doc.data().nome + '</td>'; //column1
                content += '<td>' + doc.data().dataNasc + '</td>';
                content += '<td>' + doc.data().email + '</td>';//column2
                content += '</tr>';

                $('#professor-table').append(content);
            });

        }).catch(function (error) {
            snackbar(error);
        });
    }

    const forms = document.getElementsByClassName("panel_cadastro");
    const chips = document.getElementsByClassName("mdl-chip");

    for (var i = 0; i < chips.length; i++) {
        chips[i].addEventListener('click', function () {
            //var id_form = "form-" + this.id;
            for (var j = 0; j < chips.length; j++) {
                document.getElementById(forms[j].id).style.display = "none";
                document.getElementById(chips[j].id).style.backgroundColor = "#dedede";
            }
            document.getElementById(this.id).style.backgroundColor = "#FED50B";
            document.getElementById('form-' + this.id).style.display = "flex";
            active_chip = this.id;
        })
    }

});