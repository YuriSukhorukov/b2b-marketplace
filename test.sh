# Подготовка auth-service
bash ./auth-service/init.sh
# Подготовка offer-service
bash ./market-service/init.sh


# Запуск тестов API 
cd end-to-end
npm run test src/test/auth
npm run test src/test/market
cd ..