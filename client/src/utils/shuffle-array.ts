const shuffleArray = (array: any[]) => {
  let i = array.length;
  let j: number;
  let temp: any;
  while (--i > 0) {
    j = Math.floor(Math.random() * (i + 1));
    temp = array[j];
    array[j] = array[i];
    array[i] = temp;
  }
  return array;
};

export default shuffleArray;
