
window.data = window.data || {};

data.updateLocalStorage = function() {

	if (data.isHomePage === -1)
		localStorage.setItem("student42", JSON.stringify(data.student));
}

data.student = {
	pseudo: 0,
	salary: 0,
	hoursDeducted: 0,
	weeklyHabit: [false, false, false, false, false, false, false],
	monthlyHabit: [],
	whichHabit: 1,
	addBoostHalf: false,
	addBoostFull: false,
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

			displayMessage("student not found in localstorage, check for login: " + login);
			localStorageStud = localStorage.getItem("student42");
		}
		data.student = JSON.parse(localStorageStud);
	}
	else
	{
		displayMessage("On other intra page");
	}
}
