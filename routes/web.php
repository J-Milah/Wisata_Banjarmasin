<?php

use App\Http\Controllers\AboutController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\KeranjangController;
use App\Http\Controllers\TiketController;
use App\Http\Controllers\WisataController;
use App\Http\Middleware\AuthMiddleware;
use Illuminate\Support\Facades\Route;

Route::get('/', [WisataController::class, 'index'])->middleware(AuthMiddleware::class);

Route::get("/test", function () {
    return view('test');
});

Route::get("/wisata/{id}", [WisataController::class, 'show']);
Route::post("/tiket/{id}", [TiketController::class, 'store']);

Route::get("/login", [AuthController::class, 'loginPage'])->middleware("guest");
Route::get("/register", [AuthController::class, 'registerPage'])->middleware("guest");
Route::post("/register", [AuthController::class, 'register']);
Route::post("/login", [AuthController::class, 'login']);

Route::get("/keranjang", [KeranjangController::class, 'index'])->middleware(AuthMiddleware::class);
Route::post("/logout", [AuthController::class, 'logout'])->middleware("auth");
Route::get("/about", [AboutController::class, 'index'])->middleware(AuthMiddleware::class);
Route::delete("/tiket/{id}", [TiketController::class, 'destroy']);
Route::get("/search", [WisataController::class, 'SearchPage']);
Route::get("/kategori/{nama}", [WisataController::class, 'namaKategori']);
