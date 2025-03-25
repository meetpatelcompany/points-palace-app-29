
import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
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
  DialogTrigger 
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { PlusCircle, MoreVertical, Edit, Trash2, Store, Mail, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Sample restaurant data
const initialRestaurants = [
  {
    id: 1,
    name: "Gourmet Bistro",
    email: "contact@gourmetbistro.com",
    status: "active",
    customers: 245,
    joinDate: "Jan 12, 2023",
  },
  {
    id: 2,
    name: "Pizza Palace",
    email: "info@pizzapalace.com",
    status: "active",
    customers: 187,
    joinDate: "Feb 23, 2023",
  },
  {
    id: 3,
    name: "Sushi Heaven",
    email: "hello@sushiheaven.com",
    status: "active",
    customers: 163,
    joinDate: "Mar 8, 2023",
  },
  {
    id: 4,
    name: "Burger Joint",
    email: "support@burgerjoint.com",
    status: "active",
    customers: 119,
    joinDate: "Apr 17, 2023",
  },
  {
    id: 5,
    name: "Taco Time",
    email: "hola@tacotime.com",
    status: "inactive",
    customers: 97,
    joinDate: "May 5, 2023",
  },
];

const AdminRestaurants = () => {
  const { toast } = useToast();
  const [restaurants, setRestaurants] = useState(initialRestaurants);
  const [searchQuery, setSearchQuery] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [isCreating, setIsCreating] = useState(true);
  const [currentRestaurant, setCurrentRestaurant] = useState<any>(null);
  
  // Form fields
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    status: true,
    password: "",
    confirmPassword: "",
  });
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  
  const filteredRestaurants = restaurants.filter(
    (restaurant) =>
      restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      restaurant.email.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const openCreateDialog = () => {
    setIsCreating(true);
    setFormData({
      name: "",
      email: "",
      status: true,
      password: "",
      confirmPassword: "",
    });
    setOpenDialog(true);
  };
  
  const openEditDialog = (restaurant: any) => {
    setIsCreating(false);
    setCurrentRestaurant(restaurant);
    setFormData({
      name: restaurant.name,
      email: restaurant.email,
      status: restaurant.status === "active",
      password: "",
      confirmPassword: "",
    });
    setOpenDialog(true);
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }
    
    if (isCreating) {
      // Create new restaurant
      const newRestaurant = {
        id: restaurants.length + 1,
        name: formData.name,
        email: formData.email,
        status: formData.status ? "active" : "inactive",
        customers: 0,
        joinDate: new Date().toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
      };
      
      setRestaurants([...restaurants, newRestaurant]);
      
      toast({
        title: "Restaurant created",
        description: `${formData.name} has been successfully created.`,
      });
    } else {
      // Update existing restaurant
      const updatedRestaurants = restaurants.map((restaurant) =>
        restaurant.id === currentRestaurant.id
          ? {
              ...restaurant,
              name: formData.name,
              email: formData.email,
              status: formData.status ? "active" : "inactive",
            }
          : restaurant
      );
      
      setRestaurants(updatedRestaurants);
      
      toast({
        title: "Restaurant updated",
        description: `${formData.name} has been successfully updated.`,
      });
    }
    
    setOpenDialog(false);
  };
  
  const handleDeleteRestaurant = (id: number) => {
    setRestaurants(restaurants.filter((restaurant) => restaurant.id !== id));
    
    toast({
      title: "Restaurant deleted",
      description: "The restaurant has been successfully deleted.",
    });
  };
  
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Restaurants</h2>
          <p className="text-muted-foreground">
            Manage restaurant accounts and access
          </p>
        </div>
        <Button onClick={openCreateDialog}>
          <Plus className="mr-2 h-4 w-4" />
          Add Restaurant
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4 justify-between">
            <div>
              <CardTitle>Restaurant Management</CardTitle>
              <CardDescription>
                Create, edit, and manage restaurant accounts
              </CardDescription>
            </div>
            <div className="w-full sm:w-64">
              <Input
                placeholder="Search restaurants..."
                value={searchQuery}
                onChange={handleSearch}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Restaurant</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Customers</TableHead>
                <TableHead>Join Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRestaurants.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    No restaurants found
                  </TableCell>
                </TableRow>
              ) : (
                filteredRestaurants.map((restaurant) => (
                  <TableRow key={restaurant.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary mr-2">
                          <Store className="h-4 w-4" />
                        </div>
                        {restaurant.name}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                        {restaurant.email}
                      </div>
                    </TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          restaurant.status === "active"
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {restaurant.status}
                      </span>
                    </TableCell>
                    <TableCell>{restaurant.customers}</TableCell>
                    <TableCell>{restaurant.joinDate}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => openEditDialog(restaurant)}
                          >
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-red-600"
                            onClick={() => handleDeleteRestaurant(restaurant.id)}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      {/* Create/Edit Restaurant Dialog */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {isCreating ? "Create Restaurant" : "Edit Restaurant"}
            </DialogTitle>
            <DialogDescription>
              {isCreating
                ? "Add a new restaurant to the loyalty program"
                : "Update restaurant details and access"}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
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
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="contact@restaurant.com"
                  className="col-span-3"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="status" className="text-right">
                  Active
                </Label>
                <div className="col-span-3">
                  <Switch
                    id="status"
                    name="status"
                    checked={formData.status}
                    onCheckedChange={(checked) =>
                      setFormData({ ...formData, status: checked })
                    }
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="password" className="text-right">
                  Password
                </Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder={isCreating ? "Create password" : "New password (optional)"}
                  className="col-span-3"
                  value={formData.password}
                  onChange={handleInputChange}
                  required={isCreating}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="confirmPassword" className="text-right">
                  Confirm
                </Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm password"
                  className="col-span-3"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required={isCreating || formData.password.length > 0}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">
                {isCreating ? "Create Restaurant" : "Save Changes"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminRestaurants;
