<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Validator;

class ContactController extends Controller
{
    public function getContacts(Request $request){
        $header = $request->header('access_token');
        $user = \Auth::user($header);
        $contacts = \Contact::getContacts($header);
        $response = [
            'user'=>$user,
            'contacts'=>$contacts
        ];
        return response($response,200);
    }

    public function createContacts(Request $request){
        $header = $request->header('access_token');
        $validator = Validator::make($request->all(), [
            'name'=>'bail|required|string|min:1',
            'phone'=>'bail|required|string|min:11|max:15',
            'email'=>'bail|required|email',
            'avatar'=>'image',
        ]);
        if ($validator->fails()) {
            return $validator->messages();
        }
        $validated = $request->only(['name','phone','email','avatar']);
        if($result = \Contact::createContact($header,$validated)){
            return response($result,201);
        }
        return response('contact create failed',500);
    }

    public function editContacts(Request $request){
        $header = $request->header('access_token');
        $validator = Validator::make($request->all(), [
            'name'=>'bail|required|string|min:1',
            'phone'=>'bail|required|string|min:11|max:15',
            'email'=>'bail|required|email',
            'id'=>'required|numeric|min:1',
        ]);
        if ($validator->fails()) {
            return $validator->messages();
        }
        $validated = $request->only(['name','phone','email','id']);
        if(\Contact::updateContact($header,$validated)){
            return response($validated,201);
        }
        return response('contact create failed',500);
    }

    public function deleteContacts(Request $request,$id){
        $header = $request->header('access_token');
        if(\Contact::deleteContact($header,$id)){
            return response($id,200);
        }
        return response('contact delete failed',500);
    }
}
