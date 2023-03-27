<?php

namespace App\Http\Controllers;

use App\Clientes;
use App\Http\Requests\ClientesRequest;
use Exception;
use Illuminate\Http\Request;

class ClientesController extends Controller
{

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {

        $clientes = Clientes::all();

        return response()->json([
            'data' => $clientes
        ]);


    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\ClientesRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(ClientesRequest $request)
    {
        
        try{

            $cliente = new Clientes();

            foreach ($request->all() as $key => $value) {

                if($key != '_token'){

                    $cliente[$key] = $value;
                
                }
                
            }
    
            $cliente->save();

            return response()->json([
                'error' => false,
                'message' => 'Cliente criado'
            ]);

        } catch (Exception $e){

            return response()->json([
                'error' => true,
                'message' => $e->getMessage(),
            ]);

        }

    }

    /**
     * Display the specified resource.
     *
     * @param  \App\clientes  $clientes
     * @return \Illuminate\Http\Response
     */
    public function show(clientes $clientes)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\clientes  $clientes
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {

        try{

            if (!$id) {
                return ['error' => true, 'message' => "ID do cliente não informado"];
            }

            $cliente = Clientes::FindOrFail($id);

            return response()->json([
                'error' => false,
                'dados' => $cliente
            ]);

        } catch(Exception $e) {

            return response()->json([
                'error' => false,
                'message' => $e->getMessage(),
            ]);
        }

    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\ClientesRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function update(ClientesRequest $request)
    {

        try{
            
            if (!$request->id) {
                return ['error' => true, 'message' => "ID do cliente não informado!"];
            }

            Clientes::FindOrFail($request->id)->update($request->all());

            return response()->json([
                'error' => false,
                'dados' => 'Cliente editado com sucesso',
            ]);

        } catch(Exception $e) {

            return response()->json([
                'error' => true,
                'message' => $e->getMessage(),
            ]);

        }

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\clientes  $clientes
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        
        try{

            if (!$id) {
                return ['error' => true, 'message' => "ID do cliente não informado!"];
            }
            
            Clientes::FindOrFail($id)->delete();

            return response()->json([
                'error' => false,
                'dados' => 'Cliente deletado com sucesso',
            ]);

        } catch(Exception $e) {

            return response()->json([
                'error' => true,
                'message' => $e->getMessage(),
            ]);
        }

    }
}
