export interface WishlistItem {
  phoneId: string;
  addedAt: string;
}

class LocalStorage {
  private getItem<T>(key: string, defaultValue: T): T {
    if (typeof window === 'undefined') return defaultValue;
    
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch {
      return defaultValue;
    }
  }

  private setItem<T>(key: string, value: T): void {
    if (typeof window === 'undefined') return;
    
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Failed to save to localStorage:', error);
    }
  }

  getWishlist(): string[] {
    return this.getItem<string[]>('mpp:wishlist', []);
  }

  setWishlist(phoneIds: string[]): void {
    this.setItem('mpp:wishlist', phoneIds);
  }

  addToWishlist(phoneId: string): void {
    const wishlist = this.getWishlist();
    if (!wishlist.includes(phoneId)) {
      this.setWishlist([...wishlist, phoneId]);
    }
  }

  removeFromWishlist(phoneId: string): void {
    const wishlist = this.getWishlist();
    this.setWishlist(wishlist.filter(id => id !== phoneId));
  }

  isInWishlist(phoneId: string): boolean {
    return this.getWishlist().includes(phoneId);
  }

  clearWishlist(): void {
    this.setWishlist([]);
  }
}

export const storage = new LocalStorage();
