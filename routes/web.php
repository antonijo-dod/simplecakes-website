<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RecipeController;
use App\Http\Controllers\Admin\AdminRecipeController;
use App\Http\Controllers\User\UserRecipeController;
use App\Http\Controllers\HomeController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Route::get('/', function () {
//     return Inertia::render('Home', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });

Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/recipes/{slug}', [RecipeController::class, 'show'])->name('recipes.show');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified', 'admin'])->name('dashboard');

// Route::middleware(['auth', 'admin'])->group(function () {
//     Route::get('/recipes', [AdminRecipeController::class, 'index'])->name('adminRecipes.index');
//     Route::get('/recipes/create', [AdminRecipeController::class, 'create'])->name('adminRecipes.create');
//     Route::post('/recipes', [AdminRecipeController::class, 'store'])->name('adminRecipes.store');
//     Route::get('/recipes/{recipe}', [AdminRecipeController::class, 'show'])->name('adminRecipes.show');
//     Route::get('/recipes/{recipe}/edit', [AdminRecipeController::class, 'edit'])->name('adminRecipes.edit');
//     Route::patch('/recipes/{recipe}', [AdminRecipeController::class, 'update'])->name('adminRecipes.update');
//     Route::delete('/recipes/{recipe}', [AdminRecipeController::class, 'destroy'])->name('adminRecipes.destroy');
// });


Route::resource("user-recipes", UserRecipeController::class)
    ->only(['index', 'create', 'store', 'show', 'edit', 'update', 'destroy'])
    ->middleware('auth');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
