import { useState, useCallback } from 'react';
import { ClanResourcesPanel } from '@/components/ClanResourcesPanel';
import { BossCard } from '@/components/BossCard';
import { AssaultSimulator } from '@/components/AssaultSimulator';
import { Swords, Crown, Target } from 'lucide-react';
import heroImage from '@/assets/mir4-boss-hero.jpg';

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
}

interface AssaultPlan {
  bossId: string;
  bossName: string;
  hasFirstAssault: boolean;
  hasRepeat: boolean;
}

const mockBosses: BossData[] = [
  {
    id: "zorro",
    name: "Zorro",
    level: 35,
    firstCost: { aceroOscuro: 125000, energia: 125000 },
    repeatCost: { oro: 1000 }
  },
  {
    id: "toro",
    name: "Toro",
    level: 50,
    firstCost: { aceroOscuro: 250000, energia: 250000 },
    repeatCost: { oro: 1200 }
  },
  {
    id: "roca",
    name: "Roca",
    level: 65,
    firstCost: { aceroOscuro: 375000, energia: 375000 },
    repeatCost: { oro: 1400 }
  },
  {
    id: "luna",
    name: "Luna",
    level: 80,
    firstCost: { aceroOscuro: 500000, energia: 500000 },
    repeatCost: { oro: 1600 }
  },
  {
    id: "abominacion",
    name: "Abominación",
    level: 95,
    firstCost: { aceroOscuro: 625000, energia: 625000 },
    repeatCost: { oro: 1800 }
  },
  {
    id: "dragon",
    name: "Dragón",
    level: 115,
    firstCost: { aceroOscuro: 750000, energia: 750000 },
    repeatCost: { oro: 2000 }
  },
  {
    id: "flama-azul",
    name: "Flama Azul",
    level: 135,
    firstCost: { aceroOscuro: 875000, energia: 875000 },
    repeatCost: { oro: 2200 }
  },
  {
    id: "escorpion",
    name: "Escorpión",
    level: 150,
    firstCost: { aceroOscuro: 1000000, energia: 1000000 },
    repeatCost: { oro: 2400 }
  },
  {
    id: "cerbero",
    name: "Cerbero",
    level: 165,
    firstCost: { aceroOscuro: 1125000, energia: 1125000 },
    repeatCost: { oro: 2600 }
  },
  {
    id: "oscuranima",
    name: "Oscuránima",
    level: 180,
    firstCost: { aceroOscuro: 1250000, energia: 1250000 },
    repeatCost: { oro: 2800 }
  },
  {
    id: "deidad",
    name: "Deidad",
    level: 195,
    firstCost: { aceroOscuro: 1375000, energia: 1375000 },
    repeatCost: { oro: 3000 }
  }
];

