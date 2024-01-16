import React from 'react'
import PortfolioStatGrid from '../components/PortfolioStatGrid'
import PortfolioTable from '../components/PortfolioTable';

export default function Dashboard() {
	return (
	  <div className="flex flex-col gap-4">
		<PortfolioStatGrid />
		<div className="flex flex-row gap-4 w-full">
		  {/* Additional components or charts if needed */}
		</div>
		<div className="flex flex-row gap-4 w-full">
		  <PortfolioTable />
		  {/* Additional components or charts if needed */}
		</div>
	  </div>
	);
  }