import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { 
  Users, 
  UserCheck, 
  CreditCard, 
  TrendingUp, 
  Download, 
  Search,
  Filter,
  Edit,
  Eye,
  MapPin,
  Calendar,
  DollarSign,
  Zap,
  Target,
  AlertTriangle,
  CheckCircle,
  Clock,
  BarChart3
} from "lucide-react";

const AdminDashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Mock data
  const [users] = useState([
    {
      id: 1,
      name: "Amina Hassan",
      location: "Kano State",
      phone: "+234 801 234 5678",
      kitType: "Standard Kit",
      status: "active",
      partner: "Kano Cooperative",
      joinDate: "2024-01-15",
      totalPaid: 9500,
      lastPayment: "2024-12-14",
      nextPayment: "2024-12-21"
    },
    {
      id: 2,
      name: "Ibrahim Musa",
      location: "Kaduna State", 
      phone: "+234 802 345 6789",
      kitType: "Premium Kit",
      status: "pending",
      partner: "Northern Solar NGO",
      joinDate: "2024-02-10",
      totalPaid: 15200,
      lastPayment: "2024-12-10",
      nextPayment: "2024-12-17"
    },
    {
      id: 3,
      name: "Fatima Abdullahi",
      location: "Niger State",
      phone: "+234 803 456 7890", 
      kitType: "Basic Kit",
      status: "overdue",
      partner: "Rural Energy Initiative",
      joinDate: "2024-03-05",
      totalPaid: 7300,
      lastPayment: "2024-11-28",
      nextPayment: "2024-12-05"
    },
    {
      id: 4,
      name: "Mohammed Bello",
      location: "Jigawa State",
      phone: "+234 804 567 8901",
      kitType: "Standard Kit", 
      status: "active",
      partner: "Jigawa Development Group",
      joinDate: "2024-01-20",
      totalPaid: 12800,
      lastPayment: "2024-12-12",
      nextPayment: "2024-12-19"
    }
  ]);

  const [partners] = useState([
    { id: 1, name: "Kano Cooperative", region: "Kano State", users: 45, status: "active" },
    { id: 2, name: "Northern Solar NGO", region: "Kaduna State", users: 32, status: "active" },
    { id: 3, name: "Rural Energy Initiative", region: "Niger State", users: 28, status: "active" },
    { id: 4, name: "Jigawa Development Group", region: "Jigawa State", users: 21, status: "pending" }
  ]);

  const [usageMetrics] = useState([
    { user: "Amina Hassan", kit: "Standard", monthlyGeneration: 180, efficiency: 92, lastUpdate: "2024-12-14" },
    { user: "Ibrahim Musa", kit: "Premium", monthlyGeneration: 280, efficiency: 89, lastUpdate: "2024-12-13" },
    { user: "Fatima Abdullahi", kit: "Basic", monthlyGeneration: 120, efficiency: 85, lastUpdate: "2024-12-10" },
    { user: "Mohammed Bello", kit: "Standard", monthlyGeneration: 195, efficiency: 94, lastUpdate: "2024-12-12" }
  ]);

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || user.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    const variants = {
      active: "bg-success text-success-foreground",
      pending: "bg-warning text-warning-foreground", 
      overdue: "bg-destructive text-destructive-foreground"
    };
    return variants[status as keyof typeof variants] || "bg-secondary";
  };

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'active': return <CheckCircle className="h-4 w-4" />;
      case 'pending': return <Clock className="h-4 w-4" />;
      case 'overdue': return <AlertTriangle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/5 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">SolarBright Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage users, partners, and track solar impact across Nigeria</p>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">126</div>
              <p className="text-xs text-muted-foreground">+12 this month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Kits</CardTitle>
              <Zap className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">98</div>
              <p className="text-xs text-muted-foreground">78% active rate</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₦2.4M</div>
              <p className="text-xs text-muted-foreground">+18% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Partner Network</CardTitle>
              <Target className="h-4 w-4 text-secondary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">15</div>
              <p className="text-xs text-muted-foreground">4 states covered</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="users" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="users">User Management</TabsTrigger>
            <TabsTrigger value="partners">Partners</TabsTrigger>
            <TabsTrigger value="payments">Payments</TabsTrigger>
            <TabsTrigger value="metrics">Usage Metrics</TabsTrigger>
          </TabsList>

          <TabsContent value="users" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5" />
                      Registered Users
                    </CardTitle>
                    <CardDescription>Manage and assign users to distribution partners</CardDescription>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                      <Input
                        placeholder="Search users..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 w-full sm:w-64"
                      />
                    </div>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger className="w-full sm:w-32">
                        <Filter className="h-4 w-4 mr-2" />
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="overdue">Overdue</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Kit Type</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Partner</TableHead>
                      <TableHead>Last Payment</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{user.name}</p>
                            <p className="text-sm text-muted-foreground flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {user.location}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>{user.kitType}</TableCell>
                        <TableCell>
                          <Badge className={getStatusBadge(user.status)}>
                            {getStatusIcon(user.status)}
                            <span className="ml-1 capitalize">{user.status}</span>
                          </Badge>
                        </TableCell>
                        <TableCell>{user.partner}</TableCell>
                        <TableCell>
                          <div>
                            <p className="text-sm">₦{user.totalPaid.toLocaleString()}</p>
                            <p className="text-xs text-muted-foreground">{user.lastPayment}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="outline" size="sm">
                                  <Eye className="h-4 w-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>User Details - {user.name}</DialogTitle>
                                </DialogHeader>
                                <div className="space-y-4">
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <Label>Phone</Label>
                                      <p className="text-sm">{user.phone}</p>
                                    </div>
                                    <div>
                                      <Label>Join Date</Label>
                                      <p className="text-sm">{user.joinDate}</p>
                                    </div>
                                    <div>
                                      <Label>Total Paid</Label>
                                      <p className="text-sm">₦{user.totalPaid.toLocaleString()}</p>
                                    </div>
                                    <div>
                                      <Label>Next Payment</Label>
                                      <p className="text-sm">{user.nextPayment}</p>
                                    </div>
                                  </div>
                                  <div>
                                    <Label>Assign to Partner</Label>
                                    <Select defaultValue={user.partner}>
                                      <SelectTrigger>
                                        <SelectValue />
                                      </SelectTrigger>
                                      <SelectContent>
                                        {partners.map(partner => (
                                          <SelectItem key={partner.id} value={partner.name}>
                                            {partner.name} - {partner.region}
                                          </SelectItem>
                                        ))}
                                      </SelectContent>
                                    </Select>
                                  </div>
                                  <Button variant="solar" className="w-full">Update Assignment</Button>
                                </div>
                              </DialogContent>
                            </Dialog>
                            <Button variant="outline" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="partners" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UserCheck className="h-5 w-5" />
                  Distribution Partners
                </CardTitle>
                <CardDescription>Manage NGOs, cooperatives, and vendors</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {partners.map((partner) => (
                    <Card key={partner.id} className="border-0 shadow-md">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">{partner.name}</CardTitle>
                          <Badge variant={partner.status === 'active' ? 'default' : 'secondary'}>
                            {partner.status}
                          </Badge>
                        </div>
                        <CardDescription className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {partner.region}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-sm">Assigned Users</span>
                            <span className="font-medium">{partner.users}</span>
                          </div>
                          <Button variant="outline" size="sm" className="w-full">
                            Manage Partner
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="payments" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    Payment Overview
                  </CardTitle>
                  <CardDescription>Track payment status and repayment rates</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <p className="text-2xl font-bold text-success">78%</p>
                        <p className="text-xs text-muted-foreground">On Time</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-warning">15%</p>
                        <p className="text-xs text-muted-foreground">Late</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-destructive">7%</p>
                        <p className="text-xs text-muted-foreground">Overdue</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Total Collected</span>
                        <span className="font-medium">₦14.2M</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Outstanding</span>
                        <span className="font-medium">₦3.8M</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>This Month</span>
                        <span className="font-medium">₦2.4M</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Payments</CardTitle>
                  <CardDescription>Latest payment activities</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {users.slice(0, 4).map((user) => (
                      <div key={user.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium text-sm">{user.name}</p>
                          <p className="text-xs text-muted-foreground">{user.lastPayment}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-sm">₦{(user.totalPaid / 5).toLocaleString()}</p>
                          <Badge variant="outline" className="text-xs">
                            {user.status === 'active' ? 'Paid' : user.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="metrics" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Usage Metrics
                  </CardTitle>
                  <CardDescription>Monitor solar kit performance across all users</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>User</TableHead>
                        <TableHead>Generation</TableHead>
                        <TableHead>Efficiency</TableHead>
                        <TableHead>Last Update</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {usageMetrics.map((metric, index) => (
                        <TableRow key={index}>
                          <TableCell>
                            <div>
                              <p className="font-medium text-sm">{metric.user}</p>
                              <p className="text-xs text-muted-foreground">{metric.kit}</p>
                            </div>
                          </TableCell>
                          <TableCell>{metric.monthlyGeneration}kWh</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <span className={`text-sm ${metric.efficiency >= 90 ? 'text-success' : 'text-warning'}`}>
                                {metric.efficiency}%
                              </span>
                            </div>
                          </TableCell>
                          <TableCell className="text-sm">{metric.lastUpdate}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Environmental Impact</CardTitle>
                  <CardDescription>Collective environmental benefits</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="text-4xl mb-2">🌍</div>
                      <p className="text-2xl font-bold text-success">2.8 tons</p>
                      <p className="text-sm text-muted-foreground">Total CO₂ Saved</p>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Trees Equivalent</span>
                        <span className="font-medium text-success">35 trees</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Fuel Cost Saved</span>
                        <span className="font-medium text-success">₦420,000</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Households Powered</span>
                        <span className="font-medium text-success">126 homes</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Impact Reports
                  <Button variant="solar" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Download Report
                  </Button>
                </CardTitle>
                <CardDescription>Generate comprehensive impact and performance reports</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  <Button variant="outline" className="h-20 flex flex-col">
                    <Calendar className="h-6 w-6 mb-2" />
                    <span className="text-sm">Monthly Report</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col">
                    <TrendingUp className="h-6 w-6 mb-2" />
                    <span className="text-sm">Financial Report</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col">
                    <Users className="h-6 w-6 mb-2" />
                    <span className="text-sm">User Analytics</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;