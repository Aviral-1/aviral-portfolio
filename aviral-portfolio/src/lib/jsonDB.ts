import fs from 'fs';
import path from 'path';

const DATA_PATH = path.join(process.cwd(), 'src/data/reviews.json');

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
      const data = fs.readFileSync(DATA_PATH, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      console.error('Error reading JSON DB:', error);
      return [];
    }
  },

  async addReview(review: Review): Promise<Review> {
    try {
      const reviews = await this.getReviews();
      const newReview = {
        ...review,
        _id: Date.now().toString(),
        createdAt: new Date().toISOString(),
      };
      reviews.unshift(newReview);
      fs.writeFileSync(DATA_PATH, JSON.stringify(reviews, null, 2));
      return newReview;
    } catch (error) {
      console.error('Error writing to JSON DB:', error);
      throw error;
    }
  }
};
