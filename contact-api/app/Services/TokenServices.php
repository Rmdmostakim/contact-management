<?php
    namespace App\Services;

    use Firebase\JWT\JWT;
    use Firebase\JWT\Key;
    use Exception;
    use Log;

    class TokenServices{
        public function createToken($payload){
            $key = env('APP_KEY');
            try{
                $token = JWT::encode($payload, $key, 'HS256');
            }catch(Exception $exception){
                Log::error($exception);
                return false;
            }
            return $token;
        }

        public function decodedToken($token){
            $key = env('APP_KEY');
            try{
                $decoded = JWT::decode($token, new Key($key, 'HS256'));
            }catch(Exception $exception){
                Log::error($exception);
                return false;
            }
            return (array) $decoded;
        }
    }
