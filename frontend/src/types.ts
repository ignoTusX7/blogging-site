export interface IAuthor {
  id?: string;
  name: string;
}
export interface IBlog {
  id: string;
  title: string;
  description: string;
  slug: string;
  content: string;
  createdAt: string;
  author: IAuthor;
}
