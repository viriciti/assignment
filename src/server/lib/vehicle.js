var FILE, OPERATIONS, PARAMS, Vehicle, Writable, _, fs, getInitialState, getNewState, getTimeout, parse;

_ = require("underscore");

fs = require("fs");

parse = require("csv-parse");

({Writable} = require("stream"));

FILE = "../../../meta/route.csv";

OPERATIONS = {
	newDate: function() {
		return Date.now();
	},
	addDelta: function(curr, prev, state) {
		return state + curr - prev;
	},
	splitGPS: function(curr, prev, state) {
		return curr.split("|");
	},
	noop: function(curr, prev, state) {
		return curr;
	}
};

PARAMS = [
	{
		label: "time",
		intake: parseFloat,
		operation: OPERATIONS.newDate,
		init: OPERATIONS.newDate
	},
	{
		label: "energy",
		intake: parseFloat,
		operation: OPERATIONS.addDelta,
		init: function() {
			return 80;
		}
	},
	{
		label: "gps",
		intake: null,
		operation: OPERATIONS.splitGPS,
		init: function({gps}) {
			return OPERATIONS.splitGPS(gps);
		}
	},
	{
		label: "odo",
		intake: parseFloat,
		operation: OPERATIONS.addDelta,
		init: function() {
			return 0;
		}
	},
	{
		label: "speed",
		intake: parseFloat,
		operation: OPERATIONS.noop,
		init: function() {
			return 0;
		}
	},
	{
		label: "soc",
		intake: parseFloat,
		operation: OPERATIONS.addDelta,
		init: function() {
			return 100;
		}
	}
];

getTimeout = function(curr, prev) {
	return curr.time - prev.time;
};

getInitialState = function(info, params) {
	return _.reduce(params, function(state, {label, init}) {
		// console.log(label, init(info));
		state[label] = init(info);
		return state;
	}, {});
};

getNewState = function(state, info, params) {
	var labels, newState, timeout;
	labels = _.pluck(params, "label");
	timeout = state.time;
	return newState = _.object(params, _.map(params, function({label, operation}) {}));
};

Vehicle = class Vehicle extends Writable {
	constructor({
			params: params1
		}) {
		super({
			objectMode: true
		});
		this.params = params1;
		this.labels = _.pluck(this.params, "label");
		this.latest = null;
		this.state = null;
	}

	_write(info, e, cb) {
		var timeout;
		info = _.reduce(this.params, function(obj, {label, intake}) {
			obj[label] = intake ? intake(info[label]) : info[label];
			return obj;
		}, {});
		if (!this.state) {
			this.state = getInitialState(info, this.params);
		}
		if (!this.latest) {
			this.latest = info;
		}
		timeout = getTimeout(info, this.latest);
		return setTimeout(() => {
			var state;
			state = _.reduce(this.params, (obj, {label, operation}) => {
				obj[label] = operation(info[label], this.latest[label], this.state[label]);
				this.emit(label, obj[label]);
				return obj;
			}, {});
			this.emit("state", state);
			this.state = state;
			this.latest = info;
			return cb(null, state);
		}, timeout);
	}

};

module.exports = function(options) {
	var file, params;
	file = options.file || FILE;
	params = options.params || PARAMS;
	return fs.createReadStream(file).pipe(parse({
		columns: true
	})).pipe(new Vehicle({
		params: params
	}));
};
