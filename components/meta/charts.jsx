'use client';
import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
} from 'recharts';
import { CHART } from './config';
import { money, count, percent } from '../../lib/metaFormat';

// Short axis label: "2026-11-04" → "4 Nov".
function shortDay(ymd) {
  if (!ymd || ymd.length < 10) return ymd;
  const [y, m, d] = ymd.split('-').map(Number);
  const dt = new Date(Date.UTC(y, m - 1, d));
  return new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', timeZone: 'UTC' }).format(dt);
}

const axisProps = { stroke: '#8a94a6', fontSize: 12, tickLine: false };

// Daily Spend (bars) + daily Leads (line), dual axis.
export function SpendLeadsChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <ComposedChart data={data} margin={{ top: 10, right: 12, bottom: 0, left: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#eef1f5" vertical={false} />
        <XAxis dataKey="date" tickFormatter={shortDay} {...axisProps} minTickGap={16} />
        <YAxis yAxisId="left" {...axisProps} tickFormatter={(v) => money(v)} width={70} />
        <YAxis yAxisId="right" orientation="right" {...axisProps} allowDecimals={false} width={36} />
        <Tooltip
          formatter={(value, name) => (name === 'Spend' ? money(value) : count(value))}
          labelFormatter={shortDay}
        />
        <Legend />
        <Bar yAxisId="left" dataKey="spend" name="Spend" fill={CHART.spend} radius={[4, 4, 0, 0]} maxBarSize={38} />
        <Line yAxisId="right" type="monotone" dataKey="leads" name="Leads" stroke={CHART.leads} strokeWidth={2.5} dot={false} />
      </ComposedChart>
    </ResponsiveContainer>
  );
}

// Daily Link Clicks (bars) + Link CTR % (line), dual axis.
export function ClicksCtrChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <ComposedChart data={data} margin={{ top: 10, right: 12, bottom: 0, left: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#eef1f5" vertical={false} />
        <XAxis dataKey="date" tickFormatter={shortDay} {...axisProps} minTickGap={16} />
        <YAxis yAxisId="left" {...axisProps} allowDecimals={false} width={44} />
        <YAxis yAxisId="right" orientation="right" {...axisProps} tickFormatter={(v) => `${v}%`} width={44} />
        <Tooltip
          formatter={(value, name) => (name === 'Link CTR' ? percent(value) : count(value))}
          labelFormatter={shortDay}
        />
        <Legend />
        <Bar yAxisId="left" dataKey="linkClicks" name="Link Clicks" fill={CHART.clicks} radius={[4, 4, 0, 0]} maxBarSize={38} />
        <Line yAxisId="right" type="monotone" dataKey="linkCtr" name="Link CTR" stroke={CHART.ctr} strokeWidth={2.5} dot={false} connectNulls />
      </ComposedChart>
    </ResponsiveContainer>
  );
}

// Tiny inline sparkline of daily spend for ad cards.
export function Sparkline({ data, color = CHART.spend, height = 36 }) {
  if (!data || data.length === 0) return <div className="meta-spark meta-spark--empty" />;
  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={data} margin={{ top: 4, right: 2, bottom: 4, left: 2 }}>
        <Line type="monotone" dataKey="spend" stroke={color} strokeWidth={1.8} dot={false} isAnimationActive={false} />
      </LineChart>
    </ResponsiveContainer>
  );
}
