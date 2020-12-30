
export class Admission {
  constructor(
    public insuranceNum: number,
    public nurseId: string,
    public bedNum?: number,
    public comment?: string) {
  }
}
