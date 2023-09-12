function selectElements(selector) {
	let elements = [document];
	let elements2;
	let selectors = selector.split('/');
	let selectorI = 0;

	if (selectors[selectorI][0] == '#') {
		elements = [document.getElementById(selectors[selectorI].slice(1))];
		selectorI++;
	}

	for (selectorI; selectorI < selectors.length; selectorI++) {
		let selector = selectors[selectorI];
		let isClass = false;

		if (selector[0] == '.') {
			isClass = true;
			selector = selector.slice(1);
		}

		selector = selector.split('[');
		let arraySelector = [];

		if (selector.length == 2) {
			arraySelector = selector[1].slice(0, -1);
		}

		selector = selector[0];
		elements2 = [];

		for (let elementI = 0; elementI < elements.length; elementI++) {
			let element = elements[elementI];
			let matches;

			if (isClass) {
				matches = element.getElementsByClassName(selector);
			} else {
				matches = element.getElementsByTagName(selector);
			}

			if (arraySelector.length > 0) {
				matches = selectFromArray(matches, arraySelector);
			}

			elements2.push(...matches);
		}

		elements = elements2;
	}

	return elements;
}