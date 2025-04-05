
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RefreshCwIcon, Lightbulb } from 'lucide-react';
import { getProductivityTip } from '@/lib/task-utils';

const ProductivityTips = () => {
  const [tip, setTip] = useState(getProductivityTip());
  const [isAnimating, setIsAnimating] = useState(false);

  const refreshTip = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setTip(getProductivityTip());
      setIsAnimating(false);
    }, 300);
  };

  return (
    <Card className="glass-card gradient-bg overflow-hidden">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className="bg-primary/20 rounded-full p-2 mt-1 neon-glow">
            <Lightbulb size={18} className="text-primary" />
          </div>
          <div className="flex-1">
            <p className={`text-sm transition-opacity duration-300 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
              {tip}
            </p>
            <Button
              variant="ghost"
              size="sm"
              className="mt-2 text-xs btn-glow group"
              onClick={refreshTip}
            >
              <RefreshCwIcon size={14} className="mr-1 group-hover:rotate-180 transition-transform duration-500" />
              New Tip
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductivityTips;
