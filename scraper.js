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
	// Get all elements with class attributes
	const elementsWithClasses = document.querySelectorAll("[class]");

	// Create an object to store class occurrences
	const classOccurrences = {};

	// Iterate through the elements and count class occurrences
	elementsWithClasses.forEach((element) => {
		const classes = element.getAttribute("class").split(" ");
		classes.forEach((className) => {
			classOccurrences[className] = (classOccurrences[className] || 0) + 1;
		});
	});

	// Filter class names that occur only once
	const uniqueClasses = Object.keys(classOccurrences).filter(
		(className) => classOccurrences[className] === 1
	);

	return uniqueClasses;
}