
window.popup = window.popup || {};

popup.createElems = function(elems) {

	elems.popupRemaining = document.createElement("div");
	elems.popupRemaining.className = "popup-remaining";

	elems.popupTopDiv = document.createElement("div");
	elems.popupTopDiv.className = "popup-top-div";
	
	elems.popupTopLeftText = document.createElement("p");
	// elems.popupTopLeftText.className = "popup-top-left-text";
	elems.popupTopLeftText.innerText = "Logcash";

	elems.popupTopRightText = document.createElement("p");
	// elems.popupTopRightText.className = "popup-top-right-text";

	elems.popupRemaining.appendChild(elems.popupTopDiv);
	elems.popupTopDiv.appendChild(elems.popupTopLeftText);
	elems.popupTopDiv.appendChild(elems.popupTopRightText);

	// POPUP INFO
	elems.popMiddleDiv = document.createElement("div");
	elems.popMiddleDiv.className = "pop-middle-div";
	
	elems.popMiddleDivLeft = document.createElement("div");
	elems.popMiddleDivLeft.className = "pop-middle-div-left";
	elems.middleLine1 = document.createElement("div");
	elems.middleLine1.className = "middle-line-1";
	elems.middleLine2 = document.createElement("div");
	elems.middleLine2.className = "middle-line-2";

	elems.inputContainerSalary = document.createElement("div");
	// elems.inputContainerSalary.className = "pop-input-container";
	elems.inputContainerSalary.style.marginRight = "7px";			/// STYLE
	elems.inputContainerSalary.style.backgroundColor = "#373c48";
	elems.inputContainerSalary.style.maxHeight = "fit-content";
	elems.inputContainerSalary.style.maxWidth = "80px";
	elems.inputContainerSalary.style.padding = "6px";
	elems.inputContainerSalary.style.color = "white";
	elems.inputContainerSalary.style.border = "2px solid rgb(45, 49, 60)";
	elems.inputContainerSalary.style.borderRadius = "6px";
	elems.inputContainerSalary.style.display = "flex";
	elems.inputContainerSalary.style.flexDirection = "column";

	elems.inputSalary = document.createElement("input");
	// elems.inputSalary.className = "inputText";
	elems.inputSalary.type = "text";
	elems.inputSalary.setAttribute('required', '');
	elems.inputSalary.style.backgroundColor = "#373c48";			/// STYLE
	elems.inputSalary.style.color = "rgb(198, 198, 198)";
	elems.inputSalary.style.outline = "none";
	elems.inputSalary.style.border = "none";
	elems.inputSalary.style.fontSize = "16px";

	elems.labelSalary = document.createElement("span");
	elems.labelSalary.className = "label-input";
	// elems.labelSalary.fontSize = "10px";
	elems.labelSalary.innerText = "Your salary";
	

	elems.inputContainerHours = document.createElement("div");
	// elems.inputContainerHours.className = "pop-input-container";
	elems.inputContainerHours.style.backgroundColor = "#373c48";			/// STYLE
	elems.inputContainerHours.style.maxHeight = "fit-content";
	elems.inputContainerHours.style.maxWidth = "80px";
	elems.inputContainerHours.style.padding = "6px";
	elems.inputContainerHours.style.color = "white";
	elems.inputContainerHours.style.border = "2px solid rgb(45, 49, 60)";
	elems.inputContainerHours.style.borderRadius = "6px";
	elems.inputContainerHours.style.display = "flex";
	elems.inputContainerHours.style.flexDirection = "column";

	elems.inputDeducted = document.createElement("input");
	// elems.inputDeducted.className = "inputText";
	elems.inputDeducted.type = "text";
	elems.inputDeducted.setAttribute('required', '');
	elems.inputDeducted.style.backgroundColor = "#373c48";			/// STYLE
	elems.inputDeducted.style.color = "rgb(198, 198, 198)";
	elems.inputDeducted.style.outline = "none";
	elems.inputDeducted.style.border = "none";
	elems.inputDeducted.style.fontSize = "16px";

	elems.labelHours = document.createElement("span");
	elems.labelHours.className = "label-input";
	elems.labelHours.innerText = "Hours Deducted";

	elems.weeklyHabit = document.createElement("div");
	elems.weeklyHabit.className = "weekly-habit";
	elems.weeklySpan = document.createElement("span");
	elems.weeklySpan.innerText = "Weekly Habit";
	elems.lineHabit = document.createElement("div");
	elems.lineHabit.className = "line-habit";

	elems.checkboxes = [];
	const arrayDaysLetter = ["S", "M", "T", "W", "T", "F", "S"];
	for (var i = 0; i < 7; i++)
	{
		elems.checkboxes[i] = document.createElement("div");
		elems.checkboxes[i].className = "checkbox-habit";
		elems.checkboxes[i].id = i;
		elems.checkboxes[i].innerText = arrayDaysLetter[i];
	}


	//////////////////////////////////////////////////////////////////////  MIDDLE RIGHT DIV
	elems.popMiddleDivRight = document.createElement("div");
	elems.popMiddleDivRight.className = "pop-middle-div-right";

	elems.salaryContainer = document.createElement("div");
	elems.salaryContainer.className = "salary-container";

	elems.mainTitleInfo = document.createElement("p");
	elems.mainTitleInfo.className = "main-title-info";
	elems.mainTitleInfo.innerText = "Earned";
	elems.lineThisSelection = document.createElement("div");
	elems.lineThisSelection.className = "line-this-selection";
	elems.salaryCircleContainer = document.createElement("div");
	elems.salaryCircleContainer.className = "salary-circle-container";

	elems.thisButtonMonth = document.createElement("div");
	elems.thisButtonMonth.className = "this-button selected";
	elems.thisButtonMonth.innerText = "Month";
	elems.thisButtonMonth.style.marginRight = "6px";
	elems.thisButtonWeek = document.createElement("div");
	elems.thisButtonWeek.className = "this-button";
	elems.thisButtonWeek.innerText = "Week";

	elems.lineThisSelection.appendChild(elems.thisButtonMonth);
	elems.lineThisSelection.appendChild(elems.thisButtonWeek);

	elems.salaryCircle = document.createElement("div");
	elems.salaryCircle.className = "salary-circle";
	elems.salaryInfoContainer = document.createElement("div");
	elems.salaryInfoContainer.className = "salary-info-container";
	elems.salaryAmountLine = document.createElement("div");
	elems.salaryAmountLine.className = "salary-amount-line";
	elems.salaryEuroSign = document.createElement("p");
	elems.salaryEuroSign.className = "salary-euro-sign";
	elems.salaryEuroSign.innerText = "€";
	elems.salaryInteger = document.createElement("p");
	elems.salaryInteger.className = "salary-integer";
	elems.salaryInteger.innerText = "0";
	elems.salaryFloat = document.createElement("p");
	elems.salaryFloat.className = "salary-float";
	elems.salaryFloat.innerText = ".00";

	elems.salaryPercentLine = document.createElement("div");
	elems.salaryPercentLine.className = "salary-percent-line";
	elems.salaryPercent = document.createElement("div");
	elems.salaryPercent.className = "salary-percent";
	elems.salaryPercent.innerText = "0%";

	elems.salarySlide = document.createElement("div");
	elems.salarySlide.className = "salary-slide";

	elems.salaryInfoContainer.appendChild(elems.salaryAmountLine);
	elems.salaryInfoContainer.appendChild(elems.salaryPercentLine);

	elems.salaryCircle.appendChild(elems.salaryInfoContainer);
	elems.salaryCircle.appendChild(elems.salarySlide);
	elems.salaryCircleContainer.appendChild(elems.salaryCircle);

	elems.salaryAmountLine.appendChild(elems.salaryEuroSign);
	elems.salaryAmountLine.appendChild(elems.salaryInteger);
	elems.salaryAmountLine.appendChild(elems.salaryFloat);

	elems.salaryPercentLine.appendChild(elems.salaryPercent);

	elems.salaryContainer.appendChild(elems.mainTitleInfo);
	elems.salaryContainer.appendChild(elems.lineThisSelection);
	elems.salaryContainer.appendChild(elems.salaryCircleContainer);
	elems.popMiddleDivRight.appendChild(elems.salaryContainer);


	//////////////////////////////////////////////////////////////////////  BOTTOM DIV
	elems.popBottomContainer = document.createElement("div");
	elems.popBottomContainer.className = "pop-bottom-container";
	
	elems.popBottomDiv = document.createElement("div");
	elems.popBottomDiv.className = "pop-bottom-div";

	elems.resultsContainer = document.createElement("div");
	elems.resultsContainer.className = "results-container";

	elems.resultsDiv = document.createElement("div");
	elems.resultsDiv.className = "results-div";

	elems.mainTitleDays = document.createElement("p");
	elems.mainTitleDays.className = "main-title-info";
	elems.mainTitleDays.innerText = "Days Remaining";
	elems.lineResultsDays = document.createElement("div");
	elems.lineResultsDays.className = "line-results";

	elems.lineResultsDaysLeft = document.createElement("div");
	elems.lineResultsDaysLeft.className = "line-results-left";
	elems.numberLabelOpen = document.createElement("span");
	elems.numberLabelOpen.className = "number-label";
	elems.numberLabelOpen.innerText = "Open";
	elems.numberResultOpen = document.createElement("p");
	elems.numberResultOpen.className = "number-result";
	elems.numberResultOpen.id = "result-open";
	elems.numberResultOpen.innerText = "0";
	elems.lineResultsDaysLeft.appendChild(elems.numberLabelOpen);
	elems.lineResultsDaysLeft.appendChild(elems.numberResultOpen);

	elems.lineResultsDaysRight = document.createElement("div");
	elems.lineResultsDaysRight.className = "line-results-right";
	elems.numberLabelTotal = document.createElement("span");
	elems.numberLabelTotal.className = "number-label";
	elems.numberLabelTotal.innerText = "Total";
	elems.numberLabelTotal.style.marginLeft = "4px";
	elems.numberResultTotal = document.createElement("p");
	elems.numberResultTotal.className = "number-result";
	elems.numberResultTotal.id = "result-Total";
	elems.numberResultTotal.innerText = "0";
	elems.lineResultsDaysRight.appendChild(elems.numberLabelTotal);
	elems.lineResultsDaysRight.appendChild(elems.numberResultTotal);

	elems.lineResultsDays.appendChild(elems.lineResultsDaysLeft);
	elems.lineResultsDays.appendChild(elems.lineResultsDaysRight);

	elems.moreInfoContainer = document.createElement("div");
	elems.moreInfoContainer.className = "more-info-container";
	elems.moreInfoLogo = document.createElement("div");
	elems.moreInfoLogo.className = "more-info-logo";
	elems.moreInfoContainer.appendChild(elems.moreInfoLogo);

	elems.resultsContainer.appendChild(elems.resultsDiv);

	elems.resultsDiv.appendChild(elems.mainTitleDays);
	elems.resultsDiv.appendChild(elems.lineResultsDays);

	elems.popBottomDiv.appendChild(elems.resultsContainer);
	elems.popBottomDiv.appendChild(elems.moreInfoContainer);
	elems.popBottomContainer.appendChild(elems.popBottomDiv);

	function mouseoverPopBottom(e) {
		elems.moreInfoLogo.style.height = "20px";
		elems.moreInfoContainer.style.backgroundColor = "rgba(30, 35, 42, 0.8)";
	}

	function mouseoutPopBottom(e) {
		elems.moreInfoLogo.style.height = "0px";
		elems.moreInfoContainer.style.backgroundColor = "";
	}
	
	elems.popBottomContainer.addEventListener("mouseover", mouseoverPopBottom);
	elems.popBottomContainer.addEventListener("mouseout", mouseoutPopBottom);

	var optionClicked = false;

	elems.moreInfoLogo.addEventListener("click", function(e) {

		if (optionClicked)
		{
			elems.resultsDiv.style.display = "none";
			elems.moreInfoLogo.style.height = "0px";
			elems.moreInfoContainer.style.backgroundColor = "";
			elems.moreInfoContainer.style.borderTop = "1px solid rgb(45, 49, 60, 0)";
			optionClicked = false;
		}
		else
		{
			elems.moreInfoContainer.style.borderTop = "1px solid rgb(45, 49, 60)";
			elems.moreInfoContainer.style.padding = "4px 0";
			elems.resultsDiv.style.display = "block";
			optionClicked = true;
		}
	});

	// elems.popBottomDivRight = document.createElement("div");
	// elems.popBottomDivRight.className = "pop-bottom-div-right";
	// elems.resultsContainer1 = document.createElement("div");
	// elems.resultsContainer1.className = "results-container";
	// elems.mainTitleInfo1 = document.createElement("p");
	// elems.mainTitleInfo1.className = "main-title-info";
	// elems.mainTitleInfo1.innerText = "Days Remaining";
	// elems.lineResults1 = document.createElement("div");
	// elems.lineResults1.className = "line-results";
	// elems.lineResultsLeft1 = document.createElement("div");
	// elems.lineResultsLeft1.className = "line-results-left";
	// elems.numberLabel1 = document.createElement("span");
	// elems.numberLabel1.className = "number-label";
	// elems.numberLabel1.innerText = "Open";
	// elems.numberResult1 = document.createElement("p");
	// elems.numberResult1.className = "number-result";
	// elems.numberResult1.id = "result-open";
	// elems.numberResult1.innerText = "0";

	// // elems.numberLabel2 = document.createElement("span");
	// // elems.numberLabel2.className = "number-label";
	// // elems.numberLabel2.innerText = "Total";

	// elems.lineSeparator1 = document.createElement("div");
	// elems.lineSeparator1.className = "line-separator";
	// elems.lineSeparator2 = document.createElement("div");
	// elems.lineSeparator2.className = "line-separator";

	// elems.lineResultsRight1 = document.createElement("div");
	// elems.lineResultsRight1.className = "line-results-right";
	// elems.numberLabel2 = document.createElement("span");
	// elems.numberLabel2.className = "number-label";
	// elems.numberLabel2.innerText = "Total";
	// elems.numberResult2 = document.createElement("p");
	// elems.numberResult2.className = "number-result";
	// elems.numberResult2.innerText = "0";

	// elems.lineResultsLeft2 = document.createElement("div");
	// elems.lineResultsLeft2.className = "line-results-left";
	// elems.numberLabel2 = document.createElement("span");
	// elems.numberLabel2.className = "number-label";
	// elems.numberLabel2.innerText = "Total";

	// elems.numberLabel3 = document.createElement("span");
	// elems.numberLabel3.className = "number-label";
	// elems.numberLabel3.innerText = "Earned";
	// elems.numberResult3 = document.createElement("p");
	// elems.numberResult3.className = "number-result";
	// elems.numberResult3.id = "result-earned";
	// elems.numberResult3.innerText = "0";

	// elems.resultsContainer2 = document.createElement("div");
	// elems.resultsContainer2.className = "results-container";
	// elems.mainTitleInfo2 = document.createElement("p");
	// elems.mainTitleInfo2.className = "main-title-info";
	// elems.mainTitleInfo2.innerText = "Salary";
	// elems.lineResults2 = document.createElement("div");
	// elems.lineResults2.className = "line-results";
	
	elems.weeklyHabit.appendChild(elems.weeklySpan);
	elems.weeklyHabit.appendChild(elems.lineHabit);
	for (var i = 0; i < 7; i++)
		elems.lineHabit.appendChild(elems.checkboxes[i]);
	// elems.lineHabit.appendChild(elems.checkboxHabit2);
	// elems.lineHabit.appendChild(elems.checkboxHabit3);
	// elems.lineHabit.appendChild(elems.checkboxHabit4);
	// elems.lineHabit.appendChild(elems.checkboxHabit5);
	// elems.lineHabit.appendChild(elems.checkboxHabit6);
	// elems.lineHabit.appendChild(elems.checkboxHabit7);

	elems.popMiddleDiv.appendChild(elems.popMiddleDivLeft);
	elems.popMiddleDiv.appendChild(elems.popMiddleDivRight);
	elems.popMiddleDivLeft.appendChild(elems.middleLine1);
	elems.popMiddleDivLeft.appendChild(elems.middleLine2);
	elems.middleLine1.appendChild(elems.inputContainerSalary);
	elems.middleLine1.appendChild(elems.inputContainerHours);
	
	elems.inputContainerSalary.appendChild(elems.labelSalary);
	elems.inputContainerSalary.appendChild(elems.inputSalary);
	
	elems.inputContainerHours.appendChild(elems.labelHours);
	elems.inputContainerHours.appendChild(elems.inputDeducted);

	elems.middleLine2.appendChild(elems.weeklyHabit);
	
	// elems.resultsContainer1.appendChild(elems.mainTitleInfo1);
	// elems.resultsContainer1.appendChild(elems.lineResults1);
	// elems.lineResultsLeft1.appendChild(elems.numberLabel1);
	// elems.lineResultsLeft1.appendChild(elems.numberResult1);
	// elems.lineResultsLeft2.appendChild(elems.numberLabel3);
	// elems.lineResultsLeft2.appendChild(elems.numberResult3);
	// elems.lineResultsRight1.appendChild(elems.numberLabel2);
	// elems.lineResultsRight1.appendChild(elems.numberResult2);
	// elems.lineResults1.appendChild(elems.lineResultsLeft1);
	// elems.lineResults1.appendChild(elems.lineResultsRight1);
	
	// elems.resultsContainer2.appendChild(elems.mainTitleInfo2);
	// elems.resultsContainer2.appendChild(elems.lineResults2);
	// elems.lineResults2.appendChild(elems.lineResultsLeft2);
	// elems.lineResults2.appendChild(elems.lineSeparator2);

	// elems.popBottomDivRight.appendChild(elems.resultsContainer1);
	// elems.popBottomDivRight.appendChild(elems.resultsContainer2);
	// elems.popBottomDiv.appendChild(elems.popBottomDivRight);

	elems.popupRemaining.appendChild(elems.popMiddleDiv);
	elems.popupRemaining.appendChild(elems.popBottomContainer);
	document.body.appendChild(elems.popupRemaining);

	// elems.checkboxes = document.querySelectorAll(".checkbox-habit");
}

