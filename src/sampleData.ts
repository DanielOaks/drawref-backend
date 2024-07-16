// contains our sample data.
// note, those listed here have agreed to have their images
//  appear as sample data with certain conditions applying.
// check the LICENSE file for details.

import { Category, SampleProviderEntry, TagMap } from "./types/drawref.js";

type RawSampleCategory = {
  name: string;
  cover?: string;
  tags: string;
};

var rawSampleCategories: RawSampleCategory[] = [
  {
    name: "Poses",
    cover: "pose.jpg",
    tags: `
    Bodies: Men, Women, Other
    Clothing: Nude, Clothed
    Energy: Action, Stationary`,
  },
  {
    name: "Faces",
    cover: "head.jpg",
    tags: `
    Expression: Happy, Sad, Angry, Scared, Disgust, Surprise
    Facial Hair: Facial Hair, No Facial Hair
    Bodies: Men, Women, Other`,
  },
  {
    name: "Animals",
    cover: "animals.jpg",
    tags: `
    Species: Feline, Canine, Equine & Hooved, Avian, Aquatic, Rodents & Bunnies, Bugs and Insects, Primates
    Skeletons: Skeletons, Live`,
  },
  {
    name: "Hands & Feet",
    tags: `
    Focus: Hands, Feet
    Bodies: Men, Women, Other`,
  },
  {
    name: "Plants",
    tags: `
    Type: Flowers, Plants`,
  },
  {
    name: "Basic Shapes",
    tags: `
    Lighting: Shading, Unlit`,
  },
  {
    name: "Still Life",
    tags: `
    Subjects: One, Multiple`,
  },
];

export var sampleCategories: Category[] = rawSampleCategories.map((info) => {
  // this works. it's ugly, but it works.
  return {
    id: info.name.toLowerCase(),
    name: info.name,
    cover: info.cover,
    tags: info.tags
      .trim()
      .split("\n")
      .map((l) => l.trim())
      .map((tagNameAndList) => {
        const tagNameInfo = tagNameAndList.split(":", 2);
        return {
          id: tagNameInfo[0].toLowerCase(),
          name: tagNameInfo[0],
          values: tagNameInfo[1].split(",").map((n) => n.trim()),
        };
      }),
  };
});

export function parseSampleTags(input: string[]): TagMap {
  let tags: TagMap = {};
  for (const group of input) {
    const newGroup = group.split(" ", 2);
    const name = newGroup[0];
    const value = newGroup[1].trim();
    if (!tags[name]) {
      tags[name] = [];
    }
    tags[name].push(value);
  }
  return tags;
}

export var sampleImages: SampleProviderEntry[] = [
  // adorkastock
  {
    author: "AdorkaStock",
    author_url: "https://www.adorkastock.com/",
    requirement: "",
    images: [
      {
        category: "poses",
        images: [
          {
            path: "adorkastock/poses/AdorkaStock_LaurenAshley-1008-1022x1536.jpg",
            tags: ["bodies Women", "clothing Clothed", "energy Stationary"],
          },
          {
            path: "adorkastock/poses/Draw-Everything-June-2023-3-942x1024.jpg",
            tags: ["bodies Men", "clothing Clothed", "energy Action"],
          },
          {
            path: "adorkastock/poses/DSC_0154-985x2048.jpg",
            tags: ["bodies Women", "clothing Clothed", "energy Stationary"],
          },
          {
            path: "adorkastock/poses/DSC_0422-1156x2048.jpg",
            tags: ["bodies Men", "clothing Clothed", "energy Action"],
          },
          {
            path: "adorkastock/poses/DSC_0452-1220x1536.jpg",
            tags: ["bodies Men", "clothing Clothed", "energy Stationary"],
          },
          {
            path: "adorkastock/poses/flying_shooting-24-1024x1536.jpg",
            tags: ["bodies Women", "clothing Clothed", "energy Action"],
          },
          {
            path: "adorkastock/poses/Patreon-2022-08-1-2-1002x1536.jpg",
            tags: ["bodies Women", "clothing Clothed", "energy Stationary"],
          },
          {
            path: "adorkastock/poses/Sword-10-1039x1536.jpg",
            tags: ["bodies Men", "clothing Clothed", "energy Stationary"],
          },
          {
            path: "adorkastock/poses/Twitter-2021-09-4-1.jpg",
            tags: ["bodies Women", "clothing Clothed", "energy Action"],
          },
        ],
      },
    ],
  },

  // jookpubstock
  {
    author: "JookpubStock",
    author_url: "https://jookpubstock.com",
    requirement: "This site is completely free to access.",
    images: [
      {
        category: "poses",
        images: [
          {
            path: "adorkastock/poses/006-scaled.jpg",
            tags: ["bodies Other", "clothing Clothed", "energy Action"],
          },
          {
            path: "adorkastock/poses/007-1-scaled.jpg",
            tags: ["bodies Other", "clothing Clothed", "energy Stationary"],
          },
          {
            path: "adorkastock/poses/Leaning-33-scaled.jpg",
            tags: ["bodies Other", "clothing Clothed", "energy Static"],
          },
          {
            path: "adorkastock/poses/Leaning-42-scaled.jpg",
            tags: ["bodies Other", "clothing Clothed", "energy Static"],
          },
          {
            path: "adorkastock/poses/Walking-Running-Cape-06-scaled.jpg",
            tags: ["bodies Other", "clothing Clothed", "energy Action"],
          },
        ],
      },
      {
        category: "hands & feet",
        images: [
          {
            path: "adorkastock/foot/Foot-Pack-Eye-Level-04.jpg",
            tags: ["bodies Other", "focus Feet"],
          },
          {
            path: "adorkastock/foot/Foot-Pack-Eye-Level-05.jpg",
            tags: ["bodies Other", "focus Feet"],
          },
          {
            path: "adorkastock/foot/Foot-Pack-High-Angle-04.jpg",
            tags: ["bodies Other", "focus Feet"],
          },
          {
            path: "adorkastock/hands/Every-Day-Is-Hand-Day-04.jpg",
            tags: ["bodies Other", "focus Hands"],
          },
          {
            path: "adorkastock/hands/Every-Day-Is-Hand-Day-07.jpg",
            tags: ["bodies Other", "focus Hands"],
          },
          {
            path: "adorkastock/hands/Every-Day-Is-Hand-Day-12.jpg",
            tags: ["bodies Other", "focus Hands"],
          },
          {
            path: "adorkastock/hands/Every-Day-Is-Hand-Day-18.jpg",
            tags: ["bodies Other", "focus Hands"],
          },
        ],
      },
    ],
  },
];
