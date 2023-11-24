
window.data = window.data || {};

data.init = function() {
	
	let localStorageStud = localStorage.getItem("student42");
	data.student = 0;

	data.isHomePage = window.location.href.indexOf("users");
	if (data.isHomePage === -1)
	{
		displayMessage("On personal page");

		if (!localStorageStud)
		{
			const login = document.querySelector(".login").innerText;

			data.object = {
				pseudo: login,
			}
			localStorage.setItem("student42", 
				JSON.stringify(data.object));
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
