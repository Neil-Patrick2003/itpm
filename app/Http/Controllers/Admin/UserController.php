<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User; // Importing the base Controller class
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use function Laravel\Prompts\password;

class UserController extends Controller
{
    public function index(Request $request, )
    {
        $users = User::when($request->search, function ($q) use ($request) {
            return $q->where('name', 'like', '%' . $request->search . '%');
        })
            ->latest()
            ->paginate(20);

        return Inertia::render('Admin/User', [
            'users' => $users,
            'search' => $request->query('search'),
            'page' => $request->input('page', 1)
        ]);
    }

    public function store(Request $request){

        $request->validate([
            'name' => 'required|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'required|',
            'role' => 'required',
            'assign_address' => 'nullable|max:255',
            'password' => 'required',
            'confirm_password' => 'required|same:password'
        ]);

        User::create([
            'name' => $request->name,
            'email' => $request->email,
            'address' => $request->address,
            'assign_address' => $request->assign_address,
            'password' => hash::make($request->password),
            'phone' => $request->phone,
            'role' => $request->role,
        ]);

        return redirect()->back()->with('message', 'User created successfully!');
    }

    public function update(Request $request, $id)
    {
        // Find the user by ID
        $user = User::findOrFail($id);


        // Validate input (optional, but recommended)
        $validated = $request->validate([
            'name' => 'max:255',
            'address' => 'nullable|max:255',
            'email' => 'email|max:255',
            'phone' => 'nullable|min:10',
            'role' => 'required',
            'assign_address' => 'nullable|max:255',
            'password' => 'nullable|min:8|',  // Validation for password if provided
            'confirm_password' => 'nullable|min:8|',  // Validation for password if provided

        ]);


        // Prepare the data to update
        $data = $request->all();

        // If a password is provided, hash it before saving
        if ($request->filled('password')) {
            $data['password'] = bcrypt($request->password);  // Hash the password
        } else {
            // Remove the password field if not provided
            unset($data['password']);
        }

        // Update the user with the validated data
        $user->update($data);

        // Redirect with a success message
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
