import { Block } from "@/components/Block";

import { Splide, SplideSlide } from "@splidejs/react-splide";
import Image from "next/image";
import usePostMatchNews from "../News/usePostMatchNews";

export function NewsCarouselDetailed({ title = "News" }) {
  const { postMatchNews, isLoading, isError } = usePostMatchNews();

  if (isLoading)
    return (
      <Block showNextButton={false} title={title}>
        <div className="relative overflow-x-hidden bg-gray-200 h-48 rounded-md">
          <div className="shimmer-effect"></div>
        </div>
      </Block>
    );

  if (isError)
    return (
      <Block showNextButton={false} title={title}>
        <div className="relative overflow-x-hidden h-48 flex flex-col justify-center rounded-md">
          <p className="text-center text-xl font-medium">
            {"News not Available"}
          </p>
        </div>
      </Block>
    );

  const news = postMatchNews.data;

  return (
    <Block title={title} showNextButton={false} contentClassName="pb-8">
      <Splide
        options={{
          arrows: false,
          type: "loop",
          autoplay: true,
          width: "24rem",
          classes: { pagination: "splide__pagination !-bottom-5" },
        }}
        className="news-carousel"
      >
        {news.slice(-5).map((item) => (
          <SplideSlide key={item.id}>
            <div>
              <Image
                width={1000}
                height={800}
                src="/mig/news.png"
                className=" rounded-lg object-contain"
                alt={item.title}
              />
              <p className="font-semibold mt-4 text-sm">{item.title}</p>
            </div>
          </SplideSlide>
        ))}
      </Splide>
    </Block>
  );
}
