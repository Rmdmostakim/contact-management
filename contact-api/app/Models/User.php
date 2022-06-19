<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class User extends Model{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name','phone','email','password',
    ];

    protected $attributes = [
        'verification' => 0,
    ];
    protected $hidden = [
        'password',
    ];

    public function accessToken(){
        return $this->hasOne(AccessToken::class);
    }

    public function contact(){
        return $this->hasMany(Contact::class);
    }
}
