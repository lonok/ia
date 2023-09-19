const rangeMap = (input, input_start, input_end, output_start, output_end) => {
    const input_range = input_end - input_start;
    const output_range = output_end - output_start;

    return (input - input_start)*output_range / input_range + output_start;
};

export {
    rangeMap
}