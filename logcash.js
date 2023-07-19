
const h4Title = document.querySelectorAll(".profile-title");

function getTitleLogtime()
{
	for (var i = 0; h4Title[i]; i++)
	{
		if (h4Title[i].innerText == "LOGTIME")
			return (h4Title[i]);
	}
}

function getLastMonth(index, short)
{
	const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
	const monthShort = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

	if (short == 0)
		return (monthShort[index]);
	else
		return (month[index]);
}

function updateValues()
{
	log.monthName = getLastMonth(log.monthIndex, 1);
	log.nbHourReq = getNumberHourRequired();
	if (!log.dev)
		getNumberHourDone();
	let timeFloat = log.nbHourDone + (log.nbMinDone / 60)

	log.nbHourRem = log.nbHourReq - log.nbHourDone;
	log.nbMinRem = log.nbMinReq - log.nbMinDone;
	log.pourcent = timeFloat / log.nbHourReq * 100;
	log.cashEarn = log.salary * (log.pourcent / 100);
	if (log.cashEarn > log.salary)
		log.cashEarn = log.salary;
	if (log.nbMinRem < 0)
	{
		log.nbMinRem += 60;
		log.nbHourRem--;
	}
	else if (log.nbMinRem >= 60)
	{
		log.nbMinRem -= 60;
		log.nbHourRem++;
	}
}

function generateLogcashDiv()
{
	const containerLogcash = document.createElement("div");
	containerLogcash.className = "container-logcash";
	
	const titleLogcash = document.createElement("h4");
	titleLogcash.innerText = "LOGCASH";
	titleLogcash.className = "profile-title";
	
	const textMonth = document.createElement("p");
	textMonth.className = "text-month";
	
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
	
	// containerLogcash.style.display = "flex";

	let oldLogTitle = getTitleLogtime();
	// let oldLogTitle = document.querySelector(".profile-title");
	let cloneNode = oldLogTitle.cloneNode();
	console.log(cloneNode);
	oldLogTitle.style.display = "none";

	containerLogcash.appendChild(cloneNode);
	containerLogcash.appendChild(textMonth);
	containerLogcash.appendChild(rowProgress);

	updateValues();
	textMonth.innerText = log.monthName;
	// textCash.innerText = log.cashEarn.toFixed(2) + "€";
	if (log.pourcent >= 100)
	{
		if (log.nbMinDone < 10)
			textProgress.innerText = log.nbHourDone + "h0" + log.nbMinDone + " / " + log.nbHourReq + "h00";
		else
			textProgress.innerText = log.nbHourDone + "h" + log.nbMinDone + " / " + log.nbHourReq + "h00";
		textRemaining.style.display = "none";
	}
	else
	{
		if (log.nbMinDone < 10)
			textProgress.innerText = log.nbHourDone + "h0" + log.nbMinDone ;
		else
		textProgress.innerText = log.nbHourDone + "h" + log.nbMinDone ;
		if (log.nbMinRem < 10)
			textRemaining.innerText = log.nbHourRem + "h0" + log.nbMinRem;
		else
			textRemaining.innerText = log.nbHourRem + "h" + log.nbMinRem;
	}
	let textPourcent = "  (" + Math.floor(log.pourcent) + "%)";
	textProgress.innerText += textPourcent;

	textMonth.style.padding = "0";
	// textMonth.style.margin = "0";
	textMonth.style.cursor = "pointer";
	textMonth.style.borderRadius = "2px";
	textMonth.style.color = "#8e8e8f";
	// textCash.style.padding = "0";
	// textCash.style.color = "#8e8e8f";
	
	// row progress style
	rowProgress.style.display = "flex";
	rowProgress.style.flex = "1";
	rowProgress.style.justifyContent = "space-between";
	
	if (!log.dev)
	{
		var mainNavbar = document.querySelector(".main-navbar");
		var style = window.getComputedStyle(mainNavbar,"");
		var bgColor = style.getPropertyValue("background-color");
	}
	else
		var bgColor = "#1e212a";

	if (bgColor == "#1e212a" || "rgb(30, 33, 42)")
	{
		rowProgress.style.border = "2px solid #2d313c";
		textProgress.style.color = "#f2f2f2";
	}
	else
	{
		rowProgress.style.border = "2px solid #e5e5e5";
		textProgress.style.color = "#2c2c34";
	}
	rowProgress.style.borderRadius = "3px";
	
	sideProgress.style.display = "flex";
	sideProgress.style.justifyContent = "center";
	sideProgress.style.alignItems = "center";
	sideProgress.style.minWidth = "70px";
	if (log.pourcent < 10)
		sideProgress.style.width = "70px";
	else if (log.pourcent > 90 && log.pourcent < 100)
		sideProgress.style.width = "90%";
	else
		sideProgress.style.width = log.pourcent + "%";

	// color gestion progress bar
	if (log.pourcent == 0)
		sideProgress.style.backgroundColor = "#252932";
	else
		sideProgress.style.backgroundColor = "rgba(0, 186, 188, " + (log.pourcent / 100) + ")";

	sideProgress.style.height = "100%";
	sideProgress.style.borderRadius = "3px 4px 4px 3px";
	textProgress.style.margin = "0";
	
	sideRemaining.style.display = "flex";
	sideRemaining.style.justifyContent = "center";
	sideRemaining.style.alignItems = "center";
	sideRemaining.style.flex = "1";

	textRemaining.style.margin = "0";
	textRemaining.style.color = "#8d8e8e";

	return (containerLogcash);
}

