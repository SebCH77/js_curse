'use strict';

// ///////////////////////////////////////
// // Default Parameters
// const bookings = [];

// const createBooking = function (
//   flightNum,
//   numPassengers = 1,
//   price = 199 * numPassengers
// ) {
//   // ES5
//   // numPassengers = numPassengers || 1;
//   // price = price || 199;

//   const booking = {
//     flightNum,
//     numPassengers,
//     price,
//   };
//   console.log(booking);
//   bookings.push(booking);
// };

// createBooking('LH123');
// createBooking('LH123', 2, 800);
// createBooking('LH123', 2);
// createBooking('LH123', 5);

// createBooking('LH123', undefined, 1000);

///////////////////////////////////////
// How Passing Arguments Works: Values vs. Reference
// const flight = 'LH234';
// const jonas = {
//   name: 'Jonas Schmedtmann',
//   passport: 24739479284,
// };

// const checkIn = function (flightNum, passenger) {
//   console.log(jonas);
//   flightNum = 'LH999';
//   passenger.name = 'Mr. ' + passenger.name;

//   if (passenger.passport === 24739479284) {
//     alert('Checked in');
//   } else {
//     alert('Wrong passport!');
//   }
// };

// checkIn(flight, jonas);
// console.log(flight);
// console.log(jonas);

// Is the same as doing...
// const flightNum = flight;
// const passenger = jonas;

// const newPassport = function (person) {
//   person.passport = Math.trunc(Math.random() * 100000000000);
// };

// newPassport(jonas);
// console.log(jonas);
// checkIn(flight, jonas);

///////////////////////////////////////
// Las funciones son objectos / valores al fin y al cabo
// Higher-order functions: Son funciones que reciben otras funciones como parametros (callback functions), o funciones que retornan otra función, o ambas.

///////////////////////////////////////
// Functions Accepting Callback Functions: Nos permiten crear abstracción.

// const oneWord = function (str) {
//   return str.replace(/ /g, '').toLowerCase();
// };

// const upperFirstWord = function (str) {
//   const [first, ...others] = str.split(' ');
//   return [first.toUpperCase(), ...others].join(' ');
// };

// //Higher-order function
// const transformer = function (str, fn) {
//   console.log(`Original string; ${str}`);
//   console.log(`Transformed string; ${fn(str)}`);
//   console.log(`Transformed by; ${fn.name}`); //Ojo como se captura el name de la fn.
// };

// transformer('JavaScript is the best!', upperFirstWord);
// transformer('JavaScript is the best!', oneWord);

// const high5 = function () {
//   console.log('Hi!');
// };

// document.body.addEventListener('click', high5);
// ['Jonas', 'Martha', 'Adam'].forEach(high5);

///////////////////////////////////////
// Functions Returning Functions
// const greet = function (greeting) {
//   return function (name) {
//     console.log(`${greeting} ${name}`);
//   };
// };

// const greeterHey = greet('Hey');
// greeterHey('Jonas');
// greeterHey('Steven');

// greet('Hello')('Jonas');

// // Challenge
// const greetArr = greeting => name => console.log(`${greeting} ${name}`);

// greetArr('Hi')('Jonas');

///////////////////////////////////////
// The call and apply Methods
/* const lufthansa = {
  airline: 'Lufthansa',
  iataCode: 'LH',
  bookings: [],
  // book: function() {}
  book(flightNum, name) {
    console.log(
      `${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`
    );
    this.bookings.push({ flight: `${this.iataCode}${flightNum}`, name });
  },
};
 */
//El this apunta al objeto de lufthansa en sí mismo, porque ese es el objeto en el que se llama el método book:
// lufthansa.book(239, 'Jonas Schmedtmann');
// lufthansa.book(635, 'John Smith');

/* const eurowings = {
  airline: 'Eurowings',
  iataCode: 'EW',
  bookings: [],
};
 */
/* const book = lufthansa.book; */ //En una función regular, la clave (this) apunta a indefinido, al menos en modo estricto. Ahora mismo esto ya no es un método. Ahora es una función solamente. El valor de this dependera de como se llame realmente a la función.

// Does NOT work
/* book(23, 'Sarah Williams'); */ //Llamada de función normal.

//TRES METODOS PARA SOLUCIONAR ESTO: call, apply, bind.

// // Call method
// book.call(eurowings, 23, 'Sarah Williams'); //Primer argumento: A lo cual queremos que apunte this.
// console.log(eurowings);

// book.call(lufthansa, 239, 'Mary Cooper');
// console.log(lufthansa);

// const swiss = {
//   airline: 'Swiss Air Lines',
//   iataCode: 'LX',
//   bookings: [],
// };

// book.call(swiss, 583, 'Mary Cooper');
// console.log(swiss);

// // Apply method: YA NO SE USA!
// const flightData = [583, 'George Cooper'];
// book.apply(swiss, flightData);
// console.log(swiss);

// //LO QUE SE HACE AHORA ES LO SIGUIENTE:
// book.call(swiss, ...flightData);
// console.log(swiss);

