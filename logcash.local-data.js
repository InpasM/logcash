
///////////////////// GLOBAL VAR /////////////////////
window.data = window.data || {};
var REMAINING = 1,
	EACH = 2;
var ENGLISH = 0,
	FRENCH = 1;

data.updateLocalStorage = function() {

	if (data.isHomePage === -1)
		localStorage.setItem("student42", JSON.stringify(data.student));
	else
	{
		localStorage.setItem("guest42", JSON.stringify(data.student));
	}
}

data.student = {
	pseudo: 0,
	addBoostHalf: false,
	addBoostFull: false,
	showMore: false,
	language: ENGLISH,
	sizePanel: 1.0,
	popupVisible: true,
	positionTop: 0,
	percentPositionLeft: 0,

	months: [],
	monthsFuture: [],
	monthlyHabit: [],
};

data.session = {
	devMode: false,
	logAtSchool: false,
	logtimeMode: 0,
	remTodayLockOff: 0,
	remTodayLockMin: 0,
	remTodayLockMax: 0,
	eachDayLockOff: 0,
	eachDayLockMin: 0,
	eachDayLockMax: 0,
	timeLock: 0,
	numberDays: 0,
	lockTime: 0,
	onCurrentMonth: true,
	futureMonthIndex: 0,
	date: new Date(),

	futureMonths: [],
	// date: new Date("2024-02-01"),	// TESTS
};

var localStorageSpace = function(){
	var allStrings = '';
	for(var key in window.localStorage){
		if(window.localStorage.hasOwnProperty(key)){
			allStrings += window.localStorage[key];
		}
	}
	return allStrings ? 3 + ((allStrings.length*16)/(8*1024)) + ' KB' : 'Empty (0 KB)';
};

function parseLocalStorage(itemStudent) {

	var student = JSON.parse(itemStudent);

	if (!student.pseudo)
	{
		var login = document.querySelector(".login").innerText;

		if (login)
			student.pseudo = login;
		else
			student.pseudo = "No Name";
	}
	if (!student.addBoostHalf)
		student.addBoostHalf = false;
	if (!student.addBoostFull)
		student.addBoostFull = false;
	if (!student.showMore)
		student.showMore = false;
	if (!student.language)
		student.language = ENGLISH;
	if (!student.sizePanel)
		student.sizePanel = 1.0;
	if (!student.popupVisible)
		student.popupVisible = false;
	if (!student.positionTop)
		student.positionTop = 0;
	if (!student.percentPositionLeft)
		student.percentPositionLeft = 0;
	if (!student.months || !student.months.length)
	{
		student.months = [];

		for (var i = 0; i < 4; i++)
		{
			var monthObj = {
				yearIndex: 0,
				monthIndex: 0,
				nameShort: 0,
				nameLong: 0,
				salary: 0,
				date: 0,
				numberDays: 0,
				hoursDeducted: 0,
				hoursRequired: 0,
				timeDone: 0,
			};
			student.months.push(monthObj);
		}
	}
	else
	{
		for (var i = 0; i < student.months.length; i++)
		{
			if (!student.months[i].yearIndex)
				student.months[i].yearIndex = 0;
			if (!student.months[i].monthIndex)
				student.months[i].monthIndex = 0;
			if (!student.months[i].nameShort)
				student.months[i].nameShort = 0;
			if (!student.months[i].nameLong)
				student.months[i].nameLong = 0;
			if (!student.months[i].salary)
				student.months[i].salary = 0;
			if (!student.months[i].hoursDeducted)
				student.months[i].hoursDeducted = 0;
			if (!student.months[i].hoursRequired)
				student.months[i].hoursRequired = 0;
			if (!student.months[i].timeDone)
				student.months[i].timeDone = 0;
		}
	}
	if (!student.monthsFuture || !student.monthsFuture.length)
	{
		student.monthsFuture = [];

		for (var i = 0; i < 4; i++)
		{
			var monthObj = {
				yearIndex: 0,
				monthIndex: 0,
				nameShort: 0,
				nameLong: 0,
				salary: 0,
				date: 0,
				numberDays: 0,
				hoursDeducted: 0,
				hoursRequired: 0,
				timeDone: 0,
				monthlyHabit: [],
			};
			student.monthsFuture.push(monthObj);
		}
	}
	else
	{
		for (var i = 0; i < student.monthsFuture.length; i++)
		{
			if (!student.monthsFuture[i].yearIndex)
				student.monthsFuture[i].yearIndex = 0;
			if (!student.monthsFuture[i].monthIndex)
				student.monthsFuture[i].monthIndex = 0;
			if (!student.monthsFuture[i].nameShort)
				student.monthsFuture[i].nameShort = 0;
			if (!student.monthsFuture[i].nameLong)
				student.monthsFuture[i].nameLong = 0;
			if (!student.monthsFuture[i].salary)
				student.monthsFuture[i].salary = 0;
			if (!student.monthsFuture[i].hoursDeducted)
				student.monthsFuture[i].hoursDeducted = 0;
			if (!student.monthsFuture[i].hoursRequired)
				student.monthsFuture[i].hoursRequired = 0;
			if (!student.monthsFuture[i].timeDone)
				student.monthsFuture[i].timeDone = 0;
			if (!student.monthsFuture[i].monthlyHabit || !student.monthsFuture[i].monthlyHabit.length)
				student.monthsFuture[i].monthlyHabit = [];
		}
	}

	if (!student.monthlyHabit)
		student.monthlyHabit = [];
	return student;
}

