# Создание необходимых таблиц в auth-service
node -e "
let db = require('./auth-service/src/library/db/index.js');
(async()=>{
    try {
        await db.dropTable({table: 'users'});
    } catch (e) {
        console.log(e.message)
    }
    try {
        await db.createTableUsers();
    } catch (e) {
        console.log(e.message)
    }
    process.exit();
})()
"