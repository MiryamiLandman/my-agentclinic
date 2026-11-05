export interface Animal {
  id: number;
  name: string;
  species: string;
  status: string;
  created_at: string;
}

export interface Ailment {
  id: number;
  name: string;
  description: string;
}

export interface Therapy {
  id: number;
  name: string;
  description: string;
  created_at: string;
}

export interface Appointment {
  id: number;
  animal_id: number;
  therapist_name: string;
  scheduled_at: string;
  status: string;
  created_at: string;
}
