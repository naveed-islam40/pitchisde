import clsx from "clsx";
import styles from "./StandingsTable.module.css";
import StandingsRow from "./StandingsRow";

export default function GroupedStandings({ groups }) {
  console.log("groups", groups);
  return (
    <>
      {groups.map(({ id, name, standings }) => (
        <div key={id}>
          <div className="border-y p-4">
            <h1 className="lg:text-xl text-lg font-semibold">{name}</h1>
          </div>
          <table
            className={clsx(
              "w-full max-w-full border-separate border-spacing-y-2 text-center",
              styles.table
            )}
          >
            <thead>
              <tr className="text-lg font-semibold text-primary [&_th]:pb-2 [&_th]:pt-2">
                <th className="pl-6 pr-4">#</th>
                <th className="w-[90%] px-4 text-left">Team</th>
                <th>P</th>
                <th>W</th>
                <th>D</th>
                <th>L</th>
                <th>+/-</th>
                <th>GD</th>
                <th>Pts</th>
                <th className="text-left">Form</th>
                <th className="pl-2 pr-6">Next</th>
              </tr>
            </thead>
            <tbody className="font-medium">
              {standings?.map((standing) => (
                <StandingsRow key={standing.id} standing={standing} />
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </>
  );
}
