
function reGenerate(month, elems) {

	var textMonths = document.querySelectorAll(".text-month");

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

function mOverMonth(e) {

	if (e.target.id != months.indexArray)
	{
		e.target.style.backgroundColor = "rgba(48, 53, 65, 0.9)";
		e.target.style.color = "rgba(236, 238, 244, 0.9)";
	}
}

function mOutMonth(e) {
	
	if (e.target.id != months.indexArray)
	{
		e.target.style.backgroundColor = "rgba(37, 41, 50, 0.9)";
		e.target.style.color = "rgb(155, 155, 155)";
	}
}

function clickMonth(e) {

	for (var i = 0; i < months.nbMonth; i++)
	{
		elems.divMonths[i].style.backgroundColor = "rgba(37, 41, 50, 0.9)";
		elems.divMonths[i].style.color = "rgb(155, 155, 155)";
	}
	months.indexArray = parseInt(e.target.id);
	elems.divMonths[months.indexArray].style.backgroundColor = "white";
	elems.divMonths[months.indexArray].style.color = "#191919";

	reGenerate(months[months.indexArray], elems);
	popup.setData(elems);
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

	if (months[months.indexArray].percent >= 100)
		displayMessage("Money full display option button");
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
	}
	return tmpList.length;
}

function isMonthAlreadyAdd(array, monthName) {

	for (var i = 0; i < array.length; i++)
	{
		if (array[i].nameShort === monthName)
			return true;
	}
	return false;
}

function getInfoMonth(elems, calendar) {

	const nbMonth = getNbUniqueMonth(elems.textMonth);

	function initArrayCalendar(calendarElem, arrayCalendar) {

		let objMonth = {};
		let arrayMonthsG = [];
		let indexMonth = 0;
		let tmpArray = [];

		for (var i = calendarElem.length - 1; i >= 0; i--)
		{
			if (calendarElem[i].tagName === "g")
				arrayMonthsG.push(calendarElem[i]);
			else if (calendarElem[i].tagName === "text")
			{
				const monthName = calendarElem[i].innerHTML.split(' ')[0];

				if (isMonthAlreadyAdd(tmpArray, monthName))
					break;

				/////////////////////////////////// TEMPORARY to test different date
				tmpArray[indexMonth] = {nameShort: monthName};
				// const actualDate = new Date("2023-02-15");
				const actualDate = new Date();

				objMonth.arrayElems = arrayMonthsG.reverse();
				objMonth.monthIndex = actualDate.getMonth() - indexMonth;
				objMonth.yearIndex = actualDate.getYear();
				if (objMonth.monthIndex < 0)
				{
					objMonth.yearIndex--;
					objMonth.monthIndex += 12;
				}
				objMonth.nameShort = monthName;
				objMonth.nbHourDone = 0;
				objMonth.nbMinDone = 0;
				objMonth.nbHourReq = 0;
				objMonth.nbMinReq = 0;
				objMonth.nbHourRem = 0;
				objMonth.nbMinRem = 0;
				objMonth.percent = 0.0;
				objMonth.salary = 0;
				objMonth.cashEarn = 0;
				objMonth.time = 0;
				objMonth.switchHourCash = 0;
				objMonth.progressColor = 0;
				objMonth.openDaysRemaining = 0;
				objMonth.openDaysTotal = 0;

				objMonth.days = [];
				objMonth.weeks = [[], [], [], [], [], []];
	
				arrayCalendar[indexMonth] = objMonth;
				indexMonth++;
				objMonth = {};
				arrayMonthsG = [];
			}
		}
	}

	const calendarElem = calendar.childNodes;
	var arrayCalendar = Array();

	initArrayCalendar(calendarElem, arrayCalendar);

	console.log(arrayCalendar);

	arrayCalendar.indexArray = arrayCalendar.length - 1;
	arrayCalendar.nbMonth = arrayCalendar.length;
	arrayCalendar = arrayCalendar.reverse();

	for (var i = 0; i < arrayCalendar.length; i++)
	{
		var indexWeek = 0;
		var lengthMonth = 0;

		if (i === arrayCalendar.length - 1)
			lengthMonth = new Date(arrayCalendar[i].yearIndex + 1900, arrayCalendar[i].monthIndex + 1, 0).getDate();
		else
			lengthMonth = arrayCalendar[i].arrayElems.length;

		for (var j = 0; j < lengthMonth; j++)
		{
			var tmpTimeDone, splitTimeDone;

			if (!arrayCalendar[i].arrayElems[j])
			{
				tmpTimeDone = "0h00";
				splitTimeDone = [0, 0];
			}
			else
			{
				tmpTimeDone = arrayCalendar[i].arrayElems[j].getAttribute("data-original-title");
				splitTimeDone = tmpTimeDone.split('h');
			}

			const numberDay = j + 1;
			let fullDate = (arrayCalendar[i].yearIndex + 1900) + '-';

			if (arrayCalendar[i].monthIndex + 1 < 10)
				fullDate += "0";
			fullDate += (arrayCalendar[i].monthIndex + 1) + "-";
			if (numberDay < 10)
				fullDate += "0";
			fullDate += numberDay;

			var tmpDate = new Date(fullDate);

			arrayCalendar[i].days[j] = {
				dayDate: fullDate,
				dayNumber: tmpDate.getDay(),
				timeDone: tmpTimeDone,
				hourDone: parseInt(splitTimeDone[0]),
				minuteDone: parseInt(splitTimeDone[1]),
			};

			if (arrayCalendar[i].days[j].dayNumber === 0 && j !== 0)
			{
				// console.log("start of new week: " + arrayCalendar[i].days[j].dayDate);
				indexWeek++;
			}
			// console.log(arrayCalendar[i].days[j]);
			arrayCalendar[i].weeks[indexWeek].push(arrayCalendar[i].days[j]);
			arrayCalendar[i].nbHourDone += arrayCalendar[i].days[j].hourDone;
			arrayCalendar[i].nbMinDone += arrayCalendar[i].days[j].minuteDone;

			if (arrayCalendar[i].days[j].dayNumber >= 1 && arrayCalendar[i].days[j].dayNumber <= 5)
			{
				// console.log("start of new week: " + arrayCalendar[i].days[j].dayDate);
				arrayCalendar[i].nbHourReq += 7;
				arrayCalendar[i].openDaysTotal++;
				if (!arrayCalendar[i].arrayElems[j])
					arrayCalendar[i].openDaysRemaining++;
			}
		}

		// console.log("reduce number hour require depending of data");
		if (data.student.hoursDeducted > arrayCalendar[i].nbHourReq)
			arrayCalendar[i].nbHourReq = 0;
		else
			arrayCalendar[i].nbHourReq -= data.student.hoursDeducted;

		arrayCalendar[i].timeEachDay = 0;

		calculProgress(arrayCalendar[i]);
	}
	return (arrayCalendar);
}

