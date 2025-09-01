import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Copy, FileText, Target, Coins, Pickaxe, Zap } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AssaultPlan {
  bossId: string;
  bossName: string;
  hasFirstAssault: boolean;
  hasRepeat: boolean;
}

interface AssaultSimulatorProps {
  assaultPlan: AssaultPlan[];
  remainingResources: {
    aceroOscuro: number;
    energia: number;
    oro: number;
  };
  initialResources: {
    aceroOscuro: number;
    energia: number;
    oro: number;
  };
  usedResources: {
    aceroOscuro: number;
    energia: number;
    oro: number;
  };
}

export const AssaultSimulator = ({
  assaultPlan,
  remainingResources,
  initialResources,
  usedResources
}: AssaultSimulatorProps) => {
  const { toast } = useToast();

  const generatePlanText = () => {
    let planText = "📜 Plan de Asaltos - Clan Eztrokes2\n\n";
    
    if (assaultPlan.length === 0) {
      planText += "🚫 No hay asaltos planificados\n";
    } else {
      assaultPlan.forEach((assault, index) => {
        const repeatText = assault.hasRepeat ? " + repetición (oro gastado)" : " (sin repetición)";
        planText += `${index + 1}. ${assault.bossName}: 1 asalto${repeatText}\n`;
      });
    }

    planText += `\n📊 Recursos utilizados:\n`;
    planText += `⚔️ Acero oscuro: ${usedResources.aceroOscuro}\n`;
    planText += `⚡ Energía: ${usedResources.energia}\n`;
    planText += `🪙 Oro: ${usedResources.oro}\n`;

    planText += `\n📦 Recursos restantes:\n`;
    planText += `⚔️ Acero oscuro: ${remainingResources.aceroOscuro}\n`;
    planText += `⚡ Energía: ${remainingResources.energia}\n`;
    planText += `🪙 Oro: ${remainingResources.oro}\n`;

    return planText;
  };

  const exportPlan = async () => {
    const planText = generatePlanText();
    
    try {
      await navigator.clipboard.writeText(planText);
      toast({
        title: "¡Plan exportado!",
        description: "El plan de asaltos ha sido copiado al portapapeles",
      });
    } catch (err) {
      toast({
        title: "Error al exportar",
        description: "No se pudo copiar al portapapeles",
        variant: "destructive"
      });
    }
  };

  const getResourcePercentage = (used: number, total: number) => {
    return total > 0 ? (used / total) * 100 : 0;
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-primary mb-2">Simulador de Asaltos</h2>
        <div className="w-20 h-1 bg-gradient-red mx-auto rounded-full"></div>
      </div>

      {/* Resource Usage Visualization */}
      <div className="gaming-card p-6 space-y-4">
        <h3 className="text-lg font-semibold text-card-foreground flex items-center">
          <Target className="h-5 w-5 mr-2 text-gold" />
          Uso de Recursos
        </h3>

        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <Pickaxe className="h-4 w-4 text-steel" />
                <span className="text-sm font-medium">Acero Oscuro</span>
              </div>
              <span className="text-sm text-muted-foreground">
                {usedResources.aceroOscuro}/{initialResources.aceroOscuro}
              </span>
            </div>
            <Progress 
              value={getResourcePercentage(usedResources.aceroOscuro, initialResources.aceroOscuro)} 
              className="h-2"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <Zap className="h-4 w-4 text-energy" />
                <span className="text-sm font-medium">Energía</span>
              </div>
              <span className="text-sm text-muted-foreground">
                {usedResources.energia}/{initialResources.energia}
              </span>
            </div>
            <Progress 
              value={getResourcePercentage(usedResources.energia, initialResources.energia)} 
              className="h-2"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <Coins className="h-4 w-4 text-gold" />
                <span className="text-sm font-medium">Oro</span>
              </div>
              <span className="text-sm text-muted-foreground">
                {usedResources.oro}/{initialResources.oro}
              </span>
            </div>
            <Progress 
              value={getResourcePercentage(usedResources.oro, initialResources.oro)} 
              className="h-2"
            />
          </div>
        </div>
      </div>

      {/* Assault Plan Summary */}
      <div className="gaming-card p-6">
        <h3 className="text-lg font-semibold text-card-foreground mb-4 flex items-center">
          <FileText className="h-5 w-5 mr-2 text-gold" />
          Plan de Asaltos
        </h3>

        <ScrollArea className="h-40 w-full">
          {assaultPlan.length === 0 ? (
            <div className="text-center text-muted-foreground py-8">
              <Target className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p>No hay asaltos planificados</p>
            </div>
          ) : (
            <div className="space-y-2">
              {assaultPlan.map((assault, index) => (
                <div key={assault.bossId} className="flex items-center justify-between p-2 bg-secondary/50 rounded">
                  <span className="text-sm font-medium">{index + 1}. {assault.bossName}</span>
                  <div className="flex space-x-1">
                    <Badge variant="outline">Asalto</Badge>
                    {assault.hasRepeat && (
                      <Badge variant="default" className="bg-gradient-gold text-primary-foreground">
                        +Repetición
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>

        <Button
          onClick={exportPlan}
          className="w-full mt-4 bg-gradient-gold text-primary-foreground hover:opacity-90"
          disabled={assaultPlan.length === 0}
        >
          <Copy className="h-4 w-4 mr-2" />
          Exportar Plan
        </Button>
      </div>
    </div>
  );
};