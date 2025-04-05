
import { Card, CardContent } from '@/components/ui/card';
import { getDailyQuote } from '@/lib/task-utils';
import { useMemo } from 'react';

const MotivationCard = () => {
  const quote = useMemo(() => getDailyQuote(), []);

  return (
    <Card className="bg-gradient-to-br from-purple-500/20 to-blue-500/20 border-none shadow-md animate-fade-in">
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold mb-2">Daily Inspiration</h3>
        <blockquote className="text-lg italic">
          "{quote.text}"
        </blockquote>
        <p className="text-right mt-2">— {quote.author}</p>
      </CardContent>
    </Card>
  );
};

export default MotivationCard;
