export interface IRestScenario {
    søker: IRestScenarioPerson;
    barna: IRestScenarioPerson[];
}

export interface IRestScenarioPerson {
    ident?: string; // Settes av mock-server
    statsborgerskap: string;
    fødselsdato: string;
}
