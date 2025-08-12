"use client";

import * as React from "react";
import {
  ChevronDown,
  Users,
  Trophy,
  Globe,
  Star,
  Calendar,
  MapPin,
  Award,
  Flag,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

const teamOptions = [
  { id: 1, name: "Manchester United", league: "Premier League", rating: 4.5 },
  { id: 2, name: "Real Madrid", league: "La Liga", rating: 4.8 },
  { id: 3, name: "Bayern Munich", league: "Bundesliga", rating: 4.6 },
];

const matchOptions = [
  {
    id: 1,
    home: "Arsenal",
    away: "Chelsea",
    date: "Jan 15",
    status: "upcoming",
  },
  {
    id: 2,
    home: "Liverpool",
    away: "Man City",
    date: "Jan 14",
    status: "live",
  },
  {
    id: 3,
    home: "Barcelona",
    away: "Real Madrid",
    date: "Jan 13",
    status: "finished",
  },
];

const countryOptions = [
  { id: 1, name: "England", continent: "Europe", ranking: 5 },
  { id: 2, name: "Brazil", continent: "South America", ranking: 1 },
  { id: 3, name: "Germany", continent: "Europe", ranking: 3 },
];

export default function DropdownWithTabs() {
  const [selectedItem, setSelectedItem] = React.useState("Select an option");
  const [isOpen, setIsOpen] = React.useState(false);

  const handleItemSelect = (item: string) => {
    setSelectedItem(item);
    setIsOpen(false);
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-8">
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild className="bg-[#E9E9E9] w-full">
          <Button
            variant="outline"
            className="justify-between bg-transparent bg-[#E9E9E9] p-3 text-[#686868] hover:bg-[#E9E9E9] hover:text-[#686868]"
          >
            <span>{selectedItem}</span>
            <ChevronDown className="h-3 w-3" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-80 p-0" align="start">
          <Tabs defaultValue="team" className="w-full">
            <div className="p-2 border-b">
              <TabsList className="grid w-full grid-cols-3 rounded-full px-1">
                <TabsTrigger value="team" className="text-xs rounded-full py-2">
                  <Users className="h-3 w-3 mr-1" />
                  Teams
                </TabsTrigger>
                <TabsTrigger
                  value="match"
                  className="text-xs py-2 rounded-full"
                >
                  <Trophy className="h-3 w-3 mr-1" />
                  Matches
                </TabsTrigger>
                <TabsTrigger
                  value="country"
                  className="text-xs py-2 rounded-full"
                >
                  <Globe className="h-3 w-3 mr-1" />
                  Countries
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent
              value="team"
              className="p-2 m-0 max-h-64 overflow-y-auto"
            >
              <div className="space-y-2">
                {teamOptions.map((team) => (
                  <div
                    key={team.id}
                    className="flex items-center justify-between p-2 hover:bg-accent rounded-md cursor-pointer"
                    onClick={() => handleItemSelect(team.name)}
                  >
                    <div className="flex-1">
                      <div className="font-medium text-sm">{team.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {team.league}
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs">{team.rating}</span>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent
              value="match"
              className="p-2 m-0 max-h-64 overflow-y-auto"
            >
              <div className="space-y-2">
                {matchOptions.map((match) => (
                  <div
                    key={match.id}
                    className="flex items-center justify-between p-2 hover:bg-accent rounded-md cursor-pointer"
                    onClick={() =>
                      handleItemSelect(`${match.home} vs ${match.away}`)
                    }
                  >
                    <div className="flex-1">
                      <div className="font-medium text-sm">
                        {match.home} vs {match.away}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        {match.date}
                      </div>
                    </div>
                    <Badge
                      variant={
                        match.status === "live"
                          ? "destructive"
                          : match.status === "upcoming"
                          ? "default"
                          : "secondary"
                      }
                      className="text-xs"
                    >
                      {match.status === "live" && "🔴 "}
                      {match.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent
              value="country"
              className="p-2 m-0 max-h-64 overflow-y-auto"
            >
              <div className="space-y-2">
                {countryOptions.map((country) => (
                  <div
                    key={country.id}
                    className="flex items-center justify-between p-2 hover:bg-accent rounded-md cursor-pointer"
                    onClick={() => handleItemSelect(country.name)}
                  >
                    <div className="flex-1">
                      <div className="font-medium text-sm flex items-center gap-2">
                        <Flag className="h-3 w-3" />
                        {country.name}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        {country.continent}
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Award className="h-3 w-3 text-yellow-500" />
                      <span className="text-xs">#{country.ranking}</span>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
