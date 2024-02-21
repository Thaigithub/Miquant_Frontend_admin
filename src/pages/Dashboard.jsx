import React from 'react';
import PortfolioStatGrid from '../components/PortfolioStatGrid'
import PortfolioTable from '../components/PortfolioTable';
import PortfolioNavs from '../components/PortfolioNavs';

export default function Dashboard() {
	return (
	  <div className="flex flex-col gap-4">
		<PortfolioStatGrid />
		<div className="flex flex-row gap-4 w-full">
		</div>
		<div className="flex flex-row gap-4 w-full">
		  <PortfolioTable />
		</div>
		<div className="flex flex-row gap-4 w-full">
		  <PortfolioNavs />
		</div>
	  </div>
	);
  }