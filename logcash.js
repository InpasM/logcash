
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
	containerLogcash.id = "container-logcash";
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
	
	containerMonth.appendChild(rowTop);
	containerMonth.appendChild(rowProgress);
	containerLogcash.appendChild(containerMonth);

	// calcul values
	textMonth.innerText = getLastMonth(new Date(), 0);
	
	const monthlySalary = 685;
	const numHourRequired = getNumberHourRequired(new Date("7/12/2023"));
	const numMinutesRequired = 0;

	const calendar = await waitForAll('g[data-original-title]');
	const time = getNumberHourDone(new Date(), calendar);
	let hoursDone = (await time).hoursDone;
	let minutesDone = (await time).minutesDone;

	// let hoursDone = 77;
	// let minutesDone = 0;

	let hoursRemaining = numHourRequired - hoursDone;
	let minutesRemaining = numMinutesRequired - minutesDone;

	let timeFloat = hoursDone + (minutesDone / 60)
	
	const pourcentDone = timeFloat / numHourRequired * 100;
	var cashEarn = monthlySalary * (pourcentDone / 100);
	if (cashEarn > monthlySalary)
		cashEarn = monthlySalary;

	if (minutesRemaining < 0)
	{
		minutesRemaining += 60;
		hoursRemaining--;
	}
	else if (minutesRemaining >= 60)
	{
		minutesRemaining -= 60;
		hoursRemaining++;
	}
	// textCash.innerText = Math.floor(cashEarn) + "€";
	textCash.innerText = cashEarn.toFixed(2) + "€";
	if (pourcentDone >= 100)
	{
		if (minutesDone < 10)
			textProgress.innerText = hoursDone + "h0" + minutesDone + " / " + numHourRequired + "h00";
			else
			textProgress.innerText = hoursDone + "h" + minutesDone + " / " + numHourRequired + "h00";
		textRemaining.style.display = "none";
	}
	else
	{
		if (minutesDone < 10)
			textProgress.innerText = hoursDone + "h0" + minutesDone ;
		else
		textProgress.innerText = hoursDone + "h" + minutesDone ;
			
		if (minutesRemaining < 10)
		textRemaining.innerText = hoursRemaining + "h0" + minutesRemaining;
		else
		textRemaining.innerText = hoursRemaining + "h" + minutesRemaining;
	}
	let textPourcent = "  (" + Math.floor(pourcentDone) + "%)";
	textProgress.innerText += textPourcent;
	// textBottom.innerText = Math.floor(pourcentDone) + "% of required logtime";

	// apply style
	// containerLogcash.style.margin = "-40px 0 0 0";	//
	
	containerMonth.style.width = "100%";
	containerMonth.style.padding = "0 20px";

	// row top style
	rowTop.style.display = "flex";
	rowTop.style.justifyContent = "space-between";
	rowTop.style.alignItems = "center";
	textMonth.style.padding = "0";
	textMonth.style.margin = "0 8px 0 4px";	//
	textMonth.style.fontSize = "0.8em";		//
	textMonth.style.color = "#8e8e8f";
	textCash.style.padding = "0";
	textCash.style.margin = "0 8px 0 4px";	//
	textCash.style.fontSize = "0.8em";	//
	textCash.style.color = "#8e8e8f";
	
	// row progress style
	rowProgress.style.display = "flex";
	rowProgress.style.justifyContent = "space-between";
	
	const mainNavbar = document.querySelector(".main-navbar");
	var style = window.getComputedStyle(mainNavbar,"");
	var bgColor = style.getPropertyValue("background-color");

	if (bgColor == "rgb(30, 33, 42)")	// black
	{
		rowProgress.style.border = "2px solid #2d313c";
		textProgress.style.color = "#f2f2f2";
	}
	else
	{
		rowProgress.style.border = "2px solid #e5e5e5";
		textProgress.style.color = "#2c2c34";
	}

	// rowProgress.style.height = "40px";	//
	rowProgress.style.borderRadius = "3px";
	rowProgress.style.margin = "4px 0";
	
	sideProgress.style.display = "flex";
	sideProgress.style.justifyContent = "center";
	sideProgress.style.alignItems = "center";
	sideProgress.style.minWidth = "70px";
	if (pourcentDone < 10)
		sideProgress.style.width = "70px";
	else if (pourcentDone > 90 && pourcentDone < 100)
		sideProgress.style.width = "90%";
	else
		sideProgress.style.width = pourcentDone + "%";

	// color gestion progress bar
	if (pourcentDone == 0)
		sideProgress.style.backgroundColor = "#252932";
	else
		sideProgress.style.backgroundColor = "rgba(0, 186, 188, " + (pourcentDone / 100) + ")";

	sideProgress.style.height = "100%";
	sideProgress.style.borderRadius = "3px 4px 4px 3px";
	// sideProgress.style.borderRadius = "4px";
	// text
	textProgress.style.margin = "0";
	// textProgress.style.color = "#eaeaeb";
	
	textProgress.style.fontSize = "0.8em";	//
	
	sideRemaining.style.display = "flex";
	sideRemaining.style.justifyContent = "center";
	sideRemaining.style.alignItems = "center";
	sideRemaining.style.flex = "1";
	// text
	textRemaining.style.margin = "0";
	textRemaining.style.color = "#8d8e8e";
	textRemaining.style.fontSize = "0.8em";	//

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
	var containerLogcash = document.querySelector("#container-logcash");
	var rowProgressBar = document.querySelector(".row-progress-bar");
	var ratio = getRatio(windowWidth);

	// console.log("width: " + window.innerWidth + "  " + ratio);
	rowProgressBar.style.height = (ratio * 30) + "px";
	containerLogcash.style.margin = "-" + (ratio * 70) + "px 0 0 0";
	
	if (windowWidth <= 480)
	{
		containerLogcash.style.margin = "-" + (ratio * 40) + "px 0 0 0";
		
	}
	else if (windowWidth <= 770)
	{
		
		// containerLogcash.style.margin = "-" + (ratio * 70) + "px 0 0 0";
	}
	else if (windowWidth <= 990)
	{
		
		containerLogcash.style.margin = "-" + (ratio * 75) + "px 0 0 0";
	}
	else if (windowWidth <= 1600)
	{
		// containerLogcash.style.margin = "-" + (ratio * 70) + "px 0 0 0";
		
	}
	else if (windowWidth <= 3000)
	{
		// containerLogcash.style.margin = "-" + (ratio * 70) + "px 0 0 0";
		
	}
	else
	{
		// containerLogcash.style.margin = "-" + (ratio * 70) + "px 0 0 0";

	}
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
	const month = getLastMonth(new Date(), 1);

	for (var i = 0; i < calendar.length - 1; i++)
	{
		if (!calendar[i].nextSibling.firstElementChild && calendar[i].nextSibling.firstChild.data == month)
			break;
	}
	while (calendar[++i])
	{
		var tmpSplit = calendar[i].getAttribute("data-original-title").split('h');
		tmpHours += parseInt(tmpSplit[0]);
		tmpMinutes += parseInt(tmpSplit[1]);

		if (tmpMinutes >= 60)
		{
			tmpHours++;
			tmpMinutes -= 60;
		}
	}
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
	const cloneDiv = generateLogcashDiv(divLogtime).then(function(result){

		divLogtime.appendChild(result);
		result.style.display = "none";
		resizeProgress();
		window.addEventListener("resize", resizeProgress);
		result.style.display = "";
		// divLogtime.className = "";
		// divLogtime.style.margin = "20px 0 0 0";
		// divLogtime.style.height = "100%";
		// divLogtime.style.backgroundColor = "#1d2028";
		// divLogtime.style.border = "1px solid #2d313c";
		// divLogtime.style.borderRadius = "3px";
		// divLogtime.style.padding = "20px 25px 25px 25px";
	});
}

var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
if (isOpera)
	changeColorPage();

initLogcash();
