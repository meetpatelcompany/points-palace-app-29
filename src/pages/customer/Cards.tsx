import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Store, ArrowRight } from "lucide-react";
import { useRealTimeUpdates } from "@/hooks/useRealTimeUpdates";
import { useToast } from "@/hooks/use-toast";

// Sample data
const initialLoyaltyCards = [
  {
    id: 1,
    name: "Gourmet Bistro",
    image: "https://images.unsplash.com/photo-1599458252573-56ae36120de1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "Fine Dining",
    points: 750,
    redemptionThreshold: 1000,
  },
  {
    id: 2,
    name: "Pizza Palace",
    image: "https://images.unsplash.com/photo-1528137871618-79d2761e3fd5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "Italian",
    points: 250,
    redemptionThreshold: 500,
  },
  {
    id: 3,
    name: "Sushi Heaven",
    image: "https://images.unsplash.com/photo-1617196034183-421b4917c92d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "Japanese",
    points: 500,
    redemptionThreshold: 800,
  },
  {
    id: 4,
    name: "Burger Joint",
    image: "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "American",
    points: 350,
    redemptionThreshold: 500,
  },
  {
    id: 5,
    name: "Taco Time",
    image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "Mexican",
    points: 450,
    redemptionThreshold: 600,
  },
  {
    id: 6,
    name: "Thai Spice",
    image: "https://images.unsplash.com/photo-1569562211093-4ed0d0758f10?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "Thai",
    points: 300,
    redemptionThreshold: 750,
  },
];

const CustomerCards = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});
  const { toast } = useToast();
  
  // Use our custom hook for real-time updates
  const { cards: loyaltyCards, updatedCardId } = useRealTimeUpdates(initialLoyaltyCards);
  
  const handleImageLoad = (imageUrl: string) => {
    setLoadedImages((prev) => ({
      ...prev,
      [imageUrl]: true,
    }));
  };
  
  const filteredCards = loyaltyCards.filter((card) =>
    card.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    card.category.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Show a toast notification when points are updated
  useEffect(() => {
    if (updatedCardId !== null) {
      const updatedCard = loyaltyCards.find(card => card.id === updatedCardId);
      if (updatedCard) {
        toast({
          title: "Points Updated!",
          description: `You've earned new points at ${updatedCard.name}!`,
          duration: 3000,
        });
      }
    }
  }, [updatedCardId, loyaltyCards, toast]);
  
  return (
    <div className="space-y-6 pb-16 animate-fade-in">
      <div>
        <h2 className="text-xl font-semibold mb-1">My Loyalty Cards</h2>
        <p className="text-sm text-muted-foreground mb-4">
          View and manage your points across all restaurants
        </p>
        
        <div className="relative mb-6">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search restaurants..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      {filteredCards.length === 0 ? (
        <div className="text-center py-12">
          <Store className="h-12 w-12 mx-auto mb-4 text-muted-foreground/40" />
          <h3 className="font-medium mb-1">No cards found</h3>
          <p className="text-sm text-muted-foreground">
            Try adjusting your search or visit a restaurant to earn points
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredCards.map((card) => (
            <Link key={card.id} to={`/customer/cards/${card.id}`}>
              <Card className={`overflow-hidden transition-all duration-200 hover:shadow-md ${updatedCardId === card.id ? 'ring-2 ring-primary animate-pulse-gentle' : ''}`}>
                <CardContent className="p-0">
                  <div className="flex">
                    <div className="relative w-24 h-24 bg-muted">
                      <div
                        className={`absolute inset-0 bg-muted animate-pulse-gentle ${
                          loadedImages[card.image] ? "opacity-0" : "opacity-100"
                        } transition-opacity duration-300`}
                      ></div>
                      <img
                        src={card.image}
                        alt={card.name}
                        className={`w-full h-full object-cover ${
                          loadedImages[card.image] ? "opacity-100" : "opacity-0"
                        } transition-opacity duration-500`}
                        onLoad={() => handleImageLoad(card.image)}
                      />
                    </div>
                    
                    <div className="flex-1 p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{card.name}</h3>
                          <p className="text-xs text-muted-foreground">
                            {card.category}
                          </p>
                        </div>
                        <ArrowRight className="h-4 w-4 text-muted-foreground" />
                      </div>
                      
                      <div className="mt-2">
                        <div className="flex justify-between text-sm mb-1">
                          <span>Progress</span>
                          <span className={`font-medium ${updatedCardId === card.id ? 'text-primary' : ''}`}>
                            {card.points} / {card.redemptionThreshold}
                          </span>
                        </div>
                        <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary transition-all duration-500 ease-out"
                            style={{
                              width: `${Math.min(
                                (card.points / card.redemptionThreshold) * 100,
                                100
                              )}%`,
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
      
      {filteredCards.length > 0 && filteredCards.length < loyaltyCards.length && (
        <div className="text-center pt-4">
          <Button variant="ghost" onClick={() => setSearchQuery("")}>
            Show all cards
          </Button>
        </div>
      )}
    </div>
  );
};

export default CustomerCards;
