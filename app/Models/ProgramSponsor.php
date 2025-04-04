<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProgramSponsor extends Model
{
    protected $fillable = [
        'program_id',
        'sponsor_id',
    ];

    public function program(){
        return $this->hasMany(Program::class);
    }
}
