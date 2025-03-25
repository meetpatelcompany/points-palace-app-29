
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("customer");
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    // Admin default credentials check
    if (userType === "admin") {
      if (email === "admin@gmail.com" && password === "admin") {
        toast({
          title: "Logged in as Admin",
          description: "Welcome to the admin dashboard.",
        });
        navigate("/admin/dashboard");
        return;
      } else {
        setError("Invalid admin credentials");
        return;
      }
    }
    
    // For restaurant and scanner logins, we would check against admin-created credentials
    // In a real app, this would verify against a database
    if (userType === "restaurant" || userType === "scanner") {
      // This is just a placeholder. In a real app, you would validate against actual credentials
      toast({
        title: "Authentication required",
        description: `${userType === "restaurant" ? "Restaurant" : "Scanner"} accounts must be created by an admin.`,
      });
      
      // For demo purposes, we'll still allow login
      let redirectPath = userType === "restaurant" ? "/restaurant/dashboard" : "/scanner";
      navigate(redirectPath);
      return;
    }
    
    // Customer login - in a real app, this would check against registered customers
    if (userType === "customer") {
      toast({
        title: "Logged in",
        description: "Welcome to your loyalty cards.",
      });
      navigate("/customer/home");
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4">
      <Link to="/" className="mb-8 text-2xl font-bold text-primary">
        Loyalty App
      </Link>
      
      <Card className="w-full max-w-md animate-fade-in">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Welcome back</CardTitle>
          <CardDescription className="text-center">
            Sign in to your account to continue
          </CardDescription>
        </CardHeader>
        
        <Tabs defaultValue="customer" className="w-full" onValueChange={setUserType}>
          <TabsList className="grid grid-cols-4 mb-4 mx-4">
            <TabsTrigger value="customer">Customer</TabsTrigger>
            <TabsTrigger value="admin">Admin</TabsTrigger>
            <TabsTrigger value="restaurant">Restaurant</TabsTrigger>
            <TabsTrigger value="scanner">Scanner</TabsTrigger>
          </TabsList>
          
          {error && (
            <div className="mx-6 mb-2 p-2 bg-destructive/10 text-destructive text-sm rounded-md">
              {error}
            </div>
          )}
          
          <TabsContent value="customer">
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="your@email.com" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Link to="#" className="text-xs text-primary hover:underline">
                      Forgot password?
                    </Link>
                  </div>
                  <Input 
                    id="password" 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full">Sign in</Button>
              </form>
            </CardContent>
          </TabsContent>
          
          <TabsContent value="admin">
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="admin-email">Admin Email</Label>
                  <Input 
                    id="admin-email" 
                    type="email" 
                    placeholder="admin@gmail.com" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="admin-password">Password</Label>
                  <Input 
                    id="admin-password" 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full">Sign in as Admin</Button>
              </form>
            </CardContent>
          </TabsContent>
          
          <TabsContent value="restaurant">
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="restaurant-email">Restaurant Email</Label>
                  <Input 
                    id="restaurant-email" 
                    type="email" 
                    placeholder="restaurant@example.com" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="restaurant-password">Password</Label>
                  <Input 
                    id="restaurant-password" 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full">Sign in as Restaurant</Button>
              </form>
            </CardContent>
          </TabsContent>
          
          <TabsContent value="scanner">
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="scanner-email">Scanner Email</Label>
                  <Input 
                    id="scanner-email" 
                    type="email" 
                    placeholder="scanner@restaurant.com" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="scanner-password">Password</Label>
                  <Input 
                    id="scanner-password" 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full">Sign in as Scanner</Button>
              </form>
            </CardContent>
          </TabsContent>
        </Tabs>
        
        <CardFooter className="flex flex-col space-y-4 mt-4">
          <div className="text-sm text-center text-muted-foreground">
            {userType === "customer" ? (
              <>
                Don't have an account?{" "}
                <Link to="/register" className="text-primary hover:underline">
                  Sign up
                </Link>
              </>
            ) : (
              <>
                {userType === "admin" ? 
                  "Admin accounts are pre-configured." : 
                  `${userType === "restaurant" ? "Restaurant" : "Scanner"} accounts must be created by an admin.`
                }
              </>
            )}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
