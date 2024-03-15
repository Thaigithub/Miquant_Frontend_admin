import { Col, Row } from 'antd';

type CardContentProps = {
  tTranslate: any;
  cardFields: (t: any) => { title: string; key: string }[];
  cardData: any;
};

export default function CardContenTwoCol({ tTranslate, cardFields, cardData }: CardContentProps) {
  return (
    <div className='flex flex-col gap-[18px]'>
      <Row gutter={[24, 24]}>
        {cardFields(tTranslate).map((item) => (
          <Col xs={24} sm={24} md={24} lg={12} key={item.key}>
            <div className='flex items-center gap-12 w-full'>
              <span className='text-[15px] font-medium text-gray-06 flex gap-8 w-24 my-auto'>
                {item.title}
              </span>

              <div className='flex w-2/3'>
                <span className='text-[15px] font-normal text-gray-13 w-[200px] my-auto truncate'>
                  {cardData[item.key as keyof typeof cardFields] || '-'}
                </span>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
}
