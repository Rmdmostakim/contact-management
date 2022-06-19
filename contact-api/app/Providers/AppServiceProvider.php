<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Services\AuthServices;
use App\Services\TokenServices;
use App\Services\ContactServices;
class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->singleton('AuthServices', function ($app) {
            return new AuthServices;
        });
        $this->app->singleton('TokenServices', function ($app) {
            return new TokenServices;
        });
        $this->app->singleton('ContactServices', function ($app) {
            return new ContactServices;
        });
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }
}
