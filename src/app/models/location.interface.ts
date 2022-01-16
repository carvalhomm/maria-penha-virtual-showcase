export interface ILocation {
    [estado: string]: ICidade;
}

export interface ICidade {
    [cidade: string]: string[];
}