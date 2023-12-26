
window.data = window.data || {};

data.updateLocalStorage = function() {

	if (data.isHomePage === -1)
		localStorage.setItem("student42", JSON.stringify(data.student));
}

monthObj = {
	yearIndex: 0,
	nameShort: 0,
	nameLong: 0,
	salary: 0,
	hoursDeducted: 0,
	monthlyHabit: 0,
	timeDone: 0,
	// timeRequire: 0,
};

data.student = {
	// DATA GLOBAL
	pseudo: 0,
	addBoostHalf: false,
	addBoostFull: false,
	showMore: false,
	indexLastMonth: -1,

	// ARRAY MONTH // up to 12 month save
	months: [],

	// salary: 0,
	// hoursDeducted: 0,
	// monthlyHabit: [],
};

data.session = {
	logAtSchool: false,
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

data.init = function() {

	// console.log(localStorageSpace());
	
	// localStorage.removeItem("student42");
	let localStorageStud = localStorage.getItem("student42");

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
		data.student = JSON.parse(localStorageStud);
	}
	else
	{
		displayMessage("On other intra page");
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
	// console.log(data.student.months);
}
