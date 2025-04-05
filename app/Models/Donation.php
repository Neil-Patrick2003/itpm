<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Donation extends Model
{
    protected $fillable = ['type', 'amount', 'sponsor_id'];

    public function donation_items(): HasMany
    {
        return $this->hasMany(Donation_Item::class);
    }

    public function sponsor()
    {
        return $this->belongsTo(Sponsor::class);
    }
}
