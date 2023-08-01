
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
	if (log.dev == 0)
		getNumberHourDone();
	let timeFloat = log.nbHourDone + (log.nbMinDone / 60)

	log.nbHourRem = log.nbHourReq - log.nbHourDone;
	log.nbMinRem = log.nbMinReq - log.nbMinDone;
	log.percent = timeFloat / log.nbHourReq * 100;
	log.cashEarn = log.salary * (log.percent / 100);
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
	const rowMonth = document.createElement("div");
	textMonth.className = "text-month";
	rowMonth.className = "row-month";
	
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

	let oldLogTitle = getTitleLogtime();
	let cloneNode = oldLogTitle.cloneNode();
	cloneNode.innerText = "LOGTIME";
	cloneNode.style.margin = "0";
	// console.log(cloneNode);
	oldLogTitle.style.display = "none";
	rowMonth.appendChild(textMonth);

	containerLogcash.appendChild(cloneNode);
	containerLogcash.appendChild(rowMonth);
	containerLogcash.appendChild(rowProgress);

	// rowMonth.style.flex = "1";

	// textMonth.style.padding = "0";
	textMonth.style.cursor = "pointer";
	textMonth.style.borderRadius = "4px";
	textMonth.style.color = "#8e8e8f";
	textMonth.style.display = "flex";
	textMonth.style.justifyContent = "center";
	textMonth.style.alignItems = "center";
	
	// row progress style
	rowProgress.style.display = "flex";
	rowProgress.style.flex = "1";
	rowProgress.style.justifyContent = "space-between";
	
	if (log.dev == 0)
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
		textMonth.style.border = "2px solid rgba(0,0,0,0)";
		// textMonth.style.borderColor = "#2d313c";
		// textMonth.style.borderStyle = "solid";
		// textMonth.style.borderWidth = "2px";
		textProgress.style.color = "#f2f2f2";
	}
	else
	{
		rowProgress.style.border = "2px solid #e5e5e5";
		textProgress.style.color = "#2c2c34";
	}
	rowProgress.style.borderRadius = "4px";
	// textMonth.style.borderRadius = "4px";
	
	sideProgress.style.cursor = "pointer";
	sideProgress.style.display = "flex";
	sideProgress.style.justifyContent = "center";
	sideProgress.style.alignItems = "center";
	sideProgress.style.minWidth = "90px";

	sideProgress.style.height = "100%";
	// sideProgress.style.borderRadius = "3px 4px 4px 3px";
	// sideProgress.style.borderRadius = "3px 8px 8px 3px";
	sideProgress.style.borderRadius = "3px";
	
	sideRemaining.style.display = "flex";
	sideRemaining.style.justifyContent = "center";
	sideRemaining.style.alignItems = "center";
	sideRemaining.style.flex = "1";

	textRemaining.style.margin = "0";
	textRemaining.style.color = "#8d8e8e";

	return (containerLogcash);
}

