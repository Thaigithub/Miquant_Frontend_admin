'use client';
import { Table } from 'antd';
import { SizeType } from 'antd/es/config-provider/SizeContext';
import { ColumnsType } from 'antd/es/table';

import NoData from '../NoData';
import { useTranslation } from 'react-i18next';
import { SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import Image from 'next/image';
import { ICONS } from '@/utils/icons';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import React from 'react';

/*
  Description:
  1. Pass onChange will appear checkbox at 1st column
*/

interface RowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  'data-row-key': string;
}

const Row = ({ children, ...props }: RowProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: props['data-row-key'],
  });

  const style: React.CSSProperties = {
    ...props.style,
    transform: CSS.Transform.toString(transform && { ...transform, scaleY: 1 }),
    transition,
    ...(isDragging ? { position: 'relative', zIndex: 10 } : {}),
  };

  return (
    <tr {...props} ref={setNodeRef} style={style} {...attributes}>
      {React.Children.map(children, (child) => {
        if ((child as React.ReactElement).key === 'sort') {
          return React.cloneElement(child as React.ReactElement, {
            children: (
              <Image
                ref={setActivatorNodeRef}
                style={{ touchAction: 'none', cursor: 'move' }}
                {...listeners}
                src={ICONS.menu}
                alt='move'
              />
            ),
          });
        }
        return child;
      })}
    </tr>
  );
};

export type TableSortProps<T> = {
  columns: ColumnsType<T>;
  data: T[];
  onChange?: (selectedRowKeys: React.Key[], selectedRows: T[]) => void;
  onSelect?: (record: T, selected: boolean, selectedRows: T[]) => void;
  onSelectAll?: (selected: boolean, selectedRows: T[], changeRows: T[]) => void;
  selectedRowKeys?: React.Key[];
  className?: string;
  size?: SizeType;
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
  onDragEnd?: (event: DragEndEvent) => void;
  currentPageSize?: number;
};

const TableSort = <T extends object>({
  columns,
  data,
  onRow,
  className,
  size = 'middle',
  isPagination = true,
  onPageNumberChange,
  totalItems,
  currentPageNumber,
  loading,
  scroll = { y: 400, x: 1000 },
  currentPageSize,
  onDragEnd,
}: TableSortProps<T>) => {
  const { t: tCommon } = useTranslation('common');

  return (
    <div className='w-full'>
      <DndContext modifiers={[restrictToVerticalAxis]} onDragEnd={onDragEnd}>
        <SortableContext
          // rowKey array
          items={data.map((i: any) => i.id)}
          strategy={verticalListSortingStrategy}
        >
          <Table
            components={{
              body: {
                row: Row,
              },
            }}
            rowKey={(record: any) => record.id || record.key}
            loading={loading}
            scroll={scroll}
            size={size}
            onRow={onRow as any}
            dataSource={data}
            columns={columns}
            pagination={
              isPagination
                ? {
                    position: ['bottomCenter'],
                    style: { marginTop: '32px', marginBottom: '0px' },
                    showSizeChanger: true,
                    showQuickJumper: false,
                    pageSize: currentPageSize,
                    onChange: onPageNumberChange,
                    total: totalItems || 0,
                    pageSizeOptions: [10, 40, 70, 100, 130, 150, 200],
                    current: currentPageNumber || 1,
                    locale: {
                      items_per_page: '/ 페이지',
                    },
                  }
                : false
            }
            locale={{
              emptyText: (
                <div className='flex flex-col items-center justify-center h-56 !z-0'>
                  <NoData text={tCommon('NO_DATA')} />
                </div>
              ),
            }}
            rowClassName={(record, index, indent) => ''}
            className={`${className}`}
          />
        </SortableContext>
      </DndContext>
    </div>
  );
};

export default TableSort;
