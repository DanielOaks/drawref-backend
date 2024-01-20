import postgres from "postgres";

let db: Database;

export type Category = {
  id: string;
  name: string;
  cover?: string;
  tags?: TagEntry[];
};

export type TagEntry = {
  id: string;
  name: string;
  values: string[];
};

class Database {
  private sql: postgres.Sql;

  constructor(url: string, options?: postgres.Options<{}>) {
    this.sql = postgres(url, options);
  }

  async addCategory(id: string, name: string, cover: number, tags: Array<TagEntry>): Promise<string | undefined> {
    var newId: string = "";
    try {
      const row = await this.sql`
        insert into categories
          (id, display_name, cover_image, tags)
        values
          (${id}, ${name}, ${cover || -1}, ${JSON.stringify(tags)})
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
    rows.forEach((row) => {
      var cat = {
        id: row.id,
        name: row.display_name,
        tags: JSON.parse(row.tags || "[]"),
      };
      if (row.cover_image != -1) {
        // load image data and apply to cat
      }

      categories.push(cat);
    });

    return categories;
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