function reGenerate() {

	var textMonth = document.querySelector(".text-month");
	var textProgress = document.querySelector(".text-progress");
	var textRemaining = document.querySelector(".text-remaining");
	var sideProgress = document.querySelector(".side-progress");

	textMonth.innerText = log.monthName;
	var tmpProgress;
	
		// textCash.innerText = log.cashEarn.toFixed(2) + "€";
	if (log.percent >= 100)
	{
		if (log.switchHourCash == 0)
		{
			if (log.nbMinDone < 10)
				tmpProgress = log.nbHourDone + "h0" + log.nbMinDone + " / " + log.nbHourReq + "h00";
			else
				tmpProgress = log.nbHourDone + "h" + log.nbMinDone + " / " + log.nbHourReq + "h00";
		}
		else if (log.switchHourCash == 1)
			tmpProgress = log.cashEarn.toFixed(2) + "€";
		textRemaining.style.display = "none";
	}
	else
	{
		if (log.switchHourCash == 0)
		{
			if (log.nbMinDone < 10)
				tmpProgress = log.nbHourDone + "h0" + log.nbMinDone ;
			else
				tmpProgress = log.nbHourDone + "h" + log.nbMinDone ;
		}
		else if (log.switchHourCash == 1)
			tmpProgress = log.cashEarn.toFixed(2) + "€";
		if (log.nbMinRem < 10)
			textRemaining.innerText = log.nbHourRem + "h0" + log.nbMinRem;
		else
			textRemaining.innerText = log.nbHourRem + "h" + log.nbMinRem;
		textRemaining.style.display = "";
	}

	textProgress.innerText = tmpProgress;

	let textPercent = "  (" + Math.floor(log.percent) + "%)";
	textProgress.innerText += textPercent;

	if (log.percent < 10)
		sideProgress.style.width = "50px";
	else if (log.percent > 90 && log.percent < 100)
		sideProgress.style.width = "90%";
	else
		sideProgress.style.width = log.percent + "%";

	// color gestion progress bar
	if (log.percent == 0)
	{
		log.progressColor = "rgba(37, 41, 50, 0.8)";
		sideProgress.style.backgroundColor = log.progressColor;
	}
	else
	{
		log.progressColor = "rgba(0, 186, 188, " + (log.percent / 100) + ")";
		sideProgress.style.backgroundColor = log.progressColor;
	}
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
	var rowProgressBar = document.querySelector(".row-progress-bar");
	var textMonth = document.querySelector(".text-month");
	var rowMonth = document.querySelector(".row-month");
	var textProgress = document.querySelector(".text-progress");
	var textRemaining = document.querySelector(".text-remaining");

	var ratio = getRatio(windowWidth);

	rowProgressBar.style.height = (ratio * 30) + "px";
	containerLogcash.style.display = "flex";
	var smallMargin = ratio * 8;

	// textMonth.style.backgroundColor = "red";

	textMonth.style.fontSize = "0.9em";
	textMonth.style.padding = "0 10px";
	textMonth.style.height = (ratio * 30) + "px";
	// textMonth.style.margin = "auto";
	textMonth.style.margin = "auto " + smallMargin + "px auto " + "0";

	// rowMonth.style.backgroundColor = "blue";

	// rowMonth.style.height = (ratio * 30) + "px";
	rowMonth.style.margin = "auto 0" + "px auto " + (ratio * 16) + "px";

	var bigText = ratio;
	textProgress.style.fontSize = bigText + "em";
	textRemaining.style.fontSize = bigText + "em";
	textProgress.style.margin = 0;
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

async function changeColorPage()
{
	const allContainer = document.querySelectorAll(".container-inner-item");
	const noteTitle = document.querySelectorAll(".note-title");
	const navbar = document.querySelector(".main-navbar");
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
	document.body.style.backgroundColor = "#131419";
}

function mOverMonth(e)
{
	devPos = document.querySelector(".dev-pos");
	// e.target.style.backgroundColor = "rgb(0, 186, 188)";
	e.target.style.backgroundColor = log.progressColor;
	e.target.style.color = "white";
	e.target.style.border = "2px solid #2d313c";

	containerLogcash = document.querySelector(".container-logcash");
	rowMonth = document.querySelector(".row-month");
	// const containerSelection = document.createElement("div");
	// containerSelection.style.backgroundColor = "white";
	// containerSelection.style.width = "100%";
	// containerSelection.style.height = e.target.parentElement.parentElement.clientHeight + "px";

	rowMonth.style.backgroundColor = "white";
	rowMonth.style.height = e.target.parentElement.parentElement.clientHeight + "px";

	// containerLogcash.children[2].style.display = "none";
	// containerLogcash.appendChild(containerSelection);
	// rowMonth.style.flex = "1";
	
	rowMonth.addEventListener("mouseleave", function () {
		containerLogcash.children[2].style.display = "flex";
		// rowMonth.style.flex = "0";
		rowMonth.style.backgroundColor = "";
		// rowMonth.remove();
	});
}

function mOutMonth(e)
{
	e.target.style.backgroundColor = "";
	e.target.style.color = "#8e8e8f";
	e.target.style.border = "2px solid rgba(0,0,0,0)";
}

function clickMonth(e)
{
	containerLogcash = document.querySelector(".container-logcash");
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
	// var oldColor = window.getComputedStyle(blocProgress,"").getPropertyValue("background-color");
	var tmpSplit = log.progressColor.split(' ');
	var newAlpha = tmpSplit[3].replace(')', '');
	if ((parseInt(newAlpha) + 0.1) > 1)
		var newColor = "rgb(0, 189, 190)";
	else
		var newColor = tmpSplit[0] + " " + tmpSplit[1] + tmpSplit[2] + " " + (parseFloat(newAlpha) + 0.1) + ")";
	// console.log(oldColor + "  " + newColor);
	blocProgress.style.backgroundColor = newColor;
	blocProgress.style.color = "white";
	

	// containerLogcash = document.querySelector("#container-logcash");
	// const containerSelection = document.createElement("div");
	// containerSelection.style.backgroundColor = "white";
	// containerSelection.style.width = "100%";
	// containerSelection.style.height = e.target.parentElement.parentElement.clientHeight + "px";
	
	// containerLogcash.children[0].style.display = "none";
	// containerLogcash.appendChild(containerSelection);
	
	// blocProgress.addEventListener("mouseleave", function () {
	// 	blocProgress.style.backgroundColor = oldColor;
	// 	// containerLogcash.children[0].style.display = "";
	// 	// containerSelection.remove();
	// });
}

function mOutProgress(e) {
	var blocProgress = document.querySelector(".side-progress");
	// e.target.style.backgroundColor = log.progressColor;
	elems.blocProgress.style.backgroundColor = log.progressColor;
}

function clickProgress(e) {
	var blocProgress = document.querySelector(".side-progress");

	if (log.switchHourCash == 0)
		log.switchHourCash = 1;
	else if (log.switchHourCash == 1)
		log.switchHourCash = 0;
	reGenerate();
}

function initButtons()
{
	// var blocProgress = document.querySelector(".side-progress");
	elems.blocProgress = document.querySelector(".side-progress");
	elems.textProgress = document.querySelector(".text-progress");

	sideProgress = document.querySelector(".side-progress");
	textMonth = document.querySelector(".text-month");

	sideProgress.addEventListener("mouseover", mOverProgress);
	sideProgress.addEventListener("mouseout", mOutProgress);
	sideProgress.addEventListener("click", clickProgress);
	
	textMonth.addEventListener("mouseover", mOverMonth);
	textMonth.addEventListener("mouseout", mOutMonth);
	textMonth.addEventListener("click", clickMonth);
}

async function fetchCalendar()
{
	const calendar = await waitForAll('g[data-original-title]');
	return Promise.resolve({
		calendar,
	})
}

function getInfoMonth() {
	
	// console.log(log.elem.calendar.length);
	// for (var i = 0; i < log.elem.calendar.length; i++)
	// {
	// 	console.log(log.elem.calendar[i].nextSibling);

	// 	if (!log.elem.calendar[i].nextSibling.firstElementChild)
	// 	{
	// 		// let tmpSplit = log.elem.calendar[i].nextSibling.firstChild.data.split(' ')[0];
			
	// 		// if (tmpSplit == tmpMonth)
	// 		// 	break;
	// 		// console.log(tmpSplit[0]);
	// 	}
	// }

	for (var i = 0; i < log.elem.calendar.length - 1; i++)
	{
		if (!log.elem.calendar[i].nextSibling.firstElementChild)
		{
			console.log(log.elem.calendar[i].nextSibling.firstChild.data.split(' ')[0]);
			// let tmpSplit = log.elem.calendar[i].nextSibling.firstChild.data.split(' ')[0];
			
			// if (tmpSplit == tmpMonth)
			// 	break;
		}
	}
}

async function initLogcash()
{
	var divLogtime;

	logCashDiv = generateLogcashDiv();
	if (log.dev == 1)
	{
		// log.elem.calendar = document.querySelectorAll("g");
		log.elem = await fetchCalendar();
		divLogtime = document.querySelector(".main-div");
	}
	else
	{
		log.elem = await fetchCalendar();
		divLogtime = document.querySelector("svg#user-locations").parentElement;
	}

	// console.log(log.elem.length);
	getInfoMonth();

	// console.log(divLogtime);
	divLogtime.insertBefore(logCashDiv, divLogtime.firstChild);
	resizeProgress();
	updateValues();
	reGenerate();
	window.addEventListener("resize", resizeProgress);
	initButtons();
}

var log = {
	elem: 0,
	dev: 0,
    monthIndex: new Date().getMonth(),
    yearIndex: new Date().getYear(),
    monthName: "",
	salary: 685,
	percent: 0.0,
	nbHourReq: 0,
	nbMinReq: 0,
	nbHourDone: 25,
	nbMinDone: 0,
	nbHourRem: 0,
	nbMinRem: 0,
	cashEarn: 0,
	time: 0,
	switchHourCash: 0,
	progressColor: 0,

	nbMonth: 0,
}

var elems = {
	blocProgress: 0,
	textProgress: 0,
}

log.dev = 1;
// log.switchHourCash = 0;

if (log.dev == 1)
{
	var refreshButton = document.querySelector(".dev-refresh");

	refreshButton.addEventListener("click", function() {
		location.reload();
	});
}

initLogcash();

var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
if (isOpera)
{
	changeColorPage();
}

