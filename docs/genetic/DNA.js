/*
Os genes do DNA tem a funcção de produzir proteínas

A mensagem genética contida no DNA 
é formada por um alfabeto de quatro letras 
que correspondem aos quatro nucleotídeos

humanos tem aprox 20k genes

gene (tamanho+sequencia) -> tamanho e forma -> funcao

GC pareia no DNA
AT pareia no DNA

O conteúdo GC é geralmente expresso como um valor percentual
Regiões ricas em GC podem conter muitos genes codificadores de proteínas. 
Sendo assim, o cálculo do conteúdo GC contribui para o mapeamento de 
regiões do genoma rica em genes
*/
const nucleotideos = ["T","G", "A","C"]; // AC TG
const nucleotideos_name = ['timina','cisina', 'adenina', 'guanina'];

/*
Com essas quatro letras é preciso formar aminoácidos (palavras) = 20
*/
const aminoacidos = {
    G: {name: "Blicina",      symbol: "Gly", letter: "G", title: "Ácido 2-aminoacético ou Ácido 2-amino-etanóico"},
    A: {name: "Alanina",      symbol: "Ala", letter: "A", title: "Ácido 2-aminopropiônico ou Ácido 2-amino-propanóico"},
    L: {name: "Leucina",      symbol: "Leu", letter: "L", title: "Ácido 2-aminoisocapróico ou Ácido 2-amino-4-metil-pentanóico"},
    V: {name: "Valina",       symbol: "Val", letter: "V", title: "Ácido 2-aminovalérico ou Ácido 2-amino-3-metil-butanóico"},
    I: {name: "Isoleucina",   symbol: "Ile", letter: "I", title: "Ácido 2-amino-3-metil-n-valérico ou ácido 2-amino-3-metil-pentanóico"},
    P: {name: "Prolina",      symbol: "Pro", letter: "P", title: "Ácido pirrolidino-2-carboxílíco"},
    F: {name: "Fenilalanina", symbol: "Phe", letter: "F", title: "Ácido 2-amino-3-fenil-propiônico ou Ácido 2-amino-3-fenil-propanóico"},
    S: {name: "Serina",       symbol: "Ser", letter: "S", title: "Ácido 2-amino-3-hidroxi-propiônico ou Ácido 2-amino-3-hidroxi-propanóico"},
    T: {name: "Treonina",     symbol: "Thr", letter: "T", title: "Ácido 2-amino-3-hidroxi-n-butírico"},
    C: {name: "Cisteina",     symbol: "Cys", letter: "C", title: "Ácido 2-bis-(2-amino-propiônico)-3-dissulfeto ou Ácido 3-tiol-2-amino-propanóico"},
    Y: {name: "Tirosina",     symbol: "Tyr", letter: "Y", title: "Ácido 2-amino-3-(p-hidroxifenil)propiônico ou paraidroxifenilalanina"},
    N: {name: "Asparagina",   symbol: "Asn", letter: "N", title: "Ácido 2-aminossuccionâmico"},
    Q: {name: "Glutamina",    symbol: "Gln", letter: "Q", title: "Ácido 2-aminoglutarâmico"},
    D: {name: "Aspartato",    symbol: "Asp", letter: "D", title: "Ácido 2-aminossuccínico ou Ácido 2-amino-butanodióico"},
    E: {name: "Glutamato",    symbol: "Glu", letter: "E", title: "Ácido 2-aminoglutárico"},
    R: {name: "Arginina",     symbol: "Arg", letter: "R", title: "Ácido 2-amino-4-guanidina-n-valérico"},
    K: {name: "Lisina",       symbol: "Lys", letter: "K", title: "Ácido 2,6-diaminocapróico ou Ácido 2, 6-diaminoexanóico"},
    H: {name: "Histidina",    symbol: "His", letter: "H", title: "Ácido 2-amino-3-imidazolpropiônico"},
    W: {name: "Triptofano",   symbol: "Trp", letter: "W", title: "Ácido 2-amino-3-indolpropiônico"},
    M: {name: "Metionina",    symbol: "Met", letter: "M", title: "Ácido 2-amino-3-metiltio-n-butírico"},
}

/*
Essas palavras formam as proteínas (frases)
*/

/*
cada três letras (uma trinca de bases) do DNA 
corresponderia um aminoácido (palavra)
*/

// Nonpolar, Polar,Basic, Acidic
const codons = {
    TTT: {biochemical: 'Nonpolar', type: 'Phenylalanine'},
    TTC: {biochemical: 'Nonpolar',type: 'Phenylalanine'},
    TTA: {biochemical: 'Nonpolar',type: 'Leucine'},
    TTG: {
        biochemical: 'Nonpolar',
        type: 'Leucine',
    },
    TCT: {
        biochemical: 'Nonpolar', // Nonpolar, Polar,Basic, Acidic
        type: 'Phenylalanine',
    },
    TCC: {
        biochemical: 'Nonpolar',
        type: 'Phenylalanine',
    },
    TCA: {
        biochemical: 'Nonpolar',
        type: 'Leucine',
    },
    TCG: {
        biochemical: 'Nonpolar',
        type: 'Leucine',
    },
    TTT: {
        biochemical: 'Nonpolar', // Nonpolar, Polar,Basic, Acidic
        type: 'Phenylalanine',
    },
    TTC: {
        biochemical: 'Nonpolar',
        type: 'Phenylalanine',
    },
    TTA: {
        biochemical: 'Nonpolar',
        type: 'Leucine',
    },
    TTG: {
        biochemical: 'Nonpolar',
        type: 'Leucine',
    },
    TTT: {
        biochemical: 'Nonpolar', // Nonpolar, Polar,Basic, Acidic
        type: 'Phenylalanine',
    },
    TTC: {
        biochemical: 'Nonpolar',
        type: 'Phenylalanine',
    },
    TTA: {
        biochemical: 'Nonpolar',
        type: 'Leucine',
    },
    TTG: {
        biochemical: 'Nonpolar',
        type: 'Leucine',
    },

    TAT: {
        biochemical: 'polar',
        type: 'Tyrosine',
        letter: 'Y',
    },
    TAA: {
        biochemical: '',
        stop: true,
    },
    TAG: {
        biochemical: '',
        stop: true,
    }
};

/*
humanos tem 23 pares de crimossomos = 46 total
*/