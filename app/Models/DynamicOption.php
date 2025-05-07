<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DynamicOption extends Model
{
    protected $table = 'dynamicoptions';
    protected $fillable = ['department', 'priority', 'services'];
}