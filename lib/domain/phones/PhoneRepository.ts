import { PhoneSpec } from '@/lib/types';

export interface PhoneRepository {
  getAll(): Promise<PhoneSpec[]>;
  getById(id: string): Promise<PhoneSpec | null>;
  getTrending(limit?: number): Promise<PhoneSpec[]>;
  getLatest(limit?: number): Promise<PhoneSpec[]>;
  getFeatured(limit?: number): Promise<PhoneSpec[]>;
  search(query: string): Promise<PhoneSpec[]>;
}
