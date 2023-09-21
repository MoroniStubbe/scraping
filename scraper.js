function traverseChildNodes(element, callback, args, firstInstance = true, resultStack = []) {
	let result = callback(element, args)
	if(result)
	{
		resultStack.push(result);
	}
	for (let i = 0; i < element.childNodes.length; i++) {
		let child = element.childNodes[i];
		traverseChildNodes(child, callback, args, false, resultStack);
	}
	if(firstInstance){
		return resultStack;
	}
}

//path = [id or class or index, index1, index2, ...]
function getElement(path) {
	let i = 0
	let element;
	if (typeof path[i] == 'string') {
		element = document.getElementById(path[i]);
		if (!element) {
			element = document.getElementsByClassName(path[i])[0];
			if (!element) {
				return;
			}
		}
		i++;
	}
	if (path.length > 1) {
		for (i; i < path.length; i++) {
			//returns array of elements because multiple elements could contain the string
			if(typeof path[i] == 'string'){
				function getElementContainingString(element, string){
					for(let i2 = 0; i2 < element.childNodes.length; i2++){
						let childNode = element.childNodes[i2];
						if(childNode.nodeType === Node.TEXT_NODE){
							if(childNode.nodeValue.includes(string)){
								return element;
							}
						}
					}
				}
				return traverseChildNodes(element, getElementContainingString, path[i]);
			}
			else{
				element = element.childNodes[path[i]];
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

function bindToButton(func, pathToParent, name = '') {
	let parent = getElement(pathToParent);
	let button = document.createElement('button');
	if (name) {
		button.innerText = name;
	}
	else {
		button.innerText = func.name;
	}
	button.onclick = func;
	parent.append(button);
}

function removeGet() {
	let path = getPath();
	if (path.length > 0) {
		getElement(path).removeAttribute('id');
	}
}