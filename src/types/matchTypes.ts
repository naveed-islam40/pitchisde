export interface Events {
  extra_minute?: number;
  period_id: number;
  minute: number;
  sort_order: number;
  period: {
    type_id: number;
    ticking: boolean;
    time_added: number;
  };
  type: {
    code: string;
  };
  participant_id: string;
  id: string;
}

export interface ProcessedEvent {
  type: string;
  time: number;
  id: string;
}

export interface Period {
  time_added: number;
  type_id: string;
  ticking: boolean;
}

export interface StatTag {
    icon: string;
    position: string;
  }