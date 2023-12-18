
window.popup = window.popup || {};

popup.calculDays = function(elems) {

	const numberDayGraph = popup.months[popup.months.nbMonth - 1].arrayElems.length;

	var biggestPercent = 0
	for (var i = 0; i < numberDayGraph; i++)
	{
		// console.log(popup.months[popup.months.nbMonth - 1].days[i].hourDone);
		var newDayHourDone = popup.months[popup.months.nbMonth - 1].days[i].hourDone + (popup.months[popup.months.nbMonth - 1].days[i].minuteDone / 60);
		var ratioDone = 0;
		var percentDay = 0;
		var monthHourDone = popup.months[popup.months.nbMonth - 1].nbHourDone + (popup.months[popup.months.nbMonth - 1].nbMinDone / 60);
		var monthHourRequired = popup.months[popup.months.nbMonth - 1].nbHourReq;

		// console.log(data.student.months[0].salary);
		if (newDayHourDone > 0)
		{
			if (monthHourRequired === 0)
				ratioDone = 0;
			else
				ratioDone = newDayHourDone / monthHourRequired;
			percentDay = newDayHourDone / monthHourDone;
		}
		popup.months[popup.months.nbMonth - 1].days[i].ratioDone = ratioDone;
		popup.months[popup.months.nbMonth - 1].days[i].percentDay = percentDay;
		// console.log("multi " + ratioDone + " " + data.student.salary);

		// console.log(data.student.months[popup.months.nbMonth - 1].salary);
		// if (ratioDone === 0 || data.student.salary === 0)
		if (ratioDone === 0 || data.student.months[popup.months.nbMonth - 1].salary === 0)
			popup.months[popup.months.nbMonth - 1].days[i].cashEarn = 0;
		else
			// popup.months[popup.months.nbMonth - 1].days[i].cashEarn = ratioDone * data.student.salary;
			popup.months[popup.months.nbMonth - 1].days[i].cashEarn = ratioDone * data.student.months[popup.months.nbMonth - 1].salary;

		if (percentDay > biggestPercent)
			biggestPercent = percentDay;
	}

	for (var i = 0; i < numberDayGraph; i++)
	{
		popup.months[popup.months.nbMonth - 1].days[i].percentAdjust = popup.months[popup.months.nbMonth - 1].days[i].percentDay / biggestPercent;
		elems.daySlides[i].style.height = popup.months[popup.months.nbMonth - 1].days[i].percentAdjust * 100 + "%";
	}
}

popup.setAttributeDaySlide = function(elems) {

	for (var i = 0; i < elems.daySlideContainers.length; i++)
	{
		// console.log("setAttribute");
		// console.log(elems.daySlideContainers[i]);
		// elems.daySlideContainers[i].setAttribute("date", popup.months[popup.months.nbMonth - 1].days[i].dayDate);
		elems.daySlideContainers[i].setAttribute("salary", popup.months[popup.months.nbMonth - 1].days[i].cashEarn.toFixed(2));
	}
}

