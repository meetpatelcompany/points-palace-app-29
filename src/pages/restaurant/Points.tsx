
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { PlusCircle, MinusCircle, Search } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const RestaurantPoints = () => {
  const [searchPhone, setSearchPhone] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [currentPoints, setCurrentPoints] = useState(0);
  const [pointsToAdd, setPointsToAdd] = useState(0);
  const [pointsToRedeem, setPointsToRedeem] = useState(0);
  const [customerFound, setCustomerFound] = useState(false);
  const { toast } = useToast();

  const handleSearch = () => {
    // In a real app, this would search the backend for the customer
    if (searchPhone.length >= 10) {
      // Simulate finding a customer
      setCustomerName("John Doe");
      setCurrentPoints(120);
      setCustomerFound(true);
      
      toast({
        title: "Customer found",
        description: "Customer details have been loaded.",
      });
    } else {
      toast({
        title: "Invalid phone number",
        description: "Please enter a valid phone number.",
        variant: "destructive",
      });
    }
  };

  const handleAddPoints = () => {
    if (pointsToAdd > 0) {
      // In a real app, this would call the backend to add points
      setCurrentPoints(currentPoints + pointsToAdd);
      toast({
        title: "Points added",
        description: `${pointsToAdd} points have been added to ${customerName}'s account.`,
      });
      setPointsToAdd(0);
    } else {
      toast({
        title: "Invalid points",
        description: "Please enter a valid number of points to add.",
        variant: "destructive",
      });
    }
  };

  const handleRedeemPoints = () => {
    if (pointsToRedeem > 0 && pointsToRedeem <= currentPoints) {
      // In a real app, this would call the backend to redeem points
      setCurrentPoints(currentPoints - pointsToRedeem);
      toast({
        title: "Points redeemed",
        description: `${pointsToRedeem} points have been redeemed from ${customerName}'s account.`,
      });
      setPointsToRedeem(0);
    } else {
      toast({
        title: "Invalid redemption",
        description: "Please enter a valid number of points to redeem.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Points Management</h2>
        <p className="text-muted-foreground">Add or redeem points for your customers.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Customer Search</CardTitle>
          <CardDescription>
            Find a customer by their phone number to manage their points.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
            <div className="flex-1">
              <Label htmlFor="phone">Phone Number</Label>
              <div className="relative mt-1">
                <Input
                  id="phone"
                  placeholder="Enter customer phone number"
                  value={searchPhone}
                  onChange={(e) => setSearchPhone(e.target.value)}
                />
              </div>
            </div>
            <div className="flex items-end">
              <Button onClick={handleSearch}>
                <Search className="mr-2 h-4 w-4" />
                Search
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {customerFound && (
        <Tabs defaultValue="add">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="add">Add Points</TabsTrigger>
            <TabsTrigger value="redeem">Redeem Points</TabsTrigger>
          </TabsList>
          
          <TabsContent value="add">
            <Card>
              <CardHeader>
                <CardTitle>Add Points for {customerName}</CardTitle>
                <CardDescription>
                  Current Points: <span className="font-semibold">{currentPoints}</span>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="add-points">Points to Add</Label>
                    <Input
                      id="add-points"
                      type="number"
                      min="1"
                      placeholder="Enter points to add"
                      value={pointsToAdd === 0 ? "" : pointsToAdd}
                      onChange={(e) => setPointsToAdd(parseInt(e.target.value) || 0)}
                    />
                  </div>
                  <Button onClick={handleAddPoints} className="w-full">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add Points
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="redeem">
            <Card>
              <CardHeader>
                <CardTitle>Redeem Points for {customerName}</CardTitle>
                <CardDescription>
                  Available Points: <span className="font-semibold">{currentPoints}</span>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="redeem-points">Points to Redeem</Label>
                    <Input
                      id="redeem-points"
                      type="number"
                      min="1"
                      max={currentPoints}
                      placeholder="Enter points to redeem"
                      value={pointsToRedeem === 0 ? "" : pointsToRedeem}
                      onChange={(e) => setPointsToRedeem(parseInt(e.target.value) || 0)}
                    />
                  </div>
                  <Button onClick={handleRedeemPoints} className="w-full" variant="outline">
                    <MinusCircle className="mr-2 h-4 w-4" />
                    Redeem Points
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};

export default RestaurantPoints;
