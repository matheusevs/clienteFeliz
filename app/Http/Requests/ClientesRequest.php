<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ClientesRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'nome' => "required|max:255",
            'dataDeNascimento' => "date",
            'cpfCnpj' => "required|unique:clientes,cpfCnpj,$this->id|max:18",
            'email' => "required|unique:clientes,email,$this->id|email"
        ];
    }

    /**
     * Get the error messages for the defined validation rules.
     *
     * @return array
     */
    public function messages()
    {
        return [
            'nome.required' => 'Nome não informado!',
            'nome.max' => 'É permitido somente 255 caracteres',
            'dataDeNascimento.date' => 'É permitido informar somente data!',
            'cpfCnpj.required' => 'CPF ou CNPJ não informado!',
            'cpfCnpj.unique' => 'O CPF ou CNPJ já está cadastrado no sistema!',
            'cpfCnpj.max' => 'É permitido somente 18 caracteres!',
            'email.required' => 'E-mail não informado!',
            'email.unique' => 'O E-mail já está cadastrado no sistema!',
            'email.email' => 'Informe um e-mail válido!',
        ];
    }
}
