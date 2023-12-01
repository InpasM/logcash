
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

	elems.popupRemaining.appendChild(elems.popupTopDiv);
	elems.popupTopDiv.appendChild(elems.popupTopLeftText);
	elems.popupTopDiv.appendChild(elems.popupTopRightText);

	// POPUP INFO
	elems.popBottomDiv = document.createElement("div");
	elems.popBottomDiv.className = "pop-bottom-div";
	
	elems.popBottomDivLeft = document.createElement("div");
	elems.popBottomDivLeft.className = "pop-bottom-div-left";
	elems.bottomLine1 = document.createElement("div");
	elems.bottomLine1.className = "bottom-line-1";
	elems.bottomLine2 = document.createElement("div");
	elems.bottomLine2.className = "bottom-line-2";

	elems.popInput1 = document.createElement("div");
	elems.popInput1.className = "pop-input";
	elems.popInput1.style.marginRight = "7px";			/// STYLE
	elems.inputText1 = document.createElement("input");
	elems.inputText1.className = "inputText";
	elems.inputText1.type = "text";
	elems.inputText1.id = "inputSalary";
	elems.inputText1.setAttribute('required', '');
	elems.floatingLabel1 = document.createElement("span");
	elems.floatingLabel1.className = "floating-label";
	elems.floatingLabel1.innerText = "Your salary";
	
	elems.popInput2 = document.createElement("div");
	elems.popInput2.className = "pop-input";
	elems.inputText2 = document.createElement("input");
	elems.inputText2.className = "inputText";
	elems.inputText2.type = "text";
	elems.inputText2.id = "inputDeducted";
	elems.inputText2.setAttribute('required', '');
	elems.floatingLabel2 = document.createElement("span");
	elems.floatingLabel2.className = "floating-label";
	elems.floatingLabel2.innerText = "Hours Deducted";

	elems.weeklyHabit = document.createElement("div");
	elems.weeklyHabit.className = "weekly-habit";
	elems.weeklySpan = document.createElement("span");
	elems.weeklySpan.innerText = "Weekly Habit";
	elems.lineHabit = document.createElement("div");
	elems.lineHabit.className = "line-habit";

	elems.checkboxHabit1 = document.createElement("div");
	elems.checkboxHabit1.className = "checkbox-habit";
	elems.checkboxHabit1.id = "0";
	elems.checkboxHabit1.innerText = "M";
	elems.checkboxHabit2 = document.createElement("div");
	elems.checkboxHabit2.className = "checkbox-habit";
	elems.checkboxHabit2.id = "1";
	elems.checkboxHabit2.innerText = "T";
	elems.checkboxHabit3 = document.createElement("div");
	elems.checkboxHabit3.className = "checkbox-habit";
	elems.checkboxHabit3.id = "2";
	elems.checkboxHabit3.innerText = "W";
	elems.checkboxHabit4 = document.createElement("div");
	elems.checkboxHabit4.className = "checkbox-habit";
	elems.checkboxHabit4.id = "3";
	elems.checkboxHabit4.innerText = "T";
	elems.checkboxHabit5 = document.createElement("div");
	elems.checkboxHabit5.className = "checkbox-habit";
	elems.checkboxHabit5.id = "4";
	elems.checkboxHabit5.innerText = "F";
	elems.checkboxHabit6 = document.createElement("div");
	elems.checkboxHabit6.className = "checkbox-habit";
	elems.checkboxHabit6.id = "5";
	elems.checkboxHabit6.innerText = "S";
	elems.checkboxHabit7 = document.createElement("div");
	elems.checkboxHabit7.className = "checkbox-habit";
	elems.checkboxHabit7.id = "6";
	elems.checkboxHabit7.innerText = "S";

	elems.floatingLabel2.className = "floating-label";
	elems.floatingLabel2.innerText = "Hours Deducted";
	
	elems.popBottomDivRight = document.createElement("div");
	elems.popBottomDivRight.className = "pop-bottom-div-right";
	elems.resultsContainer1 = document.createElement("div");
	elems.resultsContainer1.className = "results-container";
	elems.mainTitleInfo1 = document.createElement("p");
	elems.mainTitleInfo1.className = "main-title-info";
	elems.mainTitleInfo1.innerText = "Days Remaining";
	elems.lineResults1 = document.createElement("div");
	elems.lineResults1.className = "line-results";
	elems.lineResultsLeft1 = document.createElement("div");
	elems.lineResultsLeft1.className = "line-results-left";
	elems.numberLabel1 = document.createElement("span");
	elems.numberLabel1.className = "number-label";
	elems.numberLabel1.innerText = "Open";
	elems.numberResult1 = document.createElement("p");
	elems.numberResult1.className = "number-result";
	elems.numberResult1.id = "result-open";
	elems.numberResult1.innerText = "0";

	// elems.numberLabel2 = document.createElement("span");
	// elems.numberLabel2.className = "number-label";
	// elems.numberLabel2.innerText = "Total";

	elems.lineSeparator1 = document.createElement("div");
	elems.lineSeparator1.className = "line-separator";
	elems.lineSeparator2 = document.createElement("div");
	elems.lineSeparator2.className = "line-separator";

	elems.lineResultsRight1 = document.createElement("div");
	elems.lineResultsRight1.className = "line-results-right";
	elems.numberLabel2 = document.createElement("span");
	elems.numberLabel2.className = "number-label";
	elems.numberLabel2.innerText = "Total";
	elems.numberResult2 = document.createElement("p");
	elems.numberResult2.className = "number-result";
	elems.numberResult2.innerText = "0";

	elems.lineResultsLeft2 = document.createElement("div");
	elems.lineResultsLeft2.className = "line-results-left";
	elems.numberLabel2 = document.createElement("span");
	elems.numberLabel2.className = "number-label";
	elems.numberLabel2.innerText = "Total";

	elems.numberLabel3 = document.createElement("span");
	elems.numberLabel3.className = "number-label";
	elems.numberLabel3.innerText = "Earned";
	elems.numberResult3 = document.createElement("p");
	elems.numberResult3.className = "number-result";
	elems.numberResult3.id = "result-earned";
	elems.numberResult3.innerText = "0";

	elems.resultsContainer2 = document.createElement("div");
	elems.resultsContainer2.className = "results-container";
	elems.mainTitleInfo2 = document.createElement("p");
	elems.mainTitleInfo2.className = "main-title-info";
	elems.mainTitleInfo2.innerText = "Salary";
	elems.lineResults2 = document.createElement("div");
	elems.lineResults2.className = "line-results";
	
	elems.weeklyHabit.appendChild(elems.weeklySpan);
	elems.weeklyHabit.appendChild(elems.lineHabit);
	elems.lineHabit.appendChild(elems.checkboxHabit1);
	elems.lineHabit.appendChild(elems.checkboxHabit2);
	elems.lineHabit.appendChild(elems.checkboxHabit3);
	elems.lineHabit.appendChild(elems.checkboxHabit4);
	elems.lineHabit.appendChild(elems.checkboxHabit5);
	elems.lineHabit.appendChild(elems.checkboxHabit6);
	elems.lineHabit.appendChild(elems.checkboxHabit7);

	elems.popBottomDiv.appendChild(elems.popBottomDivLeft);
	elems.popBottomDivLeft.appendChild(elems.bottomLine1);
	elems.popBottomDivLeft.appendChild(elems.bottomLine2);
	elems.bottomLine1.appendChild(elems.popInput1);
	elems.bottomLine1.appendChild(elems.popInput2);
	
	elems.popInput1.appendChild(elems.inputText1);
	elems.popInput1.appendChild(elems.floatingLabel1);
	
	elems.popInput2.appendChild(elems.inputText2);
	elems.popInput2.appendChild(elems.floatingLabel2);

	elems.bottomLine2.appendChild(elems.weeklyHabit);
	
	elems.resultsContainer1.appendChild(elems.mainTitleInfo1);
	elems.resultsContainer1.appendChild(elems.lineResults1);
	elems.lineResultsLeft1.appendChild(elems.numberLabel1);
	elems.lineResultsLeft1.appendChild(elems.numberResult1);
	elems.lineResultsLeft2.appendChild(elems.numberLabel3);
	elems.lineResultsLeft2.appendChild(elems.numberResult3);
	elems.lineResultsRight1.appendChild(elems.numberLabel2);
	elems.lineResultsRight1.appendChild(elems.numberResult2);
	elems.lineResults1.appendChild(elems.lineResultsLeft1);
	elems.lineResults1.appendChild(elems.lineResultsRight1);
	
	elems.resultsContainer2.appendChild(elems.mainTitleInfo2);
	elems.resultsContainer2.appendChild(elems.lineResults2);
	elems.lineResults2.appendChild(elems.lineResultsLeft2);
	elems.lineResults2.appendChild(elems.lineSeparator2);

	elems.popBottomDivRight.appendChild(elems.resultsContainer1);
	elems.popBottomDivRight.appendChild(elems.resultsContainer2);
	elems.popBottomDiv.appendChild(elems.popBottomDivRight);

	elems.popupRemaining.appendChild(elems.popBottomDiv);
	document.body.appendChild(elems.popupRemaining);

	elems.checkboxes = document.querySelectorAll(".checkbox-habit");
}

