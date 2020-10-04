# Создание необходимых таблиц в auth-service
node -e "
let db = require('./company-service/src/database/index.js');
(async()=>{
    try {
        await db.dropTable({table: 'profiles'});
    } catch (e) {
        console.log(e.message);
    }
    try {
        await db.createTableProfiles();
    } catch (e) {
        console.log(e.message);
    }
    process.exit();
})()
"