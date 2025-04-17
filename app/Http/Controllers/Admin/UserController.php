<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User; // Importing the base Controller class
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index()
    {
        $users = User::latest()->paginate(20);

        return Inertia::render('Admin/User', [
            'users' => $users,
        ]);
    }

    public function update(Request $request, $id)
    {

        $user = User::findOrFail($id);


        $validated = $request->validate([
            'name' => 'required|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'required|min:10',
            'role' => 'required',
            'assign_address' => 'required',
        ]);


        $user->update($validated);

        return redirect()->back()->with('message', 'User updated successfully!');
    }

    public function destroy($id)
    {

        $user = User::find($id);

        if ($user) {
            $user->delete();

            return redirect()->back()->with('success', 'User deleted successfully!');
        }

        return redirect()->back() > with('error', 'User not found.');
    }
}
