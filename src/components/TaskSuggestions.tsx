import { useTasks } from '@/contexts/TaskContext';
import { getTaskSuggestions } from '@/lib/task-utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Lightbulb, Plus } from 'lucide-react';

const TaskSuggestions = () => {
  const { mood, addTask } = useTasks();
  
  if (!mood) return null;
  
  const suggestions = getTaskSuggestions(mood);

  const handleAddSuggestion = (title: string) => {
    addTask({
      title,
      priority: 'medium',
      dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    });
  };

  return (
    <Card className="animate-fade-in">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <Lightbulb className="text-yellow-500" size={18} />
          Suggested Tasks for {mood.charAt(0).toUpperCase() + mood.slice(1)} Mood
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {suggestions.map((suggestion, index) => (
            <li key={index} className="flex items-center justify-between bg-muted/50 p-2 rounded-md">
              <span className="text-sm">{suggestion}</span>
              <Button
                variant="ghost" 
                size="sm"
                onClick={() => handleAddSuggestion(suggestion)}
              >
                <Plus size={16} />
              </Button>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default TaskSuggestions;
