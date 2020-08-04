# Создание необходимых таблиц в auth-service
node -e "
let db = require('./market-service/src/library/db/index.js');
(async()=>{
    try {
        await db.dropTable({table: 'offers'});
    } catch (e) {
        console.log(e.message);
    }
    try {
        await db.createTableOffers();
    } catch (e) {
        console.log(e.message);
    }
    try {
        await db.dropTable({table: 'proposals'});
    } catch (e) {
        console.log(e.message);
    }
    try {
        await db.createTableProposals();
    } catch (e) {
        console.log(e.message);
    }
    process.exit();
})()
"