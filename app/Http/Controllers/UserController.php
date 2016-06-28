<?php

namespace App\Http\Controllers;

use App\Http\Requests;
use App\User;
use Illuminate\Http\Request;
use Intervention\Image\Facades\Image;

class UserController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('role:admin');
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $users = User::all();

        return response()->json(compact('users'));
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->validate($request, [
            'name' => 'required|max:255|unique:users',
            'email' => 'required|email|max:255|unique:users',
            'password' => 'required|min:6',
            'role' => 'required'
        ]);

        $user = User::create([
            'name' => $request->input('name'),
            'email' => $request->input('email'),
            'password' => bcrypt($request->input('password')),
            'role' => $request->input('role'),
        ]);
        
        return response()->json(compact('user'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $date  = date('Y-m-d', mktime(0, 0, 0, date("m"),   date("d"),   date("Y")-18));

        $this->validate($request, [
            'full_name' => 'required|max:255',
            'birth_date' => 'required|before:'.$date,
            'address' => 'required|max:255',
            'zip_code' => 'required|numeric',
            'role' => 'required',
            'avatar' => 'image'
        ]);

        $user = User::findOrFail($id);

        if($request->hasFile('avatar'))
        {
            $avatar = $this->saveFile($request->file('avatar'));
            $user->avatar = $avatar;
        }

        $user->fill($request->all());
        
        $user->save();

        $users = User::all();

        return response()->json(compact('users','user'));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $user = User::findOrFail($id);
        $user->delete();
        return 'ok';
    }

    protected function saveFile($file)
    {
        $path = 'storage/avatars/';

        $filename = time() . '.' . $file->getClientOriginalExtension();

        Image::make($file)
            ->resize(300, 300)
            ->save( public_path($path. $filename ) );

        return asset($path.$filename);
    }
}
