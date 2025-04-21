import { useState } from "react";
import {
  User,
  Mail,
  MapPin,
  Smartphone,
  Activity,
  ArrowRight,
  Info,
  ToggleLeft,
  ToggleRight,
  AlertTriangle,
  Database,
  Server,
  Cloud,
  Users,
  Lock,
  Circle,
  MessageCircle,
} from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { 
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle 
} from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";

const DATA_TYPES = [
  {
    id: "name",
    label: "Name",
    icon: User,
    defaultSharing: "safe",
    color: "bg-green-500",
    tooltip: "Used for personalization.",
    details: {
      usage: "Shown in your profile and communications.",
      storage: "Stored encrypted on server.",
      access: "Only you & admin can see.",
      why: "Required to identify you within the platform"
    },
  },
  {
    id: "email",
    label: "Email",
    icon: Mail,
    defaultSharing: "safe",
    color: "bg-ethic-green",
    tooltip: "Email used for login only.",
    details: {
      usage: "Used to sign in and notifications.",
      storage: "Encrypted on our servers.",
      access: "Only you & app server.",
      why: "Required for account verification and notifications"
    },
  },
  {
    id: "location",
    label: "Location",
    icon: MapPin,
    defaultSharing: "risky",
    color: "bg-red-500",
    tooltip: "Location shared with 3rd parties for ads.",
    details: {
      usage: "Personalized offers & ads.",
      storage: "Sent to analytics provider.",
      access: "App server, partners.",
      why: "Used to provide location-specific services and targeted content"
    },
  },
  {
    id: "device",
    label: "Device Info",
    icon: Smartphone,
    defaultSharing: "optional",
    color: "bg-gray-400",
    tooltip: "Device type shared to help with support.",
    details: {
      usage: "Troubleshooting & improvements.",
      storage: "Temporarily cached.",
      access: "You & support staff (if needed).",
      why: "Improves troubleshooting and compatibility"
    },
  },
  {
    id: "behavior",
    label: "Behavior/Usage",
    icon: Activity,
    defaultSharing: "optional",
    color: "bg-gray-500",
    tooltip: "Used for UX research, with your permission.",
    details: {
      usage: "App improvement analytics.",
      storage: "Anonymized in analytics.",
      access: "Dev team (aggregate stats only).",
      why: "Helps us improve user experience and identify problems"
    },
  }
];

const DESTINATIONS = [
  {
    id: "server",
    label: "App Server",
    icon: Server,
    tooltip: "Our secure application servers",
    details: "All data is encrypted at rest and in transit to our servers.",
    color: "bg-blue-500"
  },
  {
    id: "cloud",
    label: "Cloud Storage",
    icon: Cloud,
    tooltip: "Secure cloud storage",
    details: "Some data is stored in secure cloud services with limited access.",
    color: "bg-purple-500"
  },
  {
    id: "third",
    label: "Third Parties",
    icon: Users,
    tooltip: "External partners and services",
    details: "Selected data may be shared with trusted third parties for specific purposes.",
    color: "bg-red-400"
  }
];

const DATA_FLOWS: FlowState[] = [
  { dataType: "name", destination: "server", risk: "safe", enabled: true },
  { dataType: "name", destination: "cloud", risk: "safe", enabled: true },
  { dataType: "name", destination: "third", risk: "risky", enabled: false },
  { dataType: "email", destination: "server", risk: "safe", enabled: true },
  { dataType: "email", destination: "third", risk: "risky", enabled: false },
  { dataType: "location", destination: "server", risk: "safe", enabled: true },
  { dataType: "location", destination: "third", risk: "risky", enabled: true },
  { dataType: "device", destination: "server", risk: "safe", enabled: true },
  { dataType: "device", destination: "cloud", risk: "optional", enabled: true },
  { dataType: "behavior", destination: "server", risk: "optional", enabled: true },
  { dataType: "behavior", destination: "third", risk: "risky", enabled: false },
];

type SharingRisk = "safe" | "risky" | "optional";

type FlowState = {
  dataType: string;
  destination: string;
  risk: SharingRisk;
  enabled: boolean;
}

