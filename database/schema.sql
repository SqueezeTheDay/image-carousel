DROP DATABASE IF EXISTS lululemon;
CREATE DATABASE lululemon;
\c lululemon;

DROP TABLE image_urls;

CREATE TABLE image_urls (
    id SERIAL PRIMARY KEY,
    url_one text,
    url_two text,
    url_three text,
    url_four text,
    url_five text
);


\COPY image_urls(url_one,url_two,url_three,url_four,url_five) FROM '/home/ec2-user/imageURLS.csv' DELIMITER ',' CSV HEADER;
