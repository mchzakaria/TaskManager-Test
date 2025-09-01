<?php

namespace App\Services;

use App\Models\Notification;
use App\Models\User;
use Illuminate\Support\Facades\Log;

/**
 * Service class for handling notifications
 * 
 * This service follows the Single Responsibility Principle by handling
 * all notification-related operations including creation and broadcasting.
 */
class NotificationService
{
    /**
     * Create a notification for a user
     *
     * @param int $userId
     * @param string $type
     * @param string $message
     * @param array|null $data
     * @return Notification
     */
    public function createNotification(int $userId, string $type, string $message, ?array $data = null): Notification
    {
        try {
            $notification = Notification::create([
                'user_id' => $userId,
                'type' => $type,
                'message' => $message,
                'data' => $data,
                'read' => false,
            ]);

            // Broadcast the notification in real-time
            $this->broadcastNotification($notification);

            return $notification;
        } catch (\Exception $e) {
            Log::error('Failed to create notification: ' . $e->getMessage());
            throw $e;
        }
    }

    /**
     * Broadcast notification using Laravel Echo/Pusher
     *
     * @param Notification $notification
     * @return void
     */
    private function broadcastNotification(Notification $notification): void
    {
        try {
            // Broadcast to the user's private channel
            broadcast(new \App\Events\NotificationCreated($notification))->toOthers();
        } catch (\Exception $e) {
            Log::error('Failed to broadcast notification: ' . $e->getMessage());
        }
    }

    /**
     * Mark notification as read
     *
     * @param int $notificationId
     * @param int $userId
     * @return bool
     */
    public function markAsRead(int $notificationId, int $userId): bool
    {
        try {
            $notification = Notification::where('id', $notificationId)
                ->where('user_id', $userId)
                ->first();

            if ($notification) {
                $notification->update(['read' => true]);
                return true;
            }

            return false;
        } catch (\Exception $e) {
            Log::error('Failed to mark notification as read: ' . $e->getMessage());
            return false;
        }
    }

    /**
     * Get unread notifications for a user
     *
     * @param int $userId
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function getUnreadNotifications(int $userId)
    {
        return Notification::where('user_id', $userId)
            ->where('read', false)
            ->orderBy('created_at', 'desc')
            ->get();
    }

    /**
     * Get all notifications for a user
     *
     * @param int $userId
     * @param int $limit
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function getAllNotifications(int $userId, int $limit = 50)
    {
        return Notification::where('user_id', $userId)
            ->orderBy('created_at', 'desc')
            ->limit($limit)
            ->get();
    }
}
