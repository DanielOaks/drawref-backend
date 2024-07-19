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
    Species: Feline, Canine, Equine & Hooved, Avian, Aquatic, Rodents & Bunnies, Bugs & Insects, Spiders, Primates
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
          id: tagNameInfo[0].toLowerCase().replace(" ", "_"),
          name: tagNameInfo[0],
          values: tagNameInfo[1].split(",").map((n) => n.trim()),
        };
      }),
  };
});

export function parseSampleTags(input: string[]): TagMap {
  let tags: TagMap = {};
  for (const group of input) {
    const newGroup = group.split(" ");
    const tId = newGroup.shift() || "";
    const value = newGroup.join(" ").trim();
    if (!tags[tId]) {
      tags[tId] = [];
    }
    tags[tId].push(value);
  }
  return tags;
}

export var sampleImages: SampleProviderEntry[] = [
  // adorkastock
  {
    author: "AdorkaStock",
    author_url: "https://www.adorkastock.com",
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
            path: "jookpubstock/poses/006-scaled.jpg",
            tags: ["bodies Other", "clothing Clothed", "energy Action"],
          },
          {
            path: "jookpubstock/poses/007-1-scaled.jpg",
            tags: ["bodies Other", "clothing Clothed", "energy Stationary"],
          },
          {
            path: "jookpubstock/poses/Leaning-33-scaled.jpg",
            tags: ["bodies Other", "clothing Clothed", "energy Static"],
          },
          {
            path: "jookpubstock/poses/Leaning-42-scaled.jpg",
            tags: ["bodies Other", "clothing Clothed", "energy Static"],
          },
          {
            path: "jookpubstock/poses/Walking-Running-Cape-06-scaled.jpg",
            tags: ["bodies Other", "clothing Clothed", "energy Action"],
          },
        ],
      },
      {
        category: "hands & feet",
        images: [
          {
            path: "jookpubstock/foot/Foot-Pack-Eye-Level-04.jpg",
            tags: ["bodies Other", "focus Feet"],
          },
          {
            path: "jookpubstock/foot/Foot-Pack-Eye-Level-05.jpg",
            tags: ["bodies Other", "focus Feet"],
          },
          {
            path: "jookpubstock/foot/Foot-Pack-High-Angle-04.jpg",
            tags: ["bodies Other", "focus Feet"],
          },
          {
            path: "jookpubstock/hands/Every-Day-Is-Hand-Day-04.jpg",
            tags: ["bodies Other", "focus Hands"],
          },
          {
            path: "jookpubstock/hands/Every-Day-Is-Hand-Day-07.jpg",
            tags: ["bodies Other", "focus Hands"],
          },
          {
            path: "jookpubstock/hands/Every-Day-Is-Hand-Day-12.jpg",
            tags: ["bodies Other", "focus Hands"],
          },
          {
            path: "jookpubstock/hands/Every-Day-Is-Hand-Day-18.jpg",
            tags: ["bodies Other", "focus Hands"],
          },
        ],
      },
    ],
  },

  // daniel oakley
  {
    author: "Daniel Oaks",
    author_url: "https://danieloaks.net",
    requirement: "",
    images: [
      {
        category: "animals",
        images: [
          {
            path: "danieloaks/animals/bug_1.jpg",
            tags: ["species Bugs & Insects", "skeletons Live"],
          },
          {
            path: "danieloaks/animals/bug_2.jpg",
            tags: ["species Bugs & Insects", "skeletons Live"],
          },
          {
            path: "danieloaks/animals/bug_3.jpg",
            tags: ["species Bugs & Insects", "skeletons Live"],
          },
          {
            path: "danieloaks/animals/bug_4.jpg",
            tags: ["species Bugs & Insects", "skeletons Live"],
          },
          {
            path: "danieloaks/animals/bug_5.jpg",
            tags: ["species Bugs & Insects", "skeletons Live"],
          },
          {
            path: "danieloaks/animals/bug_6.jpg",
            tags: ["species Bugs & Insects", "skeletons Live"],
          },
          {
            path: "danieloaks/animals/bug_7.jpg",
            tags: ["species Bugs & Insects", "skeletons Live"],
          },
          {
            path: "danieloaks/animals/spider_1.jpg",
            tags: ["species Spiders", "skeletons Live"],
          },
          {
            path: "danieloaks/animals/spider_2.jpg",
            tags: ["species Spiders", "skeletons Live"],
          },
        ],
      },
    ],
  },

  // the pose archives
  {
    author: "The Pose Archives",
    author_url: "https://linktr.ee/theposearchives",
    requirement: "",
    images: [
      {
        category: "faces",
        images: [
          {
            path: "theposearchives/faces/female_putting_up_hair_pose_by_theposearchives_dfz8zlz-fullview.jpg",
            tags: ["expression Sad", "facial_hair No Facial Hair", "bodies Women"],
          },
          {
            path: "theposearchives/faces/male_expressions_reference_by_theposearchives_dehnzwy-fullview.jpg",
            tags: [
              "expression Happy",
              "expression Angry",
              "expression Disgust",
              "expression Surprise",
              "facial_hair Facial Hair",
              "bodies Men",
            ],
          },
          {
            path: "theposearchives/faces/male_expressions_reference_by_theposearchives_deihy0p-fullview.jpg",
            tags: ["expression Angry", "expression Surprise", "facial_hair Facial Hair", "bodies Men"],
          },
        ],
      },
      {
        category: "poses",
        images: [
          {
            path: "theposearchives/poses/female_archer_pose_close_up_perspective_shot_by_theposearchives_df2yjwm-pre.jpg",
            tags: ["bodies Women", "clothing Clothed", "energy Action"],
          },
          {
            path: "theposearchives/poses/female_cloaked_mage_with_staff_pose_by_theposearchives_dglvdzv-fullview.jpg",
            tags: ["bodies Women", "clothing Clothed", "energy Action"],
          },
          {
            path: "theposearchives/poses/female_confident_walk_pose_by_theposearchives_df7aql5-fullview.jpg",
            tags: ["bodies Women", "clothing Clothed", "energy Stationary"],
          },
          {
            path: "theposearchives/poses/male_and_female_greek_inspired_pose_3_by_theposearchives_dg28jxa-fullview.jpg",
            tags: ["bodies Women", "bodies Men", "clothing Clothed", "energy Stationary"],
          },
          {
            path: "theposearchives/poses/male_close_up_villain_pose_by_theposearchives_dhkzwiw-fullview.jpg",
            tags: ["bodies Men", "clothing Clothed", "energy Stationary"],
          },
          {
            path: "theposearchives/poses/male_epic_low_angle_battle_pose_by_theposearchives_dh7611i-fullview.jpg",
            tags: ["bodies Men", "clothing Clothed", "energy Action"],
          },
          {
            path: "theposearchives/poses/male_strong_standing_pose_by_theposearchives_df7aqle-fullview.jpg",
            tags: ["bodies Men", "clothing Clothed", "energy Stationary"],
          },
          {
            path: "theposearchives/poses/male_wizard_casting_spell_with_broom_pose_02_by_theposearchives_dfiddzi-fullview.jpg",
            tags: ["bodies Men", "clothing Clothed", "energy Action"],
          },
        ],
      },
    ],
  },

  // grafit studio
  {
    author: "Grafit Studio",
    author_url: "https://www.artstation.com/grafit/store",
    requirement: "",
    images: [
      {
        category: "faces",
        images: [
          {
            path: "grafitstudio/faces/Anya0039.jpg",
            tags: ["expression Sad", "facial_hair No Facial Hair", "bodies Women"],
          },
          {
            path: "grafitstudio/faces/Anya0091.jpg",
            tags: ["expression Sad", "facial_hair No Facial Hair", "bodies Women"],
          },
          {
            path: "grafitstudio/faces/nastiya-49.jpg",
            tags: ["facial_hair No Facial Hair", "bodies Women"],
          },
        ],
      },
      {
        category: "poses",
        images: [
          {
            path: "grafitstudio/poses/maria 8 febriary0028.jpg",
            tags: ["bodies Women", "clothing Nude", "energy Action"],
          },
          {
            path: "grafitstudio/poses/Milky Liza1841.jpg",
            tags: ["bodies Women", "clothing Nude", "energy Stationary"],
          },
          {
            path: "grafitstudio/poses/nastiya-411.jpg",
            tags: ["bodies Women", "clothing Clothed", "energy Action"],
          },
          {
            path: "grafitstudio/poses/pose0003.jpg",
            tags: ["bodies Women", "clothing Clothed", "energy Action"],
          },
          {
            path: "grafitstudio/poses/pose0138.jpg",
            tags: ["bodies Women", "clothing Clothed", "energy Stationary"],
          },
          {
            path: "grafitstudio/poses/pose0276.jpg",
            tags: ["bodies Women", "clothing Clothed", "energy Action"],
          },
        ],
      },
    ],
  },
];
