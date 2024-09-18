<?php

namespace App\Http\Controllers\Profile;

use App\Http\Controllers\Controller;
use App\Models\Profile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;

/**
 * @OA\Post(
 *     path="/api/profile/upload-image",
 *     summary="Upload Image",
 *     tags={"Profile"},
 *     security={{"bearerAuth": {}}},
 *     @OA\RequestBody(
 *         required=true,
 *         @OA\MediaType(
 *             mediaType="multipart/form-data",
 *             @OA\Schema(
 *                 @OA\Property(
 *                     property="image",
 *                     description="image",
 *                     type="file",
 *                 ),
 *             )
 *         )
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Success Created",
 *         @OA\JsonContent()
 *     ),
 *     @OA\Response(
 *         response="400",
 *         description="Invalid Values",
 *         @OA\JsonContent()
 *     ),
 *     @OA\Response(
 *         response="500",
 *         description="Internal Server Error",
 *         @OA\JsonContent()
 *     )
 * )
 */
class UploadImage extends Controller
{
    public function __invoke(Request $request)
    {
        $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048'
        ]);
        $userid = Auth::user()->id;
        $file = $request->file('image');
        $path = public_path('Uploads/Profile/Image/');
        $ext = $file->getClientOriginalExtension();
        $fileName = md5($userid . '-' . now()) . '.' . $ext;
        $file->move($path, $fileName);
        $userProfile = Profile::where('user_id', $userid)->first();
        if ($userProfile->image) {
            if (File::exists($userProfile->image)) File::delete($userProfile->image);
        }
        $userProfile->image = 'Uploads/Profile/Image/' . $fileName;
        $userProfile->save();
        return response()->json([
            'status' => 200,
            'message' => 'Success'
        ]);
    }
}
