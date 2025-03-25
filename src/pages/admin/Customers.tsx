
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const AdminCustomers = () => {
  // Sample customer data - in a real app this would come from API
  const customers = [
    { id: 1, name: "John Doe", email: "john@example.com", phone: "+1 234 567 890", registeredOn: "2023-01-15" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", phone: "+1 234 567 891", registeredOn: "2023-01-20" },
    { id: 3, name: "Mike Johnson", email: "mike@example.com", phone: "+1 234 567 892", registeredOn: "2023-02-05" },
    { id: 4, name: "Sarah Williams", email: "sarah@example.com", phone: "+1 234 567 893", registeredOn: "2023-02-15" },
    { id: 5, name: "David Brown", email: "david@example.com", phone: "+1 234 567 894", registeredOn: "2023-03-01" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Customers</h2>
        <p className="text-muted-foreground">Manage all customer accounts and their information.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Customer List</CardTitle>
          <CardDescription>
            A list of all customers registered in the system.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Registered On</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {customers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell className="font-medium">{customer.name}</TableCell>
                  <TableCell>{customer.email}</TableCell>
                  <TableCell>{customer.phone}</TableCell>
                  <TableCell>{customer.registeredOn}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminCustomers;
