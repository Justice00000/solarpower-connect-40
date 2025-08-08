import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { 
  MapPin, 
  Phone, 
  Mail, 
  User,
  Package,
  CreditCard,
  CheckCircle,
  AlertCircle,
  FileText,
  Send
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface OrderData {
  personalInfo: {
    fullName: string;
    phone: string;
    email: string;
    idType: string;
    idNumber: string;
  };
  location: {
    state: string;
    lga: string;
    address: string;
    nearestLandmark: string;
  };
  orderDetails: {
    kitType: string;
    paymentPlan: string;
    downPayment: number;
    preferredInstallationDate: string;
  };
  preferences: {
    contactTime: string;
    communicationLanguage: string;
    specialInstructions: string;
  };
  agreements: {
    terms: boolean;
    paymentTerms: boolean;
    installationAccess: boolean;
  };
}

const OrderRequest = () => {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [orderData, setOrderData] = useState<OrderData>({
    personalInfo: {
      fullName: '',
      phone: '',
      email: '',
      idType: '',
      idNumber: ''
    },
    location: {
      state: '',
      lga: '',
      address: '',
      nearestLandmark: ''
    },
    orderDetails: {
      kitType: 'standard',
      paymentPlan: 'weekly',
      downPayment: 10000,
      preferredInstallationDate: ''
    },
    preferences: {
      contactTime: '',
      communicationLanguage: 'english',
      specialInstructions: ''
    },
    agreements: {
      terms: false,
      paymentTerms: false,
      installationAccess: false
    }
  });

  const nigerianStates = [
    'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue', 'Borno',
    'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'FCT', 'Gombe', 'Imo',
    'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi', 'Kwara', 'Lagos', 'Nasarawa',
    'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo', 'Plateau', 'Rivers', 'Sokoto', 'Taraba',
    'Yobe', 'Zamfara'
  ];

  const solarKits = {
    basic: { name: "Basic Kit", price: 45000 },
    standard: { name: "Standard Kit", price: 85000 },
    premium: { name: "Premium Kit", price: 150000 },
    enterprise: { name: "Enterprise Kit", price: 220000 }
  };

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Show success message
    toast({
      title: "Order Request Submitted Successfully! 🎉",
      description: "Our local partner will contact you within 24 hours to arrange assessment and installation.",
    });
    
    setStep(5); // Success step
    setLoading(false);
  };

  const isStepValid = () => {
    switch(step) {
      case 1:
        return orderData.personalInfo.fullName && 
               orderData.personalInfo.phone && 
               orderData.personalInfo.idType && 
               orderData.personalInfo.idNumber;
      case 2:
        return orderData.location.state && 
               orderData.location.address;
      case 3:
        return orderData.orderDetails.preferredInstallationDate;
      case 4:
        return orderData.agreements.terms && 
               orderData.agreements.paymentTerms && 
               orderData.agreements.installationAccess;
      default:
        return true;
    }
  };

  if (step === 5) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-success/5 to-primary/5 flex items-center justify-center py-12">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <CheckCircle className="h-20 w-20 text-success mx-auto mb-6" />
          <h1 className="text-3xl font-bold mb-4">Order Request Submitted!</h1>
          <Card className="text-left">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                What Happens Next?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm flex items-center justify-center mt-0.5">1</div>
                <div>
                  <div className="font-medium">Partner Assignment (0-4 hours)</div>
                  <div className="text-sm text-muted-foreground">We'll assign a local partner in your area</div>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm flex items-center justify-center mt-0.5">2</div>
                <div>
                  <div className="font-medium">Initial Contact (4-24 hours)</div>
                  <div className="text-sm text-muted-foreground">Partner will call to schedule site assessment</div>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm flex items-center justify-center mt-0.5">3</div>
                <div>
                  <div className="font-medium">Site Assessment (1-3 days)</div>
                  <div className="text-sm text-muted-foreground">Technical evaluation and final quote</div>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm flex items-center justify-center mt-0.5">4</div>
                <div>
                  <div className="font-medium">Installation (3-7 days)</div>
                  <div className="text-sm text-muted-foreground">Professional installation and setup</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="mt-8 space-y-4">
            <p className="text-muted-foreground">
              Order Reference: <Badge variant="secondary">#SB{Date.now().toString().slice(-6)}</Badge>
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="solar" onClick={() => window.location.href = '/'}>
                Return Home
              </Button>
              <Button variant="outline" onClick={() => window.location.href = '/dashboard'}>
                Go to Dashboard
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/5 py-12">
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Solar Kit Order Request</h1>
          <p className="text-muted-foreground">Complete your order details to get connected with a local partner</p>
          
          {/* Progress */}
          <div className="flex justify-center mt-6 mb-8">
            <div className="flex space-x-2">
              {[1, 2, 3, 4].map((stepNum) => (
                <div key={stepNum} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    stepNum < step 
                      ? 'bg-success text-success-foreground' 
                      : stepNum === step 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-muted text-muted-foreground'
                  }`}>
                    {stepNum < step ? <CheckCircle className="h-4 w-4" /> : stepNum}
                  </div>
                  {stepNum < 4 && (
                    <div className={`w-8 h-0.5 ${stepNum < step ? 'bg-success' : 'bg-muted'}`} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <Card>
          <CardHeader>
            {step === 1 && (
              <>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Personal Information
                </CardTitle>
                <CardDescription>Provide your contact details and identification</CardDescription>
              </>
            )}
            {step === 2 && (
              <>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Installation Location
                </CardTitle>
                <CardDescription>Where should we install your solar kit?</CardDescription>
              </>
            )}
            {step === 3 && (
              <>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  Order & Payment Details
                </CardTitle>
                <CardDescription>Confirm your kit selection and preferences</CardDescription>
              </>
            )}
            {step === 4 && (
              <>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Terms & Agreement
                </CardTitle>
                <CardDescription>Review and accept terms of service</CardDescription>
              </>
            )}
          </CardHeader>
          
          <CardContent className="space-y-6">
            {step === 1 && (
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="fullName">Full Name *</Label>
                    <Input 
                      id="fullName"
                      value={orderData.personalInfo.fullName}
                      onChange={(e) => setOrderData(prev => ({
                        ...prev,
                        personalInfo: { ...prev.personalInfo, fullName: e.target.value }
                      }))}
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input 
                      id="phone"
                      value={orderData.personalInfo.phone}
                      onChange={(e) => setOrderData(prev => ({
                        ...prev,
                        personalInfo: { ...prev.personalInfo, phone: e.target.value }
                      }))}
                      placeholder="+234 xxx xxx xxxx"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input 
                    id="email"
                    type="email"
                    value={orderData.personalInfo.email}
                    onChange={(e) => setOrderData(prev => ({
                      ...prev,
                      personalInfo: { ...prev.personalInfo, email: e.target.value }
                    }))}
                    placeholder="your.email@example.com"
                  />
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label>ID Type *</Label>
                    <Select 
                      value={orderData.personalInfo.idType} 
                      onValueChange={(value) => setOrderData(prev => ({
                        ...prev,
                        personalInfo: { ...prev.personalInfo, idType: value }
                      }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select ID type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="nin">National ID (NIN)</SelectItem>
                        <SelectItem value="bvn">Bank Verification Number (BVN)</SelectItem>
                        <SelectItem value="voters">Voter's Card</SelectItem>
                        <SelectItem value="drivers">Driver's License</SelectItem>
                        <SelectItem value="passport">International Passport</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="idNumber">ID Number *</Label>
                    <Input 
                      id="idNumber"
                      value={orderData.personalInfo.idNumber}
                      onChange={(e) => setOrderData(prev => ({
                        ...prev,
                        personalInfo: { ...prev.personalInfo, idNumber: e.target.value }
                      }))}
                      placeholder="Enter ID number"
                    />
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label>State *</Label>
                    <Select 
                      value={orderData.location.state} 
                      onValueChange={(value) => setOrderData(prev => ({
                        ...prev,
                        location: { ...prev.location, state: value }
                      }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select state" />
                      </SelectTrigger>
                      <SelectContent>
                        {nigerianStates.map(state => (
                          <SelectItem key={state} value={state.toLowerCase()}>{state}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="lga">Local Government Area</Label>
                    <Input 
                      id="lga"
                      value={orderData.location.lga}
                      onChange={(e) => setOrderData(prev => ({
                        ...prev,
                        location: { ...prev.location, lga: e.target.value }
                      }))}
                      placeholder="Enter LGA"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="address">Full Address *</Label>
                  <Textarea 
                    id="address"
                    value={orderData.location.address}
                    onChange={(e) => setOrderData(prev => ({
                      ...prev,
                      location: { ...prev.location, address: e.target.value }
                    }))}
                    placeholder="Enter complete address including street, area, and any relevant details"
                    rows={3}
                  />
                </div>
                
                <div>
                  <Label htmlFor="landmark">Nearest Landmark</Label>
                  <Input 
                    id="landmark"
                    value={orderData.location.nearestLandmark}
                    onChange={(e) => setOrderData(prev => ({
                      ...prev,
                      location: { ...prev.location, nearestLandmark: e.target.value }
                    }))}
                    placeholder="e.g., Near First Bank, Opposite Central Market"
                  />
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <div>
                  <Label>Selected Solar Kit</Label>
                  <Select 
                    value={orderData.orderDetails.kitType} 
                    onValueChange={(value) => setOrderData(prev => ({
                      ...prev,
                      orderDetails: { ...prev.orderDetails, kitType: value }
                    }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(solarKits).map(([key, kit]) => (
                        <SelectItem key={key} value={key}>
                          {kit.name} - ₦{kit.price.toLocaleString()}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label>Payment Plan</Label>
                    <Select 
                      value={orderData.orderDetails.paymentPlan} 
                      onValueChange={(value) => setOrderData(prev => ({
                        ...prev,
                        orderDetails: { ...prev.orderDetails, paymentPlan: value }
                      }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="daily">Daily Payments</SelectItem>
                        <SelectItem value="weekly">Weekly Payments</SelectItem>
                        <SelectItem value="monthly">Monthly Payments</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="downPayment">Down Payment (₦)</Label>
                    <Input 
                      id="downPayment"
                      type="number"
                      min="5000"
                      value={orderData.orderDetails.downPayment}
                      onChange={(e) => setOrderData(prev => ({
                        ...prev,
                        orderDetails: { ...prev.orderDetails, downPayment: parseInt(e.target.value) || 5000 }
                      }))}
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="installDate">Preferred Installation Date *</Label>
                  <Input 
                    id="installDate"
                    type="date"
                    value={orderData.orderDetails.preferredInstallationDate}
                    onChange={(e) => setOrderData(prev => ({
                      ...prev,
                      orderDetails: { ...prev.orderDetails, preferredInstallationDate: e.target.value }
                    }))}
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label>Best Time to Contact</Label>
                    <Select 
                      value={orderData.preferences.contactTime} 
                      onValueChange={(value) => setOrderData(prev => ({
                        ...prev,
                        preferences: { ...prev.preferences, contactTime: value }
                      }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select time" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="morning">Morning (8AM - 12PM)</SelectItem>
                        <SelectItem value="afternoon">Afternoon (12PM - 5PM)</SelectItem>
                        <SelectItem value="evening">Evening (5PM - 8PM)</SelectItem>
                        <SelectItem value="anytime">Any time</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Preferred Language</Label>
                    <Select 
                      value={orderData.preferences.communicationLanguage} 
                      onValueChange={(value) => setOrderData(prev => ({
                        ...prev,
                        preferences: { ...prev.preferences, communicationLanguage: value }
                      }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="english">English</SelectItem>
                        <SelectItem value="hausa">Hausa</SelectItem>
                        <SelectItem value="yoruba">Yoruba</SelectItem>
                        <SelectItem value="igbo">Igbo</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="instructions">Special Instructions</Label>
                  <Textarea 
                    id="instructions"
                    value={orderData.preferences.specialInstructions}
                    onChange={(e) => setOrderData(prev => ({
                      ...prev,
                      preferences: { ...prev.preferences, specialInstructions: e.target.value }
                    }))}
                    placeholder="Any special requirements or instructions for installation"
                    rows={3}
                  />
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-6">
                <div className="bg-muted/50 p-4 rounded-lg">
                  <h3 className="font-medium mb-2">Order Summary</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Kit:</span>
                      <span>{solarKits[orderData.orderDetails.kitType as keyof typeof solarKits].name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Payment Plan:</span>
                      <span className="capitalize">{orderData.orderDetails.paymentPlan}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Down Payment:</span>
                      <span>₦{orderData.orderDetails.downPayment.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between font-medium pt-2 border-t">
                      <span>Total Kit Price:</span>
                      <span>₦{solarKits[orderData.orderDetails.kitType as keyof typeof solarKits].price.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-2">
                    <Checkbox 
                      checked={orderData.agreements.terms}
                      onCheckedChange={(checked) => setOrderData(prev => ({
                        ...prev,
                        agreements: { ...prev.agreements, terms: checked as boolean }
                      }))}
                    />
                    <div className="text-sm">
                      <p>I agree to the <button className="text-primary underline">Terms of Service</button> and <button className="text-primary underline">Privacy Policy</button></p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-2">
                    <Checkbox 
                      checked={orderData.agreements.paymentTerms}
                      onCheckedChange={(checked) => setOrderData(prev => ({
                        ...prev,
                        agreements: { ...prev.agreements, paymentTerms: checked as boolean }
                      }))}
                    />
                    <div className="text-sm">
                      <p>I understand and agree to the payment terms and schedule for my selected plan</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-2">
                    <Checkbox 
                      checked={orderData.agreements.installationAccess}
                      onCheckedChange={(checked) => setOrderData(prev => ({
                        ...prev,
                        agreements: { ...prev.agreements, installationAccess: checked as boolean }
                      }))}
                    />
                    <div className="text-sm">
                      <p>I will provide safe access to my property for installation and maintenance</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                  <div className="flex items-start space-x-2">
                    <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div className="text-sm">
                      <p className="font-medium text-blue-900">Important Note</p>
                      <p className="text-blue-700">This is a request for quotation. Final pricing and terms will be confirmed after site assessment by our local partner.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div className="flex gap-4 pt-6">
              {step > 1 && (
                <Button variant="outline" onClick={() => setStep(step - 1)}>
                  Previous
                </Button>
              )}
              
              {step < 4 ? (
                <Button 
                  variant="solar" 
                  onClick={handleNext}
                  disabled={!isStepValid()}
                  className="flex-1"
                >
                  Next Step
                </Button>
              ) : (
                <Button 
                  variant="energy" 
                  onClick={handleSubmit}
                  disabled={!isStepValid() || loading}
                  className="flex-1"
                >
                  {loading ? 'Submitting...' : 'Submit Order Request'}
                  {!loading && <Send className="ml-2 h-4 w-4" />}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OrderRequest;