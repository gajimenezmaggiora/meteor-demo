Meta = new Meteor.Collection("meta");
FormData = new Meteor.Collection("formdata");

if (Meteor.isClient) {
	// Template.hello.greeting = function() {
	// 	return "Welcome to edc.";
	// };

	// Template.hello.events({
	// 	'click input': function() {
	// 		// template data, if any, is available in 'this'
	// 		if (typeof console !== 'undefined') console.log("You pressed the button");
	// 	}
	// });
	Session.set('form', 'Demographic');
	var submitme = function() {
		form = {};

		$.each($('#myform')
			.serializeArray(), function() {
			form[this.name] = this.value;
		});

		//do validation on form={firstname:'first name', lastname: 'last name', email: 'email@email.com'}

		FormData.insert(form, function(err) {
			if (!err) {
				alert("Submitted!");
				$('#myform')[0].reset();
			} else {
				alert("Something is wrong");
				console.log(err);
			}
		});
	}

	Template.form.events({
		'submit': function() {
			submitme();
			event.preventDefault();
		}
	});

	Template.page.title = function() {
		return Session.get("form") || "";
	}

	Template.form.fields = function() {
		var fields = Meta.findOne({
			name: Session.get("form")
		});
		if (fields) {
			return fields["fields"];
		}
	};
}

if (Meteor.isServer) {
	Meteor.startup(function() {
		// code to run on server at startup
		if (Meta.find()
			.count() === 0) {
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
