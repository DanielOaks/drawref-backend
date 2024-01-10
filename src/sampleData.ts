type MetadataEntry = {
  name: string,
  key: string,
  values: string[],
}

interface MetadataMap {
  [key: number]: MetadataEntry;
}

export type Category = {
  name: string,
  cover?: string,
  metadata: MetadataMap,
}

interface CategoryMap {
  [key: number]: Category;
}

export var categories: CategoryMap = {
  1: {
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
}

export var images = [
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
