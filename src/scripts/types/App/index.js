type CommonFields = {
  nombre: string;
  overview: string;
  imagen: string; 
  color: string;
}

export type Book = CommonFields & {
  airdate: string,
  youtube: string,
}

export type Film = CommonFields