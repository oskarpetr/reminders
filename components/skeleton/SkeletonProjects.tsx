import Skeleton from "react-loading-skeleton";

export default function SkeletonProjects() {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
      {new Array(3).fill(null).map((_) => {
        return (
          <div
            key={Math.random()}
            className="py-5 px-8 flex justify-between items-center bg-white bg-opacity-5 rounded-2xl border border-white border-opacity-10"
          >
            <div className="flex gap-4 items-center">
              <Skeleton width={40} height={40} circle />

              <div className="flex flex-col">
                <Skeleton height={24} borderRadius={8} width={192} />
                <Skeleton height={20} borderRadius={8} width={96} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
