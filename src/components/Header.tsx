
import { useTheme } from '@/contexts/ThemeContext';
import { useTasks } from '@/contexts/TaskContext';
import { Button } from '@/components/ui/button';
import { MoonIcon, SunIcon, BellIcon } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const { stats } = useTasks();
  
  // Calculate progress percentage
  const levelProgress = (stats.points % 100) || 0;
  const nextLevelPoints = (Math.floor(stats.points / 100) + 1) * 100;
  
  return (
    <header className="sticky top-0 z-10 glass-card mb-4 animate-fade-in">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold gradient-text">TaskFlow</h1>
          <div className="hidden md:flex flex-col">
            <div className="flex items-center gap-2">
              <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                Level {stats.level}
              </span>
              <span className="text-xs text-muted-foreground">
                {stats.points} / {nextLevelPoints} XP
              </span>
            </div>
            <Progress value={levelProgress} className="w-32 h-1 mt-1" />
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2 text-sm">
            <span className="bg-secondary/10 text-secondary px-2 py-1 rounded-full text-xs">
              {stats.tasksCompleted} tasks completed
            </span>
          </div>
          
          <Button variant="ghost" size="icon" className="relative btn-glow">
            <BellIcon size={20} />
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleTheme} 
            className="btn-glow"
          >
            {theme === 'dark' ? 
              <SunIcon size={20} className="text-yellow-400 transition-transform hover:rotate-90 duration-500" /> : 
              <MoonIcon size={20} className="transition-transform hover:rotate-90 duration-500" />
            }
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
