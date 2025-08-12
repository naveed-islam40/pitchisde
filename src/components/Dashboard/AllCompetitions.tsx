import { useState } from "react";
import { Block } from "../Block";
import { IconSearch } from "@tabler/icons-react";
import CountryAccordion from "@/features/Dashboard/Competitions";
import useAllCountries from "../../features/Core/useAllCountries";

export function AllCompetitions() {
  const { countries, isLoading } = useAllCountries();
  const [query, setQuery] = useState("");

  if (isLoading)
    return (
      <Block
        title="All Competitions"
        showNextButton={false}
        padding={false}
        className="overflow-x-hidden"
        contentClassName="border-t border-x-grey-3 p-6 "
      >
        <div className="relative h-48 bg-gray-200 rounded-md">
          <div className="shimmer-effect"></div>
        </div>
      </Block>
    );

  if (!countries) return <p className="text-center">No data available.</p>;

  // [Filtered list of countries]
  const countriesList = countries
    .filter((item) => item.iso3 && item.fifa_name && item.leagues.length)
    .sort((a, b) => a.fifa_name.localeCompare(b.fifa_name));

  const continentsList = countries
    .filter(
      (item) => !item.fifa_name && item.continent_id && item.leagues.length
    )
    .sort((a, b) => a.name.localeCompare(b.name));

  const worldList = countries
    .filter(
      (item) => !item.fifa_name && !item.continent_id && item.leagues.length
    )
    .sort((a, b) => a.name.localeCompare(b.name));

  // [Filtered list of leagues by search query]
  const lowerQuery = query.toLowerCase();

  const filterLeagues = (list) =>
    list
      .map((item) => {
        const matchingLeagues = item.leagues.filter((league) =>
          league.name.toLowerCase().includes(lowerQuery)
        );
        const nameMatch = item.name?.toLowerCase().includes(lowerQuery);
        return nameMatch || matchingLeagues.length
          ? {
              ...item,
              leagues: matchingLeagues.length ? matchingLeagues : item.leagues,
            }
          : null;
      })
      .filter(Boolean);

  // [Filtered list of leagues]
  const filteredCountries = query
    ? filterLeagues(countriesList)
    : countriesList;
  const filteredContinents = query
    ? filterLeagues(continentsList)
    : continentsList;
  const filteredWorld = query ? filterLeagues(worldList) : worldList;

  return (
    <Block
      title="All Competitions"
      showNextButton={false}
      padding={false}
      className="overflow-x-hidden"
    >
      <div className="relative px-4 mb-2">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          type="text"
          placeholder="Search Competitions"
          className="border rounded-lg w-full py-1.5 px-4 pl-10 placeholder:text-dark/70 focus:outline-none focus:border-primary"
        />
        <IconSearch
          className="absolute left-6 top-1/2 -translate-y-1/2 text-dark/70"
          size={20}
        />
      </div>
      {filteredCountries?.map((country) => {
        return <CountryAccordion country={country} key={country.id} />;
      })}
      {filteredContinents?.map((country) => {
        return <CountryAccordion country={country} key={country.id} />;
      })}
      {filteredWorld?.map((country) => {
        return <CountryAccordion country={country} key={country.id} />;
      })}
    </Block>
  );
}