popup.createElems = function(elems) {

	elems.popupRemaining = document.createElement("div");
	elems.popupRemaining.className = "popup-remaining";

	elems.popupTopDiv = document.createElement("div");
	elems.popupTopDiv.className = "popup-top-div";
	
	elems.popupTopLeftText = document.createElement("p");
	elems.popupTopLeftText.innerText = "Logcash";

	var clickerMode = false;
	// elems.popupTopLeftText.addEventListener("dblclick", function() {
	elems.popupTopDiv.addEventListener("dblclick", function() {
		// console.log("double click");

		// data.student.showMore
		if (!clickerMode)
		{
			elems.moreInfoContainer.style.backgroundColor = "";
			elems.moreInfoContainer.style.borderTop = "1px solid rgb(45, 49, 60, 0)";
	
			elems.resultsDiv.style.height = "0px";
			elems.resultsDiv.style.padding = "0px 8px";
			elems.resultsDiv.style.opacity = "0";
			elems.boostLockContainer.style.height = "0px";
			elems.boostLockContainer.style.padding = "0px 8px";
			elems.boostLockContainer.style.opacity = "0";
			elems.estimationContainer.style.height = "0px";
			elems.estimationContainer.style.padding = "0px 8px";
			elems.estimationContainer.style.opacity = "0";

			// elems.middleLine1.style.display = "none";
			// elems.middleLine2.style.display = "none";

			// elems.salaryContainer.style.display = "none";

			elems.popMiddleDiv.style.display = "none";
			elems.popProgressTitle.style.display = "none";

			clickerMode = true;
		}
		else
		{
			elems.moreInfoContainer.style.borderTop = "1px solid rgb(45, 49, 60)";
			elems.moreInfoContainer.style.padding = "4px 0";
		
			elems.resultsDiv.style.height = "";
			elems.resultsDiv.style.padding = "8px";
			elems.resultsDiv.style.opacity = "1";
			elems.boostLockContainer.style.height = "";
			elems.boostLockContainer.style.padding = "8px";
			elems.boostLockContainer.style.opacity = "1";
			elems.estimationContainer.style.height = "";
			elems.estimationContainer.style.padding = "8px";
			elems.estimationContainer.style.opacity = "1";

			// elems.middleLine1.style.display = "flex";
			// elems.middleLine2.style.display = "flex";
			// elems.salaryContainer.style.display = "flex";

			elems.popMiddleDiv.style.display = "flex";
			elems.popProgressTitle.style.display = "flex";

			clickerMode = false;
		}

	});

	elems.popupTopRightText = document.createElement("p");

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
	elems.inputContainerSalary.className = "pop-input-container";
	elems.inputContainerSalary.style.marginRight = "7px";			/// STYLE

	elems.inputSalary = document.createElement("input");
	elems.inputSalary.className = "inputText";
	elems.inputSalary.type = "text";
	elems.inputSalary.setAttribute('required', '');

	elems.labelSalary = document.createElement("span");
	elems.labelSalary.className = "label-input";
	elems.labelSalary.innerText = "Your salary";
	
	elems.inputContainerHours = document.createElement("div");
	elems.inputContainerHours.className = "pop-input-container";
	elems.inputContainerHours.style.backgroundColor = "#373c48";			/// STYLE

	elems.inputDeducted = document.createElement("input");
	elems.inputDeducted.className = "inputText";
	elems.inputDeducted.type = "text";
	elems.inputDeducted.setAttribute('required', '');

	elems.labelHours = document.createElement("span");
	elems.labelHours.className = "label-input";
	elems.labelHours.innerText = "Hours Deducted";

	elems.habitContainer = document.createElement("div");
	elems.habitContainer.className = "habit-container";
	elems.weeklySpan = document.createElement("span");
	elems.weeklySpan.innerText = "Monthly Attendance";
	
	elems.monthContainer = document.createElement("div");
	elems.monthContainer.className = "month-container";
	
	elems.habitContainer.appendChild(elems.weeklySpan);
	elems.habitContainer.appendChild(elems.monthContainer);

	elems.monthDayBoxes = [];
	elems.monthLineDayName = document.createElement("div");
	elems.monthLineDayName.className = "days-name-line";

	const arrayDaysName = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
	for (var i = 0; i < 7; i++)
	{
		elems.monthDayBoxes[i] = document.createElement("div");
		elems.monthDayBoxes[i].className = "days-name-box";
		elems.monthDayBoxes[i].id = i;
		elems.monthDayBoxes[i].innerText = arrayDaysName[i];
		elems.monthLineDayName.appendChild(elems.monthDayBoxes[i]);
	}
	elems.monthContainer.appendChild(elems.monthLineDayName);

	elems.monthArray = [];
	elems.monthBlock = [];
	for (var k = 0; k < popup.months.length; k++)
	{
		var tmpMonth = {
			checkboxes: [],
			lines: [0, 0, 0, 0, 0, 0]
		};

		var indexMonth = 0;
		// for (var i = 0; i < popup.months[popup.months.indexArray].weeks.length; i++)
		for (var i = 0; i < popup.months[k].weeks.length; i++)
		{
			tmpMonth.lines[i] = document.createElement("div");
			tmpMonth.lines[i].className = "line-habit";
			if (i === 0)
				tmpMonth.lines[i].style.justifyContent = "flex-end";
			for (var j = 0; j < popup.months[k].weeks[i].length; j++)
			{
				var tmpDay = document.createElement("div");
	
				tmpDay.id = ++indexMonth;
				tmpDay.innerText = indexMonth;
				tmpDay.className = "checkbox-habit";
				if (indexMonth < popup.numberDay || k != popup.months.length - 1)
				{
					tmpDay.style.backgroundColor = "#202830";
					tmpDay.style.color = "#64676a";
					tmpDay.style.borderColor = "rgba(45, 49, 60, 0.5)";
					tmpDay.style.opacity = "0.5";
					tmpDay.style.cursor = "default";
					tmpDay.style.pointerEvents = "none";
				}
				else if (indexMonth === popup.numberDay && k === popup.months.length - 1)
				{
					tmpDay.style.backgroundColor = "white";
					tmpDay.style.color = "#191919";
				}
				tmpMonth.checkboxes.push(tmpDay);
				tmpMonth.lines[i].appendChild(tmpDay);
			}
		}
		elems.monthArray.push(tmpMonth);
	}
	
	elems.monthBlock = [];
	for (var i = 0; i < popup.months.length; i++)
	{
		tmpBlock = document.createElement("div");
		tmpBlock.className = "month-block";

		for (var j = 0; j < elems.monthArray[i].lines.length; j++)
			tmpBlock.appendChild(elems.monthArray[i].lines[j]);

		elems.monthBlock.push(tmpBlock)
		elems.monthContainer.appendChild(elems.monthBlock[i]);
	}
	elems.monthBlock[popup.months.length - 1].style.display = "block";


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

	// elems.thisButtonMonth = document.createElement("div");
	// elems.thisButtonMonth.className = "this-button";
	// elems.thisButtonMonth.innerText = "Month";
	// elems.thisButtonMonth.style.marginRight = "6px";
	// elems.thisButtonWeek = document.createElement("div");
	// elems.thisButtonWeek.className = "this-button";
	// elems.thisButtonWeek.innerText = "Week";

	// if (data.student.whichHabit === 1)
	// 	elems.thisButtonWeek.className += " selected";
	// else if (data.student.whichHabit === 2)
	// 	elems.thisButtonMonth.className += " selected";

	// elems.thisButtonMonth.addEventListener("click", function(e) {
	// 	switchHabitContainer(2);
	// });

	// elems.thisButtonWeek.addEventListener("click", function(e) {
	// 	switchHabitContainer(1);
	// });

	// elems.lineThisSelection.appendChild(elems.thisButtonMonth);
	// elems.lineThisSelection.appendChild(elems.thisButtonWeek);

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
	
	
	///////////////////////////////////////////////////////////////////////// GRAPH SLIDE
	elems.salaryGraphContainer = document.createElement("div");
	elems.salaryGraphContainer.className = "salary-graph-container";

	elems.salaryContainer.appendChild(elems.salaryGraphContainer);

	elems.lineGraph = document.createElement("div");
	elems.lineGraph.className = "line-graph";
	elems.salaryGraphContainer.appendChild(elems.lineGraph);

	elems.dayGraphs = [];
	elems.daySlideContainers = [];
	elems.daySlides = [];
	elems.dayBases = [];

	const numberDayGraph = popup.months[popup.months.nbMonth - 1].arrayElems.length;
	var monthHourDone = popup.months[popup.months.nbMonth - 1].nbHourDone + (popup.months[popup.months.nbMonth - 1].nbMinDone / 60);
	var monthHourRequired = popup.months[popup.months.nbMonth - 1].nbHourReq;
	var biggestPercent = 0

	for (var i = 0; i < numberDayGraph; i++)
	{
		elems.dayGraphs.push(document.createElement("div"));
		elems.dayGraphs[i].className = "day-graph";
		elems.daySlideContainers.push(document.createElement("div"));
		elems.daySlideContainers[i].className = "day-slide-container";
		elems.daySlides.push(document.createElement("div"));
		elems.daySlides[i].className = "day-slide";
		elems.dayBases.push(document.createElement("div"));
		elems.dayBases[i].className = "day-base";

		elems.daySlideContainers[i].appendChild(elems.daySlides[i]);

		elems.dayGraphs[i].appendChild(elems.daySlideContainers[i]);
		elems.dayGraphs[i].appendChild(elems.dayBases[i]);

		elems.lineGraph.appendChild(elems.dayGraphs[i]);
	}


	popup.calculDays(elems);

	elems.tooltipSalary = document.createElement("div");
	elems.tooltipSalary.className = "tooltip-salary";
	elems.tooltipTopText = document.createElement("p");
	elems.tooltipTopText.className = "tooltip-top-text";
	elems.tooltipBottomText = document.createElement("p");
	elems.tooltipBottomText.className = "tooltip-bottom-text";

	elems.tooltipSalary.appendChild(elems.tooltipTopText);
	elems.tooltipSalary.appendChild(elems.tooltipBottomText);

	elems.tooltipTopText.innerText = "2023-12-05";
	elems.tooltipBottomText.innerText = "0€";

	document.body.appendChild(elems.tooltipSalary);

	popup.setAttributeDaySlide(elems);

	for (var i = 0; i < elems.daySlideContainers.length; i++)
	{
		// elems.daySlideContainers[i].setAttribute("date", popup.months[popup.months.nbMonth - 1].days[i].dayDate);
		// elems.daySlideContainers[i].setAttribute("salary", popup.months[popup.months.nbMonth - 1].days[i].cashEarn.toFixed(2));

		elems.daySlideContainers[i].addEventListener("mouseover", function(e) {

			elemRect = e.target.getBoundingClientRect();
			var tmpBase = e.target.nextSibling.getBoundingClientRect();

			elems.tooltipTopText.innerText = e.target.getAttribute("date");
			elems.tooltipBottomText.innerText = e.target.getAttribute("salary") + "€";

			offsetLeft = elemRect.left - elemRect.width;

			// newOffsetTop = elemRect.top - 21;	// hover on top of element
			newOffsetTop = tmpBase.top + tmpBase.height * 2 + window.scrollY;	// hover at bottom of element

			elems.tooltipSalary.style.opacity = "1";
			elems.tooltipSalary.style.top = newOffsetTop + "px";
			elems.tooltipSalary.style.left = offsetLeft + "px";

			e.target.firstElementChild.style.backgroundColor = "rgba(0, 186, 188, 0.80)";
		});

		elems.daySlideContainers[i].addEventListener("mouseout", function(e) {
			e.target.firstElementChild.style.backgroundColor = "rgba(0, 186, 188, 0.40)";
			elems.tooltipSalary.style.opacity = "0";
		});
	}


	//////////////////////////////////////////////////////////////////////  PROGRESS CONTAINER
	elems.popProgressContainer = document.createElement("div");
	elems.popProgressContainer.className = "pop-progress-container";

	elems.popProgressTitle = document.createElement("span");
	elems.popProgressTitle.className = "pop-title-container";
	elems.popProgressTitle.innerText = "Hours Done";

	// elems.containerDivMonth.style.display = "none";

	elems.popProgressContainer.appendChild(elems.popProgressTitle);
	elems.popProgressContainer.appendChild(elems.containerLogcash);
	elems.lineThisSelection.appendChild(elems.containerDivMonth);

	

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
	elems.numberResultOpen.innerText = "0";
	elems.lineResultsDaysLeft.appendChild(elems.numberLabelOpen);
	elems.lineResultsDaysLeft.appendChild(elems.numberResultOpen);

	elems.lineResultsDaysRight = document.createElement("div");
	elems.lineResultsDaysRight.className = "line-results-right";
	elems.numberLabelTotal = document.createElement("span");
	elems.numberLabelTotal.className = "number-label";
	elems.numberLabelTotal.innerText = "Total";
	// elems.numberLabelTotal.style.marginLeft = "4px";
	elems.numberResultTotal = document.createElement("p");
	elems.numberResultTotal.className = "number-result";
	elems.numberResultTotal.id = "result-Total";
	elems.numberResultTotal.innerText = "0";
	elems.lineResultsDaysRight.appendChild(elems.numberLabelTotal);
	elems.lineResultsDaysRight.appendChild(elems.numberResultTotal);

	elems.lineResultsDays.appendChild(elems.lineResultsDaysLeft);
	elems.lineResultsDays.appendChild(elems.lineResultsDaysRight);


	///////////////////////////////////////////////////////// CONTAINER BOOST LOCK
	elems.boostLockContainer = document.createElement("div");
	elems.boostLockContainer.className = "results-div";

	elems.mainTitleBoost = document.createElement("p");
	elems.mainTitleBoost.className = "main-title-info";
	elems.mainTitleBoost.innerText = "Add Boost Lock";

	elems.lineResultsBoost = document.createElement("div");
	elems.lineResultsBoost.className = "line-results";

	elems.lineResultsBoostLeft = document.createElement("div");
	elems.lineResultsBoostLeft.className = "line-results-left";
	elems.lineResultsBoostLeft.style.display = "flex";
	elems.lineResultsBoostLeft.style.justifyContent = "center";
	elems.lineResultsBoostLeft.style.alignItems = "center";
	elems.labelHalfBoost = document.createElement("span");
	elems.labelHalfBoost.className = "number-label";
	elems.labelHalfBoost.innerText = "42min";
	
	elems.lineResultsBoostRight = document.createElement("div");
	elems.lineResultsBoostRight.className = "line-results-right";
	elems.lineResultsBoostRight.style.display = "flex";
	elems.lineResultsBoostRight.style.justifyContent = "center";
	elems.lineResultsBoostRight.style.alignItems = "center";
	elems.labelFullBoost = document.createElement("span");
	elems.labelFullBoost.className = "number-label";
	elems.labelFullBoost.innerText = "1h24";

	elems.checkboxHalf = document.createElement("div");
	elems.checkboxHalf.className = "checkbox-boost";
	elems.checkboxHalfCenter = document.createElement("div");
	elems.checkboxHalfCenter.className = "checkbox-boost-center";
	elems.checkboxHalf.appendChild(elems.checkboxHalfCenter);
	
	elems.checkboxFull = document.createElement("div");
	elems.checkboxFull.className = "checkbox-boost";
	elems.checkboxFullCenter = document.createElement("div");
	elems.checkboxFullCenter.className = "checkbox-boost-center";
	elems.checkboxFull.appendChild(elems.checkboxFullCenter);

	/////////////// SET STYLE CHECKBOX BOOST WITH DATA.STUDENT
	if (data.student.addBoostHalf)
	{
		elems.checkboxHalf.style.borderColor = "rgb(0, 186, 188)";
		elems.checkboxHalfCenter.style.backgroundColor = "rgb(0, 186, 188)";
	}
	else if (data.student.addBoostFull)
	{
		elems.checkboxFull.style.borderColor = "rgb(0, 186, 188)";
		elems.checkboxFullCenter.style.backgroundColor = "rgb(0, 186, 188)";
	}

	elems.checkboxHalf.addEventListener("click", function(e) {

		if (data.student.addBoostHalf)
		{
			data.student.addBoostHalf = false;
			elems.checkboxHalf.style.borderColor = "rgb(45, 49, 60)";
			elems.checkboxHalfCenter.style.backgroundColor = "";
		}
		else
		{
			if (data.student.addBoostFull)
			{
				data.student.addBoostFull = false;
				elems.checkboxFull.style.borderColor = "rgb(45, 49, 60)";
				elems.checkboxFullCenter.style.backgroundColor = "";
			}
			data.student.addBoostHalf = true;
			elems.checkboxHalf.style.borderColor = "rgb(0, 186, 188)";
			elems.checkboxHalfCenter.style.backgroundColor = "rgb(0, 186, 188)";
		}
		data.updateLocalStorage();
		popup.setData(elems);
	});

	elems.checkboxFull.addEventListener("click", function(e) {

		if (data.student.addBoostFull)
		{
			data.student.addBoostFull = false;
			elems.checkboxFull.style.borderColor = "rgb(45, 49, 60)";
			elems.checkboxFullCenter.style.backgroundColor = "";
		}
		else
		{
			if (data.student.addBoostHalf)
			{
				data.student.addBoostHalf = false;
				elems.checkboxHalf.style.borderColor = "rgb(45, 49, 60)";
				elems.checkboxHalfCenter.style.backgroundColor = "";
			}
			data.student.addBoostFull = true;
			elems.checkboxFull.style.borderColor = "rgb(0, 186, 188)";
			elems.checkboxFullCenter.style.backgroundColor = "rgb(0, 186, 188)";
		}
		data.updateLocalStorage();
		popup.setData(elems);
	});

	elems.lineResultsBoostLeft.appendChild(elems.labelHalfBoost);
	elems.lineResultsBoostLeft.appendChild(elems.checkboxHalf);
	elems.lineResultsBoostRight.appendChild(elems.labelFullBoost);
	elems.lineResultsBoostRight.appendChild(elems.checkboxFull);

	elems.lineResultsBoost.appendChild(elems.lineResultsBoostLeft);
	elems.lineResultsBoost.appendChild(elems.lineResultsBoostRight);

	elems.boostLockContainer.appendChild(elems.mainTitleBoost);
	elems.boostLockContainer.appendChild(elems.lineResultsBoost);


	///////////////////////////////////////////////////////// CONTAINER ESTIMATION
	elems.estimationContainer = document.createElement("div");
	elems.estimationContainer.className = "results-div";
	elems.estimationContainer.style.border = "none";

	elems.mainTitleLogtime = document.createElement("p");
	elems.mainTitleLogtime.className = "main-title-info";
	elems.mainTitleLogtime.innerText = "Logtime";

	elems.lineResultsLogtime = document.createElement("div");
	elems.lineResultsLogtime.className = "line-results";

	elems.lineResultsLogtime1 = document.createElement("div");
	elems.lineResultsLogtime1.className = "line-estimation-block";
	elems.labelLogtime1 = document.createElement("span");
	elems.labelLogtime1.className = "number-label";
	elems.labelLogtime1.innerText = "Each Day";
	elems.resultLogtime1 = document.createElement("p");
	elems.resultLogtime1.className = "number-result";
	elems.resultLogtime1.innerText = "0";
	elems.resultLogtime1.style.minWidth = "60px";
	elems.lineResultsLogtime1.appendChild(elems.labelLogtime1);
	elems.lineResultsLogtime1.appendChild(elems.resultLogtime1);

	elems.lineResultsLogtime2 = document.createElement("div");
	elems.lineResultsLogtime2.className = "line-estimation-block";
	elems.lineResultsLogtime2.style.border = "none";
	elems.labelLogtime2 = document.createElement("span");
	elems.labelLogtime2.className = "number-label";
	elems.labelLogtime2.innerText = "Remaining today";
	elems.resultLogtime2 = document.createElement("p");
	elems.resultLogtime2.className = "number-result";
	elems.resultLogtime2.innerText = "0";
	elems.resultLogtime2.style.minWidth = "60px";
	elems.lineResultsLogtime2.appendChild(elems.labelLogtime2);
	elems.lineResultsLogtime2.appendChild(elems.resultLogtime2);

	elems.lineResultsLogtime.appendChild(elems.lineResultsLogtime1);
	elems.lineResultsLogtime.appendChild(elems.lineResultsLogtime2);

	elems.estimationContainer.appendChild(elems.mainTitleLogtime);
	elems.estimationContainer.appendChild(elems.lineResultsLogtime);


	elems.moreInfoContainer = document.createElement("div");
	elems.moreInfoContainer.className = "more-info-container";
	elems.moreInfoLogo = document.createElement("div");
	elems.moreInfoLogo.className = "more-info-logo";
	elems.moreInfoContainer.appendChild(elems.moreInfoLogo);

	elems.resultsContainer.appendChild(elems.resultsDiv);
	elems.resultsContainer.appendChild(elems.boostLockContainer);
	elems.resultsContainer.appendChild(elems.estimationContainer);

	elems.resultsDiv.appendChild(elems.mainTitleDays);
	elems.resultsDiv.appendChild(elems.lineResultsDays);

	elems.popBottomDiv.appendChild(elems.resultsContainer);
	elems.popBottomDiv.appendChild(elems.moreInfoContainer);
	elems.popBottomContainer.appendChild(elems.popBottomDiv);

	if (data.student.showMore)
	{
		elems.moreInfoContainer.style.borderTop = "1px solid rgb(45, 49, 60)";
		elems.moreInfoContainer.style.padding = "4px 0";
	
		elems.resultsDiv.style.height = "";
		elems.resultsDiv.style.padding = "8px";
		elems.resultsDiv.style.opacity = "1";
		elems.boostLockContainer.style.height = "";
		elems.boostLockContainer.style.padding = "8px";
		elems.boostLockContainer.style.opacity = "1";
		elems.estimationContainer.style.height = "";
		elems.estimationContainer.style.padding = "8px";
		elems.estimationContainer.style.opacity = "1";
	}
	else
	{
		elems.moreInfoContainer.style.backgroundColor = "";
		elems.moreInfoContainer.style.borderTop = "1px solid rgb(45, 49, 60, 0)";

		elems.resultsDiv.style.height = "0px";
		elems.resultsDiv.style.padding = "0px 8px";
		elems.resultsDiv.style.opacity = "0";
		elems.boostLockContainer.style.height = "0px";
		elems.boostLockContainer.style.padding = "0px 8px";
		elems.boostLockContainer.style.opacity = "0";
		elems.estimationContainer.style.height = "0px";
		elems.estimationContainer.style.padding = "0px 8px";
		elems.estimationContainer.style.opacity = "0";
	}

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

	// var optionClicked = false;

	elems.moreInfoLogo.addEventListener("click", function(e) {

		if (data.student.showMore)
		{
			elems.moreInfoContainer.style.backgroundColor = "";
			elems.moreInfoContainer.style.borderTop = "1px solid rgb(45, 49, 60, 0)";

			elems.resultsDiv.style.height = "0px";
			elems.resultsDiv.style.padding = "0px 8px";
			elems.resultsDiv.style.opacity = "0";
			elems.boostLockContainer.style.height = "0px";
			elems.boostLockContainer.style.padding = "0px 8px";
			elems.boostLockContainer.style.opacity = "0";
			elems.estimationContainer.style.height = "0px";
			elems.estimationContainer.style.padding = "0px 8px";
			elems.estimationContainer.style.opacity = "0";

			data.student.showMore = false;
		}
		else
		{
			elems.moreInfoContainer.style.borderTop = "1px solid rgb(45, 49, 60)";
			elems.moreInfoContainer.style.padding = "4px 0";

			elems.resultsDiv.style.height = "";
			elems.resultsDiv.style.padding = "8px";
			elems.resultsDiv.style.opacity = "1";
			elems.boostLockContainer.style.height = "";
			elems.boostLockContainer.style.padding = "8px";
			elems.boostLockContainer.style.opacity = "1";
			elems.estimationContainer.style.height = "";
			elems.estimationContainer.style.padding = "8px";
			elems.estimationContainer.style.opacity = "1";

			data.student.showMore = true;
		}
		data.updateLocalStorage();
	});
	

	// for (var i = 0; i < 7; i++)
	// 	elems.lineHabit.appendChild(elems.checkboxes[i]);

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

	elems.middleLine2.appendChild(elems.habitContainer);

	elems.popupRemaining.appendChild(elems.popMiddleDiv);
	// elems.popupRemaining.appendChild(elems.containerLogcash.cloneNode(true));
	// elems.popupRemaining.appendChild(elems.containerLogcash);
	elems.popupRemaining.appendChild(elems.popProgressContainer);
	elems.popupRemaining.appendChild(elems.popBottomContainer);
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

	elems.popupRemaining.style.opacity = "1"; // dev
	elems.popupRemaining.style.display = "flex";
	// elems.popupRemaining.style.opacity = "0"; // normal
	// elems.popupRemaining.style.display = "none";
	elems.popupRemaining.style.position = "absolute";
	elems.popupRemaining.style.borderRadius = "4px";
	elems.popupRemaining.style.zIndex = "1000";
	elems.popupRemaining.style.backgroundColor = "rgba(37, 41, 50, 0.9)";
	elems.popupRemaining.style.border = "1px solid #2d313c";
	elems.popupRemaining.style.boxShadow = "0px 10px 15px #12141a3a";
	elems.popupRemaining.style.backdropFilter = "blur(6px)";

	elems.popupRemaining.style.top = "68px"; // remove dev only
	elems.popupRemaining.style.right = "8px"; // remove dev only
	
	elems.popupTopDiv.style.cursor = "move";
	elems.popupTopDiv.style.height = "fit-content";
	elems.popupTopDiv.style.borderRadius = "4px";
	// elems.popupTopDiv.style.borderBottom = "1px solid #2d313c";
	elems.popupTopDiv.style.display = "flex";
	elems.popupTopDiv.style.justifyContent = "space-between";
	elems.popupTopDiv.style.alignItems = "center";
	elems.popupTopDiv.style.color = "#9b9b9b";
	elems.popupTopDiv.style.whiteSpace = "nowrap";
	elems.popupTopDiv.style.padding = "2px 4px";

	elems.popupTopLeftText.style.color = "#e2e2e2";
	elems.popupTopLeftText.style.fontSize = "14px";
	elems.popupTopLeftText.style.margin = "3px";
	elems.popupTopLeftText.style.padding = "0";
	elems.popupTopLeftText.style.fontWeight = "bold";
	// elems.popupTopLeftText.style.pointerEvents = "none";
	elems.popupTopLeftText.style.textShadow = "rgb(0, 0, 0) 0px 0px 3px";
	
	elems.popupTopRightText.style.fontSize = "12px";
	elems.popupTopRightText.style.margin = "0 2px 0 0";
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

	elems.popupTopRightText.addEventListener("click", function(e) {

		const tmpPseudo = document.querySelector(".login").innerText;
		
		if (tmpPseudo)
		{
			data.student.pseudo = tmpPseudo;
			data.updateLocalStorage();
			elems.popupTopRightText.innerText = data.student.pseudo;
		}
	});
}

