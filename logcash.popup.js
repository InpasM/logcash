
window.popup = window.popup || {};

popup.createElems = function(elems) {

	elems.popupRemaining = document.createElement("div");
	elems.popupRemaining.className = "popup-remaining";

	elems.popupTopDiv = document.createElement("div");
	elems.popupTopDiv.className = "popup-top-div";
	
	elems.popupTopLeftText = document.createElement("p");
	elems.popupTopLeftText.className = "popup-top-left-text";
	elems.popupTopLeftText.innerText = "Logcash";

	elems.popupTopRightText = document.createElement("p");
	elems.popupTopRightText.className = "popup-top-right-text";
	// elems.popupTopRightText.innerText = "msapin";

	elems.popupRemaining.appendChild(elems.popupTopDiv);
	elems.popupTopDiv.appendChild(elems.popupTopLeftText);
	elems.popupTopDiv.appendChild(elems.popupTopRightText);
	
	// console.log(elems.popupRemaining);
	document.body.appendChild(elems.popupRemaining);
}

function disableTextSelection() {

	document.body.style.MozUserSelect = "none";
	document.body.style.WebkitUserSelect = "none";
	document.body.style.KhtmlUserSelect = "none";
	document.body.style.MsUserSelect = "none";
	document.body.style.UserSelect = "none";
}

popup.setStyle = function(elems) {

	elems.popupRemaining.style.opacity = "1"; // set to zero
	elems.popupRemaining.style.display = "flex";
	elems.popupRemaining.style.position = "absolute";
	elems.popupRemaining.style.height = "100px";
	// elems.popupRemaining.style.width = "fit-content";
	elems.popupRemaining.style.borderRadius = "4px";
	elems.popupRemaining.style.zIndex = "1000";
	elems.popupRemaining.style.backgroundColor = "#252932";
	elems.popupRemaining.style.border = "1px solid #2d313c";
	elems.popupRemaining.style.boxShadow = "0px 10px 15px #12141a3a";

	elems.popupRemaining.style.top = "60px"; // remove
	elems.popupRemaining.style.left = "20px"; // remove
	
	elems.popupTopDiv.style.cursor = "move";
	elems.popupTopDiv.style.height = "fit-content";
	// elems.popupTopDiv.style.width = "100%";
	elems.popupTopDiv.style.borderRadius = "4px";
	elems.popupTopDiv.style.borderBottom = "1px solid #2d313c";
	elems.popupTopDiv.style.display = "flex";
	elems.popupTopDiv.style.flexDirection = "column";
	elems.popupTopDiv.style.justifyContent = "flex-start";
	elems.popupTopDiv.style.color = "#9b9b9b";
	// elems.popupTopDiv.style.padding = "6px 30px 6px 6px";
	elems.popupTopDiv.style.whiteSpace = "nowrap";

	elems.popupTopLeftText.style.color = "#e2e2e2";
	elems.popupTopLeftText.style.fontSize = "0.9em";
	elems.popupTopLeftText.style.fontWeight = "bold";
	elems.popupTopLeftText.style.pointerEvents = "none";
	// elems.popupTopLeftText.style.margin = "0 0 2px 0";
	// elems.popupTopLeftText.style.padding = "0 1px";
	elems.popupTopLeftText.style.textShadow = "rgb(0, 0, 0) 0px 0px 3px";
	
	// elems.popupTopRightText.style.color = "#9b9b9b";
	elems.popupTopRightText.style.fontSize = "0.7em";
	
	// elems.popupTopRightText.style.margin = "0";
	// elems.popupTopRightText.style.padding = "2px 1px 2px 2px";
	// elems.popupTopRightText.style.pointerEvents = "none";
	// elems.popupTopRightText.style.pointerEvents = "pointerenter";
	elems.popupTopRightText.style.textShadow = "rgb(0, 0, 0) 0px 0px 3px";
}

function isCheckboxUse() {

	for (var i = 0; i < data.student.habit.length; i++)
	{
		if (data.student.habit[i])
			return true;
	}
	return false;
}

