-- Up Migration
ALTER TABLE categories ADD COLUMN position integer default 90;

-- Down Migration
ALTER TABLE categories DROP COLUMN position;
