<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Children extends Model
{
    protected $fillable = [
        'name',
        'birth_date',
        'gender',
        'parent_id',
    ];
}
