export const renderMatch = ({
  match,
  isFinal = false,
  hoveredMatch,
  handleMouseLeave,
  handleMouseEnter,
}) => {
  if (!match) return null;

  return (
    <div
      className={`${
        isFinal ? "mx-auto" : ""
      } w-[80%] border rounded-md overflow-hidden transition-all duration-200 ${
        hoveredMatch === match.id ? "shadow-md border-blue-400" : ""
      }`}
      onMouseEnter={() => handleMouseEnter(match.id)}
      onMouseLeave={handleMouseLeave}
    >
      <div className="flex items-center justify-between p-2 border-b">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 flex-shrink-0">
            <img
              src={match.team1.logo || "/placeholder.svg"}
              alt={match.team1.name}
              className="w-full h-full object-contain"
            />
          </div>
          <span className="text-xs font-medium">{match.team1.abbr}</span>
        </div>
        <span className="text-xs">{match.score1}</span>
      </div>
      <div className="flex items-center justify-between p-2">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 flex-shrink-0">
            <img
              src={match.team2.logo || "/placeholder.svg"}
              alt={match.team2.name}
              className="w-full h-full object-contain"
            />
          </div>
          <span className="text-xs font-medium">{match.team2.abbr}</span>
        </div>
        <span className="text-xs">{match.score2}</span>
      </div>
      {match.date && (
        <div className="bg-gray-100 text-center py-1 text-xs">{match.date}</div>
      )}
      {match.label && (
        <div className="bg-gray-800 text-white text-center py-1 text-xs">
          {match.label}
        </div>
      )}
    </div>
  );
};

export const renderConnector = ({
  direction,
  position,
  isCenter = false,
  connectorId,
  hoveredConnectors,
}) => {
  const isHovered = hoveredConnectors?.includes(connectorId);
  const connectorColor = isHovered ? "bg-blue-400" : "bg-gray-300";
  const commonClasses = `absolute ${connectorColor} transition-colors duration-200`;

  if (position === "top") {
    return (
      <>
        <div
          className={`${commonClasses} h-[1px] top-1/4 ${
            direction === "left" ? "right-0 w-1/2" : "left-0 w-1/2"
          }`}
        />
        <div
          className={`${commonClasses} w-[1px] top-1/4 ${
            direction === "left" ? "right-1/2 h-1/2" : "left-1/2 h-1/2"
          }`}
        />
      </>
    );
  }

  if (position === "bottom") {
    return (
      <>
        <div
          className={`${commonClasses} h-[1px] bottom-1/4 ${
            direction === "left" ? "right-0 w-1/2" : "left-0 w-1/2"
          }`}
        />
        <div
          className={`${commonClasses} w-[1px] bottom-1/4 ${
            direction === "left" ? "right-1/2 h-1/2" : "left-1/2 h-1/2"
          }`}
        />
      </>
    );
  }

  if (position === "middle") {
    if (isCenter) {
      return (
        <div
          className={`${commonClasses} h-[1px] top-1/2 ${
            direction === "left" ? "right-0 w-full" : "left-0 w-full"
          }`}
        />
      );
    }
    return (
      <div
        className={`${commonClasses} h-[1px] top-1/2 ${
          direction === "left" ? "right-0 w-1/2" : "left-0 w-1/2"
        }`}
      />
    );
  }

  return null;
};