function calculProgress(arrayCalendar) {

	///////////////////////////////////////////////////////// calcul all other value
	if (arrayCalendar.nbMinDone >= 60)
	{
		var extraHour = parseInt(arrayCalendar.nbMinDone / 60);

		arrayCalendar.nbHourDone += extraHour;
		arrayCalendar.nbMinDone = arrayCalendar.nbMinDone - (extraHour * 60);
		// console.log("extraHour: " + parseInt(extraHour) + " remainingMinute: " + remainingMinute);
	}
	arrayCalendar.nbHourRem = arrayCalendar.nbHourReq - arrayCalendar.nbHourDone;
	arrayCalendar.nbMinRem = arrayCalendar.nbMinReq - arrayCalendar.nbMinDone;
	
	if (arrayCalendar.nbMinRem < 0)
	{
		arrayCalendar.nbMinRem += 60;
		arrayCalendar.nbHourRem--;
	}
	else if (arrayCalendar.nbMinRem >= 60)
	{
		arrayCalendar.nbMinRem -= 60;
		arrayCalendar.nbHourRem++;
	}
	arrayCalendar.percent = (arrayCalendar.nbHourDone + (arrayCalendar.nbMinDone / 60)) / arrayCalendar.nbHourReq * 100;

	if (arrayCalendar.percent == 0)
		arrayCalendar.progressColor = "rgba(37, 41, 50, 0.8)";
	else
		arrayCalendar.progressColor = "rgba(0, 186, 188, " + (arrayCalendar.percent / 100) + ")";

	// console.log("nbHourRem: " + arrayCalendar.nbHourRem + " nbMinRem: " + arrayCalendar.nbMinRem  + " percent: " + arrayCalendar.percent);

	// console.log("monthName " + arrayCalendar.nameShort + " hourDone: " + 
	// arrayCalendar.nbHourDone + " minuteDone: " + arrayCalendar.nbMinDone);
}

