import { rangeMap } from './helpers/number.js'

// helpers
const integerGenerateMinMax = (min,max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const colorGenerator = () => integerGenerateMinMax(0,255);

const brightOfColor = (r,g,b) => parseInt(0.299*r + 0.587*g + 0.114*b);

const darkPercentOfRGB = (r, g, b) => {
    const bright = brightOfColor(r, g, b);
    return rangeMap(bright, 0, 255, 1, 0);
};

// generic
const genomeGenerator = () => [colorGenerator(), colorGenerator(), colorGenerator()];

const fitnessFunction = (genome) => darkPercentOfRGB(genome[0], genome[1], genome[2]);

export {
    genomeGenerator,
    fitnessFunction
}