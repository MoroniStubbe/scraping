//path = [id or class or index, index1, index2, ...]
function getElement(path) {
	let i = 0
	let element;
	if(typeof path[i] == 'string'){
		element = document.getElementById(path[i]);
		if(!element){
			element = document.getElementsByClassName(path[i])[0];
		}
		i++;
	}
	if(path.length > 1){
		for(i; i < path.length; i++){
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

//gets childNode index
function getElementIndex(element){
	let childNodes = element.parentElement.childNodes;
	for(let i = 0; i < childNodes.length; i++){
		if(element == childNodes[i]){
			return i;
		}
	}
}

function getPath(id = 'get') {
	let element = getElement([id]);
	if(!element){
		return;
	}
	let path = [];
	const uniqueClasses = getUniqueClasses();
	let done = false;
	while(!done){
		if(element.classList.length > 0){
			for(let i = 0; i < element.classList.length; i++){
				if(uniqueClasses.includes(element.classList[i])){
					path.push(element.classList[i]);
					done = true;
					break;
				}
			}
		}
		if(done){
			break;
		}
		else{
			path.push(getElementIndex(element));
		}
		if(element.parentElement == document){
			break;
		}
		if(element.parentElement.id){
			path.push(element.parentElement.id);
			break;
		}
		element = element.parentElement;
	}
	return path.reverse();
}