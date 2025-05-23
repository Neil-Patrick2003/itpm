<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Donation_Item extends Model
{
    protected $fillable = ['description', 'qty', 'donation_id'];

    public function donations()
    {
        return $this->belongsTo(Donation::class);
    }
}
