const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){

	test( 'convertHandler should correctly read a whole number input.', () => {

		assert.equal( 12, convertHandler.getNum( '12mi' ) );
		assert.equal( 10, convertHandler.getNum( '10km' ) );
		assert.equal( 20, convertHandler.getNum( '20L' ) );
		assert.equal(  3, convertHandler.getNum( '3gal' ) );
		assert.equal( 13, convertHandler.getNum( '13kg' ) );
		assert.equal(  4, convertHandler.getNum( '4lbs' ) );
	});

	test( 'convertHandler should correctly read a decimal number input.', () => {

		assert.equal( 1.2, convertHandler.getNum( '1.2mi' ) );
		assert.equal( 1.0, convertHandler.getNum( '1.0km' ) );
		assert.equal( 2.0, convertHandler.getNum( '2.0L' ) );
		assert.equal( 0.3, convertHandler.getNum( '0.3gal' ) );
		assert.equal( 1.3, convertHandler.getNum( '1.3kg' ) );
		assert.equal( 0.4, convertHandler.getNum( '0.4lbs' ) );
	});

	test( 'convertHandler should correctly read a fractional input.', () => {

		assert.equal( 0.5,                convertHandler.getNum( '1/2mi' ) );
		assert.equal(   1,                convertHandler.getNum( '1/1km' ) );
		assert.equal( 0.5,                convertHandler.getNum( '2/4L' ) );
		assert.equal( 0.6,                convertHandler.getNum( '3/5gal' ) );
		assert.equal( 0.3333333333333333, convertHandler.getNum( '1/3kg' ) );
		assert.equal( 0.25,               convertHandler.getNum( '1/4lbs' ) );
	});

	test( 'convertHandler should correctly read a fractional input with a decimal.', () => {

		assert.equal( 0.24,               convertHandler.getNum( '1.2/5mi' ) );
		assert.equal( 0.3666666666666667, convertHandler.getNum( '1.1/3km' ) );
		assert.equal( 0.3333333333333333, convertHandler.getNum( '2.0/6L' ) );
		assert.equal( 46.66666666666667,  convertHandler.getNum( '14/0.3gal' ) );
		assert.equal( 0.325,              convertHandler.getNum( '1.3/4kg' ) );
		assert.equal( 40,                 convertHandler.getNum( '16/0.4lbs' ) );
	});

	test( 'convertHandler should correctly return an error on a double-fraction (i.e. 3/2/3).', () => {

		assert.equal( 'invalid number', convertHandler.getNum( '1/2/5mi' ) );
		assert.equal( 'invalid number', convertHandler.getNum( '1/1/3km' ) );
		assert.equal( 'invalid number', convertHandler.getNum( '2/4/6L' ) );
		assert.equal( 'invalid number', convertHandler.getNum( '4/3/1gal' ) );
		assert.equal( 'invalid number', convertHandler.getNum( '1/3/4kg' ) );
		assert.equal( 'invalid number', convertHandler.getNum( '16/0.4/5lbs' ) );
	});

	test( 'convertHandler should correctly default to a numerical input of 1 when no numerical input is provided.', () => {

		assert.equal( 1, convertHandler.getNum( 'mi' ) );
		assert.equal( 1, convertHandler.getNum( 'km' ) );
		assert.equal( 1, convertHandler.getNum( 'L' ) );
		assert.equal( 1, convertHandler.getNum( 'gal' ) );
		assert.equal( 1, convertHandler.getNum( 'kg' ) );
		assert.equal( 1, convertHandler.getNum( 'lbs' ) );
	});

	test( 'convertHandler should correctly read each valid input unit.', () => {

		assert.equal(  'mi', convertHandler.getUnit( '115mi' ) );
		assert.equal(  'km', convertHandler.getUnit( '155km' ) );
		assert.equal(   'L', convertHandler.getUnit( '15.5L' ) );
		assert.equal( 'gal', convertHandler.getUnit( '10gal' ) );
		assert.equal(  'kg', convertHandler.getUnit( '5/2kg' ) );
		assert.equal( 'lbs', convertHandler.getUnit( '25lbs' ) );
	});

	test( 'convertHandler should correctly return an error for an invalid input unit.', () => {

		assert.equal( 'invalid unit', convertHandler.getUnit( 'mdi' ) );
		assert.equal( 'invalid unit', convertHandler.getUnit( 'k3m' ) );
		assert.equal( 'invalid unit', convertHandler.getUnit( 'Lh' ) );
		assert.equal( 'invalid unit', convertHandler.getUnit( 'gals' ) );
		assert.equal( 'invalid unit', convertHandler.getUnit( 'kgj' ) );
		assert.equal( 'invalid unit', convertHandler.getUnit( 'lb' ) );
	});

	test( 'convertHandler should return the correct return unit for each valid input unit.', () => {

		assert.equal(  'km', convertHandler.getReturnUnit( 'mi' ) );
		assert.equal(  'mi', convertHandler.getReturnUnit( 'km' ) );
		assert.equal( 'gal', convertHandler.getReturnUnit( 'L' ) );
		assert.equal(   'L', convertHandler.getReturnUnit( 'gal' ) );
		assert.equal( 'lbs', convertHandler.getReturnUnit( 'kg' ) );
		assert.equal(  'kg', convertHandler.getReturnUnit( 'lbs' ) );
	});

	test( 'convertHandler should correctly return the spelled-out string unit for each valid input unit.', () => {

		assert.equal( 'miles',      convertHandler.spellOutUnit( 'mi' ) );
		assert.equal( 'kilometers', convertHandler.spellOutUnit( 'km' ) );
		assert.equal( 'liters',     convertHandler.spellOutUnit( 'L' ) );
		assert.equal( 'gallons',    convertHandler.spellOutUnit( 'gal' ) );
		assert.equal( 'kilograms',  convertHandler.spellOutUnit( 'kg' ) );
		assert.equal( 'pounds',     convertHandler.spellOutUnit( 'lbs' ) );
	});

	test( 'convertHandler should correctly convert gal to L.', () => {

		assert.equal(  1.89271, convertHandler.convert( 0.5, 'gal' ) );
		assert.equal(  3.78541, convertHandler.convert( 1,   'gal' ) );
		assert.equal(  9.46353, convertHandler.convert( 2.5, 'gal' ) );
		assert.equal( 18.92705, convertHandler.convert( 5,   'gal' ) );
	});

	test( 'convertHandler should correctly convert L to gal.', () => {

		assert.equal( 0.13209, convertHandler.convert( 0.5, 'L' ) );
		assert.equal( 0.26417, convertHandler.convert( 1,   'L' ) );
		assert.equal( 0.66043, convertHandler.convert( 2.5, 'L' ) );
		assert.equal( 1.32086, convertHandler.convert( 5,   'L' ) );
	});

	test( 'convertHandler should correctly convert mi to km.', () => {

		assert.equal( 0.80467, convertHandler.convert( 0.5, 'mi' ) );
		assert.equal( 1.60934, convertHandler.convert( 1,   'mi' ) );
		assert.equal( 4.02335, convertHandler.convert( 2.5, 'mi' ) );
		assert.equal( 8.04670, convertHandler.convert( 5,   'mi' ) );
	});

	test( 'convertHandler should correctly convert km to mi.', () => {

		assert.equal( 0.31069, convertHandler.convert( 0.5, 'km' ) );
		assert.equal( 0.62137, convertHandler.convert( 1,   'km' ) );
		assert.equal( 1.55343, convertHandler.convert( 2.5, 'km' ) );
		assert.equal( 3.10686, convertHandler.convert( 5,   'km' ) );
	});

	test( 'convertHandler should correctly convert lbs to kg.', () => {

		assert.equal( 0.22680, convertHandler.convert( 0.5, 'lbs' ) );
		assert.equal( 0.45359, convertHandler.convert( 1,   'lbs' ) );
		assert.equal( 1.13398, convertHandler.convert( 2.5, 'lbs' ) );
		assert.equal( 2.26796, convertHandler.convert( 5,   'lbs' ) );
	});

	test( 'convertHandler should correctly convert kg to lbs.', () => {

		assert.equal(  1.10231, convertHandler.convert( 0.5, 'kg' ) );
		assert.equal(  2.20462, convertHandler.convert( 1,   'kg' ) );
		assert.equal(  5.51156, convertHandler.convert( 2.5, 'kg' ) );
		assert.equal( 11.02312, convertHandler.convert( 5,   'kg' ) );
	});
});
