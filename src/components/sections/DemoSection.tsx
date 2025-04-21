import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Eye, Shield, UserCheck, Bell, Play, AlertTriangle, CheckCircle } from 'lucide-react';
import PrivacyVisualizer from "@/components/PrivacyVisualizer";
import FeatureExampleDialog from "@/components/sections/FeatureExampleDialog";

const ConsentDemo = () => {
  const [consentGiven, setConsentGiven] = useState({
    analytics: false,
    dataStorage: false,
    thirdParty: false,
  });

  const toggleConsent = (type: keyof typeof consentGiven) => {
    setConsentGiven(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-ethic-midgray">
      <h3 className="text-xl font-semibold mb-4 flex items-center">
        <UserCheck className="mr-2 text-ethic-navy" size={20} />
        Consent Management Demo
      </h3>
      
      <div className="space-y-4">
        <div className="p-4 bg-ethic-lightgray rounded-lg">
          <p className="mb-4">Our EthicGuard consent layer allows you to:</p>
          <ul className="space-y-2">
            <li className="flex items-start">
              <CheckCircle size={16} className="text-ethic-green mr-2 mt-1" />
              <span>Give users granular control over data usage</span>
            </li>
            <li className="flex items-start">
              <CheckCircle size={16} className="text-ethic-green mr-2 mt-1" />
              <span>Clear explanations of how AI uses personal data</span>
            </li>
            <li className="flex items-start">
              <CheckCircle size={16} className="text-ethic-green mr-2 mt-1" />
              <span>Easy opt-in/opt-out capabilities</span>
            </li>
          </ul>
        </div>
        
        <div className="border border-ethic-midgray rounded-lg overflow-hidden">
          <div className="bg-ethic-navy text-white p-3 text-sm font-medium">
            Sample AI Data Usage Consent
          </div>
          <div className="p-4 space-y-4">
            <div className="flex items-start">
              <div className="mt-1">
                <div 
                  className={`w-5 h-5 rounded border flex items-center justify-center cursor-pointer ${consentGiven.analytics ? 'bg-ethic-green border-ethic-green' : 'border-gray-300'}`}
                  onClick={() => toggleConsent('analytics')}
                >
                  {consentGiven.analytics && <CheckCircle size={14} className="text-white" />}
                </div>
              </div>
              <div className="ml-3">
                <label className="font-medium text-gray-700 cursor-pointer" onClick={() => toggleConsent('analytics')}>
                  Analytics & Performance
                </label>
                <p className="text-sm text-gray-500">Allow AI to learn from interactions to improve performance</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="mt-1">
                <div 
                  className={`w-5 h-5 rounded border flex items-center justify-center cursor-pointer ${consentGiven.dataStorage ? 'bg-ethic-green border-ethic-green' : 'border-gray-300'}`}
                  onClick={() => toggleConsent('dataStorage')}
                >
                  {consentGiven.dataStorage && <CheckCircle size={14} className="text-white" />}
                </div>
              </div>
              <div className="ml-3">
                <label className="font-medium text-gray-700 cursor-pointer" onClick={() => toggleConsent('dataStorage')}>
                  Data Storage
                </label>
                <p className="text-sm text-gray-500">Store conversation history for continued context</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="mt-1">
                <div 
                  className={`w-5 h-5 rounded border flex items-center justify-center cursor-pointer ${consentGiven.thirdParty ? 'bg-ethic-green border-ethic-green' : 'border-gray-300'}`}
                  onClick={() => toggleConsent('thirdParty')}
                >
                  {consentGiven.thirdParty && <CheckCircle size={14} className="text-white" />}
                </div>
              </div>
              <div className="ml-3">
                <label className="font-medium text-gray-700 cursor-pointer" onClick={() => toggleConsent('thirdParty')}>
                  Third-Party Analysis
                </label>
                <p className="text-sm text-gray-500">Share anonymized data with research partners</p>
              </div>
            </div>
            
            <Button className="w-full bg-ethic-navy hover:bg-ethic-navy/90 mt-2">
              Save Preferences
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ShadowModeDemo = () => {
  const [activeItem, setActiveItem] = useState(0);
  
  const demoItems = [
    {
      input: "Approve customer loan application #45678",
      humanOutput: "Approved based on credit history and income verification",
      aiOutput: "Rejected based on zip code correlation with default rates",
      risk: "high",
      riskReason: "Potential geographic discrimination"
    },
    {
      input: "Recommend products for customer profile #12345",
      humanOutput: "Recommended mid-range products based on browsing history",
      aiOutput: "Recommended premium products based on demographic data",
      risk: "medium",
      riskReason: "Potential socioeconomic bias"
    },
    {
      input: "Process customer service request #34567",
      humanOutput: "Escalated to supervisor due to complex refund policy",
      aiOutput: "Handled with automated response and standard policy",
      risk: "low",
      riskReason: "No significant ethical concerns"
    }
  ];
  
  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-ethic-midgray">
      <h3 className="text-xl font-semibold mb-4 flex items-center">
        <Eye className="mr-2 text-ethic-navy" size={20} />
        Shadow Mode Comparison
      </h3>
      
      <div className="flex mb-4 overflow-x-auto pb-2">
        {demoItems.map((item, index) => (
          <div 
            key={index}
            className={`px-4 py-2 mr-2 rounded-md cursor-pointer whitespace-nowrap transition-colors ${activeItem === index ? 'bg-ethic-navy text-white' : 'bg-ethic-lightgray text-gray-600 hover:bg-ethic-midgray'}`}
            onClick={() => setActiveItem(index)}
          >
            Example {index + 1}
          </div>
        ))}
      </div>
      
      <div className="space-y-4">
        <div className="p-4 bg-ethic-lightgray rounded-lg">
          <div className="font-medium mb-1">Input</div>
          <div className="p-3 bg-white rounded border border-ethic-midgray">
            {demoItems[activeItem].input}
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 bg-ethic-lightgray rounded-lg">
            <div className="font-medium mb-1">Human Decision</div>
            <div className="p-3 bg-white rounded border border-ethic-midgray">
              {demoItems[activeItem].humanOutput}
            </div>
          </div>
          
          <div className="p-4 bg-ethic-lightgray rounded-lg">
            <div className="font-medium mb-1">AI Decision</div>
            <div className="p-3 bg-white rounded border border-ethic-midgray">
              {demoItems[activeItem].aiOutput}
            </div>
          </div>
        </div>
        
        <div className={`p-4 rounded-lg flex items-center ${
          demoItems[activeItem].risk === 'high' ? 'bg-red-50 text-red-700' :
          demoItems[activeItem].risk === 'medium' ? 'bg-yellow-50 text-yellow-700' :
          'bg-green-50 text-green-700'
        }`}>
          <AlertTriangle className="mr-2" size={20} />
          <div>
            <div className="font-medium capitalize">{demoItems[activeItem].risk} risk detected</div>
            <div className="text-sm">{demoItems[activeItem].riskReason}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

const RiskAlertsDemo = () => {
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      level: 'high',
      message: 'Gender bias detected in hiring recommendations',
      time: '2 minutes ago',
      seen: false
    },
    {
      id: 2,
      level: 'medium',
      message: 'Potential PII exposure in customer response',
      time: '15 minutes ago',
      seen: false
    },
    {
      id: 3,
      level: 'low',
      message: 'User consent preferences updated',
      time: '1 hour ago',
      seen: true
    },
    {
      id: 4,
      level: 'medium',
      message: 'Age correlation detected in credit scoring',
      time: '3 hours ago',
      seen: true
    }
  ]);

  const markAsSeen = (id: number) => {
    setAlerts(alerts.map(alert => 
      alert.id === id ? { ...alert, seen: true } : alert
    ));
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-ethic-midgray">
      <h3 className="text-xl font-semibold mb-4 flex items-center">
        <Bell className="mr-2 text-ethic-navy" size={20} />
        Real-Time Risk Alerts
      </h3>
      
      <div className="space-y-3">
        {alerts.map(alert => (
          <div 
            key={alert.id}
            className={`p-4 rounded-lg border ${alert.seen ? 'opacity-70' : ''} ${
              alert.level === 'high' ? 'bg-red-50 border-red-200' :
              alert.level === 'medium' ? 'bg-yellow-50 border-yellow-200' :
              'bg-blue-50 border-blue-200'
            }`}
            onClick={() => markAsSeen(alert.id)}
          >
            <div className="flex justify-between">
              <div className={`font-medium capitalize ${
                alert.level === 'high' ? 'text-red-700' :
                alert.level === 'medium' ? 'text-yellow-700' :
                'text-blue-700'
              }`}>
                {alert.level} priority
              </div>
              <div className="text-xs text-gray-500">{alert.time}</div>
            </div>
            <div className="mt-1">{alert.message}</div>
            {!alert.seen && (
              <Button 
                variant="outline" 
                size="sm" 
                className="mt-2 text-xs"
                onClick={() => markAsSeen(alert.id)}
              >
                Mark as resolved
              </Button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const DemoSection = () => {
  return (
    <section id="demo" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="section-heading">Interactive Demo</h2>
          <p className="section-subheading">
            See how EthicGuard helps you build ethical AI systems
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="shadow-mode" className="w-full">
            <TabsList className="grid grid-cols-4 mb-8">
              <TabsTrigger value="shadow-mode">
                <Eye className="mr-2" size={18} />
                Shadow Mode
              </TabsTrigger>
              <TabsTrigger value="privacy-visualizer">
                <Shield className="mr-2" size={18} />
                Privacy Visualizer
                {/* Info button only for Privacy Visualizer */}
                <span className="ml-1">
                  <FeatureExampleDialog featureId="privacy-visualizer">
                    <button
                      type="button"
                      title="Show Privacy Visualizer Example"
                      className="p-0.5 rounded-full bg-white hover:bg-emerald-50 border border-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-200 ml-1"
                      aria-label="Show Privacy Visualizer Example"
                      tabIndex={-1}
                      onClick={e => e.stopPropagation()}
                    >
                      <Shield className="w-4 h-4 text-emerald-500" />
                    </button>
                  </FeatureExampleDialog>
                </span>
              </TabsTrigger>
              <TabsTrigger value="consent-layer">
                <UserCheck className="mr-2" size={18} />
                Consent Layer
              </TabsTrigger>
              <TabsTrigger value="risk-alerts">
                <Bell className="mr-2" size={18} />
                Risk Alerts
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="shadow-mode" className="animate-fade-in">
              <ShadowModeDemo />
            </TabsContent>
            <TabsContent value="privacy-visualizer" className="animate-fade-in">
              <PrivacyVisualizer />
            </TabsContent>
            <TabsContent value="consent-layer" className="animate-fade-in">
              <ConsentDemo />
            </TabsContent>
            <TabsContent value="risk-alerts" className="animate-fade-in">
              <RiskAlertsDemo />
            </TabsContent>
          </Tabs>
          
          <div className="flex justify-center mt-8">
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-ethic-navy hover:bg-ethic-navy/90 text-white">
                  <Play className="mr-2" size={16} />
                  Watch Full Demo
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[700px]">
                <DialogHeader>
                  <DialogTitle>EthicGuard AI Demo Video</DialogTitle>
                </DialogHeader>
                <div className="aspect-video bg-ethic-navy rounded-md flex items-center justify-center">
                  <Play className="text-white opacity-50" size={64} />
                </div>
                <div className="text-center text-sm text-gray-500 mt-2">
                  Full demo video coming soon.
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DemoSection;
