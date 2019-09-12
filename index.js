"use strict";
class DevTips{
  /**
  * This method removes all repeated values and return an array of unique values.
  *
  * @param array {Array} - array of elements
  * @return {Array} - new array of unique values
  */
  getUnique(array){
    array.forEach((current, index) => {
      array = this.indexOfAll(array, current).length > 1 ? this.removeRepeated(array, current) : array;
    });
    return array;
  };
  /**
  * This method find all indexes of value in array and return new array with indexes.
  *
  * @param array {Array} - array of elements
  * @param value {String/Number/Boolean} - value which index you want to find elements
  * @return {Array} - new array of indexes
  */
  indexOfAll(array, value){
    return array.reduce((acc, el, i) => (el === value ? [...acc, i] : acc), [])
  }
  /**
  * This method removes all repeated values in array and return new array of values without values without settled in function. You can specify any amount of items even if they do not exist.
  *
  * @param array {Array} - array of elements
  * @param ...item {String/Number/Boolean} [default = []] - elements which you want to delete
  * @return {Array} - new array wihout specified values
  */
  removeRepeated([...array], ...items){
    for(let i of items){
      if(typeof i === 'object' || typeof i === undefined){
        return array;
      }
    }
    items.forEach(item => {
      let itteration;
      if(array.indexOf(item) !== -1){
        array.splice(array.indexOf(item), 1);
        itteration = this.removeRepeated(array, item);
      }else{
        itteration = array;
      }
      array = itteration;
    })
    return array;
  };
  /**
  * This method finds and removes all duplicate values leaving them in a single instance.
  *
  * @param array {Array} - array of elements
  * @return {Array} - new array wihout duplicate values
  */
  removeDoubles(array){
    return [...new Set(array)];
  };
  /**
  * Method debounce delay function {func} execution for a specified time {wait} in milliseconds once. If you want to execute function emergency, you should set this {immediate} params.
  *
  * @params func {Function} - callback function
  * @params wait {Number} [default = 0] - waiting time in milliseconds
  * @params immediate {Boolean} [default = false] - should call function emergency
  * @return {Function} - callback
  */
  debounce(func, wait = 0, immediate = false){
    let timeout;
    return () => {
      let context = this, args = arguments;
      let later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      let callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    }
  }
  /**
  * Method check if Array/Object id empty. If empty it will return true, else false.
  *
  * @params element {Array/Object} [default = null] - your element
  * @return {Boolean} - true if empty, false if not
  */
  isEmpty(element = null){
    if(element && (Array.isArray(element) || (typeof element === 'object' && element !== null))){
      return Array.isArray(element) ? (element.length ? false : true) : Object.entries(element).length === 0 && element.constructor === Object ? true : false;
    }
    return true;
  }
  /**
  * Method filter array by object query. If Object is empty or not an Object, function will return  user's array.
  *
  * @params array {Array} [default = []] - array of Objects
  * @params object {Object} [default = {}] - object of queries
  * @return {Array} - filtered by query array
  */
  filterBy(array = [], object = {}){
    if(this.isEmpty(object)){
      return array;
    }
    let array_of_keys = Object.entries(object), result = array;
    array_of_keys.forEach(pair => {
      result = result.filter((item) => {
        let key = pair[0], value = pair[1];
        return item[key] === value;
      });
    })
    return result;
  }
}
module.exports = DevTips;