export default function PrivacyVisualizer() {
  const [flowStates, setFlowStates] = useState<FlowState[]>(DATA_FLOWS);
  const [selectedDataType, setSelectedDataType] = useState<string | null>(null);
  const [selectedDestination, setSelectedDestination] = useState<string | null>(null);
  const [infoPanel, setInfoPanel] = useState<{
    visible: boolean;
    type: "data" | "destination" | "flow";
    id?: string;
    dataTypeId?: string;
    destinationId?: string;
  }>({ visible: false, type: "data" });

  const getFlowState = (dataTypeId: string, destinationId: string) => {
    return flowStates.find(
      flow => flow.dataType === dataTypeId && flow.destination === destinationId
    );
  };

  const getFlowPathStyle = (risk: SharingRisk, enabled: boolean) => {
    if (!enabled) {
      return "stroke-gray-200 stroke-[1.5px] opacity-30";
    }
    
    switch (risk) {
      case "safe": 
        return "stroke-green-500 stroke-[2px]";
      case "risky": 
        return "stroke-red-500 stroke-[2px]";
      case "optional": 
        return "stroke-gray-400 stroke-[1.5px] stroke-dasharray-[4,3]";
      default:
        return "stroke-gray-400 stroke-[1.5px]";
    }
  };

  const toggleFlow = (dataTypeId: string, destinationId: string) => {
    setFlowStates(prev => prev.map(flow => {
      if (flow.dataType === dataTypeId && flow.destination === destinationId) {
        const newState = !flow.enabled;
        
        toast({
          title: `${newState ? "Enabled" : "Disabled"} data flow`,
          description: `${DATA_TYPES.find(dt => dt.id === dataTypeId)?.label} to ${DESTINATIONS.find(d => d.id === destinationId)?.label} ${newState ? "enabled" : "disabled"}`,
        });
        
        return { ...flow, enabled: newState };
      }
      return flow;
    }));
  };

  const showInfoFor = (type: "data" | "destination" | "flow", id: string) => {
    if (type === "data") {
      setInfoPanel({ visible: true, type, id });
      setSelectedDataType(id);
      setSelectedDestination(null);
    } 
    else if (type === "destination") {
      setInfoPanel({ visible: true, type, id });
      setSelectedDestination(id);
      setSelectedDataType(null);
    } 
    else if (type === "flow") {
      const [dataTypeId, destinationId] = id.split("-to-");
      setInfoPanel({
        visible: true,
        type,
        dataTypeId, 
        destinationId
      });
      setSelectedDataType(dataTypeId);
      setSelectedDestination(destinationId);
    }
  };

  const closeInfoPanel = () => {
    setInfoPanel({ visible: false, type: "data" });
    setSelectedDataType(null);
    setSelectedDestination(null);
  };

  const anyRiskyFlowsActive = () => {
    return flowStates.some(flow => flow.risk === "risky" && flow.enabled);
  };

  const SVG_WIDTH = 900;
  const SVG_HEIGHT = 480;
  const LEFT_MARGIN = 120;
  const DATA_TYPE_X = 330;
  const DEST_X = 760;
  const DATA_TYPE_GAP = 80;
  const DEST_GAP = 110;

  return (
    <div className="flex flex-col md:flex-row gap-2 w-full min-h-[640px] pt-4 bg-shadow-background animate-fade-in">
      <div className="w-full md:w-64 bg-shadow-card rounded-2xl p-4 shrink-0 border border-shadow-border flex flex-col gap-2 h-fit self-start">
        <h3 className="font-semibold text-shadow-foreground mb-2">Data Types</h3>
        {DATA_TYPES.map(dt => (
          <div
            key={dt.id}
            onClick={() => showInfoFor("data", dt.id)}
            className={`flex items-center gap-2 px-2 py-2 rounded cursor-pointer group transition-all
              ${selectedDataType === dt.id ? "bg-ethic-accent/10 border-l-4 border-ethic-accent" : "hover:bg-shadow-muted"}`}
            tabIndex={0}
            aria-label={"View details for "+dt.label}
          >
            <dt.icon className="text-shadow-secondary flex-shrink-0" size={22} />
            <span className="font-medium">{dt.label}</span>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info size={15} className="ml-1 text-shadow-secondary group-hover:text-ethic-accent cursor-pointer" />
              </TooltipTrigger>
              <TooltipContent>{dt.tooltip}</TooltipContent>
            </Tooltip>
          </div>
        ))}
      </div>

      <div className="flex-1 flex flex-col items-center justify-center min-w-[340px] py-4">
        <div className="mb-4 w-full max-w-md text-center bg-white/60 rounded-xl shadow px-4 py-3 border border-shadow-border">
          <div className="text-lg font-semibold text-ethic-accent mb-1">
            Privacy Flow Visualizer
          </div>
          <div className="text-sm text-shadow-secondary">
            Explore how your data flows through our systems and to third parties. Toggle connections to simulate privacy controls.
          </div>
        </div>

        <div className="relative bg-shadow-card border border-shadow-border rounded-2xl p-6 w-full max-w-4xl h-[480px] shadow-sm flex items-center justify-center mx-auto mb-4">
          <svg
            width={SVG_WIDTH}
            height={SVG_HEIGHT}
            viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}
            className="block overflow-visible"
            aria-label="Data flow diagram"
          >
            <g transform={`translate(${LEFT_MARGIN}, ${SVG_HEIGHT / 2})`} className="cursor-pointer">
              <circle r="40" className="fill-blue-100 stroke-blue-400" />
              <User size={30} x={-15} y={-15} className="text-blue-500" />
              <text x="0" y="55" textAnchor="middle" className="fill-gray-700 font-medium">
                User
              </text>
            </g>

            <g>
              {DATA_TYPES.map((dt, idx) => {
                const yPos = 70 + idx * DATA_TYPE_GAP;
                const Icon = dt.icon;
                return (
                  <g
                    key={dt.id}
                    transform={`translate(${DATA_TYPE_X}, ${yPos})`}
                    className="cursor-pointer"
                    onClick={() => showInfoFor("data", dt.id)}
                  >
                    <rect
                      x="-60"
                      y="-20"
                      width="120"
                      height="40"
                      rx="10"
                      className={`${selectedDataType === dt.id ? 'stroke-ethic-accent stroke-2' : 'stroke-gray-300'} fill-white`}
                    />
                    <Icon size={20} x={-50} y={-10} className="text-gray-600" />
                    <text x="0" y="5" textAnchor="middle" className="fill-gray-700 font-medium text-sm">
                      {dt.label}
                    </text>
                  </g>
                );
              })}
            </g>

            <g>
              {DESTINATIONS.map((dest, idx) => {
                const yPos = 100 + idx * DEST_GAP + (idx === 2 ? 30 : 0);
                const Icon = dest.icon;
                return (
                  <g
                    key={dest.id}
                    transform={`translate(${DEST_X}, ${yPos})`}
                    className="cursor-pointer"
                    onClick={() => showInfoFor("destination", dest.id)}
                  >
                    <circle
                      r="35"
                      className={`${dest.color}/20 ${selectedDestination === dest.id ? 'stroke-ethic-accent stroke-2' : `stroke-${dest.color}`}`}
                    />
                    <Icon size={24} x={-12} y={-12} className={`text-${dest.color.replace('bg-', '')}`} />
                    <text x="0" y="50" textAnchor="middle" className="fill-gray-700 font-medium text-xs">
                      {dest.label}
                    </text>
                  </g>
                );
              })}
            </g>

            <g>
              {DATA_TYPES.map((dt, dtIdx) => {
                const dtY = 70 + dtIdx * DATA_TYPE_GAP;
                return DESTINATIONS.map((dest, destIdx) => {
                  const destY = 100 + destIdx * DEST_GAP + (destIdx === 2 ? 30 : 0);
                  const flow = getFlowState(dt.id, dest.id);
                  if (!flow) return null;

                  const path =
                    `M ${DATA_TYPE_X + 60} ${dtY} ` +
                    `C ${DATA_TYPE_X + 180} ${dtY}, ${DEST_X - 180} ${destY}, ${DEST_X - 35} ${destY}`;
                  const pathStyle = getFlowPathStyle(flow.risk, flow.enabled);

                  const ctrlX = (DATA_TYPE_X + DEST_X) / 2;
                  const ctrlY = dtY + (destY - dtY) * 0.5;

                  return (
                    <g key={`${dt.id}-${dest.id}`}>
                      <defs>
                        <marker
                          id={`arrowhead-${dt.id}-${dest.id}`}
                          markerWidth="10"
                          markerHeight="7"
                          refX="10"
                          refY="3.5"
                          orient="auto"
                        >
                          <polygon
                            points="0 0, 10 3.5, 0 7"
                            className={flow.enabled ?
                              (flow.risk === "safe" ? "fill-green-500" :
                                flow.risk === "risky" ? "fill-red-500" :
                                  "fill-gray-400") : "fill-gray-200"}
                          />
                        </marker>
                      </defs>
                      <path
                        d={path}
                        className={`${pathStyle} transition-all duration-300`}
                        markerEnd={`url(#arrowhead-${dt.id}-${dest.id})`}
                        onClick={() => showInfoFor("flow", `${dt.id}-to-${dest.id}`)}
                        style={{ cursor: "pointer" }}
                      />

                      <g
                        transform={`translate(${ctrlX}, ${ctrlY})`}
                        onClick={() => toggleFlow(dt.id, dest.id)}
                        className="cursor-pointer"
                      >
                        <rect
                          x="-25"
                          y="-14"
                          width="50"
                          height="28"
                          rx="14"
                          className={`${
                            flow.enabled ? (
                              flow.risk === "safe"
                                ? "fill-green-100 stroke-green-400"
                                : flow.risk === "risky"
                                  ? "fill-red-100 stroke-red-400"
                                  : "fill-gray-100 stroke-gray-400"
                            ) : "fill-gray-100 stroke-gray-300"
                          }`}
                        />
                        <text
                          x="0"
                          y="5"
                          textAnchor="middle"
                          className={`text-xs font-medium ${
                            flow.enabled ? (
                              flow.risk === "safe"
                                ? "fill-green-700"
                                : flow.risk === "risky"
                                  ? "fill-red-700"
                                  : "fill-gray-700"
                            ) : "fill-gray-400"
                          }`}
                        >
                          {flow.enabled ? "ON" : "OFF"}
                        </text>
                      </g>

                      {flow.enabled && (
                        <circle
                          r="3"
                          className={flow.risk === "safe"
                            ? "fill-green-500"
                            : flow.risk === "risky"
                              ? "fill-red-500"
                              : "fill-gray-400"}
                        >
                          <animateMotion
                            dur="3s"
                            repeatCount="indefinite"
                            path={path}
                          />
                        </circle>
                      )}
                    </g>
                  );
                });
              })}
            </g>

            {anyRiskyFlowsActive() && (
              <g transform={`translate(${SVG_WIDTH / 2}, ${SVG_HEIGHT - 25})`}>
                <rect
                  x="-180"
                  y="-15"
                  width="360"
                  height="30"
                  rx="6"
                  className="fill-red-100 stroke-red-300"
                />
                <AlertTriangle x={-170} y={-7} size={20} className="text-red-500" />
                <text x="20" y="5" className="fill-red-700 text-xs font-medium">
                  Risk Alert: Data flows with potential privacy concerns are active
                </text>
              </g>
            )}
          </svg>

          <div className="absolute top-3 right-3 w-64 z-10 bg-white/95 border border-shadow-border rounded-xl shadow-md p-4 animate-fade-in">
            {infoPanel.visible && (
              <div>
                {infoPanel.type === "data" && (
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-semibold flex items-center gap-1.5">
                        {(() => {
                          const dataType = DATA_TYPES.find(dt => dt.id === infoPanel.id);
                          const Icon = dataType?.icon;
                          return (
                            <>
                              {Icon && <Icon size={18} className="text-ethic-accent" />}
                              <span>{dataType?.label}</span>
                            </>
                          );
                        })()}
                      </h4>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={closeInfoPanel}
                        className="h-6 w-6"
                      >
                        ×
                      </Button>
                    </div>
                    <div className="mb-2 text-xs space-y-1">
                      <div className="flex gap-2">
                        <strong className="text-gray-700">Why Collected:</strong>
                        <span className="text-gray-600">
                          {DATA_TYPES.find(dt => dt.id === infoPanel.id)?.details.why}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <strong className="text-gray-700">Storage:</strong>
                        <span className="text-gray-600">
                          {DATA_TYPES.find(dt => dt.id === infoPanel.id)?.details.storage}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <strong className="text-gray-700">Access:</strong>
                        <span className="text-gray-600">
                          {DATA_TYPES.find(dt => dt.id === infoPanel.id)?.details.access}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {infoPanel.type === "destination" && (
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-semibold flex items-center gap-1.5">
                        {(() => {
                          const destination = DESTINATIONS.find(d => d.id === infoPanel.id);
                          const Icon = destination?.icon;
                          return (
                            <>
                              {Icon && <Icon size={18} className="text-gray-700" />}
                              <span>{destination?.label}</span>
                            </>
                          );
                        })()}
                      </h4>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={closeInfoPanel}
                        className="h-6 w-6"
                      >
                        ×
                      </Button>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">
                      {DESTINATIONS.find(d => d.id === infoPanel.id)?.details}
                    </p>
                    <div className="text-xs text-gray-700">
                      <p className="font-medium mb-1">Data received:</p>
                      <ul className="space-y-1">
                        {DATA_TYPES.map(dt => {
                          const flow = getFlowState(dt.id, infoPanel.id || "");
                          if (!flow) return null;
                          return (
                            <li key={dt.id} className="flex items-center gap-2">
                              <div className={`w-2 h-2 rounded-full ${flow.enabled ? (
                                flow.risk === "safe" ? "bg-green-500" : 
                                flow.risk === "risky" ? "bg-red-500" : 
                                "bg-gray-400"
                              ) : "bg-gray-200"}`}></div>
                              <span>{dt.label}</span>
                              <span className={`ml-auto text-xs ${flow.enabled ? "text-gray-700" : "text-gray-400"}`}>
                                {flow.enabled ? "Active" : "Inactive"}
                              </span>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                )}

                {infoPanel.type === "flow" && (
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-semibold flex items-center gap-1.5">
                        Data Flow
                      </h4>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={closeInfoPanel}
                        className="h-6 w-6"
                      >
                        ×
                      </Button>
                    </div>

                    {(() => {
                      const dataType = DATA_TYPES.find(dt => dt.id === infoPanel.dataTypeId);
                      const destination = DESTINATIONS.find(d => d.id === infoPanel.destinationId);
                      const flow = getFlowState(infoPanel.dataTypeId || "", infoPanel.destinationId || "");

                      if (!dataType || !destination || !flow) return null;

                      const DataIcon = dataType.icon;
                      const DestIcon = destination.icon;

                      return (
                        <>
                          <div className="flex items-center justify-center gap-2 mb-2">
                            <div className="flex items-center gap-1">
                              <DataIcon size={16} className="text-gray-600" />
                              <span className="text-xs">{dataType.label}</span>
                            </div>
                            <ArrowRight size={14} className="text-gray-400" />
                            <div className="flex items-center gap-1">
                              <DestIcon size={16} className="text-gray-600" />
                              <span className="text-xs">{destination.label}</span>
                            </div>
                          </div>

                          <div className="flex flex-col gap-1 text-xs mb-3">
                            <div className="flex items-center justify-between">
                              <span className="text-gray-600">Status:</span>
                              <span className={`font-medium ${flow.enabled ? "text-green-600" : "text-gray-500"}`}>
                                {flow.enabled ? "Active" : "Inactive"}
                              </span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-gray-600">Risk Level:</span>
                              <span className={`font-medium ${
                                flow.risk === "safe" ? "text-green-600" :
                                flow.risk === "risky" ? "text-red-600" :
                                "text-gray-600"
                              }`}>
                                {flow.risk === "safe" ? "Safe" :
                                 flow.risk === "risky" ? "Risky" :
                                 "Optional"}
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center justify-between pt-2 border-t border-gray-200">
                            <span className="text-sm">Toggle Flow:</span>
                            <Switch
                              checked={flow.enabled}
                              onCheckedChange={() => toggleFlow(dataType.id, destination.id)}
                            />
                          </div>
                        </>
                      );
                    })()}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="px-4 py-2 bg-white/70 rounded-xl border border-shadow-border shadow-sm flex flex-wrap gap-4 items-center justify-center text-sm">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span>Safe Flow</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <span>Risky Flow</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-0.5 bg-gray-400" style={{ width: '12px' }}></div>
            <div className="w-3 h-0.5 bg-transparent" style={{ width: '3px' }}></div>
            <div className="w-3 h-0.5 bg-gray-400" style={{ width: '12px' }}></div>
            <span>Optional Flow</span>
          </div>
        </div>
      </div>
    </div>
  );
}
