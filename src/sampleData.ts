type MetadataEntry = {
  name: string,
  key: string,
  values: string[],
}

interface MetadataMap {
  [key: number]: MetadataEntry;
}

export type Category = {
  id: number,
  name: string,
  cover?: string,
  metadata: MetadataMap,
}

export var categories: Category[] = [
  {
    id: 1,
    name: 'Poses',
    cover: 'covers/pose.jpg',
    metadata: {
      1: {
        name: 'Bodies',
        key: 'body_type',
        values: [
          'Men',
          'Women',
          'Other',
        ],
      },
      2: {
        name: 'Garments',
        key: 'garments',
        values: [
          'Nude',
          'Clothed',
        ],
      },
    },
  },
]

export type SessionImage = {
  path: string,
  author: string,
}

export var images: SessionImage[] = [
  {
    path: 'covers/pose.jpg',
    author: 'Pixienop',
  },
  {
    path: 'covers/head.jpg',
    author: 'Pixienop',
  },
  {
    path: 'covers/pose.jpg',
    author: 'Pixienop',
  },
  {
    path: 'covers/head.jpg',
    author: 'Pixienop',
  },
]
