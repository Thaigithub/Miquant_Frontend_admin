import { ContentTypeEnum } from '../utils/enums/contentTypeEnum';

export type FileResponse = {
  fileName: string;
  type: ContentTypeEnum | string;
  key: string;
  size: number;
};

export const getContentType = (fileType: string): string => {
  switch (fileType) {
    case 'application/pdf':
      return 'PDF';
    case 'application/vnd.rar':
      return 'RAR';
    case 'application/zip':
      return 'ZIP';
    case 'image/jpeg':
      return 'JPEG';
    case 'image/jpg':
      return 'JPG';
    case 'image/png':
      return 'PNG';
    case 'text/csv':
      return 'CSV';
    case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
      return 'EXCEL';
    case 'application/msword':
      return 'WORD';
    case 'image/bmp':
      return 'BMP';
    case 'image/gif':
      return 'GIF';
    default:
      return 'PDF';
  }
};
