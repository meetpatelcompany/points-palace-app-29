
import { Outlet } from "react-router-dom";
import { Link, useLocation } from "react-router-dom";
import { Home, CreditCard, User, Wifi } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const CustomerLayout = () => {
  const location = useLocation();
  const { toast } = useToast();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  const handleAccountClick = () => {
    toast({
      title: "Account",
      description: "Account settings will be available in a future update.",
    });
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="h-16 flex items-center justify-between px-6 border-b border-border bg-white/95 backdrop-blur-sm">
        <div className="flex items-center">
          <h1 className="text-xl font-semibold text-primary">Loyalty App</h1>
          <div className="ml-2 flex items-center text-xs text-primary/70">
            <Wifi className="h-3 w-3 mr-1 animate-pulse" />
            <span>Live</span>
          </div>
        </div>
        <Button variant="ghost" size="icon" onClick={handleAccountClick}>
          <Avatar className="h-8 w-8">
            <AvatarImage src="" alt="User" />
            <AvatarFallback className="bg-primary/10 text-primary text-xs">JD</AvatarFallback>
          </Avatar>
        </Button>
      </header>
      
      {/* Page Content */}
      <main className="flex-1 overflow-auto px-4 py-4 md:px-6">
        <Outlet />
      </main>
      
      {/* Bottom Navigation */}
      <nav className="h-16 grid grid-cols-2 border-t border-border bg-background">
        <Link
          to="/customer/home"
          className={`flex flex-col items-center justify-center transition-colors ${
            isActive("/customer/home") || isActive("/customer")
              ? "text-primary"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Home className="h-5 w-5" />
          <span className="text-xs mt-1">Home</span>
        </Link>
        <Link
          to="/customer/cards"
          className={`flex flex-col items-center justify-center transition-colors ${
            isActive("/customer/cards") || location.pathname.startsWith("/customer/cards/")
              ? "text-primary"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <CreditCard className="h-5 w-5" />
          <span className="text-xs mt-1">My Cards</span>
        </Link>
      </nav>
    </div>
  );
};

export default CustomerLayout;
