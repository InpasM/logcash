
window.data = window.data || {};

data.init = function() {
	
	const localStorageStud = localStorage.getItem("student42");
	// const localStorageGuest = localStorage.getItem("guest42");

	console.log(window.location.href.indexOf("users"));
	const isHomePage = window.location.href.indexOf("users");

	if (isHomePage === -1)
	{
		console.log("on personal page");

		if (!localStorageStud)
		{
			const login = document.querySelector(".login").innerText;

			localStorage.setItem("student42", 
				JSON.stringify({pseudo: login}));
			console.log("student not found in localstorage, check for login: " + login);
		}
		// else
		// {
			data.student = JSON.parse(localStorageStud);
			// console.log(data.student.pseudo + " found in storage");
		// }
	}
	else
	{
		console.log("on other intra page");
	}
}
