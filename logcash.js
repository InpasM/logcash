
const h4Title = document.querySelectorAll(".profile-title");

function getDivLogtime()
{
	for (var i = 0; h4Title[i]; i++)
	{
		if (h4Title[i].innerText == "LOGTIME")
			return (h4Title[i].parentNode);
	}
}

function getLastMonth(date, short)
{
	const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
	const monthShort = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

	if (short)
		return (monthShort[date.getMonth()]);
	else
		return (month[date.getMonth()]);
}

async function generateLogcashDiv(divLogtime)
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

	// calcul values
	textMonth.innerText = getLastMonth(new Date(), 0);
	
	const monthlySalary = 685;
	const numHourRequired = getNumberHourRequired(new Date("7/12/2023"));

	const calendar = await waitForAll('g[data-original-title]');

	const time = getNumberHourDone(new Date(), calendar);

	const result = user();
	let hoursDone = (await time).hoursDone;
	let minutesDone = (await time).minutesDone;
	// let hoursDone = 10;
	// let minutesDone = 0;

	const hoursRemaining = numHourRequired - hoursDone;
	const minutesRemaining = minutesDone;
	const pourcentDone = hoursDone / numHourRequired * 100;
	var cashEarn = monthlySalary * (pourcentDone / 100);
	if (cashEarn > monthlySalary)
		cashEarn = monthlySalary;

	textCash.innerText = Math.floor(cashEarn) + "€";
	if (pourcentDone >= 100)
	{
		if (minutesDone < 10)
			textProgress.innerText = hoursDone + "h0" + minutesDone + " / " + hoursRemaining + "h" + minutesRemaining;
		else
			textProgress.innerText = hoursDone + "h" + minutesDone + " / " + hoursRemaining + "h" + minutesRemaining;
		textRemaining.style.display = "none";
	}
	else
	{
		if (minutesDone < 10)
			textProgress.innerText = hoursDone + "h0" + minutesDone ;
		else
			textProgress.innerText = hoursDone + "h" + minutesDone ;
		textRemaining.innerText = hoursRemaining + "h" + minutesRemaining;
	}
	textBottom.innerText = Math.floor(pourcentDone) + "% of required logtime";

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
	sideProgress.style.minWidth = "50px";
	if (pourcentDone < 10)
		sideProgress.style.width = "50px";
	else if (pourcentDone > 90 && pourcentDone < 100)
		sideProgress.style.width = "90%";
	else
		sideProgress.style.width = pourcentDone + "%";
	// sideProgress.style.maxWidth = "90%";
	sideProgress.style.height = "100%";
	sideProgress.style.backgroundColor = "#252932";
	sideProgress.style.borderRadius = "0 4px 4px 0";
	// text
	textProgress.style.margin = "0";
	textProgress.style.color = "#eaeaeb";
	textProgress.style.fontSize = "0.8em";
	
	sideRemaining.style.display = "flex";
	sideRemaining.style.justifyContent = "center";
	sideRemaining.style.alignItems = "center";
	sideRemaining.style.flex = "1";
	// text
	textRemaining.style.margin = "0";
	textRemaining.style.color = "#8d8e8e";
	textRemaining.style.fontSize = "0.8em";
	
	// row bottom style
	rowBottom.style.display = "flex";
	rowBottom.style.justifyContent = "space-between";
	rowBottom.style.alignItems = "center";
	// text
	textBottom.style.padding = "0";
	textBottom.style.margin = "0 8px";
	textBottom.style.fontSize = "0.9em";
	textBottom.style.color = "#41444a";

	return (containerLogcash);
}

function user() {
	return{
		name:"Alex",
		age:22
	}
}

