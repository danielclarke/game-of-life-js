export default class Point {
    constructor(x, y, data) {
        this.x = x;
        this.y = y;
        if (data) {
            this.data = data;
        }
    }
}