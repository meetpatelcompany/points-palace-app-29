
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { User, MoreVertical, Eye, Gift, BadgeCheck, Search, Plus } from "lucide-react";

// Sample customer data
const initialCustomers = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    joinDate: "Jan 12, 2023",
    totalPoints: 750,
    status: "active",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "+1 (555) 234-5678",
    joinDate: "Feb 23, 2023",
    totalPoints: 1250,
    status: "active",
  },
  {
    id: 3,
    name: "Michael Brown",
    email: "michael.brown@example.com",
    phone: "+1 (555) 345-6789",
    joinDate: "Mar 8, 2023",
    totalPoints: 950,
    status: "active",
  },
  {
    id: 4,
    name: "Emily Wilson",
    email: "emily.wilson@example.com",
    phone: "+1 (555) 456-7890",
    joinDate: "Apr 17, 2023",
    totalPoints: 450,
    status: "active",
  },
  {
    id: 5,
    name: "David Miller",
    email: "david.miller@example.com",
    phone: "+1 (555) 567-8901",
    joinDate: "May 5, 2023",
    totalPoints: 1500,
    status: "active",
  },
  {
    id: 6,
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    phone: "+1 (555) 678-9012",
    joinDate: "Jun 14, 2023",
    totalPoints: 850,
    status: "inactive",
  },
  {
    id: 7,
    name: "James Williams",
    email: "james.williams@example.com",
    phone: "+1 (555) 789-0123",
    joinDate: "Jul 22, 2023",
    totalPoints: 1100,
    status: "active",
  },
  {
    id: 8,
    name: "Laura Davis",
    email: "laura.davis@example.com",
    phone: "+1 (555) 890-1234",
    joinDate: "Aug 3, 2023",
    totalPoints: 650,
    status: "active",
  },
];

const RestaurantCustomers = () => {
  const { toast } = useToast();
  const [customers, setCustomers] = useState(initialCustomers);
  const [searchQuery, setSearchQuery] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [customerDialogOpen, setCustomerDialogOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);
  
  // Form state for adding new customer
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  
  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.phone.includes(searchQuery)
  );
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  
  const handleAddCustomer = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newCustomer = {
      id: customers.length + 1,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      joinDate: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      totalPoints: 0,
      status: "active",
    };
    
    setCustomers([...customers, newCustomer]);
    setDialogOpen(false);
    setFormData({
      name: "",
      email: "",
      phone: "",
    });
    
    toast({
      title: "Customer added",
      description: `${formData.name} has been successfully added.`,
    });
  };
  
  const viewCustomerDetails = (customer: any) => {
    setSelectedCustomer(customer);
    setCustomerDialogOpen(true);
  };
  
  const handleSendReward = (customer: any) => {
    toast({
      title: "Reward sent",
      description: `A special reward has been sent to ${customer.name}.`,
    });
  };
  
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Customers</h2>
          <p className="text-muted-foreground">
            Manage your loyalty program members
          </p>
        </div>
        <Button onClick={() => setDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Customer
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4 justify-between">
            <div>
              <CardTitle>Customer Management</CardTitle>
              <CardDescription>
                View and manage your loyal customers
              </CardDescription>
            </div>
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search customers..."
                className="pl-8"
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
                <TableHead>Customer</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Join Date</TableHead>
                <TableHead>Points</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCustomers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    No customers found
                  </TableCell>
                </TableRow>
              ) : (
                filteredCustomers.map((customer) => (
                  <TableRow key={customer.id} className="group">
                    <TableCell className="font-medium">
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary mr-2">
                          <User className="h-4 w-4" />
                        </div>
                        <div>
                          <div>{customer.name}</div>
                          <div className="text-xs text-muted-foreground">
                            {customer.email}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{customer.phone}</TableCell>
                    <TableCell>{customer.joinDate}</TableCell>
                    <TableCell className="font-medium">{customer.totalPoints}</TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          customer.status === "active"
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {customer.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => viewCustomerDetails(customer)}
                          >
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleSendReward(customer)}
                          >
                            <Gift className="mr-2 h-4 w-4" />
                            Send Reward
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
      
      {/* Add Customer Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Customer</DialogTitle>
            <DialogDescription>
              Add a new customer to your loyalty program
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleAddCustomer}>
            <div className="grid gap-4 py-4">
              <div className="grid items-center gap-4">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="grid items-center gap-4">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="grid items-center gap-4">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Add Customer</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      
      {/* Customer Details Dialog */}
      {selectedCustomer && (
        <Dialog open={customerDialogOpen} onOpenChange={setCustomerDialogOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Customer Details</DialogTitle>
              <DialogDescription>
                Detailed information about {selectedCustomer.name}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-6 py-4">
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <BadgeCheck className="h-8 w-8" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">{selectedCustomer.name}</h3>
                  <p className="text-muted-foreground">{selectedCustomer.email}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-lg border p-3">
                  <div className="text-sm text-muted-foreground">Phone</div>
                  <div className="font-medium mt-1">{selectedCustomer.phone}</div>
                </div>
                <div className="rounded-lg border p-3">
                  <div className="text-sm text-muted-foreground">Join Date</div>
                  <div className="font-medium mt-1">{selectedCustomer.joinDate}</div>
                </div>
                <div className="rounded-lg border p-3">
                  <div className="text-sm text-muted-foreground">Total Points</div>
                  <div className="font-medium mt-1">{selectedCustomer.totalPoints}</div>
                </div>
                <div className="rounded-lg border p-3">
                  <div className="text-sm text-muted-foreground">Status</div>
                  <div className="font-medium mt-1 capitalize">{selectedCustomer.status}</div>
                </div>
              </div>
              
              <div className="rounded-lg border p-4">
                <h4 className="font-medium mb-3">Recent Activities</h4>
                <div className="space-y-3">
                  <div className="text-sm">
                    <div className="font-medium">Earned 50 points</div>
                    <div className="text-muted-foreground">Yesterday at 7:30 PM</div>
                  </div>
                  <div className="text-sm">
                    <div className="font-medium">Redeemed 200 points</div>
                    <div className="text-muted-foreground">Apr 15, 2023 at 1:15 PM</div>
                  </div>
                  <div className="text-sm">
                    <div className="font-medium">Earned 100 points</div>
                    <div className="text-muted-foreground">Apr 8, 2023 at 6:45 PM</div>
                  </div>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button onClick={() => handleSendReward(selectedCustomer)}>
                <Gift className="mr-2 h-4 w-4" />
                Send Reward
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

// Label component for the form
const Label = ({ htmlFor, children }: { htmlFor: string; children: React.ReactNode }) => {
  return (
    <label htmlFor={htmlFor} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
      {children}
    </label>
  );
};

export default RestaurantCustomers;
