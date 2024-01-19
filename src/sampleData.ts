type TagEntry = {
  id: string;
  name: string;
  values: string[];
};

export type Category = {
  id: string;
  name: string;
  cover?: string;
  tags: TagEntry[];
};

export var categories: Category[] = [
  {
    id: "poses",
    name: "Poses",
    cover: "covers/pose.jpg",
    tags: [
      {
        id: "bodies",
        name: "Bodies",
        values: ["Men", "Women", "Other"],
      },
      {
        id: "garments",
        name: "Garments",
        values: ["Nude", "Clothed"],
      },
    ],
  },
  {
    id: "faces",
    name: "Faces",
    cover: "covers/head.jpg",
    tags: [
      {
        id: "expression",
        name: "Expression",
        values: ["Happy", "Sad"],
      },
    ],
  },
  {
    id: "animals",
    name: "Animals",
    cover: "covers/animals.jpg",
    tags: [],
  },
  {
    id: "hands",
    name: "Hands",
    tags: [],
  },
  {
    id: "plants",
    name: "Plants",
    tags: [],
  },
];

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
