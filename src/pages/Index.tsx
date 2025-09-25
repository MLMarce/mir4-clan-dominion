
import { Swords, Crown} from 'lucide-react';
import heroImage from '@/assets/mir4-boss-hero.jpg';
import ClanResourcesSection from '@/components/ClanResourcesSection';


const Index = () => {
  

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
      <ClanResourcesSection clan='Clan Principal'/>
      <ClanResourcesSection clan='Crypto LA'/>
      <ClanResourcesSection clan='Red Fear'/>
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
