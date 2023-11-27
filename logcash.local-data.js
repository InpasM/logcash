
window.data = window.data || {};

data.updateLocalStorage = function(object) {
	localStorage.setItem("student42", JSON.stringify(object));
}

// data.object = {
// 	pseudo: 0,
// 	salary: 0,
// 	hoursDeducted: 0,
// };

data.student = {};

data.init = function() {
	
	let localStorageStud = localStorage.getItem("student42");

	// localStorage.removeItem("student42");
	data.isHomePage = window.location.href.indexOf("users");
	if (data.isHomePage === -1)
	{
		displayMessage("On personal page");

		if (!localStorageStud)
		{
			const login = document.querySelector(".login").innerText;

			// data.object.pseudo = login;
			data.student.pseudo = login;

			// data.object = {
			// 	pseudo: login,
			// 	salary: 0,
			// 	hoursDeducted: 0,
			// }
			data.updateLocalStorage(data.student);
			// localStorage.setItem("student42", 
			// 	JSON.stringify(data.object));
			displayMessage("student not found in localstorage, check for login: " + login);
			localStorageStud = localStorage.getItem("student42");
		}
		data.student = JSON.parse(localStorageStud);
		// data.object.pseudo = data.student.pseudo;
		// data.object.salary = data.student.salary;
		// data.object.hoursDeducted = data.student.hoursDeducted;
		// data.updateLocalStorage();
	}
	else
	{
		displayMessage("On other intra page");
	}
}