function getRatio(windowWidth) {
	
	if (windowWidth <= 480)
		return (windowWidth / 480);
	else if (windowWidth <= 770)
		return (windowWidth / 770);
	else if (windowWidth <= 990)
		return (windowWidth / 990);
	else if (windowWidth <= 1600)
		return (windowWidth / 1600);
	else if (windowWidth <= 3000)
		return (windowWidth / 3000);
	else
		return (1);
}

function resizeProgress() {
	var windowWidth = window.innerWidth;
	var containerLogcash = document.querySelector(".container-logcash");
	// var containerMonth = document.querySelector(".container-month");
	var rowProgressBar = document.querySelector(".row-progress-bar");
	var textMonth = document.querySelector(".text-month");
	// var textCash = document.querySelector(".text-cash");
	var textProgress = document.querySelector(".text-progress");
	var textRemaining = document.querySelector(".text-remaining");

	var ratio = getRatio(windowWidth);

	// console.log(containerLogcash);		/////////////////////////////////////////////
	rowProgressBar.style.height = (ratio * 30) + "px";
	// containerLogcash.style.margin = "-" + (ratio * 70) + "px 0 0 0";
	containerLogcash.style.display = "flex";
	// var smallText = ratio * 1;
	textMonth.style.fontSize = "0.9em";
	// textCash.style.fontSize = smallText + "em";
	// textMonth.style.padding = (ratio * 3) + "px " + (ratio * 8) + "px";
	// textCash.style.padding = (ratio * 3) + "px " + (ratio * 8) + "px";

	var smallMargin = ratio * 10;
	textMonth.style.margin = "0 " + smallMargin + "px 0 0";
	// textCash.style.margin = "0 " + smallMargin + "px 0 0";
	var bigText = ratio;
	textProgress.style.fontSize = bigText + "em";
	textRemaining.style.fontSize = bigText + "em";
	
	// if (windowWidth <= 480)
	// {
	// 	containerLogcash.style.margin = "-" + (ratio * 40) + "px 0 0 0";
	// }
	// else if (windowWidth <= 770)
	// {
	// 	containerLogcash.style.margin = "-" + (ratio * 60) + "px 0 0 0";
	// }
	// else if (windowWidth <= 990)
	// {
	// 	// containerLogcash.style.margin = "-" + (ratio * 75) + "px 0 0 0";
	// }
	// else if (windowWidth <= 1600)
	// {
	// 	containerLogcash.style.margin = "-" + (ratio * 60) + "px 0 0 0";
	// }
	// else if (windowWidth <= 3000)
	// {
	// 	// containerLogcash.style.margin = "-" + (ratio * 70) + "px 0 0 0";
	// }
	// else
	// {
	// 	// containerLogcash.style.margin = "-" + (ratio * 70) + "px 0 0 0";
	// }
}

