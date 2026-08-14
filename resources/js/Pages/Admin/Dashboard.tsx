import React, { useState, useMemo } from 'react';
import { Head, Link, router } from '@inertiajs/react';
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
  Legend,
} from 'recharts';
import {
  Users,
  MousePointerClick,
  TrendingUp,
  Clock,
  FlaskConical,
  Activity,
  ExternalLink,
  RefreshCw,
  Search,
  MessageCircle,
  ShieldCheck,
  CheckCircle2,
  DollarSign,
  Layers,
  ArrowUpRight,
  Filter,
} from 'lucide-react';

interface AdminDashboardProps {
  stats: {
    total_visits: number;
    total_sessions: number;
    total_cta_clicks: number;
    ctr_rate: number;
    total_conversions: number;
    total_orders: number;
    total_revenue: number;
    total_revenue_formatted: string;
    conversion_rate: number;
    avg_engagement_time: number;
    bounce_rate: number;
  };
  scroll_funnel: {
    depth_25: number;
    depth_50: number;
    depth_75: number;
    depth_90: number;
    retention_25: number;
    retention_50: number;
    retention_75: number;
    retention_90: number;
  };
  cta_locations: Array<{
    location_id: string;
    label: string;
    count: number;
    percentage: number;
  }>;
  recent_events: Array<{
    id: number;
    session_id: string;
    event_type: string;
    location_id?: string;
    scroll_depth?: number;
    engagement_time?: number;
    details: string;
    created_at: string;
    time_formatted: string;
    date_formatted: string;
  }>;
  recent_orders: Array<{
    id: number;
    order_number: string;
    name: string;
    email: string;
    whatsapp: string;
    amount: number;
    amount_formatted: string;
    status: string;
    created_at: string;
    created_formatted: string;
  }>;
}

const PIE_COLORS = ['#F97316', '#EF4444', '#3B82F6', '#10B981', '#8B5CF6', '#F59E0B'];

