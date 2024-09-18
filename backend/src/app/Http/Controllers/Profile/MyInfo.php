<?php

namespace App\Http\Controllers\Profile;

use App\Http\Controllers\Controller;
use App\Models\Profile;
use Illuminate\Support\Facades\Auth;


/**
 * @OA\Get(
 *     path="/api/profile/info",
 *     summary="Profile Info",
 *     tags={"Profile"},
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
        $userProfile = Profile::where('user_id', Auth::user()->id)->first();
        return response()->json($userProfile);
    }
}
