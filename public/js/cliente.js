$(function () {

    let inputCpfCnpj = document.getElementById('cpfCnpj');
    let inputCpfCnpjEditar = document.getElementById('cpfCnpjEditar');

    let inputDate = document.getElementById('date');
    let inputDateEditar = document.getElementById('dateEditar');

    let inputCep = document.getElementById('cep');
    let inputCepEditar = document.getElementById('cepEditar');

    let dataAtual = new Date().toISOString().split("T")[0];

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
                    const dia = ('0' + date.getUTCDate()).slice(-2);
                    const mes = ('0' + (date.getUTCMonth() + 1)).slice(-2);
                    const ano = date.getUTCFullYear();
                    const dataFormatada = `${dia}/${mes}/${ano}`; // concatena as partes da data no formato desejado

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
        ],
        order: [[0, 'desc']],
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
            success: res => {

                $("#fechar").click();

                if(!res.error){

                    toastr.success(res.message,'Sucesso!');

                    tabela.ajax.reload();

                    
                } else {

                    toastr.error(res.message,'Erro!');

                }

            }, 
            error: error => {

                const primeiraChave = Object.keys(error.responseJSON.errors)[0];
                const mensagem = error.responseJSON.errors[primeiraChave];

                toastr.error(mensagem,'Erro!');

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
            success: res => {

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
            success: res => {
                $("#fecharEditar").click();

                if(!res.error){

                    toastr.success(res.message,'Sucesso!');

                    tabela.ajax.reload();

                } else {

                    toastr.error(res.message,'Erro!');

                }

            },
            error: error => {

                const primeiraChave = Object.keys(error.responseJSON.errors)[0];
                const mensagem = error.responseJSON.errors[primeiraChave];

                toastr.error(mensagem,'Erro!');

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
                success: res => {

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

    function formatCPFCNPJ(cpfCnpjInput){

        let value = cpfCnpjInput.value.replace(/\D/g, '');
      
        if(value.length === 11){

            value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');

        } else if(value.length === 14){

            value = value.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');

        } else {

            return cpfCnpjInput.value;

        }
      
        cpfCnpjInput.value = value;
        
    }

    function apenasNumeros(event){

        let charCode = event.charCode ? event.charCode : event.keyCode;

        if(charCode < 48 || charCode > 57){

          return false;

        }

    }

    function mascaraCep(cep){

        cep = cep.replace(/\D/g, '');
        cep = cep.replace(/^(\d{5})(\d)/, '$1-$2');
        return cep;

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

    inputDate.max = dataAtual;
    inputDateEditar.max = dataAtual;
      
    inputCpfCnpj.onkeypress = function (event) {
    
        return apenasNumeros(event);
    
    };

    inputCpfCnpjEditar.onkeypress = function (event) {
    
        return apenasNumeros(event);
    
    };

    inputCpfCnpj.addEventListener('input', () => {

        formatCPFCNPJ(inputCpfCnpj);

    });

    inputCpfCnpjEditar.addEventListener('input', () => {

        formatCPFCNPJ(inputCpfCnpjEditar);

    });

    inputCep.addEventListener('input', function() {

        const cep = inputCep.value.replace(/\D/g, '');
      
        inputCep.value = cep.replace(/^(\d{5})(\d{3})/, '$1-$2');

      });

    inputCepEditar.addEventListener('input', function() {
        
        const cep = inputCepEditar.value.replace(/\D/g, '');
        
        inputCepEditar.value = cep.replace(/^(\d{5})(\d{3})/, '$1-$2');
    
    });
  
});