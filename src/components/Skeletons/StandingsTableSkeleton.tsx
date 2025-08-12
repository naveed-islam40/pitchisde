import { Block } from "../Block";

export default function StandingsTableSkeleton() {
  return (
    <Block padding={false} contentClassName="overflow-x-auto">
      <div className="overflow-hidden px-2">
        <table className="w-full mt-2">
          <tbody className="">
            {Array.from({ length: 10 }, (_, i) => (
              <tr
                key={i}
                className="w-full relative overflow-hidden block mb-2 rounded-md bg-gray-300"
              >
                <td className="p-2 align-middle rounded-md">
                  <div className="shimmer-effect"></div>
                  <span className="w-4 h-4 inline-block"></span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Block>
  );
}
