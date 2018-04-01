function shuffle(array: any[]) {
  let i = 0;
  let j = 0;
  let temp = null;

  for (i = array.length - 1; i > 0; i -= 1) {
    j = Math.floor(Math.random() * (i + 1));
    temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

function randomizeMines(
  rows: number,
  cols: number,
  mines: number
): { x: number; y: number; }[] {
  const mat = new Array(rows * cols).fill(true, 0, mines);
  shuffle(mat);
  const result: Array<{ x: number, y: number}>  = [];
  for (let i = 0; i < mat.length; i++) {
    if (mat[i]) {
      console.log('(%d, %d)', i / cols, i % cols);
      result.push({ x: Math.floor(i / cols), y: i % cols });
    }
  }
  return result;
}

export { randomizeMines };
