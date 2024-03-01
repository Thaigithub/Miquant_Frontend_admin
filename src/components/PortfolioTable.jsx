import React, { useEffect, useState } from 'react';
import { useTable } from 'react-table';

const PortfolioTable = () => {
    const [selectedAccountType, setSelectedAccountType] = useState('total');
    const [portfolioInfo, setPortfolioInfo] = useState([]);
    const [filteredStocks, setFilteredStocks] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://mqdashboard-api.onrender.com/entrade-api/get-all-portfolio-info');
                const data = await response.json();
                setPortfolioInfo(data.portfolioInfo);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (selectedAccountType) {
            const selectedPortfolio = portfolioInfo.find(
                (portfolio) => portfolio.accountType === selectedAccountType
            );

            setFilteredStocks(selectedPortfolio ? selectedPortfolio.portfolioInfo.stocks : []);
        } else {
            setFilteredStocks([]);
        }
    }, [selectedAccountType, portfolioInfo]);

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    const accountTypes = portfolioInfo.map((portfolio) => portfolio.accountType);

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
                accessor: 'costPrice',
                Cell: ({ value }) => new Intl.NumberFormat('vi-VN', {
                    style: 'currency',
                    currency: 'VND',
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                }).format(value),
            },
            {
                Header: 'Giá hiện tại',
                accessor: 'marketPrice',
                Cell: ({ value }) => new Intl.NumberFormat('vi-VN', {
                    style: 'currency',
                    currency: 'VND',
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                }).format(value),
            },
            {
                Header: 'Lãi chưa chốt',
                accessor: 'unrealizedProfit',
                Cell: ({ value }) => new Intl.NumberFormat('vi-VN', {
                    style: 'currency',
                    currency: 'VND',
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
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
            <select
                value={selectedAccountType}
                onChange={(e) => setSelectedAccountType(e.target.value)}
                className="p-2 mb-4 bg-gray-800 text-white rounded-md"
            >
                {accountTypes.map((type) => (
                    <option key={type} value={type}>
                        {capitalizeFirstLetter(type)}
                    </option>
                ))}
            </select>

            <table {...getTableProps()} className="w-full min-w-full border border-gray-700 bg-gray-800 text-white rounded-md overflow-hidden">
                <thead>
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()} className="bg-gray-600">
                            {headerGroup.headers.map((column) => (
                                <th {...column.getHeaderProps()} className="p-3 font-semibold text-sm">
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
                            <tr {...row.getRowProps()} className="hover:bg-gray-700">
                                {row.cells.map((cell) => (
                                    <td {...cell.getCellProps()} className="p-3 text-sm">
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
