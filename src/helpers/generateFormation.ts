type PositionSlot = {
  label: string;
  x: number;
  y: number;
};

type Formation = {
  name: string;
  positions: PositionSlot[];
};

const positionLabelsByLine = (count: number, lineIndex: number): string[] => {
  const defaultMap: string[][] = [
    ["ST", "CF", "SS"],
    ["CAM", "CM", "AM"],
    ["LM", "CM", "RM"],
    ["LB", "CB", "RB"],
  ];

  const fallback = Array(count).fill("P" + lineIndex);
  return defaultMap[lineIndex] ? defaultMap[lineIndex].slice(0, count) : fallback;
};

export function generateFormationFromString(name: string): Formation {
  const lines = name.split("-").map(Number).reverse();
  const totalLines = lines.length;
  const positions: PositionSlot[] = [];

  lines.forEach((count, lineIndex) => {
    const y = 0.1 + (lineIndex / (totalLines + 1));
    const isFirst = lineIndex === 0;
    const isSecond = lineIndex === 1;
    const offsetStart = isFirst ? 0.15 : isSecond ? 0.05 : 0;
    const usableWidth = isFirst ? 0.70 : isSecond ? 0.90 : 1;

    const step = usableWidth / (count + 1);



    for (let i = 0; i < count; i++) {
      const x = offsetStart + step * (i + 1);
      const label = `${positionLabelsByLine(count, lineIndex)[i] ?? "P" + (lineIndex + 1)}`;
      positions.push({ label, x, y });
    }
  });

  positions.push({ label: "GK", x: 0.5, y: 0.85 });

  return { name, positions };
}
