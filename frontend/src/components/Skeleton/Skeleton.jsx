import { Skeleton } from "@/components/ui/skeleton";

const SkeletonComponent = () => {
  return (
    <div className=" bg-[#000814] rounded-md w-screen h-screen sm:w-full flex items-center ">
      <div className=" bg-[#101622] h-screen w-16 sm:w-20 border-r border-gray-900 flex flex-col justify-between py-6">
        <div className="flex flex-col h-[42vh] justify-between pt-4">
            <Skeleton className=" w-10 h-10 rounded-md mx-auto" />
          <div className="flex flex-col items-center justify-center gap-y-5">
            <Skeleton className=" w-9 h-9 rounded-md" />
            <Skeleton className=" w-9 h-9 rounded-md" />
            <Skeleton className=" w-9 h-9 rounded-md" />
            <Skeleton className=" w-9 h-9 rounded-md" />
          </div>
        </div>
        <div className=" flex justify-center items-center">
          <Skeleton className=" w-10 h-10 rounded-md" />
        </div>
      </div>
      <div className="max-w-[90%] mx-auto">
        <div className=" max-w-fit lg:min-w-[620px] min-h-fit p-6 mb-4 bg-white/5 backdrop-blur-lg shadow-lg border border-gray-900 rounded-md text-gray-200">
          <Skeleton className=" w-[60%] mx-auto h-6 rounded-md" />
          <div className=" grid grid-cols-2 lg:grid-cols-4 gap-x-3 gap-y-3 my-4">
            <Skeleton className="max-w-[130px] sm:w-[120px] min-w-[100px] h-[90px] mx-auto" />
            <Skeleton className="max-w-[130px] sm:w-[120px] min-w-[100px] h-[90px] mx-auto" />
            <Skeleton className="max-w-[130px] sm:w-[120px] min-w-[100px] h-[90px] mx-auto" />
            <Skeleton className="max-w-[130px] sm:w-[120px] min-w-[100px] h-[90px] mx-auto" />
            <Skeleton className="max-w-[130px] sm:w-[120px] min-w-[100px] h-[90px] mx-auto" />
            <Skeleton className="max-w-[130px] sm:w-[120px] min-w-[100px] h-[90px] mx-auto" />
            <Skeleton className="max-w-[130px] sm:w-[120px] min-w-[100px] h-[90px] mx-auto" />
            <Skeleton className="max-w-[130px] sm:w-[120px] min-w-[100px] h-[90px] mx-auto" />
            {/* <Skeleton className="max-w-[130px] w-[120px] min-w-[100px] h-[90px] mx-auto hidden md:block lg:hidden " /> */}
          </div>
          <Skeleton className=" w-[40%] h-4 rounded-md mb-5" />
          <Skeleton className=" md:w-[380px] lg:w-full h-16 rounded-md" />
        </div>
        <div className="min-w-fit lg:min-w-[620px] min-h-fit p-2 sm:p-6 bg-white/5 backdrop-blur-lg shadow-lg border border-gray-900 rounded-md text-gray-200">
          <Skeleton className=" w-36 h-6 rounded-md mb-4" />
          <Skeleton className=" w-full h-12 rounded-md" />
        </div>
      </div>
    </div>
  );
};

export default SkeletonComponent;