function isCheckboxUse() {

	for (var i = 0; i < data.student.monthlyHabit.length; i++)
	{
		if (data.student.monthlyHabit[i])
			return true;
	}
	return false;
}

function getOpenDays(numberYear, numberMonth, numberDay) {

	const numberDaysInMonth = new Date(numberYear, numberMonth + 1, 0).getDate();
	var actualDay = popup.date.getDay();

	var openDays = 0;
	var totalDays = 0;
	var i = numberDay - 1;
	var indexHabit = actualDay;
	var useAll = isCheckboxUse();

	while (++i <= numberDaysInMonth)
	{
		if (indexHabit === 7)
			indexHabit = 0;
		if (actualDay === 7)
			actualDay = 0;
		if (actualDay >= 1 && actualDay <= 5)
		{
			if (data.student.monthlyHabit[i - 1] || !useAll)
				openDays++;
		}
		if (data.student.monthlyHabit[i - 1] || !useAll)
			totalDays++;
		indexHabit++;
		actualDay++;
	}
	return ({open: openDays, total: totalDays});
}

popup.date = new Date();
popup.numberYear = popup.date.getFullYear();
popup.numberMonth = popup.date.getMonth();
popup.numberDay = popup.date.getDate();
// popup.numberDay = 5;

popup.setData = function(elems) {

	if (data.student.pseudo === 0)
	{
		const tmpPseudo = document.querySelector(".login").innerText;
		data.student.pseudo = tmpPseudo;
	}
	elems.popupTopRightText.innerText = data.student.pseudo;
	setupInputValue(data.student.months[popup.months.indexArray], elems);

	var needToUpdateData = false;

	for (var i = 0; i < elems.monthArray[popup.months.indexArray].checkboxes.length; i++)
	{
		if (!data.student.monthlyHabit[i])
		{
			data.student.monthlyHabit[i] = false;
			needToUpdateData = true;
		}
		else
		{
			if (i + 1 < popup.numberDay)
			{
				data.student.monthlyHabit[i] = false;
				needToUpdateData = true;
			}
			else if (popup.months.indexArray === popup.months.length - 1)
				elems.monthArray[popup.months.indexArray].checkboxes[i].style.borderColor = "rgb(0, 186, 188)";
		}
	}

	if (needToUpdateData)
		data.updateLocalStorage();

	var numberDays = getOpenDays(popup.numberYear, popup.numberMonth, popup.numberDay);

	elems.numberResultOpen.innerText = numberDays.open;
	elems.numberResultTotal.innerText = numberDays.total;

	if (popup.months[popup.months.indexArray].percent >= 100)
	{
		var totalSalaryEarn = parseFloat(data.student.months[popup.months.indexArray].salary);
		var percentSalary = 100.0;
	}
	else
	{
		var totalSalaryEarn = parseFloat(popup.months[popup.months.indexArray].percent / 100 * data.student.months[popup.months.indexArray].salary);
		var percentSalary = popup.months[popup.months.indexArray].percent;
	}
	var integerSalary = parseInt(totalSalaryEarn);
	var floatSalary = totalSalaryEarn - integerSalary;

	var actualHourDone = popup.months[popup.months.nbMonth - 1].days[popup.numberDay - 1].hourDone;
	var actualMinuteDone = popup.months[popup.months.nbMonth - 1].days[popup.numberDay - 1].minuteDone;
	var dayTimeDone = actualHourDone + actualMinuteDone / 60;

	var totalTimeRemaining = popup.months[popup.months.indexArray].nbHourRem + (popup.months[popup.months.indexArray].nbMinRem / 60);
	var resultEachDay = 0;

	if (totalTimeRemaining > 0)
	{
		if (data.student.monthlyHabit[popup.numberDay - 1])
		{
			totalTimeRemaining += dayTimeDone;
		}
		if (totalTimeRemaining === 0 || numberDays.total === 0)
			resultEachDay = 0;
		else
			resultEachDay = totalTimeRemaining / numberDays.total;
	}

	if (data.student.addBoostHalf && resultEachDay != 0)
		resultEachDay -= 0.7;
	else if (data.student.addBoostFull && resultEachDay != 0)
		resultEachDay -= 1.4;

	var resultInteger = parseInt(resultEachDay);
	var resultFloat = parseInt((resultEachDay - resultInteger) * 60);

	var resultRemaining = resultEachDay - dayTimeDone;

	var doneInteger = parseInt(resultRemaining);
	var doneFloat = parseInt((resultRemaining - doneInteger) * 60);

	var tmpText = "";
	if (resultInteger < 0 || resultFloat < 0)
		tmpText = "0h00";
	else if (resultFloat < 10)
		tmpText = resultInteger + "h0" + resultFloat;
	else
		tmpText = resultInteger + "h" + resultFloat;

	elems.resultLogtime1.innerText = tmpText;
	if (parseInt(resultRemaining * 60) <= 0)
	{
		elems.resultLogtime2.innerText = "DONE";
		elems.resultLogtime2.style.color = "rgb(0, 186, 188)";
	}
	else
	{
		tmpText = doneInteger + "h";

		if (doneFloat < 10)
			tmpText += "0";
		elems.resultLogtime2.innerText = tmpText + doneFloat;
		elems.resultLogtime2.style.color = "white";
	}
	elems.salaryInteger.innerText = integerSalary;
	elems.salaryFloat.innerText = "." + floatSalary.toFixed(2).split('.')[1];
	elems.salaryPercent.innerText = percentSalary.toFixed(1) + '%';
	elems.salarySlide.style.height = percentSalary + "%";
}

