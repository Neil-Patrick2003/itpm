<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ProgramBeneficiaries extends Model
{
    public function program():belongsTo{
        return $this->belongsTo('App\Models\Program');
    }

        public function children():belongsTo{
        return $this->belongsTo('App\Models\ChildrenRecord');
    }
}
