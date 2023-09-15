const allElements = document.querySelectorAll('*');
let longest = [];
allElements.forEach(function (element) {
	element.id = 'ohaufwbo';
	let path = getPath(element.id);
	if (path.length > longest.length) {
		longest = path;
	}
	element.removeAttribute('id');
});