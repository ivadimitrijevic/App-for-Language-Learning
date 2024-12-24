<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class Message extends Model
{
    use HasFactory;

    protected $fillable = ['from_user', 'to_user', 'content'];

    public function receiver()
    {
        return $this->belongsTo(User::class, 'to_user');
    }

    public function sender()
    {
        return $this->belongsTo(User::class, 'from_user');
    }
}
