export const getTopTransfersFromTeams = (data) => {
    let transfers : any = [];

    for(const teamTransfers of data){
       if (!Array.isArray(teamTransfers?.data)) continue;

        for(const transfer of teamTransfers?.data){
           if(transfer.amount){
            transfers.push(transfer)
           }
        }
    }

     const top3TransfersByAmount = transfers
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 3);

    return top3TransfersByAmount;
}

export const  getPositions = (data) => {
    const positions = Array.from(
    new Map(
      data
        ?.filter(
          (transfer) => transfer?.amount > 0 && transfer.detailedposition
        )
        .map((transfer) => [
          transfer.detailedposition.id,
          {
            name: transfer.detailedposition.code,
            id: transfer.detailedposition.id,
          },
        ])
    ).values()
  );
  return positions
}

export const  getTypes = (data) => {
    const types = Array.from(
    new Map(
      data
        ?.filter((transfer) => transfer?.amount > 0 && transfer?.position)
        .map((transfer) => [
          transfer?.position?.id,
          {
            name: transfer?.position?.name,
            id: transfer?.position?.id,
          },
        ])
    ).values()
  );
  return types
}

export function filterTransfers({
  transfers,
  selectedTeam,
  selectedType,
  selectedPosition,
}) {
    
  return transfers.filter((transfer) => {
    const teamMatch = transfer?.amount && selectedTeam.includes( transfer?.from_team_id); 
    const typeMatch = transfer?.amount && selectedType.includes(transfer?.position?.id);
    const positionMatch = transfer?.amount && selectedPosition.includes(transfer?.detailedposition?.id);

    return teamMatch || typeMatch || positionMatch;
  });
}
