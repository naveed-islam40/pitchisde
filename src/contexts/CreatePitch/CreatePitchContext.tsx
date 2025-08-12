import { createContext, useContext, useState } from "react";

interface CreatePitchContextType {
  title: string;
  setTitle: (title: string) => void;
  subtitle: string;
  setSubtitle: (subtitle: string) => void;
  setSelectedFormation: (formation: string) => void;
  selectedFormation: string;
  goals: number;
  setGoals: (goals: number) => void;
  setSelectedOption: (option: string[]) => void;
  selectedOption: string[];
}

const CreatePitchContext = createContext<CreatePitchContextType | undefined>(
  undefined
);

export function CreatePitchProvider({ children }) {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [selectedFormation, setSelectedFormation] = useState("");
  const [goals, setGoals] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string[]>([]);

  return (
    <CreatePitchContext.Provider
      value={{
        title,
        setTitle,
        subtitle,
        setSubtitle,
        selectedFormation,
        setSelectedFormation,
        goals,
        setGoals,
        selectedOption,
        setSelectedOption,
      }}
    >
      {children}
    </CreatePitchContext.Provider>
  );
}

export const useCreatePitch = () => {
  const context = useContext(CreatePitchContext);
  if (!context) {
    throw new Error("useCreatePitch must be used within a CreatePitchProvider");
  }
  return context;
};
