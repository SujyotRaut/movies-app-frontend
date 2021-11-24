export default interface Movie {
  id: string;
  title: string;
  year: string;
  popularity: string;
  description: string;
  contentRating: string;
  movieLength: string;
  rating: string;
  createdAt: string;
  trailer: string;
  imageUrl: string;
  release: string;
  plot: string;
  banner: string;
  type: string;
  genres: Array<{ id: string; genre: string }>;
  keywords: Array<{ id: string; keyword: string }>;
  addedToWatchlist?: boolean;
}
