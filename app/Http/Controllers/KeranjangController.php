<?php

namespace App\Http\Controllers;

use App\Models\Tiket;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class KeranjangController extends Controller
{
    function index() {
        $user = Auth::user();
        $tiket = Tiket::where("user_id", $user->id)
            ->where("status", "pending")
            ->get();
        return Inertia::render('keranjang/Keranjang', ['tiket' => $tiket]);
    }
}
