
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Loader2, Search } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const AdminCustomers = () => {
  const { toast } = useToast();
  const [customers, setCustomers] = useState<any[]>([]);
  const [filteredCustomers, setFilteredCustomers] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        setLoading(true);
        
        // First get all profiles with role 'customer'
        const { data: profiles, error: profilesError } = await supabase
          .from('profiles')
          .select('id, username, full_name, created_at')
          .eq('role', 'customer');
        
        if (profilesError) throw profilesError;
        
        if (!profiles || profiles.length === 0) {
          setCustomers([]);
          setFilteredCustomers([]);
          return;
        }
        
        // For each customer, get their card info
        const customerData = await Promise.all(
          profiles.map(async (profile) => {
            // Get count of cards
            const { count: cardCount, error: cardError } = await supabase
              .from('customer_cards')
              .select('*', { count: 'exact', head: true })
              .eq('customer_id', profile.id);
            
            if (cardError) {
              console.error("Error fetching card count:", cardError);
              return {
                ...profile,
                cards: 0,
                totalPoints: 0
              };
            }
            
            // Get total points
            const { data: pointsData, error: pointsError } = await supabase
              .from('customer_cards')
              .select('points')
              .eq('customer_id', profile.id);
            
            if (pointsError) {
              console.error("Error fetching points:", pointsError);
              return {
                ...profile,
                cards: cardCount || 0,
                totalPoints: 0
              };
            }
            
            const totalPoints = pointsData?.reduce((sum, card) => sum + card.points, 0) || 0;
            
            return {
              ...profile,
              cards: cardCount || 0,
              totalPoints
            };
          })
        );
        
        setCustomers(customerData);
        setFilteredCustomers(customerData);
      } catch (error) {
        console.error("Error fetching customers:", error);
        toast({
          title: "Error",
          description: "Failed to load customer data. Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchCustomers();
  }, [toast]);
  
  // Filter customers based on search query
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredCustomers(customers);
      return;
    }
    
    const lowercaseQuery = searchQuery.toLowerCase().trim();
    const filtered = customers.filter(
      (customer) =>
        customer.username.toLowerCase().includes(lowercaseQuery) ||
        (customer.full_name && customer.full_name.toLowerCase().includes(lowercaseQuery))
    );
    
    setFilteredCustomers(filtered);
  }, [searchQuery, customers]);
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Customers</h2>
        <p className="text-muted-foreground">Manage all customer accounts and their information.</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <CardTitle>Customer List</CardTitle>
              <CardDescription>
                A list of all customers registered in the system.
              </CardDescription>
            </div>
            <div className="w-full sm:w-64 relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search customers..."
                value={searchQuery}
                onChange={handleSearch}
                className="pl-8"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-10">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <span className="ml-2 text-muted-foreground">Loading customers...</span>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Username</TableHead>
                  <TableHead>Cards</TableHead>
                  <TableHead>Total Points</TableHead>
                  <TableHead>Registered On</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCustomers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                      {searchQuery.trim() !== "" ? "No customers found matching your search" : "No customers registered yet"}
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredCustomers.map((customer) => (
                    <TableRow key={customer.id}>
                      <TableCell className="font-medium">{customer.full_name || "N/A"}</TableCell>
                      <TableCell>{customer.username}</TableCell>
                      <TableCell>{customer.cards}</TableCell>
                      <TableCell>{customer.totalPoints.toLocaleString()}</TableCell>
                      <TableCell>{formatDate(customer.created_at)}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminCustomers;
