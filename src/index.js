module.exports = function solveSudoku(matrix) {
  let number = 1,
    add_matrix = matrix.slice(),
    col_stack = [],
    row_stack = [],
    wrong_number = [],
    prov_mass = [];

  const checkRow = (row, col, number) => {
    for (let b = 0; b < 9; b++) {
      if (add_matrix[row][b] == number && b != col) {
        return false;
      }
    }
    return true;
  }

  const checkCol = (row, col, number) => {
    for (let c = 0; c < 9; c++) {
      if (number == add_matrix[c][col] && c != row) {
        return false;
      }
    }
    return true;
  }

  const checkBox = (row, col, number) => {
    let box_col = Math.floor(row / 3);
    let box_row = Math.floor(col / 3);
    for (let col_sq = (box_col * 3); col_sq < (box_col * 3) + 3; col_sq++) {
      for (let row_sq = (box_row * 3); row_sq < (box_row * 3) + 3; row_sq++) {
        if (number == add_matrix[col_sq][row_sq] && number != add_matrix[row][col]) {
          return false;
        }
      }
    }
    return true;
  }

  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (add_matrix[row][col] == 0) {

        for (number = 1; number <= 10; number++) {

          if (checkRow(row, col, number) && checkCol(row, col, number) && checkBox(row, col, number) && number < 10) {
            add_matrix[row][col] = number;
            col_stack.push(col);
            row_stack.push(row);
            prov_mass.push(number);
            break;

          } else if (number > 8) {
            add_matrix[row][col] = 0;

            row = row_stack.pop();
            col = col_stack.pop();

            number = prov_mass.pop();

          } else {
            wrong_number.push(number);
          }
        }
      }
    }
  }

  return add_matrix;
}