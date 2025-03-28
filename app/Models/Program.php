<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Program extends Model
{
    protected $fillable = [
        'title',
        'description',
        'start_date',
        'duration',
        'total_beneficiaries',
    ];
}
