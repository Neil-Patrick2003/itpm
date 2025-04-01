<?php

namespace App\Models;
namespace App\Http\Controllers\Admin;

use Illuminate\Database\Eloquent\Model;

class Sponsor extends Model
{
    protected $fillable = ['name', 'email', 'phone_number','photo_url'];
}
