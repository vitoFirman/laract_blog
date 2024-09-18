<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

/**
 * @OA\Post(
 *     path="/api/login",
 *     summary="Login User",
 *     tags={"Authentication"},
 *     @OA\RequestBody(
 *         required=true,
 *         @OA\MediaType(
 *             mediaType="multipart/form-data",
 *             @OA\Schema(
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
class Login extends Controller
{
    public function __invoke(Request $request)
    {
        $email = $request->email;
        $password = $request->password;
        $user = User::where('email', $email)->first();
        if (!$user || !Hash::check($password, $user->password)) throw new \Exception('invalid email or password');
        $token = $user->createToken('token')->plainTextToken;
        return response()->json([
            'status' => 200,
            'message' => 'Success',
            'items' => [
                'user' => $user,
                'token' => $token
            ]
        ]);
    }
}
