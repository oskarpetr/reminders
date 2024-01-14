import Skeleton from "react-loading-skeleton";

export default function SkeletonWidgets() {
  return (
    <div className="flex gap-6">
      {new Array(3).fill(null).map((_) => {
        return (
          <Skeleton
            key={Math.random()}
            width={160}
            height={160}
            borderRadius={16}
            className="border-white border border-opacity-10"
          />
        );
      })}
    </div>
  );
}
