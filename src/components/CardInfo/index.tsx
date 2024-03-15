import { Divider } from 'antd';

type CardInfoProps = {
  tTranslate?: any;
  cardTitle: string;
  cardContent?: React.ReactNode;
  className?: string;
};

export default function CardInfo({ tTranslate, cardTitle, cardContent, className }: CardInfoProps) {
  return (
    <div
      className={`p-8 style-card-info h-auto w-full hover:shadow-lg transition hover:duration-200 ${className}`}
    >
      <span className='text-s22-semi-gray-13'>
        {tTranslate ? tTranslate(cardTitle) : cardTitle}
      </span>

      <Divider className='!mt-3 bg-[#AEBFEE] !h-[2px]' />
      {cardContent}
    </div>
  );
}
