const R = require("ramda");

function generateRandPoint() {
  return {
    x: rand(-1, 1),
    y: rand(-1, 1)
  };
}
var randomWeights = R.range(0, 5).map(function() {
  return generateRandPoint();
});

function guess(weights, point) {
  const sum = point.x * weights.x + point.y * weights.y;
  return sum >= 0 ? 1 : -1;
}
function rand(high, low) {
  return Math.random() * (high - low) + low;
}

function train(weights, point, team) {
  const guessResult = guess(weights, point); // 1
  const error = team - guessResult;
  const learningRate = 0.01; // 1%
  return {
    x: weights.x + point.x * error * learningRate,
    y: weights.y + point.y * error * learningRate
  };
}

//var testGuess = guess(generateRandPoint());
//train(randomPoints,);

testTrain = {
    const point = {x:200,y:400} // -1
    return train(randomWeights,point,team(point))
}

console.log(testTrain);
