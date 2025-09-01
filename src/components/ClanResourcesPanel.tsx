import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Pickaxe, Zap, Coins } from 'lucide-react';

interface ClanResourcesPanelProps {
  resources: {
    aceroOscuro: number;
    energia: number;
    oro: number;
  };
  onResourceChange: (resource: string, value: number) => void;
}

export const ClanResourcesPanel = ({ resources, onResourceChange }: ClanResourcesPanelProps) => {
  const resourceItems = [
    {
      key: 'aceroOscuro',
      label: 'Acero Oscuro',
      value: resources.aceroOscuro,
      icon: Pickaxe,
      color: 'text-steel'
    },
    {
      key: 'energia', 
      label: 'Energía',
      value: resources.energia,
      icon: Zap,
      color: 'text-energy'
    },
    {
      key: 'oro',
      label: 'Oro',
      value: resources.oro,
      icon: Coins,
      color: 'text-gold'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-primary mb-2">Recursos del Clan</h2>
        <div className="w-20 h-1 bg-gradient-gold mx-auto rounded-full"></div>
      </div>
      
      <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-3">
        {resourceItems.map((item) => {
          const IconComponent = item.icon;
          return (
            <div key={item.key} className="resource-card">
              <div className="flex items-center space-x-3 mb-4">
                <IconComponent className={`h-8 w-8 ${item.color}`} />
                <Label className="text-lg font-semibold text-card-foreground">
                  {item.label}
                </Label>
              </div>
              
              <Input
                type="number"
                value={item.value}
                onChange={(e) => onResourceChange(item.key, parseInt(e.target.value) || 0)}
                className="text-center text-xl font-bold bg-input border-border focus:border-primary transition-colors"
                min="0"
              />
              
              <div className="mt-2 text-center">
                <span className="text-sm text-muted-foreground">Disponible</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};