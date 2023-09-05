

function getTitleLogtime()
{
	const h4Title = document.querySelectorAll(".profile-title");
	for (var i = 0; h4Title[i]; i++)
	{
		if (h4Title[i].innerText == "LOGTIME")
			return (h4Title[i]);
	}
}

function getMonth(index, short)
{
	const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
	const monthShort = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
	
	if (short == 0)
		return (monthShort[index]);
	else
		return (month[index]);
}

function updateValues(month)
{
	month.nbHourReq = getNumberHourRequired(month.monthIndex, month.yearIndex);
	// getNumberHourDone(month);

	let timeFloat = month.nbHourDone + (month.nbMinDone / 60)
	
	month.nbHourRem = month.nbHourReq - month.nbHourDone;
	month.nbMinRem = month.nbMinReq - month.nbMinDone;
	month.percent = timeFloat / month.nbHourReq * 100;
	month.cashEarn = month.salary * (month.percent / 100);
	if (month.cashEarn > month.salary)
		month.cashEarn = month.salary;
		if (month.nbMinRem < 0)
	{
		month.nbMinRem += 60;
		month.nbHourRem--;
	}
	else if (month.nbMinRem >= 60)
	{
		month.nbMinRem -= 60;
		month.nbHourRem++;
	}
	// console.log(month.nbHourDone);
}

function generateLogcashDiv()
{
	const containerLogcash = document.createElement("div");
	containerLogcash.className = "container-logcash";
	containerLogcash.style.display = "flex";
	containerLogcash.style.alignItems = "center";
	
	const titleLogcash = document.createElement("h4");
	titleLogcash.innerText = "LOGCASH";
	titleLogcash.className = "profile-title";
	
	const divMonth = document.createElement("div");
	const textMonth = document.createElement("p");
	textMonth.className = "text-month";
	divMonth.className = "div-month";
	
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
	elems.h4Title = oldLogTitle.cloneNode();
	elems.h4Title.innerText = "LOGTIME";
	elems.h4Title.style.margin = "0";
	oldLogTitle.style.display = "none";

	divMonth.appendChild(textMonth);

	containerLogcash.appendChild(elems.h4Title);
	containerLogcash.appendChild(divMonth);
	containerLogcash.appendChild(rowProgress);

	divMonth.style.display = "flex";
	divMonth.style.justifyContent = "center";
	divMonth.style.alignItems = "center";

	textMonth.style.color = "#8e8e8f";

	textMonth.style.cursor = "pointer";
	textMonth.style.borderRadius = "4px";
	textMonth.style.display = "flex";
	textMonth.style.justifyContent = "center";
	textMonth.style.alignItems = "center";
	textMonth.style.border = "2px solid rgba(0,0,0,0)";
	
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
		rowProgress.style.border = "2px solid #414555";
		divMonth.style.border = "2px solid rgba(0,0,0,0)";
		textProgress.style.color = "#f2f2f2";
	}
	else
	{
		rowProgress.style.border = "2px solid #e5e5e5";
		textProgress.style.color = "#2c2c34";
	}
	rowProgress.style.borderRadius = "4px";
	
	sideProgress.style.cursor = "pointer";
	sideProgress.style.display = "flex";
	sideProgress.style.justifyContent = "center";
	sideProgress.style.alignItems = "center";
	sideProgress.style.minWidth = "90px";

	sideProgress.style.height = "100%";
	sideProgress.style.borderRadius = "3px";
	
	sideRemaining.style.display = "flex";
	sideRemaining.style.justifyContent = "center";
	sideRemaining.style.alignItems = "center";
	sideRemaining.style.flex = "1";

	textRemaining.style.margin = "0";
	textRemaining.style.color = "#8d8e8e";

	return (containerLogcash);
}

