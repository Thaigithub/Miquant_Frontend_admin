// import LoadingDots from '@/components/LoadingDot/LoadingDots';

type CardContentProps = {
  cardFields: () => { title: string; key: string }[];
  cardData: any;
  isLoading?: boolean;
};

export function CardContent({ cardFields, cardData, isLoading }: CardContentProps) {
  return (
    <div className='flex flex-col gap-[18px] h-full'>
      {cardFields().map((item) => (
        <div className='flex justify-between w-full' key={item.title}>
          <span className='text-[15px] font-medium text-gray-06 flex gap-8 w-28 my-auto'>
            {item.title}
          </span>
          {cardData && !isLoading && (
            <span className='text-[15px] font-normal text-gray-13 w-[300px] my-auto truncate flex justify-end'>
              {cardData[item.key] ?? '-'}
            </span>
          )}

          {isLoading && (
            <span className='text-[15px] font-normal text-gray-13 w-[300px] my-auto truncate flex justify-end'>
              {/* <LoadingDots /> */}
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
