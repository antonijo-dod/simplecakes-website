<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Models\Recipe;
use Inertia\Inertia;

class UserRecipeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        
        $recipes = Recipe::where('user_id', auth()->id())->latest()->get();
       
         return Inertia::render('User/UserDashboard', [
             'recipes' => $recipes,
         ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        // Crete a new recipe
        return Inertia::render('User/CreateRecipe');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Store the recipe in the database
        $request->validate([
            'name' => 'required',
        ]);

        $recipe = Recipe::create([
            'name' => $request->name,
            'slug' => \Str::slug($request->name),
            'description' => $request->description,
            'steps' => $request->steps,
            'status' => 'draft',
            'user_id' => auth()->id(),
        ]);

        return redirect()->route('user-recipes.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        // Show
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        // Show the form for editing the recipe
        $recipe = Recipe::findOrFail($id);
        
        return Inertia::render('User/EditRecipe', [
            'recipe' => $recipe,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        // Update the recipe
        $recipe = Recipe::findOrFail($id);

        $validatedData = $request->validate([
            'name' => 'required'
        ]);

        $validatedData['slug'] = \Str::slug($validatedData['name']); // TODO - Add unique slug

        $recipe->update($validatedData);

        return redirect()->back()->with('message', 'Recipe updated successfully.');

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
