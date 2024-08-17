<?php

use App\Events\PostBroadCastEvent;
use App\Events\TestEvvent;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\PostController;
use App\Http\Controllers\API\UserController;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Broadcast;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::group(['prefix' => '/auth'], function () {
    Route::post('/register', [AuthController::class, 'userRegister']);
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/chechCredentials', [AuthController::class, 'checkCredentials']);
});


Route::middleware('auth:sanctum')->group(function () {
    Route::post('/auth/logout', [AuthController::class,'logout']);

    Route::post('/update/profile', [UserController::class, 'updateProfileImage']);

    Route::apiResource("/post", PostController::class);

});


Route::post("/test/channel", function () {
    $post = Post::select('*')->with('user')->orderByDesc('id')->first();
    // TestEvvent::dispatch($post);
    PostBroadCastEvent::dispatch($post);
    return response()->json(["message" => "Data sent to client"]);
});

Broadcast::routes(["middleware" => ["auth:sanctum"]]);