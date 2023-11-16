
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
	let timeFloat = month.nbHourDone + (month.nbMinDone / 60)
	
	month.nbHourRem = month.nbHourReq - month.nbHourDone;
	month.nbMinRem = month.nbMinReq - month.nbMinDone;
	month.percent = timeFloat / month.nbHourReq * 100;
	month.cashEarn = month.salary * (month.percent / 100);

	// console.log(month.percent);

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
}

function generateLogcashDiv()
{
	// const elems.containerLogcash = document.createElement("div");
	// elems.containerLogcash = document.createElement("div");
	// elems.containerLogcash.className = "container-logcash";
	// elems.containerLogcash.style.display = "flex";
	// elems.containerLogcash.style.alignItems = "center";
	
	// const titleLogcash = document.createElement("h4");
	// titleLogcash.innerText = "LOGCASH";
	// titleLogcash.className = "profile-title";
	
	// elems.containerDivMonth = document.createElement("div");
	// elems.containerDivMonth.style.display = "flex";
	// elems.containerDivMonth.style.justifyContent = "space-between";

	// var	arrayDivMonth = Array(months.nbMonth);

	// for (var i = 0; i < months.nbMonth; i++)
	// {
	// 	const	tmpText = document.createElement("p");
	// 	tmpText.className = "text-month";

	// 	tmpText.style.color = "#8e8e8f";
	// 	tmpText.style.cursor = "pointer";
	// 	tmpText.style.borderRadius = "4px";
	// 	tmpText.style.display = "flex";
	// 	tmpText.style.justifyContent = "center";
	// 	tmpText.style.alignItems = "center";
	// 	tmpText.style.border = "2px solid rgba(0,0,0,0)";

	// 	arrayDivMonth[i] = document.createElement("div");
	// 	arrayDivMonth[i].className = "div-month";
	// 	if (i == months.indexArray)
	// 		arrayDivMonth[i].style.display = "flex"
	// 	else
	// 		arrayDivMonth[i].style.display = "none"

	// 	arrayDivMonth[i].appendChild(tmpText);
	// 	elems.containerDivMonth.appendChild(arrayDivMonth[i])
	// }
	
	// // generate row progress
	// const rowProgress = document.createElement("div");
	// rowProgress.className = "row-progress-bar";

	// generate side progress
	// const sideProgress = document.createElement("div");
	// sideProgress.className = "side-progress";
	// const textProgress = document.createElement("p");
	// textProgress.className = "text-progress";
	// sideProgress.appendChild(textProgress);
	
	// // generate side remaining
	// elems.popupRemaining = document.createElement("div");
	// elems.popupRemaining.className = "popup-remaining";
	// elems.popupRemaining.style.display = "none";
	// // elems.popupRemaining.style.display = "flex";
	// elems.popupRemaining.style.position = "absolute";
	// elems.popupRemaining.style.height = "100px";
	// elems.popupRemaining.style.borderRadius = "4px";
	// elems.popupRemaining.style.top = "40px";
	// elems.popupRemaining.style.right = "0px";
	// elems.popupRemaining.style.cursor = "move";
	// elems.popupRemaining.style.zIndex = "1";
	// elems.popupRemaining.style.background = "rgb(45, 49, 60)";

	// const sideRemaining = document.createElement("div");
	// sideRemaining.className = "side-remaining";
	// const textRemaining = document.createElement("p");
	// textRemaining.className = "text-remaining";
	// sideRemaining.appendChild(elems.popupRemaining);
	// sideRemaining.appendChild(textRemaining);
	// rowProgress.appendChild(sideProgress);
	// rowProgress.appendChild(sideRemaining);

	// let oldLogTitle = getTitleLogtime();
	// elems.h4Title = oldLogTitle.cloneNode();
	// elems.h4Title.innerText = "LOGTIME";
	// elems.h4Title.style.margin = "0";
	// oldLogTitle.style.display = "none";

	// elems.containerLogcash.appendChild(elems.h4Title);
	// elems.containerLogcash.appendChild(elems.containerDivMonth);
	// elems.containerLogcash.appendChild(rowProgress);
	
	// row progress style
	// rowProgress.style.display = "flex";
	// rowProgress.style.flex = "1";
	// rowProgress.style.justifyContent = "space-between";
	
	// if (log.dev == 0)
	// {
	// 	var mainNavbar = document.querySelector(".main-navbar");
	// 	var style = window.getComputedStyle(mainNavbar,"");
	// 	var bgColor = style.getPropertyValue("background-color");
	// }
	// else
	// 	var bgColor = "#1e212a";

	// if (bgColor == "#1e212a" || "rgb(30, 33, 42)")
	// {
	// 	rowProgress.style.border = "2px solid #2d313c";
	// 	textProgress.style.color = "#f2f2f2";
	// }
	// else
	// {
	// 	rowProgress.style.border = "2px solid #e5e5e5";
	// 	textProgress.style.color = "#2c2c34";
	// }
	// rowProgress.style.borderRadius = "4px";
	
	// sideProgress.style.cursor = "pointer";
	// sideProgress.style.display = "flex";
	// sideProgress.style.justifyContent = "center";
	// sideProgress.style.alignItems = "center";
	// sideProgress.style.minWidth = "90px";

	// sideProgress.style.height = "100%";
	// sideProgress.style.borderRadius = "3px";
	
	// sideRemaining.style.display = "flex";
	// sideRemaining.style.justifyContent = "center";
	// sideRemaining.style.alignItems = "center";
	// sideRemaining.style.flex = "1";
	// sideRemaining.style.cursor = "pointer";

	// textRemaining.style.margin = "0";
	// textRemaining.style.color = "#8d8e8e";

	// return (elems.containerLogcash);
}

