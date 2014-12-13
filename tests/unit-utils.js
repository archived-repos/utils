describe('factory: security.session', function () {

	it('_.isFunction', function () {
		expect( _.isFunction(function () {}) ).toBe(true);
	});

	it('_.isObject', function () {
		expect( _.isObject({}) ).toBe(true);
	});

	it('_.isString', function () {
		expect( _.isString('this is a string') ).toBe(true);
	});

	it('_.isNumber', function () {
		expect( _.isNumber(45) ).toBe(true);
	});

	it('_.isArray', function () {
		expect( _.isArray([]) ).toBe(true);
	});

});