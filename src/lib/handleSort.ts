  type SortField<T> = keyof T;
  type SortType = "string" | "number" | "date";
  
  export const handleSort = <T>(
    field: SortField<T>,
    type: SortType,
    isAscending: Record<SortField<T>, boolean>,
    setIsAscending: React.Dispatch<React.SetStateAction<Record<string, boolean>>>,
    data: T[],
    setdata: React.Dispatch<React.SetStateAction<T[]>>
  ): void => {
    const sortedData = [...(data ?? [])];
  
    if (isAscending[field]) {
      sortedData.sort((a, b) => {
        const valueA = a[field];
        const valueB = b[field];
  
        if (type === "string") {
          return (valueA as string).localeCompare(valueB as string);
        } else if (type === "number") {
          return (valueA as number) - (valueB as number);
        } else if (type === "date") {
          return (
            new Date(valueA as string).getTime() -
            new Date(valueB as string).getTime()
          );
        }
        return 0;
      });
    } else {
      sortedData.sort((a, b) => {
        const valueA = a[field];
        const valueB = b[field];
  
        if (type === "string") {
          return (valueB as string).localeCompare(valueA as string);
        } else if (type === "number") {
          return (valueB as number) - (valueA as number);
        } else if (type === "date") {
          return (
            new Date(valueB as string).getTime() -
            new Date(valueA as string).getTime()
          );
        }
        return 0;
      });
    }
  
    setdata(sortedData);
    setIsAscending((prev) => ({
      ...prev,
      [field as string]: !prev[field as string],
    }));
  };