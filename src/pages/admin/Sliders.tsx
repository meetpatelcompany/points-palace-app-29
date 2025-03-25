
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GripVertical, Plus, Trash2, Upload, Image } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Sample data for the sliders
const initialSliders = [
  { id: 1, title: "Special Offer", image: "https://placehold.co/600x300/orange/white?text=Special+Offer", order: 1 },
  { id: 2, title: "New Restaurants", image: "https://placehold.co/600x300/purple/white?text=New+Restaurants", order: 2 },
  { id: 3, title: "Seasonal Deals", image: "https://placehold.co/600x300/red/white?text=Seasonal+Deals", order: 3 },
  { id: 4, title: "Loyalty Rewards", image: "https://placehold.co/600x300/blue/white?text=Loyalty+Rewards", order: 4 },
];

const initialRestaurants = [
  { id: 1, name: "Gourmet Bistro", image: "https://placehold.co/300x200/green/white?text=Gourmet+Bistro", featured: true, order: 1 },
  { id: 2, name: "Pizza Palace", image: "https://placehold.co/300x200/red/white?text=Pizza+Palace", featured: true, order: 2 },
  { id: 3, name: "Sushi Express", image: "https://placehold.co/300x200/blue/white?text=Sushi+Express", featured: true, order: 3 },
  { id: 4, name: "Burger Joint", image: "https://placehold.co/300x200/orange/white?text=Burger+Joint", featured: true, order: 4 },
  { id: 5, name: "Taco Heaven", image: "https://placehold.co/300x200/yellow/black?text=Taco+Heaven", featured: true, order: 5 },
  { id: 6, name: "Pasta Paradise", image: "https://placehold.co/300x200/purple/white?text=Pasta+Paradise", featured: true, order: 6 },
];

const AdminSliders = () => {
  const [topSliders, setTopSliders] = useState(initialSliders.slice(0, 4));
  const [bottomSliders, setBottomSliders] = useState(initialSliders.slice(0, 4));
  const [featuredRestaurants, setFeaturedRestaurants] = useState(initialRestaurants);
  const { toast } = useToast();

  const handleSave = () => {
    // In a real app, this would save to backend
    toast({
      title: "Changes saved",
      description: "Your changes have been saved successfully.",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Manage Content</h2>
        <p className="text-muted-foreground">
          Configure the sliders and featured restaurants that appear in the customer app.
        </p>
      </div>

      <Tabs defaultValue="top-sliders">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="top-sliders">Top Sliders</TabsTrigger>
          <TabsTrigger value="featured">Featured Restaurants</TabsTrigger>
          <TabsTrigger value="bottom-sliders">Bottom Sliders</TabsTrigger>
        </TabsList>

        {/* Top Sliders Tab */}
        <TabsContent value="top-sliders">
          <Card>
            <CardHeader>
              <CardTitle>Top Sliders</CardTitle>
              <CardDescription>
                Manage the top 4 slider images that appear on the customer app home screen.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topSliders.map((slider, index) => (
                  <div key={slider.id} className="flex items-center gap-4 p-3 border rounded-md">
                    <div className="flex items-center justify-center">
                      <GripVertical className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div className="flex-1 flex flex-col sm:flex-row sm:items-center gap-3">
                      <div className="w-20 h-12 bg-muted rounded-md overflow-hidden">
                        {slider.image ? (
                          <img 
                            src={slider.image} 
                            alt={slider.title} 
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Image className="h-6 w-6 text-muted-foreground" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <Input 
                          value={slider.title} 
                          onChange={(e) => {
                            const newSliders = [...topSliders];
                            newSliders[index].title = e.target.value;
                            setTopSliders(newSliders);
                          }}
                          placeholder="Slider title"
                          className="w-full"
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          <Upload className="h-4 w-4 mr-2" />
                          Change
                        </Button>
                        <Button variant="destructive" size="icon">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
                
                {topSliders.length < 4 && (
                  <Button className="w-full" variant="outline">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Slider
                  </Button>
                )}
                
                <div className="pt-4">
                  <Button onClick={handleSave}>Save Changes</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Featured Restaurants Tab */}
        <TabsContent value="featured">
          <Card>
            <CardHeader>
              <CardTitle>Featured Restaurants</CardTitle>
              <CardDescription>
                Select up to 6 restaurants to highlight on the customer app home screen.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                {featuredRestaurants.map((restaurant, index) => (
                  <div key={restaurant.id} className="flex items-center gap-3 p-3 border rounded-md">
                    <div className="flex items-center justify-center">
                      <GripVertical className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div className="w-16 h-16 bg-muted rounded-md overflow-hidden">
                      {restaurant.image ? (
                        <img 
                          src={restaurant.image} 
                          alt={restaurant.name} 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Image className="h-6 w-6 text-muted-foreground" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{restaurant.name}</p>
                      <p className="text-sm text-muted-foreground">Featured #{index + 1}</p>
                    </div>
                    <Button variant="destructive" size="icon">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
              
              {featuredRestaurants.length < 6 && (
                <Button className="w-full mb-4" variant="outline">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Restaurant
                </Button>
              )}
              
              <Button onClick={handleSave}>Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Bottom Sliders Tab */}
        <TabsContent value="bottom-sliders">
          <Card>
            <CardHeader>
              <CardTitle>Bottom Sliders</CardTitle>
              <CardDescription>
                Manage the bottom 4 slider images that appear on the customer app home screen.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {bottomSliders.map((slider, index) => (
                  <div key={slider.id} className="flex items-center gap-4 p-3 border rounded-md">
                    <div className="flex items-center justify-center">
                      <GripVertical className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div className="flex-1 flex flex-col sm:flex-row sm:items-center gap-3">
                      <div className="w-20 h-12 bg-muted rounded-md overflow-hidden">
                        {slider.image ? (
                          <img 
                            src={slider.image} 
                            alt={slider.title} 
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Image className="h-6 w-6 text-muted-foreground" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <Input 
                          value={slider.title} 
                          onChange={(e) => {
                            const newSliders = [...bottomSliders];
                            newSliders[index].title = e.target.value;
                            setBottomSliders(newSliders);
                          }}
                          placeholder="Slider title"
                          className="w-full"
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          <Upload className="h-4 w-4 mr-2" />
                          Change
                        </Button>
                        <Button variant="destructive" size="icon">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
                
                {bottomSliders.length < 4 && (
                  <Button className="w-full" variant="outline">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Slider
                  </Button>
                )}
                
                <div className="pt-4">
                  <Button onClick={handleSave}>Save Changes</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminSliders;