function waitForElm(selector) {
    return new Promise(resolve => {
        if (document.querySelector(selector)) {
            return resolve(document.querySelector(selector));
        }

        const observer = new MutationObserver(mutations => {
            if (document.querySelector(selector)) {
                resolve(document.querySelector(selector));
                observer.disconnect();
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    });
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

async function getNumberHourDone(date, calendar)
{
	var tmpHours = 0;
	var tmpMinutes = 0;
	// const calendar = document.querySelector("#user-locations");
	// var calendarElements = document.querySelector("svg#user-locations").childNodes;
	const month = getLastMonth(new Date(), 1);

	// console.log(calendarElements);
	// console.log("test");
	// while (!calendarElements[0])
	// 	calendarElements = document.querySelector("svg#user-locations").childNodes;

	

	// waitForElm('svg#user-locations').then((calendar) => {
	// waitForAll('g[data-original-title]').then((calendar) => {
		// const calendarElements = calendar.childNodes;
		// console.log('Element is ready');
		// console.log(calendarElements.length);
		// console.log(calendar[0]);
		// if (calendarElements.length == 0)
		// 	getNumberHourDone(date);

		// for (var i = calendar.length - 1; i > 0; i--)
		// {
		// 	// if (calendarElements[i])
		// 	console.log(calendar[i - 1].firstElementChild);
		// }

		for (var i = 0; i < calendar.length - 1; i++)
		{
			if (!calendar[i].nextSibling.firstElementChild && calendar[i].nextSibling.firstChild.data == month)
			{
				// console.log(calendar[i].nextSibling.firstChild.data);
				// i++;
				break;
			}
		}
		// console.log(i);

		while (calendar[++i])
		{
			var tmpSplit = calendar[i].getAttribute("data-original-title").split('h');
			// console.log(calendar[i]);
			tmpHours += parseInt(tmpSplit[0]);
			tmpMinutes += parseInt(tmpSplit[1]);

			if (tmpMinutes >= 60)
			{
				tmpHours++;
				tmpMinutes -= 60;
			}
			// console.log(totalHours + " " + tmpSplit[0] + " " + tmpSplit[1]);
		}
		
		// return [hours, minutes];

		return Promise.resolve({
			hoursDone:parseInt(tmpHours),
			minutesDone:parseInt(tmpMinutes)
		})
}

function getNumberHourRequired(date)
{
	const numHour2023 = [154,140,161,147,161,154,77,91,77,154,154,147];
	const numHour2024 = [161,147,147,154,161,140,91,84,77,161,147,154];

	if (date.getYear() + 1900 == 2023)
		return (numHour2023[date.getMonth()]);
	else if (date.getYear() + 1900 == 2024)
		return (numHour2024[date.getMonth()]);
}

function changeColorPage()
{
	const allContainer = document.querySelectorAll(".container-inner-item");
	const noteTitle = document.querySelectorAll(".note-title");
	const navbar = document.querySelector(".main-navbar");
	
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

	document.body.style.backgroundColor = "#12141a";
	navbar.style.backgroundColor = "#12141a";
}

function initLogcash()
{
	const divLogtime = getDivLogtime();

	// divLogtime.style.backgroundColor = "#ffffff";
	// divLogtime.style.removeProperty('max-height');
	
	// divLogtime.appendChild(generateLogcashDiv(divLogtime));
	// console.log(divLogtime.parentElement.parentElement);
	
	// const cloneDiv = divLogtime.parentElement.cloneNode();
	// cloneDiv.appendChild(generateLogcashDiv(cloneDiv));
	const cloneDiv = generateLogcashDiv(divLogtime).then(function(result){
		// console.log(result)

		divLogtime.appendChild(result);
		divLogtime.className = "";
		divLogtime.style.margin = "20px 0 0 0";
		divLogtime.style.height = "100%";
		divLogtime.style.backgroundColor = "#1d2028";
		divLogtime.style.border = "1px solid #2d313c";
		divLogtime.style.borderRadius = "3px";
		divLogtime.style.padding = "20px 25px 25px 25px";
	});
	
	// divLogtime.parentElement.parentElement.insertBefore(cloneDiv, divLogtime.parentElement.nextSibling);
}

var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
if (isOpera)
	changeColorPage();

// waitForElm('svg#user-locations').then((elm) => {
// 	initLogcash();
// });

initLogcash();

// window.addEventListener('load', initLogcash)
