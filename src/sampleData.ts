type MetadataEntry = {
  name: string,
  values: string[],
}

interface MetadataMap {
  [key: string]: MetadataEntry;
}

export type Category = {
  id: string,
  name: string,
  cover?: string,
  metadata: MetadataMap,
}

export var categories: Category[] = [
  {
    id: 'poses',
    name: 'Poses',
    cover: 'covers/pose.jpg',
    metadata: {
      'body_type': {
        name: 'Bodies',
        values: [
          'Men',
          'Women',
          'Other',
        ],
      },
      'garments': {
        name: 'Garments',
        values: [
          'Nude',
          'Clothed',
        ],
      },
    },
  },
  {
    id: 'faces',
    name: 'Faces',
    cover: 'covers/head.jpg',
    metadata: {
      'expression': {
        name: 'Expression',
        values: [
          'Happy',
          'Sad',
        ],
      },
    },
  },
  {
    id: 'animals',
    name: 'Animals',
    metadata: {},
  },
  {
    id: 'hands',
    name: 'Hands',
    metadata: {},
  },
  {
    id: 'plants',
    name: 'Plants',
    metadata: {},
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