function disableTextSelection() {

	document.body.style.MozUserSelect = "none";
	document.body.style.WebkitUserSelect = "none";
	document.body.style.KhtmlUserSelect = "none";
	document.body.style.MsUserSelect = "none";
	document.body.style.UserSelect = "none";
}

popup.setStyle = function(elems) {

	elems.popupRemaining.style.opacity = "0"; // set to zero
	// elems.popupRemaining.style.display = "flex";
	elems.popupRemaining.style.display = "none";
	// elems.popupRemaining.style.width = "fit-contain";
	elems.popupRemaining.style.position = "absolute";
	elems.popupRemaining.style.borderRadius = "4px";
	elems.popupRemaining.style.zIndex = "1000";
	elems.popupRemaining.style.backgroundColor = "rgba(37, 41, 50, 0.9)";
	elems.popupRemaining.style.border = "1px solid #2d313c";
	elems.popupRemaining.style.boxShadow = "0px 10px 15px #12141a3a";
	elems.popupRemaining.style.backdropFilter = "blur(6px)";

	elems.popupRemaining.style.top = "80px"; // remove
	elems.popupRemaining.style.right = "40px"; // remove
	
	elems.popupTopDiv.style.cursor = "move";
	elems.popupTopDiv.style.height = "fit-content";
	elems.popupTopDiv.style.borderRadius = "4px";
	elems.popupTopDiv.style.borderBottom = "1px solid #2d313c";
	elems.popupTopDiv.style.display = "flex";
	elems.popupTopDiv.style.flexDirection = "column";
	elems.popupTopDiv.style.justifyContent = "flex-start";
	elems.popupTopDiv.style.color = "#9b9b9b";
	elems.popupTopDiv.style.whiteSpace = "nowrap";

	elems.popupTopLeftText.style.color = "#e2e2e2";
	elems.popupTopLeftText.style.fontSize = "0.9em";
	elems.popupTopLeftText.style.fontWeight = "bold";
	elems.popupTopLeftText.style.pointerEvents = "none";
	elems.popupTopLeftText.style.textShadow = "rgb(0, 0, 0) 0px 0px 3px";
	
	elems.popupTopRightText.style.fontSize = "0.7em";
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

	// const checkboxes = document.querySelectorAll(".checkbox-habit");

	elems.popupTopRightText.innerText = data.student.pseudo;
	for (var i = 0; i < elems.checkboxes.length; i++)
	{
		// console.log(i + " " + data.student.habit[i]);
		if (data.student.habit[i])
			elems.checkboxes[i].style.borderColor = "rgb(0, 186, 188)";
		else
			elems.checkboxes[i].style.borderColor = "rgb(45, 49, 60)";
	}

	const date = new Date();
	var numberYear = date.getFullYear();
	var numberMonth = date.getMonth();
	var numberDay = date.getDate();

	var numberDays = getOpenDays(numberYear, numberMonth, numberDay);

	elems.numberResult1.innerText = numberDays.open;
	elems.numberResult2.innerText = numberDays.total;

	// const resultOpen = document.querySelector("#result-open");
	// const resultTotal = document.querySelector("#result-total");
	// resultOpen.innerText = numberDays.open;
	// resultTotal.innerText = numberDays.total;

	// console.log("Number total day remaining: " + numberDays.total + "  -  Number open day: " + numberDays.open);
}

