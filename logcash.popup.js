
window.popup = window.popup || {};

popup.createElems = function(elems) {

	elems.popupRemaining = document.createElement("div");
	elems.popupRemaining.className = "popup-remaining";

	elems.popupTopDiv = document.createElement("div");
	elems.popupTopDiv.className = "popup-top-div";
	
	elems.popupTopLeftText = document.createElement("p");
	elems.popupTopLeftText.className = "popup-top-left-text";
	elems.popupTopLeftText.innerText = "Logcash";

	elems.popupTopRightText = document.createElement("p");
	elems.popupTopRightText.className = "popup-top-right-text";
	// elems.popupTopRightText.innerText = "msapin";

	elems.popupRemaining.appendChild(elems.popupTopDiv);
	elems.popupTopDiv.appendChild(elems.popupTopLeftText);
	elems.popupTopDiv.appendChild(elems.popupTopRightText);
	
	// console.log(elems.popupRemaining);
	document.body.appendChild(elems.popupRemaining);
}

function disableTextSelection() {

	document.body.style.MozUserSelect = "none";
	document.body.style.WebkitUserSelect = "none";
	document.body.style.KhtmlUserSelect = "none";
	document.body.style.MsUserSelect = "none";
	document.body.style.UserSelect = "none";
}

popup.setStyle = function(elems) {

	elems.popupRemaining.style.opacity = "1"; // set to zero
	elems.popupRemaining.style.display = "flex";
	elems.popupRemaining.style.position = "absolute";
	elems.popupRemaining.style.height = "100px";
	elems.popupRemaining.style.width = "fit-content";
	elems.popupRemaining.style.borderRadius = "4px";
	elems.popupRemaining.style.zIndex = "1000";
	elems.popupRemaining.style.backgroundColor = "#252932";
	elems.popupRemaining.style.border = "1px solid #2d313c";
	elems.popupRemaining.style.boxShadow = "0px 10px 15px #12141a3a";

	elems.popupRemaining.style.top = "60px"; // remove
	elems.popupRemaining.style.left = "20px"; // remove
	
	elems.popupTopDiv.style.cursor = "move";
	elems.popupTopDiv.style.height = "fit-content";
	elems.popupTopDiv.style.width = "100%";
	elems.popupTopDiv.style.borderRadius = "4px";
	elems.popupTopDiv.style.borderBottom = "1px solid #2d313c";
	elems.popupTopDiv.style.display = "flex";
	elems.popupTopDiv.style.flexDirection = "column";
	elems.popupTopDiv.style.justifyContent = "flex-start";
	elems.popupTopDiv.style.color = "#9b9b9b";
	// elems.popupTopDiv.style.padding = "6px 30px 6px 6px";
	elems.popupTopDiv.style.whiteSpace = "nowrap";

	elems.popupTopLeftText.style.color = "#e2e2e2";
	elems.popupTopLeftText.style.fontSize = "0.9em";
	elems.popupTopLeftText.style.fontWeight = "bold";
	elems.popupTopLeftText.style.pointerEvents = "none";
	// elems.popupTopLeftText.style.margin = "0 0 2px 0";
	// elems.popupTopLeftText.style.padding = "0 1px";
	elems.popupTopLeftText.style.textShadow = "rgb(0, 0, 0) 0px 0px 3px";
	
	// elems.popupTopRightText.style.color = "#9b9b9b";
	elems.popupTopRightText.style.fontSize = "0.7em";
	
	// elems.popupTopRightText.style.margin = "0";
	// elems.popupTopRightText.style.padding = "2px 1px 2px 2px";
	// elems.popupTopRightText.style.pointerEvents = "none";
	// elems.popupTopRightText.style.pointerEvents = "pointerenter";
	elems.popupTopRightText.style.textShadow = "rgb(0, 0, 0) 0px 0px 3px";
}

function setData(elems) {

	elems.popupTopRightText.innerText = data.student.pseudo;
}

popup.initPopup = function(elems) {

	var mouseDown = false,
		popupOffset = [0, 0];

	popup.createElems(elems);
	popup.setStyle(elems);
	setData(elems);
	disableTextSelection();
	elems.popupTopDiv.addEventListener("mousedown", function(e) {
		mouseDown = true;
		popupOffset = [elems.popupRemaining.offsetLeft - e.clientX, elems.popupRemaining.offsetTop - e.clientY];
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
