<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TicketForm extends Model
{
    protected $table = 'ticket_forms';
    protected $fillable = [
        'subject',
        'department',
        'priority',
        'service',
        'body',
        'attachment',
        'status',
        'message'
    ];
    public $timestamps = true;
}