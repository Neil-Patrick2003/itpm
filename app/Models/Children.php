<?php

namespace App\Models;

use Carbon\Carbon;
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

    protected $appends = ['age'];

    public function record(): HasMany
    {
        return $this->hasMany('App\Models\ChildrenRecord');
    }

    public function programs(){
        return $this->belongsTo(Program::class, 'program_id');
    }

     public function program(): \Illuminate\Database\Eloquent\Relations\BelongsToMany{
    return $this->belongsToMany(Program::class, 'program_beneficiaries', 'children_id', 'program_id');
}

    public function enrolledPrograms(): \Illuminate\Database\Eloquent\Relations\BelongsToMany
    {
        return $this->belongsToMany(Program::class, 'program_beneficiaries', 'children_id', 'program_id');
    }

    public function parent(){
        return $this->hasOne(User::class, 'id', 'parent_id');
    }

    public function latestRecord()
    {
        return $this->hasOne('App\Models\ChildrenRecord')->latestOfMany();

    }


    public function getAgeAttribute()
    {
        return $this->birth_date ?  Carbon::parse($this->birth_date)->age : 0;
    }


}
