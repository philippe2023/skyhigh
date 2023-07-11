# install sqlite
Follow the instructions for your operating system on https://www.prisma.io/dataguide/sqlite/setting-up-a-local-sqlite-database.

All commands assume they are run from this project directory.

On windows all commands start with `sqlite3.exe` instead of `sqlite3`.

# create database
```bash
sqlite3 skyhigh_dev.sqlite < create_and_seed_tables.sql
```

# export data to json
```bash
sqlite3 skyhigh_dev.sqlite '.mode json' '.once user_seed.json' 'select * from user'
```

# import data from json
Open the database with the sqlite CLI:
```bash
sqlite3 skyhigh_dev.db
```
A prompt like this should open:
```bash
SQLite version 3.42.0 2023-05-16 12:36:15
Enter ".help" for usage hints.
sqlite> 
```
Insert the following SQL and press Enter. To exit type `.quit`:
```sql
INSERT INTO user SELECT
  json_extract(value, '$.id'),
  json_extract(value, '$.first_name'),
  json_extract(value, '$.last_name'),
  json_extract(value, '$.password'),
  json_extract(value, '$.email')
FROM json_each(readfile('user_seed.json'));
```