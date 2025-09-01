<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\TaskService;
use App\Models\Task;
use Illuminate\Support\Facades\Auth;
use App\Events\TaskCreated;
use App\Events\TaskUpdated;
use App\Events\TaskDeleted;
use App\Services\NotificationService;

class TaskController extends Controller
{
    protected $taskService;
    protected $notificationService;

    public function __construct(TaskService $taskService, NotificationService $notificationService)
    {
        $this->middleware('auth:api');
        $this->taskService = $taskService;
        $this->notificationService = $notificationService;
    }

    public function index(Request $request)
    {
        $filters = $request->only(['status', 'priority', 'search']);
        $filters['user_id'] = Auth::id(); // Add user_id to filters
        $tasks = $this->taskService->listTasks($filters);
        return response()->json($tasks);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'priority' => 'in:low,medium,high',
            'due_date' => 'nullable|date',
            'status' => 'in:pending,completed',
        ]);
        $data['user_id'] = Auth::id();
        
        $task = $this->taskService->createTask($data);
        event(new TaskCreated($task));
        
        // Create notification for task creation
        $this->notificationService->createNotification(
            Auth::id(),
            'task_created',
            "Task '{$task->title}' has been created successfully!",
            [
                'task_id' => $task->id,
                'task_title' => $task->title,
                'task_priority' => $task->priority,
            ]
        );
        
        return response()->json($task, 201);
    }

    public function show($id)
    {
        $task = $this->taskService->getTask($id);
        if (!$task || $task->user_id !== Auth::id()) {
            return response()->json(['error' => 'Task not found'], 404);
        }
        return response()->json($task);
    }

    public function update(Request $request, $id)
    {
        $task = $this->taskService->getTask($id);
        if (!$task || $task->user_id !== Auth::id()) {
            return response()->json(['error' => 'Task not found'], 404);
        }
        $data = $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'description' => 'nullable|string',
            'priority' => 'in:low,medium,high',
            'due_date' => 'nullable|date',
            'status' => 'in:pending,completed',
        ]);
    $task = $this->taskService->updateTask($task, $data);
    event(new TaskUpdated($task));
    return response()->json($task);
    }

    public function destroy($id)
    {
        $task = $this->taskService->getTask($id);
        if (!$task || $task->user_id !== Auth::id()) {
            return response()->json(['error' => 'Task not found'], 404);
        }
    $this->taskService->deleteTask($task);
    event(new TaskDeleted($task->id));
    return response()->json(['message' => 'Task deleted']);
    }
}
