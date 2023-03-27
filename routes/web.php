<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Auth::routes(['verify' => true]);

Route::middleware(['auth','verified'])->group(function () {
    
    Route::get('/', function(){
        return redirect('/home');
    });
    Route::get('/home', 'HomeController@index')->name('home');
    Route::get('/cliente', 'ClientesController@index');
    Route::put('/cliente/edit/{id}', 'ClientesController@update');
    Route::get('/cliente/edit/{id}', 'ClientesController@edit');
    Route::post('/cliente/create', 'ClientesController@store');
    Route::delete('/cliente/delete/{id}', 'ClientesController@destroy');

});