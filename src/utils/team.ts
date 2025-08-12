// types/team.ts
export interface TeamResponse {
    data: {
      id: number;
      name: string;
      // Add other fields as needed
      latest: Match[]; // Define the `latest` field as an array of matches
    };
  }
  
  export interface Match {
    id: number;
    league: {
      id: number;
      name: string;
      image_path: string;
    };
    participants: Participant[];
    result_info: string;
    starting_at: string;
    // Add other fields as needed
  }
  
  export interface Participant {
    id: number;
    name: string;
    image_path: string;
    meta: {
      location: 'home' | 'away';
      winner: boolean;
    };
  }