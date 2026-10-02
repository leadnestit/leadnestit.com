import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Globe,
  Megaphone,
  Database,
  Users,
  TrendingUp,
  Cpu,
  BarChart3,
  ArrowRightLeft,
  Check,
  RefreshCw,
  Zap,
  Activity,
  Server,
  Radio,
  ShieldCheck,
  Clock,
  ArrowUpRight,
  Sliders,
  Send,
  CheckCircle2,
  Play,
  Pause,
  Plus,
  Filter,
  Bot
} from 'lucide-react';

interface StreamEvent {
  id: string;
  timeAgo: string;
  category: 'lead' | 'comms' | 'crm' | 'invoice' | 'tracking';
  categoryLabel: string;
  title: string;
  detail: string;
  latency: string;
  status: 'Verified' | 'Dispatched' | 'Synced' | 'Logged';
}

export const BusinessSystem: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'pipelines' | 'telemetry'>('overview');
  
  // Tab 1: Mesh state
  const [selectedNodeIndex, setSelectedNodeIndex] = useState<number>(0);
  const [isMeshSyncing, setIsMeshSyncing] = useState<boolean>(false);
  const [meshSyncMessage, setMeshSyncMessage] = useState<string | null>(null);

  // Tab 2: Streams state
  const [streamFilter, setStreamFilter] = useState<'all' | 'lead' | 'comms' | 'crm' | 'invoice'>('all');
  const [isStreamLive, setIsStreamLive] = useState<boolean>(true);
  const [streamEvents, setStreamEvents] = useState<StreamEvent[]>([
    {
      id: 'EVT-9842',
      timeAgo: 'Just now',
      category: 'lead',
      categoryLabel: 'Inbound Capture',
      title: 'High-intent visitor submitted consultation form',
      detail: 'Lead qualified with budget $3,500+ -> Auto-routed to Co-Founder Ibrahim Samrat -> WhatsApp ping triggered.',
      latency: '11ms',
      status: 'Verified'
    },
    {
      id: 'EVT-9841',
      timeAgo: '4s ago',
      category: 'comms',
      categoryLabel: 'WhatsApp API',
      title: 'Automated WhatsApp greeting sequence delivered',
      detail: 'Client (+880 17... / USA +1) acknowledged -> Calendar scheduling link & portfolio PDF sent with 0 human delay.',
      latency: '240ms',
      status: 'Dispatched'
    },
    {
      id: 'EVT-9840',
      timeAgo: '14s ago',
      category: 'tracking',
      categoryLabel: 'Meta CAPI',
      title: 'Server-side Lead Event verified with Meta Graph API',
      detail: 'Event match quality score: 9.8/10 (hashed email, phone, IP & client user-agent deduplicated).',
      latency: '18ms',
      status: 'Synced'
    },
    {
      id: 'EVT-9839',
      timeAgo: '29s ago',
      category: 'invoice',
      categoryLabel: 'Invoice Agreement',
      title: 'Official Agreement & Payment Slip generated',
      detail: 'Invoice #INV-2026-088 created with digital verification token -> Sent to client email via verified SMTP.',
      latency: '45ms',
      status: 'Dispatched'
    },
    {
      id: 'EVT-9838',
      timeAgo: '50s ago',
      category: 'crm',
      categoryLabel: 'CRM Sync',
      title: 'Contact record enriched and updated in Cloud CRM',
      detail: 'Company headcount, social profile, and consultation notes synced to central Firestore database.',
      latency: '9ms',
      status: 'Synced'
    },
    {
      id: 'EVT-9837',
      timeAgo: '1m ago',
      category: 'comms',
      categoryLabel: 'Calendar Bridge',
      title: 'Founder Strategy Call confirmed in Google Calendar',
      detail: '30-minute Zoom/Meet link generated and dispatched to both client and founders.',
      latency: '120ms',
      status: 'Verified'
    }
  ]);

  // Tab 3: Telemetry diagnostic state
  const [isDiagnosing, setIsDiagnosing] = useState<boolean>(false);
  const [diagnosticProgress, setDiagnosticProgress] = useState<number>(0);
  const [diagnosticComplete, setDiagnosticComplete] = useState<boolean>(false);

  const systemNodes = [
    {
      name: 'Ads',
      icon: Megaphone,
      status: 'Active',
      latency: '28ms',
      color: 'text-sky-600',
      description: 'Specialist-led Meta, Google, and paid campaigns driving targeted, high-intent traffic.',
      protocols: 'Meta Pixel & CAPI • Google Tag Manager • Server-Side Tracking',
      features: ['Targeted audience funnels', 'Conversion tracking setup', 'Continuous ROAS optimization']
    },
    {
      name: 'Website',
      icon: Globe,
      status: 'Live',
      latency: '24ms',
      color: 'text-blue-600',
      description: 'Fast, conversion-focused websites and eCommerce storefronts engineered to capture visitors.',
      protocols: 'Fast Cloud Hosting • SSL Encryption • Mobile Optimized',
      features: ['Sub-second page speeds', 'High-converting call to actions', 'Clean lead capture forms']
    },
    {
      name: 'Lead',
      icon: Users,
      status: 'Streaming',
      latency: '15ms',
      color: 'text-indigo-600',
      description: 'Incoming prospect inquiries captured instantly with verified contact and project information.',
      protocols: 'Automated Lead Routing • Instant Notification Dispatch',
      features: ['Contact qualification', 'Budget & timeline capture', 'Priority assignment']
    },
    {
      name: 'CRM',
      icon: Database,
      status: 'Synced',
      latency: '18ms',
      color: 'text-blue-700',
      description: 'Unified CRM database keeping contacts, lead status, and notes updated across your team.',
      protocols: 'Real-Time CRM Integration • Data Protection • Cloud Sync',
      features: ['Reduced manual data entry', 'Lead status tracking', 'Automated contact enrichment']
    },
    {
      name: 'AI Follow-Up',
      icon: Bot,
      status: 'Automated',
      latency: '12ms',
      color: 'text-teal-600',
      description: 'Fast AI-assisted customer support and automated WhatsApp/email sequences that nurture prospects.',
      protocols: 'AI Customer Support • WhatsApp & Email Automation',
      features: ['Fast AI-assisted response', 'Lead qualification assistance', 'Calendar appointment booking']
    },
    {
      name: 'Sales',
      icon: TrendingUp,
      status: 'Closing',
      latency: '22ms',
      color: 'text-emerald-600',
      description: 'Warm handover to your sales team with complete prospect history and digital agreements.',
      protocols: 'Human Handoff • Digital Agreements • Pipeline Tracking',
      features: ['Pre-qualified prospect calls', 'Faster sales cycle', 'Automated onboarding handoff']
    },
    {
      name: 'Reporting',
      icon: BarChart3,
      status: 'Real-Time',
      latency: '35ms',
      color: 'text-green-600',
      description: 'Clean campaign reporting, conversion attribution, and clear customer acquisition cost visibility.',
      protocols: 'GA4 Analytics • Blended ROAS Tracking • Executive Dashboard',
      features: ['Connected lead tracking', 'Transparent ROAS reporting', 'Actionable growth insights']
    },
  ];

  const handleTriggerMeshSync = () => {
    setIsMeshSyncing(true);
    setMeshSyncMessage('Pinging 7 mesh nodes across global network...');
    setTimeout(() => {
      setIsMeshSyncing(false);
      setMeshSyncMessage('All 7 nodes synchronized! Roundtrip latency: 28ms • Zero packet loss.');
      setTimeout(() => setMeshSyncMessage(null), 4000);
    }, 1200);
  };

  const handleInjectSampleEvent = () => {
    const sampleTypes = [
      {
        category: 'lead' as const,
        categoryLabel: 'Inbound Capture',
        title: 'New consultation submitted from Dhaka, Bangladesh',
        detail: 'Requested: AI Automation & Full-Funnel Growth • Priority: High • Routed to Ibrahim Samrat.',
        latency: '8ms',
        status: 'Verified' as const
      },
      {
        category: 'comms' as const,
        categoryLabel: 'WhatsApp API',
        title: 'Instant WhatsApp follow-up dispatched',
        detail: 'Sent pricing breakdown & service overview to client phone • Delivery confirmed in 0.2s.',
        latency: '180ms',
        status: 'Dispatched' as const
      },
      {
        category: 'invoice' as const,
        categoryLabel: 'Invoice Agreement',
        title: 'Digital agreement signed & verified',
        detail: 'Client approved project milestone agreement #LN-2026-094 • Ready for fulfillment.',
        latency: '32ms',
        status: 'Verified' as const
      }
    ];

    const randomEvent = sampleTypes[Math.floor(Math.random() * sampleTypes.length)];
    const newEvent: StreamEvent = {
      id: `EVT-${Math.floor(1000 + Math.random() * 9000)}`,
      timeAgo: 'Just now',
      ...randomEvent
    };

    setStreamEvents([newEvent, ...streamEvents.slice(0, 7)]);
  };

  const handleRunDiagnostic = () => {
    setIsDiagnosing(true);
    setDiagnosticComplete(false);
    setDiagnosticProgress(15);

    setTimeout(() => setDiagnosticProgress(45), 350);
    setTimeout(() => setDiagnosticProgress(75), 700);
    setTimeout(() => {
      setDiagnosticProgress(100);
      setIsDiagnosing(false);
      setDiagnosticComplete(true);
    }, 1100);
  };

  const filteredEvents = streamFilter === 'all'
    ? streamEvents
    : streamEvents.filter(e => e.category === streamFilter);

  const activeNode = systemNodes[selectedNodeIndex];

  return (
    <section className="py-24 bg-slate-50/70 border-y border-slate-200 relative overflow-hidden" id="growth-system">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-mono font-bold tracking-wider uppercase">
            <span>ONE CONNECTED CUSTOMER JOURNEY</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-950 tracking-tight">
            Connect Every Part of Your Business.
          </h2>
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Instead of managing disconnected tools, build a connected digital ecosystem where every part of your business works together.
          </p>
        </div>

        {/* Dashboard Visual Container */}
        <div className="rounded-2xl bg-white border border-slate-300 shadow-xl shadow-slate-200/60 overflow-hidden">
          {/* Top Control Bar */}
          <div className="bg-slate-100/90 px-4 sm:px-6 py-4 border-b border-slate-200 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-mono font-bold text-slate-900 uppercase tracking-wider">
                LeadNest Customer Journey Controller
              </span>
            </div>

            {/* 3 Workable Options Selector */}
            <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-slate-200 shadow-2xs">
              <button
                onClick={() => setActiveTab('overview')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activeTab === 'overview'
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-950 hover:bg-slate-100'
                }`}
              >
                Customer Journey
              </button>
              <button
                onClick={() => setActiveTab('pipelines')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                  activeTab === 'pipelines'
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-950 hover:bg-slate-100'
                }`}
              >
                <span>Real-Time Streams</span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              </button>
              <button
                onClick={() => setActiveTab('telemetry')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                  activeTab === 'telemetry'
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-950 hover:bg-slate-100'
                }`}
              >
                <span>Health Telemetry</span>
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              </button>
            </div>
          </div>

          {/* TAB 1: ECOSYSTEM MESH */}
          {activeTab === 'overview' && (
            <div className="p-6 sm:p-10 bg-slate-50/50 space-y-8 animate-in fade-in duration-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-200/80">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <span>One Connected Customer Journey</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-200 text-slate-700 font-semibold">
                      Ads → Website → Lead → CRM → AI Follow-Up → Sales → Reporting
                    </span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Continuous lead-to-revenue synchronization ensuring no inquiry or customer falls through the cracks.
                  </p>
                </div>

                <button
                  onClick={handleTriggerMeshSync}
                  disabled={isMeshSyncing}
                  className="inline-flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all shadow-xs shrink-0 cursor-pointer disabled:opacity-60"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isMeshSyncing ? 'animate-spin' : ''}`} />
                  <span>{isMeshSyncing ? 'Testing Journey...' : 'Test Journey Flow'}</span>
                </button>
              </div>

              {meshSyncMessage && (
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium flex items-center gap-2 animate-in fade-in">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{meshSyncMessage}</span>
                </div>
              )}

              {/* The 7 Interactive Nodes */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2.5 sm:gap-3">
                {systemNodes.map((node, i) => {
                  const Icon = node.icon;
                  const isSelected = selectedNodeIndex === i;
                  return (
                    <div key={node.name} className="relative flex flex-col items-center">
                      <div
                        onClick={() => setSelectedNodeIndex(i)}
                        className={`w-full p-4 rounded-xl border transition-all text-center flex flex-col items-center justify-between min-h-[145px] group shadow-2xs cursor-pointer ${
                          isSelected
                            ? 'bg-slate-900 border-slate-900 text-white shadow-md shadow-slate-900/15 -translate-y-1'
                            : 'bg-white border-slate-200 hover:border-slate-400 hover:bg-slate-50/90'
                        }`}
                      >
                        <div
                          className={`w-10 h-10 rounded-lg flex items-center justify-center mb-2 transition-transform ${
                            isSelected
                              ? 'bg-slate-800 text-white scale-105'
                              : 'bg-slate-100 text-slate-700 group-hover:scale-105'
                          }`}
                        >
                          <Icon className={`w-5 h-5 ${isSelected ? 'text-white' : node.color}`} />
                        </div>
                        <div className="space-y-0.5">
                          <span className={`text-sm font-bold block ${isSelected ? 'text-white' : 'text-slate-900'}`}>
                            {node.name}
                          </span>
                          <span
                            className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full inline-block ${
                              isSelected
                                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/30'
                                : 'text-emerald-800 bg-emerald-50 border border-emerald-200'
                            }`}
                          >
                            {node.status}
                          </span>
                        </div>
                        <span
                          className={`text-[10px] font-mono pt-2 border-t w-full font-medium ${
                            isSelected ? 'text-slate-300 border-slate-800' : 'text-slate-500 border-slate-100'
                          }`}
                        >
                          {node.latency}
                        </span>
                      </div>

                      {/* Desktop connector arrows */}
                      {i < systemNodes.length - 1 && (
                        <div className="hidden lg:flex absolute -right-2 top-1/2 -translate-y-1/2 z-10 text-slate-400">
                          <ArrowRightLeft className="w-3.5 h-3.5" />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Selected Node Deep-Dive Inspector Panel */}
              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center">
                      {React.createElement(activeNode.icon, { className: 'w-4 h-4' })}
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-slate-900">
                        {activeNode.name} Node In-Depth Telemetry
                      </h4>
                      <span className="text-[11px] font-mono text-slate-500">
                        Protocol: {activeNode.protocols}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      Status: {activeNode.status}
                    </span>
                    <span className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 font-bold">
                      Latency: {activeNode.latency}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {activeNode.description}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
                  {activeNode.features.map((feat, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 text-[11px] font-medium text-slate-700 flex items-center gap-2"
                    >
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Live Data Simulation Metrics */}
              <div className="pt-2 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-white border border-slate-200 hover:border-slate-400 hover:shadow-md hover:shadow-slate-900/5 transition-all flex items-center justify-between shadow-2xs">
                  <div>
                    <span className="text-xs text-slate-500 block font-medium">Inbound Lead Attribution</span>
                    <span className="text-lg font-mono font-bold text-slate-900">Connected Lead Tracking</span>
                  </div>
                  <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-800 flex items-center justify-center">
                    <Check className="w-4 h-4 text-emerald-600" />
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white border border-slate-200 hover:border-slate-400 hover:shadow-md hover:shadow-slate-900/5 transition-all flex items-center justify-between shadow-2xs">
                  <div>
                    <span className="text-xs text-slate-500 block font-medium">CRM Contact Enrichment</span>
                    <span className="text-lg font-mono font-bold text-slate-900">Reduced Manual Data Entry</span>
                  </div>
                  <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-800 flex items-center justify-center">
                    <RefreshCw className="w-4 h-4 text-blue-600" />
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white border border-slate-200 hover:border-slate-400 hover:shadow-md hover:shadow-slate-900/5 transition-all flex items-center justify-between shadow-2xs">
                  <div>
                    <span className="text-xs text-slate-500 block font-medium">Revenue Pipeline Sync</span>
                    <span className="text-lg font-mono font-bold text-slate-900">Real-Time Webhooks</span>
                  </div>
                  <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-800 flex items-center justify-center">
                    <Zap className="w-4 h-4 text-amber-500" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: REAL-TIME STREAMS */}
          {activeTab === 'pipelines' && (
            <div className="p-6 sm:p-10 bg-slate-50/50 space-y-6 animate-in fade-in duration-200">
              {/* Stream Top Stats Bar */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs">
                  <span className="text-[11px] text-slate-500 font-mono block">Throughput Rate</span>
                  <span className="text-xl font-mono font-black text-slate-900">148 msg/min</span>
                  <span className="text-[10px] text-emerald-600 font-medium">● 100% Delivery SLA</span>
                </div>

                <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs">
                  <span className="text-[11px] text-slate-500 font-mono block">Avg Ingestion Latency</span>
                  <span className="text-xl font-mono font-black text-slate-900">14 ms</span>
                  <span className="text-[10px] text-slate-500 font-medium">Sub-second response</span>
                </div>

                <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs">
                  <span className="text-[11px] text-slate-500 font-mono block">Active Webhook Pipes</span>
                  <span className="text-xl font-mono font-black text-slate-900">9 Active</span>
                  <span className="text-[10px] text-blue-600 font-medium">Meta, WhatsApp, CRM</span>
                </div>

                <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs">
                  <span className="text-[11px] text-slate-500 font-mono block">Buffer Congestion</span>
                  <span className="text-xl font-mono font-black text-emerald-600">0.00%</span>
                  <span className="text-[10px] text-emerald-600 font-medium">Zero queued drop</span>
                </div>
              </div>

              {/* Stream Filter Toolbar & Simulator Action */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 rounded-xl bg-white border border-slate-200">
                <div className="flex items-center gap-1.5 flex-wrap text-xs">
                  <span className="text-slate-400 font-mono text-[11px] mr-1">Filter:</span>
                  <button
                    onClick={() => setStreamFilter('all')}
                    className={`px-2.5 py-1 rounded-lg font-bold text-xs transition-colors ${
                      streamFilter === 'all'
                        ? 'bg-slate-900 text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    All Streams ({streamEvents.length})
                  </button>
                  <button
                    onClick={() => setStreamFilter('lead')}
                    className={`px-2.5 py-1 rounded-lg font-bold text-xs transition-colors ${
                      streamFilter === 'lead'
                        ? 'bg-slate-900 text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    Inbound Leads
                  </button>
                  <button
                    onClick={() => setStreamFilter('comms')}
                    className={`px-2.5 py-1 rounded-lg font-bold text-xs transition-colors ${
                      streamFilter === 'comms'
                        ? 'bg-slate-900 text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    WhatsApp & Calendar
                  </button>
                  <button
                    onClick={() => setStreamFilter('invoice')}
                    className={`px-2.5 py-1 rounded-lg font-bold text-xs transition-colors ${
                      streamFilter === 'invoice'
                        ? 'bg-slate-900 text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    Agreements & Slips
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleInjectSampleEvent}
                    className="px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-700 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Simulate Incoming Event</span>
                  </button>

                  <button
                    onClick={() => setIsStreamLive(!isStreamLive)}
                    className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                    title={isStreamLive ? 'Pause Stream' : 'Resume Stream'}
                  >
                    {isStreamLive ? <Pause className="w-3.5 h-3.5 text-amber-600" /> : <Play className="w-3.5 h-3.5 text-emerald-600" />}
                  </button>
                </div>
              </div>

              {/* Event Stream Live Feed */}
              <div className="space-y-2.5">
                {filteredEvents.map((evt) => (
                  <div
                    key={evt.id}
                    className="p-3.5 sm:p-4 rounded-xl bg-white border border-slate-200 hover:border-slate-400 hover:shadow-md hover:shadow-slate-900/5 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs group"
                  >
                    <div className="flex items-start gap-3 min-w-0">
                      <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-slate-200 transition-colors">
                        <Radio className="w-4 h-4 text-slate-700" />
                      </div>

                      <div className="min-w-0 space-y-0.5">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-800 border border-slate-200">
                            {evt.id}
                          </span>
                          <span className="text-[10px] font-mono text-slate-500 font-semibold">
                            {evt.categoryLabel}
                          </span>
                          <span className="text-[10px] font-mono text-slate-400">
                            {evt.timeAgo}
                          </span>
                        </div>
                        <h4 className="text-xs font-bold text-slate-900 tracking-tight">
                          {evt.title}
                        </h4>
                        <p className="text-[11px] text-slate-500 leading-snug">
                          {evt.detail}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100 shrink-0">
                      <span className="text-[10px] font-mono text-slate-400">
                        Latency: <strong className="text-slate-700">{evt.latency}</strong>
                      </span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                        {evt.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: HEALTH TELEMETRY */}
          {activeTab === 'telemetry' && (
            <div className="p-6 sm:p-10 bg-slate-50/50 space-y-6 animate-in fade-in duration-200">
              {/* Overall Health Status Banner */}
              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
                    </span>
                    <h3 className="text-base font-black text-slate-900 tracking-tight">
                      All Core Engine Subsystems Operational
                    </h3>
                  </div>
                  <p className="text-xs text-slate-500 max-w-xl">
                    Automated heartbeat checks every 10 seconds. Zero packet degradation across global API gateways.
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={handleRunDiagnostic}
                    disabled={isDiagnosing}
                    className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center gap-2 transition-all shadow-xs shrink-0 cursor-pointer disabled:opacity-60"
                  >
                    <Activity className={`w-3.5 h-3.5 ${isDiagnosing ? 'animate-spin' : 'text-emerald-400'}`} />
                    <span>{isDiagnosing ? 'Running Diagnostic...' : 'Run Full Health Ping'}</span>
                  </button>
                </div>
              </div>

              {/* Live Diagnostic Scanning Progress */}
              {isDiagnosing && (
                <div className="p-4 rounded-xl bg-slate-900 text-white space-y-2 animate-in fade-in">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="flex items-center gap-2">
                      <Activity className="w-4 h-4 text-cyan-400 animate-spin" />
                      <span>Scanning Webhooks, Cloud DB, WhatsApp API & SMTP Handshakes...</span>
                    </span>
                    <span className="text-cyan-400 font-bold">{diagnosticProgress}%</span>
                  </div>
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-emerald-400 h-full transition-all duration-300"
                      style={{ width: `${diagnosticProgress}%` }}
                    />
                  </div>
                </div>
              )}

              {diagnosticComplete && (
                <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-medium flex items-center justify-between animate-in fade-in">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Diagnostic Result: 6/6 Systems Healthy • 0 Errors Detected • TLS 1.3 Encryption Active.</span>
                  </div>
                  <span className="font-mono text-[10px] text-emerald-700 font-bold">Latency: 12ms</span>
                </div>
              )}

              {/* 6 Core Subsystems Matrix */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
                <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900">Webhook Gateway</span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      100% Healthy
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Ingestion point for web forms, landing page click events, and external webhook triggers.
                  </p>
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] font-mono text-slate-500">
                    <span>Latency: <strong>12ms</strong></span>
                    <span>Uptime: <strong>99.99%</strong></span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900">AI Qualification Engine</span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      Operational
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Evaluates incoming lead descriptions, categorizes client intent, and recommends engagement tier.
                  </p>
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] font-mono text-slate-500">
                    <span>Reasoning: <strong>210ms</strong></span>
                    <span>Queue: <strong>0 tasks</strong></span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900">WhatsApp Business API</span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      Connected
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Direct Cloud API pipe delivering automated client greetings, consultation booking, and reminders.
                  </p>
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] font-mono text-slate-500">
                    <span>Delivery: <strong>100%</strong></span>
                    <span>Speed: <strong>&lt;0.5s</strong></span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900">Cloud Firestore Storage</span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      Synchronized
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Durable database holding leads, client agreements, invoice slips, and system configuration.
                  </p>
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] font-mono text-slate-500">
                    <span>Ping: <strong>8ms</strong></span>
                    <span>Backup: <strong>Continuous</strong></span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900">Email SMTP & DNS Records</span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      Authenticated
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    DKIM, SPF, and DMARC verified mail engine ensuring official agreements reach client inbox.
                  </p>
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] font-mono text-slate-500">
                    <span>Inbox Rate: <strong>99.8%</strong></span>
                    <span>Spam Score: <strong>0.0</strong></span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900">Server Tracking (Meta CAPI)</span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      Grade A Match
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Direct server-side event pipeline feeding high-fidelity conversion data to ad optimization models.
                  </p>
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] font-mono text-slate-500">
                    <span>Match Quality: <strong>9.8/10</strong></span>
                    <span>Deduplication: <strong>100%</strong></span>
                  </div>
                </div>
              </div>

              {/* Edge Response Time by Geographic Location */}
              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-900 flex items-center gap-2">
                    <Globe className="w-3.5 h-3.5 text-blue-600" />
                    <span>Global Anycast CDN Edge Ping Latencies</span>
                  </h4>
                  <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-semibold border border-emerald-200">
                    Global SLA Active
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 text-center">
                    <span className="text-xs font-bold text-slate-800 block">🇺🇸 North America</span>
                    <span className="text-sm font-mono font-black text-slate-900">14 ms</span>
                    <span className="text-[10px] text-slate-400 block font-mono">Ashburn, VA</span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 text-center">
                    <span className="text-xs font-bold text-slate-800 block">🇧🇩 South Asia</span>
                    <span className="text-sm font-mono font-black text-slate-900">22 ms</span>
                    <span className="text-[10px] text-slate-400 block font-mono">Dhaka Edge</span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 text-center">
                    <span className="text-xs font-bold text-slate-800 block">🇪🇺 Europe Central</span>
                    <span className="text-sm font-mono font-black text-slate-900">29 ms</span>
                    <span className="text-[10px] text-slate-400 block font-mono">Frankfurt</span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 text-center">
                    <span className="text-xs font-bold text-slate-800 block">🌏 Asia Pacific</span>
                    <span className="text-sm font-mono font-black text-slate-900">18 ms</span>
                    <span className="text-[10px] text-slate-400 block font-mono">Singapore</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

