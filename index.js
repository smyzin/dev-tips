'use strict';

class DevTips {

  /**
   * This method find all indexes of value in array and return new array with indexes.
   *
   * @param array { Array } - array of elements
   * @param value { String/Number/Boolean } - value which index you want to find elements
   * @return { Array } - new array of indexes
   */
  indexOfAll(array, value) {
    return array.reduce((acc, el, i) => (el === value ? [...acc, i] : acc), []);
  }

  /**
   * This method removes all repeated values and return an array of unique values.
   *
   * @param array { Array } - array of elements
   * @return { Array } - new array of unique values
   */
  getUnique(array) {
    array.forEach((current) => {
      array = this.indexOfAll(array, current).length > 1 ? this.removeRepeated(array, current) : array;
    });
    return array;
  }

  /**
   * This method removes all repeated values in array and return new array of values without values without settled in function.
   * You can specify any amount of items even if they do not exist.
   *
   * @param array { Array } - array of elements
   * @param items - list of arguments
   * @param ...item { String/Number/Boolean } [default = []] - elements which you want to delete
   * @return { Array } - new array without specified values
   */
  removeRepeated([...array], ...items) {
    for (const i of items) {
      if (typeof i === 'object' || i === undefined) {
        return array;
      }
    }
    items.forEach((item) => {
      let iteration;
      if (array.indexOf(item) !== -1) {
        array.splice(array.indexOf(item), 1);
        iteration = this.removeRepeated(array, item);
      } else {
        iteration = array;
      }
      array = iteration;
    });
    return array;
  }

  /**
   * This method finds and removes all duplicate values leaving them in a single instance.
   *
   * @param array { Array } - array of elements
   * @return { Array } - new array without duplicate values
   */
  removeDoubles(array) {
    return [...new Set(array)];
  }

  /**
   * Method debounce delay function {func} execution for a specified time {wait} in milliseconds once.
   * If you want to execute function emergency, you should set this {immediate} params.
   *
   * @params func { Function } - callback function
   * @params wait { Number } [default = 0] - waiting time in milliseconds
   * @params immediate { Boolean } [default = false] - should call function emergency
   * @return { Function } - callback
   */
  debounce(func, wait = 0, immediate = false) {
    let timeout;
    return () => {
      let context = this;
      const args = arguments;
      let later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      let callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  }

  /**
   * Method check if Array/Object id empty. If empty it will return true, else false.
   *
   * @params element { Array/Object } [default = null] - your element
   * @return { Boolean } - true if empty, false if not
   */
  isEmpty(element = null) {
    if (element && (Array.isArray(element) || (typeof element === 'object' && element !== null))) {
      return Array.isArray(element) ? (!element.length) : !!(Object.entries(element).length === 0 && element.constructor === Object);
    }
    return true;
  }

  /**
   * Method filter array by object query. If Object is empty or not an Object, function will return  user's array.
   *
   * @params array { Array } [default = []] - array of Objects
   * @params object { Object } [default = {}] - object of queries
   * @return { Array } - filtered by query array
   */
  filterBy(array = [], cb = {}) {
    if (typeof cb === 'function') {
      return [...array.filter(cb)];
    } if (cb && typeof cb === 'object' && cb.constructor === Object) {
      const object = cb;
      if (this.isEmpty(object)) {
        return array;
      }
      let result = array;
      Object.entries(object).forEach((pair) => {
        result = result.filter((item) => {
          return item[pair[0]] === pair[1];
        });
      });
      return result;
    }
    return array;

  }

  /**
   * Method count array of object by key:value pair or function query. If `object` is empty, function will return array.length.
   * You can specify either Object query [1] or function query[2] for deep search.
   *
   * @params array { Array } [default = []] - array of Objects
   * @params object { Object/Function } [default = {}] - object/function of queries
   * @return { Number } - length of filtered by query array
   */
  countBy(array, object = {}) {
    return this.filterBy(array, object).length;
  }

  /**
   * Method add pattern to original string to the end or to the start of string.
   * You can specify the number of characters which will return the function.
   *
   * @params str { String } [default = ''] - original string
   * @params pattern { String } [default = ''] - pattern which you want to add
   * @params amount { Number } [default = pattern.length] - length of string to return
   * @params position { String} [default = 'end'] - where to add pattern
   * @return { String } - original string with pattern
   */
  addPattern(str = '', pattern = '', amount = pattern.length, position = 'end'){
      if(typeof str !== 'string'){
          throw new Error('This method works only for strings');
      }
      return position === 'start' ? str.padStart(amount, pattern) :  str.padEnd(amount, pattern);
  }
}

module.exports = DevTips;
