/*
*
*
*       FILL IN EACH UNIT TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]----
*       (if additional are added, keep them at the very end!)
*/

var chai = require('chai');
var assert = chai.assert;
var ConvertHandler = require('../controllers/convertHandler.js');

var convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
  
  suite('Function convertHandler.getNum(input)', function() {
    
    test('Whole number input', function(done) {
      var input = '32L';
      assert.equal(convertHandler.getNum(input), 32);
      done();
    });
    
    test('Decimal Input', function(done) {
      var input = "0.9gal";
      assert.equal(convertHandler.getNum(input), 0.9);
      input = "1.9lbs";
      assert.equal(convertHandler.getNum(input), 1.9);
      input = "1.2.3km";
      assert.equal(convertHandler.getNum(input), "invalid number");
      done();
    });
    
    test('Fractional Input', function(done) {
      var input = "1/4gal";
      assert.equal(convertHandler.getNum(input), 0.25);
      done();
    });
    
    test('Fractional Input w/ Decimal', function(done) {
      var input = "1.5/2l";
      assert.equal(convertHandler.getNum(input), 0.75);
      done();
    });
    
    test('Invalid Input (double fraction)', function(done) {
      var input = "1.75/3/5gal";
      assert.equal(convertHandler.getNum(input), "invalid number");
      done();     // NOT PASSING
    });
    
    test('No Numerical Input', function(done) {
      var input = "km";
      assert.equal(convertHandler.getNum(input), 1);
      done();
    }); 
    
  });
  
  suite('Function convertHandler.getUnit(input)', function() {
    
    test('For Each Valid Unit Inputs', function(done) {
      var input = ['gal','l','mi','km','lbs','kg','GAL','L','MI','KM','LBS','KG'];
      input.forEach(function(ele) {
        //assert
      assert.equal(convertHandler.getUnit(ele), ele.toLowerCase());
      });
      done();
    });
    
    test('Unknown Unit Input', function(done) {
      var input = "j";
      assert.equal(convertHandler.getUnit(input), "invalid unit");
      done();
    });  
    
  });
  
  suite('Function convertHandler.getReturnUnit(initUnit)', function() {
    
    test('For Each Valid Unit Inputs', function(done) {
      var input = ['gal','l','mi','km','lbs','kg'];
      var expect = ['l','gal','km','mi','kg','lbs'];
      input.forEach(function(ele, i) {
        assert.equal(convertHandler.getReturnUnit(ele), expect[i]);
      });
      done();
    });
    
  });  
  
  suite('Function convertHandler.spellOutUnit(unit)', function() {
    
    test('For Each Valid Unit Inputs', function(done) {
      //see above example for hint
      var input = ['gal','l','mi','km','lbs','kg'];
      var expect = ['gallons', 'liters', 'miles', 'kilometers', 'pounds', 'kilograms'];
      input.forEach(function(ele, i){
       assert.equal(convertHandler.spellOutUnit(ele, i), expect[i]);
      });
      done();
    });
    
  });
  
  suite('Function convertHandler.convert(num, unit)', function() {
    
    test('Gal to L', function(done) {
      var input = [5, 'gal'];
      var expected = 18.92705;
      assert.approximately(convertHandler.convert(input[0],input[1]),expected,0.1); //0.1 tolerance
      done();
    });
    
    test('L to Gal', function(done) {
      var input = [4, 'l'];
      var expected = 1.05669;
      assert.approximately(convertHandler.convert(input[0],input[1]), expected, 0.1);
      done();
    });
    
    test('Mi to Km', function(done) {
      var input =[16, 'mi'];
      var expected = 25.74944;
      assert.approximately(convertHandler.convert(input[0],input[1]), expected, 0.1);
      done();
    });
    
    test('Km to Mi', function(done) {
      var input=[22, 'km'];
      var expected = 13.67020;
      assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1);
      done();
    });
    
    test('Lbs to Kg', function(done) {
      var input = [138, 'lbs'];
      var expected = 62.59570;
      assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1)
      done();
    });
    
    test('Kg to Lbs', function(done) {
      var input = [75, 'kg'];
      var expected = 165.34683;
      assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1);
      done();
    });
    
  });

});