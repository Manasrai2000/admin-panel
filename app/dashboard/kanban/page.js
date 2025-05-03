"use client"
import { useState, useEffect } from 'react';

export default function KanbanPage() {
  // Define the initial state for columns and tasks
  const [columns, setColumns] = useState({
    todo: {
      id: 'todo',
      title: 'To Do',
      taskIds: ['task-1', 'task-2', 'task-3']
    },
    inProgress: {
      id: 'inProgress',
      title: 'In Progress',
      taskIds: ['task-4']
    },
    done: {
      id: 'done',
      title: 'Done',
      taskIds: ['task-5']
    }
  });

  const [tasks, setTasks] = useState({
    'task-1': { id: 'task-1', content: 'Create project structure', priority: 'high' },
    'task-2': { id: 'task-2', content: 'Design database schema', priority: 'medium' },
    'task-3': { id: 'task-3', content: 'Set up authentication', priority: 'high' },
    'task-4': { id: 'task-4', content: 'Implement API endpoints', priority: 'medium' },
    'task-5': { id: 'task-5', content: 'Create project repository', priority: 'low' }
  });

  const [columnOrder, setColumnOrder] = useState(['todo', 'inProgress', 'done']);
  const [draggedTask, setDraggedTask] = useState(null);
  const [newTaskContent, setNewTaskContent] = useState('');
  const [newTaskPriority, setNewTaskPriority] = useState('medium');
  const [addingToColumn, setAddingToColumn] = useState(null);

  // Handle drag start
  const handleDragStart = (taskId) => {
    setDraggedTask(taskId);
  };

  // Find which column contains the task
  const findTaskColumn = (taskId) => {
    return Object.keys(columns).find(columnId => 
      columns[columnId].taskIds.includes(taskId)
    );
  };

  // Handle dropping a task in a column
  const handleDrop = (columnId) => {
    if (!draggedTask) return;
    
    const sourceColumnId = findTaskColumn(draggedTask);
    if (sourceColumnId === columnId) {
      setDraggedTask(null);
      return;
    }

    // Remove from source column
    const sourceColumn = columns[sourceColumnId];
    const newSourceTaskIds = sourceColumn.taskIds.filter(id => id !== draggedTask);
    
    // Add to target column
    const targetColumn = columns[columnId];
    const newTargetTaskIds = [...targetColumn.taskIds, draggedTask];
    
    // Update columns state
    setColumns({
      ...columns,
      [sourceColumnId]: {
        ...sourceColumn,
        taskIds: newSourceTaskIds
      },
      [columnId]: {
        ...targetColumn,
        taskIds: newTargetTaskIds
      }
    });
    
    setDraggedTask(null);
  };

  // Handle adding a new task
  const handleAddTask = (columnId) => {
    if (!newTaskContent.trim()) return;
    
    // Create new task
    const newTaskId = `task-${Date.now()}`;
    const newTask = {
      id: newTaskId,
      content: newTaskContent,
      priority: newTaskPriority
    };
    
    // Add task to tasks object
    setTasks({
      ...tasks,
      [newTaskId]: newTask
    });
    
    // Add task ID to column
    setColumns({
      ...columns,
      [columnId]: {
        ...columns[columnId],
        taskIds: [...columns[columnId].taskIds, newTaskId]
      }
    });
    
    // Reset form
    setNewTaskContent('');
    setNewTaskPriority('medium');
    setAddingToColumn(null);
  };

  // Prevent default behavior for dragover to allow drop
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  // Get priority color class
  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'high': return 'bg-red-100 border-red-300';
      case 'medium': return 'bg-yellow-100 border-yellow-300';
      case 'low': return 'bg-green-100 border-green-300';
      default: return 'bg-gray-100 border-gray-300';
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Kanban Board</h1>
      
      <div className="flex gap-4 overflow-x-auto pb-4">
        {columnOrder.map(columnId => {
          const column = columns[columnId];
          const columnTasks = column.taskIds.map(taskId => tasks[taskId]);
          
          return (
            <div 
              key={column.id}
              className="bg-gray-100 rounded-lg p-4 min-w-64 w-64 flex-shrink-0"
              onDragOver={handleDragOver}
              onDrop={() => handleDrop(column.id)}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-bold text-lg">{column.title}</h2>
                <span className="bg-gray-200 rounded-full px-2 py-1 text-xs font-semibold">
                  {columnTasks.length}
                </span>
              </div>
              
              <div className="space-y-2">
                {columnTasks.map(task => (
                  <div
                    key={task.id}
                    className={`p-3 rounded border ${getPriorityColor(task.priority)} cursor-grab shadow-sm hover:shadow`}
                    draggable
                    onDragStart={() => handleDragStart(task.id)}
                  >
                    <p className="text-sm">{task.content}</p>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-xs font-medium capitalize">{task.priority} priority</span>
                    </div>
                  </div>
                ))}
              </div>
              
              {addingToColumn === column.id ? (
                <div className="mt-3 p-3 bg-white rounded border">
                  <textarea
                    className="w-full p-2 border rounded mb-2 text-sm"
                    placeholder="Task description"
                    rows="2"
                    value={newTaskContent}
                    onChange={(e) => setNewTaskContent(e.target.value)}
                  />
                  <div className="flex justify-between items-center">
                    <select
                      className="text-xs p-1 border rounded"
                      value={newTaskPriority}
                      onChange={(e) => setNewTaskPriority(e.target.value)}
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                    <div className="flex gap-2">
                      <button 
                        className="text-xs px-2 py-1 bg-gray-200 rounded"
                        onClick={() => setAddingToColumn(null)}
                      >
                        Cancel
                      </button>
                      <button 
                        className="text-xs px-2 py-1 bg-blue-500 text-white rounded"
                        onClick={() => handleAddTask(column.id)}
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <button
                  className="w-full mt-3 py-2 text-sm text-gray-500 hover:bg-gray-200 rounded flex items-center justify-center"
                  onClick={() => setAddingToColumn(column.id)}
                >
                  <span>+ Add task</span>
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}