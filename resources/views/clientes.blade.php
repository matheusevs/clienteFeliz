@extends('layouts.app')

@section('links')
@endSection

@section('content')

    <div class="container">
        <table id="cliente-table" class="display" style="width:100%">
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Nome</th>
                    <th>Data de Nascimento</th>
                    <th>CNPJ/CPF</th>
                    <th>Email</th>
                    <th>Endereço</th>
                    <th>Ações</th>
                </tr>
            </thead>
            
        </table>

        <div class="text-center">
            <button id="open" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#novoClienteModal">Novo Cliente</button>
        </div>

    </div>

    <div class="modal fade" id="novoClienteModal" tabindex="-1" aria-labelledby="ModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="ModalLabel">Novo Cliente</h1>
              <button type="button" id="fecharIcone" class="btn-close" data-bs-dismiss="modal" aria-label="Fechar"></button>
            </div>
            <form id="form">
                @csrf
                <div class="modal-body">
                    
                    <div>
                        <div class="mb-3">
                            <label class="form-label" for="name">Nome</label>
                            <input class="form-control" type="text" id="name" name="nome" required/>
                        </div>
                        <div class="mb-3">
                            <label class="form-label" for="name">Data de nascimento</label>
                            <input class="form-control" type="date" id="date" name="dataDeNascimento"/>
                        </div>
                        <div class="mb-3">
                            <label class="form-label" for="cpfCnpj">CPF/CNPJ</label>
                            <input class="form-control" type="text" id="cpfCnpj" name="cpfCnpj" required/>
                        </div>
                        <div class="mb-3">
                            <label class="form-label" for="email">Email</label>
                            <input class="form-control" type="email" id="email" name="email" required/>
                        </div>
                        <div class="mb-3">
                            <label class="form-label" for="cep">CEP</label>
                            <input class="form-control" type="text" id="cep" name="cep"/>
                        </div>
                        <div class="mb-3">
                            <label class="form-label" for="city">Cidade</label>
                            <input class="form-control" type="text" id="cidade" name="cidade"/>
                        </div>
                        <div class="mb-3">
                            <label class="form-label" for="end">Endereço</label>
                            <input class="form-control" type="text" id="endereco" name="endereco"/>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                <button type="button" id="fechar" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                <button id="save" type="submit" class="btn btn-primary">Salvar Cliente</button>
                </div>
            </form>
          </div>
        </div>
    </div>

    <div class="modal fade" id="editarClienteModal" tabindex="-1" aria-labelledby="ModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="ModalLabel">Editar Cliente</h1>
              <button type="button" id="fecharIconeEditar" class="btn-close" data-bs-dismiss="modal" aria-label="Fechar"></button>
            </div>
            <form id="formEdit">
                @csrf
                <input type="hidden" id="id" name="id"/>
                <div class="modal-body">
                    
                    <div>
                        <div class="mb-3">
                            <label class="form-label" for="name">Nome/Razão Social</label>
                            <input class="form-control" type="text" id="nameEditar" name="nome"/>
                        </div>
                        <div class="mb-3">
                            <label class="form-label" for="name">Data de nascimento</label>
                            <input class="form-control" type="date" id="dateEditar" name="dataDeNascimento"/>
                        </div>
                        <div class="mb-3">
                            <label class="form-label" for="cpfCnpj">CNPJ/CPF</label>
                            <input class="form-control" type="text" id="cpfCnpjEditar" name="cpfCnpj"/>
                        </div>
                        <div class="mb-3">
                            <label class="form-label" for="email">Email</label>
                            <input class="form-control" type="email" id="emailEditar" name="email"/>
                        </div>
                        <div class="mb-3">
                            <label class="form-label" for="cep">CEP</label>
                            <input class="form-control" type="text" id="cepEditar" name="cep"/>
                        </div>
                        <div class="mb-3">
                            <label class="form-label" for="city">Cidade</label>
                            <input class="form-control" type="text" id="cidadeEditar" name="cidade"/>
                        </div>
                        <div class="mb-3">
                            <label class="form-label" for="end">Endereço</label>
                            <input class="form-control" type="text" id="enderecoEditar" name="endereco"/>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                <button type="button" id="fecharEditar" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                <button id="save" type="submit" class="btn btn-primary">Salvar Cliente</button>
                </div>
            </form>
          </div>
        </div>
    </div>

    <div class="modal fade" id="confirm-delete" tabindex="-1" role="dialog" aria-labelledby="modalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="modalLabel">Confirmação de exclusão</h5>
                </div>
                <div class="modal-body">
                    Tem certeza que deseja excluir esse item?
                </div>
                <div class="modal-footer">
                    <button type="button" id="fecharExclusao" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                    <a href="#" id="btn-confirm-delete" class="btn btn-danger">Excluir</a>
                </div>
            </div>
        </div>
    </div>

@endSection