<?php

namespace App\Http\Controllers\Admin;
use App\Models\User;
use App\Http\Controllers\Controller; // Importing the base Controller class
use Inertia\Inertia;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index(){
        $users = User::all();
        
        return Inertia::render('Admin/User', [
            'users' => $users
        ]);
    }

    public function update (Request $request, $id)
    {
        $user = User::findOrFail($id);

        $validated = $request->validate([
            'name' => 'required|max:255',
            'email' => 'required|email|max:255',
        ]);

        $user->update($validated);

        return redirect()->back()->with('success', 'User updated successfully!');
    }

    public function destroy($id)
    {

        $user = User::find($id);

        if ($user) {
            $user->delete();

            return redirect()->back()->with('success', 'User deleted successfully!');
        }

        return redirect()->back()>with('error', 'User not found.');
    }
}
