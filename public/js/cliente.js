$(function () {

    let tabela = $('#cliente-table').DataTable();
    
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
            dataType: 'json',
            contentType: 'application/json',
            success: function(res) {

                $("#fechar").click();

                if(!res.error){

                    toastr.success(res.message,'Sucesso!');

                    $("body").css("pointer-events", "none");

                    setInterval( () => {
                        location.reload();
                    }, 2000 );

                    
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
            data: data,
            dataType: 'json',
            contentType: 'application/json',
            success: function(res) {
                $("#fecharEditar").click();

                if(!res.error){

                    toastr.success(res.message,'Sucesso!');

                    $("body").css("pointer-events", "none");

                    setInterval( () => {
                        location.reload();
                    }, 2000 );

                } else {

                    toastr.error(res.message,'Erro!');

                }

            }

        });

    });

    $(".formDelete").on("submit", event => {

        event.preventDefault();

        const formulario = event.target;
        const formData = new FormData(formulario);
        const form = Object.fromEntries(new URLSearchParams(formData).entries());
        
        let data = JSON.stringify(getData(form));
        let id = form.idDelete;

        $('#confirm-delete').on('show.bs.modal', function(e) {
            $(this).find('.btn-danger').attr('href', $(e.relatedTarget).data('href'));
        });

        $.ajax({
            type: "delete",
            url: `/cliente/delete/${id}`,
            data: data,
            dataType: 'json',
            contentType: 'application/json',
            success: function(res) {

                if(!res.error){

                    toastr.success(res.message,'Sucesso!');
                    /*$("body").css("pointer-events", "none");

                    setInterval( () => {
                        location.reload();
                    }, 2000 );*/
                    tabela.ajax.reload();

                } else {

                    toastr.error(res.message,'Erro!');

                }
            }

        });


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