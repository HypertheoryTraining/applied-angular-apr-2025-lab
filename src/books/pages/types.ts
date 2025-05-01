export type BookApiEntity = {
  author: string;
  country: string;
  imageLink: string;
  language: string;
  link: string;
  pages: number;
  title: string;
  year: number;
  id: string;
};

export type BookListModel = Pick<
  BookApiEntity,
  'id' | 'title' | 'author' | 'year'
>;

export type BooksStatsModel = {
  totalBooks: number;
  earliestYear: number;
  latestYear: number;
  averagePages: number;
};
