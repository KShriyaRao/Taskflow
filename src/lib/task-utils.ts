
import { Priority, Task, MoodType } from '@/types';

export const generateId = (): string => {
  return Math.random().toString(36).substring(2, 9);
};

export const calculatePriority = (task: Partial<Task>): Priority => {
  if (!task.dueDate) return 'low';
  
  const today = new Date();
  const due = new Date(task.dueDate);
  const diffTime = due.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays <= 1) return 'high';
  if (diffDays <= 3) return 'medium';
  return 'low';
};

export const sortTasks = (tasks: Task[]): Task[] => {
  return [...tasks].sort((a, b) => {
    // First sort by completion status
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1;
    }
    
    // Then by priority
    const priorityOrder: Record<Priority, number> = {
      high: 0,
      medium: 1,
      low: 2
    };
    
    if (a.priority !== b.priority) {
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    }
    
    // Then by due date if available
    if (a.dueDate && b.dueDate) {
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    }
    
    // Finally by creation date
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });
};

export const getTaskSuggestions = (mood: MoodType): string[] => {
  const suggestions: Record<MoodType, string[]> = {
    energetic: [
      'Clean the house',
      'Exercise or workout',
      'Tackle a challenging project',
      'Organize your workspace',
      'Batch prepare meals for the week'
    ],
    focused: [
      'Work on important deadline',
      'Study for exam',
      'Write report or article',
      'Code a complex feature',
      'Review financial documents'
    ],
    tired: [
      'Organize digital files',
      'Plan tomorrow\'s schedule',
      'Do light reading',
      'Update your to-do list',
      'Simple email responses'
    ],
    creative: [
      'Brainstorm new ideas',
      'Design something new',
      'Write creatively',
      'Plan a future project',
      'Solve a problem differently'
    ],
    distracted: [
      'Quick 5-minute tasks',
      'Sort emails',
      'Take a short walk then work',
      'Do some mindfulness exercises',
      'Work in 10-minute focused intervals'
    ]
  };

  return suggestions[mood];
};

export const getProductivityTip = (): string => {
  const tips = [
    "Try the 2-minute rule: if it takes less than 2 minutes, do it now.",
    "Break large tasks into smaller, manageable chunks.",
    "Use the Pomodoro technique: 25 minutes of focused work, followed by a 5-minute break.",
    "Plan tomorrow's tasks at the end of today.",
    "Tackle your most important task first thing in the morning.",
    "Reduce multitasking and focus on one task at a time.",
    "Take regular short breaks to maintain focus and energy.",
    "Set specific goals for each work session.",
    "Create a dedicated workspace free of distractions.",
    "Use time blocking in your calendar for important tasks."
  ];
  
  return tips[Math.floor(Math.random() * tips.length)];
};

export const getDailyQuote = (): { text: string; author: string } => {
  const quotes = [
    { text: "The future depends on what you do today.", author: "Mahatma Gandhi" },
    { text: "It always seems impossible until it's done.", author: "Nelson Mandela" },
    { text: "Don't count the days, make the days count.", author: "Muhammad Ali" },
    { text: "Quality is not an act, it is a habit.", author: "Aristotle" },
    { text: "The way to get started is to quit talking and begin doing.", author: "Walt Disney" },
    { text: "Your time is limited, don't waste it living someone else's life.", author: "Steve Jobs" },
    { text: "Whether you think you can, or you think you can't – you're right.", author: "Henry Ford" },
    { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
    { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
    { text: "Success is not final, failure is not fatal: It is the courage to continue that counts.", author: "Winston Churchill" }
  ];
  
  // Use the current date as seed to get the same quote all day
  const today = new Date();
  const seed = today.getDate() + today.getMonth() * 31;
  const index = seed % quotes.length;
  
  return quotes[index];
};