function waitForAll(selector) {
    return new Promise(resolve => {
        if (document.querySelectorAll(selector).length != 0) {
            return resolve(document.querySelectorAll(selector));
        }
        const observer = new MutationObserver(mutations => {
            if (document.querySelectorAll(selector).length != 0) {
                resolve(document.querySelectorAll(selector));
                observer.disconnect();
            }
        });
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    });
}

function getNumberHourDone()
{
	var tmpHours = 0;
	var tmpMinutes = 0;
	var tmpMonth = getLastMonth(log.monthIndex, 0);

	for (var i = 0; i < log.elem.calendar.length - 1; i++)
	{
		if (!log.elem.calendar[i].nextSibling.firstElementChild)
		{
			let tmpSplit = log.elem.calendar[i].nextSibling.firstChild.data.split(' ')[0];
			
			if (tmpSplit == tmpMonth)
				break;
		}
	}
	while (log.elem.calendar[++i])
	{
		var tmpSplit = log.elem.calendar[i].getAttribute("data-original-title").split('h');
		tmpHours += parseInt(tmpSplit[0]);
		tmpMinutes += parseInt(tmpSplit[1]);

		if (tmpMinutes >= 60)
		{
			tmpHours++;
			tmpMinutes -= 60;
		}
	}
	log.nbHourDone = parseInt(tmpHours);
	log.nbMinDone = parseInt(tmpMinutes);
}

function getNumberHourRequired()
{
	const numHour2023 = [154,140,161,147,161,154,42,91,77,154,154,147];
	const numHour2024 = [161,147,147,154,161,140,91,84,77,161,147,154];

	if (log.yearIndex + 1900 == 2023)
		return (numHour2023[log.monthIndex]);
	else if (log.yearIndex + 1900 == 2024)
		return (numHour2024[log.monthIndex]);
}

async function changeColorPage(dev)
{
	const allContainer = document.querySelectorAll(".container-inner-item");
	const noteTitle = document.querySelectorAll(".note-title");
	const navbar = document.querySelector(".main-navbar");
	// const allG = document.querySelectorAll("g[data-original-title]");
	const progressBar = document.querySelector(".row-progress-bar");
	
	for(var i = 0; allContainer[i]; i++)
	{
		allContainer[i].style.backgroundColor = "#1d2028";
		allContainer[i].style.border = "1px solid #2d313c";
	}
	
	for (var i = 0; h4Title[i]; i++)
	{
		h4Title[i].style.color = "#eaeaeb";
	}

	for (var i = 0; noteTitle[i]; i++)
	{
		noteTitle[i].style.color = "rgb(65, 68, 74)";
	}
	if (!log.dev)
	{
		const allG = await waitForAll('g[data-original-title]');
		for (var i = 0; allG[i]; i++)
		{
			var style = window.getComputedStyle(allG[i].firstElementChild,"");
			var fillColor = style.getPropertyValue("fill");
	
			allG[i].firstElementChild.style.stroke = "#1d2028";
			if (fillColor == "rgb(250, 250, 250)")
				allG[i].firstElementChild.style.fill = "#242831";
		}
	}
	navbar.style.backgroundColor = "#1e212a";
	// progressBar.style.borderColor = "#1e212a";
	document.body.style.backgroundColor = "#131419";
}

function mOverMonth(e)
{
	devPos = document.querySelector(".dev-pos");
	e.target.style.backgroundColor = "rgb(0, 186, 188)";
	e.target.style.color = "white";

	containerLogcash = document.querySelector("#container-logcash");
	const containerSelection = document.createElement("div");
	containerSelection.style.backgroundColor = "white";
	containerSelection.style.width = "100%";
	containerSelection.style.height = e.target.parentElement.parentElement.clientHeight + "px";

	containerLogcash.children[0].style.display = "none";
	containerLogcash.appendChild(containerSelection);

	containerSelection.addEventListener("mouseleave", function () {
		containerLogcash.children[0].style.display = "";
		containerSelection.remove();
	});
}

