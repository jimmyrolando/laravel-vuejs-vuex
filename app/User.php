<?php

namespace App;

use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password','full_name','address','birth_date','zip_code','role'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    public function hasRole($names)
    {   
        foreach ( explode( ':', $names ) as $name) {
            if ( $this->role == $name) return true;
        }
        return false;
    }

    public function isAdmin()
    {
        return $this->hasRole('admin');
    }

    public function getAvatarAttribute($value)
    {
        return asset($value);
    }
}
