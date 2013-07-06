# --- !Ups

CREATE TABLE graphs(
  id BIGINT(20) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  user_id BIGINT(20) NOT NULL,
  name VARCHAR(40) NOT NULL,
  render VARCHAR(15),
  description VARCHAR(1000),
  deleted int DEFAULT 0
);

CREATE TABLE event(
  id BIGINT(20) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(1000) NOT NULL,
  url VARCHAR(250) NOT NULL,
  author VARCHAR(250) NOT NULL,
  author_id BIGINT(20),
  content VARCHAR(4000) NOT NULL,
  timestamp BIGINT(20),
  duration INT(14) DEFAULT 0,
  thread INT(14) DEFAULT 0,
  parent INT(14) DEFAULT 0,
  relevance INT(14) DEFAULT 0,
  deleted int DEFAULT 0
);

CREATE INDEX graphs_id ON graphs(id);
-- CREATE INDEX event_id ON event(id);

# --- !Downs

-- DROP TABLE meta_event;
DROP TABLE graphs;
