const genetic = require('./genetic.js');

const integerGenerateMinMax = (min,max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//const colorGenerate = () => parseInt(Math.floor(Math.random() * 255) + 1);
const colorGenerate = () => integerGenerateMinMax(0,255);

const genomeGenerate = () => [colorGenerate(), colorGenerate(), colorGenerate()];

const brightOfColor = (r,g,b) => parseInt(0.299*r + 0.587*g + 0.114*b);

const rangeMap = (input, input_start, input_end, output_start, output_end) => {
    const input_range = input_end - input_start;
    const output_range = output_end - output_start;

    return (input - input_start)*output_range / input_range + output_start;
};

const darkPercent = (r, g, b) => {
    const bright = brightOfColor(r, g, b);
    return rangeMap(bright, 0, 255, 1, 0);
};

const fitness = (player) => {
    return darkPercent(player.genome[0], player.genome[1], player.genome[2]);
};

const populationGenerate = (player_generator, size) => {
    const population = [];

    for (let i = 0; i < size; i++) {
        population.push(player_generator());
    }

    return population;
};

const populationSortByFitness = (population) => {
    return population.sort((a,b) => b.fitness >= a.fitness);
};

const generatePlayer = () => {
    return {
        genome: genomeGenerate()
    }
};

//const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);

const genomeCrossover = (genome_a, genome_b) => {
    //console.log('A', genome_a);
    //console.log('B', genome_b);

    const genoma_size = genome_a.length

    const cut_point = integerGenerateMinMax(1, genoma_size-1);
    //console.log('cut', cut_point);

    const genome_a_part1 = genome_a.slice(0, cut_point);
    const genome_a_pate2 = genome_a.slice(cut_point, genoma_size);

    //console.log(genome_a_part1 + ' | ' + genome_a_pate2);

    const genome_b_part1 = genome_b.slice(0, cut_point);
    const genome_b_pate2 = genome_b.slice(cut_point, genoma_size);

    //console.log(genome_b_part1 + ' | ' + genome_b_pate2);

    const genome_new = [
        [...genome_a_part1,...genome_b_pate2],
        [...genome_b_part1,...genome_a_pate2],
    ];

    return genome_new;
};

// mutation brings variety 
const genomeMutate = (genome, mutation_rate) => {
    
    const random_percent = Math.random();
    
    if (random_percent < mutation_rate) {
        // mutates
        const gene_to_change = integerGenerateMinMax(0, genome.length-1);
        genome[gene_to_change] = colorGenerate();
    }
    // does not mutate
    return genome;
}

//const player_crossover = crossover(population[0], population[1]);
//console.log(player_crossover);

//const player_mutation = mutation(population[0]);
//console.log(player_mutation);
/*
console.clear();
let player = generatePlayer();

player.fitness = fitness(player);
console.log('before', player);

genome = genomeMutate(player.genome, 0.5);
console.log('after mutate', genome);
return;
*/

const populationFitnessAdd = (population) => {
    population.map(player => {
        player.fitness = fitness(player);
    });
    
    return populationSortByFitness(population);
};

const roulette = (population) => {
    // calculate the sum of a finesses
    const population_fitness_total = population.reduce((acc,player) => acc + player.fitness,0);

    /*
    population.map(player => {
        player.probability = player.fitness / population_fitness_total;
    });
    */

    // generate a random number between 0 and sum of finesses.
    const random_point = integerGenerateMinMax(0,population_fitness_total);

    let partial = 0;
    for (var i = 0; i < population.length; i++) {
        const player = population[i];
        partial += player.fitness;

        if (partial >= random_point) {
            return player;
        }
    }

};

const populationGenerateNext = (population) => {
    
}

const settings = {
    population_size: 10, // tamanho da população
    crossover_rate: 0.05, // taxa de reprodução
    mutation_rate: 0.33, // taxa de mutação
    stop_generations_max: 9999,
    stop_fitness_meta: 0.999,
    stop_time_max: 0 // minutes
};

console.clear();
const train = (settings) => {
    let generation = 1;

    console.log('Generate first population...');
    let population = populationGenerate(generatePlayer, settings.population_size);
    //console.log(population);

    population = populationFitnessAdd(population);
    population = populationSortByFitness(population);

    const n_pairs = Math.ceil((population.length * settings.crossover_rate) / 2);

    while(generation < settings.stop_generations_max) {
        console.clear();

        generation += 1;
        console.log('🕰️ - Generate next geration: ' + generation);
        console.log(population);

        // reproduction (crossover)
        for (let p = 0; p < n_pairs; p++) {
            // par selection
            const player_a = roulette(population);
            const player_b = roulette(population);
            //console.log(player_a.genome, player_b.genome);
            
            // crossover
            const childs = genomeCrossover(player_a.genome, player_b.genome);
            
            // mutate
            const child1 = genomeMutate(childs[0], settings.mutation_rate);
            const child2 = genomeMutate(childs[1], settings.mutation_rate);
            
            population.push({
                genome: child1,
            });
            population.push({
                genome: child2,
            });
            
            population = populationFitnessAdd(population);
            population = populationSortByFitness(population);

            // population adjust
            population = population.slice(0, settings.population_size);
        }

        if (population[0].fitness >= settings.stop_fitness_meta) {
            console.log('--------------');
            console.log("👍 - Solution Found");
            console.log(population);
            break;
        }

        if (generation >= settings.stop_generations_max) {
            console.log('max gererations reached');
            console.log(population);
            break;
        }
    }
}

train(settings);