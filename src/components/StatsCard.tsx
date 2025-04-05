
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useTasks } from '@/contexts/TaskContext';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';

const StatsCard = () => {
  const { tasks, stats } = useTasks();
  
  // Mock data for completed tasks by day
  // In a real app, this would analyze actual completion dates
  const completionData = [
    { name: 'Mon', completed: 5 },
    { name: 'Tue', completed: 3 },
    { name: 'Wed', completed: 7 },
    { name: 'Thu', completed: 4 },
    { name: 'Fri', completed: 6 },
    { name: 'Sat', completed: 2 },
    { name: 'Sun', completed: 1 },
  ];

  // Calculate completion rate
  const completionRate = stats.totalTasks > 0
    ? Math.round((stats.tasksCompleted / stats.totalTasks) * 100)
    : 0;

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Productivity Insights</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="text-center">
            <p className="text-2xl font-bold">{stats.tasksCompleted}</p>
            <p className="text-xs text-muted-foreground">Completed</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold">{completionRate}%</p>
            <p className="text-xs text-muted-foreground">Completion</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold">{stats.points}</p>
            <p className="text-xs text-muted-foreground">Points</p>
          </div>
        </div>
        
        <div className="h-40">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={completionData}>
              <XAxis 
                dataKey="name" 
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={false}
              />
              <YAxis 
                tick={{ fontSize: 12 }} 
                tickLine={false}
                axisLine={false}
                width={30}
              />
              <Tooltip />
              <Bar 
                dataKey="completed" 
                fill="hsl(var(--primary))" 
                radius={[4, 4, 0, 0]} 
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatsCard;
