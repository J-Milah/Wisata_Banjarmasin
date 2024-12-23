<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Wisata extends Model
{
    protected $table = 'wisatas';
    protected $guarded = ["id"];

    protected $with = [
        "kategori"
    ];

    function kategori():BelongsTo
    {
        return $this->belongsTo(Kategori::class, "kategori_id", "id");
    }
}
