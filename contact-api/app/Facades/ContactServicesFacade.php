<?php
    namespace App\Facades;
    use Illuminate\Support\Facades\Facade;

    class ContactServicesFacade extends Facade{
        protected static function getFacadeAccessor(){
            return 'ContactServices';
        }
    }
