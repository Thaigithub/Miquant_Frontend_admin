import React, { useState, useEffect } from 'react';

export default function DashboardStatsGrid() {
  const [moneyInfo, setMoneyInfo] = useState([]);

  useEffect(() => {
    // Fetch money information
    fetch('https://mqdashboard-api.onrender.com/entrade-api/get-all-money-info')
      .then((response) => response.json())
      .then((data) => setMoneyInfo(data.moneyInfo))
      .catch((error) => console.error('Error fetching money information:', error));
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
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
    <div className="bg-gray-800 p-6 rounded-md shadow-lg text-white">
      <h3 className="text-2xl font-semibold mb-4">{formattedAccountType}</h3>
      <div className="grid grid-cols-2 gap-2">
        <div className="text-gray-400">Tổng tài sản ròng:</div>
        <div className="text-right font-bold">{formatCurrency(netAssetValue)}</div>

        <div className="text-gray-400">GT Chứng Khoán:</div>
        <div className="text-right font-bold">{formatCurrency(stockValue)}</div>

        <div className="text-gray-400">Tổng Nợ:</div>
        <div className="text-right font-bold">{formatCurrency(totalDebt)}</div>

        <div className="text-gray-400">Tiền:</div>
        <div className="text-right font-bold">{formatCurrency(totalCash)}</div>

        <div className="text-gray-400">Tiền Mặt:</div>
        <div className="text-right font-bold">{formatCurrency(availableCash)}</div>

        <div className="text-gray-400">Tiền Chờ Về:</div>
        <div className="text-right font-bold">{formatCurrency(receivingAmount)}</div>

        <div className="text-gray-400">Tiền Mua Khớp T0:</div>
        <div className="text-right font-bold">{formatCurrency(orderSecured)}</div>
      </div>
    </div>
  );
}