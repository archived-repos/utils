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

	it('_.key get', function () {
		var o = { foo: 'bar' }

		expect( _.key(o, 'foo') ).toBe('bar');
	});

	it('_.key set', function () {
		var o = { foo: 'bar' }

		_.key(o, 'foo', 'changed');

		expect( o.foo ).toBe('changed');
	});

	it('_.key set 2nd level', function () {
		var o = {}

		_.key(o, 'foo.bar', 'foobar');

		expect( o.foo.bar ).toBe('foobar');
	});

	it('_.extend', function () {
		var o = { foo: 'bar' };

		_.extend(o, { crash: 'test' }, { test: 'dummy' });

		expect( JSON.stringify(o) ).toBe('{"foo":"bar","crash":"test","test":"dummy"}');
	});

});