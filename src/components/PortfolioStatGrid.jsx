import React, { useState, useEffect } from 'react';

export default function DashboardStatsGrid() {
    const [moneyInfo, setMoneyInfo] = useState([]);

    useEffect(() => {
      // Fetch money information
      fetch('http://localhost:8000/entrade-api/get-all-accounts-money-info')
        .then((response) => response.json())
        .then((data) => setMoneyInfo(data.moneyInfo))
        .catch((error) => console.error('Error fetching money information:', error));
    }, []);
  
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
          {/* Portfolio Summary Card */}
          <PortfolioSummary moneyInfo={moneyInfo} />
    
          {/* Other Dashboard Cards */}
          {moneyInfo.map((account) => (
            <DashboardCard
              key={account.moneyInfo.investorAccountId}
              accountType={account.accountType}
              netAssetValue={account.moneyInfo.netAssetValue}
              stockValue={account.moneyInfo.stockValue}
              totalDebt={account.moneyInfo.totalDebt}
              totalCash={account.moneyInfo.totalCash}
              availableCash={account.moneyInfo.availableCash}
              receivingAmount={account.moneyInfo.receivingAmount}
              orderSecured={account.moneyInfo.orderSecured}
            />
          ))}
        </div>
      );
  }
  
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1) + " Portfolio";
  }

function DashboardCard({ accountType, netAssetValue, stockValue, totalDebt, totalCash, availableCash, receivingAmount, orderSecured }) {
    const formattedAccountType = capitalizeFirstLetter(accountType);

    const formatCurrency = (value) => {
        // Format numbers as Vietnamese Dong with comma as the decimal separator
        return new Intl.NumberFormat('vi-VN', {
          style: 'currency',
          currency: 'VND',
          minimumFractionDigits: 0, // Set the minimum fraction digits to 0
          maximumFractionDigits: 0, // Set the maximum fraction digits to 0
        }).format(value);
      };

    return (
        <div className="bg-white p-4 rounded-md shadow-md">
          <h3 className="text-xl font-semibold mb-4">{formattedAccountType}</h3>
          <div className="grid grid-cols-2 gap-1">
            <div className="text-gray-600">Tổng tài sản ròng:</div>
            <div className="text-right">{formatCurrency(netAssetValue)}</div>
    
            <div className="text-gray-600">GT Chứng Khoán:</div>
            <div className="text-right">{formatCurrency(stockValue)}</div>
    
            <div className="text-gray-600">Tổng Nợ:</div>
            <div className="text-right">{formatCurrency(totalDebt)}</div>
    
            <div className="text-gray-600">Tiền:</div>
            <div className="text-right">{formatCurrency(totalCash)}</div>
    
            <div className="text-gray-600">Tiền Mặt:</div>
            <div className="text-right">{formatCurrency(availableCash)}</div>
    
            <div className="text-gray-600">Tiền Chờ Về:</div>
            <div className="text-right">{formatCurrency(receivingAmount)}</div>
    
            <div className="text-gray-600">Tiền Mua Khớp T0:</div>
            <div className="text-right">{formatCurrency(orderSecured)}</div>
          </div>
        </div>
      );
}

// New PortfolioSummary component
function PortfolioSummary({ moneyInfo }) {
    const totalNetAssetValue = moneyInfo.reduce((sum, account) => sum + account.moneyInfo.netAssetValue, 0);
    const totalStockValue = moneyInfo.reduce((sum, account) => sum + account.moneyInfo.stockValue, 0);
    const totalDebtValue = moneyInfo.reduce((sum, account) => sum + account.moneyInfo.totalDebt, 0);
    const totalCashValue = moneyInfo.reduce((sum, account) => sum + account.moneyInfo.totalCash, 0);
    const totalAvailableCash = moneyInfo.reduce((sum, account) => sum + account.moneyInfo.availableCash, 0);
    const totalReceivingAmount = moneyInfo.reduce((sum, account) => sum + account.moneyInfo.receivingAmount, 0);
    const totalOrderSecured = moneyInfo.reduce((sum, account) => sum + account.moneyInfo.orderSecured, 0);
    // Add other total calculations as needed
  
    const formatCurrency = (value) => {
        // Format numbers as Vietnamese Dong with comma as the decimal separator
        return new Intl.NumberFormat('vi-VN', {
          style: 'currency',
          currency: 'VND',
          minimumFractionDigits: 0, // Set the minimum fraction digits to 0
          maximumFractionDigits: 0, // Set the maximum fraction digits to 0
        }).format(value);
      };

    return (
        <div className="bg-white p-4 rounded-md shadow-md">
          <h3 className="text-xl font-semibold mb-4">Tổng quan portfolio</h3>
          <div className="grid grid-cols-2 gap-1">
            <div className="text-gray-600">Tổng tài sản ròng:</div>
            <div className="text-right">{formatCurrency(totalNetAssetValue)}</div>
    
            <div className="text-gray-600">GT Chứng Khoán:</div>
            <div className="text-right">{formatCurrency(totalStockValue)}</div>
    
            <div className="text-gray-600">Tổng Nợ:</div>
            <div className="text-right">{formatCurrency(totalDebtValue)}</div>
    
            <div className="text-gray-600">Tiền:</div>
            <div className="text-right">{formatCurrency(totalCashValue)}</div>
    
            <div className="text-gray-600">Tiền Mặt:</div>
            <div className="text-right">{formatCurrency(totalAvailableCash)}</div>
    
            <div className="text-gray-600">Tiền Chờ Về:</div>
            <div className="text-right">{formatCurrency(totalReceivingAmount)}</div>
    
            <div className="text-gray-600">Tiền Mua Khớp T0:</div>
            <div className="text-right">{formatCurrency(totalOrderSecured)}</div>
          </div>
        </div>
      );
  }
