export default interface Movie {
  id: string;
  title: string;
  year: string;
  popularity: string;
  description: string;
  content_rating: string;
  movie_length: string;
  rating: string;
  created_at: string;
  trailer: string;
  image_url: string;
  release: string;
  plot: string;
  banner: string;
  type: string;
  more_like_this: Array<any>;
  gen: Array<{ id: string; genre: string }>;
  keywords: Array<{ id: string; keyword: string }>;
}
