
	describe('Type Functions', function () {

		it('_.isType', function () {
			expect( _.isType('string')('this is a string') ).toBe(true);
			expect( _.isType('object')({}) ).toBe(true);
			expect( _.isType('object')(function () {}) ).toBe(false);
		});

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

		it('_.isRegExp', function () {
			expect( _.isRegExp(/.*/) ).toBe(true);
		});

	});

	describe('Object handling by Key', function () {

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

	});

	describe('Object extend functions', function () {

		it('_.extend', function () {
			var o = { foo: 'bar' };

			_.extend(o, { crash: 'test' }, { test: 'dummy' });

			expect( JSON.stringify(o) ).toBe('{"foo":"bar","crash":"test","test":"dummy"}');
		});

		it('_.extend no deep', function () {
			var o = { foo: 'bar' };

			_.extend(o, { crash: 'test', test: { dummy: 'oO' } }, { test: 'dummy' });

			expect( JSON.stringify(o) ).toBe('{"foo":"bar","crash":"test","test":"dummy"}');
		});

		it('_.merge', function () {

			var o = {};

			_.merge(o, { crash: 'test', test: { dummy: 'oO' } }, { test: { foo: 'bar' } });

			expect( JSON.stringify(o) ).toBe('{"crash":"test","test":{"dummy":"oO","foo":"bar"}}');
		});

		it('_.merge', function () {

			var o = {};

			_.merge(o, { crash: 'test', test: { list: [1,2,3] } }, { test: { list: [4,5,6] } });

			expect( JSON.stringify(o) ).toBe('{"crash":"test","test":{"list":[1,2,3,4,5,6]}}');
		});

		it('_.copy', function () {

			var o = { foo: 'bar' },
					o2 = _.copy(o);

			expect(o2.foo).toBe('bar');
		});

	});

	describe('joinPath', function () {

		it('_.joinPath no /', function () {
			expect( _.joinPath('foo', 'bar') ).toBe('foo/bar');
		});

		it('_.joinPath 1st/', function () {
			expect( _.joinPath('foo/', 'bar') ).toBe('foo/bar');
		});

		it('_.joinPath /2nd', function () {
			expect( _.joinPath('foo', '/bar') ).toBe('foo/bar');
		});

		it('_.joinPath 1st/ /2nd', function () {
			expect( _.joinPath('foo/', '/bar') ).toBe('foo/bar');
		});

		it('_.joinPath 1 arg', function () {
			expect( _.joinPath('foobar') ).toBe('foobar');
		});

		it('_.joinPath 3 args', function () {
			expect( _.joinPath('api', 'v1', 'foobar') ).toBe('api/v1/foobar');
		});

		it('_.joinPath 4 args', function () {
			expect( _.joinPath('api', 'v1', 'foo', 'bar') ).toBe('api/v1/foo/bar');
		});

	});

	describe('pipe', function () {

		var double = function (value) {
					return 2*value;
				},
				pipedDouble = _.pipe(double);

		it('piped double', function () {
			expect( pipedDouble(4) ).toBe(8);
		});

	});
