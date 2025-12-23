import { Button } from '@/core/components/button';
import { useNavigation } from '@/core/hooks/useNavigation';
import { Settings } from 'lucide-react';

function HomePage() {
  const { navigate } = useNavigation();

  return (
    <div className="flex flex-col items-center justify-center space-y-6 py-12 text-center">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tight">Timer Pomodoro</h1>
        <p className="text-muted-foreground text-lg">
          Técnica de produtividade para otimizar seus estudos
        </p>
      </div>
      <Button size="lg" onClick={() => navigate('/config')}>
        <Settings />
        Configurar Timer
      </Button>
    </div>
  );
}

export { HomePage };
