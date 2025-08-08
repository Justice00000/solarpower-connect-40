import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  Lightbulb, 
  Fan, 
  Tv, 
  Smartphone, 
  Calculator,
  ArrowRight,
  CheckCircle,
  Zap,
  Home,
  Building
} from "lucide-react";
import { Link } from "react-router-dom";

interface AssessmentData {
  propertyType: string;
  rooms: number;
  lighting: {
    bulbs: number;
    hoursPerDay: number;
  };
  appliances: {
    fans: number;
    tv: boolean;
    radio: boolean;
    phone_charging: number;
    refrigerator: boolean;
  };
  medicalEquipment: string[];
  currentSolution: string;
  budget: string;
}

const EnergyAssessment = () => {
  const [step, setStep] = useState(1);
  const [assessment, setAssessment] = useState<AssessmentData>({
    propertyType: '',
    rooms: 1,
    lighting: { bulbs: 1, hoursPerDay: 6 },
    appliances: { fans: 0, tv: false, radio: false, phone_charging: 1, refrigerator: false },
    medicalEquipment: [],
    currentSolution: '',
    budget: ''
  });
  const [recommendation, setRecommendation] = useState<any>(null);

  const totalSteps = 5;
  const progress = (step / totalSteps) * 100;

  const calculateRecommendation = () => {
    let totalWatts = 0;
    let dailyWh = 0;

    // Lighting calculation
    const ledWatts = 10; // 10W LED bulbs
    totalWatts += assessment.lighting.bulbs * ledWatts;
    dailyWh += assessment.lighting.bulbs * ledWatts * assessment.lighting.hoursPerDay;

    // Appliances calculation
    if (assessment.appliances.fans > 0) {
      totalWatts += assessment.appliances.fans * 50; // 50W ceiling fans
      dailyWh += assessment.appliances.fans * 50 * 8; // 8 hours per day
    }
    
    if (assessment.appliances.tv) {
      totalWatts += 60; // 60W TV
      dailyWh += 60 * 5; // 5 hours per day
    }
    
    if (assessment.appliances.radio) {
      totalWatts += 20; // 20W radio
      dailyWh += 20 * 6; // 6 hours per day
    }
    
    totalWatts += assessment.appliances.phone_charging * 10; // 10W phone charging
    dailyWh += assessment.appliances.phone_charging * 10 * 2; // 2 hours per day

    if (assessment.appliances.refrigerator) {
      totalWatts += 150; // 150W refrigerator
      dailyWh += 150 * 12; // 12 hours per day (duty cycle)
    }

    // Medical equipment (estimated)
    if (assessment.medicalEquipment.length > 0) {
      totalWatts += assessment.medicalEquipment.length * 100;
      dailyWh += assessment.medicalEquipment.length * 100 * 6;
    }

    // Determine kit size
    let kitSize = '';
    let panelWatts = 0;
    let batteryCapacity = 0;
    let estimatedCost = 0;

    if (dailyWh <= 300) {
      kitSize = 'Basic Kit';
      panelWatts = 100;
      batteryCapacity = 100;
      estimatedCost = 45000;
    } else if (dailyWh <= 800) {
      kitSize = 'Standard Kit';
      panelWatts = 200;
      batteryCapacity = 200;
      estimatedCost = 85000;
    } else if (dailyWh <= 1500) {
      kitSize = 'Premium Kit';
      panelWatts = 400;
      batteryCapacity = 400;
      estimatedCost = 150000;
    } else {
      kitSize = 'Enterprise Kit';
      panelWatts = 600;
      batteryCapacity = 600;
      estimatedCost = 220000;
    }

    setRecommendation({
      kitSize,
      totalWatts,
      dailyWh,
      panelWatts,
      batteryCapacity,
      estimatedCost,
      monthlySavings: Math.round(dailyWh * 30 * 0.12), // Estimated savings vs generator fuel
    });
  };

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      calculateRecommendation();
    }
  };

  const medicalEquipmentOptions = [
    'Oxygen Concentrator',
    'Vaccine Refrigerator', 
    'Microscope',
    'Blood Pressure Monitor',
    'Nebulizer',
    'Centrifuge',
    'Sterilization Equipment'
  ];

  if (recommendation) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-success/5 to-primary/5 py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-8">
            <CheckCircle className="h-16 w-16 text-success mx-auto mb-4" />
            <h1 className="text-3xl font-bold mb-2">Your Solar Kit Recommendation</h1>
            <p className="text-muted-foreground">Based on your energy assessment</p>
          </div>

          <Card className="mb-8 border-success/20 shadow-lg">
            <CardHeader className="text-center bg-gradient-to-r from-success/10 to-primary/10">
              <CardTitle className="text-2xl flex items-center justify-center gap-2">
                <Zap className="h-6 w-6 text-primary" />
                {recommendation.kitSize}
              </CardTitle>
              <CardDescription>Perfect for your energy needs</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                    <span className="font-medium">Solar Panel Capacity</span>
                    <Badge variant="secondary">{recommendation.panelWatts}W</Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                    <span className="font-medium">Battery Capacity</span>
                    <Badge variant="secondary">{recommendation.batteryCapacity}Ah</Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                    <span className="font-medium">Daily Energy Usage</span>
                    <Badge variant="secondary">{recommendation.dailyWh}Wh</Badge>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-primary/10 rounded-lg">
                    <span className="font-medium">Total Kit Cost</span>
                    <Badge className="bg-primary text-primary-foreground">₦{recommendation.estimatedCost.toLocaleString()}</Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-success/10 rounded-lg">
                    <span className="font-medium">Monthly Savings</span>
                    <Badge className="bg-success text-success-foreground">₦{recommendation.monthlySavings.toLocaleString()}</Badge>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Payback period: ~{Math.round(recommendation.estimatedCost / (recommendation.monthlySavings * 12))} years</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/financing" className="flex-1 sm:flex-initial">
              <Button variant="solar" size="lg" className="w-full">
                View Financing Options
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button variant="outline" size="lg" onClick={() => window.location.reload()}>
              Retake Assessment
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/5 py-12">
      <div className="max-w-2xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Energy Needs Assessment</h1>
          <p className="text-muted-foreground mb-6">Help us recommend the perfect solar kit for you</p>
          <div className="w-full bg-muted rounded-full h-2 mb-2">
            <div className="bg-primary h-2 rounded-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
          </div>
          <p className="text-sm text-muted-foreground">Step {step} of {totalSteps}</p>
        </div>

        <Card className="shadow-lg">
          <CardHeader>
            {step === 1 && (
              <>
                <CardTitle className="flex items-center gap-2">
                  <Building className="h-5 w-5" />
                  Property Information
                </CardTitle>
                <CardDescription>Tell us about your property</CardDescription>
              </>
            )}
            {step === 2 && (
              <>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="h-5 w-5" />
                  Lighting Needs
                </CardTitle>
                <CardDescription>How much lighting do you need?</CardDescription>
              </>
            )}
            {step === 3 && (
              <>
                <CardTitle className="flex items-center gap-2">
                  <Fan className="h-5 w-5" />
                  Appliances
                </CardTitle>
                <CardDescription>What appliances will you power?</CardDescription>
              </>
            )}
            {step === 4 && (
              <>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="h-5 w-5" />
                  Special Equipment
                </CardTitle>
                <CardDescription>Any medical or specialized equipment?</CardDescription>
              </>
            )}
            {step === 5 && (
              <>
                <CardTitle className="flex items-center gap-2">
                  <Home className="h-5 w-5" />
                  Current Setup & Budget
                </CardTitle>
                <CardDescription>Final details</CardDescription>
              </>
            )}
          </CardHeader>
          <CardContent className="space-y-6">
            {step === 1 && (
              <div className="space-y-4">
                <div>
                  <Label>Property Type</Label>
                  <Select value={assessment.propertyType} onValueChange={(value) => 
                    setAssessment(prev => ({ ...prev, propertyType: value }))
                  }>
                    <SelectTrigger>
                      <SelectValue placeholder="Select property type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="home">Home/Residence</SelectItem>
                      <SelectItem value="clinic">Clinic/Health Center</SelectItem>
                      <SelectItem value="school">School</SelectItem>
                      <SelectItem value="shop">Shop/Business</SelectItem>
                      <SelectItem value="community">Community Center</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Number of Rooms</Label>
                  <Input 
                    type="number" 
                    min="1" 
                    value={assessment.rooms}
                    onChange={(e) => setAssessment(prev => ({ 
                      ...prev, 
                      rooms: parseInt(e.target.value) || 1 
                    }))}
                  />
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <div>
                  <Label>Number of LED Bulbs Needed</Label>
                  <Input 
                    type="number" 
                    min="1" 
                    value={assessment.lighting.bulbs}
                    onChange={(e) => setAssessment(prev => ({ 
                      ...prev, 
                      lighting: { ...prev.lighting, bulbs: parseInt(e.target.value) || 1 }
                    }))}
                  />
                </div>
                <div>
                  <Label>Hours of Lighting Per Day</Label>
                  <Select value={assessment.lighting.hoursPerDay.toString()} onValueChange={(value) => 
                    setAssessment(prev => ({ 
                      ...prev, 
                      lighting: { ...prev.lighting, hoursPerDay: parseInt(value) }
                    }))
                  }>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="4">4 hours (Evening only)</SelectItem>
                      <SelectItem value="6">6 hours (Standard)</SelectItem>
                      <SelectItem value="8">8 hours (Extended)</SelectItem>
                      <SelectItem value="12">12+ hours (24/7 facility)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <div>
                  <Label>Number of Ceiling Fans</Label>
                  <Input 
                    type="number" 
                    min="0" 
                    value={assessment.appliances.fans}
                    onChange={(e) => setAssessment(prev => ({ 
                      ...prev, 
                      appliances: { ...prev.appliances, fans: parseInt(e.target.value) || 0 }
                    }))}
                  />
                </div>
                <div className="space-y-3">
                  <Label>Other Appliances</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        checked={assessment.appliances.tv}
                        onCheckedChange={(checked) => setAssessment(prev => ({ 
                          ...prev, 
                          appliances: { ...prev.appliances, tv: checked as boolean }
                        }))}
                      />
                      <Tv className="h-4 w-4" />
                      <Label>Television</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        checked={assessment.appliances.radio}
                        onCheckedChange={(checked) => setAssessment(prev => ({ 
                          ...prev, 
                          appliances: { ...prev.appliances, radio: checked as boolean }
                        }))}
                      />
                      <Label>Radio</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        checked={assessment.appliances.refrigerator}
                        onCheckedChange={(checked) => setAssessment(prev => ({ 
                          ...prev, 
                          appliances: { ...prev.appliances, refrigerator: checked as boolean }
                        }))}
                      />
                      <Label>Refrigerator</Label>
                    </div>
                  </div>
                </div>
                <div>
                  <Label>Number of Phone Charging Stations</Label>
                  <Input 
                    type="number" 
                    min="0" 
                    value={assessment.appliances.phone_charging}
                    onChange={(e) => setAssessment(prev => ({ 
                      ...prev, 
                      appliances: { ...prev.appliances, phone_charging: parseInt(e.target.value) || 0 }
                    }))}
                  />
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-4">
                <div>
                  <Label>Medical Equipment (Check all that apply)</Label>
                  <div className="grid grid-cols-1 gap-2 mt-2">
                    {medicalEquipmentOptions.map((equipment) => (
                      <div key={equipment} className="flex items-center space-x-2">
                        <Checkbox 
                          checked={assessment.medicalEquipment.includes(equipment)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setAssessment(prev => ({ 
                                ...prev, 
                                medicalEquipment: [...prev.medicalEquipment, equipment]
                              }));
                            } else {
                              setAssessment(prev => ({ 
                                ...prev, 
                                medicalEquipment: prev.medicalEquipment.filter(item => item !== equipment)
                              }));
                            }
                          }}
                        />
                        <Label className="text-sm">{equipment}</Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {step === 5 && (
              <div className="space-y-4">
                <div>
                  <Label>Current Power Solution</Label>
                  <Select value={assessment.currentSolution} onValueChange={(value) => 
                    setAssessment(prev => ({ ...prev, currentSolution: value }))
                  }>
                    <SelectTrigger>
                      <SelectValue placeholder="Select current solution" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">No current power</SelectItem>
                      <SelectItem value="generator">Petrol/Diesel Generator</SelectItem>
                      <SelectItem value="grid">Unreliable Grid Connection</SelectItem>
                      <SelectItem value="kerosene">Kerosene Lamps</SelectItem>
                      <SelectItem value="batteries">Dry Cell Batteries</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Monthly Budget for Energy</Label>
                  <Select value={assessment.budget} onValueChange={(value) => 
                    setAssessment(prev => ({ ...prev, budget: value }))
                  }>
                    <SelectTrigger>
                      <SelectValue placeholder="Select budget range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="under-5000">Under ₦5,000</SelectItem>
                      <SelectItem value="5000-10000">₦5,000 - ₦10,000</SelectItem>
                      <SelectItem value="10000-20000">₦10,000 - ₦20,000</SelectItem>
                      <SelectItem value="20000-30000">₦20,000 - ₦30,000</SelectItem>
                      <SelectItem value="over-30000">Over ₦30,000</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            <div className="flex gap-4 pt-4">
              {step > 1 && (
                <Button variant="outline" onClick={() => setStep(step - 1)}>
                  Previous
                </Button>
              )}
              <Button 
                variant="solar" 
                onClick={handleNext}
                className="flex-1"
                disabled={
                  (step === 1 && !assessment.propertyType) ||
                  (step === 5 && (!assessment.currentSolution || !assessment.budget))
                }
              >
                {step === totalSteps ? 'Get Recommendation' : 'Next'}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EnergyAssessment;