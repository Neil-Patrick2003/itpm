<?php

namespace App\Models;

use http\Exception\BadConversionException;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Children extends Model
{
    protected $fillable = [
        'name',
        'birth_date',
        'gender',
        'parent_id',
    ];

    public function record(): HasMany
    {
        return $this->hasMany('App\Models\ChildrenRecord');
    }

    public function programs(){
        return $this->belongsTo('App\Models\Program', 'program_id');
    }
}
