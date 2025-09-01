// 代码生成时间: 2025-09-01 08:37:02
// Importing Gatsby's Link component for navigation if needed
// import { Link } from 'gatsby';

// Math Toolkit class definition
class MathToolkit {
  // Add two numbers
  static add(a, b) {
    return a + b;
  }

  // Subtract two numbers
  static subtract(a, b) {
    return a - b;
  }

  // Multiply two numbers
  static multiply(a, b) {
    return a * b;
  }

  // Divide two numbers
  static divide(a, b) {
    if (b === 0) {
      throw new Error('Cannot divide by zero');
    }
    return a / b;
  }

  // Check if a number is prime
  static isPrime(num) {
    if (num <= 1) return false;
    if (num <= 3) return true;

    if (num % 2 === 0 || num % 3 === 0) return false;

    for (let i = 5; i * i <= num; i += 6) {
      if (num % i === 0 || num % (i + 2) === 0) return false;
    }

    return true;
  }

  // Factorize a number
  static factorize(num) {
    if (num < 1) {
      throw new Error('Number must be greater than 0');
    }

    const factors = [];
    for (let i = 2; i <= num; i++) {
      while (num % i === 0) {
        factors.push(i);
        num /= i;
      }
    }

    return factors;
  }
}

// Export the MathToolkit class for use in other parts of the Gatsby project
export { MathToolkit };
