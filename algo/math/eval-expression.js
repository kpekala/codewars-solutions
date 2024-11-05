function getTokens(expression) {
  tokens = [];
  let i = 0;
  let num = '';
  while (true) {
    if (expression[i] === '-' && num.length > 0) {
      tokens.push(parseFloat(num));
      num = '';
    } 
    if (i >= expression.length) {
      if (num.length > 0) {
        tokens.push(parseFloat(num));
      }
      return tokens;
    }
    if (isPartOfNumber(expression, i, tokens)) {
      num += expression[i];
    } 
    else if (['(', ')', 'i', '+', '/', '*', '-', ' '].includes(expression[i])) {
      if (num.length > 0) {
        tokens.push(parseFloat(num));
        num = '';
      }
      if (expression[i] !== ' '){
        tokens.push(expression[i]);
      }
    }
    i++;
  }
}

function extractParenthesisTokens(tokens, i) {
  const newTokens = [];
  let pNumb = 0;
  while (true) {
    if(pNumb !== 0 && !(tokens[i] === ')' && pNumb === 1))
      newTokens.push(tokens[i])
    if (tokens[i] === ')') {
      if (pNumb === 1) return newTokens;
      pNumb--;
    } 
    else if (tokens[i] === '(') {
      pNumb++;
    }
    i++;
  }
}

function calculateRightMultiplications(tokens, i, j) {
  let rightResult = tokens[i];
  while (j < tokens.length && (['*', '/'].includes(tokens[j]))) {
    j++;
    if (typeof tokens[j] === 'number') {
      if (tokens[j - 1] === '/') rightResult /= tokens[j];
      else if (tokens[j - 1] === '*') rightResult *= tokens[j];
    } 
    else if (tokens[j] === '(' || (tokens[j] === '-' && tokens[j+1] === '(')) {
      let minus = tokens[j] === '-';
      const pTokens = extractParenthesisTokens(tokens, j);
      if (tokens[j - 1] === '/') rightResult /= minus ? -calcTokens(pTokens): calcTokens(pTokens);
      else if (tokens[j - 1] === '*') rightResult *= minus ? -calcTokens(pTokens): calcTokens(pTokens);
      j += pTokens.length + 1;
      if(minus) j++;
    }
    j++;
  }
  return [rightResult, j];
}

function applySign(a, b, sign) {
  switch (sign) {
    case '+' : return a + b;
    case '-' : return a - b;
    case '*' : return a * b;
    case '/' : return a / b;
  }
}

function calcTokens(tokens) {
  let result = 0;
  let lastSign = '+';
  let i = 0;
  while (i < tokens.length) {
    if (typeof tokens[i] === 'number') {
      let [rightResult, j] = calculateRightMultiplications(tokens, i, i + 1);
      result = applySign(result, rightResult, lastSign);
      if (j >= i + 2) {
        i = j - 1;
      }
    } else if( ['*', '/', '+', '-'].includes(tokens[i])){
      if (tokens[i - 1] === '-') {
        lastSign = '+';
      }else {
        lastSign = tokens[i];
      }
    } else if (tokens[i] === '('){
      // parenthesis
      const pTokens = extractParenthesisTokens(tokens, i);
      i += pTokens.length + 1;
      tokens[i] = calcTokens(pTokens);
      let [rightResult, j] = calculateRightMultiplications(tokens, i, i + 1);
      result = applySign(result, rightResult, lastSign);
      if (j >= i + 2) {
        i = j - 1;
      }
    }
    i++;
  }
  return result;
}


exports.calc = function (expression) {
 return calcTokens(getTokens(expression));
};

function isPartOfNumber(expression, i, tokens) {
  return (
    expression[i] >= '0' && expression[i] <= '9' ||
    expression[i] === '.' ||
    (expression[i] === '-' && parseInt(expression[i + 1]) !== NaN && 
      (['*', '/', '-', '+', '('].includes(tokens[tokens.length - 1]) || i - 1 === -1) &&
      expression[i+1] !== '(')
  );
}

exports.getTokens = getTokens;
