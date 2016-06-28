<?php

namespace App\Http\Controllers;

use App\Http\Requests;
use Auth;
use Illuminate\Http\Request;
use Intervention\Image\Facades\Image;

class ProfileController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function index()
    {
        $user = Auth::user();
        
        return response()->json(compact('user'));
    }

    public function store(Request $request)
    {
        $user = Auth::user();
        
        return response()->json(compact('user'));
    }

    public function updateAvatar(Request $request)
    {
        if($request->hasFile('avatar'))
        {
            $avatar = $this->saveFile($request->file('avatar'));

            $user = Auth::user();
            $user->avatar = $avatar;
            $user->save();

            return  response()->json(compact('avatar'));   
        }
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

    public function update(Request $request, $id)
    {
        $date  = date('Y-m-d', mktime(0, 0, 0, date("m"),   date("d"),   date("Y")-18));

        $this->validate($request, [
            'full_name' => 'required|max:255',
            'birth_date' => 'required|before:'.$date,
            'address' => 'required|max:255',
            'zip_code' => 'required|numeric'
        ]);

        $user = Auth::user();

        if($request->hasFile('avatar'))
        {
            $avatar = $this->saveFile($request->file('avatar'));
            $user->avatar = $avatar;
        }

        $user->fill($request->all());
        
        $user->save(); 

        return response()->json(compact('user'));
    }
}
