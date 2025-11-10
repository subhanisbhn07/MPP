import { PhoneRepository } from '@/lib/domain/phones/PhoneRepository';
import { PhoneSpec } from '@/lib/types';
import { mockPhones } from '@/lib/mock-data';

export class MockPhoneRepository implements PhoneRepository {
  async getAll(): Promise<PhoneSpec[]> {
    return mockPhones;
  }

  async getById(id: string): Promise<PhoneSpec | null> {
    return mockPhones.find(p => p.id === id) || null;
  }

  async getTrending(limit?: number): Promise<PhoneSpec[]> {
    const trending = mockPhones.filter(p => p.trending);
    return limit ? trending.slice(0, limit) : trending;
  }

  async getLatest(limit?: number): Promise<PhoneSpec[]> {
    const latest = mockPhones.filter(p => p.latestLaunch);
    return limit ? latest.slice(0, limit) : latest;
  }

  async getFeatured(limit?: number): Promise<PhoneSpec[]> {
    const featured = mockPhones.filter(p => p.featured);
    return limit ? featured.slice(0, limit) : featured;
  }

  async search(query: string): Promise<PhoneSpec[]> {
    const lowerQuery = query.toLowerCase();
    return mockPhones.filter(p => 
      p.brand.toLowerCase().includes(lowerQuery) ||
      p.model.toLowerCase().includes(lowerQuery)
    );
  }
}

export const phoneRepository = new MockPhoneRepository();
