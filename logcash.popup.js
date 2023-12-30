
window.popup = window.popup || {};

// add argument index month to calcul
popup.calculDays = function(elems, index) {

	// const numberDayGraph = popup.months[popup.months.nbMonth - 1].arrayElems.length;
	const numberDayGraph = popup.months[index].arrayElems.length;

	var biggestPercent = 0
	for (var i = 0; i < numberDayGraph; i++)
	{
		var newDayHourDone = popup.months[index].days[i].hourDone + (popup.months[index].days[i].minuteDone / 60);
		var ratioDone = 0;
		var percentDay = 0;
		var monthHourDone = popup.months[index].nbHourDone + (popup.months[index].nbMinDone / 60);
		var monthHourRequired = popup.months[index].nbHourReq;

		if (newDayHourDone > 0)
		{
			if (monthHourRequired === 0)
				ratioDone = 0;
			else
				ratioDone = newDayHourDone / monthHourRequired;
			percentDay = newDayHourDone / monthHourDone;
		}
		popup.months[index].days[i].ratioDone = ratioDone;
		popup.months[index].days[i].percentDay = percentDay;

		if (ratioDone === 0 || data.student.months[index].salary === 0)
			popup.months[index].days[i].cashEarn = 0;
		else
			popup.months[index].days[i].cashEarn = ratioDone * data.student.months[index].salary;

		if (percentDay > biggestPercent)
			biggestPercent = percentDay;
	}

	for (var i = 0; i < numberDayGraph; i++)
	{
		popup.months[index].days[i].percentAdjust = popup.months[index].days[i].percentDay / biggestPercent;
		elems.monthGraphs[index].daySlides[i].style.height = popup.months[index].days[i].percentAdjust * 100 + "%";
	}
}

popup.setAttributeDaySlide = function(elems, indexMonth) {

	for (var i = 0; i < elems.monthGraphs[indexMonth].daySlideContainers.length; i++)
	{
		elems.monthGraphs[indexMonth].daySlideContainers[i].setAttribute("date", popup.months[indexMonth].days[i].dayDate);
		elems.monthGraphs[indexMonth].daySlideContainers[i].setAttribute("salary", popup.months[indexMonth].days[i].cashEarn.toFixed(2));
	}
}

function clickBoostMin() {

	if (data.student.addBoostHalf)
	{
		data.student.addBoostHalf = false;
		elems.buttonBoostMin.style.borderColor = "rgb(45, 49, 60)";
		elems.labelLogtimeRight.innerText = "Est. Logout Time";
	}
	else
	{
		if (data.student.addBoostFull)
		{
			data.student.addBoostFull = false;
			elems.buttonBoostMax.style.borderColor = "rgb(45, 49, 60)";
			elems.labelLogtimeRight.innerText = "Est. Logout Time";
		}
		else
			elems.labelLogtimeRight.innerText = "Est. Lockout Time";
		data.student.addBoostHalf = true;
		elems.buttonBoostMin.style.borderColor = "rgb(0, 186, 188)";
	}
	if (data.student.addBoostHalf || data.student.addBoostFull)
		elems.extraLogtimeLeft.style.display = "flex";
	else
		elems.extraLogtimeLeft.style.display = "none";
	data.updateLocalStorage();
	popup.setData(elems);
}

function clickBoostMax() {

	if (data.student.addBoostFull)
	{
		data.student.addBoostFull = false;
		elems.buttonBoostMax.style.borderColor = "rgb(45, 49, 60)";
		elems.labelLogtimeRight.innerText = "Est. Logout Time";
	}
	else
	{
		if (data.student.addBoostHalf)
		{
			data.student.addBoostHalf = false;
			elems.buttonBoostMin.style.borderColor = "rgb(45, 49, 60)";
			elems.labelLogtimeRight.innerText = "Est. Logout Time";
		}
		else
			elems.labelLogtimeRight.innerText = "Est. Lockout Time";
		data.student.addBoostFull = true;
		elems.buttonBoostMax.style.borderColor = "rgb(0, 186, 188)";
	}
	if (data.student.addBoostHalf || data.student.addBoostFull)
		elems.extraLogtimeLeft.style.display = "flex";
	else
		elems.extraLogtimeLeft.style.display = "none";
	data.updateLocalStorage();
	popup.setData(elems);
}

