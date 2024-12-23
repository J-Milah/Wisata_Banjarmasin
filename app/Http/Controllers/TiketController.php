<?php

namespace App\Http\Controllers;

use App\Http\Requests\TiketRequest;
use App\Models\Tiket;
use App\Models\Wisata;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TiketController extends Controller
{
    function store(string $id, TiketRequest $request)
    {
        $loggedInUser = Auth::user();
        $wisata = Wisata::firstWhere("id", $id);
        $payload = $request->validated();

        $tiket = new Tiket($payload);
        $tiket->user_id = $loggedInUser->id;
        $tiket->wisata_id = $wisata->id;
        $tiket->save();
    }

    function destroy($id)
    {
        $tiket = Tiket::firstWhere("id", $id);

        $tiket->delete();
    }
}
