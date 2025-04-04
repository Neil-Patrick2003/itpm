<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;


class ProgramSponsor extends Model
{
    protected $fillable = [
        'program_id',
        'sponsor_id',
    ];

    public function program(): HasMany
    {
        return $this->belongTo(Program::class);
    }

    public function sponsor(){
        return $this->belongsTo(Sponsor::class);
    }

    
}
