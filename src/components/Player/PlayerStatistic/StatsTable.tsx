import { allTypeIds } from "@/ApiTypes/PlayerTypes";
import clsx from "clsx";

function StatsTable({ headers, children, stats }) {
  const visibeHeaders: any = {};

  const checkOverAll = (typeIds) => {
    return stats?.details?.some((stat) => typeIds?.includes(stat?.type_id));
  };

  for (const [key, typeIds] of Object.entries(allTypeIds)) {
    const overall = checkOverAll(typeIds);
    visibeHeaders[key] = overall;
  }

  return (
    <table className={clsx("w-full border-collapse")}>
      <colgroup>
        <col className="w-2/4" />
        <col className="w-1/4" />
        <col className="w-1/4" />
      </colgroup>
      <thead>
        <tr
          className={
            visibeHeaders[headers?.[0]] ? "border-b border-t" : "hidden"
          }
        >
          {headers.map((header) => (
            <td
              className={clsx("text-left text-x-bargreen font-bold py-3")}
              key={header}
            >
              {header}
            </td>
          ))}
        </tr>
      </thead>
      <tbody className="">
        <tr>
          <td colSpan={headers.length} className="h-4"></td>
        </tr>
        {children}
      </tbody>
    </table>
  );
}

export default StatsTable;
