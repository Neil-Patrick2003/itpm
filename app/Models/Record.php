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

    public function getBmiAttribute(){
        if($this->height && $this->weight){
            $heightInMeters = $this->height / 100;         // Ensure that height is in meters (if stored in cm, divide by 100)
            return $this->weight / ($heightInMeters ** 2);
        }
        return null;
    }

    public function scopeUnderweight($query)
    {
        return $query->whereNotNull('height')
            ->whereNotNull('weight')
            ->whereRaw('(weight / POWER(height / 100, 2)) < 18.5');
    }

    public function scopeNormalBmi($query)
    {
        return $query->whereNotNull('height')
            ->whereNotNull('weight')
            ->whereRaw('(weight / POWER(height / 100, 2)) BETWEEN 18.5 AND 24.9');
    }

    public function scopeOverweight($query)
    {
        return $query->whereNotNull('height')
            ->whereNotNull('weight')
            ->whereRaw('(weight / POWER(height / 100, 2)) BETWEEN 25 AND 29.9');
    }

    public function scopeObese($query)
    {
        return $query->whereNotNull('height')
            ->whereNotNull('weight')
            ->whereRaw('(weight / POWER(height / 100, 2)) >= 30');
    }
}