function clickHabit(e) {
	
	const index = parseInt(e.target.id);

	// console.log(e.target.id);
	if (data.student.habit[index])
	{
		// console.log(e.target.id + ": false");
		data.student.habit[index] = false;
		e.target.style.borderColor = "rgb(45, 49, 60)";
	}
	else
	{
		// console.log(e.target.id + ": true");
		data.student.habit[index] = true;
		e.target.style.borderColor = "rgb(0, 186, 188)";
	}
	data.updateLocalStorage(data.student);
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

	// put in setStyle
	elems.inputText1.value = data.student.salary;
	elems.inputText2.value = data.student.hoursDeducted;

	elems.inputText1.addEventListener("blur", function(e) {
		if (isNaN(e.target.value))
			e.target.value = 0;
		else
		{
			data.student.salary = e.target.value;
			data.updateLocalStorage(data.student);
		}
	});

	elems.inputText2.addEventListener("blur", function(e) {
		if (isNaN(e.target.value))
			e.target.value = 0;
		else
		{
			data.student.hoursDeducted = e.target.value;
			data.updateLocalStorage(data.student);
		}
	});

	for (var i = 0; i < elems.checkboxes.length; i++)
	{
		elems.checkboxes[i].addEventListener("click", clickHabit);
	}
	elems.inputText1.addEventListener("click", function(e) { this.select(); });
	elems.inputText2.addEventListener("click", function(e) { this.select(); });
}
