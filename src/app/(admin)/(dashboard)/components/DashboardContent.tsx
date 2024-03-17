import CardInfo from '@/components/CardInfo';
import { Col, Row } from 'antd';
import PortfolioStatus from './PortfolioStatus';
export default function DashboardContent() {
  return (
    <div className='flex flex-col gap-6'>
      {/* <Row gutter={[8, 8]}> */}
      <PortfolioStatus />
      {/* </Row> */}
    </div>
  );
}
