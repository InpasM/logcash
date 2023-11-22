
window.data = window.data || {};

data.init = function() {
	
	// localStorage.removeItem("student42");
	let localStorageStud = localStorage.getItem("student42");
	const isHomePage = window.location.href.indexOf("users");

	if (isHomePage === -1)
	{
		displayMessage("On personal page");

		if (!localStorageStud)
		{
			const login = document.querySelector(".login").innerText;

			localStorage.setItem("student42", 
				JSON.stringify({pseudo: login}));
			displayMessage("student not found in localstorage, check for login: " + login);
			localStorageStud = localStorage.getItem("student42");
		}
		data.student = JSON.parse(localStorageStud);
	}
	else
	{
		displayMessage("on other intra page");
	}
}
