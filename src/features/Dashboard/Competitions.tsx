import Image from "next/image";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CardCompetition } from "@/components/Dashboard/CardCompetition";

export default function CountryAccordion({ country }) {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value={country.id.toString()}>
        <AccordionTrigger className="gap-4 px-4 py-3 outline-none hover:no-underline hover:bg-dark/10">
          <span className="inline-flex gap-2 text-dark">
            <Image
              width={24}
              height={24}
              src={country.image_path}
              alt={country.name}
              className="size-6 rounded-full"
            />
            <span className="font-semibold">{country.name}</span>
          </span>
        </AccordionTrigger>
        <AccordionContent>
          {country.leagues.map((league) => (
            <CardCompetition key={league.id} league={league} />
          ))}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
