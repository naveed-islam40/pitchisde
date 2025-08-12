import { Block } from "@/components/Block";
import { NewsCard } from "@/components/News/NewsCard";

export default function News() {
  return (
    <Block padding={false}>
      <div className="grid md:grid-cols-2 wl:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
        <NewsCard fill shadow="thin" />
      </div>
      <button className="mx-auto mt-2 mb-6 block app-btn-light">
        See More
      </button>
    </Block>
  );
}