///////////////////////////////////////
// The bind Method: A diferencia del call, no llama directamente a la función. En su lugar, devuelve una función, donde la palabra clave está vinculada.
// const lufthansa = {
//   airline: 'Lufthansa',
//   iataCode: 'LH',
//   bookings: [],
//   // book: function() {}
//   book(flightNum, name) {
//     console.log(
//       `${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`
//     );
//     this.bookings.push({ flight: `${this.iataCode}${flightNum}`, name });
//   },
// };

// const eurowings = {
//   airline: 'Eurowings',
//   iataCode: 'EW',
//   bookings: [],
// };

// const swiss = {
//   airline: 'Swiss Air Lines',
//   iataCode: 'LX',
//   bookings: [],
// };

// const book = lufthansa.book;

// book.call(eurowings, 23, 'Sarah Williams');

/* const bookEW = book.bind(eurowings);*/ //Aqui la función arrojada por bind se asigna a la constante creada.
// const bookLH = book.bind(lufthansa);
// const bookLX = book.bind(swiss);

/* bookEW(23, 'Sebastian Carrillo'); */ //Aqui ya tiene la palabra clave this apuntando a eurowings.
// console.log(eurowings);

// const bookEW23 = book.bind(eurowings, 23);
// bookEW23('Jonas Schmedtmann');
// bookEW23('Martha Cooper');

// With Event Listeners
/* lufthansa.planes = 300;  */ //Ojo a como agrega la propiedad al objeto!!!
// lufthansa.buyPlane = function () {
//   console.log('this =>>', this);

//   this.planes++;
//   console.log(this.planes);
// };

// document
//   .querySelector('.buy')
//   .addEventListener('click', lufthansa.buyPlane.bind(lufthansa));

// Partial application
// const addTax = (rate, value) => value + value * rate;
// console.log(addTax(0.1, 200));

/* const addVAT = addTax.bind(null, 0.23); */ //Aquí no nos importa a donde apunta el this.
// addVAT = value => value + value * 0.23;

// console.log(addVAT(100));
// console.log(addVAT(23));

//OTRA FORMA DE HACERLO: (CREO QUE ASI LO HARIA DESDE UN INICIO!)
// const addTaxRate = function (rate) {
//   return function (value) {const bookEW = book.bind(eurowings);
// console.log(addVAT2(100));
// console.log(addVAT2(23));

///////////////////////////////////////
// Coding Challenge #1

/* 
Let's build a simple poll app!

A poll has a question, an array of options from which people can choose, and an array with the number of replies for each option. This data is stored in the starter object below.

Here are your tasks:

1. Create a method called 'registerNewAnswer' on the 'poll' object. The method does 2 things:
  1.1. Display a prompt window for the user to input the number of the selected option. The prompt should look like this:
        What is your favourite programming language?
        0: JavaScript
        1: Python
        2: Rust
        3: C++
        (Write option number)
  
  1.2. Based on the input number, update the answers array. For example, if the option is 3, increase the value AT POSITION 3 of the array by 1. Make sure to check if the input is a number and if the number makes sense (e.g answer 52 wouldn't make sense, right?)
2. Call this method whenever the user clicks the "Answer poll" button.
3. Create a method 'displayResults' which displays the poll results. The method takes a string as an input (called 'type'), which can be either 'string' or 'array'. If type is 'array', simply display the results array as it is, using console.log(). This should be the default option. If type is 'string', display a string like "Poll results are 13, 2, 4, 1". 
4. Run the 'displayResults' method at the end of each 'registerNewAnswer' method call.

HINT: Use many of the tools you learned about in this and the last section 😉

BONUS: Use the 'displayResults' method to display the 2 arrays in the test data. Use both the 'array' and the 'string' option. Do NOT put the arrays in the poll object! So what shoud the this keyword look like in this situation?

BONUS TEST DATA 1: [5, 2, 3]
BONUS TEST DATA 2: [1, 5, 3, 9, 6, 1]

GOOD LUCK 😀
*/

/* const poll = {
  question: 'What is your favourite programming language?',
  options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],
  // This generates [0, 0, 0, 0]. More in the next section 😃
  answers: new Array(4).fill(0), //OJO COMO RELLENA EL ARRAY CON CEROS.
  registerNewAnswer() {
    // Get answer
    const answer = Number(
      prompt(
        `${this.question}\n${this.options.join('\n')}\n(Write option number)`
      )
    );
    console.log(answer);

    // Register answer
    typeof answer === 'number' &&
      answer < this.answers.length &&
      this.answers[answer]++;

    this.displayResults();
    this.displayResults('string');
  },

  displayResults(type = 'array') {
    if (type === 'array') {
      console.log(this.answers);
    } else if (type === 'string') {
      // Poll results are 13, 2, 4, 1
      console.log(`Poll results are ${this.answers.join(', ')}`);
    }
  },
};

document
  .querySelector('.poll')
  .addEventListener('click', poll.registerNewAnswer.bind(poll)); */

/* poll.displayResults.call({ answers: [5, 2, 3] }, 'string'); */ //OJO COMO DEFINE EL CONTEXTO COMO UN OBJETO DIRECTAMENTE.
// poll.displayResults.call({ answers: [1, 5, 3, 9, 6, 1] }, 'string');
// poll.displayResults.call({ answers: [1, 5, 3, 9, 6, 1] });

// [5, 2, 3]
// [1, 5, 3, 9, 6, 1]
