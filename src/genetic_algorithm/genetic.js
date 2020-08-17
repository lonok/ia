const integerGenerateMinMax = (min,max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const creatureCreate = (genome, fitness) => {
    return {
        genome: genome,
        fitness: fitness
    }
};

const populationSortByFitness = (population) => {
    return population.sort((a,b) => b.fitness - a.fitness);
}

const populationGenerator = (genomeGenerator, fitnessFunction, size) => {
    let _population = [];

    for (let i = 0; i < size; i++) {
        const genome = genomeGenerator();
        const fitness = fitnessFunction(genome);

        const creature = creatureCreate( genome, fitness );
        _population.push(creature);
    }
    return _population.sort((a,b) => b.fitness - a.fitness);
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
const genomeMutate = (genome, mutation_rate, genomeGenerator) => {
    const _genome = JSON.parse(JSON.stringify(genome));;
    const random_percent = Math.random();
    
    if (random_percent < mutation_rate) {
        // mutates
        const gene_to_change = integerGenerateMinMax(0, _genome.length-1);
        const new_genome = genomeGenerator();
        _genome[gene_to_change] = new_genome[gene_to_change];
    }
    return _genome;
}

const populationFitness = (population, fitnessFunction) => {
    const _population = JSON.parse(JSON.stringify(population));
    _population.map(creature => {
        creature.fitness = fitnessFunction(creature.genome);
    });
    //return _population.sort((a,b) => b.fitness >= a.fitness);
    return populationSortByFitness(_population);
};

const roulette = (population) => {
    // calculate the sum of a finesses
    const population_fitness_total = population.reduce((acc,creature) => acc + creature.fitness,0);
    console.log('population_fitness_total', population_fitness_total);
    /*
    population.map(player => {
        player.probability = player.fitness / population_fitness_total;
    });
    */

    // generate a random number between 0 and sum of finesses.
    const random_point = integerGenerateMinMax(0, population_fitness_total);
    console.log('random_point', random_point);

    let partial = 0;
    for (var i = 0; i < population.length; i++) {
        const creature = population[i];
        partial += creature.fitness;

        if (partial >= random_point) {
            return creature;
        }
    }

};

const populationNext = (population, crossover_rate, mutation_rate, genomeGenerator, fitnessFunction) => {
    let size = population.length;

    const _population = JSON.parse(JSON.stringify(population));

    const n_bests = Math.ceil((_population.length * crossover_rate));

    const bests = _population.slice(0, n_bests);
    const bottom = _population.slice(n_bests);

    /*
    console.log('bests');
    console.log(bests);
    console.log('bottom');
    console.log(bottom);
    */

    const childs = [];

    for(let c = 0; c < bests.length; c++) {        
        // crossover
        const childs = genomeCrossover(bests[c].genome, bottom[c].genome);

        // mutate
        const genome1 = genomeMutate(childs[0], mutation_rate, genomeGenerator);
        const genome2 = genomeMutate(childs[1], mutation_rate, genomeGenerator);

        const fitness1 = fitnessFunction(genome1);
        const fitness2 = fitnessFunction(genome2);

        const creature1 = creatureCreate( genome1, fitness1 );
        const creature2 = creatureCreate( genome2, fitness2 );

        _population.push(creature1);
        _population.push(creature2);
    }
    populationSortByFitness(_population);
    return _population.slice(_population, size);
}

export {
    populationGenerator,
    populationNext
};