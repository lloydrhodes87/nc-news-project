const formatDate = date => {
  const array = date.slice(0, 10).split('-');
  return `${array[2]}/${array[1]}/${array[0]}`;
};

export default formatDate;
