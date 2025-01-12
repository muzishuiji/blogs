// 判断五子棋的胜负
// 胜利的原则：水平/垂直/斜线/反斜线形成五子
// 低效的方案：每次去遍历整个棋盘，找到连成五子的方案；
// 高效的方案：每次去检测落子位置是否形成五子；
enum Color {
    BLACK = 1,
    WHITE = 2
}
enum Direction {
    HORIZONTAL = 1,
    VERTICAL = 2,
    SLASH = 3,
    BACK_SLASH = 4
}
type Step = (point: number[]) => [number, number]
// 
function isValid(board: number[][], point: number[], color: Color) {
    const [x, y] = point;
    let row = board.length;
    let col = board[0].length;
    if(x >= 0 && x < row && y >= 0 && y < col && board[x][y] === color) {
        return true;
    }
    return false;
}
function moveSteps(board: number[][], point: number[], color: Color, steps: Step[]) {
    let count = 0;
    steps.map(step => {
        while(true) {
            point = step(point);
            if(isValid(board, point, color)) {
                count++;
            } else {
                break;
            }
        }
    });
    return count;
}
function createIsWin(moveForward: Step, moveBackward: Step) {
    return (board: number[][], point: number[], color: Color) => {
        let count = 0;
        count += moveSteps(board, point, color, [moveForward, moveBackward]);
        return count >= 5;
    }
}
// createIsWin类似于一个工厂函数，根据传入的参数创造出具有不同功能逻辑的函数
const isHorizontalWin = createIsWin(
    ([x, y]) => [x - 1, y],
    ([x, y]) => [x + 1, y]
);
const isVerticalWin = createIsWin(
    ([x, y]) => [x, y - 1],
    ([x, y]) => [x, y + 1]
);
const isSlashWin = createIsWin(
    ([x, y]) => [x + 1, y + 1],
    ([x, y]) => [x - 1, y - 1]
);
const isBackSlashWin = createIsWin(
    ([x, y]) => [x + 1, y - 1],
    ([x, y]) => [x - 1, y + 1]
);
function isWin(board: number[][], point: number[], color: Color) {
    return isHorizontalWin(board, point, color) ||
        isVerticalWin(board, point, color) ||
        isSlashWin(board, point, color) ||
        isBackSlashWin(board, point, color);
}
const board = [
    [1,1,1,1,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
]
const point = [0, 4];
const color = Color.BLACK;
console.log(isWin(board, point, color));