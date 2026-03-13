import fs from 'fs';
import path from 'path';

// Moved out of src/ to prevent Next.js dev server from reloading on every write
const DATA_PATH = path.join(process.cwd(), 'data/reviews.json');

export interface Review {
  _id?: string;
  name: string;
  role?: string;
  org?: string;
  email?: string;
  linkedin?: string;
  content: string;
  image?: string;
  avatar?: string;
  createdAt?: string;
}

export const jsonDB = {
  async getReviews(): Promise<Review[]> {
    try {
      if (!fs.existsSync(DATA_PATH)) {
        return [];
      }
      const data = await fs.promises.readFile(DATA_PATH, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      console.error('Error reading JSON DB:', error);
      return [];
    }
  },

  async addReview(review: Review): Promise<Review> {
    const TEMP_PATH = `${DATA_PATH}.tmp`;
    try {
      const reviews = await this.getReviews();
      const newReview = {
        ...review,
        _id: Date.now().toString(),
        createdAt: new Date().toISOString(),
      };
      reviews.unshift(newReview);
      
      // Atomic write: write to temp file then rename
      await fs.promises.writeFile(TEMP_PATH, JSON.stringify(reviews, null, 2), 'utf8');
      await fs.promises.rename(TEMP_PATH, DATA_PATH);
      
      return newReview;
    } catch (error) {
      console.error('Error writing to JSON DB:', error);
      // Clean up temp file if it exists
      if (fs.existsSync(TEMP_PATH)) {
        try { await fs.promises.unlink(TEMP_PATH); } catch (e) {}
      }
      throw error;
    }
  }
};
