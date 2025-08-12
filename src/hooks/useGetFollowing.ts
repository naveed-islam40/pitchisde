import { useEffect, useState } from "react";

export const useGetFollowingMatchIds = () => {
  const [followingMatchIds, setFollowingMatchIds] = useState<any>([]);

  useEffect(() => {
    const fetchUserMatches = () => {
      try {
        const localUser = localStorage.getItem("user");
        if (localUser) {
          const userJSON = JSON.parse(localUser);
          const matches = userJSON?.notify?.matches;

          setFollowingMatchIds(Array.isArray(matches) ? matches : []);
        } else {
          setFollowingMatchIds([]);
        }
      } catch (error) {
        console.error("Error reading user matches from localStorage:", error);
        setFollowingMatchIds([]);
      }
    };

    fetchUserMatches();

    const intervalId = setInterval(fetchUserMatches, 5000);

    return () => clearInterval(intervalId);
  }, []);


  return { followingMatchIds };
};
