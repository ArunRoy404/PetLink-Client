import {
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    AreaChart,
    Area
} from 'recharts';


const DashboardAreaChart = ({data, dataKey}) => {
    return (
        <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
                <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#6B7280', fontSize: 12 }}
                />
                <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#6B7280', fontSize: 12 }}
                />
                <Tooltip
                    contentStyle={{
                        backgroundColor: '#FFFFFF',
                        borderColor: '#E5E7EB',
                        borderRadius: '0.5rem',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                        fontSize: '12px'
                    }}
                    cursor={{ fill: '#EFF6FF' }}
                />
                <Area
                    type='monotone'
                    dataKey={dataKey}
                    stroke='#8068DF'
                    strokeWidth={3}
                    fill="#CCC2F2"
                    // radius={[4, 4, 0, 0]}
                    animationDuration={1500}
                />
            </AreaChart>
        </ResponsiveContainer>
    );
};

export default DashboardAreaChart;