export default function AdminDashboard({
  stats,
  scroll_funnel,
  cta_locations = [],
  recent_events = [],
  recent_orders = [],
}: AdminDashboardProps) {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [eventFilter, setEventFilter] = useState('all');

  const handleRefresh = () => {
    setIsRefreshing(true);
    router.reload({
      onFinish: () => setIsRefreshing(false),
    });
  };

  // Filter orders by search query
  const filteredOrders = useMemo(() => {
    if (!searchQuery.trim()) return recent_orders;
    const query = searchQuery.toLowerCase();
    return recent_orders.filter(
      (order) =>
        order.name.toLowerCase().includes(query) ||
        order.email.toLowerCase().includes(query) ||
        order.whatsapp.toLowerCase().includes(query) ||
        order.order_number.toLowerCase().includes(query)
    );
  }, [recent_orders, searchQuery]);

  // Filter events by selected category
  const filteredEvents = useMemo(() => {
    if (eventFilter === 'all') return recent_events;
    return recent_events.filter((ev) => ev.event_type === eventFilter);
  }, [recent_events, eventFilter]);

  const scrollChartData = [
    { depth: 'Scroll 25%', count: scroll_funnel.depth_25, retention: `${scroll_funnel.retention_25}%` },
    { depth: 'Scroll 50%', count: scroll_funnel.depth_50, retention: `${scroll_funnel.retention_50}%` },
    { depth: 'Scroll 75%', count: scroll_funnel.depth_75, retention: `${scroll_funnel.retention_75}%` },
    { depth: 'Scroll 90%', count: scroll_funnel.depth_90, retention: `${scroll_funnel.retention_90}%` },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-6 md:p-8 font-sans selection:bg-orange-500/30 selection:text-white">
      <Head title="PBM CRO Analytics & Pendaftar Dashboard" />

      {/* Top Header Bar */}
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8 border-b border-slate-800/80 pb-6">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center text-white shadow-lg shadow-orange-500/20">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white flex items-center gap-2.5">
                <span>PBM CRO Analytics Dashboard</span>
              </h1>
              <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5 font-mono">
                <span className="inline-flex items-center gap-1.5 text-emerald-400 font-semibold bg-emerald-950/60 border border-emerald-800/50 px-2 py-0.5 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Live Tracking Active
                </span>
                <span>• Dual Browser & CAPI Telemetry</span>
              </div>
            </div>
          </div>
        </div>

        {/* Header Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-slate-200 px-3.5 py-2 rounded-xl text-xs font-semibold shadow-sm transition-all cursor-pointer disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-slate-400 ${isRefreshing ? 'animate-spin text-orange-400' : ''}`} />
            <span>{isRefreshing ? 'Refreshing...' : 'Refresh Data'}</span>
          </button>

          <Link
            href="/admin/labs"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 hover:from-purple-500 hover:to-indigo-500 text-white px-4 py-2 rounded-xl text-xs font-semibold shadow-lg shadow-purple-600/20 transition-all border border-purple-500/30"
          >
            <FlaskConical className="w-3.5 h-3.5" />
            <span>A/B Labs Dashboard</span>
          </Link>

          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 bg-orange-500/10 hover:bg-orange-500/20 border border-orange-500/30 text-orange-400 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all"
          >
            <span>Lihat Landing Page</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto space-y-8">
        {/* Metric Cards Grid (5 Key Performance Indicators) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Card 1: Unique Sessions */}
          <div className="bg-gradient-to-b from-slate-900 to-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-sm relative overflow-hidden">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400">Unique Sessions</span>
              <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                <Users className="w-4 h-4" />
              </div>
            </div>
            <div className="text-3xl font-black text-white tracking-tight">{stats.total_sessions}</div>
            <div className="flex items-center justify-between text-[11px] text-slate-400 mt-2 border-t border-slate-800/80 pt-2 font-mono">
              <span>{stats.total_visits} Total Pageviews</span>
              <span className="text-slate-500">{stats.bounce_rate}% Bounce</span>
            </div>
          </div>

          {/* Card 2: Total CTA Clicks & CTR */}
          <div className="bg-gradient-to-b from-slate-900 to-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-sm relative overflow-hidden">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400">Total CTA Clicks</span>
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <MousePointerClick className="w-4 h-4" />
              </div>
            </div>
            <div className="text-3xl font-black text-emerald-400 tracking-tight">{stats.total_cta_clicks}</div>
            <div className="flex items-center justify-between text-[11px] text-slate-400 mt-2 border-t border-slate-800/80 pt-2 font-mono">
              <span className="text-emerald-400/90 font-semibold">{stats.ctr_rate}% CTR (Intent)</span>
              <span>All Buttons</span>
            </div>
          </div>

          {/* Card 3: Total Registrants & Revenue */}
          <div className="bg-gradient-to-b from-slate-900 to-slate-900/90 border border-orange-500/30 rounded-2xl p-5 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-orange-500/10 rounded-full blur-xl pointer-events-none" />
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-orange-400">Pendaftar Webinar</span>
              <div className="w-8 h-8 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400">
                <ShieldCheck className="w-4 h-4" />
              </div>
            </div>
            <div className="text-3xl font-black text-white tracking-tight">{stats.total_orders} <span className="text-xs font-normal text-slate-400 font-sans">Leads</span></div>
            <div className="flex items-center justify-between text-[11px] text-orange-400 mt-2 border-t border-slate-800/80 pt-2 font-mono font-bold">
              <span>Gross: {stats.total_revenue_formatted}</span>
              <span className="text-[10px] bg-orange-500/10 px-1.5 py-0.5 rounded">Rp79k/pax</span>
            </div>
          </div>

          {/* Card 4: Conversion Rate */}
          <div className="bg-gradient-to-b from-slate-900 to-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-sm relative overflow-hidden">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400">Conversion Rate</span>
              <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                <TrendingUp className="w-4 h-4" />
              </div>
            </div>
            <div className="text-3xl font-black text-purple-400 tracking-tight">{stats.conversion_rate}%</div>
            <div className="flex items-center justify-between text-[11px] text-slate-400 mt-2 border-t border-slate-800/80 pt-2 font-mono">
              <span>{stats.total_orders} Registrations</span>
              <span className="text-purple-400 font-semibold">{stats.total_sessions} Sessions</span>
            </div>
          </div>

          {/* Card 5: Avg Dwell Time */}
          <div className="bg-gradient-to-b from-slate-900 to-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-sm relative overflow-hidden">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400">Avg Dwell Time</span>
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                <Clock className="w-4 h-4" />
              </div>
            </div>
            <div className="text-3xl font-black text-amber-400 tracking-tight">{stats.avg_engagement_time}s</div>
            <div className="flex items-center justify-between text-[11px] text-slate-400 mt-2 border-t border-slate-800/80 pt-2 font-mono">
              <span>Audience Reading</span>
              <span className="text-emerald-400 font-semibold">High Dwell</span>
            </div>
          </div>
        </div>

        {/* Visual Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Scroll Depth Funnel Chart (7 Columns) */}
          <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
              <div>
                <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                  <Layers className="w-4 h-4 text-blue-400" />
                  <span>Scroll Depth Funnel & Retention</span>
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Persentase audiens yang membaca landing page sampai ke bawah.
                </p>
              </div>
              <div className="flex items-center gap-2 font-mono text-xs">
                <span className="px-2.5 py-1 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 font-semibold">
                  Reach 90%: {scroll_funnel.retention_90}%
                </span>
              </div>
            </div>

            <div className="h-64 sm:h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={scrollChartData} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} />
                  <XAxis dataKey="depth" stroke="#94A3B8" fontSize={12} tickLine={false} />
                  <YAxis stroke="#94A3B8" fontSize={12} tickLine={false} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', borderRadius: '12px', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.5)' }}
                    labelStyle={{ color: '#F8FAFC', fontWeight: 'bold' }}
                    formatter={(value: any, name: any, props: any) => [`${value} Sessions (${props.payload.retention} Retention)`, 'Audience Reach']}
                  />
                  <Bar dataKey="count" fill="#3B82F6" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* CTA Clicks by Location Breakdown (5 Columns) */}
          <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                    <MousePointerClick className="w-4 h-4 text-orange-400" />
                    <span>CTA Clicks by Location</span>
                  </h2>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Distribusi klik berdasarkan posisi tombol di landing page.
                  </p>
                </div>
              </div>

              {cta_locations.length > 0 ? (
                <div className="space-y-3 mt-4">
                  {cta_locations.map((loc, idx) => (
                    <div key={loc.location_id} className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-3 flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <span
                          className="w-3 h-3 rounded-full flex-shrink-0"
                          style={{ backgroundColor: PIE_COLORS[idx % PIE_COLORS.length] }}
                        />
                        <div>
                          <p className="text-xs font-semibold text-white leading-tight">{loc.label}</p>
                          <p className="text-[10px] font-mono text-slate-400">{loc.location_id}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-bold text-white font-mono">{loc.count}</span>
                        <span className="text-[10px] text-slate-400 block font-mono">
                          {stats.total_cta_clicks > 0 ? `${Math.round((loc.count / stats.total_cta_clicks) * 100)}%` : '0%'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="h-56 flex flex-col items-center justify-center text-center p-6 text-slate-500 text-xs">
                  <MousePointerClick className="w-8 h-8 text-slate-600 mb-2 opacity-50" />
                  <p>Belum ada event klik CTA yang tercatat.</p>
                  <p className="text-[11px] text-slate-600 mt-1">Buka landing page dan klik tombol untuk mengisi data.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Webinar Registrations Table (Pendaftar Real-time) */}
        <div className="bg-slate-900 border border-orange-500/30 rounded-2xl overflow-hidden shadow-xl shadow-black/40">
          <div className="p-5 sm:p-6 border-b border-slate-800/80 bg-slate-950/60 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-orange-500" />
                <h2 className="text-lg sm:text-xl font-bold text-white">
                  Daftar Pendaftar Webinar (Total: {recent_orders.length})
                </h2>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Data calon peserta yang tersimpan otomatis di database saat klik tombol checkout.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              {/* Search input */}
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Cari Nama, Email, WA..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-slate-900 border border-slate-700/80 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 transition-colors w-full sm:w-60"
                />
              </div>

              <div className="text-xs font-mono font-bold text-orange-400 bg-orange-500/10 border border-orange-500/20 px-3.5 py-2 rounded-xl flex items-center justify-center gap-1.5 whitespace-nowrap">
                <DollarSign className="w-3.5 h-3.5" />
                <span>Total Potensi: {stats.total_revenue_formatted}</span>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="bg-slate-950 text-slate-400 uppercase text-[11px] border-b border-slate-800 font-mono tracking-wider">
                <tr>
                  <th className="px-5 py-3.5">Kode Order</th>
                  <th className="px-5 py-3.5">Nama Lengkap</th>
                  <th className="px-5 py-3.5">Email</th>
                  <th className="px-5 py-3.5">WhatsApp</th>
                  <th className="px-5 py-3.5">Status</th>
                  <th className="px-5 py-3.5">Waktu Daftar</th>
                  <th className="px-5 py-3.5 text-right">Aksi Follow-Up</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80 font-sans">
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="px-5 py-4 font-mono text-xs text-orange-400 font-bold">
                      {order.order_number}
                    </td>
                    <td className="px-5 py-4 font-medium text-white">
                      {order.name}
                    </td>
                    <td className="px-5 py-4 text-xs text-slate-300">
                      {order.email}
                    </td>
                    <td className="px-5 py-4 font-mono text-xs text-emerald-400">
                      <span className="font-semibold">{order.whatsapp}</span>
                    </td>
                    <td className="px-5 py-4">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-amber-950/80 text-amber-300 border border-amber-800/60 uppercase font-mono">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                        {order.status}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-xs text-slate-400 font-mono">
                      {order.created_formatted}
                    </td>
                    <td className="px-5 py-4 text-right">
                      <a
                        href={`https://wa.me/${order.whatsapp}?text=${encodeURIComponent(
                          `Halo ${order.name}, terima kasih sudah mendaftar Webinar PBM Agency (${order.order_number}). Apakah ada pertanyaan terkait pembayaran atau akses sesi?`
                        )}`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1.5 rounded-lg text-xs font-semibold transition-all shadow-sm"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>Chat WA</span>
                      </a>
                    </td>
                  </tr>
                ))}
                {filteredOrders.length === 0 && (
                  <tr>
                    <td colSpan={7} className="text-center py-10 text-slate-500 text-xs">
                      {searchQuery
                        ? `Tidak ada data pendaftar yang cocok dengan kata kunci "${searchQuery}".`
                        : 'Belum ada pendaftar webinar. Klik tombol "Daftar Sekarang" di landing page untuk menguji registrasi pertama.'}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Live Event Stream Table (Interactive Tab Filter) */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-sm">
          <div className="p-5 sm:p-6 border-b border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Activity className="w-4 h-4 text-purple-400" />
                <span>Live Event Stream Log</span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Real-time telemetry event stream dari browser pengunjung.
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs font-mono">
              {[
                { id: 'all', label: 'Semua Event' },
                { id: 'cta_click', label: 'CTA Clicks' },
                { id: 'conversion', label: 'Conversions' },
                { id: 'scroll', label: 'Scroll' },
                { id: 'visit', label: 'Visits' },
                { id: 'engagement', label: 'Engagement' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setEventFilter(tab.id)}
                  className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                    eventFilter === tab.id
                      ? 'bg-purple-600 text-white font-bold shadow-sm'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="bg-slate-950 text-slate-400 uppercase text-[11px] border-b border-slate-800 font-mono">
                <tr>
                  <th className="px-5 py-3.5">Event Type</th>
                  <th className="px-5 py-3.5">Rincian / Lokasi Event</th>
                  <th className="px-5 py-3.5">Session ID</th>
                  <th className="px-5 py-3.5 text-right">Timestamp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80 font-sans">
                {filteredEvents.map((event) => (
                  <tr key={event.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="px-5 py-3.5">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold font-mono ${
                          event.event_type === 'conversion'
                            ? 'bg-purple-950 text-purple-300 border border-purple-800'
                            : event.event_type === 'cta_click'
                            ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                            : event.event_type === 'scroll'
                            ? 'bg-blue-950 text-blue-300 border border-blue-800'
                            : event.event_type === 'engagement'
                            ? 'bg-amber-950 text-amber-300 border border-amber-800'
                            : 'bg-slate-800 text-slate-300'
                        }`}
                      >
                        {event.event_type}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 font-medium text-xs text-white">
                      {event.details}
                    </td>
                    <td className="px-5 py-3.5 font-mono text-xs text-slate-400">
                      {event.session_id.substring(0, 18)}...
                    </td>
                    <td className="px-5 py-3.5 text-xs text-slate-400 text-right font-mono">
                      {event.time_formatted} WIB
                    </td>
                  </tr>
                ))}
                {filteredEvents.length === 0 && (
                  <tr>
                    <td colSpan={4} className="text-center py-8 text-slate-500 text-xs">
                      Tidak ada event yang ditemukan untuk filter "{eventFilter}".
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