function mOutMonth(e)
{
	e.target.style.backgroundColor = "";
	e.target.style.color = "#8e8e8f";
}

function clickMonth(e)
{
	containerLogcash = document.querySelector("#container-logcash");
	const containerSelection = document.createElement("div");
	containerSelection.style.backgroundColor = "white";
	containerSelection.style.width = "100%";
	containerSelection.style.height = e.target.parentElement.parentElement.clientHeight + "px";
	
	containerLogcash.appendChild(containerSelection);
	// console.log(containerLogcash.children);
	// containerLogcash.children[0].style.visibility = "hidden";
}

function mOverProgress(e)
{
	blocProgress = document.querySelector(".side-progress");
	var oldColor = window.getComputedStyle(blocProgress,"").getPropertyValue("background-color");
	var tmpSplit = oldColor.split(' ');
	var newAlpha = tmpSplit[3].replace(')', '');
	if ((parseInt(newAlpha) + 0.1) > 1)
		var newColor = "rgb(0, 189, 190)";
	else
		var newColor = tmpSplit[0] + " " + tmpSplit[1] + tmpSplit[2] + " " + (parseFloat(newAlpha) + 0.1) + ")";
	console.log(oldColor + "  " + newColor);
	blocProgress.style.backgroundColor = newColor;
	blocProgress.style.color = "white";
	

	// containerLogcash = document.querySelector("#container-logcash");
	// const containerSelection = document.createElement("div");
	// containerSelection.style.backgroundColor = "white";
	// containerSelection.style.width = "100%";
	// containerSelection.style.height = e.target.parentElement.parentElement.clientHeight + "px";
	
	// containerLogcash.children[0].style.display = "none";
	// containerLogcash.appendChild(containerSelection);
	
	blocProgress.addEventListener("mouseleave", function () {
		blocProgress.style.backgroundColor = oldColor;
		// containerLogcash.children[0].style.display = "";
		// containerSelection.remove();
	});
}

function initButtons()
{
	sideProgress = document.querySelector(".side-progress");
	// textMonth = document.querySelector(".text-month");

	// sideProgress.addEventListener("mouseover", mOverProgress);
	
	// textMonth.addEventListener("mouseover", mOverMonth);
	// textMonth.addEventListener("mouseout", mOutMonth);
	// textMonth.addEventListener("click", clickMonth);
}

async function fetchCalendar()
{
	const calendar = await waitForAll('g[data-original-title]');
	return Promise.resolve({
		calendar,
	})
}

async function initLogcash()
{
	var divLogtime;

	log.elem = await fetchCalendar();
	logCashDiv = generateLogcashDiv();
	if (log.dev)
		divLogtime = document.querySelector(".main-div");
	else
		divLogtime = document.querySelector("svg#user-locations").parentElement;
	divLogtime.insertBefore(logCashDiv, divLogtime.firstChild);
	// logCashDiv.style.display = "none";
	resizeProgress();
	window.addEventListener("resize", resizeProgress);
	initButtons();
	// logCashDiv.style.display = "";
}

var log = {
	elem: 0,
	dev: 0,
    monthIndex: new Date().getMonth(),
    yearIndex: new Date().getYear(),
    monthName: "",
	salary: 685,
	pourcent: 0.0,
	nbHourReq: 0,
	nbMinReq: 0,
	nbHourDone: 28,
	nbMinDone: 52,
	nbHourRem: 0,
	nbMinRem: 0,
	cashEarn: 0,
	time: 0,
}

// log.dev = 1;

if (log.dev)
{
	var refreshButton = document.querySelector(".dev-refresh");

	refreshButton.addEventListener("click", function() {
		location.reload();
	});
}

initLogcash(log.dev);

var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
if (isOpera)
{
	changeColorPage(log.dev);
}

