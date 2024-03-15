import { Col, Row } from 'antd';

export default function DashboardContent() {
  return (
    <div className='flex flex-col gap-6'>
      <Row gutter={[8, 8]}>
        <Col span={12}>Hello</Col>
        <Col span={12}>Hello</Col>
        <Col span={12}>Hello</Col>
        <Col span={12}>Hello</Col>
      </Row>
    </div>
  );
}
