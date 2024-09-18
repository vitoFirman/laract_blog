<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Profile;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

/**
 * @OA\Post(
 *     path="/api/register",
 *     summary="Register User",
 *     tags={"Authentication"},
 *     @OA\RequestBody(
 *         required=true,
 *         @OA\MediaType(
 *             mediaType="application/json",
 *             @OA\Schema(
 *                 @OA\Property(
 *                     property="username",
 *                     description="username",
 *                     type="string",
 *                     example="john doe"
 *                 ),
 *                 @OA\Property(
 *                     property="first_name",
 *                     description="first name",
 *                     type="string",
 *                     example="john"
 *                 ),
 *                 @OA\Property(
 *                     property="last_name",
 *                     description="last name",
 *                     type="string",
 *                     example="doe"
 *                 ),
 *                 @OA\Property(
 *                     property="email",
 *                     description="email",
 *                     type="string",
 *                     example="john@gmail.com"
 *                 ),
 *                 @OA\Property(
 *                     property="password",
 *                     description="password",
 *                     type="string",
 *                     example="punt3n123"
 *                 ),
 *                 @OA\Property(
 *                     property="password_confirmation",
 *                     description="confirm password",
 *                     type="string",
 *                     example="punt3n123"
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

class Register extends Controller
{
    public function __invoke(Request $request)
    {
        $request->validate([
            'username' => 'required|string',
            'first_name' => 'required|string|min:3',
            'last_name' => 'required|string',
            'email' => 'email|unique:users',
            'password' => 'required',
            'password_confirmation' => 'required|same:password',
        ]);
        $userData = $request->only(['username', 'email', 'password']);
        $profileData = $request->only(['first_name', 'last_name']);
        $user = User::create([
            'name' => $userData['username'],
            'email' => $userData['email'],
            'password' => Hash::make($userData['password']),
        ]);
        if ($user) {
            Profile::create([
                'user_id' => $user->id,
                'first_name' => $profileData['first_name'],
                'last_name' => $profileData['last_name'],
                'image' => null,
            ]);
        }
        return response()->json([
            'status' => 200,
            'message' => 'Success'
        ]);
    }
}
