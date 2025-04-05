import { useState, useEffect } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  MoonIcon, 
  SunIcon, 
  Palette, 
  BellIcon, 
  VolumeIcon, 
  SaveIcon, 
  RefreshCw, 
  User,
  Settings,
  Languages,
  CloudIcon
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Layout from '@/components/Layout';

const SettingsPage = () => {
  const { theme, toggleTheme } = useTheme();
  const { toast } = useToast();
  
  const [settings, setSettings] = useState({
    notifications: true,
    soundEffects: true,
    autosave: true,
    language: 'english',
    accentColor: 'purple',
    profileName: 'User'
  });
  
  useEffect(() => {
    const savedSettings = localStorage.getItem('taskflow-settings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);
  
  const handleSettingChange = (key: string, value: any) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    localStorage.setItem('taskflow-settings', JSON.stringify(newSettings));
  };
  
  const resetSettings = () => {
    const defaultSettings = {
      notifications: true,
      soundEffects: true,
      autosave: true,
      language: 'english',
      accentColor: 'purple',
      profileName: 'User'
    };
    setSettings(defaultSettings);
    localStorage.setItem('taskflow-settings', JSON.stringify(defaultSettings));
    
    toast({
      title: "Settings Reset",
      description: "All settings have been reset to default values."
    });
  };
  
  const saveSettings = () => {
    localStorage.setItem('taskflow-settings', JSON.stringify(settings));
    toast({
      title: "Settings Saved",
      description: "Your preferences have been saved successfully."
    });
  };
  
  return (
    <Layout>
      <div className="animate-fade-in">
        <h1 className="text-2xl font-bold gradient-text mb-6">Settings</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5" />
                Appearance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="theme-toggle" className="font-medium">Dark Mode</Label>
                  <p className="text-sm text-muted-foreground">Toggle between light and dark theme</p>
                </div>
                <div className="flex items-center gap-2">
                  <SunIcon size={16} className={theme === 'light' ? 'text-yellow-400' : 'text-muted-foreground'} />
                  <Switch 
                    id="theme-toggle"
                    checked={theme === 'dark'}
                    onCheckedChange={toggleTheme}
                  />
                  <MoonIcon size={16} className={theme === 'dark' ? 'text-primary' : 'text-muted-foreground'} />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="accent-color">Accent Color</Label>
                <Select 
                  value={settings.accentColor} 
                  onValueChange={(value) => handleSettingChange('accentColor', value)}
                >
                  <SelectTrigger id="accent-color" className="w-full">
                    <SelectValue placeholder="Select accent color" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="purple">Purple</SelectItem>
                    <SelectItem value="blue">Blue</SelectItem>
                    <SelectItem value="green">Green</SelectItem>
                    <SelectItem value="pink">Pink</SelectItem>
                    <SelectItem value="orange">Orange</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
          
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BellIcon className="h-5 w-5" />
                Notifications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="notifications-toggle" className="font-medium">Enable Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive alerts for upcoming tasks</p>
                </div>
                <Switch 
                  id="notifications-toggle"
                  checked={settings.notifications}
                  onCheckedChange={(checked) => handleSettingChange('notifications', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="sound-toggle" className="font-medium">Sound Effects</Label>
                  <p className="text-sm text-muted-foreground">Play sounds for actions</p>
                </div>
                <Switch 
                  id="sound-toggle"
                  checked={settings.soundEffects}
                  onCheckedChange={(checked) => handleSettingChange('soundEffects', checked)}
                />
              </div>
            </CardContent>
          </Card>
          
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Profile
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="profile-name">Display Name</Label>
                <input
                  id="profile-name"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={settings.profileName}
                  onChange={(e) => handleSettingChange('profileName', e.target.value)}
                />
              </div>
            </CardContent>
          </Card>
          
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="autosave-toggle" className="font-medium">Autosave</Label>
                  <p className="text-sm text-muted-foreground">Automatically save changes</p>
                </div>
                <Switch 
                  id="autosave-toggle"
                  checked={settings.autosave}
                  onCheckedChange={(checked) => handleSettingChange('autosave', checked)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="language">Language</Label>
                <Select 
                  value={settings.language} 
                  onValueChange={(value) => handleSettingChange('language', value)}
                >
                  <SelectTrigger id="language" className="w-full">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="english">English</SelectItem>
                    <SelectItem value="spanish">Spanish</SelectItem>
                    <SelectItem value="french">French</SelectItem>
                    <SelectItem value="german">German</SelectItem>
                    <SelectItem value="japanese">Japanese</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="mt-6 flex justify-between">
          <Button variant="outline" onClick={resetSettings} className="flex gap-2">
            <RefreshCw className="h-4 w-4" /> Reset Defaults
          </Button>
          <Button onClick={saveSettings} className="flex gap-2 neon-glow">
            <SaveIcon className="h-4 w-4" /> Save Settings
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default SettingsPage;
