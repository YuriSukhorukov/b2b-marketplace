# Создание необходимых таблиц в auth-service
node -e "
let db = require('./auth-service/src/library/db/index.js');
(async()=>{
    await db.dropTable({table: 'offers'});
    await db.createTableOffers();
    await db.dropTable({table: 'proposals'});
    await db.createTableProposals();
    process.exit();
})()
"