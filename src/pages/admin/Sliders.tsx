
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  GripVertical, 
  Plus, 
  Trash2, 
  Upload, 
  Image, 
  Save,
  AlertCircle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface Slider {
  id: number;
  title: string;
  image: string;
  order: number;
}

interface Restaurant {
  id: number;
  name: string;
  image: string;
  featured: boolean;
  order: number;
}

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
  const [topSliders, setTopSliders] = useState<Slider[]>(initialSliders.slice(0, 4));
  const [bottomSliders, setBottomSliders] = useState<Slider[]>(initialSliders.slice(0, 4));
  const [featuredRestaurants, setFeaturedRestaurants] = useState<Restaurant[]>(initialRestaurants);
  const { toast } = useToast();
  
  // Dialog states
  const [openSliderDialog, setOpenSliderDialog] = useState(false);
  const [openRestaurantDialog, setOpenRestaurantDialog] = useState(false);
  const [currentSlider, setCurrentSlider] = useState<Slider | null>(null);
  const [currentRestaurant, setCurrentRestaurant] = useState<Restaurant | null>(null);
  const [sliderType, setSliderType] = useState<'top' | 'bottom'>('top');
  const [hasChanges, setHasChanges] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState<number | null>(null);
  const [deleteType, setDeleteType] = useState<'top' | 'bottom' | 'restaurant'>('top');
  
  // Form state
  const [sliderFormData, setSliderFormData] = useState({
    title: "",
    image: ""
  });
  
  const [restaurantFormData, setRestaurantFormData] = useState({
    name: "",
    image: ""
  });

  // Handlers for sliders
  const openAddSliderDialog = (type: 'top' | 'bottom') => {
    setSliderType(type);
    setCurrentSlider(null);
    setSliderFormData({
      title: "",
      image: ""
    });
    setOpenSliderDialog(true);
  };
  
  const openEditSliderDialog = (slider: Slider, type: 'top' | 'bottom') => {
    setSliderType(type);
    setCurrentSlider(slider);
    setSliderFormData({
      title: slider.title,
      image: slider.image
    });
    setOpenSliderDialog(true);
  };
  
  const handleSliderInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSliderFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSliderSubmit = () => {
    if (sliderType === 'top') {
      if (currentSlider) {
        // Edit existing slider
        const updatedSliders = topSliders.map(slider => 
          slider.id === currentSlider.id 
            ? { ...slider, title: sliderFormData.title, image: sliderFormData.image }
            : slider
        );
        setTopSliders(updatedSliders);
      } else {
        // Add new slider
        if (topSliders.length >= 4) {
          toast({
            title: "Limit reached",
            description: "You can only have 4 top sliders. Please remove one first.",
            variant: "destructive"
          });
          return;
        }
        
        const newSlider = {
          id: Date.now(),
          title: sliderFormData.title,
          image: sliderFormData.image,
          order: topSliders.length + 1
        };
        setTopSliders([...topSliders, newSlider]);
      }
    } else {
      if (currentSlider) {
        // Edit existing slider
        const updatedSliders = bottomSliders.map(slider => 
          slider.id === currentSlider.id 
            ? { ...slider, title: sliderFormData.title, image: sliderFormData.image }
            : slider
        );
        setBottomSliders(updatedSliders);
      } else {
        // Add new slider
        if (bottomSliders.length >= 4) {
          toast({
            title: "Limit reached",
            description: "You can only have 4 bottom sliders. Please remove one first.",
            variant: "destructive"
          });
          return;
        }
        
        const newSlider = {
          id: Date.now(),
          title: sliderFormData.title,
          image: sliderFormData.image,
          order: bottomSliders.length + 1
        };
        setBottomSliders([...bottomSliders, newSlider]);
      }
    }
    
    setOpenSliderDialog(false);
    setHasChanges(true);
    toast({
      title: "Success",
      description: currentSlider ? "Slider updated successfully" : "New slider added successfully",
    });
  };
  
  // Handlers for restaurants
  const openAddRestaurantDialog = () => {
    setCurrentRestaurant(null);
    setRestaurantFormData({
      name: "",
      image: ""
    });
    setOpenRestaurantDialog(true);
  };
  
  const openEditRestaurantDialog = (restaurant: Restaurant) => {
    setCurrentRestaurant(restaurant);
    setRestaurantFormData({
      name: restaurant.name,
      image: restaurant.image
    });
    setOpenRestaurantDialog(true);
  };
  
  const handleRestaurantInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRestaurantFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleRestaurantSubmit = () => {
    if (currentRestaurant) {
      // Edit existing restaurant
      const updatedRestaurants = featuredRestaurants.map(restaurant => 
        restaurant.id === currentRestaurant.id 
          ? { ...restaurant, name: restaurantFormData.name, image: restaurantFormData.image }
          : restaurant
      );
      setFeaturedRestaurants(updatedRestaurants);
    } else {
      // Add new restaurant
      if (featuredRestaurants.length >= 6) {
        toast({
          title: "Limit reached",
          description: "You can only have 6 featured restaurants. Please remove one first.",
          variant: "destructive"
        });
        return;
      }
      
      const newRestaurant = {
        id: Date.now(),
        name: restaurantFormData.name,
        image: restaurantFormData.image,
        featured: true,
        order: featuredRestaurants.length + 1
      };
      setFeaturedRestaurants([...featuredRestaurants, newRestaurant]);
    }
    
    setOpenRestaurantDialog(false);
    setHasChanges(true);
    toast({
      title: "Success",
      description: currentRestaurant ? "Restaurant updated successfully" : "New restaurant added successfully",
    });
  };
  
  // Delete functionality
  const confirmDelete = (id: number, type: 'top' | 'bottom' | 'restaurant') => {
    setDeleteItemId(id);
    setDeleteType(type);
    setIsDeleting(true);
  };
  
  const handleDelete = () => {
    if (!deleteItemId) return;
    
    if (deleteType === 'top') {
      setTopSliders(topSliders.filter(slider => slider.id !== deleteItemId));
    } else if (deleteType === 'bottom') {
      setBottomSliders(bottomSliders.filter(slider => slider.id !== deleteItemId));
    } else if (deleteType === 'restaurant') {
      setFeaturedRestaurants(featuredRestaurants.filter(restaurant => restaurant.id !== deleteItemId));
    }
    
    setIsDeleting(false);
    setDeleteItemId(null);
    setHasChanges(true);
    toast({
      title: "Deleted",
      description: `${deleteType === 'restaurant' ? 'Restaurant' : 'Slider'} has been deleted successfully.`,
    });
  };
  
  // Save all changes
  const handleSaveAll = () => {
    // In a real app, this would save to backend
    toast({
      title: "Changes saved",
      description: "Your changes have been saved successfully.",
    });
    setHasChanges(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Manage Content</h2>
        <p className="text-muted-foreground">
          Configure the sliders and featured restaurants that appear in the customer app.
        </p>
      </div>

      {hasChanges && (
        <Alert variant="warning" className="bg-amber-50 border-amber-200">
          <AlertCircle className="h-4 w-4 text-amber-600" />
          <AlertTitle className="text-amber-800">Unsaved changes</AlertTitle>
          <AlertDescription className="text-amber-700">
            You have unsaved changes. Click "Save All Changes" to save your updates.
          </AlertDescription>
          <Button 
            className="mt-2 bg-amber-600 hover:bg-amber-700" 
            size="sm"
            onClick={handleSaveAll}
          >
            <Save className="h-4 w-4 mr-2" />
            Save All Changes
          </Button>
        </Alert>
      )}

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
                            setHasChanges(true);
                          }}
                          placeholder="Slider title"
                          className="w-full"
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => openEditSliderDialog(slider, 'top')}
                        >
                          <Upload className="h-4 w-4 mr-2" />
                          Edit
                        </Button>
                        <Button 
                          variant="destructive" 
                          size="icon"
                          onClick={() => confirmDelete(slider.id, 'top')}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
                
                {topSliders.length < 4 && (
                  <Button 
                    className="w-full" 
                    variant="outline"
                    onClick={() => openAddSliderDialog('top')}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Slider
                  </Button>
                )}
                
                <div className="pt-4">
                  <Button 
                    onClick={handleSaveAll}
                    disabled={!hasChanges}
                  >
                    Save Changes
                  </Button>
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
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => openEditRestaurantDialog(restaurant)}
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        Edit
                      </Button>
                      <Button 
                        variant="destructive" 
                        size="icon"
                        onClick={() => confirmDelete(restaurant.id, 'restaurant')}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              
              {featuredRestaurants.length < 6 && (
                <Button 
                  className="w-full mb-4" 
                  variant="outline"
                  onClick={openAddRestaurantDialog}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Restaurant
                </Button>
              )}
              
              <Button 
                onClick={handleSaveAll}
                disabled={!hasChanges}
              >
                Save Changes
              </Button>
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
                            setHasChanges(true);
                          }}
                          placeholder="Slider title"
                          className="w-full"
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => openEditSliderDialog(slider, 'bottom')}
                        >
                          <Upload className="h-4 w-4 mr-2" />
                          Edit
                        </Button>
                        <Button 
                          variant="destructive" 
                          size="icon"
                          onClick={() => confirmDelete(slider.id, 'bottom')}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
                
                {bottomSliders.length < 4 && (
                  <Button 
                    className="w-full" 
                    variant="outline"
                    onClick={() => openAddSliderDialog('bottom')}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Slider
                  </Button>
                )}
                
                <div className="pt-4">
                  <Button 
                    onClick={handleSaveAll}
                    disabled={!hasChanges}
                  >
                    Save Changes
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Slider Dialog */}
      <Dialog open={openSliderDialog} onOpenChange={setOpenSliderDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {currentSlider ? "Edit Slider" : "Add New Slider"}
            </DialogTitle>
            <DialogDescription>
              {currentSlider 
                ? "Update the slider details below" 
                : "Add a new slider to the customer app"
              }
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="slider-title" className="text-right">
                Title
              </Label>
              <Input
                id="slider-title"
                name="title"
                placeholder="Slider title"
                className="col-span-3"
                value={sliderFormData.title}
                onChange={handleSliderInputChange}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="slider-image" className="text-right">
                Image URL
              </Label>
              <Input
                id="slider-image"
                name="image"
                placeholder="https://example.com/image.jpg"
                className="col-span-3"
                value={sliderFormData.image}
                onChange={handleSliderInputChange}
              />
            </div>
            {sliderFormData.image && (
              <div className="p-2 border rounded mt-2">
                <p className="text-sm text-muted-foreground mb-2">Image Preview:</p>
                <div className="w-full h-32 bg-muted rounded overflow-hidden">
                  <img 
                    src={sliderFormData.image} 
                    alt="Preview" 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://placehold.co/600x300/gray/white?text=Invalid+Image+URL";
                    }}
                  />
                </div>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpenSliderDialog(false)}>
              Cancel
            </Button>
            <Button type="button" onClick={handleSliderSubmit}>
              {currentSlider ? "Save Changes" : "Add Slider"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Restaurant Dialog */}
      <Dialog open={openRestaurantDialog} onOpenChange={setOpenRestaurantDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {currentRestaurant ? "Edit Restaurant" : "Add Featured Restaurant"}
            </DialogTitle>
            <DialogDescription>
              {currentRestaurant 
                ? "Update the restaurant details below" 
                : "Add a new restaurant to the featured section"
              }
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="restaurant-name" className="text-right">
                Name
              </Label>
              <Input
                id="restaurant-name"
                name="name"
                placeholder="Restaurant name"
                className="col-span-3"
                value={restaurantFormData.name}
                onChange={handleRestaurantInputChange}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="restaurant-image" className="text-right">
                Image URL
              </Label>
              <Input
                id="restaurant-image"
                name="image"
                placeholder="https://example.com/image.jpg"
                className="col-span-3"
                value={restaurantFormData.image}
                onChange={handleRestaurantInputChange}
              />
            </div>
            {restaurantFormData.image && (
              <div className="p-2 border rounded mt-2">
                <p className="text-sm text-muted-foreground mb-2">Image Preview:</p>
                <div className="w-full h-32 bg-muted rounded overflow-hidden">
                  <img 
                    src={restaurantFormData.image} 
                    alt="Preview" 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://placehold.co/300x200/gray/white?text=Invalid+Image+URL";
                    }}
                  />
                </div>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpenRestaurantDialog(false)}>
              Cancel
            </Button>
            <Button type="button" onClick={handleRestaurantSubmit}>
              {currentRestaurant ? "Save Changes" : "Add Restaurant"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleting} onOpenChange={setIsDeleting}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this {deleteType === 'restaurant' ? 'restaurant' : 'slider'}? 
              This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setIsDeleting(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminSliders;
