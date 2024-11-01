exports.calc = function (expression) {};

function isPartOfNumber(expression, i, tokens) {
  return (
    expression[i] >= '0' && expression[i] <= '9' ||
    expression[i] === '.' ||
    (expression[i] === '-' && parseInt(expression[i + 1]) !== NaN && tokens[tokens.length - 1] === '-')
  );
}

exports.getTokens = function (expression) {
  tokens = [];
  let i = 0;
  let num = '';
  while (true) {
    if (i >= expression.length) {
      if (num.length > 0) {
        tokens.push(parseFloat(num));
        return tokens;
      }
    }
    if (isPartOfNumber(expression, i, tokens)) {
      num += expression[i];
    } 
    else if (['(', ')', 'i', '+', '/', '*', '-', ' '].includes(expression[i])) {
      if (num.length > 0) {
        tokens.push(parseFloat(num));
        num = '';
      }
      if (expression[i] !== ' ')
        tokens.push(expression[i]);
    }
    i++;
  }
};
