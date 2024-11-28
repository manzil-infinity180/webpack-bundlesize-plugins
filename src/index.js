'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};
const account5 = {
  owner: 'Rahul Vishwakarma',
  movements: [
    4530, 10000, -700, 500, 90, -6000, -700, 50000, -6000, 4000, 10000,
  ],
  interestRate: 1.7,
  pin: 2809,
};

const accounts = [account1, account2, account3, account4, account5];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

// const displayMovements = function (movements){

//   )}

// };

const displayMovements = function (movements,sort=false) {
  containerMovements.innerHTML = '';
  const movs = sort? movements.slice().sort((a,b)=>a-b) : movements;
  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const html = `<div class="movements__row">
<div class="movements__type movements__type--${type}">${i + 1} ${type}</div>

<div class="movements__value">${mov}€</div>
</div>`;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};
displayMovements(account1.movements);

const displayBalance = function (accs) {
  const balance = accs.movements.reduce((acc, curr) => acc + curr, 0);
  labelBalance.textContent = `${balance}€`;
};
displayBalance(account1);

const displaySummary = function (acc) {
  const inc = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, curr) => acc + curr, 0);
  labelSumIn.textContent = `${inc}€`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, curr) => acc + curr, 0);
  labelSumOut.textContent = `${Math.abs(out)}€`; // to remove -ve sign use Math.abs()

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(mov => (mov * acc.interestRate) / 100)
    .filter(mov => {
      return mov > 1;
    })
    .reduce((acc, mov) => acc + mov, 0);
  labelSumInterest.textContent = `${interest}€`;
};

displaySummary(account1);

const createUsername = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsername(accounts);
console.log(account1.username);

