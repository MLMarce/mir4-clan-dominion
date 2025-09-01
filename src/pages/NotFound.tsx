import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Home, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gradient-dark text-foreground flex items-center justify-center">
      <div className="text-center max-w-md mx-auto px-4">
        <div className="mb-8">
          <Crown className="h-20 w-20 text-gold mx-auto mb-4" />
          <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
          <h2 className="text-2xl font-bold text-card-foreground mb-4">
            Página no encontrada
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Esta página no existe en nuestro reino. Regresa al clan principal.
          </p>
        </div>
        
        <Button asChild className="bg-gradient-gold text-primary-foreground hover:opacity-90">
          <Link to="/" className="flex items-center">
            <Home className="h-4 w-4 mr-2" />
            Volver al Clan
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