function reGenerate(month) {

	var textMonths = document.querySelectorAll(".text-month");
	// var textProgress = document.querySelector(".text-progress");
	// var textRemaining = document.querySelector(".text-remaining");
	var sideProgress = document.querySelector(".side-progress");

	for (var i = 0; i < months.nbMonth; i++)
		textMonths[i].innerText = months[i].nameShort;
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
			elems.textRemaining.style.display = "none";
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
			elems.textRemaining.innerText = month.nbHourRem + "h0" + month.nbMinRem;
		else
			elems.textRemaining.innerText = month.nbHourRem + "h" + month.nbMinRem;
		elems.textRemaining.style.display = "";
	}

	elems.sideProgress.innerText = tmpProgress;

	let textPercent = "  (" + Math.floor(month.percent) + "%)";
	elems.sideProgress.innerText += textPercent;

	if (month.percent < 10)
		elems.sideProgress.style.width = "50px";
	else if (month.percent > 90 && month.percent < 100)
		elems.sideProgress.style.width = "90%";
	else
		elems.sideProgress.style.width = month.percent + "%";

	// color gestion progress bar
	if (month.percent == 0)
	{
		month.progressColor = "rgba(37, 41, 50, 0.8)";
		elems.sideProgress.style.backgroundColor = month.progressColor;
	}
	else
	{
		month.progressColor = "rgba(0, 186, 188, " + (month.percent / 100) + ")";
		elems.sideProgress.style.backgroundColor = month.progressColor;
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

	// elems.containerLogcash = document.querySelector(".container-logcash");
	// var rowProgressBar = document.querySelector(".row-progress-bar");

	var textMonths = document.querySelectorAll(".text-month");
	var divMonths = document.querySelectorAll(".div-month");

	// var textProgress = document.querySelector(".text-progress");
	// var textRemaining = document.querySelector(".text-remaining");

	var ratio = getRatio(windowWidth);

	elems.rowProgress.style.height = (ratio * 30) + "px";
	elems.containerLogcash.style.display = "flex";
	var smallMargin = ratio * 6;

	elems.containerDivMonth.style.margin = "0 0 0 " + (ratio * 16) + "px";
	for (var i = 0; i < months.nbMonth; i++)
	{
		textMonths[i].style.fontSize = "0.9em";
		textMonths[i].style.padding = "0 10px";
		textMonths[i].style.height = (ratio * 30) + "px";
		textMonths[i].style.margin = "0 " + smallMargin + "px 0 0";

		divMonths[i].setAttribute('id', i);
		textMonths[i].setAttribute('id', i);
	}

	var bigText = ratio;
	elems.sideProgress.style.fontSize = bigText + "em";
	elems.textRemaining.style.fontSize = bigText + "em";
	elems.sideProgress.style.margin = 0;

	// const popupRemaining = document.querySelector(".popup-remaining");
	elems.popupRemaining.style.width = elems.popupRemaining.parentElement.parentElement.offsetWidth + "px";
	elems.popupRemaining.style.top = (ratio * 30) + 10 + "px";;
	// console.log(popupRemaining.parentElement.parentElement.parentElement.parentElement.offsetWidth);
	console.log(elems.popupRemaining.parentElement.parentElement.offsetWidth);
	// const containerLog = document.querySelector(".container-inner-item");
	// console.log(containerLog.offsetWidth);
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
	while (calendar.elems[++i])
	{
		if (calendar.elems[i].firstElementChild)
		{
			var tmpSplit = calendar.elems[i].getAttribute("data-original-title").split('h');

			tmpHours += parseInt(tmpSplit[0]);
			tmpMinutes += parseInt(tmpSplit[1]);
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
}

function getNumberHourRequired(monthIndex, yearIndex)
{
	const numHour2023 = [154,140,161,147,161,154,42,91,42,147,119,147];
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
	const h4Title = document.querySelectorAll(".profile-title");
	
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
	const allG = await waitForAll('g[data-original-title]');

	for (var i = 0; allG[i]; i++)
	{
		var style = window.getComputedStyle(allG[i].firstElementChild,"");
		var fillColor = style.getPropertyValue("fill");

		allG[i].firstElementChild.style.stroke = "#1d2028";
		if (fillColor == "rgb(250, 250, 250)")
			allG[i].firstElementChild.style.fill = "#242831";
	}
	if (navbar)
		navbar.style.backgroundColor = "#1e212a";
	document.body.style.backgroundColor = "#131419";
}

function mOverMonth(e)
{
	devPos = document.querySelector(".dev-pos");
	e.target.style.backgroundColor = months[parseInt(e.target.id)].progressColor;
	e.target.style.color = "white";
	e.target.style.border = "2px solid #2d313c";	
}

function mOutMonth(e)
{
	e.target.style.backgroundColor = "";
	e.target.style.color = "#8e8e8f";
	e.target.style.border = "2px solid rgba(0,0,0,0)";
}

function clickMonth(e)
{
	// elems.containerLogcash = document.querySelector(".container-logcash");
	for (var i = 0; i < months.nbMonth; i++)
		elems.divMonths[i].style.display = "flex";
	elems.containerLogcash.addEventListener("mouseleave", function () {
		for (var i = 0; i < months.nbMonth; i++)
		{
			// if (i != months.indexArray - 1)
			if (i != months.indexArray)
				elems.divMonths[i].style.display = "none";
		}
	});
	months.indexArray = parseInt(e.target.id);
	reGenerate(months[months.indexArray]);
}

function mOverProgress(e)
{
	blocProgress = document.querySelector(".side-progress");
	var tmpSplit = months[months.indexArray].progressColor.split(' ');
	var newAlpha = tmpSplit[3].replace(')', '');

	if ((parseInt(newAlpha) + 0.1) > 1)
		var newColor = "rgb(0, 189, 190)";
	else
		var newColor = tmpSplit[0] + " " + tmpSplit[1] + tmpSplit[2] + " " + (parseFloat(newAlpha) + 0.1) + ")";
	blocProgress.style.backgroundColor = newColor;
	blocProgress.style.color = "white";
}

function mOutProgress(e) {
	elems.blocProgress.style.backgroundColor = months[months.indexArray].progressColor;
}

function clickProgress(e) {

	if (months[months.indexArray].switchHourCash == 0)
		months[months.indexArray].switchHourCash = 1;
	else if (months[months.indexArray].switchHourCash == 1)
		months[months.indexArray].switchHourCash = 0;
	reGenerate(months[months.indexArray]);
}

function isMonthInArray(array, node) {

	for (var i = 0; i < array.length; i++)
	{
		if (array[i].innerHTML == node.innerHTML)
			// return console.log(array[i].innerHTML + " vs " + node.innerHTML + " already in list"), true;
			return true;
	}
	return false;
}

function getNbUniqueMonth(nodesList) {
	var tmpList = [];

	for (var i = 0; i < nodesList.length; i++)
	{
		if (!isMonthInArray(tmpList, nodesList[i]))
			tmpList.push(nodesList[i]);
		// for (var j = 0; j < tmpList.length; j++)
		// {
		// }
	}
	return tmpList.length;
}

function getInfoMonth() {

	months.nbMonth = getNbUniqueMonth(elems.textMonth);
	// console.log("number month: " + months.nbMonth);
	displayMessage("number month: " + months.nbMonth);

	var array = Array(months.nbMonth);
	array.nbMonth = months.nbMonth;
	array.indexDisplay = new Date().getMonth(),
	array.indexArray = months.nbMonth - 1;

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
			salary: 723,
			cashEarn: 0,
			time: 0,
			switchHourCash: 0,
			progressColor: 0,
			openDaysSince: 0,
			openDaysTotal: 0,
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

		// console.log(elems.textMonth[i].innerHTML);
		var tmpSplit = elems.textMonth[i].textContent.split('(')[1].split(')')[0].split('h');
		tmpMonth.nbHourDone = parseInt(tmpSplit[0]);
		tmpMonth.nbMinDone = parseInt(tmpSplit[1]);
		updateValues(tmpMonth);

		// console.log(tmpMonth.nameLong + " " + tmpMonth.monthIndex + " " + tmpMonth.yearIndex + 
		// " hourRequired: " + tmpMonth.nbHourReq + " hourDone: " + tmpMonth.nbHourDone + " minDone: " + tmpMonth.nbMinDone);
		array[indexMonth] = tmpMonth;
	}
	return (array);
}

var eventPopup = 0;
function mouseOverRemaining() {

	displayMessage("mouseOverRemaining");
	clearTimeout(eventPopup);
	elems.popupRemaining.style.display = "flex";
	sideRemaining.style.backgroundColor = "red";
}

function mouseOutRemaining() {

	displayMessage("mouseOutRemaining");
	eventPopup = setTimeout(function() {
		elems.popupRemaining.style.display = "none";
		sideRemaining.style.backgroundColor = "";
		console.log("timeout");
	}, 150);
}

function mouseOverPopup(e) {

	e.stopPropagation();

	console.log(e.target);

	e.target.addEventListener("mousedown", function(e) {
		console.log("mouse down on pop " + e.target);
	});
}

var isPanelVisible = false;
function clickRemaining(e) {

	e.stopPropagation();

	if (e.target.className == "side-remaining")
	{
		console.log(e.target.className);
		
		displayMessage("clickRemaining");
		var windowWidth = window.innerWidth;
		var ratio = getRatio(windowWidth);
	
		if (!isPanelVisible)
		{
			elems.popupRemaining.style.width = elems.popupRemaining.parentElement.parentElement.offsetWidth + "px";
			// elems.popupRemaining.style.top = (ratio * 30) + 10 + "px";
			elems.popupRemaining.style.display = "flex";
			sideRemaining.style.backgroundColor = "";
	
			elems.popupRemaining.addEventListener("mouseover", mouseOverPopup);
			isPanelVisible = true;
		}
		else
		{
			elems.popupRemaining.style.width = elems.popupRemaining.parentElement.parentElement.offsetWidth + "px";
			// elems.popupRemaining.style.top = (ratio * 30) + 10 + "px";
			elems.popupRemaining.style.display = "none";
			sideRemaining.style.backgroundColor = "";
			isPanelVisible = false;
		}
	}
}

function initButtons()
{
	elems.blocProgress = document.querySelector(".side-progress");
	elems.textProgress = document.querySelector(".text-progress");

	sideProgress = document.querySelector(".side-progress");
	sideRemaining = document.querySelector(".side-remaining");
	elems.divMonths = document.querySelectorAll(".div-month");
	elems.textMonths = document.querySelectorAll(".text-month");

	sideProgress.addEventListener("mouseover", mOverProgress);
	sideProgress.addEventListener("mouseout", mOutProgress);
	sideProgress.addEventListener("click", clickProgress);

	// sideRemaining.addEventListener("mouseover", mouseOverRemaining);
	// sideRemaining.addEventListener("mouseover", function() {
	// 	sideRemaining.style.backgroundColor = "rgb(35, 39, 46)";
	// });
	// sideRemaining.addEventListener("mouseout", mouseOutRemaining);
	// sideRemaining.addEventListener("mouseout", function() {
	// 	sideRemaining.style.backgroundColor = "";
	// });
	sideRemaining.addEventListener("click", clickRemaining);
	
	// elems.popupRemaining.addEventListener("mouseover", mouseOverRemaining);
	// elems.popupRemaining.addEventListener("mouseout", mouseOutRemaining);
	
	for (var i = 0; i < months.nbMonth; i++)
	{
		elems.textMonths[i].addEventListener("mouseover", mOverMonth);
		elems.textMonths[i].addEventListener("mouseout", mOutMonth);
		elems.textMonths[i].addEventListener("click", clickMonth);
	}
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
	const ltSvg = document.getElementById("user-locations");
	if (ltSvg) { // check if logtimes chart is on page
		waitForLogTimesChartToLoad(ltSvg);
	}
	elems.textMonth = ltSvg.querySelectorAll("svg > text");
}

async function initLogcash()
{
	calendar = await fetchCalendar();

	elems.divLogtime = document.querySelector("svg#user-locations").parentElement;

	months = getInfoMonth();

	// logCashDiv = generateLogcashDiv();
	// console.log(logCashDiv);
	elems.generateContainerLogcash();
	console.log(elems.containerLogcash);

	// // elems.divLogtime.insertBefore(logCashDiv, elems.divLogtime.firstChild);
	elems.divLogtime.insertBefore(elems.containerLogcash, elems.divLogtime.firstChild);
	resizeProgress();

	reGenerate(months[months.indexArray]);

	// // var index = 0;
	// // setInterval(function() {

	// // 	var tmpHours = index++;
	// // 	var tmpMinutes = 50;
	// // 	// displayMessage("call: " + (++index));
	// // 	months[months.indexArray].nbHourDone = parseInt(tmpHours);
	// // 	months[months.indexArray].nbMinDone = parseInt(tmpMinutes);

	// // 	reGenerate(months[months.indexArray]);
	// // }, 1000);

	// window.addEventListener("resize", resizeProgress);
	// initButtons();
}

var log = {
	dev: 0,
	indexMonthDisplay: new Date().getMonth(),
}

// var elems = {
// 	blocProgress: 0,
// 	textProgress: 0,
// 	h4Title: 0,
// 	textMonth: 0,
// }

var months = {
	// months: 0,
	// nbMonth: 0,
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

	// await sleep(2000);
	await sleep(500);
	initLogcash();
}

function getFirstDayOfMonth(year, month) {

	var dateFirstDay = String(year) + "-";
	if (month < 10)
		dateFirstDay += "0";
	dateFirstDay += String(month) + "-01";

	return new Date(dateFirstDay).getDay()
}

function displayMessage(message) {
	const reset = "\x1b[0m";

	console.log('%c[LogCash]%c %s', 'color: #ffa91f', reset, message);
}

function getNumberOpenDays(numberYear, numberMonth, numberDay) {

	const numberDaysInMonth = new Date(numberYear, numberMonth + 1, 0).getDate();
	var numberFirstDay = getFirstDayOfMonth(numberYear, numberMonth + 1);
	var openDaysSince = 0;
	var openDaysTotal = 0;
	var i = -1;

	while (++i < numberDaysInMonth)
	{
		if (numberFirstDay == 7)
			numberFirstDay = 0;
		if (numberFirstDay >= 1 && numberFirstDay <= 5)
		{
			if (i < numberDay)
				openDaysSince++;
			openDaysTotal++;
		}
		numberFirstDay++;
	}
	return [openDaysSince, openDaysTotal];
}



// // test only
// const listMonth = ["January", "Febrary", "March", "April", "Mai", "June", "July", "August", "September", "October", "November", "December"];
// const listDayOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
// const date = new Date();
// var numberYear = date.getFullYear();
// var numberMonth = date.getMonth();
// var numberDay = date.getDate();

// var i = -1;
// while (++i < 12) {
// 	const listMonth = ["January", "Febrary", "March", "April", "Mai", "June", "July", "August", "September", "October", "November", "December"];
// 	var openDays = getNumberOpenDays(numberYear, i, numberDay);

// 	displayMessage(listMonth[i] + ":  Open day since: " + openDays[0] + "   Open day total: " + openDays[1]);
// }

delayedInit();