let createAccount; // is nothing but currentAccount
const updateUI = function (acc) {
  // Display Movement
  displayMovements(createAccount.movements);
  // Display Summary
  displaySummary(createAccount);
  //Display Balance
  displayBalance(createAccount);
};
btnLogin.addEventListener('click', function (e) {
  e.preventDefault();
  createAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(createAccount);

  if (createAccount?.pin === Number(inputLoginPin.value)) {
    labelWelcome.textContent = `Welcome back, ${
      createAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;
    inputLoginPin.value = inputLoginUsername.value = '';
    inputLoginPin.blur();

    updateUI(createAccount);
  }
});
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amt = Number(inputTransferAmount.value);
  const receiver = accounts.find(acc => acc.username === inputTransferTo.value);
  console.log(amt, receiver);
  if (amt > 0 && receiver?.username !== createAccount.username && receiver) {
    createAccount.movements.push(-amt);
    receiver.movements.push(amt);
    updateUI(createAccount);
  }
  inputTransferAmount.value = inputTransferTo.value='';
});
btnClose.addEventListener('click',function(e){
  e.preventDefault();
  if (
    inputCloseUsername.value === createAccount.username &&
    Number(inputClosePin.value)=== createAccount.pin
  ) {
    const index = accounts.findIndex(
      (acc)=> acc.username === createAccount.username
    );
    console.log(index);
    // Delete account 
    accounts.splice(index,1);
    // Hide Ui 
    containerApp.style.opacity=0;
  }
  inputClosePin.value = inputCloseUsername.value ='';
});

btnLoan.addEventListener('click',function(e){
  e.preventDefault();
  const amounts = Number(inputLoanAmount.value);
  if (amounts>0 && createAccount.movements.some((mov)=> mov >= (amounts)* (10/100))) {
    // Add movement to current accounts
    createAccount.movements.push(amounts);
    // Update Ui 
    updateUI(createAccount);
  }
  inputLoanAmount.value='';
});
let sorted= false;
btnSort.addEventListener('click',function(e){
  e.preventDefault();
  displayMovements(createAccount.movements,!sorted);
  sorted=!sorted;
  
})
/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES



const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

//SLICE - Does Not mutating the original array
let arr = ['a', 'b', 'c', 'd', 'e'];
console.log(arr.slice(1));
console.log(arr.slice(1, 3)); // ['b', 'c']
console.log(arr.slice(-1)); // ['e']

//SPLICE - Mutating the original array
console.log(arr.splice(1)); // ['b', 'c', 'd', 'e']
console.log(arr); // ['a']
const brr = [1, 2, 3, 4, 5, 6];
console.log(brr.splice(3, 5)); //  [4, 5, 6]
console.log(brr); // [1, 2, 3]

//REVERSE - Mutating the original array
arr = ['a', 'b', 'c', 'd', 'e'];
const arr2 = ['j', 'i', 'h', 'g', 'f'];
console.log(arr2.reverse()); // ['f', 'g', 'h', 'i', 'j']
console.log(arr2); // ['f', 'g', 'h', 'i', 'j']

//CONCAT -  Does Not mutating the original array
const letters = arr.concat(arr2);
console.log(letters); // ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']
console.log(...arr, ...arr2); // a b c d e f g h i j

//JOIN
console.log(letters.join(' - ')); // a - b - c - d - e - f - g - h - i - j

// AT Method
const arrs = [23, 11, 64];
console.log(arrs[0]); // 23
// We can do the same thing using AT method
console.log(arrs.at(0)); // 23

//Getting the last element of array
arr = ['a', 'b', 'c', 'd', 'e'];
console.log(arr[arr.length - 1]);
console.log(arr.slice(-1)); // Array (Point to be Remembered) // ['e']
console.log(arr.slice(-1)[0]); // e
console.log(arr.at(-1)); // e

// AT Method can also be used on STRING
console.log('rahul'.at(0)); // r
console.log('rahul'.at(-1)); // l

/////// --->  FOR EACH (Looping Array) <----
// (the continue and break statement is Not applicable for FOR EACH LOOP)

// By using 'For of' Loop
for (const mov of movements) {
  if (mov > 0) console.log(`Deposited ${mov}`);
  else console.log(`Withdrew ${mov}`);
}

// By Using 'FOR EACH' Loop
console.log('------FOR EACH --------');
movements.forEach(mov => {
  if (mov > 0) console.log(`Deposited ${mov}`);
  else console.log(`Withdrew ${mov}`);
});

// Getting key(Index) and Values (array element)
// error

// for (const mov of movements.entries()) {
//   if (mov.values >0) console.log(`Deposited ${mov.keys} : ${mov.values}`);
//   else console.log(`Withdrew ${mov}`);
// }

movements.forEach((mov, i, arr) => {
  if (mov > 0) console.log(`Movement ${i + 1}: Deposited ${mov}`);
  else console.log(`Movement ${i + 1}: Withdrew ${mov}`);
});

const eurToUS = 1.1;
const movementUSD = movements.map(function (mov) {
  return mov * eurToUS;
  // return 23;
});
console.log(movements);
console.log(movementUSD);
// (8) [220.00000000000003, 495.00000000000006, -440.00000000000006, 3300.0000000000005, -715.0000000000001, -143, 77, 1430.0000000000002]

// Filter Method (DATA Transformation )
const deposit = movements.filter(function (mov) {
  return mov > 0;
});
const withdraw = movements.filter(function (mov) {
  return mov < 0;
});
console.log(movements);
console.log(deposit);
console.log(withdraw);
// REDUCE method

let sum = movements.reduce((acc, curr) => {
  return acc + curr;
}, 0);
console.log(sum); // 3840

sum = movements.reduce((acc, curr) => acc + curr, 0);
console.log(sum); //3840

// Magic Chaining
const euro = 1.1;
const euroToUSD = movements
  .filter(mov => mov > 0)
  .map(mov => mov * euro)
  .reduce((acc, curr) => acc + curr, 0);
console.log(euroToUSD); // 5522.000000000001

// FIND Method
const firstWithdrawal = movements.find(mov => mov < 0);
console.log(movements);
console.log(firstWithdrawal);
// it will return the first -ve value from the movement array as mov is less than zero

console.log(accounts);
const findOwner = accounts.find(acc => acc.owner === 'Jessica Davis');
const findUsername = accounts.find(acc => acc.username === 'jd');
console.log(findOwner);
console.log(findUsername);

// Some and Every Method 
console.log(movements);
// Equility --- simple form
console.log(movements.includes(-130));
// Conditional Form 
console.log(movements.some((mov)=> mov>3000));
console.log(movements.some((mov)=> mov>=3000));
console.log(movements.every((mov)=> mov>=0)); // false
console.log(account4.movements.every((mov)=> mov>=0));
// Separate CallBack
const deposits = (mov)=> mov>0;
console.log(movements.some(deposits));
console.log(movements.every(deposits));
console.log(movements.filter(deposits));

// ----> Flat & FlatMap <----
let arrss= [1,2,3,[3,8],5,[1,4,7],9];
console.log(arrss.flat());
arrss= [1,2,3,[3,8,[7,[5,3]],6],5,[1,[4,7]],9];
console.log(arrss.flat()); // (11) [1, 2, 3, 3, 8, Array(2), 6, 5, 1, Array(2), 9]
console.log(arrss.flat(2)); // (13) [1, 2, 3, 3, 8, 7, Array(2), 6, 5, 1, 4, 7, 9]
console.log(arrss.flat(3)); // (14) [1, 2, 3, 3, 8, 7, 5, 3, 6, 5, 1, 4, 7, 9]

let xyz = accounts.map((acc)=> acc.movements);
console.log(xyz);
let flatXyz = xyz.flat();
console.log(flatXyz);
let allsumUp = flatXyz.reduce( (acc, mov) => acc+mov,0);
console.log(allsumUp);

// By using flatMap
const flatXyzSum = accounts
.flatMap(acc=> acc.movements)
.reduce((acc,mov)=>acc+mov,0);
console.log(flatXyzSum);

// SORTING
const owner =['Jonas','Jessica','Steven','Sarah','Rahul'];
console.log(owner.sort());
console.log(movements);
console.log(movements.sort()); // (8) [-130, -400, -650, 1300, 200, 3000, 450, 70]
 
// return >0 A,B
// return <0 B,A
// It will mutate the movements array 
movements.sort((a,b)=>{
  if(a>b){return 1};
  if(a<b){return -1};
 
}
);
console.log(movements); // (8) [-650, -400, -130, 70, 200, 450, 1300, 3000]

// Ascending Order
movements.sort((a,b)=>{
  if(a>b){return a-b};
  if(a<b){return b-a};
}
);
console.log(movements); // (8) [-650, -400, -130, 70, 200, 450, 1300, 3000]

// Descending Order 
movements.sort((a,b)=>{
  if(a>b){return b-a};
  if(a<b){return a-b};
}
);
console.log(movements); // (8) [3000, 1300, 450, 200, 70, -130, -400, -650]

movements.sort((a,b)=> a-b);
console.log(movements); // Ascending  

movements.sort((a,b)=> b-a);
console.log(movements); // Descending 
/////////////////////////////////////////////////