/**
 * Serialization
 */
$.fn.serializeObject = function() {
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};

$(document).on("click", "#btnAjout", function(e) {
    e.preventDefault();

    var form = $("#form_add");

    if ($('#ind').val() === "" || $('#nom').val() === "") {
        $('#err').css("display", "block");

        return
    }

    // get the serialized properties and values of the form
    var form_data = form.serializeObject();

    $.ajax({
        url: '../controler/addPays.php',
        type: 'POST',
        dataType: 'json',
        data: form_data,

    });

    document.location.reload();
});

$.getJSON("../controler/allPays.php", function(result) {
    for (var i = 0; i < result.length; i++) {
        let trTag = $("<tr id='row' data-code=" + result[i]["indicatif"] + " data-libelle=" + result[i]["nom"] + "></tr>");
        $("#tabPays").append(trTag);
        $(trTag).append("<td>" + result[i]["indicatif"] + "</td>");
        $(trTag).append("<td>" + result[i]["nom"] + "</td>");
        $(trTag).append("<td><button id='edit' type='button' class='mx-1 btn btn-sm btn-primary' data-bs-toggle='modal' data-bs-target='#exampleModal'>Editer</button><a href='../controler/rmPays.php?ind=" + result[i]["indicatif"] + "' class='btn btn-sm btn-danger'>Supprimer</a></td>");
    }

});

$.getJSON("../controler/allPays.php", function(result) {
    let opTag = "<option value=''></option>";
     $("#selpays").append(opTag);
    for (var i = 0; i < result.length; i++) {
        $("#selpays").append("<option value='" + result[i]["indicatif"] + "'>" + result[i]["nom"] + "</option>");
    }

});/* 
$('#selpays').on('change', function() {
    alert($('#selpays').val());
}); */

$(document).on("click", "#btnAjoutClub", function(e) {
    e.preventDefault();
    var form = $("#form_addclub");

    if ($('#code').val() === "" || $('#nom').val() === "" || $('#ville').val() === "" || $('#selPays').val() === "") {
        $('#err').css("display", "block");

        return
    }

    // get the serialized properties and values of the form
    var form_data = form.serializeObject();

    $.ajax({
        url: '../controler/addClub.php',
        type: 'POST',
        dataType: 'json',
        data: form_data //,

    });

    document.location.reload();
});

$.getJSON("../controler/allClubs.php", function(result) {
    for (var i = 0; i < result.length; i++) {
        let trTag = $("<tr id='row' data-code=" + result[i]["code"] + " data-libelle=" + result[i]["nom"] + "></tr>");
        $("#tabClub").append(trTag);
        $(trTag).append("<td>" + result[i]["code"] + "</td>");
        $(trTag).append("<td>" + result[i]["nom"] + "</td>");
        $(trTag).append("<td>" + result[i]["ville"] + "</td>");
        $(trTag).append("<td>" + result[i]["idpays"] + "</td>");
        $(trTag).append("<td><button id='edit' type='button' class='mx-1 btn btn-sm btn-primary' data-bs-toggle='modal' data-bs-target='#exampleModal'>Editer</button><a href='../controler/rmClub.php?code=" + result[i]["code"] + "' class='btn btn-sm btn-danger'>Supprimer</a></td>");
    }

});
// $(document).on("click", "#edit", function(e) {
//     var $row = $(this).closest('tr');

//     $('#codeE').val($row.data('code'))
//     document.getElementById('codeE').readOnly = true;

//     $('#libelleE').val($row.data('libelle'));

// }); */