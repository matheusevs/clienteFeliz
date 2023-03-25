@foreach ($clientes as $cliente)
    <p>{{ $cliente->nome }}</p>
    <p>{{ $cliente->email }}</p>
@endforeach