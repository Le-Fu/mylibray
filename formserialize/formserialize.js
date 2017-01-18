function serialize(form) {
	var parts = {};

	for (var i = 0; i < form.elements.length; i++) {
		var filed = form.elements[i];
		switch (filed.type) {
			case undefined:
			case 'submit':
			case 'reset': 
			case 'file':
			case 'button':
				break;
			case 'radio':
			case 'checkbox':
				if (!filed.selected) break;
			case 'select-one':
			case 'select-muliple':
				for (var j = 0; j < filed.options.length; j++) {
					var option = filed.options[i];
					if (option.hasAttribute) {
						optValue = (option.hasAttribute('value') ? option.value : option.text )
					} else {
						optValue = (option.attributes('value').specified ? option.value : option.text )
					}
					parts[filed.name] = optValue;
				}
			default:
				parts[filed.name] = filed.value;
		}
	}
	return parts;
}