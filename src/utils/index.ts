import { BookData } from "../data";

export function divideArray(array: BookData[]) {
  const chunkSize = Math.ceil(array.length / 8);
  const dividedArray = [];
  let index = 0;

  while (index < array.length) {
    dividedArray.push(array.slice(index, index + chunkSize));
    index += chunkSize;
  }

  return dividedArray;
}