function clickMonthlyHabit(e) {
	
	const index = parseInt(e.target.id) - 1;

	if (data.student.monthlyHabit[index])
	{
		data.student.monthlyHabit[index] = false;
		e.target.style.borderColor = "rgb(45, 49, 60)";
	}
	else
	{
		data.student.monthlyHabit[index] = true;
		e.target.style.borderColor = "rgb(0, 186, 188)";
	}
	if (data.isHomePage === -1)
		data.updateLocalStorage();
	popup.setData(elems);
}

function setupInputValue(dataMonth, elems) {

	if (!dataMonth.salary)
		elems.inputSalary.value = 0;
	else
		elems.inputSalary.value = dataMonth.salary;
	if (!dataMonth.hoursDeducted)
		elems.inputDeducted.value = 0;
	else
		elems.inputDeducted.value = dataMonth.hoursDeducted;
}

popup.initPopup = function(elems, months) {

	popup.months = months;

	// console.log(data.student.months[months.length - 1]);
	// console.log(months.length);

	var mouseDown = false,
		popupOffset = [0, 0];

	popup.createElems(elems);
	popup.setStyle(elems);
	popup.setData(elems);
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


	setupInputValue(data.student.months[months.length - 1], elems);


	elems.inputSalary.addEventListener("blur", function(e) {

		if (isNaN(e.target.value) || !e.target.value || e.target.value < 0)
			e.target.value = 0;
		else
		{
			data.student.months[popup.months.indexArray].salary = e.target.value;
			if (data.isHomePage === -1)
				data.updateLocalStorage();
		}
		popup.setData(elems);
		popup.calculDays(elems);
		popup.setAttributeDaySlide(elems);
	});

	elems.inputDeducted.addEventListener("blur", function(e) {

		if (isNaN(e.target.value)  || !e.target.value || e.target.value < 0)
			e.target.value = 0;
		else
		{
			data.student.months[popup.months.indexArray].hoursDeducted = e.target.value;
			if (data.isHomePage === -1)
				data.updateLocalStorage();
		}
		var newRequire = months[months.indexArray].openDaysTotal * 7 - e.target.value;

		if (newRequire < 0)
			months[months.indexArray].nbHourReq = 0;
		else
			months[months.indexArray].nbHourReq = newRequire;
		calculProgress(months[months.indexArray]);
		reGenerate(months[months.indexArray], elems);
		popup.setData(elems);
	});

	for (var i = 0; i < elems.monthArray[popup.months.length - 1].checkboxes.length; i++)
	{
		elems.monthArray[popup.months.length - 1].checkboxes[i].addEventListener("click", clickMonthlyHabit);
	}
	elems.inputSalary.addEventListener("click", function(e) { this.select(); });
	elems.inputDeducted.addEventListener("click", function(e) { this.select(); });
}

