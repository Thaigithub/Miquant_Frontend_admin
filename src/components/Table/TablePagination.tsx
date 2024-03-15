import TableCore, { TableCoreProps } from './TableCore';

export type TablePaginationProps<T> = { className?: string } & Pick<
  TableCoreProps<T>,
  'columns' | 'data' | 'onRow'
> & {
    onCheckbox?: TableCoreProps<T>['onChange'];
    onSelect?: TableCoreProps<T>['onSelect'];
    onSelectAll?: TableCoreProps<T>['onSelectAll'];
    selectedRowKeys?: React.Key[];
    onPageNumberChange?: (pageNumber: number, pageSize: number) => void;
    isPagination?: boolean;
    tCommon?: any;
    totalItems?: number;
    currentPageNumber?: number;
    loading?: boolean;
    scroll?: {
      x?: number | true | string;
      y?: number | string;
    };
  };

export default function TablePagination<T extends object>({
  className,
  columns,
  data,
  onCheckbox,
  onRow,
  onPageNumberChange,
  onSelect,
  onSelectAll,
  selectedRowKeys,
  isPagination = true,
  totalItems,
  currentPageNumber,
  loading,
  scroll = { y: 400, x: 1000 },
}: TablePaginationProps<T>) {
  return (
    <TableCore
      loading={loading}
      columns={columns}
      data={data}
      size='middle'
      onRow={onRow}
      onChange={onCheckbox}
      onSelect={onSelect}
      onSelectAll={onSelectAll}
      selectedRowKeys={selectedRowKeys}
      isPagination={isPagination}
      onPageNumberChange={onPageNumberChange}
      totalItems={totalItems}
      currentPageNumber={currentPageNumber}
      className={className}
      scroll={scroll}
    />
  );
}
