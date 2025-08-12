import { Block } from "@/components/Block";
import { NewsCard } from "@/components/News/NewsCard";
import usePostMatchNewsBySeason from "@/features/News/usePostMatchNewsBySeason";
import usePreMatchNewsBySeason from "@/features/News/usePreMatchNewsBySeason";

export default function News() {
  const { seasonPostMatchNews, isLoading: isPreMatchNewsLoading } =
    usePostMatchNewsBySeason();
  const { seasonPreMatchNews, isLoading: isPostatchNewsLoading } =
    usePreMatchNewsBySeason();

  if (isPreMatchNewsLoading || isPostatchNewsLoading)
    return (
      <Block padding={false}>
        <div className="grid md:grid-cols-2 wl:grid-cols-3 xl:grid-cols-4 gap-6 p-6 overflow-hidden">
          {Array.from({ length: 12 }, (_, i) => (
            <div key={i} className="relative bg-gray-200 rounded-lg h-48">
              <div className="shimmer-effect"></div>
            </div>
          ))}
        </div>
      </Block>
    );

  if (!seasonPostMatchNews?.data && !seasonPreMatchNews?.data)
    return (
      <Block>
        <div className="py-20">
          <p className="text-xl text-center font-semibold text-x-grey-1">
            No news for this season
          </p>
        </div>
      </Block>
    );

  const newsList = [...seasonPostMatchNews.data, ...seasonPreMatchNews.data];

  return (
    <Block padding={false}>
      <div className="grid md:grid-cols-2 wl:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
        {newsList.map((news) => (
          <NewsCard key={news.id} fill shadow="thin" title={news.title} />
        ))}
      </div>
    </Block>
  );
}