const Index = () => {
  const [resources, setResources] = useState({
    aceroOscuro: 5000000,
    energia: 5000000,
    oro: 10000
  });

  const [initialResources, setInitialResources] = useState({
    aceroOscuro: 5000000,
    energia: 5000000,
    oro: 10000
  });

  const [assaultPlan, setAssaultPlan] = useState<AssaultPlan[]>([]);
  const [repeatedBosses, setRepeatedBosses] = useState<Set<string>>(new Set());

  const handleResourceChange = useCallback((resource: string, value: number) => {
    setResources(prev => ({
      ...prev,
      [resource]: value
    }));
  }, []);

  const handleInitialResource = useCallback((resource: string, value: number) => {
    setInitialResources(prev => ({
      ...prev,
      [resource]: value
    }))
  },[])

  const canAffordFirstAssault = useCallback((boss: BossData) => {
    return resources.aceroOscuro >= boss.firstCost.aceroOscuro &&
      resources.energia >= boss.firstCost.energia;
  }, [resources]);

  const canAffordRepeat = useCallback((boss: BossData) => {
    return resources.oro >= boss.repeatCost.oro &&
      !repeatedBosses.has(boss.id);
  }, [resources, repeatedBosses]);

  const isBossSelected = useCallback((bossId: string) => {
    return assaultPlan.some(plan => plan.bossId === bossId);
  }, [assaultPlan]);

  const handleBossSelect = useCallback((boss: BossData) => {
    if (isBossSelected(boss.id)) {
      // Remove from plan and restore resources
      setAssaultPlan(prev => prev.filter(plan => plan.bossId !== boss.id));
      setResources(prev => ({
        ...prev,
        aceroOscuro: prev.aceroOscuro + boss.firstCost.aceroOscuro,
        energia: prev.energia + boss.firstCost.energia
      }));

      // If boss was repeated, restore oro and remove from repeated set
      const planEntry = assaultPlan.find(plan => plan.bossId === boss.id);
      if (planEntry?.hasRepeat) {
        setResources(prev => ({
          ...prev,
          oro: prev.oro + boss.repeatCost.oro
        }));
        setRepeatedBosses(prev => {
          const newSet = new Set(prev);
          newSet.delete(boss.id);
          return newSet;
        });
      }
    } else if (canAffordFirstAssault(boss)) {
      // Add to plan and deduct resources
      setAssaultPlan(prev => [...prev, {
        bossId: boss.id,
        bossName: boss.name,
        hasFirstAssault: true,
        hasRepeat: false
      }]);
      setResources(prev => ({
        ...prev,
        aceroOscuro: prev.aceroOscuro - boss.firstCost.aceroOscuro,
        energia: prev.energia - boss.firstCost.energia
      }));
    }
  }, [isBossSelected, canAffordFirstAssault, assaultPlan]);

  const handleBossRepeat = useCallback((boss: BossData) => {
    if (!isBossSelected(boss.id) || repeatedBosses.has(boss.id)) return;

    if (canAffordRepeat(boss)) {
      // Update plan to include repeat
      setAssaultPlan(prev => prev.map(plan =>
        plan.bossId === boss.id
          ? { ...plan, hasRepeat: true }
          : plan
      ));

      // Deduct oro and mark as repeated
      setResources(prev => ({
        ...prev,
        oro: prev.oro - boss.repeatCost.oro
      }));

      setRepeatedBosses(prev => new Set(prev).add(boss.id));
    }
  }, [isBossSelected, canAffordRepeat, repeatedBosses]);

  const usedResources = {
    aceroOscuro: initialResources.aceroOscuro - resources.aceroOscuro,
    energia: initialResources.energia - resources.energia,
    oro: initialResources.oro - resources.oro
  };

  return (
    <div className="min-h-screen bg-gradient-dark text-foreground">
      {/* Header */}
      <header className="relative text-center py-12 overflow-hidden">
        {/* Hero Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
          style={{ backgroundImage: `url(${heroImage})` }}
        ></div>

        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-background/50"></div>

        <div className="relative z-10">
          <div className="flex items-center justify-center mb-4">
            <Crown className="h-12 w-12 text-gold mr-4" />
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-gold bg-clip-text text-transparent">
              Bienvenidos al Clan Eztrokes2
            </h1>
            <Crown className="h-12 w-12 text-gold ml-4" />
          </div>
          <div className="flex items-center justify-center">
            <Swords className="h-6 w-6 text-red-accent mr-2" />
            <p className="text-xl text-muted-foreground">
              Panel de control de asaltos y recursos
            </p>
            <Swords className="h-6 w-6 text-red-accent ml-2" />
          </div>
          <div className="w-32 h-1 bg-gradient-gold mx-auto mt-4 rounded-full"></div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 pb-12 overflow-x-hidden">
        <div className="grid gap-6 lg:grid-cols-[320px_1fr_360px] items-start min-w-0">
          {/* Resources Panel */}
          <div className="min-w-0">
            <ClanResourcesPanel
              resources={resources}
              onResourceChange={handleResourceChange}
              onInitialResourceChange={handleInitialResource}
            />
          </div>

          {/* Boss Cards Grid */}
          <div className="min-w-0">
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-primary mb-2 flex items-center justify-center">
                  <Target className="h-6 w-6 mr-2" />
                  Jefes Disponibles
                </h2>
                <div className="w-20 h-1 bg-gradient-red mx-auto rounded-full"></div>
              </div>

              <div className="flex flex-col gap-4 max-h-[calc(100vh-50px)] overflow-y-auto">
                {mockBosses.map(boss => (
                  <div key={boss.id} className="w-full">
                    <BossCard
                      boss={boss}
                      isSelected={isBossSelected(boss.id)}
                      hasBeenRepeated={repeatedBosses.has(boss.id)}
                      canAffordFirst={canAffordFirstAssault(boss)}
                      canAffordRepeat={canAffordRepeat(boss)}
                      onSelect={() => handleBossSelect(boss)}
                      onRepeat={() => handleBossRepeat(boss)}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Assault Simulator */}
          <div className="min-w-0">
            <AssaultSimulator
              assaultPlan={assaultPlan}
              remainingResources={resources}
              initialResources={initialResources}
              usedResources={usedResources}
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 py-8 text-center">
        <div className="flex items-center justify-center text-muted-foreground">
          <Crown className="h-4 w-4 mr-2 text-gold" />
          <p className="text-sm">
            MIR4 Clan Management System - Eztrokes2
          </p>
          <Crown className="h-4 w-4 ml-2 text-gold" />
        </div>
      </footer>
    </div>
  );
};

export default Index;
