import { useTasks } from '@/contexts/TaskContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, LineChart, Line } from 'recharts';
import { format, subDays } from 'date-fns';
import { ArrowUp, CheckCircle, Clock } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import Layout from '@/components/Layout';

const StatisticsPage = () => {
  const { tasks, stats } = useTasks();

  const generateHistoricalData = () => {
    return Array.from({ length: 7 }).map((_, index) => {
      const date = subDays(new Date(), 6 - index);
      return {
        date: format(date, 'EEE'),
        completed: Math.floor(Math.random() * 6) + 1,
        created: Math.floor(Math.random() * 4) + 2,
      };
    });
  };

  const tasksByPriority = [
    { name: 'High', value: tasks.filter(t => t.priority === 'high' && t.completed).length },
    { name: 'Medium', value: tasks.filter(t => t.priority === 'medium' && t.completed).length },
    { name: 'Low', value: tasks.filter(t => t.priority === 'low' && t.completed).length },
  ];

  const historicalData = generateHistoricalData();
  const completionRate = stats.totalTasks > 0 ? Math.round((stats.tasksCompleted / stats.totalTasks) * 100) : 0;

  return (
    <Layout>
      <div className="animate-fade-in">
        <h1 className="text-2xl font-bold gradient-text mb-6">Productivity Insights</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card className="glass-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">Task Completion Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">{completionRate}%</div>
                <div className="p-2 bg-green-500/10 rounded-full">
                  <CheckCircle className="h-6 w-6 text-green-500" />
                </div>
              </div>
              <Progress value={completionRate} className="mt-4 h-2" />
            </CardContent>
          </Card>
          
          <Card className="glass-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">Daily Streak</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">7 days</div>
                <div className="p-2 bg-primary/10 rounded-full">
                  <ArrowUp className="h-6 w-6 text-primary" />
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-4">You've completed tasks for 7 consecutive days!</p>
            </CardContent>
          </Card>
          
          <Card className="glass-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">Focus Time</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">4h 25m</div>
                <div className="p-2 bg-blue-500/10 rounded-full">
                  <Clock className="h-6 w-6 text-blue-500" />
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-4">Total focus time this week</p>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-lg">Tasks Completed vs Created</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={historicalData}>
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="completed" stroke="hsl(var(--primary))" strokeWidth={2} />
                    <Line type="monotone" dataKey="created" stroke="hsl(var(--secondary))" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-lg">Completion by Priority</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={tasksByPriority}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default StatisticsPage;
