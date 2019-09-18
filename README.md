# dev-tips

This is a class with common used functions to simplify developers life. You can use it to improving your workflow on daily based.

 - [Russian instructions](https://github.com/smyzin/dev-tips/blob/master/lang/ru.md)
 - [English instructions](https://github.com/smyzin/dev-tips/blob/master/lang/en.md)

## Installation

```js
npm install dev-tips --save
```

### Module

```js
import DevTips from 'dev-tips';
const _dt = new DevTips();
```

## Usage
You can use this tiny library for working with array/objects. As a bonus, there is debounce functions inside whiche you can use instead of 'lodash'.

#### getUnique
This method removes all repeated values and return an array of unique values.

`@param array {Array} - array of elements`

`@return {Array} - new array of unique values`

```js
let array = ['t', 1, 3, 4, 1, 'e', 4, 'e', 4, 5];
let result = _dt.getUnique(array);
// => Output:
// ["t", 3, 5]
```

#### indexOfAll
This method find all indexes of value in array and return new array with indexes.

`@param array {Array} - array of elements`

`@param value {String/Number/Boolean} - value which index you want to find elements`

`@return {Array} - new array of indexes`

```js
let array = ['t', 1, 3, 4, 1, 'e', 4, 'e', 4, 5];
let result = _dt.indexOfAll(array, 4);
// => Output:
// [3, 6, 8]
```

#### removeRepeated
This method removes all repeated values in array and return new array of values without values without settled in function. You can specify any amount of items even if they do not exist.

`@param array {Array} - array of elements`

`@param ...item {String/Number/Boolean} [default = []] - elements which you want to delete`

`@return {Array} - new array wihout specified values`

```js
let array = ['t', 1, 3, 4, 1, 'e', 4, 'e', 4, 5];
let result = _dt.removeRepeated(array, 1, 99, 'e');
// => Output:
// ["t", 3, 4, 4, 4, 5]
```

#### removeDoubles
This method finds and removes all duplicate values leaving them in a single instance.

`@param array {Array} - array of elements`

`@return {Array} - new array wihout duplicate values`

```js
let array = ['t', 1, 3, 4, 1, 'e', 4, 'e', 4, 5];
let result = _dt.removeDoubles(array);
// => Output:
// ["t", 1, 3, 4, "e", 5]
```

#### isEmpty
Method check if Array/Object id empty. If empty it will return true, else false.

`@params element {Array/Object} [default = null] - your element`

`@return {Boolean} - true if empty, false if not`

```js
console.log(_dt.isEmpty({})); // => Output: true
console.log(_dt.isEmpty({a: 'test'})); // => Output: false
console.log(_dt.isEmpty([])); // => Output: true
console.log(_dt.isEmpty(['ttt', '777'])); // => Output: false
console.log(_dt.isEmpty(new Array())); // => Output: true
console.log(_dt.isEmpty(new Array('333'))); // => Output: false
console.log(_dt.isEmpty(new Object())); // => Output: true
console.log(_dt.isEmpty(new Object({bar: 'foo'}))); // => Output: false
console.log(_dt.isEmpty(function(){return 'Hello world!'})); // => Output: true
```

#### filterBy
Method filter array by object query or callback function. If Object is empty or not an Object/Function, method will return  user's array.

If specified object query[1], array will be filtered without deep search. But you can specify function[2] for deep search.

`@params array {Array} [default = []] - array of Objects`

`@params cb {Object/Function} [default = {}] - object/function of queries`

`@return {Array} - filtered by query array`

```js
let array = [
    { name: 'Peter', role: 'member', age: 18,gender: 'male', salary: {gross: 100, amount: 79} },
    { name: 'Julia', role: 'member', age: 23,gender: 'female', salary: {gross: 101, amount: 79} },
    { name: 'Ann', role: 'member', age: 28,gender: 'female', salary: {gross: 100, amount: 99} },
    { name: 'Nordy', role: 'annonym', age: 23,gender: 'female', salary: {gross: 250, amount: 197} },
    { name: 'Sam', role: 'member', age: 19,gender: 'male', salary: {gross: 251, amount: 197} },
    { name: 'Eve', role: 'annonym', age: 42,gender: 'female', salary: {gross: 100, amount: 80} }
];
let result1 = _dt.filterBy(array, { role: 'member', gender: 'female'});
let result2 = _dt.filterBy(array, (el) => {
  return el.role === 'member' && el.salary.gross >= 101
});
// => [1]: [
//      {name: "Putin2", role: "member", gender: "female"}
//      {name: "Putin3", role: "member", gender: "female"}
//    ]
// => [2]: [
//      {name: "Putin2", role: "member", gender: "female"}
//      {name: "Putin3", role: "member", gender: "female"}
//    ]
```

#### countBy
Method count array of object by key:value pair or function query. If `object` is empty, function will return array.length.

You can specify either Object query [1] or function query[2] for deep search.

`@params array {Array} [default = []] - array of Objects`

`@params cb {Object/Function} [default = {}] - object/function of queries`

`@return {Array} - filtered by query array`

```js
let array = [
    { name: 'Peter', role: 'member', age: 18,gender: 'male', salary: {gross: 100, amount: 79} },
    { name: 'Julia', role: 'member', age: 23,gender: 'female', salary: {gross: 101, amount: 79} },
    { name: 'Ann', role: 'member', age: 28,gender: 'female', salary: {gross: 100, amount: 99} },
    { name: 'Nordy', role: 'annonym', age: 23,gender: 'female', salary: {gross: 250, amount: 197} },
    { name: 'Sam', role: 'member', age: 19,gender: 'male', salary: {gross: 251, amount: 197} },
    { name: 'Eve', role: 'annonym', age: 42,gender: 'female', salary: {gross: 100, amount: 80} }
];
let result1 = _dt.countBy(array, { role: 'member', gender: 'female'});
let result2 = _dt.countBy(array, (el) => {
  return el.role === 'member' && el.salary.gross >= 101
});
// => [1]: 2
// => [2]: 2
```

#### debounce*
Method debounce delay function {func} execution for a specified time {wait} in milliseconds once. If you want to execute function emergency, you should set this {immediate} params.

`@params func {Function} - callback function`

`@params wait {Number} [default = 0] - waiting time in milliseconds`

`@params immediate {Boolean} [default = false] - should call function emergency`

`@return {Function} - callback`

```js
function checkResize(){
    _dt.debounce(() => {
        console.log('Window resized');
    }, 1500);
}

window.addEventListener('resize', checkResize)
```

*`debounce` wiil hold function execution until you stop, for this example, resizing window. After 1.5 seconds you will see in your console 'Window resized'.