function reGenerate(month) {

	var textMonth = document.querySelector(".text-month");
	var textProgress = document.querySelector(".text-progress");
	var textRemaining = document.querySelector(".text-remaining");
	var sideProgress = document.querySelector(".side-progress");

	textMonth.innerText = month.nameLong;
	var tmpProgress;

	if (month.percent >= 100)
	{
		if (month.switchHourCash == 0)
		{
			if (month.nbMinDone < 10)
				tmpProgress = month.nbHourDone + "h0" + month.nbMinDone + " / " + month.nbHourReq + "h00";
			else
				tmpProgress = month.nbHourDone + "h" + month.nbMinDone + " / " + month.nbHourReq + "h00";
		}
		else if (month.switchHourCash == 1)
			tmpProgress = month.cashEarn.toFixed(2) + "€";
		textRemaining.style.display = "none";
	}
	else
	{
		if (month.switchHourCash == 0)
		{
			if (month.nbMinDone < 10)
				tmpProgress = month.nbHourDone + "h0" + month.nbMinDone ;
			else
				tmpProgress = month.nbHourDone + "h" + month.nbMinDone ;
		}
		else if (month.switchHourCash == 1)
			tmpProgress = month.cashEarn.toFixed(2) + "€";
		if (month.nbMinRem < 10)
			textRemaining.innerText = month.nbHourRem + "h0" + month.nbMinRem;
		else
			textRemaining.innerText = month.nbHourRem + "h" + month.nbMinRem;
		textRemaining.style.display = "";
	}

	textProgress.innerText = tmpProgress;

	let textPercent = "  (" + Math.floor(month.percent) + "%)";
	textProgress.innerText += textPercent;

	if (month.percent < 10)
		sideProgress.style.width = "50px";
	else if (month.percent > 90 && month.percent < 100)
		sideProgress.style.width = "90%";
	else
		sideProgress.style.width = month.percent + "%";

	// color gestion progress bar
	if (month.percent == 0)
	{
		month.progressColor = "rgba(37, 41, 50, 0.8)";
		sideProgress.style.backgroundColor = month.progressColor;
	}
	else
	{
		month.progressColor = "rgba(0, 186, 188, " + (month.percent / 100) + ")";
		sideProgress.style.backgroundColor = month.progressColor;
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
	var divMonth = document.querySelector(".div-month");
	var textProgress = document.querySelector(".text-progress");
	var textRemaining = document.querySelector(".text-remaining");

	var ratio = getRatio(windowWidth);

	rowProgressBar.style.height = (ratio * 30) + "px";
	containerLogcash.style.display = "flex";
	var smallMargin = ratio * 6;
	textMonth.style.fontSize = "0.9em";
	textMonth.style.padding = "0 10px";
	textMonth.style.height = (ratio * 30) + "px";
	textMonth.style.margin = "0 " + smallMargin + "px 0 0";

	divMonth.style.margin = "0 0 0 " + (ratio * 16) + "px";

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

function getNumberHourDone(month)
{
	var tmpHours = 0;
	var tmpMinutes = 0;
	var i = -1;

	while (calendar.elems[++i])
	{
		if (!calendar.elems[i].firstElementChild)
		{
			let tmpSplit = calendar.elems[i].firstChild.data.split(' ')[0];
			
			if (tmpSplit == month.nameShort)
				break;
		}
	}
	// console.log(calendar.elems[i]);
	while (calendar.elems[++i])
	{
		if (calendar.elems[i].firstElementChild)
		{
			var tmpSplit = calendar.elems[i].getAttribute("data-original-title").split('h');
			// console.log(tmpSplit);
			tmpHours += parseInt(tmpSplit[0]);
			tmpMinutes += parseInt(tmpSplit[1]);

			// console.log("tmpHours: " + tmpHours + " hourDone: " + month.nbHourDone);

			if (tmpMinutes >= 60)
			{
				tmpHours++;
				tmpMinutes -= 60;
			}
		}
		else
			break ;
	}
	month.nbHourDone = parseInt(tmpHours);
	month.nbMinDone = parseInt(tmpMinutes);

	// console.log("tmpHours: " + tmpHours + " hourDone: " + month.nbHourDone);
}

function getNumberHourRequired(monthIndex, yearIndex)
{
	const numHour2023 = [154,140,161,147,161,154,42,91,77,154,154,147];
	const numHour2024 = [161,147,147,154,161,140,91,84,77,161,147,154];

	if (yearIndex + 1900 == 2023)
		return (numHour2023[monthIndex]);
	else if (yearIndex + 1900 == 2024)
		return (numHour2024[monthIndex]);
}

async function changeColorPage()
{
	const allContainer = document.querySelectorAll(".container-inner-item");
	const noteTitle = document.querySelectorAll(".note-title");
	const navbar = document.querySelector(".main-navbar");
	const progressBar = document.querySelector(".row-progress-bar");
	// const logTitle = getTitleLogtime();
	const h4Title = document.querySelectorAll(".profile-title");
	const h4 = document.querySelectorAll("h4");
	
	elems.h4Title.style.color = "rgb(234, 234, 235)";
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
	// if (!log.dev)
	// {
		const allG = await waitForAll('g[data-original-title]');

		// console.log(allG.length);
		for (var i = 0; allG[i]; i++)
		{
			var style = window.getComputedStyle(allG[i].firstElementChild,"");
			var fillColor = style.getPropertyValue("fill");
	
			allG[i].firstElementChild.style.stroke = "#1d2028";
			if (fillColor == "rgb(250, 250, 250)")
				allG[i].firstElementChild.style.fill = "#242831";
		}
	// }
	if (navbar)
		navbar.style.backgroundColor = "#1e212a";
	document.body.style.backgroundColor = "#131419";
}

function mOverMonth(e)
{
	devPos = document.querySelector(".dev-pos");
	// e.target.style.backgroundColor = "rgb(0, 186, 188)";
	e.target.style.backgroundColor = months[months.indexArray].progressColor;
	e.target.style.color = "white";
	e.target.style.border = "2px solid #2d313c";

	// containerLogcash = document.querySelector("#container-logcash");
	// const containerSelection = document.createElement("div");

	// const tmpJune = document.createElement("p");
	// tmpJune.innerText = "June";

	containerLogcash = document.querySelector(".container-logcash");
	divMonth = document.querySelector(".div-month");

	divMonth.style.backgroundColor = "white";
	// divMonth.style.height = e.target.parentElement.parentElement.clientHeight + "px";

	divMonth.addEventListener("mouseleave", function () {
		// containerLogcash.children[2].style.display = "flex";
		// divMonth.style.flex = "0";
		divMonth.style.backgroundColor = "";
		// divMonth.remove();
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
	// containerLogcash = document.querySelector("#container-logcash");
	// const containerSelection = document.createElement("div");
	// containerSelection.style.backgroundColor = "white";
	// containerSelection.style.width = "100%";
	// containerSelection.style.height = e.target.parentElement.parentElement.clientHeight + "px";
	
	// containerLogcash.appendChild(containerSelection);
	// console.log(containerLogcash.children);
	// containerLogcash.children[0].style.visibility = "hidden";
}

function mOverProgress(e)
{
	blocProgress = document.querySelector(".side-progress");
	// var oldColor = window.getComputedStyle(blocProgress,"").getPropertyValue("background-color");
	var tmpSplit = months[months.indexArray].progressColor.split(' ');
	var newAlpha = tmpSplit[3].replace(')', '');

	if ((parseInt(newAlpha) + 0.1) > 1)
		var newColor = "rgb(0, 189, 190)";
	else
		var newColor = tmpSplit[0] + " " + tmpSplit[1] + tmpSplit[2] + " " + (parseFloat(newAlpha) + 0.1) + ")";
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
	elems.blocProgress.style.backgroundColor = months[months.indexArray].progressColor;
}

function clickProgress(e) {
	var blocProgress = document.querySelector(".side-progress");
	// var	tmpIndex = log.indexMonthDisplay - months.nbMonth - 1;

	if (months[months.indexArray].switchHourCash == 0)
		months[months.indexArray].switchHourCash = 1;
	else if (months[months.indexArray].switchHourCash == 1)
		months[months.indexArray].switchHourCash = 0;
	reGenerate(months[months.indexArray]);
}

function getInfoMonth() {

	if (elems.textMonth.length > 3)
		months.nbMonth = 4;
	else
		months.nbMonth = elems.textMonth.length;

	var array = Array(months.nbMonth);
	array.nbMonth = months.nbMonth;
	array.indexDisplay = new Date().getMonth(),
	array.indexArray = array.indexDisplay - array.nbMonth - 1;

	var indexMonth = -1;
	for (var i = 0; i < months.nbMonth; i++)
	{
		var tmpMonth = {
			nameLong: "",
			nameShort: "",
			monthIndex: new Date().getMonth(),
			yearIndex: new Date().getYear(),
			percent: 0.0,
			nbHourReq: 0,
			nbMinReq: 0,
			nbHourDone: 0,
			nbMinDone: 0,
			nbHourRem: 0,
			nbMinRem: 0,
			salary: 685,
			cashEarn: 0,
			time: 0,
			switchHourCash: 0,
			progressColor: 0,
		};

		indexMonth++;
		tmpMonth.monthIndex -= (months.nbMonth - indexMonth - 1);
		if (tmpMonth.monthIndex < 0)
		{
			tmpMonth.yearIndex--;
			tmpMonth.monthIndex = 12 - (months.nbMonth - indexMonth - 1);
		}
		tmpMonth.nameLong = getMonth(tmpMonth.monthIndex, 1);
		tmpMonth.nameShort = getMonth(tmpMonth.monthIndex, 0);

		var tmpSplit = elems.textMonth[i].textContent.split('(')[1].split(')')[0].split('h');
		tmpMonth.nbHourDone = parseInt(tmpSplit[0]);
		tmpMonth.nbMinDone = parseInt(tmpSplit[1]);
		updateValues(tmpMonth);

		console.log(tmpMonth.nameLong + " " + tmpMonth.monthIndex + " " + tmpMonth.yearIndex + 
		" hourRequired: " + tmpMonth.nbHourReq + " hourDone: " + tmpMonth.nbHourDone + " minDone: " + tmpMonth.nbMinDone);
		array[indexMonth] = tmpMonth;
	}
	return (array);
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

function notDublicates(ltMonths) {
	if (ltMonths.length > 1)
	{
		arr = Array.from(ltMonths).map(val=>val.textContent).sort();
		return (arr[0] !== arr[1]);
	}
	return (false);
}

function waitForLogTimesChartToLoad(ltSvg) {
	const ltDays = ltSvg.getElementsByTagName("g");
	const ltMonths = ltSvg.querySelectorAll("svg > text");
	if (ltDays.length == 0 || ltMonths.length == 0 || notDublicates(ltMonths)) {
		// logtimes chart hasn't finished loading yet, try again in 100ms
		setTimeout(function() {
			waitForLogTimesChartToLoad(ltSvg);
		}, 100);
		return false;
	}
}

async function fetchCalendar()
{
	// const calendar = await waitForAll('g[data-original-title]');
	// const calendar = await waitForAll('svg[data-url]');
	// const elems = await waitForAll('svg[data-url] > *');
	// return Promise.resolve({
	// 	elems,
	// })
	const ltSvg = document.getElementById("user-locations");
	if (ltSvg) { // check if logtimes chart is on page
		waitForLogTimesChartToLoad(ltSvg);
	}
	elems.textMonth = ltSvg.querySelectorAll("svg > text");
}

async function initLogcash()
{
	var divLogtime;

	logCashDiv = generateLogcashDiv();
	calendar = await fetchCalendar();

	divLogtime = document.querySelector("svg#user-locations").parentElement;	
	months = getInfoMonth();

	divLogtime.insertBefore(logCashDiv, divLogtime.firstChild);
	resizeProgress();

	reGenerate(months[months.indexArray]);
	window.addEventListener("resize", resizeProgress);
	initButtons();
}

var log = {
	dev: 0,
	indexMonthDisplay: new Date().getMonth(),
}

var elems = {
	blocProgress: 0,
	textProgress: 0,
	h4Title: 0,
	textMonth: 0,
}

var calendar = {
	elems: 0,
}

var months = {
	months: 0,
	nbMonth: 0,
}

log.dev = 1;

if (log.dev == 1)
{
	var refreshButton = document.querySelector(".dev-refresh");

	if (refreshButton)
	{
		refreshButton.addEventListener("click", function() {
			location.reload();
		});
	}
}

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

async function delayedInit() {

	await sleep(1000);
	initLogcash();

	var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
	if (isOpera)
	{
		changeColorPage();
	}
}

delayedInit();
