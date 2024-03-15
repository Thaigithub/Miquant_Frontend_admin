import Image from 'next/image';
import { previewImg } from './previewImg';

type ImageCustomProps = {
  dataImg: any;
  className?: string;
};

export default function ImageCustom({ dataImg, className }: ImageCustomProps) {
  return (
    <Image
      src={dataImg}
      alt='Uploaded'
      quality={100}
      className={className}
      width={540}
      height={172}
      placeholder='blur'
      blurDataURL={previewImg}
    />
  );
}
