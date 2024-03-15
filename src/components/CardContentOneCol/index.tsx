import { phoneKrParser } from '@/utils/parsers/phone.kr.parse';

type CardContentProps = {
  tTranslate?: any;
  cardFields: (t: any) => { title: string; key: string }[];
  cardData: any;
};

export default function CardContent({ tTranslate, cardFields, cardData }: CardContentProps) {
  return (
    <div className='flex flex-col gap-[18px]'>
      {cardFields(tTranslate).map((item) => (
        <div className='flex items-center gap-12 w-full' key={item.title}>
          <span className='text-[15px] font-medium text-gray-06 flex gap-8 w-24 my-auto'>
            {item.title}
          </span>
          {cardData && (
            <span className='text-[15px] font-normal text-gray-13 w-[300px] my-auto truncate'>
              {item.key === 'contact'
                ? phoneKrParser(cardData[item.key])
                : cardData[item.key] ?? '-'}
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