function getOpenDays(numberYear, numberMonth, numberDay) {

	const numberDaysInMonth = new Date(numberYear, numberMonth + 1, 0).getDate();
	const todayDate = new Date();
	var actualDay = todayDate.getDay();
	var openDays = 0;
	var totalDays = 0;

	// numberDay = 1;	// tmp

	var i = numberDay - 1;
	var indexHabit = actualDay - 1;
	var useAll = isCheckboxUse();

	while (++i <= numberDaysInMonth)
	{
		if (indexHabit === 7)
		{
			indexHabit = 0;
		}
		// console.log("check data for day: " + actualDay);
		if (actualDay == 7)
			actualDay = 0;
		if (actualDay >= 1 && actualDay <= 5)
		{
			if (data.student.habit[indexHabit] || !useAll)
				openDays++;
		}
		// console.log(i + " / " + numberDaysInMonth + "  -  habit: " + data.student.habit[indexHabit]);
		if (data.student.habit[indexHabit] || !useAll)
		{
			totalDays++;
		}
		
		indexHabit++;
		actualDay++;
	}
	return ({open: openDays, total: totalDays});
}

function setData(elems) {

	elems.popupTopRightText.innerText = data.student.pseudo;


	// TMP
	const checkboxes = document.querySelectorAll(".checkbox-habit");
	for (var i = 0; i < checkboxes.length; i++)
	{

		if (data.student.habit[i])
		{
			checkboxes[i].style.borderColor = "rgb(0, 186, 188)";
		}
		else
		{
			checkboxes[i].style.borderColor = "rgb(45, 49, 60)";
		}
		// data.updateLocalStorage(data.student);
	}

	const date = new Date();
	var numberYear = date.getFullYear();
	var numberMonth = date.getMonth();
	var numberDay = date.getDate();

	var numberDays = getOpenDays(numberYear, numberMonth, numberDay);

	console.log("Number total day remaining: " + numberDays.total + "  -  Number open day: " + numberDays.open);
}

popup.initPopup = function(elems) {

	var mouseDown = false,
		popupOffset = [0, 0];

	popup.createElems(elems);
	popup.setStyle(elems);
	setData(elems);
	disableTextSelection();
	elems.popupTopDiv.addEventListener("mousedown", function(e) {
		mouseDown = true;
		popupOffset = [elems.popupRemaining.offsetLeft - e.clientX, elems.popupRemaining.offsetTop - e.clientY];
	})
	document.body.addEventListener("mousemove", function(e) {

		e.stopPropagation();
		if (mouseDown) {
			elems.popupRemaining.style.top = e.clientY + popupOffset[1] + "px";
			elems.popupRemaining.style.left = e.clientX + popupOffset[0] + "px";
		}
	})
	document.body.addEventListener("mouseup", function() {
		mouseDown = false;
	})

	if (devMode)
	{
		// tmp
		const inputSalary = document.querySelector("#inputSalary");
		const inputDeducted = document.querySelector("#inputDeducted");
		const checkboxes = document.querySelectorAll(".checkbox-habit");
	
		elems.popupRemaining.style.display = "none";

		// put in setStyle
		inputSalary.value = data.student.salary;
		inputDeducted.value = data.student.hoursDeducted;
	
		inputSalary.addEventListener("blur", function(e) {
			if (isNaN(e.target.value))
				e.target.value = 0;
			else
			{
				data.student.salary = e.target.value;
				data.updateLocalStorage(data.student);
			}
		});
	
		inputDeducted.addEventListener("blur", function(e) {
			if (isNaN(e.target.value))
				e.target.value = 0;
			else
			{
				data.student.hoursDeducted = e.target.value;
				data.updateLocalStorage(data.student);
			}
		});

		for (var i = 0; i < checkboxes.length; i++)
		{
			checkboxes[i].addEventListener("click", function(e) {

				const index = parseInt(e.target.id);

				// console.log(data.student.habit[parseInt(e.target.id)]);
				// console.log(data.student.habit.one);

				if (data.student.habit[index])
				{
					data.student.habit[index] = false;
					e.target.style.borderColor = "rgb(45, 49, 60)";
				}
				else
				{
					data.student.habit[index] = true;
					e.target.style.borderColor = "rgb(0, 186, 188)";
				}
				data.updateLocalStorage(data.student);
			});
		}
		inputSalary.addEventListener("click", function(e) { this.select(); });
		inputDeducted.addEventListener("click", function(e) { this.select(); });
	}
}
