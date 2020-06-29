exports.createTable = () => {
  `CREATE TABLE user (
    id SERIAL NOT NULL,
    login VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
  );`
}
