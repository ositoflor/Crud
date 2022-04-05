function listaPessoas(){
$.getJSON(`https://apiflor.herokuapp.com/pessoas`, function (data, status) {
    const pessoas_db = []

    for (const pessoa of data) {
        pessoas_db.push(`
            <tR>
            <td>${pessoa.id}</td>
            <td>${pessoa.nome}</td>
            <td>${pessoa.email}</td>
            <td>${pessoa.contato}</td>
            <td>${pessoa.cidade}</td>
            <td>
                <button type="button" onclick="edit(${pessoa.id})" data-toggle="modal" data-target="#meuModal" class="btn btn-warning"><i class="bi bi-pencil"></i>Editar</button>
                <button type="button"  onclick="excluiPessoa(${pessoa.id})" class="btn btn-danger"><i class="bi bi-trash"></i></i>Excluir</button>
            </td>
            </tR>
            `)
        $('#result').html(pessoas_db)
    }
})
}

listaPessoas()
function edit(id) {
    $.getJSON(`https://apiflor.herokuapp.com/pessoas/${id}`, function (data, status) {
                $("#idUser").val(data.id)
                $("#nome").val(data.nome)
                $("#email").val(data.email)
                $("#contato").val(data.contato)
                $("#cidade").val(data.cidade)
                $("#salve").hide();
                $("#btn-edit").show();
                $("#titleCad").hide();
                $("#titleEdit").show();
    });
}

$("#salve").click(function () {
    $.post("https://apiflor.herokuapp.com/pessoas",
        {
            "nome": $("#nome").val(),
            "email": $("#email").val(),
            "contato": $("#contato").val(),
            "cidade": $("#cidade").val()
        });
        listaPessoas()
});

function limpaForm(){
    $("#nome").val('')
    $("#email").val('')
    $("#contato").val('')
    $("#cidade").val('')
}


function btnSave(){
    $("#salve").show();
    $("#btn-edit").hide();
    $("#titleCad").show();
    $("#titleEdit").hide();
}

function atualizarDados() {
    var dados = $("input")
    
    dadosSalvar = {
        nome: dados[1].value,
        email: dados[2].value,
        contato: dados[3].value,
        cidade: dados[4].value
    }

    $.ajax({
        type: "PUT",
        url: `https://apiflor.herokuapp.com/pessoas/${dados[0].value}`,
        data: dadosSalvar,
        success: function (response) {
            listaPessoas()
        }
    });
}


    function excluiPessoa(id) {
        $.ajax({
            type: "DELETE",
            url: `https://apiflor.herokuapp.com/pessoas/${id}`,
            success: function (response) {
                listaPessoas()
            }
        });
    }
