import React, { useEffect, useRef, useState } from "react";
import { Block } from "@/components/Block";
import useTvChannelsByFixtureId from "../Fixtures/useTvChannelsByFixtureId";
import { ChevronDown } from "lucide-react";
import useClickOutside from "@/hooks/useClickOutSide";

// Custom dropdown component for the title section
const CountryFilter = ({ countries, selectedCountry, onCountryChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useClickOutside(dropdownRef, () => setIsOpen(false));

  return (
    <div className="relative ml-4" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 rounded-md border border-gray-200 px-3 py-1.5 text-sm hover:bg-gray-50"
      >
        {selectedCountry ? (
          <>
            <img
              src={
                countries.find((c) => c.fifa_name === selectedCountry)
                  ?.image_path
              }
              alt={selectedCountry}
              className="h-4 w-4 object-contain"
            />
            <span>{selectedCountry}</span>
          </>
        ) : (
          <span>All Countries</span>
        )}
        <ChevronDown className="h-4 w-4" />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full z-10 mt-1 max-h-60 w-48 overflow-auto rounded-md border border-gray-200 bg-white shadow-lg">
          {/* <div
            className="cursor-pointer px-4 py-2 hover:bg-gray-50"
            onClick={() => {
              onCountryChange(null);
              setIsOpen(false);
            }}
          >
            All Countries
          </div> */}
          {countries.map((country, index) => (
            <div
              key={index}
              className="flex cursor-pointer items-center gap-2 px-4 py-2 hover:bg-gray-50"
              onClick={() => {
                onCountryChange(country.fifa_name);
                setIsOpen(false);
              }}
            >
              {country.image && (
                <img
                  src={country.image_path}
                  alt={country.fifa_name}
                  className="h-4 w-4 object-contain"
                />
              )}
              <span>{country.fifa_name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const Channels = () => {
  const { tvChannels, isLoading, isError } = useTvChannelsByFixtureId();
  const [selectedCountry, setSelectedCountry] = useState(null);

  // Extract unique countries with their image paths
  const countries = Array.from(
    new Set(
      tvChannels?.flatMap((channel) =>
        channel.countries
          .map((country) => ({
            fifa_name: country.fifa_name,
            image_path: country.image_path,
          }))
          .filter((country) => country.fifa_name !== null)
          .sort((a, b) => a.fifa_name?.localeCompare(b.fifa_name))
      ) || []
    ),
    (country) => JSON.stringify(country)
  ).map((str) => JSON.parse(str));

  const filteredChannels = selectedCountry
    ? tvChannels?.filter((channel) =>
        channel.countries.some(
          (country) => country.fifa_name === selectedCountry
        )
      )
    : tvChannels;

  useEffect(() => {
    setSelectedCountry(countries.length > 0 ? countries[0].fifa_name : null);
  }, [tvChannels]);

  if (isError) {
    return <div>Error fetching TV channels. Please try again later.</div>;
  }

  const CustomTitle = () => (
    <div className="flex items-center justify-between">
      <h2 className="text-lg font-semibold text-x-bargreen">Channels</h2>
      <CountryFilter
        countries={countries.filter((c) => c.image_path)}
        selectedCountry={selectedCountry}
        onCountryChange={setSelectedCountry}
      />
    </div>
  );

  return (
    <Block title={<CustomTitle />} showNextButton={false} padding={false}>
      {isLoading ? (
        <div className="gap-4">
          {[...Array(6)].map((_, index) => (
            <div
              key={index}
              className="flex items-center px-6 py-4 animate-pulse"
            >
              <div className="w-12 h-12 bg-gray-200 rounded-full" />
              <div className="ml-2 flex-1">
                <div className="h-4 bg-gray-200 rounded w-3/4" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="px-4">
          {filteredChannels?.length > 0 ? (
            filteredChannels.map((channel) => (
              <div key={channel.id} className="flex items-center px-2 py-4">
                {channel.image_path && (
                  <img
                    src={channel.image_path}
                    alt={channel.name}
                    className="w-6"
                  />
                )}
                <p className="ml-2">{channel.name}</p>
              </div>
            ))
          ) : (
            <p className="px-2 py-4">No channels available</p>
          )}
        </div>
      )}
    </Block>
  );
};

export default Channels;
