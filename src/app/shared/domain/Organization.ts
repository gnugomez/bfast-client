export interface Organization {
  id?: number;
  name: string;
  description?: string;
  address?: string;
  phone?: string;
  email?: string;
  website?: string;
  logo?: string;
  deleted_at?: string;
  created_at?: string;
  updated_at?: string;
  pivot?: Pivot;
}

export interface Pivot {
  user_id: number;
  organization_id: number;
  role: string;
}
