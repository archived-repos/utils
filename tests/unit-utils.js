
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

	describe('find', function () {

		var item0 = { foo: 'foo', value: 1, common: 1 },
				item1 = { foo: 'bar', value: 2, common: 1 },
				item2 = { foo: 'foobar', value: 3, common: 2 };

		var list = [item0, item1, item2];

		it('_.find', function () {
			expect( _.find(list, { foo: 'bar' }).value ).toBe(2);
		});

		it('_.find mismatch', function () {
			expect( _.find(list, { foo: 'bar', value: 0 }) ).toBeNull();
		});

		it('_.find all keys', function () {
			expect( _.find(list, { foo: 'bar', value: 2 }).value ).toBe(2);
		});

		it('_.find callback', function () {
			expect( _.find(list, function (item) {
				return item.value === 3;
			}) ).toBe(item2);
		});

		it('_.find callback thisArg', function () {
			expect( _.find(list, function (item) {
				return item.value === this.value;
			}, { value: 3 }) ).toBe(item2);
		});

		it('_.find callback thisArg', function () {
			expect( _.find(list, function (item) {
				return item.value === this.valueOf();
			}, 3) ).toBe(item2);
		});

	});

	describe('filter', function () {

		var item0 = { foo: 'foo', value: 1, common: 1 },
				item1 = { foo: 'bar', value: 2, common: 1 },
				item2 = { foo: 'foobar', value: 3, common: 2 };

		var list = [item0, item1, item2];

		it('_.find', function () {
			expect( _.filter(list, { foo: 'bar' })[0] ).toBe(item1);
		});

		it('_.find common', function () {
			expect( JSON.stringify( _.filter(list, { common: 1 }) ) ).toBe('[{"foo":"foo","value":1,"common":1},{"foo":"bar","value":2,"common":1}]');
		});

		it('_.find callback', function () {
			expect( JSON.stringify( _.filter(list, function (item) {
				return item.value < 3;
			}) ) ).toBe('[{"foo":"foo","value":1,"common":1},{"foo":"bar","value":2,"common":1}]');
		});

		it('_.find callback with thisArg', function () {
			expect( JSON.stringify( _.filter(list, function (item) {
				return item.value < this;
			}, 3) ) ).toBe('[{"foo":"foo","value":1,"common":1},{"foo":"bar","value":2,"common":1}]');
		});

	});

	describe('indexOf', function () {

		var list = [{ foo: 'foo' }, { foo: 'bar' }, { foo: 'foobar' }];

		it('_.indexOf value missing', function () {
			var o = { foo: 'bar' };

			expect( _.indexOf(list, o) ).toBe(-1);
		});

		it('_.indexOf value found', function () {
			var o = { foo: 'bar' };

			list.push(o);

			expect( _.indexOf(list, o) ).toBe(3);
		});

		it('_.indexOf single value missing', function () {
			var numList = [1,2,3,4,5,6,7,8,9];

			expect( _.indexOf(numList, 10) ).toBe(-1);
		});

		it('_.indexOf single value found first', function () {
			var numList = [1,2,3,4,5,6,7,8,9];

			expect( _.indexOf(numList, 1) ).toBe(0);
		});

		it('_.indexOf single value found last', function () {
			var numList = [1,2,3,4,5,6,7,8,9];

			expect( _.indexOf(numList, 9) ).toBe(8);
		});

		it('_.indexOf callback missing', function () {
			expect( _.indexOf(list, function (item) {
				return item && item.foo === 'wrong-value';
			}) ).toBe(-1);
		});

		it('_.indexOf callback found', function () {
			expect( _.indexOf(list, function (item) {
				return item && item.foo === 'bar';
			}) ).toBe(1);
		});

		it('_.indexOf callback with thisArg found', function () {
			expect( _.indexOf(list, function (item) {
				return item && item.foo === this.key;
			}, { key: 'bar' }) ).toBe(1);
		});

	});

	describe('indexBy', function () {

		var list = [{ foo: 'foo' }, { foo: 'bar' }, { foo: 'foobar' }];

		it('_.indexBy string key', function () {
			expect( JSON.stringify(_.indexBy(list, 'foo')) ).toBe('{"foo":{"foo":"foo"},"bar":{"foo":"bar"},"foobar":{"foo":"foobar"}}');
		});

		it('_.indexBy callback', function () {
			expect( JSON.stringify(_.indexBy(list, function (item) {
				return '_' + item.foo;
			})) ).toBe('{"_foo":{"foo":"foo"},"_bar":{"foo":"bar"},"_foobar":{"foo":"foobar"}}');
		});

		it('_.indexBy callback with thisArg', function () {
			expect( JSON.stringify(_.indexBy(list, function (item) {
				return this + item.foo;
			}, '_')) ).toBe('{"_foo":{"foo":"foo"},"_bar":{"foo":"bar"},"_foobar":{"foo":"foobar"}}');
		});

	});

	describe('_.pluck', function () {

		var list = [{ foo: 'foo' }, { foo: 'bar' }, { foo: 'foobar' }];

		it('_.pluck', function () {
			expect( _.pluck(list, 'foo').toString() ).toBe('foo,bar,foobar');
		});

		// _.pluck callback is an alias of map
		it('_.pluck callback', function () {
			expect( _.pluck(list, function (item) {
				return this + item.foo;
			}, '_').toString() ).toBe('_foo,_bar,_foobar');
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
