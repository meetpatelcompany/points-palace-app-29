
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
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { 
  CreditCard, 
  Plus, 
  Edit, 
  Trash, 
  Gift, 
  Settings, 
  Calendar, 
  Save
} from "lucide-react";

interface Offer {
  id: number;
  title: string;
  description: string;
  pointsRequired: number;
  active: boolean;
  expiryDate?: string;
}

interface PointsRule {
  id: number;
  rule: string;
  points: number;
}

// Sample data for the offers
const initialOffers = [
  { 
    id: 1, 
    title: "Free Dessert", 
    description: "Redeem for a free dessert of your choice with any meal purchase", 
    pointsRequired: 150, 
    active: true,
    expiryDate: "2024-06-30"
  },
  { 
    id: 2, 
    title: "10% Off Your Bill", 
    description: "Get 10% off your total bill", 
    pointsRequired: 250, 
    active: true,
    expiryDate: "2024-07-15" 
  },
  { 
    id: 3, 
    title: "Free Appetizer", 
    description: "Enjoy a free appetizer with your meal", 
    pointsRequired: 200, 
    active: true 
  },
  { 
    id: 4, 
    title: "Priority Seating", 
    description: "Skip the line with priority seating", 
    pointsRequired: 300, 
    active: false,
    expiryDate: "2024-05-31" 
  },
];

// Sample data for the points rules
const initialPointsRules = [
  { id: 1, rule: "Every $1 spent", points: 1 },
  { id: 2, rule: "First visit of the month", points: 50 },
  { id: 3, rule: "Birthday visit", points: 100 },
  { id: 4, rule: "Referring a friend", points: 75 },
];

