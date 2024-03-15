import { Skeleton } from 'antd';

type SkeletonProps = {
  isFetching: boolean;
  children: React.ReactNode;
};

export default function SkeletonCard({ isFetching, children }: SkeletonProps) {
  return <>{isFetching ? <Skeleton /> : <>{children}</>}</>;
}
