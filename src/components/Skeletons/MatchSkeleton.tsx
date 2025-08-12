export default function MatchSkeleton() {
  return (
    <div className="relative overflow-x-hidden">
      <div className="shimmer-effect">
        <div className="flex items-center bg-[#F2F2F2] px-5 py-3 ">
          <span className="rounded-full inline-block w-12 h-12 bg-slate-300 mr-4"></span>
          <span className="py-3 w-48 rounded-md bg-slate-300"></span>
        </div>
        <div className="py-4 space-y-2">
          {Array.from({ length: 2 }, (_, i) => (
            <div key={i} className="flex items-center justify-center gap-4">
              <span className="rounded-full inline-block w-12 h-12 bg-slate-300"></span>
              <span className="py-3 w-20 rounded-md bg-slate-300"></span>
              <span className="py-3 w-20 rounded-md bg-slate-300"></span>
              <span className="rounded-full inline-block w-12 h-12 bg-slate-300 "></span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
