<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Models\User;
use HttpResponseException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class AuthController extends Controller
{
    function loginPage() {
        return Inertia::render('auth/Login');
    }
    function registerPage() {
        return Inertia::render('auth/Register');
    }

    function register(RegisterRequest $request) {
        $payload = $request->validated();

        if (User::firstWhere("email", $payload["email"])) {
            throw new HttpResponseException(response([
                "errors" => [
                    "email" => [
                        "email already registered"
                    ]
                ]
            ], 400));
        }

        $user = new User($payload);
        $user->password = Hash::make($payload["password"]);
        $user->save();
    }

    function login(LoginRequest $request) {
        $payload = $request->validated();

        $user = User::firstWhere("email", $payload["email"]);

        Auth::login($user);

        return redirect('/');

        return back()->withErrors([
            'email' => 'The provided credentials do not match our records.',
        ]);
    }

    function logout()
    {
        auth()->logout();
        return redirect('/login');
    }
}
