import NoDataImg from '../../../public/assets/images/NoData.png';
import Image from 'next/image';

type NoDataProps = {
  className?: string;
  text?: string;
};

export default function NoData({ className, text = '데이터가 없습니다.' }: NoDataProps = {}) {
  return (
    <div className={`flex flex-col gap-2 ${className} w-full`}>
      <Image src={NoDataImg} alt='NoData' className='flex justify-center mx-auto' />
      <span className='text-center text-gray-13 text-medium text-[18px] mx-auto'>{text}</span>
    </div>
  );
}
