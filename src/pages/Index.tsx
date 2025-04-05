
import AddTaskForm from '@/components/AddTaskForm';
import TaskList from '@/components/TaskList';
import MoodSelector from '@/components/MoodSelector';
import TaskSuggestions from '@/components/TaskSuggestions';
import MotivationCard from '@/components/MotivationCard';
import PomodoroTimer from '@/components/PomodoroTimer';
import ProductivityTips from '@/components/ProductivityTips';
import StatsCard from '@/components/StatsCard';
import Layout from '@/components/Layout';

const Index = () => {
  return (
    <Layout>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Task Section */}
        <div className="lg:col-span-2 space-y-6 animate-slide-in-right">
          <AddTaskForm />
          <TaskList />
        </div>
        
        {/* Sidebar */}
        <div className="space-y-6 animate-fade-in">
          <MoodSelector />
          <TaskSuggestions />
          <PomodoroTimer />
          <MotivationCard />
          <ProductivityTips />
          <StatsCard />
        </div>
      </div>
    </Layout>
  );
};

export default Index;
