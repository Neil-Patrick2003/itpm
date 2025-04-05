<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;


class Program extends Model
{
    protected $fillable = ['title','description','start_date','duration', 'total_beneficiaries'];

    

    public function sponsors()
    {
        return $this->belongsToMany(Sponsor::class, 'program_sponsors');
    }
}
    