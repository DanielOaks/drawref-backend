export type TagEntry = {
  id: string;
  name: string;
  values: string[];
};

export type Category = {
  id: string;
  name: string;
  cover?: string;
  tags?: TagEntry[];
};

export type SessionImage = {
  path: string;
  author: string;
};
