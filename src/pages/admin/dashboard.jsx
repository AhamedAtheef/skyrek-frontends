import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios
import AdminHeader from '../../components/adminheader';
import EarningsGraph from '../../components/enrininggraph';
import MetricCard from '../../components/metriccard';
import PieChartComponent from '../../components/piechart';


const Dashboard = () => {
    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch current products
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(import.meta.env.VITE_BACKEND_URL + '/api/products/data', {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                });
                setProducts(response.data.products);
            } catch (e) {
                setError(e.message);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    // Fetch current orders
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get(import.meta.env.VITE_BACKEND_URL + '/api/orders/data', {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                });
                setOrders(response.data.orders);
            } catch (e) {
                setError(e.message);
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, []);

    // Calculations
    const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
    const totalProducts = products.length;
    const activeOrders = orders.length;
    const totalUsers = 8456;

    // No previous data, set all % change to 0
   const ordersChange = orders.length === 0 
  ? 0 
  : parseFloat((((orders[0].total - orders[orders.length - 1].total) / orders[orders.length - 1].total) * 100).toFixed(2));

    const productsByCategory = products.reduce((acc, product) => {
        const category = product.category || 'uncategorized';
        acc[category] = (acc[category] || 0) + 1;
        return acc;
    }, {});

    const pieChartData = Object.keys(productsByCategory).map(key => ({
        name: key,
        value: productsByCategory[key],
    }));

    if (loading) {
        return <div className="p-8 text-center text-gray-500">Loading dashboard data...</div>;
    }

    if (error) {
        return <div className="p-8 text-center text-red-500">Error: {error}</div>;
    }

    return (
        <div className="min-h-screen w-full bg-gray-50 pl-[2rem] p-8">
            <AdminHeader />
            <div className="mt-8">
                <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
                <p className="mt-1 text-gray-500">
                    Welcome back! Here's what's happening with your cosmetic business.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
                    <MetricCard
                        title="Total Revenue"
                        value={`$${totalRevenue.toLocaleString()}`}
                        iconBgColor="bg-pink-100"
                        iconColor="text-pink-500"
                        icon={<i className="fa-solid fa-dollar-sign"></i>}
                    />
                    <MetricCard
                        title="Total Products"
                        value={totalProducts.toLocaleString()}
                        iconBgColor="bg-blue-100"
                        iconColor="text-blue-500"
                        icon={<i className="fa-solid fa-box-open"></i>}
                    >
                        <PieChartComponent data={pieChartData} />
                    </MetricCard>
                    <MetricCard
                        title="Active Orders"
                        value={activeOrders.toLocaleString()}
                        change={`${ordersChange}% from last month`}
                        changeColor="green"
                        iconBgColor="bg-orange-100"
                        iconColor="text-orange-500"
                        icon={<i className="fa-solid fa-cart-shopping"></i>}
                    />
                    <MetricCard
                        title="Total Users"
                        value={totalUsers.toLocaleString()}
                        change={`% from last month`}
                        changeColor="red"
                        iconBgColor="bg-purple-100"
                        iconColor="text-purple-500"
                        icon={<i className="fa-solid fa-users"></i>}
                    />
                </div>
                <div className="mt-8">
                    <EarningsGraph orders={orders} />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
