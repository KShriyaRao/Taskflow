
import { useState } from 'react';
import { useTasks } from '@/contexts/TaskContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Mic, Plus } from 'lucide-react';
import { Priority } from '@/types';

const AddTaskForm = () => {
  const { addTask } = useTasks();
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState<Priority>('medium');
  const [isVoiceInput, setIsVoiceInput] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) return;
    
    addTask({
      title,
      description,
      dueDate,
      priority,
    });
    
    // Reset form
    setTitle('');
    setDescription('');
    setDueDate('');
    setPriority('medium');
  };
  
  const handleVoiceInput = () => {
    // In a first version we'll just simulate this
    setIsVoiceInput(true);
    setTimeout(() => {
      setIsVoiceInput(false);
      setTitle('Voice input task (simulated)');
    }, 1500);
  };

  return (
    <Card className="mb-6">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Add New Task</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center gap-2">
            <Input
              placeholder="Task name"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="flex-grow"
              disabled={isVoiceInput}
            />
            <Button 
              type="button" 
              variant="outline" 
              size="icon"
              onClick={handleVoiceInput}
              disabled={isVoiceInput}
              className="flex-shrink-0"
            >
              <Mic size={18} className={isVoiceInput ? "animate-pulse text-primary" : ""} />
            </Button>
          </div>
          
          <Textarea
            placeholder="Description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={2}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="due-date" className="text-sm font-medium">
                Due Date
              </label>
              <Input
                id="due-date"
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="priority" className="text-sm font-medium">
                Priority
              </label>
              <Select
                value={priority}
                onValueChange={(value) => setPriority(value as Priority)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <Button type="submit" className="w-full">
            <Plus size={18} className="mr-2" />
            Add Task
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddTaskForm;
