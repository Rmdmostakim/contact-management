<?php
    namespace App\Facades;
    use Illuminate\Support\Facades\Facade;

    class AuthServicesFacade extends Facade{
        protected static function getFacadeAccessor(){
            return 'AuthServices';
        }
    }
