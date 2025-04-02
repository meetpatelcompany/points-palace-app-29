
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { 
  BarChart3, 
  Users, 
  Store, 
  Image, 
  Menu, 
  X, 
  LogOut,
  Link as LinkIcon
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";

const AdminLayout = () => {
  const { toast } = useToast();
  const location = useLocation();
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  const navItems = [
    { path: "/admin/dashboard", icon: BarChart3, label: "Dashboard" },
    { path: "/admin/restaurants", icon: Store, label: "Restaurants" },
    { path: "/admin/customers", icon: Users, label: "Customers" },
    { path: "/admin/sliders", icon: Image, label: "Manage Content" },
    { path: "/admin/content", icon: LinkIcon, label: "Content Links" }
  ];
  
  const handleLogout = () => {
    // In a real app, you would handle the logout process here
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
  };

  return (
    <div className="min-h-screen flex w-full bg-background overflow-hidden">
      {/* Sidebar */}
      <aside 
        className={`fixed inset-y-0 left-0 z-50 w-64 flex-shrink-0 bg-sidebar text-sidebar-foreground transform transition-all duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:relative md:translate-x-0`}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="h-16 flex items-center justify-between px-4 border-b border-sidebar-border">
            <h1 className="text-xl font-semibold text-white">Loyalty Admin</h1>
            {isMobile && (
              <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(false)}>
                <X className="h-5 w-5 text-sidebar-foreground" />
              </Button>
            )}
          </div>
          
          {/* Nav Links */}
          <nav className="flex-1 py-6 px-4 space-y-1 overflow-y-auto">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center px-3 py-2.5 text-sm font-medium rounded-md transition-all duration-200 ${
                  isActive(item.path)
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-sidebar-foreground/80 hover:bg-sidebar-accent/70 hover:text-sidebar-accent-foreground"
                }`}
              >
                <item.icon className="mr-3 h-5 w-5" />
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>
          
          {/* User Profile & Logout */}
          <div className="p-4 border-t border-sidebar-border">
            <div className="flex items-center">
              <Avatar className="h-9 w-9">
                <AvatarImage src="" alt="Admin" />
                <AvatarFallback className="bg-primary">AD</AvatarFallback>
              </Avatar>
              <div className="ml-3">
                <p className="text-sm font-medium text-sidebar-foreground">Admin User</p>
                <p className="text-xs text-sidebar-foreground/70">admin@loyalty.app</p>
              </div>
            </div>
            <Separator className="my-3 bg-sidebar-border" />
            <Button 
              variant="ghost" 
              className="w-full justify-start text-sidebar-foreground/80 hover:text-sidebar-foreground hover:bg-sidebar-accent/70"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Logout</span>
            </Button>
          </div>
        </div>
      </aside>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Header */}
        <header className="h-16 flex items-center justify-between px-6 border-b border-border bg-background">
          {isMobile && (
            <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(true)}>
              <Menu className="h-5 w-5" />
            </Button>
          )}
          <div className={`${!isMobile ? 'ml-auto' : ''}`}>
            <p className="text-sm text-muted-foreground">
              Welcome back, <span className="font-medium text-foreground">Admin</span>
            </p>
          </div>
        </header>
        
        {/* Page Content */}
        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>
      
      {/* Mobile overlay */}
      {sidebarOpen && isMobile && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default AdminLayout;
