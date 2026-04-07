<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Message;
use App\Models\User;
use App\Events\MessageSent;
use App\Http\Resources\MessageResource;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;

class ChatController extends Controller
{
    /**
     *Method for getting messages
     */
    public function fetchMessages()
    {
        return Message::with('user')->latest()->take(50)->get();
    }

    /**
     *Method for sending messages
     */
    public function sendMessage(Request $request)
    {
        $request->validate([
            'content' => 'required|string|max:500',
            'fromUser' => ['required'],
            'toUser' => ['required'],
        ]);

        $message = Message::create([
            'from_user' => $request->fromUser,
            'to_user' => $request->toUser,
            'content' => $request->content,
        ]);

        broadcast(new MessageSent($message))->toOthers();
        Log::info('MessageSent event ', ['message' => $message]);

        return response()->json(new MessageResource($message), 201);
    }

    public function getMessagesBetweenUsers(Request $request, $senderId, $receiverId)
    {
        $perPage = 50;
        $page = $request->get('page', 1);

        $messages = Message::where(function ($query) use ($senderId, $receiverId) {
                $query->where('from_user', $senderId)
                      ->where('to_user', $receiverId);
            })
            ->orWhere(function ($query) use ($senderId, $receiverId) {
                $query->where('from_user', $receiverId)
                      ->where('to_user', $senderId);
            })
            ->orderBy('created_at', 'desc')
            ->paginate($perPage, ['*'], 'page', $page);

        $sortedMessages = $messages->getCollection()->reverse()->values();

        return response()->json([
            'messages' => MessageResource::collection($sortedMessages),
            'currentPage' => $messages->currentPage(),
            'lastPage' => $messages->lastPage(),
            'perPage' => $messages->perPage(),
            'total' => $messages->total(),
        ]);
    }
}
