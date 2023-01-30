TRUNCATE TABLE locations,users RESTART IDENTITY CASCADE;

INSERT INTO locations (location_name,address,open_time,close_time,rating,thumbnail_url) VALUES 
    (   'George Stepanof Ocean Beach Volleyball Courts',
        '2100 SPRAY STREET SAN DIEGO, CA 92107',
        '10:00:00',
        '18:30:00',
         5,
        'https://tinyurl.com/5n98yzsh'
    ),
    (
        'South Mission Beach Volleyball Courts',
        '2597 N JETTY RD SAN DIEGO, CA 92109',
        '10:00:00',
        '18:30:00',
        5,
        'https://tinyurl.com/5cpkwh92'    ),
    (
        'Cohassett Volleyball Court',
        '2918 OCEAN FRONT WALK SAN DIEGO, CA 92109 ',
        '10:00:00',
        '18:30:00',
        4.5,
        'https://tinyurl.com/2p9c9z3j'
    ),
    (
        'Coronado Central Beach Volleyball Courts',
        '920 OCEAN BLVD, CORONADO, CA 92118',
        '8:00:00',
        '18:30:00',
        4,
        'https://tinyurl.com/3rw98w6n'
    ),
    (
        'South Ponto Beach Volleyball Courts',
        'LA COSTA AVE HWY 101 CARLSBAD, CA 92008',
        '11:00:00',
        '18:30:00',
        4.8,
        'https://tinyurl.com/2k3m22bj'
    ); 
INSERT INTO users (first_name, last_name, address, email, phone, avatar_url)VALUES ( 
        'Matt',
        'Moore',
        NULL,
        'matt@mattcmoore.com',
        '8185559626',
        NULL
    );

--inserts numerically named courts
DO $FN$
BEGIN
    FOR counter IN 1..10 LOOP
        EXECUTE $$ INSERT INTO courts(location_id,court_name,is_open,is_mens) VALUES (1,'court ' || $1,true,true) $$
            USING counter;
        END LOOP;
    FOR counter IN 11..16 LOOP
        EXECUTE $$ INSERT INTO courts(location_id,court_name,is_open,is_mens) VALUES (1,'court ' || $1,true,false) $$
            USING counter;
        END LOOP;
    FOR counter IN 1..9 LOOP
        EXECUTE $$ INSERT INTO courts(location_id,court_name,is_open,is_mens) VALUES (2,'court ' || $1,true,true) $$
            USING counter;
        END LOOP;
    FOR counter IN 10..18 LOOP
        EXECUTE $$ INSERT INTO courts(location_id,court_name,is_open,is_mens) VALUES (2,'court ' || $1,true,false) $$
            USING counter;
        END LOOP;
    FOR counter IN 1..4 LOOP
        EXECUTE $$ INSERT INTO courts(location_id,court_name,is_open,is_mens) VALUES (4,'court ' || $1,true,true) $$
            USING counter;
        END LOOP;
    FOR counter IN 5..8 LOOP
        EXECUTE $$ INSERT INTO courts(location_id,court_name,is_open,is_mens) VALUES (4,'court ' || $1,true,false) $$
            USING counter;
        END LOOP;
      FOR counter IN 1..4 LOOP
        EXECUTE $$ INSERT INTO courts(location_id,court_name,is_open,is_mens) VALUES (5,'court ' || $1,true,true) $$
            USING counter;
        END LOOP;
    FOR counter IN 5..8 LOOP
        EXECUTE $$ INSERT INTO courts(location_id,court_name,is_open,is_mens) VALUES (5,'court ' || $1,true,false) $$
            USING counter;
        END LOOP;
END;
$FN$;

INSERT INTO courts(location_id,court_name,is_open,is_mens) VALUES (3,'Cohasset Court',true,true);


-- default avatar https://cdn-icons-png.flaticon.com/512/5496/5496293.png