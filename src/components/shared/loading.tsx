import { LoadingType } from "../../types/global";

export const Loading = ({ loading = false, className }: LoadingType) => {
  if (!loading) {
    return null;
  }
  return (
    <div className={`flex justify-center items-center ${className}`}>
      <div className="border-gray-300 h-8 w-8 animate-spin rounded-full border-4 border-t-blue-600" />
    </div>
  );
};
