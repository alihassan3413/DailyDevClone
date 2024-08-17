<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ResponseController
{
    public function successResponse($data, $message = 'succcess', $status = 200, $token = null)
    {
        $response = [
            'message' => $message,
        ];

        if ($token !== null) {
            $response['token'] = $token;
        }
        if ($data !== null) {
            $response['data'] = $data;
        }

        return response()->json($response, $status);
    }


    public function errorResponse($message = 'Something went wrong', $status = 500)
    {
       return response()->json(["message" => $message], $status);
    }
}
