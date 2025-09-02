import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sword, Crown, Repeat, Pickaxe, Zap, Coins } from 'lucide-react';

interface BossData {
  id: string;
  name: string;
  level: number;
  firstCost: {
    aceroOscuro: number;
    energia: number;
  };
  repeatCost: {
    oro: number;
  };
  image?: string;
}

interface BossCardProps {
  boss: BossData;
  isSelected: boolean;
  hasBeenRepeated: boolean;
  canAffordFirst: boolean;
  canAffordRepeat: boolean;
  onSelect: () => void;
  onRepeat: () => void;
}

export const BossCard = ({
  boss,
  isSelected,
  hasBeenRepeated,
  canAffordFirst,
  canAffordRepeat,
  onSelect,
  onRepeat
}: BossCardProps) => {
  return (
    <div className={`boss-card ${isSelected ? 'selected' : ''}`}>
      {/* Boss Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <Crown className="h-6 w-6 text-gold" />
          <div>
            <h3 className="text-lg font-bold text-card-foreground">{boss.name}</h3>
            <Badge variant="secondary" className="text-xs">
              Nivel {boss.level}
            </Badge>
          </div>
        </div>
        <Sword className="h-8 w-8 text-red-accent" />
      </div>

      {/* Boss Image Placeholder */}
      <div className="w-full h-32 bg-muted rounded-lg mb-4 flex items-center justify-center">
        <Crown className="h-16 w-16 text-gold opacity-50" />
      </div>

      {/* Cost Information */}
      <div className="space-y-3 mb-4">
        <div className="bg-secondary/50 rounded-lg p-3">
          <h4 className="text-sm font-semibold text-secondary-foreground mb-2 flex items-center">
            <Sword className="h-4 w-4 mr-1" />
            Primer Asalto
          </h4>
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center space-x-1">
              <Pickaxe className="h-4 w-4 text-steel" />
              <span>{boss.firstCost.aceroOscuro}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Zap className="h-4 w-4 text-energy" />
              <span>{boss.firstCost.energia}</span>
            </div>
          </div>
        </div>

        <div className="bg-accent/20 rounded-lg p-3">
          <h4 className="text-sm font-semibold text-accent-foreground mb-2 flex items-center">
            <Repeat className="h-4 w-4 mr-1" />
            Repetición
          </h4>
          <div className="flex items-center space-x-1 text-sm">
            <Coins className="h-4 w-4 text-gold" />
            <span>{boss.repeatCost.oro}</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-2">
        <Button
          onClick={onSelect}
          disabled={!canAffordFirst}
          className={`w-full ${
            isSelected ? 'bg-gradient-gold text-primary-foreground' : ''
          }`}
          variant={isSelected ? "default" : "outline"}
        >
          {isSelected ? "Seleccionado" : "Seleccionar Asalto"}
        </Button>

        <Button
          onClick={onRepeat}
          disabled={!canAffordRepeat || hasBeenRepeated || !isSelected}
          variant="outline"
          className="w-full border-accent text-accent hover:bg-accent/20"
        >
          {hasBeenRepeated ? "Ya Repetido" : "Repetir (Oro)"}
        </Button>
      </div>

      {/* Status Indicators */}
      {isSelected && (
        <div className="mt-3 text-center">
          <Badge className="bg-gradient-gold text-primary-foreground">
            ✓ En Plan de Asalto
          </Badge>
        </div>
      )}
    </div>
  );
};