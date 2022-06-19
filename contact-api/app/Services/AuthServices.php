<?php
    namespace App\Services;

    use Illuminate\Support\Str;
    use Illuminate\Support\Facades\Hash;
    use Illuminate\Support\Facades\Mail;
    use App\Models\User;
    use App\Models\AccessToken;
    use Log;

    class AuthServices{
        public function registration($credentials){
            try{
                $result = User::create([
                    'name'=>$credentials['name'],
                    'phone'=>$credentials['phone'],
                    'email'=>$credentials['email'],
                    'password'=>Hash::make($credentials['password']),
                ]);
            }catch(Exception $exception){
                Log::error($exception);
                $result = false;
            }

            if($result){
                $this->sendEmailVerification($result->email);
                return true;
            }
            return false;
        }

        public function sendEmailVerification($email){
            $token = Str::random(8);
            try{
                $storeToken = User::where('email',$email)->update(['email_valiation_token'=>$token]);
            }catch(Exception $exception){
                Log::error($exception);
                $storeToken = false;
            }
            if($storeToken){
                $data = [
                    'verification_code'=>$token,
                ];
                Mail::send('Mail',$data,function($message) use ($email){
                    $message->to($email);
                    $message->subject('Verification Code');
                });
                return true;
            }

            return false;
        }

        public function userVerification($credentials){
            try{
                $result = User::where('email',$credentials['email'])
                                ->where('email_valiation_token',$credentials['email_valiation_token'])->update(['verification'=>1]);
            }catch(Exception $exception){
                Log::error($exception);
                $result = false;
            }
            if($result){
                return true;
            }
            return false;
        }

        public function attempt($credentials){
            try{
                $user = User::where('email',$credentials['email'])->where('verification',1)->first();
            }catch(Exception $exception){
                Log::error($exception);
                $user = false;
            }

            if($user){
                $matched = Hash::check($credentials['password'], $user->password);
                if($matched){
                    $payload = [
                        'id'=>$user->id,
                        'name'=>$user->name,
                        'email'=>$user->email,
                    ];
                    $token = \Token::createToken($payload);
                    $hasToken = AccessToken::where('user_id',$user->id)->first();
                    if($hasToken){
                        return ['status'=>202,'token'=>$hasToken->access_token];
                    }
                    try{
                        $storeToken = AccessToken::create([
                            'user_id'=>$user->id,
                            'access_token'=>$token,
                        ]);
                    }catch(Exception $exception){
                        Log::error($exception);
                        $storeToken = false;
                    }
                    if($storeToken){
                        return ['status'=>202,'token'=>$token];
                    }
                }
                return ['status'=>206];
            }
            return ['status'=>204];
        }

        public function resetPassword($credentials){
            try{
                $result = User::where('email',$credentials['email'])->update([
                    'password'=>Hash::make($credentials['password'])
                ]);
            }catch(Exception $exception){
                Log::error($exception);
                $result = false;
            }
            if($result){
                return true;
            }
            return false;
        }

        public function user($user){
            $token = \Token::decodedToken($user);
            $user = User::where('id',$token)->first();
            return $user;
        }

        public function loggingOut($token){
            $user = \Token::decodedToken($token);
            $result = AccessToken::where('user_id',$user['id'])->delete();
            return $result;
        }
    }
