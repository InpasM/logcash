
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

function reGenerate(month, elems) {

	var textMonths = document.querySelectorAll(".text-month");
	// var textProgress = document.querySelector(".text-progress");
	// var textRemaining = document.querySelector(".text-remaining");
	// var sideProgress = document.querySelector(".side-progress");

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
	var textMonths = document.querySelectorAll(".text-month");
	var divMonths = document.querySelectorAll(".div-month");
	var ratio = getRatio(windowWidth);

	elems.rowProgress.style.height = (ratio * 30) + "px";
	elems.containerLogcash.style.display = "flex";
	elems.containerDivMonth.style.margin = "0 0 0 " + (ratio * 16) + "px";
	var smallMargin = ratio * 6;

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

	console.log(calendar);
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
	reGenerate(months[months.indexArray], elems);
}

function mOverProgress(e)
{
	var tmpSplit = months[months.indexArray].progressColor.split(' ');
	var newAlpha = tmpSplit[3].replace(')', '');

	if ((parseInt(newAlpha) + 0.1) > 1)
		var newColor = "rgb(0, 189, 190)";
	else
		var newColor = tmpSplit[0] + " " + tmpSplit[1] + tmpSplit[2] + " " + (parseFloat(newAlpha) + 0.1) + ")";
	elems.sideProgress.style.backgroundColor = newColor;
	elems.sideProgress.style.color = "white";
}

function mOutProgress(e) {
	elems.sideProgress.style.backgroundColor = months[months.indexArray].progressColor;
	elems.sideProgress.style.color = "#f2f2f2";
}

function clickProgress(e) {

	if (months[months.indexArray].switchHourCash == 0)
		months[months.indexArray].switchHourCash = 1;
	else if (months[months.indexArray].switchHourCash == 1)
		months[months.indexArray].switchHourCash = 0;
	reGenerate(months[months.indexArray], elems);
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

function getInfoMonth(elems) {

	months.nbMonth = getNbUniqueMonth(elems.textMonth);
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

		// old way of getting number of hour
		// var tmpSplit = elems.textMonth[i].textContent.split('(')[1].split(')')[0].split('h');
		// tmpMonth.nbHourDone = parseInt(tmpSplit[0]);
		// tmpMonth.nbMinDone = parseInt(tmpSplit[1]);

		// tempory hour
		tmpMonth.nbHourDone = 103;
		tmpMonth.nbMinDone = 31;

		updateValues(tmpMonth);

		array[indexMonth] = tmpMonth;
	}
	return (array);
}

var isPanelVisible = false;

function clickRemaining(e) {

	e.stopPropagation();

	if (e.target.className == "side-remaining")
	{
		if (!isPanelVisible)
		{
			const popupDimension = elems.popupRemaining.getBoundingClientRect();
			const sideRemaining = elems.sideRemaining.getBoundingClientRect();
			const targetDimension = e.target.getBoundingClientRect();
	
			let topPopup = e.pageY + sideRemaining.height + (targetDimension.top - e.clientY) + 5;
			let leftPopup = e.pageX - (popupDimension.width / 2);
	
			elems.popupRemaining.style.top = topPopup + "px";
			elems.popupRemaining.style.left = leftPopup + "px";

			elems.sideRemaining.style.backgroundColor = "";
			elems.popupRemaining.style.opacity = "1";
			isPanelVisible = true;
		}
		else
		{
			elems.sideRemaining.style.backgroundColor = "";
			elems.popupRemaining.style.opacity = "0";
			isPanelVisible = false;
		}
	}
}

function initButtons(elems)
{
	elems.divMonths = document.querySelectorAll(".div-month");
	elems.textMonths = document.querySelectorAll(".text-month");

	elems.sideProgress.addEventListener("mouseover", mOverProgress);
	elems.sideProgress.addEventListener("mouseout", mOutProgress);
	elems.sideProgress.addEventListener("click", clickProgress);

	// sideRemaining.addEventListener("mouseover", mouseOverRemaining);
	elems.sideRemaining.addEventListener("mouseover", function() {
		elems.sideRemaining.style.backgroundColor = "rgb(35, 39, 46)";
	});
	// sideRemaining.addEventListener("mouseout", mouseOutRemaining);
	elems.sideRemaining.addEventListener("mouseout", function() {
		elems.sideRemaining.style.backgroundColor = "";
	});
	elems.sideRemaining.addEventListener("click", clickRemaining);
	popup.initPopup(elems);
	// elems.popupRemaining.addEventListener("mouseover", mouseOverPopup);

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

async function fetchCalendar(elems)
{
	const ltSvg = document.getElementById("user-locations");

	if (ltSvg) { // check if logtimes chart is on page
		waitForLogTimesChartToLoad(ltSvg);
	}
	elems.textMonth = ltSvg.querySelectorAll("svg > text");
	// console.log(elems.textMonth);
	return ltSvg;
}

var months = {
	// months: 0,
	// nbMonth: 0,
}

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

function displayMessage(message) {
	const reset = "\x1b[0m";

	console.log('%c[LogCash]%c %s', 'color: #ffa91f', reset, message);
}

function getFirstDayOfMonth(year, month) {

	var dateFirstDay = String(year) + "-";
	if (month < 10)
		dateFirstDay += "0";
	dateFirstDay += String(month) + "-01";

	return new Date(dateFirstDay).getDay()
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

// getNumberHourDone();

async function initLogcash()
{
	const elems = {};

	calendar = await fetchCalendar(elems);
	months = getInfoMonth(elems);

	console.log(months);

	init.generateContainerLogcash(elems);
	calendar.parentElement.insertBefore(elems.containerLogcash, calendar.parentElement.firstChild);

	window.elems = elems;
	resizeProgress();
	reGenerate(months[months.indexArray], elems);
	window.addEventListener("resize", resizeProgress);
	initButtons(elems);

	const userPosteStatus = document.querySelector(".user-poste-status");

	if (userPosteStatus.innerText !== "Unavailable")
	{
		displayMessage("Start setInterval each minutes");
		setInterval(function() {
	
			var tmpHours = months[months.length - 1].nbHourDone;
			var tmpMinutes = months[months.length - 1].nbMinDone + 1;
	
			if (tmpMinutes >= 60) {
				tmpMinutes = 0;
				tmpHours += 1;
			}
			months[months.length - 1].nbHourDone = parseInt(tmpHours);
			months[months.length - 1].nbMinDone = parseInt(tmpMinutes);
			if (months.indexArray == months.length - 1)
				reGenerate(months[months.length - 1], elems);
				updateValues(months[months.length - 1]);
		}, 60000);
	}
}

function startLogcash() {

	data.init();
	displayMessage(data.student.pseudo + " found in storage");
	if (window.location.href.indexOf("logcash.html") !== -1)
	{
		var refreshButton = document.querySelector(".dev-refresh");

		refreshButton.addEventListener("click", function() {
			location.reload();
		});
	}
	// else
	// 	sleep(2000);
	initLogcash();
}

startLogcash();
