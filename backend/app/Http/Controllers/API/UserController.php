<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function updateProfileImage(Request $request)
    {
        $payload = $request->validate([
            "profile_image" => "required|image|mimes:svg,png,jpg,jpeg,webp|max:2048"
        ]);

        try {
            $user = $request->user();
            $image = $payload["profile_image"]->store("/images_". $user->id);
            $user->update(["profile_image", $image]);
            return $this->successResponse($image, "Image updated successfully");
        } catch (\Throwable $th) {
            return $this->errorResponse();
        }
    }



    // public function updateProfileImage(Request $request)
    // {
    //     $payload = $request->validate([
    //         'profile_image' => 'required|image|mimes:svg,png,jpg,jpeg,webp|max:2048',
    //     ]);

    //     try {
    //         $user = $request->user();
    //         // Store the uploaded image in a folder named after the user's ID
    //         $imagePath = $payload['profile_image']->store("images/{$user->id}", 'public');

    //         // Update the user's profile image path in the database
    //         $user->update(['profile_image' => $imagePath]);

    //         // Return a success response with the image path
    //         return response()->json([
    //             'success' => true,
    //             'message' => 'Image updated successfully',
    //             'data' => $imagePath,
    //         ]);
    //     } catch (\Throwable $th) {
    //         // Return a generic error response
    //         return response()->json([
    //             'success' => false,
    //             'message' => 'An error occurred while updating the image',
    //         ], 500);
    //     }
    // }
}
