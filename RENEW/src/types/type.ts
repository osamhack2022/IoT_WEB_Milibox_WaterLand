export interface LoggedInUser {
  sn: string;
  nm: string;
  rk: string;
}

export interface Record {
  id: number;
  file_name: string;
  owner: string;
  created_at: string;
  approved_at: string;
  unit: string;
}
