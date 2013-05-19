// javascript:Meta%20=%20new%20Meteor.Collection(%22meta%22);if%20(Meteor.isClient)%20{Template.hello.greeting%20=%20function()%20{return%20%22Welcome%20to%20edc.%22;};Template.hello.events({%27click%20input%27:%20function()%20{if%20(typeof%20console%20!==%20%27undefined%27)%20console.log(%22You%20pressed%20the%20button%22);}});}if%20(Meteor.isServer)%20{Meteor.startup(function()%20{if%20(Meta.find().count()%20===%200)%20{var%20meta_data%20=%20[{name:%20%22Demographic%22,fields:%20[{name:%20%22Gender%22,type:%20%22text%22},%20{name:%20%22Age%22,type:%20%22text%22}]},%20{name:%20%22Vitals%22,fields:%20[{name:%20%22Gender%22,type:%20%22text%22},%20{name:%20%22Age%22,type:%20%22text%22}]},%20{name:%20%22ECG%22,fields:%20[{name:%20%22Gender%22,type:%20%22text%22},%20{name:%20%22Age%22,type:%20%22text%22}]}];Meta.insert(meta_data);}});}
Meta = new Meteor.Collection("meta");

if (Meteor.isClient) {
	Template.hello.greeting = function() {
		return "Welcome to edc.";
	};

	Template.hello.events({
		'click input': function() {
			// template data, if any, is available in 'this'
			if (typeof console !== 'undefined') console.log("You pressed the button");
		}
	});
}

if (Meteor.isServer) {
	Meteor.startup(function() {
		// code to run on server at startup
		if (Meta.find().count() === 0) {
			var meta_data = [{
				name: "Demographic",
				fields: [{
					name: "Gender",
					type: "text"
				}, {
					name: "Age",
					type: "text"
				}]
			}, {
				name: "Vitals",
				fields: [{
					name: "Weight",
					type: "text"
				}, {
					name: "Blood Pressure",
					type: "text"
				}]
			}];
			for (var i = 0; i < meta_data.length; i++) {
				console.log(meta_data[i]);
				Meta.insert(meta_data[i]);
			}
		}

	});
}
