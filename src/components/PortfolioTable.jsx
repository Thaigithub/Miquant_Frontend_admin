import React, { useState, useEffect } from 'react';
import { useTable } from 'react-table';

const PortfolioTable = () => {
    const [selectedAccountType, setSelectedAccountType] = useState('');
    const [portfolioData, setPortfolioData] = useState([]);
    const [filteredStocks, setFilteredStocks] = useState([]);

    useEffect(() => {
        // Fetch data from the API endpoint
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8000/entrade-api/get-all-accounts-portfolio-info');
                const data = await response.json();
                setPortfolioData(data.portfolioInfo);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        // Filter stocks based on the selected account type
        if (selectedAccountType) {
            const selectedPortfolio = portfolioData.find(
                (portfolio) => portfolio.accountType === selectedAccountType
            );

            setFilteredStocks(selectedPortfolio ? selectedPortfolio.portfolioInfo.stocks : []);
        } else {
            setFilteredStocks([]);
        }
    }, [selectedAccountType, portfolioData]);

    const accountTypes = portfolioData.map((portfolio) => portfolio.accountType);

    const columns = React.useMemo(
        () => [
            {
                Header: 'Mã chứng khoán',
                accessor: 'symbol',
            },
            {
                Header: 'Khối lượng mở',
                accessor: 'totalQuantity',
            },
            {
                Header: 'Được giao dịch',
                accessor: 'tradeQuantity',
            },
            {
                Header: 'Giá hòa vốn',
                accessor: 'initialValue',
                Cell: ({ value }) => new Intl.NumberFormat('vi-VN', {
                    style: 'currency',
                    currency: 'VND',
                    minimumFractionDigits: 0, // Set the minimum fraction digits to 0
                    maximumFractionDigits: 0, // Set the maximum fraction digits to 0
                }).format(value),
            },
            {
                Header: 'Giá hiện tại',
                accessor: 'marketPrice',
                Cell: ({ value }) => new Intl.NumberFormat('vi-VN', {
                    style: 'currency',
                    currency: 'VND',
                    minimumFractionDigits: 0, // Set the minimum fraction digits to 0
                    maximumFractionDigits: 0, // Set the maximum fraction digits to 0
                }).format(value),
            },
            {
                Header: 'Lãi chưa chốt',
                accessor: 'unrealizedProfit',
                Cell: ({ value }) => new Intl.NumberFormat('vi-VN', {
                    style: 'currency',
                    currency: 'VND',
                    minimumFractionDigits: 0, // Set the minimum fraction digits to 0
                    maximumFractionDigits: 0, // Set the maximum fraction digits to 0
                }).format(value),
            },
            // Add more columns as needed
        ],
        []
    );

    const data = React.useMemo(() => filteredStocks, [filteredStocks]);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({ columns, data });

    return (
        <div className="mt-0 ml-10">
            {/* Dropdown to select account type */}
            <select
                value={selectedAccountType}
                onChange={(e) => setSelectedAccountType(e.target.value)}
                className="p-2 mb-4"
            >
                <option value="">Select Account Type</option>
                {accountTypes.map((type) => (
                    <option key={type} value={type}>
                        {type}
                    </option>
                ))}
            </select>

            {/* Display the table */}
            <table {...getTableProps()} className="w-full min-w-full border border-gray-300 bg-white rounded-md overflow-hidden">
                <thead>
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()} className="bg-gray-200">
                            {headerGroup.headers.map((column) => (
                                <th {...column.getHeaderProps()} className="p-3 font-semibold text-sm text-gray-700">
                                    {column.render('Header')}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map((row) => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()} className="hover:bg-gray-100">
                                {row.cells.map((cell) => (
                                    <td {...cell.getCellProps()} className="p-3 text-sm text-gray-800">
                                        {cell.render('Cell')}
                                    </td>
                                ))}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default PortfolioTable;
