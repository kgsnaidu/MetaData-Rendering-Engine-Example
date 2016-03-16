var Form = Backbone.View.extend({
	initialize : function(){
	},
	render: function(url,name){
		var Data = $.getJSON(url, (function(data){
			this.initializeMeta(data, name);
		}).bind(this));
	},
	initializeMeta : function(data, name){
		var metaData;
		data.filter(function(item){
			(item.name == name)? metaData = item : metaData = metaData || undefined ;
		});
		this.metaData = metaData;
		this.createDom();
	},
	createDom : function(formElements, formName)
	{
			var metaData = this.metaData,
			title = document.createTextNode(metaData.title),
			header = document.createElement("h1"),
			form = document.createElement("form");
			header.appendChild(title);
			form.appendChild(header);
			form.name = metaData.name;

			_.each(metaData.elements, (function(element){
				form.appendChild(this.createFormElement(element));
			}).bind(this));

			this.$el.html(form);
	},
	createFormElement : function (element)
	{
		var labels = element.labels,
		labelName = document.createTextNode(element.labelName+": "),
		label = document.createElement("span"),
		div = document.createElement("div"),
		input = document.createElement("input");
		input.type = element.type;
		input.name = element.name;
		label.appendChild(labelName);
		div.appendChild(label);
		if(labels)
		{
			_.each(labels, function(labelName){
				var label = document.createElement("span");
				label.appendChild(document.createTextNode(labelName));
				div.appendChild(input.cloneNode(true));
				div.appendChild(label);
			});
		}
		else {
			div.appendChild(input);
		}

		return div;
	}
});

var form = new Form({el : '#formArea'});
form.render("./forms.json", "signUp");