function disableTextSelection() {

	document.body.style.MozUserSelect = "none";
	document.body.style.WebkitUserSelect = "none";
	document.body.style.KhtmlUserSelect = "none";
	document.body.style.MsUserSelect = "none";
	document.body.style.UserSelect = "none";
}

popup.setStyle = function(elems) {

	// elems.popupRemaining.style.opacity = "1"; // dev
	// elems.popupRemaining.style.display = "flex";
	elems.popupRemaining.style.opacity = "0"; // normal
	elems.popupRemaining.style.display = "none";
	elems.popupRemaining.style.position = "absolute";
	elems.popupRemaining.style.borderRadius = "4px";
	elems.popupRemaining.style.zIndex = "1000";
	elems.popupRemaining.style.backgroundColor = "rgba(37, 41, 50, 0.9)";
	elems.popupRemaining.style.border = "1px solid #2d313c";
	elems.popupRemaining.style.boxShadow = "0px 10px 15px #12141a3a";
	elems.popupRemaining.style.backdropFilter = "blur(6px)";

	// elems.popupRemaining.style.top = "60px"; // remove dev only
	// elems.popupRemaining.style.right = "10px"; // remove dev only
	
	elems.popupTopDiv.style.cursor = "move";
	elems.popupTopDiv.style.height = "fit-content";
	elems.popupTopDiv.style.borderRadius = "4px";
	elems.popupTopDiv.style.borderBottom = "1px solid #2d313c";
	elems.popupTopDiv.style.display = "flex";
	// elems.popupTopDiv.style.flexDirection = "column";
	// elems.popupTopDiv.style.justifyContent = "flex-start";
	elems.popupTopDiv.style.justifyContent = "space-between";
	elems.popupTopDiv.style.alignItems = "center";
	elems.popupTopDiv.style.color = "#9b9b9b";
	elems.popupTopDiv.style.whiteSpace = "nowrap";
	// elems.popupTopDiv.style.padding = "4px 30px 4px 4px";
	elems.popupTopDiv.style.padding = "4px";

	elems.popupTopLeftText.style.color = "#e2e2e2";
	// elems.popupTopLeftText.style.fontSize = "0.9em";
	elems.popupTopLeftText.style.fontSize = "16px";
	// elems.popupTopLeftText.style.margin = "3px 0 0 3px";
	elems.popupTopLeftText.style.margin = "3px";
	elems.popupTopLeftText.style.padding = "0";
	elems.popupTopLeftText.style.fontWeight = "bold";
	elems.popupTopLeftText.style.pointerEvents = "none";
	elems.popupTopLeftText.style.textShadow = "rgb(0, 0, 0) 0px 0px 3px";
	
	// elems.popupTopRightText.style.fontSize = "0.7em";
	elems.popupTopRightText.style.fontSize = "14px";
	elems.popupTopRightText.style.margin = "0 2px 0 0";
	// elems.popupTopRightText.style.padding = "2px 3px";
	elems.popupTopRightText.style.padding = "2px 4px";
	elems.popupTopRightText.style.width = "fit-content";
	elems.popupTopRightText.style.borderRadius = "2px";
	elems.popupTopRightText.style.textShadow = "rgb(0, 0, 0) 0px 0px 3px";

	elems.popupTopRightText.addEventListener("mouseover", function(e) {
		e.target.style.backgroundColor = "#1b1e25";
		e.target.style.color = "#e2e2e2";
		e.target.style.cursor = "pointer";
	});

	elems.popupTopRightText.addEventListener("mouseout", function(e) {
		e.target.style.backgroundColor = "";
		e.target.style.color = "#9b9b9b";
	});
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
	var i = numberDay - 1;
	var indexHabit = actualDay;
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

	elems.numberResultOpen.innerText = numberDays.open;
	elems.numberResultTotal.innerText = numberDays.total;

	var totalSalaryEarn = parseFloat(popup.months[popup.months.indexArray].percent / 100 * data.student.salary);
	var integerSalary = parseInt(totalSalaryEarn);
	var floatSalary = totalSalaryEarn - integerSalary;
	// console.log("salary earn: " + totalSalaryEarn);
	// console.log("integer earn: " + integerSalary);
	// console.log("float earn: " + floatSalary.toFixed(2).split('.')[1]);

	elems.salaryInteger.innerText = integerSalary;
	elems.salaryFloat.innerText = "." + floatSalary.toFixed(2).split('.')[1];
	elems.salaryPercent.innerText = popup.months[popup.months.indexArray].percent.toFixed(1) + '%';
	elems.salarySlide.style.height = popup.months[popup.months.indexArray].percent + "%";
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
	setData(elems);
}

popup.initPopup = function(elems, months) {

	popup.months = months;

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
	if (!data.student.salary)
		elems.inputSalary.value = 0;
	else
		elems.inputSalary.value = data.student.salary;
	if (!data.student.hoursDeducted)
		elems.inputDeducted.value = 0;
	else
		elems.inputDeducted.value = data.student.hoursDeducted;

	elems.inputSalary.addEventListener("blur", function(e) {
		if (isNaN(e.target.value) || !e.target.value)
			e.target.value = 0;
		else
		{
			data.student.salary = e.target.value;
			data.updateLocalStorage(data.student);
		}
		setData(elems);
	});

	elems.inputDeducted.addEventListener("blur", function(e) {
		if (isNaN(e.target.value)  || !e.target.value)
			e.target.value = 0;
		else
		{
			data.student.hoursDeducted = e.target.value;
			data.updateLocalStorage(data.student);
		}
		setData(elems);
	});

	for (var i = 0; i < elems.checkboxes.length; i++)
	{
		elems.checkboxes[i].addEventListener("click", clickHabit);
	}
	elems.inputSalary.addEventListener("click", function(e) { this.select(); });
	elems.inputDeducted.addEventListener("click", function(e) { this.select(); });
}
