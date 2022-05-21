'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function(app) {

	let convertHandler = new ConvertHandler();

	app.route('/api/convert').get( (req, res) => {

		const initNum  = convertHandler.getNum(  req.query.input );
		const initUnit = convertHandler.getUnit( req.query.input );

		if ( (initNum == 'invalid number') && (initUnit == 'invalid unit') ) {

			res.send( 'invalid number and unit' );
		}
		else if ( initNum == 'invalid number' ) {

			res.send( 'invalid number' );
		}
		else if ( initUnit == 'invalid unit' ) {

			res.send( 'invalid unit' );
		}
		else {

			const returnNum = convertHandler.convert( initNum, initUnit );
			const returnUnit = convertHandler.getReturnUnit( initUnit );

			res.json( {

				initNum: initNum,
				initUnit: initUnit,
				returnNum: returnNum,
				returnUnit: returnUnit,
				string: convertHandler.getString( initNum, initUnit, returnNum, returnUnit )
			});
		}
	});

};
