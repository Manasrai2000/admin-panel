'use client';
import { 
  BarChart, Bar, PieChart, Pie, LineChart, Line, 
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, 
  ResponsiveContainer, Cell
} from 'recharts';
import { TrendingUp, TrendingDown, Users, DollarSign, ShoppingCart, Activity } from 'lucide-react';

export default function DashboardPage() {
  // Sample data for the charts
  const revenueData = [
    { name: 'Jan', revenue: 4000 },
    { name: 'Feb', revenue: 3000 },
    { name: 'Mar', revenue: 5000 },
    { name: 'Apr', revenue: 7000 },
    { name: 'May', revenue: 6000 },
    { name: 'Jun', revenue: 8000 },
    { name: 'Jul', revenue: 10000 },
    { name: 'Aug', revenue: 9000 },
  ];

  const usersData = [
    { name: 'Jan', users: 400 },
    { name: 'Feb', users: 600 },
    { name: 'Mar', users: 800 },
    { name: 'Apr', users: 1000 },
    { name: 'May', users: 1200 },
    { name: 'Jun', users: 1400 },
    { name: 'Jul', users: 1600 },
    { name: 'Aug', users: 1800 },
  ];

  const salesData = [
    { name: 'Electronics', value: 400 },
    { name: 'Clothing', value: 300 },
    { name: 'Books', value: 200 },
    { name: 'Home', value: 150 },
    { name: 'Beauty', value: 100 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  const recentUsers = [
    { id: 1, name: 'John Doe', email: 'john@example.com', joined: '2 days ago', avatar: '/api/placeholder/40/40' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', joined: '3 days ago', avatar: '/api/placeholder/40/40' },
    { id: 3, name: 'Robert Johnson', email: 'robert@example.com', joined: '5 days ago', avatar: '/api/placeholder/40/40' },
    { id: 4, name: 'Emily Davis', email: 'emily@example.com', joined: '1 week ago', avatar: '/api/placeholder/40/40' },
    { id: 5, name: 'Michael Brown', email: 'michael@example.com', joined: '1 week ago', avatar: '/api/placeholder/40/40' },
  ];

  const infoCards = [
    { 
      title: 'Total Users', 
      value: '2,568', 
      change: '+12%', 
      isPositive: true,
      icon: <Users size={24} className="text-blue-500" />,
      bgColor: 'bg-blue-50'
    },
    { 
      title: 'Revenue', 
      value: '$52,325', 
      change: '+8%', 
      isPositive: true,
      icon: <DollarSign size={24} className="text-green-500" />,
      bgColor: 'bg-green-50'
    },
    { 
      title: 'Sales', 
      value: '1,243', 
      change: '-3%', 
      isPositive: false,
      icon: <ShoppingCart size={24} className="text-purple-500" />,
      bgColor: 'bg-purple-50'
    },
    { 
      title: 'Conversion', 
      value: '3.2%', 
      change: '+2%', 
      isPositive: true,
      icon: <Activity size={24} className="text-orange-500" />,
      bgColor: 'bg-orange-50'
    },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-gray-500 mt-1">Welcome back! Here's an overview of your business</p>
        </div>
        <div>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Download Report
          </button>
        </div>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {infoCards.map((card, index) => (
          <div key={index} className={`p-6 rounded-lg shadow-sm ${card.bgColor} border border-gray-100`}>
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-500 text-sm mb-1">{card.title}</p>
                <h3 className="text-2xl font-bold">{card.value}</h3>
                <div className="flex items-center mt-2">
                  {card.isPositive ? 
                    <TrendingUp size={16} className="text-green-500 mr-1" /> : 
                    <TrendingDown size={16} className="text-red-500 mr-1" />
                  }
                  <span className={card.isPositive ? "text-green-500 text-sm" : "text-red-500 text-sm"}>
                    {card.change} since last month
                  </span>
                </div>
              </div>
              <div className="p-3 rounded-full bg-white">
                {card.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Line Chart */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold mb-4">Revenue Overview</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={revenueData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip 
                  formatter={(value) => [`$${value}`, 'Revenue']}
                  labelFormatter={(label) => `Month: ${label}`}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#0088FE" 
                  strokeWidth={2}
                  activeDot={{ r: 8 }} 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bar Chart */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold mb-4">User Growth</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={usersData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="users" fill="#00C49F" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Pie Chart */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold mb-4">Sales by Category</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={salesData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {salesData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value} units`, 'Sales']} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Users */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 lg:col-span-2">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Recently Added Users</h2>
            <button className="text-blue-500 text-sm hover:underline">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentUsers.map((user) => (
                  <tr key={user.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <img className="h-10 w-10 rounded-full" src={user.avatar} alt="" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{user.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{user.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{user.joined}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button className="text-blue-600 hover:text-blue-900 mr-3">View</button>
                      <button className="text-gray-600 hover:text-gray-900">Edit</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}