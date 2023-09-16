//path = [id or class or index, index1, index2, ...]
function getElement(path) {
	let i = 0
	let element;
	if (typeof path[i] == 'string') {
		element = document.getElementById(path[i]);
		if (!element) {
			element = document.getElementsByClassName(path[i])[0];
			if(!element){
				return;
			}
		}
		i++;
	}
	if (path.length > 1) {
		for (i; i < path.length; i++) {
			element = element.childNodes[path[i]];
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

function getDuplicates(arr) {
	var elementCount = {};
	var result = [];

	// Count occurrences of each element in the array
	for (var i = 0; i < arr.length; i++) {
		var element = arr[i];
		if (elementCount[element] === undefined) {
			elementCount[element] = 1;
		} else {
			elementCount[element]++;
		}
	}

	// Iterate through the counts and add elements occurring more than once to the result
	for (var key in elementCount) {
		if (elementCount.hasOwnProperty(key) && elementCount[key] > 1) {
			result.push(key);
		}
	}

	return result;
}

function getDuplicateIds() {
	let elementsWithId = document.querySelectorAll('[id]');
	let ids = [];
	for (let i = 1; i < elementsWithId.length; i++) {
		ids.push(elementsWithId[i].id);
	}
	return getDuplicates(ids);
}


//gets an element's index within its parent childNodes
function getElementIndex(element) {
	let childNodes = element.parentElement.childNodes;
	for (let i = 0; i < childNodes.length; i++) {
		if (element == childNodes[i]) {
			return i;
		}
	}
}

function getPath(id = 'get') {
	let element = getElement([id]);
	if (!element || element.tagName == 'HTML') {
		return [];
	}
	let path = [];
	const uniqueClasses = getUniqueClasses();
	const duplicateIds = getDuplicateIds();
	let done = false;
	while (!done) {
		if (element.classList.length > 0) {
			for (let i = 0; i < element.classList.length; i++) {
				if (uniqueClasses.includes(element.classList[i])) {
					path.push(element.classList[i]);
					done = true;
					break;
				}
			}
		}
		if (done) {
			break;
		}
		path.push(getElementIndex(element));
		element = element.parentElement;
		if (element.id && !duplicateIds.includes(element.id)) {
			path.push(element.id);
			break;
		}
		if (element.tagName == 'HTML') {
			break;
		}
	}
	return path.reverse();
}

async function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}