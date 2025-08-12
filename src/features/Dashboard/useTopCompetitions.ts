// import { useQuery } from "@tanstack/react-query";

// export default function useTopCompetitions() {
//     const {data : topCompetitions, isLoading, isError} = useQuery({
//         queryKey: ["homepage_top_comps"],
//         queryFn: () => getTopCompetitions(),
//         staleTime: 1000 * 60 * 10
//     })

//     return {topCompetitions, isLoading, isError}
// }