var isPanelVisible = false;

function clickRemaining(e) {

	e.stopPropagation();

	if (e.target.className == "setting-button")
	{
		if (!isPanelVisible)
		{
			const popupDimension = elems.popupRemaining.getBoundingClientRect();
			const sideRemaining = elems.sideRemaining.getBoundingClientRect();
			const targetDimension = e.target.getBoundingClientRect();
	
			let topPopup = e.pageY + sideRemaining.height + (targetDimension.top - e.clientY) + 5;
			let leftPopup = e.pageX - (popupDimension.width / 2);

			elems.popupRemaining.style.top = topPopup + "px";
			elems.popupRemaining.style.left = leftPopup - 200 + "px";

			elems.sideRemaining.style.backgroundColor = "";
			elems.popupRemaining.style.opacity = "1";
			elems.popupRemaining.style.display = "flex";
			isPanelVisible = true;
		}
		else
		{
			elems.sideRemaining.style.backgroundColor = "";
			elems.popupRemaining.style.opacity = "0";
			elems.popupRemaining.style.display = "none";
			isPanelVisible = false;
		}
	}
}

let timeOut;
function clickSetting(e) {

	elems.settingButton.style.opacity = "0";
	elems.settingButton.style.cursor = "default";
	clickRemaining(e);
}

function mouseoverProgress() {

	clearTimeout(timeOut);
	elems.settingButton.style.opacity = "1";
	elems.settingButton.style.cursor = "pointer";
	elems.settingButton.addEventListener("click", clickSetting);
}

function mouseoutProgress() {

	timeOut = setTimeout(function() {
		elems.settingButton.removeEventListener("click", clickSetting);
		elems.settingButton.style.opacity = "0";
		elems.settingButton.style.cursor = "default";
	}, 800);
}

function initButtons(elems)
{
	// elems.divMonths = document.querySelectorAll(".div-month");
	// elems.textMonths = document.querySelectorAll(".text-month");

	// if (data.student)
	// {
	// 	elems.rowProgress.addEventListener("mouseover", mouseoverProgress)
	// 	elems.rowProgress.addEventListener("mouseout", mouseoutProgress)
	// }

	// elems.sideRemaining.addEventListener("mouseover", function() {
	// 	elems.sideRemaining.style.backgroundColor = "rgb(35, 39, 46)";
	// });
	// elems.sideRemaining.addEventListener("mouseout", function() {
	// 	elems.sideRemaining.style.backgroundColor = "";
	// });
	// elems.sideRemaining.addEventListener("click", clickRemaining);
	// popup.initPopup(elems);

	for (var i = 0; i < months.nbMonth; i++)
	{
		// elems.textMonths[i].addEventListener("mouseover", mOverMonth);
		// elems.textMonths[i].addEventListener("mouseout", mOutMonth);
		// elems.textMonths[i].addEventListener("click", clickMonth);
		elems.divMonths[i].addEventListener("mouseover", mOverMonth);
		elems.divMonths[i].addEventListener("mouseout", mOutMonth);
		elems.divMonths[i].addEventListener("click", clickMonth);
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
		setTimeout(function() {
			waitForLogTimesChartToLoad(ltSvg);
		}, 100);
		return false;
	}
}

async function fetchCalendar(elems)
{
	const ltSvg = document.getElementById("user-locations");

	if (ltSvg) {
		waitForLogTimesChartToLoad(ltSvg);
	}
	elems.textMonth = ltSvg.querySelectorAll("svg > text");
	return ltSvg;
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
	var openDaysRemaining = 0;
	var openDaysTotal = 0;
	var i = -1;

	while (++i < numberDaysInMonth)
	{
		if (numberFirstDay == 7)
			numberFirstDay = 0;
		if (numberFirstDay >= 1 && numberFirstDay <= 5)
		{
			if (i < numberDay)
				openDaysRemaining++;
			openDaysTotal++;
		}
		numberFirstDay++;
	}
	return [openDaysRemaining, openDaysTotal];
}

