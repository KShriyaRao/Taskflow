
import { ReactNode, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import { 
  SidebarProvider, 
  Sidebar, 
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarHeader
} from '@/components/ui/sidebar';
import { 
  CheckSquare, 
  BarChart3, 
  Settings, 
  Music,
  Coffee,
  PanelLeft
} from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [musicEnabled, setMusicEnabled] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleMusic = () => {
    setMusicEnabled(!musicEnabled);
    // Music functionality would be implemented here
  };

  // Define navigation items
  const navigationItems = [
    {
      name: 'Tasks',
      icon: CheckSquare,
      path: '/',
      tooltip: 'Tasks'
    },
    {
      name: 'Statistics',
      icon: BarChart3, 
      path: '/statistics',
      tooltip: 'Statistics'
    },
    {
      name: 'Focus Mode',
      icon: Coffee,
      path: '/focus',
      tooltip: 'Focus Mode'
    },
    {
      name: 'Settings',
      icon: Settings,
      path: '/settings',
      tooltip: 'Settings'
    }
  ];

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <Sidebar variant="inset" side="left">
          <SidebarHeader className="flex items-center justify-center p-4">
            <h2 className="text-xl font-bold gradient-text">TaskFlow</h2>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton 
                    className="w-full" 
                    tooltip={item.tooltip}
                    isActive={location.pathname === item.path}
                    onClick={() => navigate(item.path)}
                  >
                    <item.icon className={location.pathname === item.path ? "text-primary" : "text-muted-foreground"} />
                    <span>{item.name}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              <SidebarMenuItem>
                <SidebarMenuButton 
                  className={`w-full ${musicEnabled ? 'text-green-400' : ''}`} 
                  tooltip="Toggle Music"
                  onClick={toggleMusic}
                >
                  <Music className={musicEnabled ? 'text-green-400' : 'text-muted-foreground'} />
                  <span>{musicEnabled ? 'Music On' : 'Music Off'}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>

        <SidebarInset className="bg-background">
          <Header />
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <main className="container py-6 px-4 max-w-6xl mx-auto">
                {children}
              </main>
            </motion.div>
          </AnimatePresence>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default Layout;
