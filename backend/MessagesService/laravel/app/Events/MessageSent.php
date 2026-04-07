<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;
use App\Models\Message;
use Illuminate\Support\Facades\Log;

class MessageSent implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $message;
    /**
     * Create a new event instance.
     */
    public function __construct(Message $message)
    {
        $this->message = $message;
        Log::info('MessageSent constructor', ['message' => $this->message]);
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return array<int, \Illuminate\Broadcasting\Channel>
     */
    public function broadcastOn(): array
    {
    Log::info('MessageSent broadcastOn', ['message' => $this->message]);
    return ['chat-channel'];
    }

    public function broadcastWith()
    {
    Log::info('Broadcast data:', ['message' => $this->message]);
        return [
            'id' => $this->message->id,
            'fromUser' => $this->message->from_user,
            'toUser' => $this->message->to_user,
            'content' => $this->message->content,
            'createdAt' => $this->message->created_at->toDateTimeString(),
        ];
    }

    public function broadcastAs()
        {
        Log::info('Broadcast as:', ['message' => $this->message]);
            return 'message-sent';
        }
}
