import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  CreditCard, 
  Smartphone, 
  Calendar,
  TrendingUp,
  Shield,
  CheckCircle,
  Calculator,
  Banknote,
  Clock
} from "lucide-react";
import { Link } from "react-router-dom";

const Financing = () => {
  const [selectedKit, setSelectedKit] = useState("standard");
  const [paymentPlan, setPaymentPlan] = useState("weekly");
  const [downPayment, setDownPayment] = useState(10000);

  const solarKits = {
    basic: {
      name: "Basic Kit",
      price: 45000,
      capacity: "100W Solar Panel + 100Ah Battery",
      suitable: "1-2 rooms, basic lighting & phone charging",
      daily: 150,
      weekly: 1000,
      monthly: 4000
    },
    standard: {
      name: "Standard Kit", 
      price: 85000,
      capacity: "200W Solar Panel + 200Ah Battery",
      suitable: "3-4 rooms, lighting, fans, TV, phone charging",
      daily: 280,
      weekly: 1900,
      monthly: 7500
    },
    premium: {
      name: "Premium Kit",
      price: 150000,
      capacity: "400W Solar Panel + 400Ah Battery", 
      suitable: "5+ rooms, all appliances, small refrigerator",
      daily: 500,
      weekly: 3300,
      monthly: 13000
    },
    enterprise: {
      name: "Enterprise Kit",
      price: 220000,
      capacity: "600W Solar Panel + 600Ah Battery",
      suitable: "Clinics, schools, large homes, medical equipment",
      daily: 730,
      weekly: 4800,
      monthly: 18500
    }
  };

  const paymentMethods = [
    {
      icon: <Smartphone className="h-6 w-6" />,
      name: "Mobile Money",
      description: "MTN, Airtel, 9mobile, Glo",
      fee: "2% transaction fee"
    },
    {
      icon: <CreditCard className="h-6 w-6" />,
      name: "Bank Transfer",
      description: "Direct bank transfer",
      fee: "No additional fees"
    },
    {
      icon: <Banknote className="h-6 w-6" />,
      name: "Cash Deposit",
      description: "Via local agents",
      fee: "1% handling fee"
    }
  ];

  const calculatePayment = (kitPrice: number, planType: string) => {
    const kit = solarKits[selectedKit as keyof typeof solarKits];
    const remainingAmount = kitPrice - downPayment;
    const interestRate = 0.05; // 5% total interest
    const totalWithInterest = remainingAmount * (1 + interestRate);
    
    switch(planType) {
      case 'daily':
        return Math.round(totalWithInterest / 365);
      case 'weekly':
        return Math.round(totalWithInterest / 52);
      case 'monthly':
        return Math.round(totalWithInterest / 12);
      default:
        return kit[planType as keyof typeof kit] as number;
    }
  };

  const selectedKitData = solarKits[selectedKit as keyof typeof solarKits];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/5 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Flexible Solar Financing</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Pay-as-you-go plans that work with your budget. Start with as little as ₦150 per day.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Kit Selection */}
          <div className="lg:col-span-2">
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="h-5 w-5" />
                  Choose Your Solar Kit
                </CardTitle>
                <CardDescription>Select the kit that best fits your energy needs</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {Object.entries(solarKits).map(([key, kit]) => (
                    <Card 
                      key={key}
                      className={`cursor-pointer border-2 transition-all ${
                        selectedKit === key 
                          ? 'border-primary shadow-lg' 
                          : 'border-border hover:border-primary/50'
                      }`}
                      onClick={() => setSelectedKit(key)}
                    >
                      <CardHeader className="pb-3">
                        <div className="flex justify-between items-center">
                          <CardTitle className="text-lg">{kit.name}</CardTitle>
                          {selectedKit === key && <CheckCircle className="h-5 w-5 text-primary" />}
                        </div>
                        <Badge variant="secondary" className="w-fit">₦{kit.price.toLocaleString()}</Badge>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <p className="text-sm font-medium">{kit.capacity}</p>
                        <p className="text-xs text-muted-foreground">{kit.suitable}</p>
                        <div className="pt-2 space-y-1">
                          <div className="flex justify-between text-xs">
                            <span>Daily:</span>
                            <span className="font-medium">₦{kit.daily}</span>
                          </div>
                          <div className="flex justify-between text-xs">
                            <span>Weekly:</span>
                            <span className="font-medium">₦{kit.weekly}</span>
                          </div>
                          <div className="flex justify-between text-xs">
                            <span>Monthly:</span>
                            <span className="font-medium">₦{kit.monthly}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Payment Plans */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Payment Schedule
                </CardTitle>
                <CardDescription>Choose how often you'd like to make payments</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs value={paymentPlan} onValueChange={setPaymentPlan}>
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="daily">Daily</TabsTrigger>
                    <TabsTrigger value="weekly">Weekly</TabsTrigger>
                    <TabsTrigger value="monthly">Monthly</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="daily" className="mt-6">
                    <div className="text-center p-6 bg-primary/5 rounded-lg">
                      <h3 className="text-2xl font-bold text-primary mb-2">
                        ₦{selectedKitData.daily}/day
                      </h3>
                      <p className="text-muted-foreground">Perfect for daily income earners</p>
                      <Badge variant="secondary" className="mt-2">365 payments</Badge>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="weekly" className="mt-6">
                    <div className="text-center p-6 bg-secondary/10 rounded-lg">
                      <h3 className="text-2xl font-bold text-secondary mb-2">
                        ₦{selectedKitData.weekly}/week
                      </h3>
                      <p className="text-muted-foreground">Great for weekly budgeting</p>
                      <Badge variant="secondary" className="mt-2">52 payments</Badge>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="monthly" className="mt-6">
                    <div className="text-center p-6 bg-accent/10 rounded-lg">
                      <h3 className="text-2xl font-bold text-accent mb-2">
                        ₦{selectedKitData.monthly}/month
                      </h3>
                      <p className="text-muted-foreground">Lowest payment frequency</p>
                      <Badge variant="secondary" className="mt-2">12 payments</Badge>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Payment Summary & Methods */}
          <div className="space-y-6">
            {/* Payment Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Payment Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Kit Price:</span>
                    <span className="font-medium">₦{selectedKitData.price.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Down Payment:</span>
                    <span className="font-medium text-success">₦{downPayment.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Remaining Balance:</span>
                    <span className="font-medium">₦{(selectedKitData.price - downPayment).toLocaleString()}</span>
                  </div>
                  <div className="border-t pt-3">
                    <div className="flex justify-between">
                      <span className="font-medium">
                        {paymentPlan.charAt(0).toUpperCase() + paymentPlan.slice(1)} Payment:
                      </span>
                      <span className="font-bold text-primary">
                        ₦{selectedKitData[paymentPlan as keyof typeof selectedKitData].toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="pt-4">
                  <Label htmlFor="downpayment">Adjust Down Payment</Label>
                  <Input
                    id="downpayment"
                    type="number"
                    min="5000"
                    max={selectedKitData.price * 0.5}
                    step="1000"
                    value={downPayment}
                    onChange={(e) => setDownPayment(parseInt(e.target.value) || 5000)}
                    className="mt-2"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Min: ₦5,000 | Max: ₦{(selectedKitData.price * 0.5).toLocaleString()}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Payment Methods */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Payment Methods
                </CardTitle>
                <CardDescription>Choose your preferred payment method</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {paymentMethods.map((method, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-muted/50">
                    <div className="text-primary">{method.icon}</div>
                    <div className="flex-1">
                      <div className="font-medium">{method.name}</div>
                      <div className="text-xs text-muted-foreground">{method.description}</div>
                    </div>
                    <Badge variant="outline" className="text-xs">{method.fee}</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Benefits */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Why Choose PAYG?
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start space-x-2">
                  <CheckCircle className="h-4 w-4 text-success mt-0.5" />
                  <div className="text-sm">
                    <div className="font-medium">No Credit Check</div>
                    <div className="text-muted-foreground">Start using immediately</div>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle className="h-4 w-4 text-success mt-0.5" />
                  <div className="text-sm">
                    <div className="font-medium">Remote Monitoring</div>
                    <div className="text-muted-foreground">Performance tracking & support</div>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle className="h-4 w-4 text-success mt-0.5" />
                  <div className="text-sm">
                    <div className="font-medium">Flexible Payments</div>
                    <div className="text-muted-foreground">Skip payments if needed</div>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle className="h-4 w-4 text-success mt-0.5" />
                  <div className="text-sm">
                    <div className="font-medium">Full Ownership</div>
                    <div className="text-muted-foreground">After completing payments</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* CTA */}
            <Link to="/order">
              <Button variant="energy" size="lg" className="w-full">
                Place Order Request
                <Calendar className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Financing;