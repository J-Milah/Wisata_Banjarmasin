<?php

namespace App\Http\Controllers;

use App\Models\Profile;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AboutController extends Controller
{
    function index()
    {
        $data = Profile::all();

        return Inertia::render('about/About', ['data' => $data]);
    }
}
