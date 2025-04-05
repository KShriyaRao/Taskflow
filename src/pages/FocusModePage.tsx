import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Play, Pause, SkipForward, Music, Volume2, Clock, CheckCircle } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Layout from '@/components/Layout';

const FocusModePage = () => {
  const [isActive, setIsActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [musicEnabled, setMusicEnabled] = useState(false);
  const [volume, setVolume] = useState([50]);
  const [selectedSoundscape, setSelectedSoundscape] = useState("forest");
  const intervalRef = useRef<number | null>(null);
  
  const soundscapes = [
    { value: "forest", label: "Forest Ambience" },
    { value: "rain", label: "Rain Sounds" },
    { value: "cafe", label: "Cafe Background" },
    { value: "lofi", label: "Lo-Fi Beats" },
    { value: "whitenoise", label: "White Noise" },
  ];
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  useEffect(() => {
    if (isActive) {
      intervalRef.current = window.setInterval(() => {
        setTimeLeft(prevTime => {
          if (prevTime <= 1) {
            clearInterval(intervalRef.current!);
            setIsActive(false);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isActive]);
  
  const toggleTimer = () => {
    setIsActive(!isActive);
  };
  
  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(25 * 60);
  };
  
  const toggleMusic = () => {
    setMusicEnabled(!musicEnabled);
  };

  return (
    <Layout>
      <div className="animate-fade-in">
        <h1 className="text-2xl font-bold gradient-text mb-6">Focus Mode</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Pomodoro Timer
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center py-8">
              <div className="text-6xl font-bold mb-8 gradient-text">
                {formatTime(timeLeft)}
              </div>
              
              <div className="flex gap-4">
                <Button 
                  size="lg"
                  onClick={toggleTimer}
                  className="neon-glow"
                >
                  {isActive ? <Pause /> : <Play />}
                  {isActive ? "Pause" : "Start"}
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={resetTimer}
                >
                  <SkipForward />
                  Reset
                </Button>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t pt-4">
              <div className="text-sm text-muted-foreground">
                25 min focus, 5 min break
              </div>
              <Button variant="ghost" size="sm">
                Customize
              </Button>
            </CardFooter>
          </Card>
          
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Music className="h-5 w-5" />
                Focus Sounds
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <Label htmlFor="music-toggle">Enable Background Sounds</Label>
                  <Switch 
                    id="music-toggle"
                    checked={musicEnabled}
                    onCheckedChange={toggleMusic}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="soundscape">Sound Environment</Label>
                  <Select 
                    value={selectedSoundscape} 
                    onValueChange={setSelectedSoundscape}
                    disabled={!musicEnabled}
                  >
                    <SelectTrigger id="soundscape" className="w-full">
                      <SelectValue placeholder="Select environment" />
                    </SelectTrigger>
                    <SelectContent>
                      {soundscapes.map(sound => (
                        <SelectItem key={sound.value} value={sound.value}>
                          {sound.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="volume">Volume</Label>
                    <div className="flex items-center gap-2">
                      <Volume2 className="h-4 w-4" />
                      <span className="text-sm">{volume}%</span>
                    </div>
                  </div>
                  <Slider
                    id="volume"
                    value={volume}
                    max={100}
                    step={1}
                    disabled={!musicEnabled} 
                    onValueChange={setVolume}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t pt-4">
              <p className="text-sm text-muted-foreground">
                Background sounds can help you focus and be more productive.
              </p>
            </CardFooter>
          </Card>
        </div>
        
        <div className="mt-6">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Focus Tips</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm">
                  <div className="bg-primary/20 rounded-full p-1 mt-0.5">
                    <CheckCircle size={14} className="text-primary" />
                  </div>
                  Break down large tasks into smaller, manageable chunks
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <div className="bg-primary/20 rounded-full p-1 mt-0.5">
                    <CheckCircle size={14} className="text-primary" />
                  </div>
                  Use the Pomodoro technique: focus for 25 minutes, then take a 5-minute break
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <div className="bg-primary/20 rounded-full p-1 mt-0.5">
                    <CheckCircle size={14} className="text-primary" />
                  </div>
                  Stay hydrated and take short movement breaks between focus sessions
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <div className="bg-primary/20 rounded-full p-1 mt-0.5">
                    <CheckCircle size={14} className="text-primary" />
                  </div>
                  Remove distractions by putting your phone on silent mode
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default FocusModePage;
