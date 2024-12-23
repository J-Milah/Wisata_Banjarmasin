<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Tiket extends Model
{
    protected $table = 'tikets';
    protected $guarded = ['id'];

    protected $with = [
        "wisata",
        "user"
    ];

    function wisata(): BelongsTo
    {
        return $this->belongsTo(Wisata::class, "wisata_id", "id");
    }

    function user(): BelongsTo
    {
        return $this->belongsTo(User::class, "user_id", "id");
    }
}
