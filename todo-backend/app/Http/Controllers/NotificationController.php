<?php

namespace App\Http\Controllers;

use App\Services\NotificationService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

/**
 * Controller for handling notification operations
 * 
 * This controller follows the Single Responsibility Principle by handling
 * all notification-related HTTP requests.
 */
class NotificationController extends Controller
{
    protected $notificationService;

    public function __construct(NotificationService $notificationService)
    {
        $this->middleware('auth:api');
        $this->notificationService = $notificationService;
    }

    /**
     * Get all notifications for the authenticated user
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $limit = $request->get('limit', 50);
        $notifications = $this->notificationService->getAllNotifications(Auth::id(), $limit);
        
        return response()->json($notifications);
    }

    /**
     * Get unread notifications for the authenticated user
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function unread()
    {
        $notifications = $this->notificationService->getUnreadNotifications(Auth::id());
        
        return response()->json($notifications);
    }

    /**
     * Mark a notification as read
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function markAsRead($id)
    {
        $success = $this->notificationService->markAsRead($id, Auth::id());
        
        if ($success) {
            return response()->json(['message' => 'Notification marked as read']);
        }
        
        return response()->json(['error' => 'Notification not found'], 404);
    }

    /**
     * Mark all notifications as read for the authenticated user
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function markAllAsRead()
    {
        $notifications = $this->notificationService->getUnreadNotifications(Auth::id());
        
        foreach ($notifications as $notification) {
            $this->notificationService->markAsRead($notification->id, Auth::id());
        }
        
        return response()->json(['message' => 'All notifications marked as read']);
    }
}
