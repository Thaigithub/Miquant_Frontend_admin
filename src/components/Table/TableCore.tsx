'use client';
import { Table } from 'antd';
import { SizeType } from 'antd/es/config-provider/SizeContext';
import { ColumnsType } from 'antd/es/table';

import NoData from '../NoData';
import { initialPagingState } from '../../redux/paging.type';
import { useTranslation } from 'react-i18next';

/*
  Description:
  1. Pass onChange will appear checkbox at 1st column
*/

export type TableCoreProps<T> = {
  columns: ColumnsType<T>;
  data: T[];
  onChange?: (selectedRowKeys: React.Key[], selectedRows: T[]) => void;
  onSelect?: (record: T, selected: boolean, selectedRows: T[]) => void;
  onSelectAll?: (selected: boolean, selectedRows: T[], changeRows: T[]) => void;
  selectedRowKeys?: React.Key[];
  className?: string;
  size: SizeType;
  onRow?: (data: T, index: number | undefined) => { onClick: (event: MouseEvent) => void };
  isPagination?: boolean;
  onPageNumberChange?: (pageNumber: number, pageSize: number) => void;
  totalItems?: number;
  currentPageNumber?: number;
  loading?: boolean;
  scroll?: {
    x?: number | true | string;
    y?: number | string;
  };
};

const TableCore = <T extends object>({
  columns,
  data,
  onChange,
  onRow,
  onSelectAll,
  onSelect,
  className,
  size,
  selectedRowKeys,
  isPagination,
  onPageNumberChange,
  totalItems,
  currentPageNumber,
  loading,
  scroll = { y: 400, x: 1000 },
}: TableCoreProps<T>) => {
  const { t: tCommon } = useTranslation('common');

  return (
    <div className='w-full'>
      <Table
        rowKey={(record: any) => record.id || record.key}
        loading={loading}
        scroll={scroll}
        size={size}
        rowSelection={
          onChange && {
            type: 'checkbox',
            onChange,
            onSelect,
            onSelectAll,
            selectedRowKeys,
          }
        }
        onRow={onRow as any}
        dataSource={data}
        columns={columns}
        pagination={
          isPagination
            ? {
                position: ['bottomCenter'],
                style: { marginTop: '32px', marginBottom: '0px' },
                showSizeChanger: false,
                showQuickJumper: false,
                pageSize: initialPagingState.pageSize,
                onChange: onPageNumberChange,
                total: totalItems || 0,
                current: currentPageNumber || 1,
              }
            : false
        }
        locale={{
          emptyText: (
            <div className='flex flex-col items-center justify-center h-56'>
              <NoData text={tCommon('NO_DATA')} />
            </div>
          ),
        }}
        rowClassName={(record, index, indent) => ''}
        className={`${className}`}
      />
    </div>
  );
};

export default TableCore;
