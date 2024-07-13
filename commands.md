### Start Docker

```bash
docker compose up
```

### Create Migration

```bash
npm run migration:create -- src/database/migrations/CreateCategoryAndProduct
```

### Run Seed

```bash
npm run seed
```

### Connect Docker Postgres

```bash
docker exec -it <CONTAINER ID> bash
```

#### Login as user: postgres

```bash
psql -U postgres
```

#### Connect to table: easytravel

```bash
\c easytravel
```

```bash
SELECT * FROM category;
```
