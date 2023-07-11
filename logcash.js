document.body.style.border = "5px solid blue";

const h4Title = document.querySelectorAll(".profile-title");

function getDivLogtime()
{
	for (var i = 0; h4Title[i]; i++)
	{
		if (h4Title[i].innerText == "LOGTIME")
			return (h4Title[i].parentNode);
	}
}

function getLastMonth()
{

}

function generateLogcashDiv(divLogtime)
{
	const containerLogcash = document.createElement("div");
	// containerLogcash.className = "container-logcash";
	containerLogcash.style.height = "100%"
	
	const titleLogcash = document.createElement("h4");
	titleLogcash.innerText = "LOGCASH";
	titleLogcash.className = "profile-title";
	
	// generate container month
	const containerMonth = document.createElement("div");
	containerMonth.className = "container-month";
	
	// generate row top
	const rowTop = document.createElement("div");
	rowTop.className = "row-top";
	const textMonth = document.createElement("p");
	textMonth.className = "text-month";
	const textCash = document.createElement("p");
	textCash.className = "text-cash";
	rowTop.appendChild(textMonth);
	rowTop.appendChild(textCash);
	
	// generate row progress
	const rowProgress = document.createElement("div");
	rowProgress.className = "row-progress-bar";

	// generate side progress
	const sideProgress = document.createElement("div");
	sideProgress.className = "side-progress";
	const textProgress = document.createElement("p");
	textProgress.className = "text-progress";
	sideProgress.appendChild(textProgress);
	
	// generate side remaining
	const sideRemaining = document.createElement("div");
	sideRemaining.className = "side-remaining";
	const textRemaining = document.createElement("p");
	textRemaining.className = "text-remaining";
	sideRemaining.appendChild(textRemaining);
	
	rowProgress.appendChild(sideProgress);
	rowProgress.appendChild(sideRemaining);
	
	// generate row bottom
	const rowBottom = document.createElement("div");
	rowBottom.className = "row-bottom";
	const textBottom = document.createElement("p");
	textBottom.className = "text-bottom";
	rowBottom.appendChild(textBottom);

	containerMonth.appendChild(rowTop);
	containerMonth.appendChild(rowProgress);
	containerMonth.appendChild(rowBottom);
	// containerLogcash.appendChild(titleLogcash);
	containerLogcash.appendChild(containerMonth);


	// apply style
	// titleLogcash.style.margin = "20px 0 0 0";

	containerLogcash.style.margin = "-40px 0 0 0";
	// containerLogcash.style.margin = "20px 0 0 0";
	// containerLogcash.style.height = "100%";
	// containerLogcash.style.backgroundColor = "#1d2028";
	// containerLogcash.style.border = "1px solid #2d313c";
	// containerLogcash.style.borderRadius = "3px";
	// containerLogcash.style.padding = "20px 25px 25px 25px";
	
	containerMonth.style.width = "100%";
	containerMonth.style.padding = "0 20px";
	// containerMonth.style.margin = "0 0 20px 0";

	// row top style
	rowTop.style.display = "flex";
	rowTop.style.justifyContent = "space-between";
	rowTop.style.alignItems = "center";
	textMonth.style.padding = "0";
	textMonth.style.margin = "0 8px";
	textMonth.style.fontSize = "0.9em";
	textMonth.style.color = "#8e8e8f";
	textCash.style.padding = "0";
	textCash.style.margin = "0 8px";
	textCash.style.fontSize = "0.9em";
	textCash.style.color = "#8e8e8f";
	
	
	// row progress style
	rowProgress.style.display = "flex";
	rowProgress.style.justifyContent = "space-between";
	rowProgress.style.border = "2px solid #2d313c";
	rowProgress.style.height = "40px";
	rowProgress.style.borderRadius = "3px";
	rowProgress.style.margin = "8px 0";
	
	sideProgress.style.display = "flex";
	sideProgress.style.justifyContent = "center";
	sideProgress.style.alignItems = "center";
	sideProgress.style.minWidth = "30px";
	sideProgress.style.height = "100%";
	sideProgress.style.backgroundColor = "#252932";
	// text
	textProgress.style.margin = "0";
	textProgress.style.color = "#eaeaeb";
	
	sideRemaining.style.display = "flex";
	sideRemaining.style.justifyContent = "center";
	sideRemaining.style.alignItems = "center";
	sideRemaining.style.flex = "1";
	// text
	textRemaining.style.margin = "0";
	textRemaining.style.color = "#8d8e8e";
	
	
	// row bottom style
	rowBottom.style.display = "flex";
	rowBottom.style.justifyContent = "space-between";
	rowBottom.style.alignItems = "center";
	// text
	textBottom.style.padding = "0";
	textBottom.style.margin = "0 8px";
	textBottom.style.fontSize = "0.9em";
	textBottom.style.color = "#41444a";

	// write text
	textMonth.innerText = "July";
	textCash.innerText = "0€";
	textProgress.innerText = "0h";
	textRemaining.innerText = "120h";
	textBottom.innerText = "0% of required logtime";
	return (containerLogcash);
}
	
const divLogtime = getDivLogtime();

// divLogtime.style.backgroundColor = "#ffffff";
// divLogtime.style.removeProperty('max-height');

// divLogtime.appendChild(generateLogcashDiv(divLogtime));
// console.log(divLogtime.parentElement.parentElement);

// const cloneDiv = divLogtime.parentElement.cloneNode();
// cloneDiv.appendChild(generateLogcashDiv(cloneDiv));
 const cloneDiv = generateLogcashDiv(divLogtime);

// cloneCalendar = divLogtime.lastElementChild.cloneNode(true);
// divLogtime.parentElement.parentElement.appendChild(generateLogcashDiv(divLogtime));
console.log(cloneDiv);

divLogtime.appendChild(cloneDiv);
divLogtime.className = "";
divLogtime.style.margin = "20px 0 0 0";
divLogtime.style.height = "100%";
divLogtime.style.backgroundColor = "#1d2028";
divLogtime.style.border = "1px solid #2d313c";
divLogtime.style.borderRadius = "3px";
divLogtime.style.padding = "20px 25px 25px 25px";

// divLogtime.parentElement.parentElement.insertBefore(cloneDiv, divLogtime.parentElement.nextSibling);
