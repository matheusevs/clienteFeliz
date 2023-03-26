$(function () {

    let tabela = $('#cliente-table').DataTable({
        dom: 'Bfrtip',
        buttons: [
            'pdf',
        ],
        ajax: {
            url: '/cliente'
        }, 
        columns: [
            {data: 'id'},
            {data: 'nome'},
            {data: 'dataDeNascimento', render: function(data, type, row) {

                if(data){

                    const date = new Date(data);
                    const dia = date.getDate().toString().padStart(2, '0');
                    const mes = (date.getMonth() + 1).toString().padStart(2, '0');
                    const ano = date.getFullYear();
                    const dataFormatada = `${dia}/${mes}/${ano}`;
                    return dataFormatada;
                
                }

                return null;
                
            }},
            {data: 'cpfCnpj'},
            {data: 'email'},
            {data: 'endereco'},
            {data: null,  render: function (data, type, row) {
                return `
                    <button class="btn btn-primary btn-edit" style="display: inline;" value="${data.id}"  data-bs-toggle="modal" data-bs-target="#editarClienteModal"> <i class="fas fa-edit"></i></button>
                        <form id="formDelete" style="display: inline;">
                            <input type="hidden" value="${data.id}" name="idDelete"/>
                            <button type="submit" class="btn btn-danger btn-delete"><i class="fas fa-trash-alt"></i></button>
                        </form>`
                }
            },
        ]
    });

    $("#form").on("submit", event => {

        event.preventDefault();

        const formulario = document.getElementById("form");
        const formData = new FormData(formulario);
        const form = Object.fromEntries(new URLSearchParams(formData).entries());

        let data = JSON.stringify(getData(form));
    
        $.ajax({
            type: "post",
            url: "/cliente/create",
            data: data,
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            dataType: 'json',
            contentType: 'application/json',
            success: function(res) {

                $("#fechar").click();

                if(!res.error){

                    toastr.success(res.message,'Sucesso!');

                    tabela.ajax.reload();

                    
                } else {

                    toastr.error(res.message,'Erro!');

                }

            }

        });

    });

    $(document).on('click', '.btn-edit', function() {
        
        let id = $(this).val();

        $.ajax({
            type: "get",
            url: `/cliente/edit/${id}`,
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            contentType: 'application/json',
            success: function(res) {

                if(!res.error){

                    $('#id').val(res.dados.id);
                    $('#nameEditar').val(res.dados.nome);
                    $('#dateEditar').val(res.dados.dataDeNascimento);
                    $('#cpfCnpjEditar').val(res.dados.cpfCnpj);
                    $('#emailEditar').val(res.dados.email);
                    $('#cepEditar').val(res.dados.cep);
                    $('#cidadeEditar').val(res.dados.cidade);
                    $('#enderecoEditar').val(res.dados.endereco);

                } else {

                    toastr.error(res.message,'Erro!');

                }
            }
        });
        
    });

    $("#formEdit").on("submit", event => {

        event.preventDefault();

        const formulario = document.getElementById("formEdit");
        const formData = new FormData(formulario);
        const form = Object.fromEntries(new URLSearchParams(formData).entries());

        let data = JSON.stringify(getData(form));
        let id = $('#id').val();
    
        $.ajax({
            type: "put",
            url: `/cliente/edit/${id}`,
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            data: data,
            dataType: 'json',
            contentType: 'application/json',
            success: function(res) {
                $("#fecharEditar").click();

                if(!res.error){

                    toastr.success(res.message,'Sucesso!');

                    tabela.ajax.reload();

                } else {

                    toastr.error(res.message,'Erro!');

                }

            }

        });

    });

    $(document).on("click", ".btn-delete", event => {

        event.preventDefault();

        let id = $(event.target).closest("form").find('input[name="idDelete"]').val();

        if (confirm("Tem certeza que deseja excluir este cliente?")) {

            $.ajax({
                type: "delete",
                url: `/cliente/delete/${id}`,
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                },
                dataType: 'json',
                contentType: 'application/json',
                success: function(res) {

                    id = '';

                    if(!res.error){

                        toastr.success(res.message,'Sucesso!');
                        $('#confirm-delete').modal('hide');
                        tabela.ajax.reload();

                    } else {

                        toastr.error(res.message,'Erro!');

                    }
                }

            });

        }
    
    });    
    
    function getData(form){

        let data = {};
        let formInfo = Object.entries(form);

        formInfo.forEach(([key, value]) => {
                
            if(value){

                data[key] = value;
                
            }

        });

        return data;

    }
    
    $("#fechar,#fecharIcone").on("click", event => {
        $('#name').val('');
        $('#date').val('');
        $('#cpfCnpj').val('');
        $('#email').val('');
        $('#cep').val('');
        $('#cidade').val('');
        $('#endereco').val('');
    });

    $("#fecharEditar,#fecharIconeEditar").on("click", event => {

        $('#nameEditar').val('');
        $('#dateEditar').val('');
        $('#cpfCnpjEditar').val('');
        $('#emailEditar').val('');
        $('#cepEditar').val('');
        $('#cidadeEditar').val('');
        $('#enderecoEditar').val('');
        
    });
  
});