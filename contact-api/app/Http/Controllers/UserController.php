<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Mail;
use Validator;

class UserController extends Controller
{
    public function registration(Request $request){
        $validator = Validator::make($request->all(), [
            'name' => 'bail|required|string|min:5',
            'phone'=>'bail|required|string|min:11|max:11',
            'email'=>'bail|required|email|unique:users',
            'password'=>'bail|required|string|min:6',
        ]);
        if ($validator->fails()) {
            return $validator->messages();
        }
        $validated = $request->only(['name','phone','email','password']);

        if(\Auth::registration($validated)){
            return response('registration success',201);
        }else{
            return response('registration failed',500);
        }
    }

    public function emailValidation(Request $request){
        $validator = Validator::make($request->all(), [
            'email'=>'bail|required|email|exists:users,email',
            'email_valiation_token'=>'bail|required|string|min:8|max:8|exists:users,email_valiation_token',
        ]);
        if ($validator->fails()) {
            return $validator->messages();
        }
        $validated = $request->only(['email','email_valiation_token']);
        if(\Auth::userVerification($validated)){
            return response('user verified',202);
        }
        return response('user verification failed',500);
    }

    public function resetEmailValidation(Request $request){
        $validator = Validator::make($request->all(), [
            'email'=>'bail|required|email|exists:users,email',
        ]);
        if ($validator->fails()) {
            return $validator->messages();
        }
        $validated = $request->only(['email']);
        if(\Auth::sendEmailVerification($validated['email'])){
            return response('an email sent with new token',202);
        }
        return response('failed to create varification token',500);
    }

    public function login(Request $request){
        $validator = Validator::make($request->all(), [
            'email'=>'bail|required|email|exists:users,email',
            'password'=>'bail|required|string|min:6',
        ]);
        if ($validator->fails()) {
            return $validator->messages();
        }
        $validated = $request->only(['email','password']);
        $login = \Auth::attempt($validated);

        if($login['status'] == 202){
            return response($login['token'],202);
        }
        if($login['status'] == 206){
            return response('wrong password',201);
        }
        return response('unverified user',201);

    }

    public function resetPassword(Request $request){
        $validator = Validator::make($request->all(), [
            'email'=>'bail|required|email|exists:users,email',
            'password'=>'bail|required|string|min:6',
        ]);
        if ($validator->fails()) {
            return $validator->messages();
        }
        $validated = $request->only(['email','password']);
        if(\Auth::resetPassword($validated)){
            return response('password resset success',201);
        }
        return response('password reset failed',500);
    }

    public function logout(Request $request){
        $result = \Auth::loggingOut($request->header('access_token'));
        return response('logout success',200);
    }
}
