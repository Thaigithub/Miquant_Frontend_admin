import CardInfo from '@/components/CardInfo';
import { useGetInfoDashboardQuery } from '@/redux/apis/dashboard/dashboard.api';
import MoneyParser from '@/utils/parsers/money.parser';
import { Col, Row } from 'antd';
import { CardContent } from './CardContent';
import { DashboardResponse } from '@/redux/apis/dashboard/dashboard.response';

const fields = () => [
  {
    title: 'Net Asset Value',
    key: 'netAssetValue',
  },
  {
    title: 'Stock Value',
    key: 'stockValue',
  },
  {
    title: 'Total Debt',
    key: 'totalDebt',
  },
  {
    title: 'Total Cash',
    key: 'totalCash',
  },
  {
    title: 'Available Cash',
    key: 'availableCash',
  },
  {
    title: 'Receiving Amount',
    key: 'receivingAmount',
  },
  {
    title: 'Order Secured',
    key: 'orderSecured',
  },
];
const dataPortfolioStatus = (data: DashboardResponse) => {
  return {
    netAsset: `${MoneyParser(data.moneyInfo.netAssetValue)} VND`,
    stockValue: `${MoneyParser(data.moneyInfo.stockValue)} VND`,
    totalDebt: `${MoneyParser(data.moneyInfo.totalDebt)} VND`,
    totalCash: `${MoneyParser(data.moneyInfo.totalCash)} VND`,
    availableCash: `${MoneyParser(data.moneyInfo.availableCash)} VND`,
    receivingAmount: `${MoneyParser(data.moneyInfo.receivingAmount)} VND`,
    orderSecured: `${MoneyParser(data.moneyInfo.orderSecured)} VND`,
  };
};

export default function PortfolioStatus() {
  const { data: data, isFetching: isFetching } = useGetInfoDashboardQuery(
    'entrade-api/get-all-money-info',
  );
  return (
    <Row gutter={[8, 8]}>
      {data &&
        data.map((account: DashboardResponse) => {
          return (
            <Col key={account.moneyInfo.investorAccountId}>
              <CardInfo
                cardTitle={account.accountType}
                cardContent={
                  <CardContent
                    cardFields={fields}
                    cardData={dataPortfolioStatus(account)}
                    isLoading={isFetching}
                  />
                }
              />
            </Col>
          );
        })}
    </Row>
  );
}
