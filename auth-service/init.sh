# Создание необходимых таблиц в auth-service
node -e "
let db = require('./auth-service/src/library/db/index.js');
(async()=>{
    await db.dropTable({table: 'users'});
    await db.createTableUsers();
    process.exit();
})()
"