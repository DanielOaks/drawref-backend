-- Up Migration
CREATE TABLE categories (
  id text primary key,
  display_name text,
  cover_image integer,
  tags jsonb
);

CREATE TABLE images (
  id integer primary key,
  path text,
  external_url text,
  author text
);

CREATE TABLE image_tags (
  category_id text,
  image_id integer,
  tags jsonb,
  primary key (category_id, image_id)
);

-- Down Migration
DROP TABLE categories;
DROP TABLE images;
DROP TABLE image_tags;
