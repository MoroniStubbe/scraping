function el(path){
	let element = document;
	const segments = path.split(' ');
	let segment = segments[0];
	if(['head', 'body'].includes(segment)){
		element = document.querySelectorAll(':scope > ' + segment)[0];
	}
	else{
		if(segment[0] == '.'){
			element = element.getElementsByClassName(segment.slice(0, -1));
		}
		else{
			element = element.getElementById(segment);
		}
	}
	for(let i = 1; i < segments.length; i++){
		let splitSegment = segments[i].split(/(\d+)/);
		if(splitSegment[0] == ''){
			element = element.children[parseInt(splitSegment[1]) - 1];
		}
		else{
			let elements = element.querySelectorAll(':scope > ' + splitSegment[0]);
			if(!splitSegment[1]){
				element = elements[0];
			}
			else{
				element = elements[parseInt(splitSegment[1]) - 1];
			}
		}
	}
	return element;
}