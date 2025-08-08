import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Sun, 
  Zap, 
  Users, 
  TrendingUp, 
  Shield, 
  MapPin,
  ArrowRight,
  CheckCircle
} from "lucide-react";
import { Link } from "react-router-dom";

const Home = () => {
  const features = [
    {
      icon: <Sun className="h-6 w-6" />,
      title: "Smart Energy Assessment",
      description: "Get personalized solar kit recommendations based on your specific energy needs."
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: "Flexible Financing",
      description: "Pay-as-you-go plans that work with your budget and mobile money."
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Community Powered",
      description: "Local partners ensure proper installation and ongoing support."
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Trusted Platform",
      description: "Transparent tracking of your payments, usage, and environmental impact."
    }
  ];

  const stats = [
    { label: "Communities Served", value: "250+" },
    { label: "Solar Kits Installed", value: "5,000+" },
    { label: "Families Powered", value: "15,000+" },
    { label: "CO₂ Saved (tons)", value: "750+" }
  ];

  const successStories = [
    {
      name: "Amina's Clinic",
      location: "Kano State",
      impact: "24/7 power for medical equipment",
      image: "👩‍⚕️"
    },
    {
      name: "Village School",
      location: "Kwara State", 
      impact: "Evening classes for 200+ students",
      image: "🏫"
    },
    {
      name: "Hassan's Shop",
      location: "Kaduna State",
      impact: "50% increase in business hours",
      image: "🏪"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/10">
      {/* Hero Section */}
      <section className="px-4 py-20 mx-auto max-w-7xl">
        <div className="text-center">
          <Badge variant="secondary" className="mb-6">
            <Zap className="h-4 w-4 mr-2" />
            Powering Progress, One Panel at a Time
          </Badge>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
            Bring Solar Energy to Your Community
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            SolarBright connects underserved communities with affordable solar solutions. 
            From homes to schools to clinics - reliable power for everyone.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/assessment">
              <Button variant="solar" size="lg" className="w-full sm:w-auto">
                Start Energy Assessment
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/financing">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                View Financing Options
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 py-20 bg-card/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">How SolarBright Works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our platform makes solar energy accessible through smart matching, 
              flexible payments, and community support.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="px-4 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Success Stories</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Real impact in communities across Nigeria
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {successStories.map((story, index) => (
              <Card key={index} className="text-center border-0 shadow-lg">
                <CardHeader>
                  <div className="text-4xl mb-4">{story.image}</div>
                  <CardTitle className="flex items-center justify-center gap-2">
                    {story.name}
                    <CheckCircle className="h-5 w-5 text-success" />
                  </CardTitle>
                  <CardDescription className="flex items-center justify-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {story.location}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm font-medium text-success">{story.impact}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-20 bg-gradient-to-r from-primary/10 to-secondary/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Power Your Future?</h2>
          <p className="text-muted-foreground mb-8">
            Join thousands of families, schools, and businesses already benefiting from clean solar energy.
          </p>
          <Link to="/assessment">
            <Button variant="energy" size="lg">
              Get Your Solar Kit Today
              <Sun className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;