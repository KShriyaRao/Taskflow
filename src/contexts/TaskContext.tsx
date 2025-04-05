
import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { Task, Stats, MoodType } from '@/types';

interface TaskContextType {
  tasks: Task[];
  addTask: (task: Omit<Task, 'id' | 'completed' | 'createdAt'>) => void;
  toggleComplete: (id: string) => void;
  editTask: (id: string, updatedTask: Partial<Omit<Task, 'id'>>) => void;
  updateTask: (id: string, updatedTask: Partial<Omit<Task, 'id'>>) => void;
  deleteTask: (id: string) => void;
  stats: Stats;
  filter: 'all' | 'completed' | 'pending' | 'high';
  setFilter: (filter: 'all' | 'completed' | 'pending' | 'high') => void;
  getFilteredTasks: () => Task[];
  mood?: MoodType;
  setMood: (mood: MoodType) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider = ({ children }: { children: React.ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const storedTasks = localStorage.getItem('tasks');
    return storedTasks ? JSON.parse(storedTasks) : [];
  });

  const [stats, setStats] = useState<Stats>({
    totalTasks: 0,
    tasksCompleted: 0,
    level: 1,
    points: 0,
  });

  // Add mood state
  const [mood, setMood] = useState<MoodType | undefined>(() => {
    const storedMood = localStorage.getItem('mood');
    return storedMood ? (JSON.parse(storedMood) as MoodType) : undefined;
  });

  // Add filter state
  const [filter, setFilter] = useState<'all' | 'completed' | 'pending' | 'high'>('all');

  const addTask = (task: Omit<Task, 'id' | 'completed' | 'createdAt'>) => {
    const newTask: Task = { 
      ...task, 
      id: Date.now().toString(), 
      completed: false, 
      createdAt: new Date().toISOString() 
    };
    setTasks(prevTasks => [...prevTasks, newTask]);
    setStats(prevStats => ({
      ...prevStats,
      totalTasks: prevStats.totalTasks + 1,
    }));
  };

  const toggleComplete = (id: string) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const editTask = (id: string, updatedTask: Partial<Omit<Task, 'id'>>) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === id ? { ...task, ...updatedTask } : task
      )
    );
  };
  
  // Add updateTask as an alias for editTask for backward compatibility
  const updateTask = editTask;

  const deleteTask = (id: string) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
    setStats(prevStats => ({
      ...prevStats,
      totalTasks: prevStats.totalTasks - 1,
    }));
  };

  // Get filtered tasks based on current filter
  const getFilteredTasks = useCallback(() => {
    switch (filter) {
      case 'completed':
        return tasks.filter(task => task.completed);
      case 'pending':
        return tasks.filter(task => !task.completed);
      case 'high':
        return tasks.filter(task => task.priority === 'high');
      default:
        return tasks;
    }
  }, [tasks, filter]);

  // Save mood to localStorage when it changes
  useEffect(() => {
    if (mood) {
      localStorage.setItem('mood', JSON.stringify(mood));
    }
  }, [mood]);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));

    let completed = tasks.filter(task => task.completed).length;
    let total = tasks.length;
    let newPoints = completed * 10;
    let newLevel = Math.floor(newPoints / 100) + 1;

    setStats({
      totalTasks: total,
      tasksCompleted: completed,
      level: newLevel,
      points: newPoints,
    });
  }, [tasks]);

  return (
    <TaskContext.Provider value={{ 
      tasks, 
      addTask, 
      toggleComplete, 
      editTask,
      updateTask,
      deleteTask, 
      stats,
      filter,
      setFilter,
      getFilteredTasks,
      mood,
      setMood
    }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = (): TaskContextType => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
};
