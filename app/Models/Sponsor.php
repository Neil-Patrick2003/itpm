<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Sponsor extends Model
{
    protected $fillable = ['name', 'email', 'phone_number','photo_url'];

    public function donations(): hasMany
    {
        return $this->hasMany(Donation::class);
    }

    public function sponsors(){
        return $this->hasMany(Sponsor::class);
    }
}
