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

Route::get('/', function () {
    return view('welcome');
});


Auth::routes();
Route::get('/cliente', 'ClientesController@index');
Route::put('/cliente/editar/{id}', 'ClientesController@update');
Route::post('/cliente/create', 'ClientesController@store');
Route::delete('/cliente/delete/{id}', 'ClientesController@destroy');
Route::get('/home', 'HomeController@index')->name('home');