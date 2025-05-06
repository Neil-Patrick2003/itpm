<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ProgramBeneficiaries extends Model
{
    protected $fillable = ['program_id', 'children_id'];
    public function program():belongsTo{
        return $this->belongsTo('App\Models\Program');
    }

    public function children():belongsTo{
        return $this->belongsTo('App\Models\Children');
    }

//    public function beneficiaries():HasMany{
//        return $this->hasMany(Children::class);
//    }
}
