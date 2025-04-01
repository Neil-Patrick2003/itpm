<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Sponsor extends Model
{
    protected $fillable = ['name', 'email', 'phone_number','photo_url'];

    public function donation(): hasMany
    {
        return $this->hasMany(Donation::class);
    }
}
