import postgres from "postgres";

import { Category, TagEntry } from "../types/drawref.js";
import urlJoin from "url-join";
import { hostBaseURL } from "../config/env.js";

let db: Database;

class Database {
  private sql: postgres.Sql;

  constructor(url: string, options?: postgres.Options<{}>) {
    this.sql = postgres(url, options);
  }

  // Categories
  //

  async addCategory(id: string, name: string, cover: number, tags: Array<TagEntry>): Promise<string | undefined> {
    var newId: string = "";
    try {
      const row = await this.sql`
        insert into categories
          (id, display_name, cover_image, tags)
        values
          (${id}, ${name}, ${cover}, ${JSON.stringify(tags)})
        returning id
      `;
      newId = row[0]?.id;
    } catch (error) {
      // error
      console.error(error);
      return;
    }
    return newId;
  }

  async getCategories() {
    var categories: Category[] = [];

    const rows = await this.sql`
      select *
      from categories
    `;
    for (const row of rows) {
      var cat: Category = {
        id: row.id,
        name: row.display_name,
        tags: JSON.parse(row.tags || "[]"),
        cover: "",
      };
      if (row.cover_image != -1) {
        // load image data and apply to cat
        const ciRows = await this.sql`
          select path, external_url
          from images
          where id = ${row.cover_image}
        `;
        if (ciRows[0].path) {
          cat.cover = urlJoin(hostBaseURL, ciRows[0].path);
        } else if (ciRows[0].external_url) {
          cat.cover = ciRows[0].external_url;
        }
      }

      categories.push(cat);
    }

    return categories;
  }

  // Images
  //

  async addImage(path: string, external_url: string, author: string): Promise<number | undefined> {
    var newId: number;
    try {
      const row = await this.sql`
        insert into images
          (path, external_url, author)
        values
          (${path}, ${external_url}, ${author})
        returning id
      `;
      newId = row[0]?.id;
    } catch (error) {
      // error
      console.error(error);
      return;
    }
    return newId;
  }
}

export function initialiseDatabase(url: string, options?: postgres.Options<{}>) {
  if (db) {
    console.error("Database cannot be re-initialised:", url);
    return;
  }

  db = new Database(url, options);
}

export function useDatabase(): Database {
  if (!db) {
    console.error("Database is not initialised.");
  }

  return db;
}
