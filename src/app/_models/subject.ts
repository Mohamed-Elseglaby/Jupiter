export class subject {
  total: number = 0;
  constructor(
    public id: number,
    public name: string,
    public year: string,
    public subject: string,
    public term1: number,
    public term2: number,
    public grade: string
  ) {
    this.total = term1 + term2;
    if (this.total / 30 >= 0.9) {
      this.grade = 'A';
    } else if (this.total / 30 >= 0.75) {
      this.grade = 'B';
    } else if (this.total / 30 >= 0.65) {
      this.grade = 'C';
    } else if (this.total / 30 >= 0.5) {
      this.grade = 'D';
    } else {
      this.grade = 'F';
    }
  }
}
