
import { useState } from 'react';
import { useTasks } from '@/contexts/TaskContext';
import { Task } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Check,
  CheckCircle2,
  Clock,
  Edit,
  Flag,
  Trash2,
  ListFilter,
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import TaskEditDialog from '@/components/TaskEditDialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const TaskList = () => {
  const { tasks, toggleComplete, deleteTask, filter, setFilter, getFilteredTasks } = useTasks();
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  
  // Get filtered tasks
  const filteredTasks = getFilteredTasks();
  
  // Split filtered tasks into active and completed
  const activeTasks = filteredTasks.filter((task) => !task.completed);
  const completedTasks = filteredTasks.filter((task) => task.completed);
  
  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case 'high':
        return <Badge variant="destructive" className="ml-2">High</Badge>;
      case 'medium':
        return <Badge variant="outline" className="bg-yellow-500/20 text-yellow-700 dark:text-yellow-400 ml-2">Medium</Badge>;
      case 'low':
        return <Badge variant="outline" className="bg-green-500/20 text-green-700 dark:text-green-400 ml-2">Low</Badge>;
      default:
        return null;
    }
  };

  const handleCompleteTask = (id: string) => {
    const task = tasks.find(t => t.id === id);
    if (task && !task.completed) {
      toggleComplete(id);
      // Show confetti animation
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 2000);
    } else {
      toggleComplete(id);
    }
  };

  const renderTask = (task: Task, index: number) => (
    <div
      key={task.id}
      className={`task-card ${task.completed ? 'completed' : `priority-${task.priority}`} mb-3 cursor-task animate-fade-in`}
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      <div className="flex items-start justify-between p-4">
        <div className="flex-1">
          <div className="flex items-center">
            <h3 className={`font-medium ${task.completed ? 'text-muted-foreground' : ''}`}>
              {task.title}
            </h3>
            {!task.completed && getPriorityLabel(task.priority)}
          </div>
          
          {task.description && (
            <p className="text-sm text-muted-foreground mt-1">
              {task.description}
            </p>
          )}
          
          {task.dueDate && (
            <div className="flex items-center text-xs text-muted-foreground mt-2">
              <Clock size={14} className="mr-1" />
              {format(new Date(task.dueDate), 'MMM dd, yyyy')}
            </div>
          )}
        </div>
        
        <div className="flex items-center space-x-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleCompleteTask(task.id)}
            className="btn-glow"
          >
            {task.completed ? (
              <CheckCircle2 size={18} className="text-green-500" />
            ) : (
              <Check size={18} />
            )}
          </Button>
          
          {!task.completed && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTaskToEdit(task)}
              className="btn-glow"
            >
              <Edit size={18} />
            </Button>
          )}
          
          <Button
            variant="ghost"
            size="icon"
            onClick={() => deleteTask(task.id)}
            className="btn-glow"
          >
            <Trash2 size={18} />
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <Card className="glass-card overflow-hidden animate-scale-in">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-lg gradient-text">My Tasks</CardTitle>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="btn-glow">
                <ListFilter size={16} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setFilter('all')}>
                All Tasks
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilter('high')}>
                High Priority
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilter('pending')}>
                Pending Only
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilter('completed')}>
                Completed Only
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="active" className="w-full">
            <TabsList className="mb-4 grid w-full grid-cols-2 glass-card bg-transparent">
              <TabsTrigger value="active" className="flex items-center gap-2 data-[state=active]:neon-glow">
                <Flag size={14} />
                Active ({activeTasks.length})
              </TabsTrigger>
              <TabsTrigger value="completed" className="flex items-center gap-2 data-[state=active]:neon-glow">
                <CheckCircle2 size={14} />
                Completed ({completedTasks.length})
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="active" className="mt-0 space-y-1">
              {activeTasks.length === 0 ? (
                <div className="py-8 text-center text-muted-foreground">
                  {filter !== 'all' ? 
                    `No ${filter} tasks found. Try changing the filter.` : 
                    'No active tasks. Add a new task to get started!'}
                </div>
              ) : (
                activeTasks.map(renderTask)
              )}
            </TabsContent>
            
            <TabsContent value="completed" className="mt-0">
              {completedTasks.length === 0 ? (
                <div className="py-8 text-center text-muted-foreground">
                  {filter !== 'all' ? 
                    `No ${filter} completed tasks found. Try changing the filter.` : 
                    'No completed tasks yet. Keep going!'}
                </div>
              ) : (
                completedTasks.map(renderTask)
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      
      {taskToEdit && (
        <TaskEditDialog 
          task={taskToEdit} 
          onClose={() => setTaskToEdit(null)}
        />
      )}

      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          <div className="confetti-container">
            {/* This would be implemented with a confetti library */}
          </div>
        </div>
      )}
    </>
  );
};

export default TaskList;
