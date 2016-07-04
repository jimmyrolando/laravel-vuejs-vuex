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


    public function updateAvatar(Request $request)
    {
        $this->validate($request, [
            'avatar' => 'required|image'
        ]);

        if($request->hasFile('avatar'))
        {
            $user = Auth::user();
            $user->avatar = $this->saveFile($request->file('avatar'));
            $user->save();

            return  response()->json(compact('user'));   
        }
    }

    public function update(Request $request, $id)
    {
        $this->validate($request, [
            'full_name' => 'required|max:255',
            'birth_date' => 'required|before:'.$this->minDate(),
            'address' => 'required|max:255',
            'zip_code' => 'required|numeric',
            'avatar' => 'image'
        ]);

        $user = Auth::user();
        $user->fill($request->except(['avatar']));

        if($request->hasFile('avatar'))
        {
            $user->avatar = $this->saveFile($request->file('avatar'));
        }
        $user->save(); 

        return response()->json(compact('user'));
    }

    protected function saveFile($file)
    {
        $path = 'storage/avatars/';
        $filename = time() . '.' . $file->getClientOriginalExtension();

        Image::make($file)
            ->resize(300, 300)
            ->save( public_path($path. $filename ) );

        return $path.$filename;
    }

    protected function minDate()
    {
        return date('Y-m-d', mktime(0, 0, 0, date("m"),   date("d"),   date("Y")-18));
    }
}
