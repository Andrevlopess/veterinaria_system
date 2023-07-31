export interface ICostumer {
  id: string;
  name: string;
  surname: string;
  phone: string;
  email: string;
  cpf: string;
  address: string;
  state: string;
  cep: number;
  createdAt: Date;
}


export interface IError {
    status: string,
    target: string,
    message: string
}