function initStyleProgressBar() {

	elems.rowProgress.style.height = "20px";
	elems.containerLogcash.style.display = "flex";

	for (var i = 0; i < months.nbMonth; i++)
	{
		elems.divMonths[i].style.margin = "0 3px";
		elems.divMonths[i].setAttribute('id', i);
	}
	elems.sideProgress.style.fontSize = "0.8em";
	elems.textRemaining.style.fontSize = "0.8em";
	elems.sideProgress.style.margin = 0;
}

async function initLogcash()
{
	const elems = {};

	calendar = await fetchCalendar(elems);

	console.log(data.student.months);
	const months = getInfoMonth(elems, calendar);

	init.generateContainerLogcash(elems, months, calendar);

	window.elems = elems;
	window.months = months;
	initStyleProgressBar();

	reGenerate(months[months.indexArray], elems);
	// initButtons(elems);

	// const userPosteStatus = document.querySelector(".user-poste-status");

	// if (userPosteStatus.innerText !== "Unavailable")
	// {
	// 	displayMessage("Start setInterval each minutes");
	// 	setInterval(function() {

	// 		var tmpHourDay = popup.months[popup.months.nbMonth - 1].days[popup.numberDay - 1].hourDone;
	// 		var tmpMinutesDay = popup.months[popup.months.nbMonth - 1].days[popup.numberDay - 1].minuteDone + 1;
	// 		// var tmpMinutesDay = popup.months[popup.months.nbMonth - 1].days[popup.numberDay - 1].minuteDone + 10;
	
	// 		var tmpHourGlobal = months[months.length - 1].nbHourDone;
	// 		var tmpMinutesGlobal = months[months.length - 1].nbMinDone + 1;
	// 		// var tmpMinutesGlobal = months[months.length - 1].nbMinDone + 10;
	
	// 		if (tmpMinutesDay >= 60) {
	// 			tmpMinutesDay = 0;
	// 			tmpHourDay += 1;
	// 		}
	// 		if (tmpMinutesGlobal >= 60) {
	// 			tmpMinutesGlobal = 0;
	// 			tmpHourGlobal += 1;
	// 		}

	// 		popup.months[popup.months.nbMonth - 1].days[popup.numberDay - 1].hourDone = parseInt(tmpHourDay);
	// 		popup.months[popup.months.nbMonth - 1].days[popup.numberDay - 1].minuteDone = parseInt(tmpMinutesDay);
	// 		months[months.length - 1].nbHourDone = parseInt(tmpHourGlobal);
	// 		months[months.length - 1].nbMinDone = parseInt(tmpMinutesGlobal);

	// 		if (months.indexArray == months.length - 1)
	// 		{
	// 			calculProgress(months[months.indexArray]);
	// 			reGenerate(months[months.length - 1], elems);
	// 			popup.calculDays(elems);
	// 			popup.setAttributeDaySlide(elems);
	// 			popup.setData(elems);
	// 		}
	// 	}, 60000);
	// 	// }, 1000);
	// }
}

function setRefreshInterval() {
	return setInterval(function() {location.reload();}, 5000);
}

let devMode;
function startLogcash() {

	data.init();
	
	if (window.location.href.indexOf("logcash.html") !== -1)
	{
		devMode = true;
		var refreshButton = document.querySelector(".dev-refresh");
		var refreshButtonActivator = document.querySelector(".dev-refresh-button");
		var refreshButtonRemove = document.querySelector(".dev-remove-localStorage");
		var refreshOn = true;
		var cycleRefresh = setRefreshInterval();

		refreshButtonActivator.addEventListener("click", function() {
			if (refreshOn)
			{
				refreshButtonActivator.innerText = "REFRESH: OFF";
				clearInterval(cycleRefresh);
				refreshOn = false;
			}
			else
			{
				refreshButtonActivator.innerText = "REFRESH: ON";
				cycleRefresh = setRefreshInterval();
				refreshOn = true;
			}
		});

		refreshButtonRemove.addEventListener("click", function() {
			localStorage.removeItem("student42");
		});

		refreshButton.addEventListener("click", function() {
			location.reload();
		});
		initLogcash();
	}
	else
	{
		devMode = false;
		setTimeout(function() {
			initLogcash();
		}, 1000);

	}
}
setTimeout(function() {
	startLogcash();
}, 100);
