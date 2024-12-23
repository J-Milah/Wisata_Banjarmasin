<?php

namespace App\Http\Controllers;

use App\Models\Kategori;
use App\Models\Wisata;
use Illuminate\Http\Request;
use Inertia\Inertia;

class WisataController extends Controller
{
    function index()
    {
        $data = Wisata::all();

        return Inertia::render('Home', ['data' => $data]);
    }

    function show(int $id)
    {
        $data = Wisata::firstWhere('id', $id);

        return Inertia::render('wisata/DetailWisata', [
            "wisata" => $data
        ]);
    }

    function SearchPage()
    {
        $data = Wisata::all();
        $kategori = Kategori::all();

        return Inertia::render('search/Search', [
            'data' => $data,
            "kategori" => $kategori
            ]);
    }

    function namaKategori($nama)
    {
        $kategori = Kategori::firstWhere("nama", $nama);

        $wisata = Wisata::where("kategori_id", $kategori->id)->get();

        return $wisata;
    }
}
