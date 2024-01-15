-- Up Migration
CREATE TABLE categories (
  id text,
  display_name text,
  cover_image integer,
  tags jsonb
);

CREATE TABLE images (
  id integer,
  path text,
  external_url text,
  author text
);

CREATE TABLE category_tags (
  category_id text,
  image_id integer,
  tags jsonb
);

-- Down Migration
DROP TABLE categories;
DROP TABLE images;
DROP TABLE category_tags;
