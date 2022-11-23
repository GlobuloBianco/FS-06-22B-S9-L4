let elenco: Vestiti[];

class Vestiti {
    id: number;
    codprod: number;
    collezione: string;
    capo: string;
    modello: number;
    quantita: number;
    colore: string;
    prezzoivaesclusa: number;
    prezzoivainclusa: number;
    disponibile: string;
    saldo: number;
    constructor(_id: number, _codprod: number, _collezione: string, _capo: string, _modello: number,_quantita: number, _colore: string,_prezzoivaesclusa: number,_prezzoivainclusa: number, _disponibile: string,_saldo: number) {
        this.id = _id;
        this.codprod = _codprod;
        this.collezione = _collezione;
        this.capo = _capo;
        this.modello = _modello;
        this.quantita = _quantita;
        this.colore = _colore;
        this.prezzoivaesclusa = _prezzoivaesclusa;
        this.prezzoivainclusa = _prezzoivainclusa;
        this.disponibile = _disponibile;
        this.saldo = _saldo;
    }

    getsaldocapo(): number {
        let calcolo = (this.prezzoivainclusa * (this.saldo / 100));
        return Math.round(calcolo * 100) / 100;
    }

    getacquistocapo(): number {
        return Math.round((this.prezzoivainclusa - this.getsaldocapo())*100)/100;
    }

    gettotal(): number {
        return this.getacquistocapo() * this.quantita;
    }
}

function fetchDati() {
    fetch("http://localhost:3000/items").then((response) => {
        return response.json();
    }).then((data) => {
        elenco = data;

        elenco.forEach(function(element,i) {
            //console.log(elenco[i].collezione);
            let vestito = new Vestiti(
                element.id,
                element.codprod,
                element.collezione,
                element.capo,
                element.modello,
                element.quantita,
                element.colore,
                element.prezzoivaesclusa,
                element.prezzoivainclusa,
                element.disponibile,
                element.saldo
            );
            console.log(vestito);
            console.log(`Ogni vestito scontato costa ${vestito.getsaldocapo()}$`);
            console.log(`In totale hai comprato ${vestito.quantita} pezzi, un totale di ${vestito.gettotal()}$`);
        })
    });
}

fetchDati();

