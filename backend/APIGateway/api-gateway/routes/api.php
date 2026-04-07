<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Route;

Route::match(['get', 'post', 'put', 'delete'], '/language/{any}', function (Request $request, $any) {
    $url = 'http://localhost:8001/api/language/' . $any;
    $method = $request->method();
    $response = Http::send($method, $url, [
        'json' => $request->all(),
    ]);
    return response()->json($response->json(), $response->status());
})->where('any', '.*');

Route::match(['get', 'post', 'put', 'delete'], '/notification/{any}', function (Request $request, $any) {
    $url = 'http://localhost:8002/api/notification/' . $any;
    $method = $request->method();
    $response = Http::send($method, $url, [
        'json' => $request->all(),
    ]);
    return response()->json($response->json(), $response->status());
})->where('any', '.*');

Route::match(['get', 'post', 'put', 'delete'], '/messages/{any}', function (Request $request, $any) {
    $url = 'http://localhost:8003/api/messages/' . $any;
    $method = $request->method();
    $response = Http::send($method, $url, [
        'json' => $request->all(),
    ]);
    return response()->json($response->json(), $response->status());
})->where('any', '.*');

Route::match(['get', 'post', 'put', 'delete'], '/event/{any}', function (Request $request, $any) {
    $url = 'http://localhost:8004/api/event/' . $any;
    $method = $request->method();
    $response = Http::send($method, $url, [
        'json' => $request->all(),
    ]);
    return response()->json($response->json(), $response->status());
})->where('any', '.*');

Route::match(['get', 'post', 'put', 'delete'], '/user/{any}', function (Request $request, $any) {
    $url = 'http://localhost:8005/api/user/' . $any;
    $method = $request->method();
    $response = Http::send($method, $url, [
        'json' => $request->all(),
    ]);
    return response()->json($response->json(), $response->status());
})->where('any', '.*');


