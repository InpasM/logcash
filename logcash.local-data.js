
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

monthObj = {
	yearIndex: 0,
	nameShort: 0,
	nameLong: 0,
	salary: 0,
	hoursDeducted: 0,
	timeDone: 0,
};

data.student = {
	pseudo: 0,
	addBoostHalf: false,
	addBoostFull: false,
	showMore: false,
	language: ENGLISH,
	sizeFont: 1.0,
	popupVisible: false,

	months: [],
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
	if (!student.sizeFont)
		student.sizeFont = 1.0;
	if (!student.popupVisible)
		student.popupVisible = false;
	if (!student.months)
		student.months = [];
	if (!student.monthlyHabit)
		student.monthlyHabit = [];
	return student;
}

data.init = function() {

	let localStorageStud = localStorage.getItem("student42");
	let localStorageGuest = localStorage.getItem("guest42");

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
	if (!data.student.months.length)
	{
		for (var i = 0; i < 4; i++)
		{
			data.student.months.push(monthObj);
		}
	}
}