const RestaurantPoints = () => {
  const { toast } = useToast();
  const [offers, setOffers] = useState<Offer[]>(initialOffers);
  const [pointsRules, setPointsRules] = useState<PointsRule[]>(initialPointsRules);
  const [redemptionThreshold, setRedemptionThreshold] = useState<number[]>([500]);
  
  // Dialog states
  const [offerDialogOpen, setOfferDialogOpen] = useState(false);
  const [ruleDialogOpen, setRuleDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [currentOffer, setCurrentOffer] = useState<Offer | null>(null);
  const [currentRule, setCurrentRule] = useState<PointsRule | null>(null);
  const [deleteType, setDeleteType] = useState<"offer" | "rule">("offer");
  const [deleteId, setDeleteId] = useState<number | null>(null);

  // Form states
  const [offerForm, setOfferForm] = useState({
    title: "",
    description: "",
    pointsRequired: 100,
    active: true,
    expiryDate: ""
  });
  
  const [ruleForm, setRuleForm] = useState({
    rule: "",
    points: 1
  });

  // Handlers for offers
  const openAddOfferDialog = () => {
    setCurrentOffer(null);
    setOfferForm({
      title: "",
      description: "",
      pointsRequired: 100,
      active: true,
      expiryDate: ""
    });
    setOfferDialogOpen(true);
  };
  
  const openEditOfferDialog = (offer: Offer) => {
    setCurrentOffer(offer);
    setOfferForm({
      title: offer.title,
      description: offer.description,
      pointsRequired: offer.pointsRequired,
      active: offer.active,
      expiryDate: offer.expiryDate || ""
    });
    setOfferDialogOpen(true);
  };
  
  const handleOfferFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    
    setOfferForm(prev => ({
      ...prev,
      [name]: type === "number" ? parseInt(value) : value
    }));
  };
  
  const handleOfferSwitchChange = (checked: boolean) => {
    setOfferForm(prev => ({
      ...prev,
      active: checked
    }));
  };
  
  const handleOfferSubmit = () => {
    if (offerForm.title.trim() === "" || offerForm.description.trim() === "") {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }
    
    if (currentOffer) {
      // Update existing offer
      const updatedOffers = offers.map(offer => 
        offer.id === currentOffer.id
          ? {
              ...offer,
              title: offerForm.title,
              description: offerForm.description,
              pointsRequired: offerForm.pointsRequired,
              active: offerForm.active,
              expiryDate: offerForm.expiryDate || undefined
            }
          : offer
      );
      
      setOffers(updatedOffers);
      toast({
        title: "Offer updated",
        description: "The offer has been updated successfully"
      });
    } else {
      // Create new offer
      const newOffer: Offer = {
        id: Date.now(),
        title: offerForm.title,
        description: offerForm.description,
        pointsRequired: offerForm.pointsRequired,
        active: offerForm.active,
        expiryDate: offerForm.expiryDate || undefined
      };
      
      setOffers([...offers, newOffer]);
      toast({
        title: "Offer created",
        description: "New offer has been created successfully"
      });
    }
    
    setOfferDialogOpen(false);
  };
  
  // Handlers for points rules
  const openAddRuleDialog = () => {
    setCurrentRule(null);
    setRuleForm({
      rule: "",
      points: 1
    });
    setRuleDialogOpen(true);
  };
  
  const openEditRuleDialog = (rule: PointsRule) => {
    setCurrentRule(rule);
    setRuleForm({
      rule: rule.rule,
      points: rule.points
    });
    setRuleDialogOpen(true);
  };
  
  const handleRuleFormChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value, type } = e.target;
    
    setRuleForm(prev => ({
      ...prev,
      [name]: type === "number" ? parseInt(value) : value
    }));
  };
  
  const handleRuleSubmit = () => {
    if (ruleForm.rule.trim() === "") {
      toast({
        title: "Validation Error",
        description: "Please enter a rule description",
        variant: "destructive"
      });
      return;
    }
    
    if (currentRule) {
      // Update existing rule
      const updatedRules = pointsRules.map(rule => 
        rule.id === currentRule.id
          ? {
              ...rule,
              rule: ruleForm.rule,
              points: ruleForm.points
            }
          : rule
      );
      
      setPointsRules(updatedRules);
      toast({
        title: "Rule updated",
        description: "The points rule has been updated successfully"
      });
    } else {
      // Create new rule
      const newRule: PointsRule = {
        id: Date.now(),
        rule: ruleForm.rule,
        points: ruleForm.points
      };
      
      setPointsRules([...pointsRules, newRule]);
      toast({
        title: "Rule created",
        description: "New points rule has been created successfully"
      });
    }
    
    setRuleDialogOpen(false);
  };
  
  // Delete handlers
  const confirmDelete = (id: number, type: "offer" | "rule") => {
    setDeleteId(id);
    setDeleteType(type);
    setDeleteDialogOpen(true);
  };
  
  const handleDelete = () => {
    if (deleteType === "offer") {
      setOffers(offers.filter(offer => offer.id !== deleteId));
      toast({
        title: "Offer deleted",
        description: "The offer has been deleted successfully"
      });
    } else {
      setPointsRules(pointsRules.filter(rule => rule.id !== deleteId));
      toast({
        title: "Rule deleted",
        description: "The points rule has been deleted successfully"
      });
    }
    
    setDeleteDialogOpen(false);
  };
  
  // Save threshold
  const handleSaveThreshold = () => {
    toast({
      title: "Threshold updated",
      description: `Points threshold has been set to ${redemptionThreshold[0]} points`
    });
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Points Management</h2>
          <p className="text-muted-foreground">
            Configure offers and points rules for your loyalty program
          </p>
        </div>
      </div>
      
      <Tabs defaultValue="offers">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="offers">Offers & Rewards</TabsTrigger>
          <TabsTrigger value="rules">Points Rules</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        
        {/* Offers Tab */}
        <TabsContent value="offers" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div>
                <CardTitle>Offers & Rewards</CardTitle>
                <CardDescription>
                  Create and manage rewards that customers can redeem with points
                </CardDescription>
              </div>
              <Button onClick={openAddOfferDialog}>
                <Plus className="mr-2 h-4 w-4" />
                Add Offer
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {offers.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <Gift className="mx-auto h-12 w-12 opacity-20 mb-2" />
                    <p>No offers created yet</p>
                    <Button 
                      variant="outline" 
                      className="mt-4"
                      onClick={openAddOfferDialog}
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Create your first offer
                    </Button>
                  </div>
                ) : (
                  offers.map(offer => (
                    <Card key={offer.id} className={offer.active ? "border-primary/20" : "border-muted opacity-70"}>
                      <CardContent className="p-4">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <h3 className="font-medium">{offer.title}</h3>
                              {!offer.active && (
                                <span className="text-xs bg-muted px-2 py-0.5 rounded-full">
                                  Inactive
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">
                              {offer.description}
                            </p>
                            <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2">
                              <div className="flex items-center text-sm text-muted-foreground">
                                <CreditCard className="h-3.5 w-3.5 mr-1 text-primary/70" />
                                <span>{offer.pointsRequired} points</span>
                              </div>
                              {offer.expiryDate && (
                                <div className="flex items-center text-sm text-muted-foreground">
                                  <Calendar className="h-3.5 w-3.5 mr-1 text-primary/70" />
                                  <span>Expires: {new Date(offer.expiryDate).toLocaleDateString()}</span>
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="flex gap-2 self-end sm:self-auto">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => openEditOfferDialog(offer)}
                            >
                              <Edit className="h-4 w-4 mr-1" />
                              Edit
                            </Button>
                            <Button 
                              variant="destructive" 
                              size="sm"
                              onClick={() => confirmDelete(offer.id, "offer")}
                            >
                              <Trash className="h-4 w-4 mr-1" />
                              Delete
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Points Rules Tab */}
        <TabsContent value="rules" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div>
                <CardTitle>Points Rules</CardTitle>
                <CardDescription>
                  Configure how customers earn points at your restaurant
                </CardDescription>
              </div>
              <Button onClick={openAddRuleDialog}>
                <Plus className="mr-2 h-4 w-4" />
                Add Rule
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pointsRules.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <Settings className="mx-auto h-12 w-12 opacity-20 mb-2" />
                    <p>No points rules created yet</p>
                    <Button 
                      variant="outline" 
                      className="mt-4"
                      onClick={openAddRuleDialog}
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Create your first rule
                    </Button>
                  </div>
                ) : (
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left pb-2 font-medium">Rule</th>
                        <th className="text-right pb-2 font-medium">Points</th>
                        <th className="text-right pb-2 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pointsRules.map(rule => (
                        <tr key={rule.id} className="border-b">
                          <td className="py-3">{rule.rule}</td>
                          <td className="py-3 text-right">
                            <span className="font-medium">{rule.points}</span> points
                          </td>
                          <td className="py-3 text-right">
                            <div className="flex justify-end gap-2">
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => openEditRuleDialog(rule)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                className="text-destructive hover:text-destructive/90 hover:bg-destructive/10"
                                onClick={() => confirmDelete(rule.id, "rule")}
                              >
                                <Trash className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Settings Tab */}
        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Points Settings</CardTitle>
              <CardDescription>
                Configure general settings for your loyalty program
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium mb-2">Redemption Threshold</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Set the minimum number of points customers need to earn before they can redeem rewards
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Current threshold: {redemptionThreshold[0]} points</span>
                    </div>
                    <Slider
                      value={redemptionThreshold}
                      onValueChange={setRedemptionThreshold}
                      max={1000}
                      step={50}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>0</span>
                      <span>250</span>
                      <span>500</span>
                      <span>750</span>
                      <span>1000</span>
                    </div>
                  </div>
                </div>
                
                <div className="pt-4">
                  <Button onClick={handleSaveThreshold}>
                    <Save className="mr-2 h-4 w-4" />
                    Save Settings
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Offer Dialog */}
      <Dialog open={offerDialogOpen} onOpenChange={setOfferDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>
              {currentOffer ? "Edit Offer" : "Create New Offer"}
            </DialogTitle>
            <DialogDescription>
              {currentOffer 
                ? "Modify the details of this reward offer" 
                : "Create a new reward that customers can redeem with points"
              }
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="offer-title">Offer Title</Label>
              <Input
                id="offer-title"
                name="title"
                placeholder="e.g., Free Dessert"
                value={offerForm.title}
                onChange={handleOfferFormChange}
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="offer-description">Description</Label>
              <Textarea
                id="offer-description"
                name="description"
                placeholder="Describe what customers will receive with this offer"
                value={offerForm.description}
                onChange={handleOfferFormChange}
                rows={3}
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="points-required">Points Required</Label>
              <Input
                id="points-required"
                name="pointsRequired"
                type="number"
                min={1}
                value={offerForm.pointsRequired}
                onChange={handleOfferFormChange}
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="expiry-date">Expiry Date (Optional)</Label>
              <Input
                id="expiry-date"
                name="expiryDate"
                type="date"
                value={offerForm.expiryDate}
                onChange={handleOfferFormChange}
              />
            </div>
            
            <div className="flex items-center space-x-2 pt-2">
              <Switch
                id="offer-active"
                checked={offerForm.active}
                onCheckedChange={handleOfferSwitchChange}
              />
              <Label htmlFor="offer-active">Active</Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOfferDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleOfferSubmit}>
              {currentOffer ? "Save Changes" : "Create Offer"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Rule Dialog */}
      <Dialog open={ruleDialogOpen} onOpenChange={setRuleDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {currentRule ? "Edit Points Rule" : "Create Points Rule"}
            </DialogTitle>
            <DialogDescription>
              {currentRule 
                ? "Modify how customers earn points" 
                : "Define a new way for customers to earn points"
              }
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="rule-description">Rule Description</Label>
              <Input
                id="rule-description"
                name="rule"
                placeholder="e.g., Every $1 spent"
                value={ruleForm.rule}
                onChange={handleRuleFormChange}
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="points-awarded">Points Awarded</Label>
              <Input
                id="points-awarded"
                name="points"
                type="number"
                min={1}
                value={ruleForm.points}
                onChange={handleRuleFormChange}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setRuleDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleRuleSubmit}>
              {currentRule ? "Save Changes" : "Create Rule"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this {deleteType === "offer" ? "offer" : "points rule"}? 
              This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
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

export default RestaurantPoints;
