export default function uniq(array, param){
  return array.filter((item, pos, arr) => {
    return arr.map(mapItem => {
      return mapItem[param];
    }).indexOf(item[param]) === pos;
  });
}
