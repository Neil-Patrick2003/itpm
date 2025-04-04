<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

use Illuminate\Database\Eloquent\Relations\HasMany;

class Sponsor extends Model
{   
    protected $fillable = ['name', 'email', 'phone_number','photo_url'];

    public function donations(): HasMany
    {
        return $this->hasMany(Donation::class);
    }

    public function program_sponsor():HasMany
    {
        return $this->hasMany(ProgramSponsor::class);
    }

    
}
