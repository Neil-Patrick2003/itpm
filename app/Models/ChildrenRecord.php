<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ChildrenRecord extends Model
{
    protected $fillable = [ 'weight', 'height', 'bmi', 'children_id' ];

    public function children(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo('App\Models\Children');
    }
}
