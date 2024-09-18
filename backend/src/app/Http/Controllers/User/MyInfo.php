<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

/**
 * @OA\Get(
 *     path="/api/user/info",
 *     summary="User Info",
 *     tags={"Users"},
 *     security={{"bearerAuth": {}}},
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
class MyInfo extends Controller
{
    public function __invoke()
    {
        $user = Auth::user();
        return response()->json($user);
    }
}
