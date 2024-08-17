<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\RegisterRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;

class AuthController extends Controller
{
    public function userRegister(RegisterRequest $request)
    {
        $payload = $request->validated();
        Log::info('I am here');
        try {
            $payload['password'] = Hash::make($payload['password']);
            User::create($payload);
            return $this->successResponse(null, 'User created successfully', 201);
        } catch (\Exception $e) {
            Log::error($e->getMessage());
            return $this->errorResponse('Something went wrong', 500);
        }
    }

    public function login(LoginRequest $request)
    {
        $payload = $request->validated();

        try {
            $user = User::where('email', $payload['email'])->first();
            if ($user) {
                if (!Hash::check($payload['password'], $user->password)) {
                    return $this->errorResponse('Password did not match', 400);
                }
                
                $token = $user->createToken('mytoken')->plainTextToken;
                return $this->successResponse(array_merge($user->toArray(),["token" => $token]), 'User logged in successfully', 201, $token);
            } else {
                return $this->errorResponse('User did not exist', 404);
            }
        } catch (\Exception $e) {
            return $this->errorResponse();
        }
    }

    public function checkCredentials(LoginRequest $request){
        $payload = $request->validated();
        try {
            $user = User::where('email', $payload['email'])->first();
            if ($user) {
                if (!Hash::check($payload['password'], $user->password)) {
                    return $this->errorResponse('Password did not match', 401);
                }

                return $this->successResponse($user, 'Credentials are matched', 201);
            } else {
                return $this->errorResponse('User did not exist', 404);
            }
        } catch (\Exception $e) {
            return $this->errorResponse();
        }
    }

    public function logout(Request $request){
        try {
           $request->user()->currentAccessToken()->delete();
           return $this->successResponse(null,'User logged out successfully');
        } catch (\Exception $th) {
            return $this->errorResponse();
        }
    }
}
