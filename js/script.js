$.getJSON(`http://localhost:3000/pessoas`, function (data, status) {
    const pessoas_db = []

    for (const pessoa of data) {
        pessoas_db.push(`
            <tR>
            <td>${pessoa.id}</td>
            <td>${pessoa.nome}</td>
            <td>${pessoa.email}</td>
            <td>${pessoa.telefone}</td>
            <td>${pessoa.cidade}</td>
            <td>
                <button type="button" onclick="edit(${pessoa.id})" data-toggle="modal" data-target="#meuModal" class="btn btn-warning"><i class="bi bi-pencil"></i>Editar</button>
                <button type="button"  class="btn btn-danger"><i class="bi bi-trash"></i></i>Excluir</button>
            </td>
            </tR>
            `)
        $('#result').html(pessoas_db)
    }
})

function edit(id) {
    $.getJSON(`http://localhost:3000/pessoas/${id}`, function (data, status) {
                $("#nome").val(data.nome)
                $("#email").val(data.email)
                $("#contato").val(data.telefone)
                $("#cidade").val(data.cidade)
    });
}

$("#salve").click(function () {
    $.post("http://localhost:3000/pessoas",
        {
            "nome": $("#nome").val(),
            "email": $("#email").val(),
            "telefone": $("#contato").val(),
            "cidade": $("#cidade").val()
        });
});


