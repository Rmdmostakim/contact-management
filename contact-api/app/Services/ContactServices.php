<?php
    namespace App\Services;

    use Illuminate\Support\Str;
    use App\Models\Contact;
    use Log;

    class ContactServices{
        public function getContacts($user){
            $token = \Token::decodedToken($user);
            $contacts = Contact::where('user_id',$token['id'])->OrderBy('name')->get();
            return $contacts;
        }

        public function createContact($user,$credentials){
            $token = \Token::decodedToken($user);
            if(!empty($credentials['avatar']) && $credentials['avatar'] != null){
                $avatar = $this->fileStorage($credentials['avatar']);
                try{
                    $create = Contact::create([
                        'user_id'=>$token['id'],
                        'name'=>$credentials['name'],
                        'phone'=>$credentials['phone'],
                        'email'=>$credentials['email'],
                        'avatar'=>$avatar,
                    ]);
                }catch(Exception $exception){
                    Log::error($exception);
                    $create = false;
                }
            }else{
                try{
                    $create = Contact::create([
                        'user_id'=>$token['id'],
                        'name'=>$credentials['name'],
                        'phone'=>$credentials['phone'],
                        'email'=>$credentials['email'],
                    ]);
                }catch(Exception $exception){
                    Log::error($exception);
                    $create = false;
                }
            }

            if($create){
                return $create;
            }
            return false;
        }

        public function updateContact($user,$credentials){
            $token = \Token::decodedToken($user);
            $update = Contact::where('user_id',$token)->where('id',$credentials['id'])->update([
                'name'=>$credentials['name'],
                'phone'=>$credentials['phone'],
                'email'=>$credentials['email']
            ]);
            if($update){
                return true;
            }
            return false;
        }

        public function fileStorage($file){
            try{
                $filename = Str::random(30).'.'.$file->extension();
                $filepath = $file->move('public/images',$filename);
                $filepath = Str::replace('\\', '/', $filepath);
                return $filepath;
            }catch(Exception $exception){
                Log::error($exception);
                $filepath = false;
            }
        }

        public function fileDestroy($filename){
            try{
                $result = unlink($filename);
            }catch(Exception $exception){
                Log::error($exception);
                $result = true;
            }
            return $result;
        }

        public function getContactInfo($user_id,$id){
            $contact = Contact::where('user_id',$user_id)->where('id',$id)->first();
            return $contact;
        }

        public function deleteContact($user,$id){
            $token = \Token::decodedToken($user);
            $contact = $this->getContactInfo($token['id'],$id);
            if(!empty($contact)){
                if($contact->avatar != null){
                    $this->fileDestroy($contact->avatar);
                }
                try{
                    $result = Contact::where('user_id',$token['id'])->where('id',$id)->delete();
                }catch(Exception $exception){
                    Log::error($exception);
                    $result = false;
                }
                if($result){
                    return true;
                }
            }
            return false;
        }
    }
