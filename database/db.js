import pg from "pg";

const client = new pg.Client({
  host: "localhost",
  port: 5432,
  database: "ecommerce",
  user: "anantkamat",
  password: "",
});

async function connect() {
  await client.connect();
}
connect();

export default client;
