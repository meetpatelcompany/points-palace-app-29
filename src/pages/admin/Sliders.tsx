
import { useState, useRef } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Trash2, PlusCircle, Image, DragHandleDots2, ArrowDown, ArrowUp } from "lucide-react";

// Sample slider data
const initialTopSliders = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    title: "Summer Rewards",
    link: "#",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    title: "New Restaurants",
    link: "#",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    title: "Earn Double Points",
    link: "#",
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    title: "Loyalty Tips",
    link: "#",
  },
];

const initialBottomSliders = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    title: "Special Offers",
    link: "#",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    title: "Partner Discounts",
    link: "#",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    title: "VIP Members",
    link: "#",
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    title: "App Updates",
    link: "#",
  },
];

// Sample featured restaurants
const initialFeaturedRestaurants = [
  {
    id: 1,
    name: "Gourmet Bistro",
    image: "https://images.unsplash.com/photo-1599458252573-56ae36120de1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "Fine Dining",
    featured: true,
  },
  {
    id: 2,
    name: "Pizza Palace",
    image: "https://images.unsplash.com/photo-1528137871618-79d2761e3fd5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "Italian",
    featured: true,
  },
  {
    id: 3,
    name: "Sushi Heaven",
    image: "https://images.unsplash.com/photo-1617196034183-421b4917c92d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "Japanese",
    featured: true,
  },
  {
    id: 4,
    name: "Burger Joint",
    image: "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "American",
    featured: true,
  },
  {
    id: 5,
    name: "Taco Time",
    image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "Mexican",
    featured: true,
  },
  {
    id: 6,
    name: "Thai Spice",
    image: "https://images.unsplash.com/photo-1569562211093-4ed0d0758f10?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "Thai",
    featured: true,
  },
  {
    id: 7,
    name: "Coffee House",
    image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "Café",
    featured: false,
  },
  {
    id: 8,
    name: "Ice Cream Paradise",
    image: "https://images.unsplash.com/photo-1576506295286-5cda18df43e7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "Dessert",
    featured: false,
  },
];

