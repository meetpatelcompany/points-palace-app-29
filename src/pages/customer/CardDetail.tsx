
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { QrCode, ArrowLeft, Star, Gift, Calendar, Clock, Info } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Sample data
const loyaltyCards = [
  {
    id: 1,
    name: "Gourmet Bistro",
    logo: "https://images.unsplash.com/photo-1599458252573-56ae36120de1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "Fine Dining",
    points: 750,
    redemptionThreshold: 1000,
    rewards: [
      { points: 250, description: "Free Appetizer" },
      { points: 500, description: "Free Dessert" },
      { points: 1000, description: "Free Entrée (Up to $25)" },
    ],
    history: [
      { date: "Jun 12, 2023", points: 50, type: "earned", description: "Dinner visit" },
      { date: "May 28, 2023", points: 100, type: "earned", description: "Special event" },
      { date: "May 15, 2023", points: -250, type: "redeemed", description: "Free appetizer" },
      { date: "May 3, 2023", points: 50, type: "earned", description: "Lunch visit" },
    ],
  },
  {
    id: 2,
    name: "Pizza Palace",
    logo: "https://images.unsplash.com/photo-1528137871618-79d2761e3fd5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "Italian",
    points: 250,
    redemptionThreshold: 500,
    rewards: [
      { points: 200, description: "Free Side" },
      { points: 350, description: "Free Medium Pizza" },
      { points: 500, description: "Free Large Pizza with 2 Toppings" },
    ],
    history: [
      { date: "Jun 18, 2023", points: 25, type: "earned", description: "Order" },
      { date: "Jun 4, 2023", points: 25, type: "earned", description: "Order" },
      { date: "May 22, 2023", points: 50, type: "earned", description: "Family meal" },
      { date: "May 10, 2023", points: 50, type: "earned", description: "Special order" },
    ],
  },
  {
    id: 3,
    name: "Sushi Heaven",
    logo: "https://images.unsplash.com/photo-1617196034183-421b4917c92d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "Japanese",
    points: 500,
    redemptionThreshold: 800,
    rewards: [
      { points: 200, description: "Free Miso Soup" },
      { points: 400, description: "Free California Roll" },
      { points: 800, description: "Free Chef's Special Roll" },
    ],
    history: [
      { date: "Jun 15, 2023", points: 50, type: "earned", description: "Dinner visit" },
      { date: "Jun 2, 2023", points: 50, type: "earned", description: "Lunch special" },
      { date: "May 20, 2023", points: -200, type: "redeemed", description: "Free miso soup" },
      { date: "May 7, 2023", points: 100, type: "earned", description: "Special event" },
    ],
  },
  {
    id: 4,
    name: "Burger Joint",
    logo: "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "American",
    points: 350,
    redemptionThreshold: 500,
    rewards: [
      { points: 150, description: "Free Fries" },
      { points: 300, description: "Free Shake" },
      { points: 500, description: "Free Burger Meal" },
    ],
    history: [
      { date: "Jun 10, 2023", points: 50, type: "earned", description: "Meal" },
      { date: "May 27, 2023", points: 50, type: "earned", description: "Meal" },
      { date: "May 13, 2023", points: 50, type: "earned", description: "Meal" },
      { date: "Apr 30, 2023", points: 50, type: "earned", description: "Family dinner" },
    ],
  },
  {
    id: 5,
    name: "Taco Time",
    logo: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "Mexican",
    points: 450,
    redemptionThreshold: 600,
    rewards: [
      { points: 150, description: "Free Side" },
      { points: 300, description: "Free Taco" },
      { points: 600, description: "Free Meal Combo" },
    ],
    history: [
      { date: "Jun 14, 2023", points: 50, type: "earned", description: "Taco Tuesday" },
      { date: "May 30, 2023", points: 50, type: "earned", description: "Taco Tuesday" },
      { date: "May 16, 2023", points: 50, type: "earned", description: "Taco Tuesday" },
      { date: "May 2, 2023", points: 50, type: "earned", description: "Cinco de Mayo special" },
    ],
  },
  {
    id: 6,
    name: "Thai Spice",
    logo: "https://images.unsplash.com/photo-1569562211093-4ed0d0758f10?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "Thai",
    points: 300,
    redemptionThreshold: 750,
    rewards: [
      { points: 200, description: "Free Spring Rolls" },
      { points: 400, description: "Free Pad Thai" },
      { points: 750, description: "Free Dinner for Two" },
    ],
    history: [
      { date: "Jun 11, 2023", points: 50, type: "earned", description: "Dinner" },
      { date: "May 25, 2023", points: 50, type: "earned", description: "Lunch special" },
      { date: "May 9, 2023", points: -200, type: "redeemed", description: "Free spring rolls" },
      { date: "Apr 22, 2023", points: 100, type: "earned", description: "Special event" },
    ],
  },
];

const CustomerCardDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const [card, setCard] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"rewards" | "history">("rewards");
  
  useEffect(() => {
    // Simulating an API call to fetch the card details
    setIsLoading(true);
    setTimeout(() => {
      const foundCard = loyaltyCards.find((card) => card.id === Number(id));
      setCard(foundCard);
      setIsLoading(false);
    }, 500);
  }, [id]);
  
  const handleRedeemReward = (points: number, description: string) => {
    if (card && card.points >= points) {
      toast({
        title: "Reward Selected",
        description: `You've selected to redeem ${points} points for ${description}. Show this to the restaurant to claim your reward.`,
      });
    } else {
      toast({
        title: "Not Enough Points",
        description: `You need ${points - (card?.points || 0)} more points to redeem this reward.`,
        variant: "destructive",
      });
    }
  };
  
  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center py-12">
        <div className="space-y-4 animate-pulse text-center">
          <div className="h-8 w-36 bg-muted mx-auto rounded"></div>
          <div className="h-20 w-full max-w-sm mx-auto bg-muted rounded"></div>
          <div className="h-40 w-full max-w-sm mx-auto bg-muted rounded"></div>
        </div>
      </div>
    );
  }
  
  if (!card) {
    return (
      <div className="h-full flex flex-col items-center justify-center py-12 px-4 text-center">
        <Info className="h-12 w-12 text-muted-foreground mb-4" />
        <h2 className="text-xl font-semibold mb-2">Card Not Found</h2>
        <p className="text-muted-foreground mb-6">
          The loyalty card you're looking for doesn't exist or has been removed.
        </p>
        <Button asChild>
          <Link to="/customer/cards">Back to My Cards</Link>
        </Button>
      </div>
    );
  }
  
  return (
    <div className="space-y-6 pb-16 animate-fade-in">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" asChild className="h-8 w-8">
          <Link to="/customer/cards">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h2 className="text-xl font-semibold">{card.name}</h2>
      </div>
      
      {/* Card with QR code */}
      <Card className="overflow-hidden bg-primary text-primary-foreground shadow-lg">
        <CardHeader className="pb-2 pt-6">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl">{card.name}</CardTitle>
              <CardDescription className="text-primary-foreground/80">
                {card.category}
              </CardDescription>
            </div>
            <div className="h-12 w-12 rounded-full bg-white p-1 overflow-hidden">
              <img
                src={card.logo}
                alt={card.name}
                className="w-full h-full object-cover rounded-full"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-4">
            <div className="bg-white p-2 rounded-lg shadow-inner mb-4">
              <QrCode className="h-40 w-40 text-black" />
            </div>
            <div className="text-center">
              <p className="text-sm opacity-80">Scan this QR code at {card.name}</p>
              <p className="text-sm opacity-80">
                to earn or redeem your loyalty points
              </p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="bg-primary-foreground/10 px-6 py-4">
          <div className="w-full space-y-1">
            <div className="flex justify-between text-sm">
              <span>Current Points</span>
              <span className="font-bold">{card.points}</span>
            </div>
            <div className="w-full h-2 bg-primary-foreground/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-white transition-all duration-500 ease-out"
                style={{
                  width: `${Math.min(
                    (card.points / card.redemptionThreshold) * 100,
                    100
                  )}%`,
                }}
              ></div>
            </div>
            <div className="flex justify-between text-xs opacity-80">
              <span>0</span>
              <span>{card.redemptionThreshold}</span>
            </div>
          </div>
        </CardFooter>
      </Card>
      
      {/* Tabs for Rewards and History */}
      <div className="border-b border-border">
        <div className="flex">
          <button
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              activeTab === "rewards"
                ? "border-b-2 border-primary text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
            onClick={() => setActiveTab("rewards")}
          >
            <div className="flex items-center">
              <Gift className="mr-1.5 h-4 w-4" />
              Available Rewards
            </div>
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              activeTab === "history"
                ? "border-b-2 border-primary text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
            onClick={() => setActiveTab("history")}
          >
            <div className="flex items-center">
              <Clock className="mr-1.5 h-4 w-4" />
              Points History
            </div>
          </button>
        </div>
      </div>
      
      {/* Tab Content */}
      {activeTab === "rewards" ? (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Available Rewards</h3>
          
          <div className="space-y-3">
            {card.rewards.map((reward: any, index: number) => (
              <Card key={index} className={`overflow-hidden ${card.points >= reward.points ? "bg-card" : "bg-muted/50"}`}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <div className={`flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center ${
                        card.points >= reward.points
                          ? "bg-primary/10 text-primary"
                          : "bg-muted-foreground/10 text-muted-foreground"
                      }`}>
                        <Star className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="font-medium">{reward.description}</h4>
                        <p className={`text-sm ${card.points >= reward.points ? "text-muted-foreground" : "text-muted-foreground/70"}`}>
                          {reward.points} points required
                        </p>
                      </div>
                    </div>
                    <Button
                      variant={card.points >= reward.points ? "default" : "outline"}
                      size="sm"
                      disabled={card.points < reward.points}
                      onClick={() => handleRedeemReward(reward.points, reward.description)}
                    >
                      Redeem
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="bg-muted/30 rounded-lg p-4 text-center">
            <p className="text-sm text-muted-foreground">
              Visit {card.name} to earn more points and unlock rewards
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Points History</h3>
          
          <div className="space-y-3">
            {card.history.map((item: any, index: number) => (
              <div key={index} className="flex items-start space-x-4 py-3">
                <div className={`flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center ${
                  item.type === "earned"
                    ? "bg-green-100 text-green-600"
                    : "bg-amber-100 text-amber-600"
                }`}>
                  {item.type === "earned" ? (
                    <Plus className="h-5 w-5" />
                  ) : (
                    <Minus className="h-5 w-5" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <div>
                      <h4 className="font-medium">
                        {item.type === "earned" ? "Points Earned" : "Points Redeemed"}
                      </h4>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                    <div className="text-right">
                      <div className={`font-medium ${
                        item.type === "earned" ? "text-green-600" : "text-amber-600"
                      }`}>
                        {item.type === "earned" ? "+" : ""}{item.points}
                      </div>
                      <p className="text-xs text-muted-foreground">{item.date}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Plus and Minus icons for the history
const Plus = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M12 5v14M5 12h14" />
  </svg>
);

const Minus = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M5 12h14" />
  </svg>
);

export default CustomerCardDetail;
