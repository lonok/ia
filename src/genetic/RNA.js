/*
dna é copiado dentro do RNA
determina sequencia de aminoacidos e proteinas

GC pareia no RNA
AU pareia no RNA
*/
const bases = [];

const nucleotideos = ["C","G", "A","U"];
const nucleotideos_name = ['cisina', 'guanina', 'adenina', 'uracila'];

const codons = {
    AUG: {
        biochemical: 'Nonpolar',
        type: 'Methionine',
        letter: "M",
        start: true,
    },
    GUG: {
        biochemical: 'Nonpolar',
        type: 'Valine',
        letter: "V",
        start: true,
    },
    UUG: {
        biochemical: 'Nonpolar',
        type: 'Leucine',
        letter: "L",
        start: true,
    },
    UAG: {
        biochemical: 'Nonpolar',
        type: 'Leucine',
        letter: "L",
        stop: true,
    },
    UAA: {
        biochemical: 'Nonpolar',
        type: 'Leucine',
        letter: "L",
        stop: true,
    },
};