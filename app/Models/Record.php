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
}
