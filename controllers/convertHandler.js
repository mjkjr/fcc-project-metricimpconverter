function ConvertHandler() {

	this.getNum = function(input) {

		// check for a whole or decimal number (non-fractional)
		let result = input.toLowerCase().match( /^(\d*\.?\d+)[^\d]*$/ );

		if ( result === null ) {

			// check for a fractional number
			result = input.toLowerCase().match( /^((\d*\.?\d+)\/(\d*\.?\d+))[^\d]*$/ );

			if ( result === null ) {

				// check if the input was only units and default to 1
				result = input.toLowerCase().match( /^(mi|km|l|gal|kg|lbs)$/ );

				if ( result === null ) {

					return 'invalid number';
				}
				else {

					return 1;
				}
			}
			else {

				// return the result of a fractional number
				return Number( result[2] / result[3] );
			}
		}
		else {

			// return the whole or decimal number
			return Number(result[1]);
		}
	};

	this.getUnit = function(input) {

		const result = input.toLowerCase().match( /(mi|km|l|gal|kg|lbs)$/ );

		if ( result === null || result.length > 2 ) {

			return 'invalid unit';
		}
		else {

			return ( result[1] == 'l' ) ? 'L' : result[1];
		}
	};

	this.getReturnUnit = function(initUnit) {

		switch ( initUnit.toLowerCase() ) {

			case 'mi':  return 'km';
			case 'km':  return 'mi';
			case 'gal': return 'L';
			case 'l':   return 'gal';
			case 'lbs': return 'kg';
			case 'kg':  return 'lbs';
		}
	};

	this.spellOutUnit = function(unit) {

		switch ( unit.toLowerCase() ) {

			case 'mi':  return 'miles';
			case 'km':  return 'kilometers';
			case 'gal': return 'gallons';
			case 'l':   return 'liters';
			case 'lbs': return 'pounds';
			case 'kg':  return 'kilograms';
		}
	};

	this.convert = function(initNum, initUnit) {

		const galToL = 3.78541;
		const lbsToKg = 0.453592;
		const miToKm = 1.60934;

		switch ( initUnit.toLowerCase() ) {

			case 'mi':  return Number((initNum * miToKm ).toFixed(5));
			case 'km':  return Number((initNum / miToKm ).toFixed(5));
			case 'gal': return Number((initNum * galToL ).toFixed(5));
			case 'l':   return Number((initNum / galToL ).toFixed(5));
			case 'lbs': return Number((initNum * lbsToKg).toFixed(5));
			case 'kg':  return Number((initNum / lbsToKg).toFixed(5));
		}
	};

	this.getString = function(initNum, initUnit, returnNum, returnUnit) {

		return initNum   + ' ' + this.spellOutUnit( initUnit ) + ' converts to ' +
		       returnNum + ' ' + this.spellOutUnit( returnUnit );
	};

}

module.exports = ConvertHandler;
