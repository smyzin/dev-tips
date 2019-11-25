'use strict';

const assert = require('assert');
const clone = require('stringify-clone');
const DevTips = require('../index');

describe('DevTips', () => {
  beforeEach(() => {
    this.dev = new DevTips();
  });
  describe('#indexOfAll()', () => {
    this.source = ['t', 1, 3, 4, 1, 'e', 4, 'e', 4, 5];
    this.clone = clone(this.source);
    it('should return [3, 6, 8] indexes element', () => {
      assert.deepEqual(this.dev.indexOfAll(this.source, 4), [3, 6, 8]);
    });
    it('should be success because array not mutated', () => {
      const res = this.dev.indexOfAll(this.source, 4);
      assert.deepEqual(res, [3, 6, 8]);
      assert.deepEqual(this.source, this.clone);
    });
  });
  describe('#getUnique()', () => {
    this.source = ['t', 1, 3, 4, 1, 'e', 4, 'e', 4, 5];
    this.clone = clone(this.source);
    it('should return ["t", 3, 5] indexes element', () => {
      assert.deepEqual(this.dev.getUnique(this.source), ['t', 3, 5]);
    });
    it('should be success because array not mutated', () => {
      const res = this.dev.getUnique(this.source);
      assert.deepEqual(res, ['t', 3, 5]);
      assert.deepEqual(this.source, this.clone);
    });
  });
});
