type TagEntry = {
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

export var images: SessionImage[] = [
  {
    path: "covers/pose.jpg",
    author: "Pixienop",
  },
  {
    path: "covers/head.jpg",
    author: "Pixienop",
  },
  {
    path: "covers/pose.jpg",
    author: "Pixienop",
  },
  {
    path: "covers/head.jpg",
    author: "Pixienop",
  },
];
