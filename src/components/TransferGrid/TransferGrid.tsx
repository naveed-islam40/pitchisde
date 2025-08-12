import { useEffect, useState } from "react";
import { CheckedDropdown } from "../Transfers/CheckedDropdown";
import TransferCell from "./TransferCell";
import {
  filterTransfers,
  getPositions,
  getTypes,
} from "@/helpers/transfers-helper";

export function TransferGrid({ transfers, teamId, teamsData }) {
  const [selectedTeam, setSelectedTeam] = useState<any>([]);
  const [selectedType, setSelectedType] = useState<any>([]);
  const [selectedPosition, setSelectedPosition] = useState<any>([]);

  const sortedTransfers = transfers.sort((a, b) => {
    if (a.date > b.date) return -1;
    else if (a.date < b.date) return 1;
    return 0;
  });

  const filteredTransfer = filterTransfers({
    transfers: sortedTransfers,
    selectedTeam,
    selectedType,
    selectedPosition,
  });

  // [positions]
  const positions = getPositions(transfers);
  const types = getTypes(transfers);

  useEffect(() => {
    if (positions?.length > 0) {
      const positionids = positions?.map((position: any) => position?.id);
      setSelectedPosition(positionids);
    }

    if (types?.length > 0) {
      const positionids = types?.map((type: any) => type?.id);
      setSelectedType(positionids);
    }

    if (teamsData?.data?.length > 0) {
      const teamData = teamsData?.data?.map((team: any) => team?.id);
      setSelectedTeam(teamData);
    }
  }, []);

  return (
    <>
      <div className="flex gap-3 items-center my-5">
        <CheckedDropdown
          placeholder={"Select Team"}
          options={teamsData?.data}
          setSelectedOption={setSelectedTeam}
          selectedOptions={selectedTeam}
        />
        <CheckedDropdown
          placeholder={"Select Position"}
          options={positions}
          setSelectedOption={setSelectedPosition}
          selectedOptions={selectedPosition}
        />
        <CheckedDropdown
          placeholder={"Select Type"}
          options={types}
          setSelectedOption={setSelectedType}
          selectedOptions={selectedType}
        />
      </div>

      <div className="grid grid-cols-4 gap-4">
        {filteredTransfer?.map((transfer, index) => (
          <TransferCell key={index} transfer={transfer} teamId={teamId} />
        ))}
      </div>
    </>
  );
}
