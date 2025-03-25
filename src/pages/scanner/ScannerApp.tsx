
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { QrCode, UserCircle, Scan, Plus, Minus, RotateCcw, ArrowRight, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Sample customer data (in a real app this would come from an API)
const customers = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    points: 750,
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "+1 (555) 234-5678",
    points: 1250,
  },
  {
    id: 3,
    name: "Michael Brown",
    email: "michael.brown@example.com",
    phone: "+1 (555) 345-6789",
    points: 950,
  },
  {
    id: 4,
    name: "Emily Wilson",
    email: "emily.wilson@example.com",
    phone: "+1 (555) 456-7890",
    points: 450,
  },
];

const ScannerApp = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("scan");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [pointsValue, setPointsValue] = useState("50");
  const [transactionType, setTransactionType] = useState<"add" | "redeem">("add");
  const [customer, setCustomer] = useState<any>(null);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [successDialogOpen, setSuccessDialogOpen] = useState(false);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // This would scan a QR code in a real app using a library like jsQR
  const handleScan = () => {
    // Simulate scanning a QR code containing a phone number
    const scannedPhone = "+1 (555) 123-4567"; // This would be from the actual scan
    findCustomerByPhone(scannedPhone);
  };
  
  const findCustomerByPhone = (phone: string) => {
    const foundCustomer = customers.find((c) => c.phone === phone);
    
    if (foundCustomer) {
      setCustomer(foundCustomer);
    } else {
      toast({
        title: "Customer not found",
        description: "No customer found with that phone number.",
        variant: "destructive",
      });
    }
  };
  
  const handleLookup = () => {
    if (phoneNumber.trim() === "") {
      toast({
        title: "Phone number required",
        description: "Please enter a valid phone number.",
        variant: "destructive",
      });
      return;
    }
    
    findCustomerByPhone(phoneNumber);
  };
  
  const handleConfirmTransaction = () => {
    setConfirmDialogOpen(true);
  };
  
  const processTransaction = () => {
    setConfirmDialogOpen(false);
    
    // In a real app, you would call an API to update the points
    const points = parseInt(pointsValue);
    
    setSuccessDialogOpen(true);
    
    // Reset after transaction
    setTimeout(() => {
      setSuccessDialogOpen(false);
      setCustomer(null);
      setPhoneNumber("");
      setPointsValue("50");
    }, 3000);
  };
  
  const resetTransaction = () => {
    setCustomer(null);
    setPhoneNumber("");
    setPointsValue("50");
  };
  
  // Camera handling for QR code scanning (simplified implementation)
  useEffect(() => {
    let stream: MediaStream | null = null;
    
    const setupCamera = async () => {
      if (isCameraActive && videoRef.current) {
        try {
          stream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: "environment" },
            audio: false,
          });
          
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        } catch (err) {
          console.error("Error accessing camera:", err);
          toast({
            title: "Camera Error",
            description: "Unable to access camera. Please check permissions.",
            variant: "destructive",
          });
        }
      }
    };
    
    if (activeTab === "scan") {
      setIsCameraActive(true);
      setupCamera();
    } else {
      setIsCameraActive(false);
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    }
    
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [activeTab, isCameraActive, toast]);

  return (
    <div className="container mx-auto max-w-md animate-fade-in">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-center">Point Scanner</CardTitle>
          <CardDescription className="text-center">
            Scan QR codes or enter phone numbers to add or redeem points
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-2 mb-6">
              <TabsTrigger value="scan">
                <QrCode className="mr-2 h-4 w-4" />
                Scan QR
              </TabsTrigger>
              <TabsTrigger value="phone">
                <UserCircle className="mr-2 h-4 w-4" />
                Phone Lookup
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="scan" className="mt-0">
              <div className="flex flex-col items-center space-y-4">
                <div className="relative w-full aspect-square bg-muted rounded-lg overflow-hidden">
                  {isCameraActive ? (
                    <>
                      <video
                        ref={videoRef}
                        className="absolute inset-0 w-full h-full object-cover"
                        autoPlay
                        playsInline
                        muted
                      />
                      <canvas
                        ref={canvasRef}
                        className="absolute inset-0 w-full h-full"
                        style={{ display: "none" }}
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-3/4 h-3/4 border-2 border-primary rounded-lg border-opacity-50"></div>
                      </div>
                    </>
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Scan className="h-16 w-16 text-muted-foreground/50" />
                    </div>
                  )}
                </div>
                
                <Button className="w-full" onClick={handleScan}>
                  <Scan className="mr-2 h-4 w-4" />
                  Scan QR Code
                </Button>
                
                <p className="text-sm text-muted-foreground text-center">
                  Position the QR code within the scanning area
                </p>
              </div>
            </TabsContent>
            
            <TabsContent value="phone" className="mt-0">
              <div className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    placeholder="Enter customer's phone number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>
                
                <Button className="w-full" onClick={handleLookup}>
                  <ArrowRight className="mr-2 h-4 w-4" />
                  Look Up Customer
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      
      {customer && (
        <Card className="mb-6 animate-fade-in">
          <CardHeader>
            <CardTitle className="text-lg">Customer Found</CardTitle>
            <CardDescription>
              Manage points for this customer
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mr-3">
                  <UserCircle className="h-6 w-6" />
                </div>
                <div>
                  <div className="font-medium">{customer.name}</div>
                  <div className="text-sm text-muted-foreground">{customer.phone}</div>
                </div>
              </div>
              
              <div className="bg-muted p-4 rounded-lg flex justify-between items-center">
                <div className="text-sm text-muted-foreground">Current Points</div>
                <div className="text-2xl font-bold">{customer.points}</div>
              </div>
              
              <div className="grid gap-2">
                <div className="flex justify-between">
                  <Label htmlFor="points">Points to {transactionType === "add" ? "Add" : "Redeem"}</Label>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 w-8 rounded-full p-0"
                      onClick={() => setTransactionType("add")}
                      disabled={transactionType === "add"}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 w-8 rounded-full p-0"
                      onClick={() => setTransactionType("redeem")}
                      disabled={transactionType === "redeem"}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <Input
                  id="points"
                  type="number"
                  value={pointsValue}
                  onChange={(e) => setPointsValue(e.target.value)}
                  min="1"
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={resetTransaction}>
              <RotateCcw className="mr-2 h-4 w-4" />
              Reset
            </Button>
            <Button onClick={handleConfirmTransaction}>
              {transactionType === "add" ? "Add Points" : "Redeem Points"}
            </Button>
          </CardFooter>
        </Card>
      )}
      
      {/* Confirmation Dialog */}
      <Dialog open={confirmDialogOpen} onOpenChange={setConfirmDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirm Transaction</DialogTitle>
            <DialogDescription>
              Please review the details before confirming
            </DialogDescription>
          </DialogHeader>
          
          {customer && (
            <div className="py-4 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-sm text-muted-foreground">Customer</div>
                <div className="font-medium">{customer.name}</div>
                
                <div className="text-sm text-muted-foreground">Transaction Type</div>
                <div className="font-medium capitalize">{transactionType} Points</div>
                
                <div className="text-sm text-muted-foreground">Points Amount</div>
                <div className="font-medium">{pointsValue}</div>
                
                <div className="text-sm text-muted-foreground">Current Points</div>
                <div className="font-medium">{customer.points}</div>
                
                <div className="text-sm text-muted-foreground">New Balance</div>
                <div className="font-bold">
                  {transactionType === "add"
                    ? customer.points + parseInt(pointsValue)
                    : customer.points - parseInt(pointsValue)}
                </div>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirmDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={processTransaction}>Confirm</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Success Dialog */}
      <Dialog open={successDialogOpen} onOpenChange={setSuccessDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <div className="py-8 text-center">
            <div className="mx-auto h-12 w-12 rounded-full bg-green-100 flex items-center justify-center text-green-500 mb-4">
              <Check className="h-6 w-6" />
            </div>
            <DialogTitle className="mb-2">Transaction Complete</DialogTitle>
            <DialogDescription>
              {transactionType === "add"
                ? `${pointsValue} points have been added`
                : `${pointsValue} points have been redeemed`}
            </DialogDescription>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ScannerApp;
