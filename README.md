<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400"></a></p>

# Cliente Feliz

### Instalação

Clonar o projeto
```
git clone https://github.com/matheusevs/clienteFeliz.git
```
Entrar no projeto
```
cd clienteFeliz/
```
Criar os arquivos .env
```
cp .env.example .env
```
É importante reforçar que as variáveis com prefixo "mail" são fundamentais para o funcionamento adequado do projeto, especialmente no que se refere ao sistema de autenticação.</br></br>
Instalação dos pacotes do composer
```
composer install
```
Criação da key do laravel
```
php artisan key:generate
```
Criação do banco de dados
```
php artisan migrate
```
Rodar comando para inicialização do servidor
```
php artisan serve
```
Após rodar todos os comandos, acesse a url [127.0.0.1:8000](http://127.0.0.1:8000) para ter acesso a aplicação
