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

    public function getBmiAttribute(){
        if($this->height && $this->weight){
            $heightInMeters = $this->height / 100;         // Ensure that height is in meters (if stored in cm, divide by 100)
            return $this->weight / ($heightInMeters ** 2);
        }
        return null;
    }

    public function getBmiCategoryAttribute() {
        $bmi = $this->bmi;

        if (!$bmi) return null;

        if ($bmi < 18.5) return 'Underweight';
        if ($bmi < 24.9) return 'Normal';
        if ($bmi < 29.9) return 'Overweight';
        return 'Obese';
    }


}
