<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use App\Models\Recipe;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminRecipeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
         // Get all recipes from the database, but new recipes first
        // $recipes = Recipe::latest()->get();
        $sortField = request('sortField', "");
        $sortDirection = request('sortDirection', "");

        if ($sortField && $sortDirection) {
            $recipes = Recipe::orderBy($sortField, $sortDirection)->latest()->with('user')->paginate(10);
        } else {
            $recipes = Recipe::latest()->with('user')->paginate(10);
        }
       
         return Inertia::render('Admin/Recipes', [
             'recipes' => $recipes,
         ]);
    }

    /**
     * Show the form for creating a new resource.s
     */
    public function create()
    {
        // Create a new recipe
        return Inertia::render('Admin/CreateRecipe');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): RedirectResponse
    {
        // Create a new recipe
        $validatedData = $request->validate([
            'name' => 'required',
            'description' => 'required',
        ]);

        $recipe = Recipe::create([
            'name' => $request->name,
            'slug' => \Str::slug($request->name),
            'description' => $request->description,
            'steps' => $request->steps,
            'status' => 'draft',
            'user_id' => auth()->id(),
        ]);

        return redirect()->back()->with('message', 'Recipe created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $recipe = Recipe::findOrFail($id);

        return Inertia::render('Admin/EditRecipe', [
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
            'name' => 'required',
            'status' => 'required|in:draft,published,archived',
        ]);

        $validatedData['slug'] = \Str::slug($validatedData['name']); // TODO - Add unique slug

        $recipe->update($validatedData);

        return redirect()->back()->with('message', 'Recipe updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     * 
     */
    public function destroy(string $id)
    {
        //
    }
}