const AdminSliders = () => {
  const { toast } = useToast();
  const [topSliders, setTopSliders] = useState(initialTopSliders);
  const [bottomSliders, setBottomSliders] = useState(initialBottomSliders);
  const [featuredRestaurants, setFeaturedRestaurants] = useState(initialFeaturedRestaurants);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogType, setDialogType] = useState<"top" | "bottom" | "restaurant">("top");
  const [currentItem, setCurrentItem] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  
  // Form states
  const [formData, setFormData] = useState({
    title: "",
    image: "",
    link: "",
    name: "",
    category: "",
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  
  const handleOpenDialog = (type: "top" | "bottom" | "restaurant", editing = false, item = null) => {
    setDialogType(type);
    setIsEditing(editing);
    
    if (editing && item) {
      setCurrentItem(item);
      if (type === "restaurant") {
        setFormData({
          title: "",
          image: item.image,
          link: "",
          name: item.name,
          category: item.category,
        });
      } else {
        setFormData({
          title: item.title,
          image: item.image,
          link: item.link,
          name: "",
          category: "",
        });
      }
    } else {
      setCurrentItem(null);
      setFormData({
        title: "",
        image: "",
        link: "",
        name: "",
        category: "",
      });
    }
    
    setOpenDialog(true);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (dialogType === "top" || dialogType === "bottom") {
      const newSlider = {
        id: isEditing ? currentItem.id : Date.now(),
        image: formData.image,
        title: formData.title,
        link: formData.link,
      };
      
      if (dialogType === "top") {
        if (isEditing) {
          setTopSliders(
            topSliders.map((slider) =>
              slider.id === currentItem.id ? newSlider : slider
            )
          );
        } else {
          setTopSliders([...topSliders, newSlider]);
        }
      } else {
        if (isEditing) {
          setBottomSliders(
            bottomSliders.map((slider) =>
              slider.id === currentItem.id ? newSlider : slider
            )
          );
        } else {
          setBottomSliders([...bottomSliders, newSlider]);
        }
      }
      
      toast({
        title: isEditing ? "Slider updated" : "Slider added",
        description: isEditing
          ? `${formData.title} has been updated.`
          : `${formData.title} has been added to the ${dialogType} sliders.`,
      });
    } else {
      // Restaurant handling
      const newRestaurant = {
        id: isEditing ? currentItem.id : Date.now(),
        name: formData.name,
        image: formData.image,
        category: formData.category,
        featured: true,
      };
      
      if (isEditing) {
        setFeaturedRestaurants(
          featuredRestaurants.map((restaurant) =>
            restaurant.id === currentItem.id ? newRestaurant : restaurant
          )
        );
      } else {
        setFeaturedRestaurants([...featuredRestaurants, newRestaurant]);
      }
      
      toast({
        title: isEditing ? "Restaurant updated" : "Restaurant added",
        description: isEditing
          ? `${formData.name} has been updated.`
          : `${formData.name} has been added to featured restaurants.`,
      });
    }
    
    setOpenDialog(false);
  };
  
  const handleDelete = (type: "top" | "bottom" | "restaurant", id: number) => {
    if (type === "top") {
      setTopSliders(topSliders.filter((slider) => slider.id !== id));
    } else if (type === "bottom") {
      setBottomSliders(bottomSliders.filter((slider) => slider.id !== id));
    } else {
      setFeaturedRestaurants(
        featuredRestaurants.map((restaurant) =>
          restaurant.id === id
            ? { ...restaurant, featured: false }
            : restaurant
        )
      );
    }
    
    toast({
      title: "Item removed",
      description:
        type === "restaurant"
          ? "Restaurant removed from featured list."
          : "Slider has been removed.",
    });
  };
  
  const handleMoveItem = (type: "top" | "bottom", id: number, direction: "up" | "down") => {
    const sliders = type === "top" ? [...topSliders] : [...bottomSliders];
    const index = sliders.findIndex((slider) => slider.id === id);
    
    if (
      (direction === "up" && index === 0) ||
      (direction === "down" && index === sliders.length - 1)
    ) {
      return;
    }
    
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    const temp = sliders[targetIndex];
    sliders[targetIndex] = sliders[index];
    sliders[index] = temp;
    
    if (type === "top") {
      setTopSliders(sliders);
    } else {
      setBottomSliders(sliders);
    }
  };
  
  const handleAddToFeatured = (id: number) => {
    setFeaturedRestaurants(
      featuredRestaurants.map((restaurant) =>
        restaurant.id === id
          ? { ...restaurant, featured: true }
          : restaurant
      )
    );
    
    toast({
      title: "Restaurant featured",
      description: "Restaurant added to featured list.",
    });
  };
  
  const handleRemoveFromFeatured = (id: number) => {
    setFeaturedRestaurants(
      featuredRestaurants.map((restaurant) =>
        restaurant.id === id
          ? { ...restaurant, featured: false }
          : restaurant
      )
    );
    
    toast({
      title: "Restaurant removed",
      description: "Restaurant removed from featured list.",
    });
  };
  
  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Content Management</h2>
        <p className="text-muted-foreground">
          Manage customer app content and featured restaurants
        </p>
      </div>
      
      <Tabs defaultValue="sliders">
        <TabsList className="mb-4">
          <TabsTrigger value="sliders">Home Sliders</TabsTrigger>
          <TabsTrigger value="featured">Featured Restaurants</TabsTrigger>
        </TabsList>
        
        <TabsContent value="sliders" className="space-y-6">
          {/* Top Sliders */}
          <Card>
            <CardHeader className="flex flex-row items-start justify-between">
              <div>
                <CardTitle>Top Sliders</CardTitle>
                <CardDescription>
                  Manage sliders at the top of the customer app home screen
                </CardDescription>
              </div>
              <Button 
                variant="outline"
                onClick={() => handleOpenDialog("top")}
              >
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Slider
              </Button>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {topSliders.map((slider) => (
                  <div
                    key={slider.id}
                    className="relative group rounded-lg border overflow-hidden"
                  >
                    <div className="absolute top-2 right-2 z-10 flex gap-1">
                      <Button
                        variant="secondary"
                        size="icon"
                        className="size-8 opacity-0 group-hover:opacity-100 transition-opacity bg-white text-gray-700"
                        onClick={() => handleMoveItem("top", slider.id, "up")}
                      >
                        <ArrowUp className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="secondary"
                        size="icon"
                        className="size-8 opacity-0 group-hover:opacity-100 transition-opacity bg-white text-gray-700"
                        onClick={() => handleMoveItem("top", slider.id, "down")}
                      >
                        <ArrowDown className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <div className="aspect-[16/9] overflow-hidden bg-muted">
                      {slider.image ? (
                        <img
                          src={slider.image}
                          alt={slider.title}
                          className="object-cover w-full h-full"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-muted">
                          <Image className="h-10 w-10 text-muted-foreground/40" />
                        </div>
                      )}
                    </div>
                    
                    <div className="p-3 bg-background">
                      <h3 className="font-medium truncate">{slider.title}</h3>
                      <div className="mt-2 flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleOpenDialog("top", true, slider)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-500"
                          onClick={() => handleDelete("top", slider.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          {/* Bottom Sliders */}
          <Card>
            <CardHeader className="flex flex-row items-start justify-between">
              <div>
                <CardTitle>Bottom Sliders</CardTitle>
                <CardDescription>
                  Manage sliders at the bottom of the customer app home screen
                </CardDescription>
              </div>
              <Button 
                variant="outline"
                onClick={() => handleOpenDialog("bottom")}
              >
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Slider
              </Button>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {bottomSliders.map((slider) => (
                  <div
                    key={slider.id}
                    className="relative group rounded-lg border overflow-hidden"
                  >
                    <div className="absolute top-2 right-2 z-10 flex gap-1">
                      <Button
                        variant="secondary"
                        size="icon"
                        className="size-8 opacity-0 group-hover:opacity-100 transition-opacity bg-white text-gray-700"
                        onClick={() => handleMoveItem("bottom", slider.id, "up")}
                      >
                        <ArrowUp className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="secondary"
                        size="icon"
                        className="size-8 opacity-0 group-hover:opacity-100 transition-opacity bg-white text-gray-700"
                        onClick={() => handleMoveItem("bottom", slider.id, "down")}
                      >
                        <ArrowDown className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <div className="aspect-[16/9] overflow-hidden bg-muted">
                      {slider.image ? (
                        <img
                          src={slider.image}
                          alt={slider.title}
                          className="object-cover w-full h-full"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-muted">
                          <Image className="h-10 w-10 text-muted-foreground/40" />
                        </div>
                      )}
                    </div>
                    
                    <div className="p-3 bg-background">
                      <h3 className="font-medium truncate">{slider.title}</h3>
                      <div className="mt-2 flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleOpenDialog("bottom", true, slider)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-500"
                          onClick={() => handleDelete("bottom", slider.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="featured" className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-start justify-between">
              <div>
                <CardTitle>Featured Restaurants</CardTitle>
                <CardDescription>
                  Manage featured restaurants on the customer app home screen
                </CardDescription>
              </div>
              <Button 
                variant="outline"
                onClick={() => handleOpenDialog("restaurant")}
              >
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Restaurant
              </Button>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="featured">
                <TabsList className="mb-4">
                  <TabsTrigger value="featured">Featured ({featuredRestaurants.filter(r => r.featured).length})</TabsTrigger>
                  <TabsTrigger value="all">All Restaurants ({featuredRestaurants.length})</TabsTrigger>
                </TabsList>
                
                <TabsContent value="featured">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {featuredRestaurants
                      .filter((restaurant) => restaurant.featured)
                      .map((restaurant) => (
                        <div
                          key={restaurant.id}
                          className="rounded-lg border overflow-hidden group"
                        >
                          <div className="aspect-[16/9] overflow-hidden bg-muted">
                            {restaurant.image ? (
                              <img
                                src={restaurant.image}
                                alt={restaurant.name}
                                className="object-cover w-full h-full"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center bg-muted">
                                <Image className="h-10 w-10 text-muted-foreground/40" />
                              </div>
                            )}
                          </div>
                          
                          <div className="p-3 bg-background">
                            <h3 className="font-medium text-lg">{restaurant.name}</h3>
                            <p className="text-muted-foreground text-sm">{restaurant.category}</p>
                            <div className="mt-3 flex justify-end gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleOpenDialog("restaurant", true, restaurant)}
                              >
                                Edit
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-red-500"
                                onClick={() => handleRemoveFromFeatured(restaurant.id)}
                              >
                                Remove
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                  
                  {featuredRestaurants.filter((r) => r.featured).length === 0 && (
                    <div className="text-center py-12 text-muted-foreground">
                      <Image className="h-12 w-12 mx-auto mb-4 text-muted-foreground/40" />
                      <h3 className="font-medium mb-1">No Featured Restaurants</h3>
                      <p className="text-sm max-w-md mx-auto">
                        You haven't featured any restaurants yet. Add a new one or feature an
                        existing restaurant from the "All Restaurants" tab.
                      </p>
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="all">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {featuredRestaurants.map((restaurant) => (
                      <div
                        key={restaurant.id}
                        className="rounded-lg border overflow-hidden group"
                      >
                        <div className="aspect-[16/9] overflow-hidden bg-muted relative">
                          {restaurant.featured && (
                            <div className="absolute top-2 left-2 px-2 py-1 bg-primary text-primary-foreground text-xs rounded-md font-medium">
                              Featured
                            </div>
                          )}
                          {restaurant.image ? (
                            <img
                              src={restaurant.image}
                              alt={restaurant.name}
                              className="object-cover w-full h-full"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-muted">
                              <Image className="h-10 w-10 text-muted-foreground/40" />
                            </div>
                          )}
                        </div>
                        
                        <div className="p-3 bg-background">
                          <h3 className="font-medium text-lg">{restaurant.name}</h3>
                          <p className="text-muted-foreground text-sm">{restaurant.category}</p>
                          <div className="mt-3 flex justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleOpenDialog("restaurant", true, restaurant)}
                            >
                              Edit
                            </Button>
                            {restaurant.featured ? (
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-red-500"
                                onClick={() => handleRemoveFromFeatured(restaurant.id)}
                              >
                                Remove from Featured
                              </Button>
                            ) : (
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-primary"
                                onClick={() => handleAddToFeatured(restaurant.id)}
                              >
                                Add to Featured
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Dialog for adding/editing items */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>
              {isEditing ? "Edit" : "Add"}{" "}
              {dialogType === "top"
                ? "Top Slider"
                : dialogType === "bottom"
                ? "Bottom Slider"
                : "Featured Restaurant"}
            </DialogTitle>
            <DialogDescription>
              {dialogType === "restaurant"
                ? "Manage restaurant details and featured status"
                : "Customize the slider content and appearance"}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              {dialogType === "restaurant" ? (
                // Restaurant fields
                <>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Name
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Restaurant name"
                      className="col-span-3"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="category" className="text-right">
                      Category
                    </Label>
                    <Input
                      id="category"
                      name="category"
                      placeholder="e.g. Italian, Thai, etc."
                      className="col-span-3"
                      value={formData.category}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </>
              ) : (
                // Slider fields
                <>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="title" className="text-right">
                      Title
                    </Label>
                    <Input
                      id="title"
                      name="title"
                      placeholder="Slider title"
                      className="col-span-3"
                      value={formData.title}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="link" className="text-right">
                      Link (URL)
                    </Label>
                    <Input
                      id="link"
                      name="link"
                      placeholder="https://example.com"
                      className="col-span-3"
                      value={formData.link}
                      onChange={handleInputChange}
                    />
                  </div>
                </>
              )}
              
              {/* Image field (common to both) */}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="image" className="text-right">
                  Image URL
                </Label>
                <Input
                  id="image"
                  name="image"
                  placeholder="https://example.com/image.jpg"
                  className="col-span-3"
                  value={formData.image}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              {/* Image preview */}
              {formData.image && (
                <div className="mt-2 rounded-md overflow-hidden border">
                  <img
                    src={formData.image}
                    alt="Preview"
                    className="w-full h-40 object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://via.placeholder.com/400x200?text=Invalid+Image+URL";
                    }}
                  />
                </div>
              )}
            </div>
            <DialogFooter>
              <Button type="submit">
                {isEditing ? "Save Changes" : "Add"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminSliders;