popup.createElems = function(elems) {

	elems.popupRemaining = document.createElement("div");
	elems.popupRemaining.className = "popup-remaining";

	elems.popupTopDiv = document.createElement("div");
	elems.popupTopDiv.className = "popup-top-div";
	
	elems.popupTopLeftText = document.createElement("p");
	elems.popupTopLeftText.innerText = "Logcash";

	var clickerMode = false;

	elems.popupTopDiv.addEventListener("dblclick", function() {

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

	elems.middleLine3 = document.createElement("div");
	elems.middleLine3.className = "middle-line-3";

	
	elems.lineLabelBoost = document.createElement("div");
	elems.lineLabelBoost.className = "line-label";

	elems.titleBoost = document.createElement("p");
	elems.titleBoost.className = "main-title-info";
	elems.titleBoost.innerText = "Boost Lock";
	elems.questionHours = document.createElement("div");
	elems.questionHours.className = "question-logo";

	elems.lineLabelBoost.appendChild(elems.titleBoost);
	elems.lineLabelBoost.appendChild(elems.questionHours);

	
	elems.blockBoost = document.createElement("div");
	elems.blockBoost.className = "block-boost";
	elems.blockBoostLeft = document.createElement("div");
	elems.blockBoostLeft.className = "block-boost-left";
	elems.blockBoostRight = document.createElement("div");
	elems.blockBoostRight.className = "block-boost-right";

	elems.titleBoostMin = document.createElement("p");
	elems.titleBoostMin.className = "small-title-info";
	elems.titleBoostMin.innerText = "Min";
	elems.buttonBoostMin = document.createElement("div");
	elems.buttonBoostMin.className = "button-boost";
	elems.buttonBoostMin.innerText = "42min";
	
	elems.titleBoostMax = document.createElement("p");
	elems.titleBoostMax.className = "small-title-info";
	elems.titleBoostMax.innerText = "Max";
	elems.buttonBoostMax = document.createElement("div");
	elems.buttonBoostMax.className = "button-boost";
	elems.buttonBoostMax.innerText = "1h24";

	elems.blockBoostLeft.appendChild(elems.titleBoostMin);
	elems.blockBoostLeft.appendChild(elems.buttonBoostMin);
	
	elems.blockBoostRight.appendChild(elems.titleBoostMax);
	elems.blockBoostRight.appendChild(elems.buttonBoostMax);
	
	elems.blockBoost.appendChild(elems.blockBoostLeft);
	elems.blockBoost.appendChild(elems.blockBoostRight);

	elems.middleLine3.appendChild(elems.lineLabelBoost);
	elems.middleLine3.appendChild(elems.blockBoost);

	elems.middleLine3.addEventListener("mouseenter", mouseoverInfoContainer);
	elems.middleLine3.addEventListener("mouseleave", mouseoutInfoContainer);

	elems.buttonBoostMin.addEventListener("click", clickBoostMin);
	elems.buttonBoostMax.addEventListener("click", clickBoostMax);


	elems.inputContainerSalary = document.createElement("div");
	elems.inputContainerSalary.className = "pop-input-container";
	elems.inputContainerSalary.style.marginRight = "8px";			/// STYLE
	// elems.inputContainerSalary.addEventListener("mouseenter", mouseoverInfoContainer);
	// elems.inputContainerSalary.addEventListener("mouseleave", mouseoutInfoContainer); 


	elems.lineLabelSalary = document.createElement("div");
	elems.lineLabelSalary.className = "line-label";
	
	elems.labelSalary = document.createElement("p");
	elems.labelSalary.className = "small-title-info";
	elems.labelSalary.innerText = "Your salary";

	elems.questionSalary = document.createElement("div");
	elems.questionSalary.className = "question-logo";

	elems.lineLabelSalary.appendChild(elems.labelSalary);
	elems.lineLabelSalary.appendChild(elems.questionSalary);

	elems.inputSalary = document.createElement("input");
	elems.inputSalary.className = "input-text";
	elems.inputSalary.type = "text";
	elems.inputSalary.setAttribute('required', '');


	elems.inputContainerHours = document.createElement("div");
	elems.inputContainerHours.className = "pop-input-container";
	elems.inputContainerHours.addEventListener("mouseenter", mouseoverInfoContainer);
	elems.inputContainerHours.addEventListener("mouseleave", mouseoutInfoContainer);

	elems.lineLabelHours = document.createElement("div");
	elems.lineLabelHours.className = "line-label";

	elems.labelHours = document.createElement("p");
	elems.labelHours.className = "small-title-info";
	elems.labelHours.innerText = "Hours Deduc."; // before Hours Deducted

	elems.questionHours = document.createElement("div");
	elems.questionHours.className = "question-logo";

	elems.lineLabelHours.appendChild(elems.labelHours);
	elems.lineLabelHours.appendChild(elems.questionHours);

	elems.inputDeducted = document.createElement("input");
	elems.inputDeducted.className = "input-text";
	elems.inputDeducted.type = "text";
	elems.inputDeducted.setAttribute('required', '');


	elems.habitContainer = document.createElement("div");
	elems.habitContainer.className = "habit-container";
	elems.habitContainer.addEventListener("mouseenter", mouseoverInfoContainer);
	elems.habitContainer.addEventListener("mouseleave", mouseoutInfoContainer);

	elems.lineLabelHabit = document.createElement("div");
	elems.lineLabelHabit.className = "line-label";

	elems.weeklySpan = document.createElement("p");
	elems.weeklySpan.className = "main-title-info";
	elems.weeklySpan.innerText = "Monthly Attendance";

	elems.questionHabit = document.createElement("div");
	elems.questionHabit.className = "question-logo";
	
	elems.monthContainer = document.createElement("div");
	elems.monthContainer.className = "month-container";
	
	elems.lineLabelHabit.appendChild(elems.weeklySpan);
	elems.lineLabelHabit.appendChild(elems.questionHabit);

	elems.habitContainer.appendChild(elems.lineLabelHabit);
	elems.habitContainer.appendChild(elems.monthContainer);

	elems.monthDayBoxes = [];
	elems.monthLineDayName = document.createElement("div");
	elems.monthLineDayName.className = "days-name-line";

	function triggerSelect(id, conditionBool, newBool, borderColor) {

		var update = false;

		for (var i = popup.numberDay - 1; i < elems.monthArray[popup.months.indexArray].checkboxes.length; i++)
		{
			if (elems.monthArray[popup.months.indexArray].checkboxes[i].getAttribute("indexday") === id)
			{
				if (data.student.monthlyHabit[i] === conditionBool && (i + 1 !== popup.numberDay))
				{
					update = true;
					data.student.monthlyHabit[i] = newBool;
					elems.monthArray[popup.months.indexArray].checkboxes[i].style.borderColor = borderColor;
				}
			}
		}
		if (data.isHomePage === -1 && update)
			data.updateLocalStorage();
		popup.setData(elems);
	}

	function selectAllSameDay(e) {

		if (popup.months.indexArray === popup.months.length - 1)
		{
			var allTrue = true, update = false;

			for (var i = popup.numberDay; i < elems.monthArray[popup.months.indexArray].checkboxes.length; i++)
			{
				if (elems.monthArray[popup.months.indexArray].checkboxes[i].getAttribute("indexday") === e.target.id)
				{
					if (!data.student.monthlyHabit[i])
						allTrue = false;
				}
			}
			if (allTrue)
				triggerSelect(e.target.id, true, false, "rgb(45, 49, 60)");
			else
				triggerSelect(e.target.id, false, true, "rgb(0, 186, 188)");
		}
	}

	const arrayDaysName = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
	for (var i = 0; i < 7; i++)
	{
		elems.monthDayBoxes[i] = document.createElement("div");
		elems.monthDayBoxes[i].className = "days-name-box";
		elems.monthDayBoxes[i].id = i;
		elems.monthDayBoxes[i].innerText = arrayDaysName[i];
		elems.monthDayBoxes[i].addEventListener("click", selectAllSameDay);
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
				tmpDay.setAttribute("indexday", popup.months[k].days[indexMonth - 1].dayNumber);

				// console.log("month " + indexMonth);
				// console.log(popup.months[k].days[indexMonth - 1].dayNumber);
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
					tmpDay.style.cursor = "default";
					tmpDay.style.pointerEvents = "none";
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


	function mouseoverInfoContainer(e) {

		// e.target.style.backgroundColor = "red";
		// console.log(e.target.firstElementChild.lastElementChild);
		e.target.firstElementChild.lastElementChild.style.opacity = "1";
	}

	function mouseoutInfoContainer(e) {

		e.target.style.backgroundColor = "";
		e.target.firstElementChild.lastElementChild.style.opacity = "0";
	}


	//////////////////////////////////////////////////////////////////////  MIDDLE RIGHT DIV
	elems.popMiddleDivRight = document.createElement("div");
	elems.popMiddleDivRight.className = "pop-middle-div-right";


	//////////////////////////////////////////////////////////////////////  LOGTIME CONTAINER
	elems.logtimeContainer = document.createElement("div");
	elems.logtimeContainer.className = "logtime-container";
	elems.logtimeContainer.addEventListener("mouseenter", mouseoverInfoContainer);
	elems.logtimeContainer.addEventListener("mouseleave", mouseoutInfoContainer);

	elems.lineLogtime = document.createElement("div");
	elems.lineLogtime.className = "line-label";

	elems.titleLogtime = document.createElement("p");
	elems.titleLogtime.className = "main-title-info";
	elems.titleLogtime.innerText = "Logtime";
	elems.questionLogtime = document.createElement("div");
	elems.questionLogtime.className = "question-logo";
	
	elems.blockLogtime = document.createElement("div");
	elems.blockLogtime.className = "block-logtime";

	elems.blockLogtimeLeft = document.createElement("div");
	elems.blockLogtimeLeft.className = "block-logtime-side";
	elems.blockLogtimeLeft.style.borderRight = "1px solid rgb(45, 49, 60)";
	elems.labelLogtimeLeft = document.createElement("p");
	elems.labelLogtimeLeft.className = "small-title-info";
	// elems.labelLogtimeLeft.innerText = "Each Day";
	elems.resultLogtimeLeft = document.createElement("p");
	elems.resultLogtimeLeft.className = "number-result";
	// elems.resultLogtimeLeft.innerText = "0h00";

	elems.extraLogtimeLeft = document.createElement("div");
	elems.extraLogtimeLeft.className = "extra-logtime-left";
	elems.extraLogtimeSideLeft = document.createElement("div");
	elems.extraLogtimeSideLeft.className = "extra-logtime-side";
	elems.extraLogtimeSideLeft.innerText = "Without\nBoost Lock";
	elems.extraLogtimeSideLeft.style.textAlign = "right";
	
	elems.extraLogtimeSideRight = document.createElement("div");
	elems.extraLogtimeSideRight.className = "extra-logtime-side";
	elems.extraLogtimeSideRight.innerText = "0h00";
	elems.extraLogtimeSideRight.style.color = "rgb(140, 140, 140)";
	elems.extraLogtimeSideRight.style.justifyContent = "flex-start";
	elems.extraLogtimeSideRight.style.fontSize = "14px";

	elems.extraLogtimeLeft.appendChild(elems.extraLogtimeSideLeft);
	elems.extraLogtimeLeft.appendChild(elems.extraLogtimeSideRight);

	elems.blockLogtimeLeft.appendChild(elems.labelLogtimeLeft);
	elems.blockLogtimeLeft.appendChild(elems.resultLogtimeLeft);
	elems.blockLogtimeLeft.appendChild(elems.extraLogtimeLeft);


	elems.blockLogtimeRight = document.createElement("div");
	elems.blockLogtimeRight.className = "block-logtime-side";
	elems.labelLogtimeRight = document.createElement("p");
	elems.labelLogtimeRight.className = "small-title-info";
	// elems.labelLogtimeRight.innerText = "Est. Lockout Time";

	elems.estimationLogtime = document.createElement("div");
	elems.estimationLogtime.className = "number-result";
	// elems.estimationLogtime.innerText = "0h00";

	elems.blockLogtimeRight.appendChild(elems.labelLogtimeRight);
	elems.blockLogtimeRight.appendChild(elems.estimationLogtime);

	elems.lineLogtime.appendChild(elems.titleLogtime);
	elems.lineLogtime.appendChild(elems.questionLogtime);

	elems.blockLogtime.appendChild(elems.blockLogtimeLeft);
	elems.blockLogtime.appendChild(elems.blockLogtimeRight);

	elems.logtimeContainer.appendChild(elems.lineLogtime);
	elems.logtimeContainer.appendChild(elems.blockLogtime);

	if (data.session.logAtSchool)
	{
		elems.labelLogtimeLeft.innerText = "Remaining Today";
		elems.resultLogtimeLeft.innerText = "0h00";
		if (data.student.addBoostHalf || data.student.addBoostFull)
			elems.labelLogtimeRight.innerText = "Est. Lockout Time";
		else
			elems.labelLogtimeRight.innerText = "Est. Logout Time";
	}
	else
	{
		elems.labelLogtimeLeft.innerText = "Each Day";
		elems.labelLogtimeRight.innerText = "Days Remaining";
	}

	if (data.student.addBoostHalf || data.student.addBoostFull)
		elems.extraLogtimeLeft.style.display = "flex";
	else
		elems.extraLogtimeLeft.style.display = "none";
	

	//////////////////////////////////////////////////////////////////////  SALARY CONTAINER
	elems.salaryContainer = document.createElement("div");
	elems.salaryContainer.className = "salary-container";

	elems.mainTitleInfo = document.createElement("p");
	elems.mainTitleInfo.className = "main-title-info";
	elems.mainTitleInfo.innerText = "Earned";


	elems.lineLabelEarn = document.createElement("div");
	elems.lineLabelEarn.className = "line-label";

	elems.questionEarn = document.createElement("div");
	elems.questionEarn.className = "question-logo";

	elems.lineLabelEarn.appendChild(elems.mainTitleInfo);
	elems.lineLabelEarn.appendChild(elems.questionEarn);


	elems.lineThisSelection = document.createElement("div");
	elems.lineThisSelection.className = "line-this-selection";
	elems.salaryCircleContainer = document.createElement("div");
	elems.salaryCircleContainer.className = "salary-circle-container";

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

	elems.salaryContainer.appendChild(elems.lineLabelEarn);
	elems.salaryContainer.appendChild(elems.lineThisSelection);
	elems.salaryContainer.appendChild(elems.salaryCircleContainer);
	elems.popMiddleDivRight.appendChild(elems.logtimeContainer);
	elems.popMiddleDivRight.appendChild(elems.salaryContainer);
	
	
	///////////////////////////////////////////////////////////////////////// GRAPH SLIDE
	elems.salaryGraphContainer = document.createElement("div");
	elems.salaryGraphContainer.className = "salary-graph-container";

	elems.salaryContainer.appendChild(elems.salaryGraphContainer);

	elems.monthGraphs = [];
	elems.lineGraphs = [];
	for (var j = 0; j < popup.months.length; j++)
	{
		const numberDayGraph = popup.months[j].arrayElems.length;
		var tmpDay = {
			dayGraphs: [],
			daySlideContainers: [],
			daySlides: [],
			dayBases: []
		};
		elems.lineGraphs.push(document.createElement("div"));
		elems.lineGraphs[j].className = "line-graph";
	
		for (var i = 0; i < numberDayGraph; i++)
		{
			tmpDay.dayGraphs.push(document.createElement("div"));
			tmpDay.dayGraphs[i].className = "day-graph";
			tmpDay.daySlideContainers.push(document.createElement("div"));
			tmpDay.daySlideContainers[i].className = "day-slide-container";
			tmpDay.daySlides.push(document.createElement("div"));
			tmpDay.daySlides[i].className = "day-slide";
			tmpDay.dayBases.push(document.createElement("div"));
			tmpDay.dayBases[i].className = "day-base";
	
			tmpDay.daySlideContainers[i].appendChild(tmpDay.daySlides[i]);
	
			tmpDay.dayGraphs[i].appendChild(tmpDay.daySlideContainers[i]);
			tmpDay.dayGraphs[i].appendChild(tmpDay.dayBases[i]);

			elems.lineGraphs[j].appendChild(tmpDay.dayGraphs[i]);
		}
		elems.monthGraphs.push(tmpDay);
		elems.salaryGraphContainer.appendChild(elems.lineGraphs[j]);
	}
	
	elems.lineGraphs[popup.months.length - 1].style.display = "flex";

	for (var i = 0; i < popup.months.length; i++)
		popup.calculDays(elems, i);

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

	for (var i = 0; i < popup.months.length; i++)
		popup.setAttributeDaySlide(elems, i);

	for (var j = 0; j < elems.monthGraphs.length; j++)
	{
		for (var i = 0; i < elems.monthGraphs[j].daySlideContainers.length; i++)
		{
			elems.monthGraphs[j].daySlideContainers[i].addEventListener("mouseover", function(e) {
	
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
	
			elems.monthGraphs[j].daySlideContainers[i].addEventListener("mouseout", function(e) {
				e.target.firstElementChild.style.backgroundColor = "rgba(0, 186, 188, 0.40)";
				elems.tooltipSalary.style.opacity = "0";
			});
		}
	}


	//////////////////////////////////////////////////////////////////////  PROGRESS CONTAINER
	elems.popProgressContainer = document.createElement("div");
	elems.popProgressContainer.className = "pop-progress-container";

	// elems.popProgressTitle = document.createElement("span");
	// elems.popProgressTitle.className = "pop-title-container";
	elems.popProgressTitle = document.createElement("p");
	elems.popProgressTitle.className = "main-title-info";
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
	elems.mainTitleBoost.innerText = "Boost Lock";

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
		elems.buttonBoostMin.style.borderColor = "rgb(0, 186, 188)";
		// elems.checkboxHalfCenter.style.backgroundColor = "rgb(0, 186, 188)";
	}
	else if (data.student.addBoostFull)
	{
		elems.buttonBoostMax.style.borderColor = "rgb(0, 186, 188)";
		// elems.checkboxFullCenter.style.backgroundColor = "rgb(0, 186, 188)";
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
	elems.popMiddleDivLeft.appendChild(elems.middleLine3);
	elems.popMiddleDivLeft.appendChild(elems.middleLine2);
	elems.middleLine1.appendChild(elems.inputContainerSalary);
	elems.middleLine1.appendChild(elems.inputContainerHours);
	
	// elems.inputContainerSalary.appendChild(elems.labelSalary);
	elems.inputContainerSalary.appendChild(elems.lineLabelSalary);
	elems.inputContainerSalary.appendChild(elems.inputSalary);
	
	// elems.inputContainerHours.appendChild(elems.labelHours);
	elems.inputContainerHours.appendChild(elems.lineLabelHours);
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
	// elems.popupTopDiv.style.justifyContent = "space-between";
	elems.popupTopDiv.style.justifyContent = "flex-start";
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
	elems.popupTopRightText.style.margin = "0 2px";
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

	if (data.session.logAtSchool)
		var i = numberDay - 1;
	else
		var i = numberDay;
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

// popup.date = new Date();
popup.date = new Date("2023-12-24");
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
			if (i + 1 <= popup.numberDay)
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

	data.session.numberDays = numberDays.total;
	elems.numberResultOpen.innerText = numberDays.open;
	elems.numberResultTotal.innerText = numberDays.total;		// DEV ONLY

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
		if (data.session.logAtSchool)
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

	function getEachDay(resultEachDay) {

		var resultInteger = parseInt(resultEachDay);
		var resultFloat = parseInt((resultEachDay - resultInteger) * 60);
		var tmpEachDay;
	
		if (resultInteger < 0 || resultFloat < 0)
			tmpEachDay = "0h00";
		else if (resultFloat < 10)
			tmpEachDay = resultInteger + "h0" + resultFloat;
		else
			tmpEachDay = resultInteger + "h" + resultFloat;
		return tmpEachDay;
	}
	function getRemainingToday(resultRemaining) {

		var doneInteger = parseInt(resultRemaining);
		var doneFloat = parseInt((resultRemaining - doneInteger) * 60);

		var tmpRemainingToday = doneInteger + "h";
		if (doneFloat < 10)
			tmpRemainingToday += "0";
		tmpRemainingToday += doneFloat;
		return tmpRemainingToday;
	}

	var resultRemaining = resultEachDay - dayTimeDone;

	if (resultRemaining <= 0)
	{
		elems.resultLogtime2.innerText = "DONE";
		elems.resultLogtime2.style.color = "rgb(0, 186, 188)";
		elems.resultLogtimeLeft.innerText = "DONE";
		elems.resultLogtimeLeft.style.color = "rgb(0, 186, 188)";

		resultEachDay += resultRemaining / numberDays.total;
	}
	else
	{
		var remaining = getRemainingToday(resultRemaining);

		elems.resultLogtime2.innerText = remaining;
		elems.resultLogtime2.style.color = "white";
		elems.resultLogtimeLeft.innerText = remaining;
		elems.resultLogtimeLeft.style.color = "white";
	}
	elems.resultLogtime1.innerText = getEachDay(resultEachDay);

	console.log("eachDay: " + resultEachDay + "  resultRemaining: " + resultRemaining);
	console.log(resultEachDay + (resultRemaining / numberDays.total));

	elems.salaryInteger.innerText = integerSalary;
	elems.salaryFloat.innerText = "." + floatSalary.toFixed(2).split('.')[1];
	elems.salaryPercent.innerText = percentSalary.toFixed(1) + '%';
	elems.salarySlide.style.height = percentSalary + "%";

	if (data.session.logAtSchool)
	{
		// elems.resultLogtimeLeft.innerText = "0h00";
		elems.estimationLogtime.innerText = "0h00";
	}
	else
	{
		elems.resultLogtimeLeft.innerText = tmpEachDay;
		elems.estimationLogtime.innerText = data.session.numberDays;
	}
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
		popup.calculDays(elems, popup.months.indexArray);
		popup.setAttributeDaySlide(elems, popup.months.indexArray);
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


/*********************** CLICKER *************************/
// const clickerButton = document.querySelector(".clicker-salary-circle-inside");
// const clickerInteger = document.querySelector(".clicker-salary-integer");
// const clickerFloat = document.querySelector(".clicker-salary-float");
// const clickerPerSecond = document.querySelector(".clicker-per-second-number");

// clickerInteger.innerText = 0;
// clickerFloat.innerText = "." + 0;
// clickerPerSecond.innerText = 0;

// var valueInteger = 0;
// var valueFloat = 0;
// var clickerEvent = 0;
// clickerButton.addEventListener("click", function(e) {

// 	clickerButton.style.backgroundColor = "rgba(40, 45, 54, 0.9)";
// 	clickerButton.style.boxShadow = "6px 6px 0 rgba(16, 16, 16, 0.5)";

// 	if (clickerEvent)
// 		clearTimeout(clickerEvent);
// 	clickerEvent = setTimeout(function(e) {
// 		clickerButton.style.backgroundColor = "rgba(37, 41, 50, 0.9)";
// 		clickerButton.style.boxShadow = "10px 10px 0 rgba(16, 16, 16, 0.5)";
// 	}, 100);

// 	valueFloat += 1;
// 	if (valueFloat === 10)
// 	{
// 		valueFloat = 0;
// 		valueInteger += 1;
// 	}

// 	clickerInteger.innerText = valueInteger;
// 	clickerFloat.innerText = "." + valueFloat;

// });