const clickerButton = document.querySelector(".clicker-salary-circle-inside");
const clickerInteger = document.querySelector(".clicker-salary-integer");
const clickerFloat = document.querySelector(".clicker-salary-float");
const clickerPerSecond = document.querySelector(".clicker-per-second-number");

clickerInteger.innerText = 0;
clickerFloat.innerText = "." + 0;
clickerPerSecond.innerText = 0;

var valueInteger = 0;
var valueFloat = 0;
var clickerEvent = 0;
clickerButton.addEventListener("click", function(e) {

	clickerButton.style.backgroundColor = "rgba(40, 45, 54, 0.9)";
	clickerButton.style.boxShadow = "6px 6px 0 rgba(16, 16, 16, 0.5)";

	if (clickerEvent)
		clearTimeout(clickerEvent);
	clickerEvent = setTimeout(function(e) {
		clickerButton.style.backgroundColor = "rgba(37, 41, 50, 0.9)";
		clickerButton.style.boxShadow = "10px 10px 0 rgba(16, 16, 16, 0.5)";
	}, 100);

	valueFloat += 1;
	if (valueFloat === 10)
	{
		valueFloat = 0;
		valueInteger += 1;
	}

	clickerInteger.innerText = valueInteger;
	clickerFloat.innerText = "." + valueFloat;

});
// console.log(clickerButton);