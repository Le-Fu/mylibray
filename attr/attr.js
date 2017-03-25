function attr(elem, name, val) {
	if (!name || name.constructor !== String) {return '';}

	name = {'for': 'htmlFor', 'class': 'className'}[name] || name;

	if (typeof value !== 'undefined') {
		elem[name] = val;

		if (elem.setAttribute) {
			elem.setAttribute(name, val);
		}
	}

	return elem[name] || elem.getAttribute(name) || '';
}