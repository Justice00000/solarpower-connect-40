import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Calendar,
  Battery,
  Sun,
  CreditCard,
  TrendingUp,
  MapPin,
  Phone,
  CheckCircle,
  Clock,
  Leaf,
  Users,
  Star,
  Download,
  AlertCircle
} from "lucide-react";

const Dashboard = () => {
  const [user] = useState({
    name: "Amina Hassan",
    location: "Kano State",
    phone: "+234 801 234 5678",
    joinDate: "2024-01-15",
    kitType: "Standard Kit"
  });

  const [kitStatus] = useState({
    status: "active",
    installDate: "2024-02-20",
    lastUpdate: "2024-12-14",
    batteryLevel: 85,
    dailyGeneration: 180,
    monthlyGeneration: 4200,
    nextPayment: "2024-12-21",
    paymentAmount: 1900
  });

  const [paymentHistory] = useState([
    { date: "2024-12-14", amount: 1900, status: "paid", method: "Mobile Money" },
    { date: "2024-12-07", amount: 1900, status: "paid", method: "Mobile Money" },
    { date: "2024-11-30", amount: 1900, status: "paid", method: "Bank Transfer" },
    { date: "2024-11-23", amount: 1900, status: "paid", method: "Mobile Money" },
    { date: "2024-11-16", amount: 1900, status: "paid", method: "Mobile Money" }
  ]);

  const [communityStories] = useState([
    {
      title: "New Health Center Powered",
      location: "Dutse, Jigawa State",
      impact: "24/7 power for vaccine storage",
      date: "2024-12-10",
      image: "🏥"
    },
    {
      title: "Village School Gets Solar", 
      location: "Birnin Kebbi, Kebbi State",
      impact: "Evening classes for 300 students",
      date: "2024-12-08",
      image: "🏫"
    },
    {
      title: "Market Traders Celebrate",
      location: "Minna, Niger State", 
      impact: "Extended trading hours boost income",
      date: "2024-12-05",
      image: "🏪"
    }
  ]);

  const totalPaid = paymentHistory.reduce((sum, payment) => 
    payment.status === 'paid' ? sum + payment.amount : sum, 0
  );
  const paymentProgress = (totalPaid / 85000) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/5 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Welcome back, {user.name}! 👋</h1>
              <p className="text-muted-foreground flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                {user.location} • Member since {new Date(user.joinDate).toLocaleDateString()}
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <Badge variant="secondary" className="mr-2">
                <Sun className="h-4 w-4 mr-1" />
                {user.kitType}
              </Badge>
              <Badge className="bg-success text-success-foreground">
                <CheckCircle className="h-4 w-4 mr-1" />
                Active
              </Badge>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Battery Level</CardTitle>
              <Battery className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">{kitStatus.batteryLevel}%</div>
              <Progress value={kitStatus.batteryLevel} className="mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Today's Generation</CardTitle>
              <Sun className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{kitStatus.dailyGeneration}Wh</div>
              <p className="text-xs text-muted-foreground mt-1">
                +12% from yesterday
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Next Payment</CardTitle>
              <CreditCard className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₦{kitStatus.paymentAmount.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Due {new Date(kitStatus.nextPayment).toLocaleDateString()}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">CO₂ Saved</CardTitle>
              <Leaf className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">145kg</div>
              <p className="text-xs text-muted-foreground mt-1">
                This month
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="payments">Payments</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="community">Community</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Kit Status */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sun className="h-5 w-5" />
                    Solar Kit Status
                  </CardTitle>
                  <CardDescription>Real-time system information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Installation Date</p>
                      <p className="text-sm text-muted-foreground">{new Date(kitStatus.installDate).toLocaleDateString()}</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Last Update</p>
                      <p className="text-sm text-muted-foreground">{new Date(kitStatus.lastUpdate).toLocaleDateString()}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Monthly Generation</span>
                      <span className="text-sm">{kitStatus.monthlyGeneration}Wh</span>
                    </div>
                    <Progress value={70} />
                    <p className="text-xs text-muted-foreground">70% of monthly target achieved</p>
                  </div>

                  <div className="pt-4 border-t">
                    <Button variant="outline" size="sm" className="w-full">
                      <Phone className="h-4 w-4 mr-2" />
                      Contact Support
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Payment Progress */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Payment Progress
                  </CardTitle>
                  <CardDescription>Track your journey to ownership</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Total Paid</span>
                      <span className="font-medium">₦{totalPaid.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Kit Price</span>
                      <span>₦85,000</span>
                    </div>
                    <Progress value={paymentProgress} className="h-2" />
                    <p className="text-xs text-muted-foreground">
                      {Math.round(paymentProgress)}% complete • ₦{(85000 - totalPaid).toLocaleString()} remaining
                    </p>
                  </div>

                  <div className="bg-success/10 p-3 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <CheckCircle className="h-4 w-4 text-success" />
                      <span className="text-sm font-medium text-success">On Track</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Estimated ownership: March 2025
                    </p>
                  </div>

                  <Button variant="solar" size="sm" className="w-full">
                    Make Early Payment
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Your latest solar journey updates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-success mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">Payment Received</p>
                      <p className="text-xs text-muted-foreground">
                        ₦1,900 payment processed via Mobile Money • Dec 14, 2024
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Sun className="h-5 w-5 text-primary mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">System Performance Update</p>
                      <p className="text-xs text-muted-foreground">
                        Generated 180Wh today - 12% above average • Dec 14, 2024
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Clock className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">Maintenance Reminder</p>
                      <p className="text-xs text-muted-foreground">
                        Next system check scheduled for Dec 20, 2024
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="payments" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Payment History
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Download Statement
                  </Button>
                </CardTitle>
                <CardDescription>Track all your payments and due dates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {paymentHistory.map((payment, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-success" />
                        <div>
                          <p className="font-medium">₦{payment.amount.toLocaleString()}</p>
                          <p className="text-sm text-muted-foreground">{payment.method}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge className="bg-success text-success-foreground mb-1">Paid</Badge>
                        <p className="text-xs text-muted-foreground">
                          {new Date(payment.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 p-4 bg-primary/5 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Next Payment Due</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(kitStatus.nextPayment).toLocaleDateString()} • ₦{kitStatus.paymentAmount.toLocaleString()}
                      </p>
                    </div>
                    <Button variant="solar" size="sm">
                      Pay Now
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Energy Generation</CardTitle>
                  <CardDescription>Your solar panel performance over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <p className="text-2xl font-bold text-primary">180</p>
                        <p className="text-xs text-muted-foreground">Today (Wh)</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-secondary">4.2</p>
                        <p className="text-xs text-muted-foreground">This Month (kWh)</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-accent">48.6</p>
                        <p className="text-xs text-muted-foreground">Total (kWh)</p>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Peak Generation Today</span>
                        <span>11:30 AM</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Weather Impact</span>
                        <span className="text-success">Sunny ☀️</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>System Efficiency</span>
                        <span className="text-success">92%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Environmental Impact</CardTitle>
                  <CardDescription>Your contribution to a cleaner environment</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="text-4xl mb-2">🌱</div>
                      <p className="text-2xl font-bold text-success">145kg</p>
                      <p className="text-sm text-muted-foreground">CO₂ Saved This Month</p>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Total CO₂ Saved</span>
                        <span className="font-medium text-success">1.2 tons</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Equivalent Trees Planted</span>
                        <span className="font-medium text-success">15 trees</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Fuel Cost Saved</span>
                        <span className="font-medium text-success">₦38,000</span>
                      </div>
                    </div>
                    
                    <div className="bg-success/10 p-3 rounded-lg text-center">
                      <p className="text-sm font-medium text-success">🏆 Eco Champion</p>
                      <p className="text-xs text-muted-foreground">Top 10% environmental impact in your region</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="community" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Community Impact Stories
                </CardTitle>
                <CardDescription>See how SolarBright is transforming communities across Nigeria</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {communityStories.map((story, index) => (
                    <Card key={index} className="border-0 shadow-md">
                      <CardHeader className="text-center">
                        <div className="text-3xl mb-2">{story.image}</div>
                        <CardTitle className="text-lg">{story.title}</CardTitle>
                        <CardDescription className="flex items-center justify-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {story.location}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="text-center">
                        <p className="text-sm font-medium text-success mb-2">{story.impact}</p>
                        <p className="text-xs text-muted-foreground">{new Date(story.date).toLocaleDateString()}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                
                <div className="mt-8 text-center">
                  <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold mb-2">Share Your Story</h3>
                    <p className="text-muted-foreground mb-4">
                      Help inspire others by sharing how solar energy has improved your life
                    </p>
                    <Button variant="solar">
                      <Star className="h-4 w-4 mr-2" />
                      Submit Your Story
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;