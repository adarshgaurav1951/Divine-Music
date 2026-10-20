/**
 * Prayer & Virtual Diya Service
 * Currently uses localStorage for offline/local persistence.
 * Structured with async API patterns so Supabase or Firebase can be connected seamlessly.
 */

export interface PrayerEntry {
  id: string;
  name: string;
  city?: string;
  message: string;
  createdAt: string;
  likes: number;
}

const STORAGE_KEY = 'divine_kali_prayers_list';

const DEFAULT_PRAYERS: PrayerEntry[] = [
  {
    id: 'pr-1',
    name: 'Ananya Mukherjee',
    city: 'Kolkata',
    message: 'Maa, protect my family and grant everyone health, wisdom, and courage.',
    createdAt: 'Today',
    likes: 12
  },
  {
    id: 'pr-2',
    name: 'Rohan Sharma',
    city: 'Varanasi',
    message: 'Seeking Maa Kali’s maternal grace for inner peace and world harmony this Diwali.',
    createdAt: 'Today',
    likes: 9
  },
  {
    id: 'pr-3',
    name: 'Priya Sen',
    city: 'London',
    message: 'Lighting this diya from afar with devotion. Har Har Mahadev, Jai Maa Shyama Kali!',
    createdAt: 'Yesterday',
    likes: 15
  }
];

export const prayerService = {
  /**
   * Fetch all prayers (Mock async for Supabase/Firebase compatibility)
   */
  async getPrayers(): Promise<PrayerEntry[]> {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (data) {
        return JSON.parse(data);
      }
    } catch (e) {
      console.warn('Error reading prayers from storage:', e);
    }
    return DEFAULT_PRAYERS;
  },

  /**
   * Add a new prayer & lighted diya (Mock async for Supabase/Firebase compatibility)
   */
  async addPrayer(name: string, message: string, city: string = 'Devotee'): Promise<PrayerEntry> {
    const newEntry: PrayerEntry = {
      id: `prayer-${Date.now()}`,
      name: name.trim(),
      city: city.trim(),
      message: message.trim(),
      createdAt: 'Just now',
      likes: 1
    };

    const existing = await this.getPrayers();
    const updated = [newEntry, ...existing];
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.warn('Error saving prayer to storage:', e);
    }

    return newEntry;
  },

  /**
   * Bless/Like a prayer
   */
  async likePrayer(id: string): Promise<void> {
    const existing = await this.getPrayers();
    const updated = existing.map(p => (p.id === id ? { ...p, likes: p.likes + 1 } : p));
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.warn('Error updating likes in storage:', e);
    }
  }
};
