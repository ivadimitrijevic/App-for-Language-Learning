<?php

use Illuminate\Support\Facades\Broadcast;

/*
|--------------------------------------------------------------------------
| Broadcast Channels
|--------------------------------------------------------------------------
|
*/

Broadcast::channel('chat-channel', function ($user) {
    return Auth::check();
});
