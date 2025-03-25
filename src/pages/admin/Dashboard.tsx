
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";

const AdminDashboard = () => {
  // Sample data - in a real app this would come from an API
  const restaurantData = [
    {
      name: "Gourmet Bistro",
      active: true,
      customers: 245,
      points: 12450
    },
    {
      name: "Pizza Palace",
      active: true,
      customers: 187,
      points: 9340
    },
    {
      name: "Sushi Heaven",
      active: true,
      customers: 163,
      points: 8150
    },
    {
      name: "Burger Joint",
      active: true,
      customers: 119,
      points: 5950
    },
    {
      name: "Taco Time",
      active: false,
      customers: 97,
      points: 4850
    }
  ];

  const monthlyData = [
    { name: "Jan", users: 30 },
    { name: "Feb", users: 55 },
    { name: "Mar", users: 85 },
    { name: "Apr", users: 132 },
    { name: "May", users: 180 },
    { name: "Jun", users: 220 },
    { name: "Jul", users: 265 },
    { name: "Aug", users: 320 },
    { name: "Sep", users: 350 },
    { name: "Oct", users: 410 },
    { name: "Nov", users: 490 },
    { name: "Dec", users: 520 }
  ];

  const statsCards = [
    {
      title: "Total Restaurants",
      value: "42",
      description: "12 added this month"
    },
    {
      title: "Active Customers",
      value: "8,741",
      description: "↑ 23% from last month"
    },
    {
      title: "Points Issued",
      value: "432,156",
      description: "Across all restaurants"
    },
    {
      title: "Points Redeemed",
      value: "147,832",
      description: "34% redemption rate"
    }
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">Overview of all loyalty program metrics</p>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((card, index) => (
          <Card key={index} className="hover-lift">
            <CardHeader className="pb-2">
              <CardDescription>{card.title}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{card.value}</div>
              <p className="text-sm text-muted-foreground mt-1">{card.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="overflow-hidden">
          <CardHeader>
            <CardTitle>Customer Growth</CardTitle>
            <CardDescription>Monthly new customer registrations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(255, 255, 255, 0.9)",
                      borderRadius: "8px",
                      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                      border: "none",
                    }}
                  />
                  <Bar dataKey="users" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Restaurants</CardTitle>
            <CardDescription>By customer count and points issued</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {restaurantData.map((restaurant, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-accent/40 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      {restaurant.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-medium">
                        {restaurant.name}{" "}
                        {restaurant.active ? (
                          <span className="inline-block ml-2 px-2 py-0.5 text-xs rounded-full bg-green-100 text-green-800">
                            Active
                          </span>
                        ) : (
                          <span className="inline-block ml-2 px-2 py-0.5 text-xs rounded-full bg-gray-100 text-gray-800">
                            Inactive
                          </span>
                        )}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {restaurant.customers} customers
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">{restaurant.points.toLocaleString()}</div>
                    <div className="text-sm text-muted-foreground">Total points</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
