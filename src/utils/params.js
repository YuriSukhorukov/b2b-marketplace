exports.convertObjToQuery = (obj) => {
  let query = '';
  Object.keys(obj).forEach((item, i) => {
    query += `${item}=${obj[item]}&`;
  });
  query = query.substring(0, query.length - 1);
  return query;
}
