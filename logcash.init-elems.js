
const htmlElems = {};

window.htmlElems = htmlElems;
window.init = window.init || {};

function initContainerLogcash(elems) {

	elems.containerLogcash = document.createElement("div");
	elems.containerLogcash.className = "container-logcash";
	elems.containerLogcash.style.display = "flex";
	// elems.containerLogcash.style.alignItems = "center";
	elems.containerLogcash.style.marginTop = "4px";

	elems.containerDivMonth = document.createElement("div");
	elems.containerDivMonth.style.display = "flex";
	elems.containerDivMonth.style.justifyContent = "space-between";

	elems.rowProgress = document.createElement("div");
	elems.rowProgress.className = "row-progress-bar";

	elems.sideProgress = document.createElement("div");
	elems.sideProgress.className = "side-progress";


	elems.miniLogtimePanel = document.createElement("div");
	elems.miniLogtimePanel.className = "mini-logtime-panel";

	elems.miniLogtimeBlockRemaining = document.createElement("div");
	elems.miniLogtimeBlockRemaining.className = "mini-logtime-block";
	elems.miniLogtimeBlockRemaining.style.marginRight = "4px";
	elems.miniLogtimeTitleRemaining = document.createElement("p");
	elems.miniLogtimeTitleRemaining.className = "mini-logtime-title";
	elems.miniLogtimeTitleRemaining.innerText = "Rem. Today";
	elems.miniLogtimeValueRemaining = document.createElement("p");
	elems.miniLogtimeValueRemaining.className = "mini-logtime-value";
	elems.miniLogtimeValueRemaining.innerText = "0h00";
	
	elems.miniLogtimeBlockLock = document.createElement("div");
	elems.miniLogtimeBlockLock.className = "mini-logtime-block";
	elems.miniLogtimeTitleLock = document.createElement("p");
	elems.miniLogtimeTitleLock.className = "mini-logtime-title";
	elems.miniLogtimeTitleLock.innerText = "Lock. Time";
	elems.miniLogtimeValueLock = document.createElement("p");
	elems.miniLogtimeValueLock.className = "mini-logtime-value";
	elems.miniLogtimeValueLock.innerText = "00:00";

	elems.miniLogtimeBlockRemaining.appendChild(elems.miniLogtimeTitleRemaining);
	elems.miniLogtimeBlockRemaining.appendChild(elems.miniLogtimeValueRemaining);

	elems.miniLogtimeBlockLock.appendChild(elems.miniLogtimeTitleLock);
	elems.miniLogtimeBlockLock.appendChild(elems.miniLogtimeValueLock);

	elems.miniLogtimePanel.appendChild(elems.miniLogtimeBlockRemaining);
	elems.miniLogtimePanel.appendChild(elems.miniLogtimeBlockLock);


	// elems.settingDiv = document.createElement("div");
	// elems.settingDiv.className = "setting-div";

	// elems.settingButton = document.createElement("div");
	// elems.settingButton.className = "setting-button";

	// elems.settingDiv.appendChild(elems.settingButton);

	// initPopup(elems);

	elems.sideRemaining = document.createElement("div");
	elems.sideRemaining.className = "side-remaining";
	elems.textRemaining = document.createElement("p");
	elems.textRemaining.className = "text-remaining";
	// elems.sideRemaining.appendChild(elems.popupRemaining);
	elems.sideRemaining.appendChild(elems.textRemaining);
	elems.rowProgress.appendChild(elems.sideProgress);
	elems.rowProgress.appendChild(elems.sideRemaining);
	// elems.rowProgress.appendChild(elems.miniLogtimePanel);
	// elems.rowProgress.appendChild(elems.settingDiv);
	
	elems.containerLogcash.appendChild(elems.containerDivMonth);
	elems.containerLogcash.appendChild(elems.rowProgress);
	elems.containerLogcash.appendChild(elems.miniLogtimePanel);
	// elems.containerLogcash.appendChild(elems.rowProgress);
}

function initDivMonths(elems, months) {

	elems.divMonths = [];
	elems.textMonths = [];

	for (var i = 0; i < months.nbMonth; i++)
	{
		var tmpMonth = document.createElement("div");
		tmpMonth.className = "this-button";
		tmpMonth.innerText = months[i].nameShort;
		if (i == months.indexArray)
		{
			tmpMonth.style.display = "flex";
			tmpMonth.style.color = "#191919";
			tmpMonth.style.backgroundColor = "white";
		}
		elems.divMonths.push(tmpMonth);
		elems.containerDivMonth.appendChild(tmpMonth);
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
	
	elems.sideProgress.style.color = "#f2f2f2";
	elems.sideProgress.style.display = "flex";
	elems.sideProgress.style.justifyContent = "center";
	elems.sideProgress.style.alignItems = "center";
	elems.sideProgress.style.textAlign = "center";
	elems.sideProgress.style.minWidth = "90px";
	elems.sideProgress.style.height = "100%";
	elems.sideProgress.style.borderRadius = "3px";
	elems.sideProgress.style.paddingTop = "2px";
	
	elems.sideRemaining.style.display = "flex";
	elems.sideRemaining.style.justifyContent = "center";
	elems.sideRemaining.style.alignItems = "center";
	elems.sideRemaining.style.flex = "1";
	
	elems.textRemaining.style.margin = "0";
	elems.textRemaining.style.color = "#8d8e8e";
	elems.textRemaining.style.pointerEvents = "none";
	elems.textRemaining.style.paddingTop = "4px";
}

init.generateContainerLogcash = function(elems, months, calendar) {

	initContainerLogcash(elems);
	initDivMonths(elems, months);
	setStyle(elems);
	popup.initPopup(elems, months);
}
