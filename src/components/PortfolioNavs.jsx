import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const PortfolioNavs = () => {
    const [selectedAccountType, setSelectedAccountType] = useState('quality');
    const [navInfo, setNavInfo] = useState([]);
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Get the current date
                const currentDate = new Date();

                // Format the current date to match the expected format (dd-mm-yyyy)
                const formattedCurrentDate = `${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`;

                // Make the fetch request with the dynamically generated toDate value
                const response = await fetch(`http://localhost:8000/entrade-api/get-all-navs-info?fromDate=02-04-2023&toDate=${formattedCurrentDate}`);
                const data = await response.json();
                setNavInfo(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (selectedAccountType && navInfo.length > 0) {
            const accountTypeToAccountNumber = {
                'totalPort': 'total',
                '0001209371': 'momentum',
                '0001209685': 'value',
                '0001209699': 'quality'
            };
            const accountNumber = accountTypeToAccountNumber[selectedAccountType];
            if (accountNumber) {
                const selectedNav = navInfo.find(nav => nav.accountType === accountNumber);
                const dataNumber = {
                    'total': 'totalPort',
                    'momentum': '0001209371',
                    'value': '0001209685',
                    'quality': '0001209699'
                };
                const selectedDataNumber = dataNumber[accountNumber];
                if (selectedNav) {
                    const accountData = selectedNav.navInfo.data[selectedDataNumber] || [];
                    const formattedData = accountData.map(item => ({
                        time: new Date(item.time).toLocaleDateString(),
                        netAssetValue: item.netAssetValue
                    }));
                    setChartData(formattedData);
                }
            }
        }
    }, [selectedAccountType, navInfo]);

    const currencyFormatter = (value) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
    };

    return (
        <div className='mt-0 ml-10'>
            <select
                value={selectedAccountType}
                onChange={(e) => setSelectedAccountType(e.target.value)}
                className="p-2 mb-4 bg-gray-800 text-white rounded-md"
            >
                <option value="totalPort">Total Portfolio</option>
                <option value="0001209371">Momentum</option>
                <option value="0001209685">Value</option>
                <option value="0001209699">Quality</option>
            </select>

            <LineChart width={800} height={300} data={chartData}>
                <CartesianGrid stroke="#555" />
                <XAxis dataKey="time" stroke="#ccc" />
                <YAxis tickFormatter={currencyFormatter} stroke="#ccc" />
                <Tooltip formatter={currencyFormatter} cursor={{ fill: 'rgba(0,0,0,0.2)' }} />
                <Legend />
                <Line type="monotone" dataKey="netAssetValue" stroke="#82ca9d" dot={false} />
            </LineChart>

        </div>
    );
};

export default PortfolioNavs;
