-- Up Migration
CREATE TABLE categories (
  id text primary key,
  display_name text,
  cover_image integer default -1,
  tags jsonb
);

CREATE TABLE images (
  id serial primary key,
  path text,
  external_url text,
  author text
);

CREATE TABLE image_tags (
  category_id text references categories(id),
  image_id integer references images(id),
  tags text[] not null default '{}',
  primary key (category_id, image_id)
);

-- Down Migration
DROP TABLE image_tags;
DROP TABLE images;
DROP TABLE categories;