data.init = function() {

	let localStorageStud = localStorage.getItem("student42");
	let localStorageGuest = localStorage.getItem("guest42");

	// localStorage.removeItem("student42");

	data.isHomePage = window.location.href.indexOf("users");
	if (data.isHomePage === -1)
	{
		displayMessage("On personal page");

		if (!localStorageStud)
		{
			const login = document.querySelector(".login").innerText;

			data.student.pseudo = login;
			data.updateLocalStorage();

			displayMessage("Create new student42: " + login);
			localStorageStud = localStorage.getItem("student42");
		}
		data.student = parseLocalStorage(localStorageStud);
	}
	else
	{
		displayMessage("On other intra page");
		const login = document.querySelector(".login").innerText;

		if (!localStorageGuest)
		{
			data.student.pseudo = login;
			data.updateLocalStorage();

			displayMessage("Create new guest: " + login);
			localStorageGuest = localStorage.getItem("guest42");
			data.student = parseLocalStorage(localStorageGuest);
		}
		else
		{
			var tmpGuest = JSON.parse(localStorageGuest);

			if (tmpGuest.pseudo === login)
			{
				data.student = parseLocalStorage(localStorageGuest);
			}
			else
			{
				data.student.pseudo = login;
				data.updateLocalStorage();
			}
		}
	}
	if (!data.student.months)
		localStorage.removeItem("student42");

	////////////////////////////////////// CHECK if yearIndex not define do it for all months before and actual
	if (!data.student.months[0].yearIndex)
	{
		var yearIndex = data.session.date.getFullYear();
		var monthIndex = data.session.date.getMonth();

		for (var i = data.student.months.length - 1; i >= 0; i--)
		{
			data.student.months[i].yearIndex = yearIndex;
			data.student.months[i].monthIndex = monthIndex;
			monthIndex -= 1;
			if (monthIndex < 0)
			{
				yearIndex--;
				monthIndex = 11;
			}
		}
	}

	//////////////////////////////////////////// CHECK if yearIndex not define do it for all future months
	if (!data.student.monthsFuture[0].yearIndex)
	{
		var yearIndex = data.session.date.getFullYear();
		var monthIndex = data.session.date.getMonth();

		for (var i = 0; i < data.student.monthsFuture.length; i++)
		{
			monthIndex += 1;
			if (monthIndex > 11)
			{
				yearIndex++;
				monthIndex = 0;
			}
			data.student.monthsFuture[i].yearIndex = yearIndex;
			data.student.monthsFuture[i].monthIndex = monthIndex;
			if (!data.student.monthsFuture[i].monthlyHabit.length)
			{
				var tmpDate = new Date(data.student.monthsFuture[i].yearIndex, data.student.monthsFuture[i].monthIndex + 1, 0);
				for (var j = 0; j < tmpDate.getDate(); j++)
				{
					data.student.monthsFuture[i].monthlyHabit.push(false);
				}
			}
		}
	}

	if (data.session.date.getDate() === 1)
	{
		var actualYearIndex = data.session.date.getFullYear();
		var actualMonthIndex = data.session.date.getMonth();

		if (!(actualYearIndex === data.student.months[data.student.months.length - 1].yearIndex && actualMonthIndex === data.student.months[data.student.months.length - 1].monthIndex))
		{
			displayMessage("NEW Month, update of Month ARRAY");

			data.student.monthlyHabit = data.student.monthsFuture[0].monthlyHabit;
			data.student.monthsFuture[0].monthlyHabit = 0;
			data.student.months.shift();
			data.student.months.push({...data.student.monthsFuture[0]});

			var futureYearIndex = data.student.monthsFuture[data.student.monthsFuture.length - 1].yearIndex;
			var futureMonthIndex = data.student.monthsFuture[data.student.monthsFuture.length - 1].monthIndex;

			futureMonthIndex += 1;
			if (futureMonthIndex > 11)
			{
				futureYearIndex++;
				futureMonthIndex = 0;
			}
			var monthFutureObj = {
				yearIndex: futureYearIndex,
				monthIndex: futureMonthIndex,
				nameShort: 0,
				nameLong: 0,
				salary: 0,
				hoursDeducted: 0,
				hoursRequired: 0,
				timeDone: 0,
			};
			data.student.monthsFuture.shift();
			data.student.monthsFuture.push(monthFutureObj);
		}
	}
}
