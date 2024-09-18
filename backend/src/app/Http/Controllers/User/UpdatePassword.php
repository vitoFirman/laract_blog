<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

/**
 * @OA\Post(
 *     path="/api/user/update-password",
 *     summary="Update Password User",
 *     tags={"Users"},
 *     security={{"bearerAuth": {}}},
 *     @OA\RequestBody(
 *         required=true,
 *         @OA\MediaType(
 *             mediaType="multipart/form-data",
 *             @OA\Schema(
 *                 @OA\Property(
 *                     property="current_password",
 *                     description="current password",
 *                     type="string",
 *                     example=""
 *                 ),
 *                 @OA\Property(
 *                     property="new_password",
 *                     description="new password",
 *                     type="string",
 *                     example=""
 *                 ),
 *                  @OA\Property(
 *                     property="new_password_confirmation",
 *                     description="new password",
 *                     type="string",
 *                     example=""
 *                 )
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
class UpdatePassword extends Controller
{
    public function __invoke(Request $request)
    {
        $request->validate([
            'current_password' => 'required',
            'new_password' => 'required',
            'new_password_confirmation' => 'required|same:new_password'
        ], [
            'new_password_confirmation.same' => 'password confirmation did match'
        ]);
        $currentPass = $request->current_password;
        $newPass = $request->new_password;
        $user = $request->user();
        if (!Hash::check($currentPass, $user->password)) {
            return response()->json(['message' => 'Password Invalid'], 401);
        };
        $user->password = $newPass;
        $user->save();
        return response()->json([
            'status' => 200,
            'message' => 'Success'
        ]);
    }
}
