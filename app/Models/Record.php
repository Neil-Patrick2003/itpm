<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Record extends Model
{
    protected $fillable = [
        'children_name',
        'birth_date',
        'parent_name',
        'address',
        'phone_number',
        'email',
        'weight',
        'height',
        'gender',
        'recorded_by'
    ];

    public function recordedBy()
    {
        return $this->belongsTo(User::class, 'recorded_by');
    }
}
