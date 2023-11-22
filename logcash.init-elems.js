
const htmlElems = {};

window.htmlElems = htmlElems;
window.init = window.init || {};

function initPopup(elems) {

	elems.popupRemaining = document.createElement("div");
	elems.popupRemaining.className = "popup-remaining";

	elems.popupTopDiv = document.createElement("div");
	elems.popupTopDiv.className = "popup-top-div";
	
	elems.popupTopLeftText = document.createElement("p");
	elems.popupTopLeftText.className = "popup-top-left-text";
	elems.popupTopLeftText.innerText = "Logcash";

	elems.popupTopRightText = document.createElement("p");
	elems.popupTopRightText.className = "popup-top-right-text";
	elems.popupTopRightText.innerText = "msapin";

	elems.popupRemaining.appendChild(elems.popupTopDiv);
	elems.popupTopDiv.appendChild(elems.popupTopLeftText);
	elems.popupTopDiv.appendChild(elems.popupTopRightText);
	
	document.body.appendChild(elems.popupRemaining);
}

function initContainerLogcash(elems) {

	elems.containerLogcash = document.createElement("div");
	elems.containerLogcash.className = "container-logcash";
	elems.containerLogcash.style.display = "flex";
	elems.containerLogcash.style.alignItems = "center";

	elems.containerDivMonth = document.createElement("div");
	elems.containerDivMonth.style.display = "flex";
	elems.containerDivMonth.style.justifyContent = "space-between";

	elems.rowProgress = document.createElement("div");
	elems.rowProgress.className = "row-progress-bar";

	elems.sideProgress = document.createElement("div");
	elems.sideProgress.className = "side-progress";
	elems.textProgress = document.createElement("p");
	elems.sideProgress.className = "text-progress";
	elems.sideProgress.appendChild(elems.textProgress);

	initPopup(elems);

	elems.sideRemaining = document.createElement("div");
	elems.sideRemaining.className = "side-remaining";
	elems.textRemaining = document.createElement("p");
	elems.textRemaining.className = "text-remaining";
	// elems.sideRemaining.appendChild(elems.popupRemaining);
	elems.sideRemaining.appendChild(elems.textRemaining);
	elems.rowProgress.appendChild(elems.sideProgress);
	elems.rowProgress.appendChild(elems.sideRemaining);

	elems.oldLogTitle = getTitleLogtime();
	elems.h4Title = elems.oldLogTitle.cloneNode();
	elems.h4Title.innerText = "LOGTIME";
	elems.h4Title.style.margin = "0";
	elems.oldLogTitle.style.display = "none";

	elems.containerLogcash.appendChild(elems.h4Title);
	elems.containerLogcash.appendChild(elems.containerDivMonth);
	elems.containerLogcash.appendChild(elems.rowProgress);
}

function initDivMonths(elems) {

	var tmpMonth = [];

	for (var i = 0; i < months.nbMonth; i++)
	{
		const	tmpText = document.createElement("p");
		tmpText.className = "text-month";

		tmpText.style.color = "#8e8e8f";
		tmpText.style.cursor = "pointer";
		tmpText.style.borderRadius = "4px";
		tmpText.style.display = "flex";
		tmpText.style.justifyContent = "center";
		tmpText.style.alignItems = "center";
		tmpText.style.border = "2px solid rgba(0,0,0,0)";

		tmpMonth = document.createElement("div");
		tmpMonth.className = "div-month";
		if (i == months.indexArray)
			tmpMonth.style.display = "flex"
		else
			tmpMonth.style.display = "none"

		tmpMonth.appendChild(tmpText);
		elems.containerDivMonth.appendChild(tmpMonth)
	}
}

function setStyle(elems) {

	var bgColor = "#1e212a";
	let border, color;

	if (bgColor == "#1e212a" || "rgb(30, 33, 42)")
	{
		border = "2px solid #2d313c";
		color = "#f2f2f2";
	}
	else
	{
		border = "2px solid #e5e5e5";
		color = "#2c2c34";
	}

	elems.rowProgress.style.display = "flex";
	elems.rowProgress.style.flex = "1";
	elems.rowProgress.style.justifyContent = "space-between";
	elems.rowProgress.style.borderRadius = "4px";
	elems.rowProgress.style.border = border;

	elems.textProgress.style.color = color;
	elems.textProgress.style.pointerEvents = "none";

	elems.sideProgress.style.cursor = "pointer";
	elems.sideProgress.style.display = "flex";
	elems.sideProgress.style.justifyContent = "center";
	elems.sideProgress.style.alignItems = "center";
	elems.sideProgress.style.minWidth = "90px";
	elems.sideProgress.style.height = "100%";
	elems.sideProgress.style.borderRadius = "3px";
	
	elems.sideRemaining.style.display = "flex";
	elems.sideRemaining.style.justifyContent = "center";
	elems.sideRemaining.style.alignItems = "center";
	elems.sideRemaining.style.flex = "1";
	elems.sideRemaining.style.cursor = "pointer";

	elems.textRemaining.style.margin = "0";
	elems.textRemaining.style.color = "#8d8e8e";
	elems.textRemaining.style.pointerEvents = "none";

	popup.setStyle(elems);
}

init.generateContainerLogcash = function(elems) {

	initContainerLogcash(elems);
	initDivMonths(elems);
	setStyle(elems);
}
