
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { PlayIcon, PauseIcon, RotateCcwIcon } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const PomodoroTimer = () => {
  const [mode, setMode] = useState<'work' | 'break'>('work');
  const [isActive, setIsActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [progress, setProgress] = useState(100);

  const workTime = 25 * 60; // 25 minutes
  const breakTime = 5 * 60; // 5 minutes

  useEffect(() => {
    let interval: number | undefined;
    
    if (isActive && timeLeft > 0) {
      interval = window.setInterval(() => {
        setTimeLeft((prevTime) => {
          const newTime = prevTime - 1;
          const maxTime = mode === 'work' ? workTime : breakTime;
          const newProgress = (newTime / maxTime) * 100;
          setProgress(newProgress);
          return newTime;
        });
      }, 1000);
    } else if (timeLeft === 0) {
      // Timer complete
      window.clearInterval(interval);
      const nextMode = mode === 'work' ? 'break' : 'work';
      const nextTime = nextMode === 'work' ? workTime : breakTime;
      
      toast({
        title: `${mode === 'work' ? 'Work' : 'Break'} session completed!`,
        description: `Time for a ${nextMode === 'work' ? 'work' : 'break'} session.`,
      });
      
      setMode(nextMode);
      setTimeLeft(nextTime);
      setProgress(100);
    }
    
    return () => {
      if (interval) window.clearInterval(interval);
    };
  }, [isActive, timeLeft, mode]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(mode === 'work' ? workTime : breakTime);
    setProgress(100);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const switchMode = () => {
    const nextMode = mode === 'work' ? 'break' : 'work';
    const nextTime = nextMode === 'work' ? workTime : breakTime;
    
    setMode(nextMode);
    setTimeLeft(nextTime);
    setIsActive(false);
    setProgress(100);
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center justify-between">
          <span>Pomodoro Timer</span>
          <Button variant="link" onClick={switchMode} className="text-xs p-0">
            Switch to {mode === 'work' ? 'Break' : 'Work'}
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col items-center">
          <h3 className={`text-4xl font-mono ${mode === 'work' ? 'text-primary' : 'text-blue-500'}`}>
            {formatTime(timeLeft)}
          </h3>
          <p className="text-muted-foreground text-sm mt-1 capitalize">
            {mode} {isActive ? 'in progress' : 'mode'}
          </p>
        </div>
        
        <Progress value={progress} className={mode === 'work' ? 'bg-primary/20' : 'bg-blue-500/20'} />
        
        <div className="flex justify-center gap-2 mt-2">
          <Button
            onClick={toggleTimer}
            variant="outline"
            size="sm"
            className={isActive ? 'border-red-500 text-red-500' : 'border-green-500 text-green-500'}
          >
            {isActive ? <PauseIcon size={18} /> : <PlayIcon size={18} />}
            <span className="ml-1">{isActive ? 'Pause' : 'Start'}</span>
          </Button>
          
          <Button
            onClick={resetTimer}
            variant="outline"
            size="sm"
            className="border-muted-foreground text-muted-foreground"
          >
            <RotateCcwIcon size={18} />
            <span className="ml-1">Reset</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PomodoroTimer;
