import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Users, Package, FileText, Upload, CheckCircle, Clock, AlertCircle, Camera } from "lucide-react";
import { useState } from "react";

const PartnerPortal = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  
  // Mock data
  const assignedKits = [
    { id: "KIT001", user: "Amina Hassan", location: "Kano Village", status: "Pending Installation", assignedDate: "2024-01-15" },
    { id: "KIT002", user: "Dr. John Okafor", location: "Enugu Clinic", status: "Installed", assignedDate: "2024-01-10" },
    { id: "KIT003", user: "Mary School", location: "Lagos Community", status: "In Transit", assignedDate: "2024-01-20" },
    { id: "KIT004", user: "Ahmed Store", location: "Abuja Market", status: "Installed", assignedDate: "2024-01-05" },
  ];

  const recentUsers = [
    { name: "Fatima Ali", location: "Kaduna", registered: "2024-01-22", status: "Verified" },
    { name: "Bola Adebayo", location: "Ibadan", registered: "2024-01-21", status: "Pending" },
    { name: "Community Center", location: "Jos", registered: "2024-01-20", status: "Verified" },
  ];

  const getStatusBadge = (status: string) => {
    const variants = {
      "Installed": "bg-accent text-accent-foreground",
      "Pending Installation": "bg-primary text-primary-foreground", 
      "In Transit": "bg-secondary text-secondary-foreground",
      "Verified": "bg-accent text-accent-foreground",
      "Pending": "bg-primary text-primary-foreground"
    };
    return variants[status as keyof typeof variants] || "bg-secondary text-secondary-foreground";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent mb-2">
            Partner Portal
          </h1>
          <p className="text-muted-foreground text-lg">
            Empowering communities through solar energy partnerships
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-primary/20 rounded-lg">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-primary">127</p>
                  <p className="text-sm text-muted-foreground">Users Registered</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-accent/10 to-accent/5 border-accent/20">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-accent/20 rounded-lg">
                  <Package className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-accent">43</p>
                  <p className="text-sm text-muted-foreground">Kits Assigned</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-secondary/10 to-secondary/5 border-secondary/20">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-secondary/20 rounded-lg">
                  <CheckCircle className="h-6 w-6 text-secondary-foreground" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-secondary-foreground">38</p>
                  <p className="text-sm text-muted-foreground">Installations</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-primary-glow/10 to-primary-glow/5 border-primary-glow/20">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-primary-glow/20 rounded-lg">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-primary">12</p>
                  <p className="text-sm text-muted-foreground">Testimonials</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="register" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="register">Register Users</TabsTrigger>
            <TabsTrigger value="updates">Kit Updates</TabsTrigger>
            <TabsTrigger value="track">Track Kits</TabsTrigger>
            <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
          </TabsList>

          {/* Register & Verify Users */}
          <TabsContent value="register" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-8">
              <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-primary" />
                    Register New User
                  </CardTitle>
                  <CardDescription>
                    Add a new community member to the SolarBright platform
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" placeholder="Enter first name" />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" placeholder="Enter last name" />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" placeholder="+234..." />
                  </div>
                  
                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Input id="location" placeholder="Community, State" />
                  </div>
                  
                  <div>
                    <Label htmlFor="userType">User Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select user type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="household">Household</SelectItem>
                        <SelectItem value="school">School</SelectItem>
                        <SelectItem value="clinic">Healthcare Clinic</SelectItem>
                        <SelectItem value="business">Small Business</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="needs">Energy Needs</Label>
                    <Textarea id="needs" placeholder="Describe their energy requirements..." />
                  </div>
                  
                  <Button className="w-full" variant="solar">
                    Register User
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                <CardHeader>
                  <CardTitle>Recent Registrations</CardTitle>
                  <CardDescription>
                    Users you've recently added to the platform
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentUsers.map((user, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-background/50 rounded-lg border">
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <p className="text-sm text-muted-foreground">{user.location}</p>
                          <p className="text-xs text-muted-foreground">Registered: {user.registered}</p>
                        </div>
                        <Badge className={getStatusBadge(user.status)}>
                          {user.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Kit Installation Updates */}
          <TabsContent value="updates" className="space-y-6">
            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5 text-accent" />
                  Submit Kit Installation Update
                </CardTitle>
                <CardDescription>
                  Report installation progress and completion
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="kitId">Kit ID</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select kit ID" />
                      </SelectTrigger>
                      <SelectContent>
                        {assignedKits.map((kit) => (
                          <SelectItem key={kit.id} value={kit.id}>
                            {kit.id} - {kit.user}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="status">Installation Status</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="in-transit">In Transit</SelectItem>
                        <SelectItem value="arrived">Kit Arrived</SelectItem>
                        <SelectItem value="installation-started">Installation Started</SelectItem>
                        <SelectItem value="installation-complete">Installation Complete</SelectItem>
                        <SelectItem value="testing">Testing & Training</SelectItem>
                        <SelectItem value="operational">Fully Operational</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="updateNotes">Update Notes</Label>
                  <Textarea 
                    id="updateNotes" 
                    placeholder="Describe the progress, any challenges, or completion details..."
                    rows={4}
                  />
                </div>
                
                <div>
                  <Label htmlFor="photos">Installation Photos</Label>
                  <div className="mt-2 flex items-center gap-4">
                    <Button variant="outline" className="flex items-center gap-2">
                      <Camera className="h-4 w-4" />
                      Upload Photos
                    </Button>
                    <span className="text-sm text-muted-foreground">
                      {selectedFile ? selectedFile.name : "No file selected"}
                    </span>
                  </div>
                </div>
                
                <Button variant="energy" className="w-full">
                  Submit Update
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Track Assigned Kits */}
          <TabsContent value="track" className="space-y-6">
            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5 text-secondary-foreground" />
                  Assigned Solar Kits
                </CardTitle>
                <CardDescription>
                  Monitor all kits assigned to your organization
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Kit ID</TableHead>
                        <TableHead>User/Organization</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Assigned Date</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {assignedKits.map((kit) => (
                        <TableRow key={kit.id}>
                          <TableCell className="font-medium">{kit.id}</TableCell>
                          <TableCell>{kit.user}</TableCell>
                          <TableCell>{kit.location}</TableCell>
                          <TableCell>
                            <Badge className={getStatusBadge(kit.status)}>
                              {kit.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{kit.assignedDate}</TableCell>
                          <TableCell>
                            <Button variant="outline" size="sm">
                              Update
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Upload Testimonials */}
          <TabsContent value="testimonials" className="space-y-6">
            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  Upload Testimonials & Feedback
                </CardTitle>
                <CardDescription>
                  Share success stories and user feedback with the SolarBright team
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="testimonialUser">User Name</Label>
                    <Input id="testimonialUser" placeholder="Name of the user" />
                  </div>
                  
                  <div>
                    <Label htmlFor="testimonialLocation">Location</Label>
                    <Input id="testimonialLocation" placeholder="Community, State" />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="testimonialType">Testimonial Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="success-story">Success Story</SelectItem>
                      <SelectItem value="impact-report">Impact Report</SelectItem>
                      <SelectItem value="user-feedback">User Feedback</SelectItem>
                      <SelectItem value="challenge-overcome">Challenge Overcome</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="testimonialContent">Testimonial Content</Label>
                  <Textarea 
                    id="testimonialContent" 
                    placeholder="Share the user's story, feedback, or impact details..."
                    rows={6}
                  />
                </div>
                
                <div>
                  <Label htmlFor="impactMetrics">Impact Metrics (Optional)</Label>
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    <div>
                      <Label htmlFor="hoursOfLight" className="text-sm">Hours of Light/Day</Label>
                      <Input id="hoursOfLight" type="number" placeholder="8" />
                    </div>
                    <div>
                      <Label htmlFor="peopleImpacted" className="text-sm">People Impacted</Label>
                      <Input id="peopleImpacted" type="number" placeholder="5" />
                    </div>
                  </div>
                </div>
                
                <div>
                  <Label>Photos & Videos</Label>
                  <div className="mt-2 grid grid-cols-2 gap-4">
                    <Button variant="outline" className="flex items-center gap-2">
                      <Upload className="h-4 w-4" />
                      Upload Photos
                    </Button>
                    <Button variant="outline" className="flex items-center gap-2">
                      <Upload className="h-4 w-4" />
                      Upload Videos
                    </Button>
                  </div>
                </div>
                
                <Button variant="solar" className="w-full">
                  Submit Testimonial
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PartnerPortal;