DROP DATABASE IF EXISTS lululemon;
CREATE DATABASE lululemon;
\c lululemon;

CREATE TABLE image_urls (
    id integer NOT NULL,
    url_one text,
    url_two text,
    url_three text,
    url_four text,
    url_five text
);


COPY image_urls(id,url_one,url_two,url_three,url_four,url_five)
FROM '/Users/omar/Hack Reactor/Senior Portion/system design capstone/image-carousel/database/imageURLS.csv' DELIMITER ',' CSV HEADER;
