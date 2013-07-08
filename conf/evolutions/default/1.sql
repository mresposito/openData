# --- !Ups

CREATE TABLE graphs(
  id BIGINT(20) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  user_id BIGINT(20) NOT NULL,
  name VARCHAR(40) NOT NULL UNIQUE,
  render VARCHAR(15),
  description VARCHAR(1000),
  deleted int DEFAULT 0
);

CREATE TABLE series(
  id BIGINT(20) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  graph_id BIGINT(20) NOT NULL, 
  name VARCHAR(10),
  deleted int DEFAULT 0
);

CREATE TABLE data_points(
  id BIGINT(20) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  graph_id BIGINT(20) NOT NULL, 
  series_name VARCHAR(100),
  x VARCHAR(100) NOT NULL,
  y INT(25) NOT NULL,
  deleted int DEFAULT 0
);

CREATE INDEX data_point_id ON data_points(id);
CREATE INDEX series_id ON series(id);
CREATE INDEX graphs_id ON graphs(id);

# --- !Downs

DROP TABLE series;
DROP TABLE data_points;
DROP TABLE graphs;
