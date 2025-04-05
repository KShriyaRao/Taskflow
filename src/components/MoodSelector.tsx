
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useTasks } from '@/contexts/TaskContext';
import { MoodType } from '@/types';
import { SmileIcon, BrainIcon, BatteryLowIcon, SparklesIcon, MehIcon } from 'lucide-react';

const MoodSelector = () => {
  const { setMood, mood: selectedMood } = useTasks();
  
  const moods: { type: MoodType; label: string; icon: React.ReactNode }[] = [
    { type: 'energetic', label: 'Energetic', icon: <SmileIcon size={20} /> },
    { type: 'focused', label: 'Focused', icon: <BrainIcon size={20} /> },
    { type: 'tired', label: 'Tired', icon: <BatteryLowIcon size={20} /> },
    { type: 'creative', label: 'Creative', icon: <SparklesIcon size={20} /> },
    { type: 'distracted', label: 'Distracted', icon: <MehIcon size={20} /> },
  ];

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">How are you feeling today?</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {moods.map((mood) => (
            <Button
              key={mood.type}
              variant={selectedMood === mood.type ? "default" : "outline"}
              size="sm"
              className="flex items-center gap-2"
              onClick={() => setMood(mood.type)}
            >
              {mood.icon}
              {mood.label}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default MoodSelector;
