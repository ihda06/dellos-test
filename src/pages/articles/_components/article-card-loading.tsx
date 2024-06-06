export default function ArticlesCardLoading() {
  return (
    <>
      <CardLoading />
      <CardLoading />
      <CardLoading />
      <CardLoading />
      <CardLoading />
    </>
  );
}

const CardLoading = () => {
  return (
    <div className="space-y-3 border border-gray-200 rounded-2xl shadow p-6 animate-pulse">
      <div className="w-full h-36 bg-gray-300"></div>
      <div className="w-full rounded-full h-3 bg-gray-300"></div>
      <div className="w-full rounded-full h-3 bg-gray-300"></div>
      <div className="w-full rounded-full h-3 bg-gray-300"></div>
    </div>
  );
};
