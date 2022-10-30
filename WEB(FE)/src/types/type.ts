export interface LoggedInUser {
  sn: string;
  nm: string;
  rk: string;
  type: 'User' | 'ADMIN' | 'MASTER';
}

export interface User {
  sn: string;
  nm: string;
  rk: string;
  type: 'User' | 'ADMIN' | 'MASTER';
}

export interface Record {
  id: number;
  file_name: string;
  owner: string;
  created_at: string;
  approval_status: 'NOTHING' | 'PENDING' | 'REJECTED' | 'APPROVED';
  approved_at: string;
  unit: number;
  unit_name: string;
}

export interface History {
  sn: string;
  name: string;
  rank: string;
  ip_address: string;
}

export interface Org {
  id: number;
  name: string;
  parent: number;
}
