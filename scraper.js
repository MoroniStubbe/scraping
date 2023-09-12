function el(path) {
	let element = document;
	const segments = path.split(' ');
	let segment = segments[0];
	if (['head', 'body'].includes(segment)) {
		element = document.querySelectorAll(':scope > ' + segment)[0];
	}
	else {
		if (segment[0] == '.') {
			element = element.getElementsByClassName(segment.slice(0, -1));
		}
		else {
			element = element.getElementById(segment);
		}
	}
	for (let i = 1; i < segments.length; i++) {
		let splitSegment = segments[i].split(/(\d+)/);
		if (splitSegment[0] == '') {
			element = element.children[parseInt(splitSegment[1]) - 1];
		}
		else {
			let elements = element.querySelectorAll(':scope > ' + splitSegment[0]);
			if (!splitSegment[1]) {
				element = elements[0];
			}
			else {
				element = elements[parseInt(splitSegment[1]) - 1];
			}
		}
	}
	return element;
}

function getUniqueClasses() {
	const elementsWithClasses = document.querySelectorAll("[class]");
	const classOccurrences = {};
	elementsWithClasses.forEach((element) => {
		const classes = element.getAttribute("class").split(" ");
		classes.forEach((className) => {
			classOccurrences[className] = (classOccurrences[className] || 0) + 1;
		});
	});
	const uniqueClasses = Object.keys(classOccurrences).filter(
		(className) => classOccurrences[className] === 1
	);
	return uniqueClasses;
}

function getPath(id) {
	const uniqueClasses = getUniqueClasses();
	let path = '';
	let done = false;
	let element = el(id);
	let skipIdCheck = true;
	while (!done) {
		if (!skipIdCheck && element.id) {
			path = element.id + ' ' + path;
			break;
		}
		skipIdCheck = false;
		let classes = element.getAttribute('class');
		if (classes) {
			classes = classes.split(' ');
			for (const className of classes) {
				if (uniqueClasses.includes(className)) {
					done = true;
					path = '.' + className + ' ' + path;
					break;
				}
			}
		}
		if (done) {
			break;
		}
		const siblings = Array.from(element.parentElement.children).filter((child) => child.tagName === element.tagName);
		index = siblings.indexOf(element);
		let tagName = element.tagName.toLowerCase();
		if (index > 0) {
			tagName += (index + 1).toString();
		}
		path = tagName + ' ' + path;
		element = element.parentElement;
		if (element.tagName === 'HTML') {
			done = true;
		}
	}
	path = path.slice(0, -1);
	return path;
}