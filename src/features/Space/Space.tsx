// install (please try to align the version of installed @nivo packages)
// yarn add @nivo/line
import { ResponsiveLine } from "@nivo/line";

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const MyResponsiveLine = ({ data /* see data tab */ }) => (
  <ResponsiveLine
    theme={{
      text: {
        fontSize: 14,
        fill: "#00401A",
        fontFamily: "Inter"
      },
      axis: {
        ticks: {
          text: {
            fontSize: 16,
            fill: "#00401A",
            outlineWidth: 4,
            fontFamily: "Inter"
          }
        }
      }
    }}
    data={data}
    margin={{ top: 50, right: 70, bottom: 50, left: 100 }}
    curve='linear'
    xScale={{ type: "point" }}
    yScale={{
      type: "linear",
      min: 0,
      max: 7,
      stacked: true,
      reverse: false
    }}
    lineWidth={4}
    pointSize={24}
    pointColor='#FFFFFF'
    pointBorderWidth={2}
    pointBorderColor='#D9D9D9'
    axisTop={null}
    axisRight={null}
    axisLeft={{
      tickValues: [0.5, 2.5, 4.5, 6.5],
      renderTick: ({ x, y }) => {
        return (
          <g transform={`translate(${x - 65},${y - 15})`}>
            <image href="/mig/teams/premier-league.png" height="30" />
          </g>
        );
      }
    }}
    axisBottom={{
      tickPadding: 25,
      tickSize: 0
    }}
    enableGridX={false}
    gridYValues={[0, 1, 2, 3, 4, 5, 6, 7]}
    colors={["#000000"]}
    enablePointLabel
    pointLabelYOffset={5}
    /* @ts-ignore */
    pointLabel={point => point.idx.toString()}
  />
);

export function Space() {
  return (
    <main className='p-0'>
      <div className='h-96'>
        <MyResponsiveLine data={data} />
      </div>
    </main>
  );
}

const data = [
  {
    id: "japan",
    color: "#000000",
    data: [
      { idx: 0, x: "10/11", y: 2.5 },
      { idx: 1, x: "11/12", y: 4.1 },
      { idx: 2, x: "12/13", y: 1.9 },
      { idx: 3, x: "13/14", y: 5.9 },
      { idx: 4, x: "14/15", y: 0.2 },
      { idx: 5, x: "15/16", y: 4.0 },
      { idx: 6, x: "16/17", y: 1.0 },
      { idx: 7, x: "17/18", y: 6.5 },
      { idx: 8, x: "18/19", y: 3.1 },
      { idx: 9, x: "19/20", y: 5.9 },
      { idx: 10, x: "20/21", y: 1.0 },
    ]
  }
];
