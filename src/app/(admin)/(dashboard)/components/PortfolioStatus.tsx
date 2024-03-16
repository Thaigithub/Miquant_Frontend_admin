import CardInfo from '@/components/CardInfo';
import { useGetInfoDashboardQuery } from '@/redux/apis/dashboard/dashboard.api';
import MoneyParser from '@/utils/parsers/money.parser';
import { Col, Row } from 'antd';
import { CardContent } from './CardContent';

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
const dataPortfolioStatus = (
  netAsset: number,
  stockValue: number,
  totalDebt: number,
  totalCash: number,
  availableCash: number,
  receivingAmount: number,
  orderSecured: number,
) => {
  return {
    netAsset: `${MoneyParser(netAsset)} VND`,
    stockValue: `${MoneyParser(stockValue)} VND`,
    totalDebt: `${MoneyParser(totalDebt)} VND`,
    totalCash: `${MoneyParser(totalCash)} VND`,
    availableCash: `${MoneyParser(availableCash)} VND`,
    receivingAmount: `${MoneyParser(receivingAmount)} VND`,
    orderSecured: `${MoneyParser(orderSecured)} VND`,
  };
};
class Response {
  
}
export default function PortfolioStatus() {
  const { data: data, isFetching: isFetching } = useGetInfoDashboardQuery(
    'entrade-api/get-all-money-info',
  );
  return (
    <Row gutter={[8, 8]}>
      {data.moneyInfo.map((account: any) => {
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
