
window.popup = window.popup || {};

function disableTextSelection() {

	document.body.style.MozUserSelect = "none";
	document.body.style.WebkitUserSelect = "none";
	document.body.style.KhtmlUserSelect = "none";
	document.body.style.MsUserSelect = "none";
	document.body.style.UserSelect = "none";
}

popup.initPopup = function(elems) {

	var mouseDown = false,
		popupOffset = [0, 0];

	disableTextSelection();
	elems.popupRemaining.addEventListener("mousedown", function(e) {
		mouseDown = true;
		popupOffset = [e.target.offsetLeft - e.clientX, e.target.offsetTop - e.clientY];
	})
	document.body.addEventListener("mousemove", function(e) {

		e.stopPropagation();
		if (mouseDown) {
			elems.popupRemaining.style.top = e.clientY + popupOffset[1] + "px";
			elems.popupRemaining.style.left = e.clientX + popupOffset[0] + "px";
		}
	})
	document.body.addEventListener("mouseup", function() {
		mouseDown = false;
	})
}
