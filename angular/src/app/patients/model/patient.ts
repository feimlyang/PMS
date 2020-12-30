export class Patient {
  constructor(
    public insuranceNum: number,
    public firstName: string,
    public lastName?: string,
    public address?: string,
    public phone?: number,
    public birthDate?: string,
    public gender?: string,
    public marital?: string,
    public externalDocId?: number,
    public nokfirstName?: string,
    public noklastName?: string,
    public nokrelationship?: string,
    public nokaddress?: string,
    public nokphone?: number){}

}

