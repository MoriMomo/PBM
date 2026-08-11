import React from 'react';
import { Head, Link } from '@inertiajs/react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import {
  Users,
  MousePointerClick,
  TrendingUp,
  Clock,
  FlaskConical,
  Activity,
  ArrowRight,
} from 'lucide-react';

interface AdminDashboardProps {
  stats: {
    total_visits: number;
    total_sessions: number;
    total_cta_clicks: number;
    total_conversions: number;
    conversion_rate: number;
    avg_engagement_time: number;
  };
  scroll_funnel: {
    depth_25: number;
    depth_50: number;
    depth_75: number;
    depth_90: number;
  };
  cta_locations: Array<{ location_id: string; count: number }>;
  recent_events: Array<{
    id: number;
    session_id: string;
    event_type: string;
    location_id?: string;
    scroll_depth?: number;
    created_at: string;
  }>;
}

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

export default function AdminDashboard({
  stats,
  scroll_funnel,
  cta_locations,
  recent_events,
}: AdminDashboardProps) {
  const scrollChartData = [
    { depth: '25%', count: scroll_funnel.depth_25 },
    { depth: '50%', count: scroll_funnel.depth_50 },
    { depth: '75%', count: scroll_funnel.depth_75 },
    { depth: '90%', count: scroll_funnel.depth_90 },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 font-sans">
      <Head title="PBM Analytics Dashboard" />

      {/* Header */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white flex items-center gap-3">
            <Activity className="w-8 h-8 text-blue-500" />
            PBM CRO Analytics Dashboard
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Real-time landing page tracking, conversion rate optimization & event analytics.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/labs"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white px-4 py-2.5 rounded-lg text-sm font-semibold shadow-lg shadow-purple-500/20 transition-all"
          >
            <FlaskConical className="w-4 h-4" />
            A/B Labs Dashboard
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto space-y-8">
        {/* Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">Total Unique Sessions</span>
              <Users className="w-5 h-5 text-blue-400" />
            </div>
            <div className="text-3xl font-bold text-white">{stats.total_sessions}</div>
            <p className="text-xs text-slate-500 mt-2">{stats.total_visits} total page visits</p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">Total CTA Clicks</span>
              <MousePointerClick className="w-5 h-5 text-emerald-400" />
            </div>
            <div className="text-3xl font-bold text-emerald-400">{stats.total_cta_clicks}</div>
            <p className="text-xs text-slate-500 mt-2">Across all location IDs</p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">Conversion Rate</span>
              <TrendingUp className="w-5 h-5 text-purple-400" />
            </div>
            <div className="text-3xl font-bold text-purple-400">{stats.conversion_rate}%</div>
            <p className="text-xs text-slate-500 mt-2">{stats.total_conversions} pricing CTA conversions</p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">Avg Dwell Time</span>
              <Clock className="w-5 h-5 text-amber-400" />
            </div>
            <div className="text-3xl font-bold text-amber-400">{stats.avg_engagement_time}s</div>
            <p className="text-xs text-slate-500 mt-2">Active user engagement</p>
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Scroll Funnel Chart */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <h2 className="text-lg font-bold text-white mb-4 flex items-center justify-between">
              <span>Scroll Depth Funnel</span>
              <span className="text-xs font-normal text-slate-400">Milestone %</span>
            </h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={scrollChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="depth" stroke="#94A3B8" />
                  <YAxis stroke="#94A3B8" />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#1E293B', borderColor: '#334155', borderRadius: '8px' }}
                    labelStyle={{ color: '#F8FAFC' }}
                  />
                  <Bar dataKey="count" fill="#3B82F6" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* CTA Location Breakdown */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <h2 className="text-lg font-bold text-white mb-4">CTA Clicks by Location ID</h2>
            {cta_locations.length > 0 ? (
              <div className="h-64 flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={cta_locations}
                      dataKey="count"
                      nameKey="location_id"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      label={(entry: any) => `${entry.location_id || 'unknown'}: ${entry.count}`}
                    >
                      {cta_locations.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{ backgroundColor: '#1E293B', borderColor: '#334155', borderRadius: '8px' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="h-64 flex items-center justify-center text-slate-500 text-sm">
                No CTA click events recorded yet.
              </div>
            )}
          </div>
        </div>

        {/* Live Event Stream Table */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-sm">
          <div className="p-5 border-b border-slate-800 flex items-center justify-between">
            <h2 className="text-lg font-bold text-white">Live Event Log (Latest 20)</h2>
            <span className="text-xs text-slate-400 bg-slate-800 px-2.5 py-1 rounded-full">Automated 6-Event Tracking</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="bg-slate-950 text-slate-400 uppercase text-xs border-b border-slate-800">
                <tr>
                  <th className="px-5 py-3">Event Type</th>
                  <th className="px-5 py-3">Location ID / Details</th>
                  <th className="px-5 py-3">Session ID</th>
                  <th className="px-5 py-3">Timestamp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {recent_events.map((event) => (
                  <tr key={event.id} className="hover:bg-slate-800/50 transition-colors">
                    <td className="px-5 py-3.5">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                          event.event_type === 'conversion'
                            ? 'bg-purple-950 text-purple-300 border border-purple-800'
                            : event.event_type === 'cta_click'
                            ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                            : event.event_type === 'scroll'
                            ? 'bg-blue-950 text-blue-300 border border-blue-800'
                            : 'bg-slate-800 text-slate-300'
                        }`}
                      >
                        {event.event_type}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 font-mono text-xs text-slate-400">
                      {event.location_id || (event.scroll_depth ? `Depth ${event.scroll_depth}%` : '-')}
                    </td>
                    <td className="px-5 py-3.5 font-mono text-xs text-slate-400">{event.session_id.substring(0, 16)}...</td>
                    <td className="px-5 py-3.5 text-xs text-slate-500">
                      {new Date(event.created_at).toLocaleTimeString()}
                    </td>
                  </tr>
                ))}
                {recent_events.length === 0 && (
                  <tr>
                    <td colSpan={4} className="text-center py-8 text-slate-500">
                      No events recorded yet. Open the landing page to generate live events!
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
