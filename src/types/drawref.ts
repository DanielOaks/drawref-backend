export type TagEntry = {
  id: string;
  name: string;
  values: string[];
};

export type TagMap = Record<string, string[]>;

export type Category = {
  id: string;
  name: string;
  cover?: string;
  cover_id?: number;
  tags?: TagEntry[];
};

export type Image = {
  id: number;
  path: string;
  author: string;
  author_url: string;
  tags?: TagMap;
};
