
window.data = window.data || {};

data.updateLocalStorage = function(object) {
	localStorage.setItem("student42", JSON.stringify(object));
}

data.student = {
	pseudo: 0,
	salary: 0,
	hoursDeducted: 0,
	habit: [false, false, false, false, false, false, false],
};

data.init = function() {
	
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
			data.updateLocalStorage(data.student);

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
