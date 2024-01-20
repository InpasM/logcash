
window.popup = window.popup || {};

popup.calculDays = function(elems, index) {

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
		elems.monthGraphs[indexMonth].daySlideContainers[i].setAttribute("timeDone", popup.months[indexMonth].days[i].timeDone);
	}
}

function clickBoostMin() {

	if (data.student.addBoostHalf)
	{
		data.student.addBoostHalf = false;
		elems.buttonBoostMin.style.borderColor = "rgb(45, 49, 60)";
		elems.buttonBoostMin.style.backgroundColor = "rgba(37, 41, 50, 0.9)";
		elems.buttonBoostMin.style.color = "rgb(155, 155, 155)";
		elems.labelLogtimeEstimation.innerText = arrayLanguages[data.student.language].labelEstimationLog;
		elems.miniLogtimeTitleLock.innerText = arrayLanguages[data.student.language].labelEstimationLogMini;
	}
	else
	{
		if (data.student.addBoostFull)
		{
			data.student.addBoostFull = false;
			elems.buttonBoostMax.style.borderColor = "rgb(45, 49, 60)";
			elems.buttonBoostMax.style.backgroundColor = "rgba(37, 41, 50, 0.9)";
			elems.buttonBoostMax.style.color = "rgb(155, 155, 155)";
			elems.labelLogtimeEstimation.innerText = arrayLanguages[data.student.language].labelEstimationLock;
			elems.miniLogtimeTitleLock.innerText = arrayLanguages[data.student.language].labelEstimationLockMini;
		}
		else
		{
			elems.labelLogtimeEstimation.innerText = arrayLanguages[data.student.language].labelEstimationLock;
			elems.miniLogtimeTitleLock.innerText = arrayLanguages[data.student.language].labelEstimationLockMini;
		}
		data.student.addBoostHalf = true;
		elems.buttonBoostMin.style.borderColor = "rgb(0, 186, 188)";
		elems.buttonBoostMin.style.backgroundColor = "#373c48";
		elems.buttonBoostMin.style.color = "white";
	}
	if (data.student.addBoostHalf || data.student.addBoostFull)
		elems.extraLogtimeLeft.style.opacity = "1";
	else
		elems.extraLogtimeLeft.style.opacity = "0";
	data.updateLocalStorage();
	popup.setData(elems);
}

function clickBoostMax() {

	if (data.student.addBoostFull)
	{
		data.student.addBoostFull = false;
		elems.buttonBoostMax.style.borderColor = "rgb(45, 49, 60)";
		elems.buttonBoostMax.style.backgroundColor = "rgba(37, 41, 50, 0.9)";
		elems.buttonBoostMax.style.color = "rgb(155, 155, 155)";
		elems.labelLogtimeEstimation.innerText = arrayLanguages[data.student.language].labelEstimationLog;
		elems.miniLogtimeTitleLock.innerText = arrayLanguages[data.student.language].labelEstimationLogMini;
	}
	else
	{
		if (data.student.addBoostHalf)
		{
			data.student.addBoostHalf = false;
			elems.buttonBoostMin.style.borderColor = "rgb(45, 49, 60)";
			elems.buttonBoostMin.style.backgroundColor = "rgba(37, 41, 50, 0.9)";
			elems.buttonBoostMin.style.color = "rgb(155, 155, 155)";
			elems.labelLogtimeEstimation.innerText = arrayLanguages[data.student.language].labelEstimationLock;
			elems.miniLogtimeTitleLock.innerText = arrayLanguages[data.student.language].labelEstimationLockMini;
		}
		else
		{
			elems.labelLogtimeEstimation.innerText = arrayLanguages[data.student.language].labelEstimationLock;
			elems.miniLogtimeTitleLock.innerText = arrayLanguages[data.student.language].labelEstimationLockMini;
		}
		data.student.addBoostFull = true;
		elems.buttonBoostMax.style.borderColor = "rgb(0, 186, 188)";
		elems.buttonBoostMax.style.backgroundColor = "#373c48";
		elems.buttonBoostMax.style.color = "white";
	}
	if (data.student.addBoostHalf || data.student.addBoostFull)
		elems.extraLogtimeLeft.style.opacity = "1";
	else
		elems.extraLogtimeLeft.style.opacity = "0";
	data.updateLocalStorage();
	popup.setData(elems);
}

var questions = [
	[
		{	
			text: "Enter any hours you wish to deduct here.\n\
			This can include days off, public holidays, medical exemptions, \
			school announcements, etc.",
			width: 125
		},
		{	
			text: "Include the extra time added to your logtime if leaving with a locked session at the end of the day.",
			width: 125
		},
		{	
			text: "Select the days you plan to attend school.\n\
			Clicking on the day's name will select the whole column.\n\
			If no day is selected, the estimate will be based on the remaining open days.\n\
			Double-clicking on \"Monthly Attendance\" will reset your calendar.",
			width: 170
		},
		{	
			text: "When logged at school, you will be able to see the remaining time you have to do today to reach your monthly goal.",
			width: 150
		},
	],
	[
		{	
			text: "Ajouter ici toutes les heures à deduire du mois.\n\
			Congés, jours fériés, dispense médical, \
			annonce de l'école...",
			width: 125
		},
		{	
			text: "Ajouter à l'estimation le temps de Logtime qui s'écoule en laissant sa session verrouillée en fin de journée.",
			width: 125
		},
		{	
			text: "Selectionner chaque journée auquelle vous prevoyez d'assister.\n\
			Cliquer sur les noms de jour pour selectionner toute une colonne.\n\
			Si aucun jour n'est selectionné, l'estimation sera basé sur le nombre de jour ouvré restant.\n\
			Double clique sur \"Presence Mensuelle\" pour reset le calendrier.",
			width: 170
		},
		{	
			text: "Connecté à l'école, vous verrez le temps estimé restant à faire cette journée pour atteindre votre objectif mensuel.",
			width: 150
		},
	]
];

var timeOutQuestion;
function mouseOverQuestion(e) {

	clearTimeout(timeOutQuestion);

	elemRect = e.target.getBoundingClientRect();
	tooltipRect = elems.tooltipQuestion.getBoundingClientRect();

	offsetLeft = elemRect.left - (tooltipRect.width / 2) + (elemRect.width / 2);
	offsetTop = elemRect.top + 20 + window.scrollY;

	elems.tooltipQuestion.style.opacity = "1";
	elems.tooltipQuestion.style.top = offsetTop + "px";
	elems.tooltipQuestion.style.left = offsetLeft + "px";

	elems.tooltipQuestion.style.width = questions[data.student.language][e.target.id].width * data.student.sizePanel + "px";

	elems.tooltipQuestionBottomText.innerText = questions[data.student.language][e.target.id].text;
}

function mouseOutQuestion(e) {

	elems.tooltipQuestion.style.opacity = "0";
	timeOutQuestion = setTimeout(function() {
		
		elems.tooltipQuestion.style.top = "-1000px";
		elems.tooltipQuestion.style.left = "-1000px";
	}, 300);
}

function doHideShow(e) {

	var arrayElems = ["popup-top-left-text", "popup-top-right-text", "top-div-setting-block", "top-div-maximize-button", "top-div-minimize-button"];

	for (var i = 0; i < arrayElems.length; i++)
	{
		if (e.target.className === arrayElems[i])
			return true;
	}
	return false;
}

function hidePopup(elems) {

	elems.resultsDiv.style.height = "0px";
	elems.resultsDiv.style.padding = "0px 8px";
	elems.resultsDiv.style.opacity = "0";
	elems.boostLockContainer.style.height = "0px";
	elems.boostLockContainer.style.padding = "0px 8px";
	elems.boostLockContainer.style.opacity = "0";
	elems.estimationContainer.style.height = "0px";
	elems.estimationContainer.style.padding = "0px 8px";
	elems.estimationContainer.style.opacity = "0";

	elems.popMiddleDivLeft.style.opacity = "0";
	elems.popMiddleDivLeft.style.height = "0";
	elems.popMiddleDivLeft.style.padding = "0 " + 8 * data.student.sizePanel + "px";
	elems.popMiddleDivRight.style.opacity = "0";
	elems.popMiddleDivRight.style.height = "0";
	elems.popMiddleDivRight.style.padding = "0 " + 8 * data.student.sizePanel + "px";

	elems.popupTopDiv.style.borderBottom = "1px solid rgba(45, 49, 60, 0)";

	elems.popMiddleDiv.style.transform = "translateY(-5px)";

	elems.popProgressTitle.style.opacity = "0";
	elems.popProgressTitle.style.height = "0";
	elems.containerLogcash.style.marginTop = "0";

	elems.topDivMinimizeButton.style.display = "none";
	elems.topDivMaximizeButton.style.display = "flex";

	elems.miniLogtimePanel.style.display = "flex";
}

function showPopup(elems) {

	elems.resultsDiv.style.height = "";
	elems.resultsDiv.style.padding = "8px";
	elems.resultsDiv.style.opacity = "1";
	elems.boostLockContainer.style.height = "";
	elems.boostLockContainer.style.padding = "8px";
	elems.boostLockContainer.style.opacity = "1";
	elems.estimationContainer.style.height = "";
	elems.estimationContainer.style.padding = "8px";
	elems.estimationContainer.style.opacity = "1";

	elems.popMiddleDivLeft.style.opacity = "1";
	elems.popMiddleDivLeft.style.height = "";
	elems.popMiddleDivLeft.style.padding = 8 * data.student.sizePanel + "px";
	
	elems.popMiddleDivRight.style.opacity = "1";
	elems.popMiddleDivRight.style.height = "";
	elems.popMiddleDivRight.style.padding = 8 * data.student.sizePanel + "px";
	
	elems.popupTopDiv.style.borderBottom = "1px solid rgb(45, 49, 60)";

	elems.popMiddleDiv.style.transform = "translateY(0)";

	elems.popProgressTitle.style.opacity = "1";
	elems.popProgressTitle.style.height = "";
	elems.containerLogcash.style.marginTop = "4px";
	
	elems.miniLogtimePanel.style.display = "none";
	
	elems.topDivMinimizeButton.style.display = "flex";
	elems.topDivMaximizeButton.style.display = "none";
	
	elems.popMiddleDivLeft.style.transition = "ease 0.4s opacity, ease 0.4s height, ease 0.4s padding-top, ease 0.4s padding-bottom";
	elems.popMiddleDivRight.style.transition = "ease 0.4s opacity, ease 0.4s height, ease 0.4s padding-top, ease 0.4s padding-bottom";
}

function hideShowPopup(elems, e) {

	if (doHideShow(e))
	{
		if (!data.student.popupVisible)
		{
			showPopup(elems);
			data.student.popupVisible = true;
		}
		else
		{
			hidePopup(elems);
			data.student.popupVisible = false;
		}
		data.updateLocalStorage();
	}
}

var arrayLanguages = [
	{
		boost: "Boost Lock",
		labelSalary: "Your salary",
		labelHours: "Hours Deducted",
		monthlyAttendance: "Monthly Attendance",
		labelLogtimeEach: "Each Day",
		extraLogtimeSideLeft: "Without\nBoost Lock",
		daysRemaining: "Remaining Days",
		daysRemainingMini: "Rem. Days",
		mainTitleInfo: "Cash Earned",
		popProgressTitle: "Hours Done",
		arrayDaysName: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
		arrayMonth: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
		labelLogtimeRemaining: "Remaining Today",
		labelLogtimeRemainingMini: "Today",
		labelEstimationLock: "Lockout Time",
		labelEstimationLockMini: "Lock Time",
		labelEstimationLog: "Logout Time",
		labelEstimationLogMini: "Log. Time",
		darkMode: "Dark Mode",
		devise: "Devise",
		language: "Language",
		save: "Save Month",
		size: "Panel Size",
		done: "DONE",
	},
	{
		boost: "Boost\nVerrouillage",
		labelSalary: "Votre salaire",
		labelHours: "Heures Deduites",
		monthlyAttendance: "Presence Mensuelle",
		labelLogtimeEach: "Par Jour",
		extraLogtimeSideLeft: "Sans Boost\nVerrouillage",
		daysRemaining: "Jour Restant",
		daysRemainingMini: "Jour Rest.",
		mainTitleInfo: "Salaire Perçu",
		popProgressTitle: "Heures Faites",
		arrayDaysName: ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"],
		arrayMonth: ["Jan", "Fev", "Mar", "Avr", "Mai", "Jui", "Juil", "Aou", "Sep", "Oct", "Nov", "Dec"],
		labelLogtimeRemaining: "Restant Aujourd'hui",
		labelLogtimeRemainingMini: "Aujourd'hui",
		labelEstimationLock: "Heure Verrouillage",
		labelEstimationLockMini: "Heure Verr.",
		labelEstimationLog: "Heure Déconnexion",
		labelEstimationLogMini: "Heure Déco.",
		darkMode: "Mode Sombre",
		devise: "Devise",
		language: "Langue",
		save: "Sauvegarde Mois",
		size: "Taille Cadre",
		done: "FAIT",
	}
];

function initText(elems, text) {

	elems.popupTopLeftText.innerText = "Logcash";

	elems.titleBoost.innerText = text.boost;
	elems.labelSalary.innerText = text.labelSalary;
	elems.labelHours.innerText = text.labelHours;
	elems.weeklySpan.innerText = text.monthlyAttendance;
	elems.extraLogtimeSideLeft.innerText = text.extraLogtimeSideLeft;
	elems.labelLogtimeNumberDay.innerText = text.daysRemaining;
	elems.mainTitleInfo.innerText = text.mainTitleInfo;
	elems.popProgressTitle.innerText = text.popProgressTitle;
	elems.mainTitleDays.innerText = text.daysRemaining;
	elems.mainTitleBoost.innerText = text.boost;

	for (var i = 0; i < 7; i++)
	{
		elems.monthDayBoxes[i].innerText = text.arrayDaysName[i];
	}

	if (data.session.logAtSchool)
	{
		elems.labelLogtimeRemaining.innerText = text.labelLogtimeRemaining;
		elems.miniLogtimeTitleRemaining.innerText = arrayLanguages[data.student.language].labelLogtimeRemainingMini;
		if (data.student.addBoostHalf || data.student.addBoostFull)
		{
			elems.labelLogtimeEstimation.innerText = text.labelEstimationLock;
			elems.miniLogtimeTitleLock.innerText = arrayLanguages[data.student.language].labelEstimationLockMini;
		}
		else
		{
			elems.labelLogtimeEstimation.innerText = text.labelEstimationLog;
			elems.miniLogtimeTitleLock.innerText = arrayLanguages[data.student.language].labelEstimationLogMini;
		}
	}
	else
	{
		elems.labelLogtimeRemaining.innerText = text.labelLogtimeEach;
		elems.miniLogtimeTitleRemaining.innerText = arrayLanguages[data.student.language].labelLogtimeEach;
		elems.miniLogtimeTitleLock.innerText = arrayLanguages[data.student.language].daysRemainingMini;
	}

	if (elems.resultLogtimeRemaining.innerText === "DONE" || elems.resultLogtimeRemaining.innerText === "FAIT")
		elems.resultLogtimeRemaining.innerText = arrayLanguages[data.student.language].done;
	if (elems.miniLogtimeValueRemaining.innerText === "DONE" || elems.miniLogtimeValueRemaining.innerText === "FAIT")
		elems.miniLogtimeValueRemaining.innerText = arrayLanguages[data.student.language].done;
	if (elems.resultLogtimeEach.innerText === "/ DONE" || elems.resultLogtimeEach.innerText === "/ FAIT")
		elems.resultLogtimeEach.innerText = "/ " + arrayLanguages[data.student.language].done;
	if (elems.extraLogtimeSideRight.innerText === "DONE" || elems.extraLogtimeSideRight.innerText === "FAIT")
		elems.extraLogtimeSideRight.innerText = arrayLanguages[data.student.language].done;


	const arrayMonth = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
	for (var i = 0; i < elems.divMonths.length; i++)
	{
		for (var j = 0; j < arrayMonth.length; j++)
		{
			if (elems.divMonths[i].innerText === arrayMonth[j])
				elems.divMonths[i].innerText = text.arrayMonth[j];
		}
	}
	// elems.panelDarkTitle.innerText = text.darkMode;
	// elems.panelDeviseTitle.innerText = text.devise;
	elems.panelLanguageTitle.innerText = text.language;
	// elems.panelSaveTitle.innerText = text.save;
	elems.panelSizeFontTitle.innerText = text.size;

	///////////////////////////////////////////// PROGRESS BAR
	// elems.miniLogtimeTitleRemaining.innerText = arrayLanguages[data.student.language].labelLogtimeRemainingMini;
	// elems.miniLogtimeTitleLock.innerText = arrayLanguages[data.student.language].labelLogtimeRemainingMini;
}

function updatePanelSize(elems) {

	const	ratio_1_5 = 1.5 * data.student.sizePanel + "px",
			ratio_2 = 2 * data.student.sizePanel + "px",
			ratio_3 = 3 * data.student.sizePanel + "px",
			ratio_4 = 4 * data.student.sizePanel + "px",
			ratio_6 = 6 * data.student.sizePanel + "px",
			ratio_7 = 7 * data.student.sizePanel + "px",
			ratio_8 = 8 * data.student.sizePanel + "px",
			ratio_9 = 9 * data.student.sizePanel + "px",
			ratio_10 = 10 * data.student.sizePanel + "px",
			ratio_11 = 11 * data.student.sizePanel + "px",
			ratio_12 = 12 * data.student.sizePanel + "px",
			ratio_14 = 14 * data.student.sizePanel + "px",
			ratio_15 = 15 * data.student.sizePanel + "px",
			ratio_16 = 16 * data.student.sizePanel + "px",
			ratio_20 = 20 * data.student.sizePanel + "px",
			ratio_22 = 22 * data.student.sizePanel + "px",
			ratio_24 = 24 * data.student.sizePanel + "px",
			ratio_35 = 35 * data.student.sizePanel + "px",
			ratio_40 = 40 * data.student.sizePanel + "px",
			ratio_43 = 43 * data.student.sizePanel + "px",
			ratio_45 = 45 * data.student.sizePanel + "px",
			ratio_48 = 48 * data.student.sizePanel + "px",
			ratio_54 = 54 * data.student.sizePanel + "px",
			ratio_90 = 90 * data.student.sizePanel + "px";

	///////////////////////////////////////////////// TOP LINE POPUP
	elems.popupTopLeftText.style.fontSize = ratio_14;
	elems.popupTopRightText.style.fontSize = ratio_12;

	////////////////////////////////////////////////// MIDDLE DIV
	if (!data.student.popupVisible)
	{
		elems.popMiddleDivLeft.style.padding = "0 " + 8 * data.student.sizePanel + "px";
		elems.popMiddleDivRight.style.padding = "0 " + 8 * data.student.sizePanel + "px";
	}
	else
	{
		elems.popMiddleDivLeft.style.padding = 8 * data.student.sizePanel + "px";
		elems.popMiddleDivRight.style.padding = 8 * data.student.sizePanel + "px";
	}
	
	//////////////////////////////////////////////////////// PROGRESS BAR
	elems.rowProgress.style.height = ratio_20;
	elems.sideProgress.style.fontSize = ratio_12;
	elems.sideProgress.style.minWidth = ratio_90;
	elems.textRemaining.style.fontSize = ratio_11;

	//////////////////////////////////////////////////////// MINI PROGRESS BAR
	elems.miniLogtimeTitleRemaining.style.fontSize = ratio_8;
	elems.miniLogtimeTitleRemaining.style.width = ratio_43;
	
	elems.miniLogtimeTitleLock.style.fontSize = ratio_8;
	elems.miniLogtimeTitleLock.style.width = ratio_43;

	elems.miniLogtimeValueRemaining.style.fontSize = ratio_10;
	elems.miniLogtimeValueLock.style.fontSize = ratio_10;
	
	
	//////////////////////////////////////////////// SETTING PANEL
	elems.topDivSettingPanel.style.padding = ratio_8;
	elems.topDivSettingPanel.style.borderRadius = ratio_4;

	elems.panelLanguageTitle.style.fontSize = ratio_10;
	elems.panelLanguageLine.style.margin = ratio_3 + " 0";		// panel line
	elems.panelSizeFontLine.style.margin = ratio_6 + " 0";
	elems.panelSizeFontBlock.style.padding = ratio_4 + " " + ratio_4;
	elems.panelSizeFontBlock.style.marginLeft = ratio_6;
	elems.panelSizeFontTitle.style.fontSize = ratio_10;
	elems.panelSizeFontTitle.style.minWidth = ratio_54;
	
	elems.panelLanguageButtonEnglish.style.fontSize = ratio_9;
	elems.panelLanguageButtonFrench.style.fontSize = ratio_9;

	elems.panelSizeFontValue.style.fontSize = ratio_12;
	elems.panelSizeFontValue.style.margin = "0 " + ratio_4 + " 0 0";

	elems.panelSizeFontMin.style.fontSize = ratio_14;
	elems.panelSizeFontMin.style.height = ratio_15;
	elems.panelSizeFontMin.style.width = ratio_15;
	elems.panelSizeFontMin.style.margin = "0 " + ratio_2;
	elems.panelSizeFontMax.style.fontSize = ratio_14;
	elems.panelSizeFontMax.style.height = ratio_15;
	elems.panelSizeFontMax.style.width = ratio_15;
	elems.panelSizeFontMax.style.margin = "0 0 0 " + ratio_2;

	elems.resetTooltipBlockConfirmTitle.style.fontSize = ratio_12;
	elems.panelResetLine.style.padding = ratio_8 + " 0 0 0";
	elems.panelResetButton.style.fontSize = ratio_10;
	elems.panelResetButton.style.padding = ratio_6 + " " + ratio_10;
	elems.panelResetButton.style.borderRadius = ratio_16;
	elems.resetConfirmButton.style.fontSize = ratio_10;
	elems.resetConfirmButton.style.padding = ratio_6 + " " + ratio_10;
	elems.resetConfirmButton.style.borderRadius = ratio_16;
	elems.resetCancelButton.style.fontSize = ratio_10;
	elems.resetCancelButton.style.padding = ratio_6 + " " + ratio_10;
	elems.resetCancelButton.style.borderRadius = ratio_16;

	////////////////////////////////////////////// BUTTONS
	// elems.buttonBoostMin.style.fontSize = ratio_10;
	// elems.buttonBoostMin.style.width = ratio_40;
	// elems.buttonBoostMin.style.height = ratio_22;
	// elems.buttonBoostMax.style.fontSize = ratio_10;
	// elems.buttonBoostMax.style.width = ratio_40;
	// elems.buttonBoostMax.style.height = ratio_22;

	/////////////////////////////////////////// INPUT
	elems.inputSalary.style.fontSize = ratio_16;
	elems.inputSalary.style.maxWidth = ratio_45;
	elems.inputDeducted.style.fontSize = ratio_16;
	elems.inputDeducted.style.maxWidth = ratio_45;
	elems.inputContainerSalary.style.marginRight = ratio_8;

	/////////////////////////////////////////////////// CALENDAR
	elems.selectionArrowRight.style.width = ratio_16;
	elems.selectionArrowLeft.style.width = ratio_16;

	for (var i = 0; i < 7; i++)
	{
		elems.monthDayBoxes[i].style.fontSize = ratio_8;
		elems.monthDayBoxes[i].style.width = ratio_20;
		elems.monthDayBoxes[i].style.height = ratio_20;1
		elems.monthDayBoxes[i].style.borderWidth = ratio_2;
		elems.monthDayBoxes[i].style.margin = "0 " + ratio_1_5;
	}

	for (var i = 0; i < elems.monthArray.length; i++)
	{
		for (var j = 0; j < elems.monthArray[i].checkboxes.length; j++)
		{
			elems.monthArray[i].checkboxes[j].style.fontSize = ratio_8;
			elems.monthArray[i].checkboxes[j].style.width = ratio_20;
			elems.monthArray[i].checkboxes[j].style.height = ratio_20;
			elems.monthArray[i].checkboxes[j].style.borderWidth = ratio_2;
			elems.monthArray[i].checkboxes[j].style.margin = "0 " + ratio_1_5;
		}
		elems.lineGraphs[i].style.maxHeight = ratio_40;

		for (var j = 0; j < elems.monthArray[i].lines.length; j++)
		 {
			//  console.log(elems.monthArray[i].lines[j]);
			 elems.monthArray[i].lines[j].style.marginTop = ratio_3;

		 }
		//  console.log(elems.monthArray[i].lines[elems.monthArray[i].lines.length - 1].childNodes);
		for (var j = 0; j < elems.monthArray[i].lines[elems.monthArray[i].lines.length - 1].childNodes.length; j++)
		{
			elems.monthArray[i].lines[elems.monthArray[i].lines.length - 1].childNodes[j].style.width = ratio_20;
			elems.monthArray[i].lines[elems.monthArray[i].lines.length - 1].childNodes[j].style.height = ratio_20;
			elems.monthArray[i].lines[elems.monthArray[i].lines.length - 1].childNodes[j].style.borderWidth = ratio_2;
			elems.monthArray[i].lines[elems.monthArray[i].lines.length - 1].childNodes[j].style.margin = "0 " + ratio_1_5;
		// 	elems.monthArray[i].lines[elems.monthArray[i].lines.length - 1].childNodes[j].style.backgroundColor = "red";
		// 	// elems.monthArray[i].lines[elems.monthArray[i].lines.length - 1].childNodes[j].style.borderWidth = ratio_2;
		}

		for (var j = 0; j < elems.lineGraphs[i].childNodes.length; j++)
		{
			for (var k = 0; k < elems.lineGraphs[i].childNodes[j].childNodes.length; k++)
			{
				if (elems.lineGraphs[i].childNodes[j].childNodes[k].className === "day-base")
				{
					elems.lineGraphs[i].childNodes[j].childNodes[k].style.height = ratio_2;
				}
			}
		}
	}

	elems.extraLogtimeSideLeft.style.fontSize = 7 * data.student.sizePanel + "px";
	elems.extraLogtimeSideLeft.style.lineHeight = ratio_8;
	elems.extraLogtimeSideLeft.style.width = ratio_40;
	elems.extraLogtimeSideRight.style.fontSize = ratio_10;
	elems.extraLogtimeSideRight.style.lineHeight = ratio_8;
	elems.extraLogtimeSideRight.style.width = ratio_35;

	var paddingY = 2 * data.student.sizePanel + "px ";
	var paddingX = 6 * data.student.sizePanel + "px";
	for (var i = 0; i < elems.divMonths.length; i++)
	{
		elems.divMonths[i].style.fontSize = ratio_10;
		elems.divMonths[i].style.borderWidth = ratio_1_5;
		elems.divMonths[i].style.padding = paddingY + paddingX;
	}

	//////////////////////////////////////////////////////////////////// LANGUAGE BUTTON
	elems.panelLanguageButtonEnglish.style.padding = paddingY + paddingX;
	elems.panelLanguageButtonEnglish.style.marginLeft = ratio_4;
	elems.panelLanguageButtonFrench.style.padding = paddingY + paddingX;
	elems.panelLanguageButtonFrench.style.marginLeft = ratio_4;

	elems.blockLogtimeLeft.style.minWidth = 74 * data.student.sizePanel + "px";
	elems.blockLogtimeRight.style.minWidth = 74 * data.student.sizePanel + "px";

	////////////////////////////////////////// TITLE SECTION
	elems.weeklySpan.style.fontSize = ratio_12;
	elems.titleLogtime.style.fontSize = ratio_12;
	elems.mainTitleInfo.style.fontSize = ratio_12;
	elems.popProgressTitle.style.fontSize = ratio_12;
	elems.mainTitleDays.style.fontSize = ratio_12;
	elems.mainTitleBoost.style.fontSize = ratio_12;
	elems.mainTitleLogtime.style.fontSize = ratio_12;

	elems.weeklySpan.style.margin = "0 0 0 " + ratio_2;
	elems.titleLogtime.style.margin = "0 0 0 " + ratio_2;
	elems.mainTitleInfo.style.margin = "0 0 0 " + ratio_2;
	elems.popProgressTitle.style.margin = "0 0 0 " + ratio_2;
	elems.mainTitleDays.style.margin = "0 0 0 " + ratio_2;
	elems.mainTitleBoost.style.margin = "0 0 0 " + ratio_2;
	elems.mainTitleLogtime.style.margin = "0 0 0 " + ratio_2;

	////////////////////////////////////////////// SALARY
	// elems.selectionArrowRight.style.marginLeft = ratio_2;
	// elems.selectionArrowLeft.style.marginRight = ratio_2;

	// elems.salaryEuroSign.style.fontSize = ratio_10;
	// elems.salaryInteger.style.fontSize = ratio_22;
	// elems.salaryFloat.style.fontSize = ratio_12;
	// elems.salaryPercent.style.fontSize = ratio_10;

	// elems.salaryCircle.style.maxWidth = 100 * data.student.sizePanel + "px";
	// elems.salaryCircle.style.minWidth = 84 * data.student.sizePanel + "px";

	elems.salaryEuroSign.style.fontSize = ratio_8;
	elems.salaryInteger.style.fontSize = ratio_20;
	elems.salaryFloat.style.fontSize = ratio_10;
	elems.salaryPercent.style.fontSize = ratio_8;

	elems.salaryCircle.style.maxWidth = 90 * data.student.sizePanel + "px";
	elems.salaryCircle.style.minWidth = 74 * data.student.sizePanel + "px";
	elems.salaryCircle.style.borderWidth = ratio_1_5;

	/////////////////////////////////////////// TOOLTIP QUESTION
	elems.questionHours.style.height = ratio_11;
	elems.questionBoost.style.height = ratio_11;
	elems.questionBoost.style.marginLeft = ratio_6;
	elems.questionHabit.style.height = ratio_11;
	elems.questionHabit.style.marginLeft = ratio_6;
	elems.questionLogtime.style.height = ratio_11;
	elems.questionLogtime.style.marginLeft = ratio_6;

	elems.tooltipQuestion.style.padding = ratio_8;

	elems.tooltipTopText.style.fontSize = ratio_8;
	elems.tooltipBottomText.style.fontSize = ratio_12;

	elems.tooltipQuestionBottomText.style.fontSize = ratio_10;
	elems.tooltipQuestionBottomText.style.lineHeight = ratio_12;

	//////////////////////////////////////////// LABEL
	elems.titleBoostMin.style.fontSize = ratio_8;
	elems.titleBoostMax.style.fontSize = ratio_8;
	elems.labelSalary.style.fontSize = ratio_8;
	elems.labelHours.style.fontSize = ratio_8;
	elems.labelLogtimeRemaining.style.fontSize = ratio_8;
	elems.labelLogtimeEstimation.style.fontSize = ratio_8;
	elems.labelLogtimeNumberDay.style.fontSize = ratio_8;

	elems.resultLogtimeRemaining.style.fontSize = ratio_14;
	elems.resultLogtimeEstimation.style.fontSize = ratio_14;
	elems.resultLogtimeNumberDay.style.fontSize = ratio_14;
	
	if (data.session.logAtSchool)
		elems.resultLogtimeEach.style.fontSize = ratio_8;
	else
		elems.resultLogtimeEach.style.fontSize = ratio_14;

	//////////////////////////////////////////////// BOOST CONTAINER
	elems.middleLine3.style.marginTop = ratio_6;

	elems.titleBoost.style.fontSize = ratio_9;
	elems.titleBoost.style.lineHeight = ratio_10;
	elems.titleBoost.style.width = ratio_48;
	elems.titleBoost.style.margin = "0 " + ratio_8 + " 0 0";
	
	elems.blockBoostLeft.style.marginRight = ratio_6;
	// elems.blockBoostLeft.style.margingLeft = ratio_4;
	// elems.blockBoostLeft.style.paddingRight = ratio_4;
	// elems.blockBoostRight.style.paddingLeft = ratio_4;

	// elems.buttonBoostMin.style.marginTop = ratio_3;
	elems.buttonBoostMin.style.borderRadius = ratio_20;
	// elems.buttonBoostMax.style.marginTop = ratio_3;
	elems.buttonBoostMax.style.borderRadius = ratio_20;

	elems.buttonBoostMin.style.borderWidth = ratio_2;
	elems.buttonBoostMin.style.fontSize = ratio_10;
	elems.buttonBoostMin.style.padding = ratio_4 + " " + paddingX;

	elems.buttonBoostMax.style.borderWidth = ratio_2;
	elems.buttonBoostMax.style.fontSize = ratio_10;
	elems.buttonBoostMax.style.padding = ratio_4 + " " + paddingX;
	
	//////////////////////////////////////////////// SALARY CONTAINER
	elems.salaryGraphContainer.style.minHeight = ratio_40;
	elems.salaryContainer.style.paddingTop = ratio_8;
	elems.lineThisSelection.style.marginTop = ratio_12;
	elems.lineThisSelection.style.marginBottom = ratio_16;
	elems.salaryCircleContainer.style.padding = ratio_12;

	// elems.salaryCircleContainer.style.padding = ratio_12;
	elems.blockLogtimeLeft.style.paddingRight = ratio_8;
	elems.blockLogtimeRight.style.paddingLeft = ratio_8;

	for (var i = 0; i < elems.monthGraphs.length; i++)
	{
		for (var j = 0; j < elems.monthGraphs[i].dayGraphs.length; j++)
		{
			elems.monthGraphs[i].dayGraphs[j].style.maxWidth = ratio_16;
		}
	}
	
	//////////////////////////////////////////////// MONTHLY CONTAINER
	elems.habitContainer.style.marginTop = ratio_8;
	elems.middleLine2.style.margin = ratio_7 + " 0 0 0";

	//////////////////////////////////////////////// LOGTIME CONTAINER
	elems.logtimeContainer.style.marginBottom = ratio_8;
	elems.logtimeContainer.style.padding = ratio_6;
	elems.logtimeContainer.style.borderRadius = ratio_4;

	elems.blockLogtime.style.marginTop = "8px";
	elems.blockLogtime.style.paddingBottom = "8px";

	elems.labelLogtimeRemaining.style.borderRadius = ratio_4;
	elems.extraLogtimeSideLeft.style.padding = "0 " + ratio_2;
	elems.extraLogtimeSideRight.style.padding = "0 " + ratio_2;
}

function savePosition() {

	var popupBox = elems.popupRemaining.getBoundingClientRect();
	var popupLeft = popupBox.left;
	var popupTop = popupBox.top;
	
	data.student.positionTop = popupTop + window.scrollY;
	data.student.percentPositionLeft = popupLeft / window.innerWidth;

	data.updateLocalStorage();
}

var resizeTimeout;
// window.onresize = function() {

// 	clearTimeout(resizeTimeout);
// 	resizeTimeout = setTimeout(savePosition, 400);
// }

window.addEventListener("resize", function() {
	clearTimeout(resizeTimeout);
	resizeTimeout = setTimeout(savePosition, 400);
})

function setPopupPosition(elems) {

	var navbar = document.querySelector(".main-navbar");
	var navbarBox = navbar.getBoundingClientRect();
	var popupBox = elems.popupRemaining.getBoundingClientRect();
	var windowHeight = window.innerHeight;
	var windowWidth = window.innerWidth;

	var newTop = data.student.positionTop;
	var newLeft = data.student.percentPositionLeft * windowWidth;

	if (newTop < navbarBox.height + 5)
	{
		newTop = navbarBox.height + 5;
	}

	if (windowWidth >= 770)
	{
		if (newLeft < 85)
			newLeft = 85;
		else if (newLeft > windowWidth - 50 || newLeft + popupBox.width > windowWidth - 5)
		{	
			if (popupBox.width < windowWidth - 85)
			{
				newLeft = windowWidth - popupBox.width - 20;
			}
			else
				newLeft = 85;
		}
	}
	else
	{
		if (newLeft > windowWidth - 50 || newLeft + popupBox.width > windowWidth - 5)
		{
			if (popupBox.width < windowWidth - 85)
			{
				newLeft = windowWidth - popupBox.width - 20;
			}
			else
				newLeft = 85;
		}
	}
	elems.popupRemaining.style.top = newTop + "px";
	elems.popupRemaining.style.left = newLeft + "px";
}

const browser = window.browser || window.chrome;
popup.createElems = function(elems) {

	elems.popupRemaining = document.createElement("div");
	elems.popupRemaining.className = "popup-remaining";
	

	elems.popupTopDiv = document.createElement("div");
	elems.popupTopDiv.className = "popup-top-div";
	elems.popupTopDiv.addEventListener("dblclick", function(e) {
		hideShowPopup(elems, e);	
	});
	
	elems.popupTopLeftText = document.createElement("p");
	elems.popupTopLeftText.className = "popup-top-left-text";

	elems.popupTopRightText = document.createElement("p");

	elems.topDivRight = document.createElement("div");
	elems.topDivRight.className = "top-div-right";

	elems.topDivSettingBlock = document.createElement("div");
	elems.topDivSettingBlock.className = "top-div-setting-block";

	elems.topDivSettingPanel = document.createElement("div");
	elems.topDivSettingPanel.className = "top-div-setting-panel";
	// elems.topDivSettingPanelTitle = document.createElement("div");
	// elems.topDivSettingPanelTitle.className = "setting-panel-main-title";
	// elems.topDivSettingPanelTitle.innerText = "Settings";
	
	// elems.panelDarkLine = document.createElement("div");
	// elems.panelDarkLine.className = "panel-line";
	// elems.panelDarkTitle = document.createElement("div");
	// elems.panelDarkTitle.className = "setting-panel-title";
	// // elems.panelDarkTitle.innerText = "Dark Mode";
	// elems.panelDarkButton = document.createElement("div");
	// elems.panelDarkButton.className = "checkbox-setting";
	// elems.panelDarkLine.appendChild(elems.panelDarkTitle);
	// elems.panelDarkLine.appendChild(elems.panelDarkButton);

	// elems.panelDeviseLine = document.createElement("div");
	// elems.panelDeviseLine.className = "panel-line";
	// elems.panelDeviseTitle = document.createElement("div");
	// elems.panelDeviseTitle.className = "setting-panel-title";
	// // elems.panelDeviseTitle.innerText = "Devise";
	// elems.panelDeviseButton = document.createElement("div");
	// elems.panelDeviseButton.className = "checkbox-setting";
	// elems.panelDeviseLine.appendChild(elems.panelDeviseTitle);
	// elems.panelDeviseLine.appendChild(elems.panelDeviseButton);

	elems.panelLanguageLine = document.createElement("div");
	elems.panelLanguageLine.className = "panel-line";
	elems.panelLanguageTitle = document.createElement("div");
	elems.panelLanguageTitle.className = "setting-panel-title";
	// elems.panelLanguageTitle.innerText = "Language";

	function mouseoverLanguage(e) {
		
		if ((data.student.language === 1 && e.target.id === "0") || (data.student.language === 0 && e.target.id === "1"))
		{
			e.target.style.backgroundColor = "rgb(30, 33, 43)";
			e.target.style.color = "rgba(236, 238, 244, 0.9)";
		}
	}

	function mouseoutLanguage(e) {
		
		if ((data.student.language === 1 && e.target.id === "0") || (data.student.language === 0 && e.target.id === "1"))
		{
			e.target.style.backgroundColor = "rgba(37, 41, 50, 0.9)";
			e.target.style.color = "rgb(155, 155, 155)";
		}
	}

	elems.panelLanguageRight = document.createElement("div");
	elems.panelLanguageRight.className = "setting-block-button";
	elems.panelLanguageButtonEnglish = document.createElement("div");
	elems.panelLanguageButtonEnglish.className = "setting-button-option";
	elems.panelLanguageButtonEnglish.innerText = "ENG";
	elems.panelLanguageButtonEnglish.id = "0";
	elems.panelLanguageButtonEnglish.addEventListener("mouseover", mouseoverLanguage);
	elems.panelLanguageButtonEnglish.addEventListener("mouseout", mouseoutLanguage);
	
	elems.panelLanguageButtonFrench = document.createElement("div");
	elems.panelLanguageButtonFrench.className = "setting-button-option";
	elems.panelLanguageButtonFrench.innerText = "FR";
	elems.panelLanguageButtonFrench.id = "1";
	elems.panelLanguageButtonFrench.addEventListener("mouseover", mouseoverLanguage);
	elems.panelLanguageButtonFrench.addEventListener("mouseout", mouseoutLanguage);

	function changeLanguage(e) {

		var tmpId = parseInt(e.target.id)

		if (tmpId != data.student.language)
		{
			elems.panelLanguageButtonEnglish.style.color = "rgb(155, 155, 155)";
			elems.panelLanguageButtonEnglish.style.backgroundColor = "rgba(37, 41, 50, 0.9)";
			elems.panelLanguageButtonFrench.style.color = "rgb(155, 155, 155)";
			elems.panelLanguageButtonFrench.style.backgroundColor = "rgba(37, 41, 50, 0.9)";

			e.target.style.color = "#191919";
			e.target.style.backgroundColor = "white";
			data.student.language = tmpId;
			if (data.isHomePage === -1)
			{
				data.updateLocalStorage();
				initText(elems, arrayLanguages[data.student.language]);
			}
		}
	}

	elems.panelLanguageButtonEnglish.addEventListener("click", changeLanguage);
	elems.panelLanguageButtonFrench.addEventListener("click", changeLanguage);

	if (data.student.language === ENGLISH)
	{
		elems.panelLanguageButtonEnglish.style.color = "#191919";
		elems.panelLanguageButtonEnglish.style.backgroundColor = "white";
	}
	else
	{
		elems.panelLanguageButtonFrench.style.color = "#191919";
		elems.panelLanguageButtonFrench.style.backgroundColor = "white";
	}
	elems.panelLanguageRight.appendChild(elems.panelLanguageButtonEnglish);
	elems.panelLanguageRight.appendChild(elems.panelLanguageButtonFrench);

	elems.panelLanguageLine.appendChild(elems.panelLanguageTitle);
	elems.panelLanguageLine.appendChild(elems.panelLanguageRight);

	// elems.panelSaveLine = document.createElement("div");
	// elems.panelSaveLine.className = "panel-save-line";
	// elems.panelSaveTitle = document.createElement("div");
	// elems.panelSaveTitle.className = "setting-panel-title";

	// elems.panelSaveButton = document.createElement("div");
	// elems.panelSaveButton.className = "panel-save-button";
	// elems.panelSaveLine.appendChild(elems.panelSaveTitle);
	// elems.panelSaveLine.appendChild(elems.panelSaveButton);
	

	elems.panelSizeFontLine = document.createElement("div");
	elems.panelSizeFontLine.className = "panel-size-font-line";
	elems.panelSizeFontTitle = document.createElement("div");
	elems.panelSizeFontTitle.className = "setting-panel-title";
	elems.panelSizeFontBlock = document.createElement("div");
	elems.panelSizeFontBlock.className = "panel-size-font-block";

	elems.panelSizeFontValue = document.createElement("div");
	elems.panelSizeFontValue.className = "panel-size-font-value";

	////////////////////////////////////////////////////// SIZE BUTTONS
	elems.panelSizeFontMin = document.createElement("div");
	elems.panelSizeFontMin.className = "panel-size-font-button";
	elems.panelSizeFontMin.innerText = "-";
	elems.panelSizeFontMax = document.createElement("div");
	elems.panelSizeFontMax.className = "panel-size-font-button";
	elems.panelSizeFontMax.innerText = "+";


	function setFontSize(toAdd, e) {

		var update = false;
		const oldTargetBox = e.target.getBoundingClientRect();
		var oldLeft = oldTargetBox.left;
		var oldTop = oldTargetBox.top;

		if (toAdd > 0 && (data.student.sizePanel + toAdd).toFixed(1) <= 2.0)
		{
			data.student.sizePanel += 0.1;
			update = true;
		}
		else if (toAdd < 0 && (data.student.sizePanel + toAdd).toFixed(1) >= 0.7)
		{
			data.student.sizePanel -= 0.1;
			update = true;
		}
		if (update)
		{
			data.updateLocalStorage();
			if (data.student.sizePanel === 1)
				elems.panelSizeFontValue.innerText = "1.0";
			else
				elems.panelSizeFontValue.innerText = data.student.sizePanel.toFixed(1);
			
			var popupBox = elems.popupRemaining.getBoundingClientRect();

			updatePanelSize(elems);

			const newTargetBox = e.target.getBoundingClientRect();
			var newLeft = newTargetBox.left;
			var newTop = newTargetBox.top;
			var offsetTargetLeft = oldLeft - newLeft;
			var offsetTargetTop = oldTop - newTop;

			elems.popupRemaining.style.top = (popupBox.top + offsetTargetTop + window.scrollY) + "px";
			elems.popupRemaining.style.left = (popupBox.left + offsetTargetLeft) + "px";
		}
	}


	elems.panelSizeFontMin.addEventListener("click", function(e) {
		setFontSize(-0.1, e);
	});

	elems.panelSizeFontMax.addEventListener("click", function(e) {
		setFontSize(0.1, e);
	});

	elems.panelSizeFontBlock.appendChild(elems.panelSizeFontValue);
	elems.panelSizeFontBlock.appendChild(elems.panelSizeFontMin);
	elems.panelSizeFontBlock.appendChild(elems.panelSizeFontMax);

	elems.panelSizeFontLine.appendChild(elems.panelSizeFontTitle);
	elems.panelSizeFontLine.appendChild(elems.panelSizeFontBlock);


	elems.panelResetLine = document.createElement("div");
	elems.panelResetLine.className = "panel-reset-line";
	elems.panelResetButton = document.createElement("div");
	elems.panelResetButton.className = "panel-reset-button";
	elems.panelResetButton.innerText = "RESET";
	elems.panelResetButton.addEventListener("click", function() {

		elems.resetTooltipPanel.style.display = "flex";
		if (!data.student.popupVisible)
		{
			elems.resetTooltipBlockConfirm.style.flexDirection = "row";
			elems.resetTooltipBlockConfirmTitle.style.borderBottom = "1px solid rgb(45, 49, 60, 0)";
			elems.resetTooltipBlockConfirmTitle.style.margin = "0 8px 0 0";
			elems.resetTooltipBlockConfirmTitle.style.padding = "0";
		}
		else
		{
			elems.resetTooltipBlockConfirm.style.flexDirection = "column";
			elems.resetTooltipBlockConfirmTitle.style.borderBottom = "1px solid rgb(45, 49, 60)";
			elems.resetTooltipBlockConfirmTitle.style.margin = "0 0 3px 0";
			elems.resetTooltipBlockConfirmTitle.style.padding = "0 0 6px 0";
		}
		setTimeout(function() {
			elems.resetTooltipPanel.style.opacity = "1";
			elems.topDivSettingPanel.style.opacity = "0";
			elems.topDivSettingPanel.style.display = "none";
		}, 10);
	});

	elems.resetTooltipPanel = document.createElement("div");
	elems.resetTooltipPanel.className = "reset-tooltip";

	function closeResetPanel() {
		
		elems.resetTooltipPanel.style.opacity = "0";
		setTimeout(function() {
			elems.resetTooltipPanel.style.display = "none";
		}, 400);
	}
	elems.resetTooltipPanel.addEventListener("click", closeResetPanel);
	elems.resetTooltipPanel.addEventListener("mouseleave", closeResetPanel);

	elems.resetTooltipBlockConfirm = document.createElement("div");
	elems.resetTooltipBlockConfirm.className = "reset-tooltip-block";
	elems.resetTooltipBlockConfirmTitle = document.createElement("div");
	elems.resetTooltipBlockConfirmTitle.className = "setting-panel-main-title";
	elems.resetTooltipBlockConfirmTitle.innerText = "Reset Logcash ?";
	elems.resetConfirmButton = document.createElement("div");
	elems.resetConfirmButton.className = "panel-reset-button";
	elems.resetConfirmButton.innerText = "YES";
	elems.resetConfirmButton.style.marginTop = "4px";
	elems.resetConfirmButton.style.marginRight = "8px";

	function resetAllDatas() {

		const login = document.querySelector(".login").innerText;

		data.student.pseudo = login;
		data.student.addBoostHalf = false;
		data.student.addBoostFull = false;
		elems.buttonBoostMin.style.borderColor = "rgb(45, 49, 60)";
		elems.buttonBoostMin.style.backgroundColor = "rgba(37, 41, 50, 0.9)";
		elems.buttonBoostMin.style.color = "rgb(155, 155, 155)";
		elems.buttonBoostMax.style.borderColor = "rgb(45, 49, 60)";
		elems.buttonBoostMax.style.backgroundColor = "rgba(37, 41, 50, 0.9)";
		elems.buttonBoostMax.style.color = "rgb(155, 155, 155)";

		data.student.language = ENGLISH;
		data.student.sizePanel = 1.0;
		elems.panelSizeFontValue.innerText = "1.0";
		initText(elems, arrayLanguages[data.student.language]);
		elems.panelLanguageButtonEnglish.style.color = "#191919";
		elems.panelLanguageButtonEnglish.style.backgroundColor = "white";
		elems.panelLanguageButtonFrench.style.color = "rgb(155, 155, 155)";
		elems.panelLanguageButtonFrench.style.backgroundColor = "rgba(37, 41, 50, 0.9)";

		for (var i = 0; i < data.student.months.length; i++)
		{
			data.student.months[i].hoursDeducted = 0;
			data.student.months[i].salary = 0;
		}

		for (var i = 0; i < data.student.monthlyHabit.length; i++)
		{
			data.student.monthlyHabit[i] = false;
		}
		for (var i = popup.numberDay; i < elems.monthArray[elems.monthArray.length - 1].checkboxes.length; i++)
		{
			elems.monthArray[elems.monthArray.length - 1].checkboxes[i].style.borderColor = "rgb(45, 49, 60)";
		}
		data.updateLocalStorage();
		updatePanelSize(elems);
		popup.setData(elems);
	}

	elems.resetConfirmButton.addEventListener("click", resetAllDatas);
	elems.resetCancelButton = document.createElement("div");
	elems.resetCancelButton.className = "panel-cancel-button";
	elems.resetCancelButton.innerText = "NO";
	elems.resetCancelButton.style.marginTop = "4px";
	elems.resetCancelButton.addEventListener("click", closeResetPanel);

	elems.resetConfirmButtonLine = document.createElement("div");
	elems.resetConfirmButtonLine.className = "reset-confirm-button-line";
	elems.resetConfirmButtonLine.appendChild(elems.resetConfirmButton);
	elems.resetConfirmButtonLine.appendChild(elems.resetCancelButton);

	elems.resetTooltipBlockConfirm.appendChild(elems.resetTooltipBlockConfirmTitle);
	elems.resetTooltipBlockConfirm.appendChild(elems.resetConfirmButtonLine);

	elems.resetTooltipPanel.appendChild(elems.resetTooltipBlockConfirm);
	elems.popupRemaining.appendChild(elems.resetTooltipPanel);

	elems.panelResetLine.appendChild(elems.panelResetButton);

	// elems.topDivSettingPanel.appendChild(elems.topDivSettingPanelTitle);
	// elems.topDivSettingPanel.appendChild(elems.panelDarkLine);
	// elems.topDivSettingPanel.appendChild(elems.panelDeviseLine);
	elems.topDivSettingPanel.appendChild(elems.panelLanguageLine);
	// elems.topDivSettingPanel.appendChild(elems.panelSaveLine);
	elems.topDivSettingPanel.appendChild(elems.panelSizeFontLine);
	elems.topDivSettingPanel.appendChild(elems.panelResetLine);

	elems.topDivSettingButton = document.createElement("div");
	elems.topDivSettingButton.className = "top-div-setting-button";
	elems.topDivSettingButton.addEventListener("click", function() {

		elems.topDivSettingPanel.style.opacity = "1";
		elems.topDivSettingPanel.style.display = "flex";
		
		elems.topDivSettingPanel.addEventListener("mouseleave", function() {
			
			elems.topDivSettingPanel.style.opacity = "0";
			elems.topDivSettingPanel.style.display = "none";
		});
		
	});
	elems.topDivSettingBlock.appendChild(elems.topDivSettingPanel);
	elems.topDivSettingBlock.appendChild(elems.topDivSettingButton);

	elems.topDivMinimizeButton = document.createElement("div");
	elems.topDivMinimizeButton.className = "top-div-minimize-button";
	elems.topDivMinimizeButton.style.display = "flex";
	elems.topDivMaximizeButton = document.createElement("div");
	elems.topDivMaximizeButton.className = "top-div-maximize-button";

	function updateMinimizeButton(e) {

		hideShowPopup(elems, e);

		if (!data.student.popupVisible)
		{
			elems.topDivMinimizeButton.style.display = "none";
			elems.topDivMaximizeButton.style.display = "flex";
		}
		else
		{
			elems.topDivMinimizeButton.style.display = "flex";
			elems.topDivMaximizeButton.style.display = "none";
		}
	}

	elems.topDivMinimizeButton.addEventListener("click", updateMinimizeButton);
	elems.topDivMaximizeButton.addEventListener("click", updateMinimizeButton);

	elems.topDivRight.appendChild(elems.topDivSettingBlock);
	elems.topDivRight.appendChild(elems.topDivMinimizeButton);
	elems.topDivRight.appendChild(elems.topDivMaximizeButton);


	elems.popupTopDiv.appendChild(elems.popupTopLeftText);
	elems.popupTopDiv.appendChild(elems.popupTopRightText);
	elems.popupTopDiv.appendChild(elems.topDivRight);
	elems.popupRemaining.appendChild(elems.popupTopDiv);

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
	elems.titleBoost.style.textAlign = "right";
	elems.questionBoost = document.createElement("div");
	elems.questionBoost.className = "question-logo";
	elems.questionBoost.id = "1";
	elems.questionBoost.addEventListener("mouseover", mouseOverQuestion);
	elems.questionBoost.addEventListener("mouseout", mouseOutQuestion);

	elems.lineLabelBoost.appendChild(elems.titleBoost);
	// elems.lineLabelBoost.appendChild(elems.questionBoost);

	elems.tooltipQuestion = document.createElement("div");
	elems.tooltipQuestion.className = "tooltip-question";
	elems.tooltipQuestionTopText = document.createElement("p");
	elems.tooltipQuestionTopText.className = "tooltip-question-top-text";
	elems.tooltipQuestionBottomText = document.createElement("p");
	elems.tooltipQuestionBottomText.className = "tooltip-question-bottom-text";

	elems.tooltipQuestion.appendChild(elems.tooltipQuestionBottomText);
	document.body.appendChild(elems.tooltipQuestion);

	elems.blockBoost = document.createElement("div");
	elems.blockBoost.className = "block-boost";
	elems.blockBoostLeft = document.createElement("div");
	elems.blockBoostLeft.className = "block-boost-left";
	elems.blockBoostRight = document.createElement("div");
	elems.blockBoostRight.className = "block-boost-right";

	function mouseoverBoost(e) {

		if ((!data.student.addBoostHalf && e.target.id === "boost-min") || (!data.student.addBoostFull && e.target.id === "boost-max"))
		{
			e.target.style.backgroundColor = "rgb(30, 33, 43)";
			e.target.style.color = "rgba(236, 238, 244, 0.9)";
		}
		else
		{
			e.target.style.backgroundColor = "#282b34";
			e.target.style.color = "rgba(236, 238, 244, 0.9)";
		}
	}

	function mouseoutBoost(e) {

		if ((!data.student.addBoostHalf && e.target.id === "boost-min") || (!data.student.addBoostFull && e.target.id === "boost-max"))
		{
			e.target.style.backgroundColor = "rgba(37, 41, 50, 0.9)";
			e.target.style.color = "rgb(155, 155, 155)";
		}
		else
		{
			e.target.style.backgroundColor = "#373c48";
			e.target.style.color = "white";
		}
	}

	elems.titleBoostMin = document.createElement("p");
	elems.titleBoostMin.className = "small-title-info";
	elems.titleBoostMin.innerText = "Min";
	elems.buttonBoostMin = document.createElement("div");
	elems.buttonBoostMin.className = "button-boost";
	elems.buttonBoostMin.id = "boost-min";
	elems.buttonBoostMin.innerText = "42min";
	elems.buttonBoostMin.addEventListener("mouseover", mouseoverBoost);
	elems.buttonBoostMin.addEventListener("mouseout", mouseoutBoost);
	
	elems.titleBoostMax = document.createElement("p");
	elems.titleBoostMax.className = "small-title-info";
	elems.titleBoostMax.innerText = "Max";
	elems.buttonBoostMax = document.createElement("div");
	elems.buttonBoostMax.className = "button-boost";
	elems.buttonBoostMax.id = "boost-max";
	elems.buttonBoostMax.innerText = "1h24";
	elems.buttonBoostMax.addEventListener("mouseover", mouseoverBoost);
	elems.buttonBoostMax.addEventListener("mouseout", mouseoutBoost);

	// elems.blockBoostLeft.appendChild(elems.titleBoostMin);
	elems.blockBoostLeft.appendChild(elems.buttonBoostMin);
	
	// elems.blockBoostRight.appendChild(elems.titleBoostMax);
	elems.blockBoostRight.appendChild(elems.buttonBoostMax);
	
	elems.blockBoost.appendChild(elems.blockBoostLeft);
	elems.blockBoost.appendChild(elems.blockBoostRight);

	elems.middleLine3.appendChild(elems.lineLabelBoost);
	elems.middleLine3.appendChild(elems.blockBoost);

	// elems.middleLine3.addEventListener("mouseenter", mouseoverInfoContainer);
	// elems.middleLine3.addEventListener("mouseleave", mouseoutInfoContainer);

	elems.buttonBoostMin.addEventListener("click", clickBoostMin);
	elems.buttonBoostMax.addEventListener("click", clickBoostMax);

	////////////////////////////////////////////////////////// SALARY CONTAINER
	elems.inputContainerSalary = document.createElement("div");
	elems.inputContainerSalary.className = "pop-input-container";

	elems.lineLabelSalary = document.createElement("div");
	elems.lineLabelSalary.className = "line-label";
	
	elems.labelSalary = document.createElement("p");
	elems.labelSalary.className = "small-title-info";

	elems.lineLabelSalary.appendChild(elems.labelSalary);

	elems.inputSalary = document.createElement("input");
	elems.inputSalary.className = "input-text";
	elems.inputSalary.type = "text";
	elems.inputSalary.setAttribute('required', '');

	////////////////////////////////////////////////////////// INPUT CONTAINER
	elems.inputContainerHours = document.createElement("div");
	elems.inputContainerHours.className = "pop-input-container";
	elems.inputContainerHours.addEventListener("mouseenter", mouseoverInfoContainer);
	elems.inputContainerHours.addEventListener("mouseleave", mouseoutInfoContainer);

	elems.lineLabelHours = document.createElement("div");
	elems.lineLabelHours.className = "line-label";

	elems.labelHours = document.createElement("p");
	elems.labelHours.className = "small-title-info";
	elems.labelHours.style.flex = "1";

	elems.questionHours = document.createElement("div");
	elems.questionHours.className = "question-logo";
	elems.questionHours.id = "0";
	elems.questionHours.addEventListener("mouseover", mouseOverQuestion);
	elems.questionHours.addEventListener("mouseout", mouseOutQuestion);

	elems.lineLabelHours.appendChild(elems.labelHours);
	elems.lineLabelHours.appendChild(elems.questionHours);

	elems.inputDeducted = document.createElement("input");
	elems.inputDeducted.className = "input-text";
	elems.inputDeducted.style.maxWidth = "45px";
	elems.inputDeducted.type = "text";
	elems.inputDeducted.setAttribute('required', '');

	///////////////////////////////////////////////////// MONTHLY CONTAINER
	elems.habitContainer = document.createElement("div");
	elems.habitContainer.className = "habit-container";
	elems.habitContainer.addEventListener("mouseenter", mouseoverInfoContainer);
	elems.habitContainer.addEventListener("mouseleave", mouseoutInfoContainer);

	elems.lineLabelHabit = document.createElement("div");
	elems.lineLabelHabit.className = "line-label";

	elems.weeklySpan = document.createElement("p");
	elems.weeklySpan.className = "main-title-info";
	elems.weeklySpan.style.cursor = "pointer";
	elems.weeklySpan.addEventListener("dblclick", function() {

		var update = false;

		for (var i = popup.numberDay - 1; i < elems.monthArray[popup.months.length - 1].checkboxes.length; i++)
		{
			if (data.student.monthlyHabit[i] === true)
			{
				update = true;
				data.student.monthlyHabit[i] = false;
				elems.monthArray[popup.months.indexArray].checkboxes[i].style.borderColor = "rgb(45, 49, 60)";
			}
		}
		if (data.isHomePage === -1 && update)
		{
			data.updateLocalStorage();
			popup.setData(elems);
		}
	});

	elems.questionHabit = document.createElement("div");
	elems.questionHabit.className = "question-logo";
	elems.questionHabit.id = "2";
	elems.questionHabit.addEventListener("mouseover", mouseOverQuestion);
	elems.questionHabit.addEventListener("mouseout", mouseOutQuestion);
	
	elems.monthContainer = document.createElement("div");
	elems.monthContainer.className = "month-container";
	
	elems.lineLabelHabit.appendChild(elems.weeklySpan);
	elems.lineLabelHabit.appendChild(elems.questionHabit);

	// elems.habitContainer.appendChild(elems.lineLabelHabit);
	// elems.habitContainer.appendChild(elems.monthContainer);

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

	for (var i = 0; i < 7; i++)
	{
		elems.monthDayBoxes[i] = document.createElement("div");
		elems.monthDayBoxes[i].className = "days-name-box";
		elems.monthDayBoxes[i].id = i;
		elems.monthDayBoxes[i].addEventListener("click", selectAllSameDay);
		elems.monthLineDayName.appendChild(elems.monthDayBoxes[i]);
	}
	elems.monthContainer.appendChild(elems.monthLineDayName);

	function mouseoverDayCircle(e) {
		e.target.style.backgroundColor = "#282b34";
		e.target.style.color = "rgba(236, 238, 244, 0.9)";
	}

	function mouseoutDayCircle(e) {
		e.target.style.backgroundColor = "#373c48";
		e.target.style.color = "rgb(198, 198, 198)";
	}

	elems.monthArray = [];
	elems.monthBlock = [];

	for (var k = 0; k < popup.months.length; k++)
	{
		var tmpMonth = {
			checkboxes: [],
			lines: [0, 0, 0, 0, 0, 0]
		};

		var indexMonth = 0;
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

				tmpDay.innerText = indexMonth;
				tmpDay.className = "checkbox-habit";
				tmpDay.addEventListener("mouseover", mouseoverDayCircle);
				tmpDay.addEventListener("mouseout", mouseoutDayCircle);
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

	// check if one month as six line of day circle, if so add an extra circle in every 
	// month calendar so the height is the same for each one
	var addCircle = false;
	for (var i = 0; i < elems.monthArray.length; i++)
	{
		if (elems.monthArray[i].lines[elems.monthArray[i].lines.length - 1].childNodes.length)
		{
			addCircle = true;
			break ;
		}
	}
	for (var i = 0; i < elems.monthArray.length; i++)
	{
		if (!elems.monthArray[i].lines[elems.monthArray[i].lines.length - 1].childNodes.length)
		{
			var tmpDay = document.createElement("div");
	
			tmpDay.innerText = "0";
			tmpDay.className = "checkbox-habit";
			tmpDay.style.fontSize = 8 * data.student.sizePanel + "px";
			tmpDay.style.width = 20 * data.student.sizePanel + "px";
			tmpDay.style.height = 20 * data.student.sizePanel + "px";
			tmpDay.style.opacity = "0";
			tmpDay.style.cursor = "default";

			elems.monthArray[i].lines[elems.monthArray[i].lines.length - 1].appendChild(tmpDay);
		}
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
	elems.questionLogtime.id = "3";
	elems.questionLogtime.addEventListener("mouseover", mouseOverQuestion);
	elems.questionLogtime.addEventListener("mouseout", mouseOutQuestion);
	
	elems.blockLogtime = document.createElement("div");
	elems.blockLogtime.className = "block-logtime";

	elems.blockLogtimeLeft = document.createElement("div");
	elems.blockLogtimeLeft.className = "block-logtime-side";
	elems.blockLogtimeLeft.style.borderRight = "1px solid rgb(45, 49, 60)";

	
	elems.labelLogtimeRemaining = document.createElement("p");
	elems.labelLogtimeRemaining.className = "small-title-info";
	elems.labelLogtimeRemaining.style.display = "none";
	

	elems.resultLogtimeEach = document.createElement("p");
	elems.resultLogtimeEach.style.display = "none";
	
	elems.resultLogtimeRemaining = document.createElement("p");
	elems.resultLogtimeRemaining.style.display = "none";

	elems.blockLogtimeLine = document.createElement("div");
	elems.blockLogtimeLine.className = "block-logtime-line";
	elems.blockLogtimeLine.appendChild(elems.resultLogtimeRemaining);
	elems.blockLogtimeLine.appendChild(elems.resultLogtimeEach);


	if (data.session.logAtSchool)
	{
		elems.labelLogtimeRemaining.style.display = "flex";
		elems.resultLogtimeRemaining.style.display = "flex";
		elems.resultLogtimeEach.style.display = "flex";

		elems.resultLogtimeEach.className = "number-result-smaller";
		elems.resultLogtimeRemaining.className = "number-result";
	}
	else
	{
		elems.resultLogtimeEach.style.display = "flex";
		elems.resultLogtimeEach.className = "number-result";
	}
	elems.labelLogtimeRemaining.style.display = "flex";

	
	elems.extraLogtimeLeft = document.createElement("div");
	elems.extraLogtimeLeft.className = "extra-logtime-left";
	elems.extraLogtimeSideLeft = document.createElement("div");
	elems.extraLogtimeSideLeft.className = "extra-logtime-side";
	elems.extraLogtimeSideLeft.style.textAlign = "right";
	
	elems.extraLogtimeSideRight = document.createElement("div");
	elems.extraLogtimeSideRight.className = "extra-logtime-side";
	elems.extraLogtimeSideRight.innerText = "0h00";
	elems.extraLogtimeSideRight.style.color = "rgb(140, 140, 140)";

	elems.extraLogtimeLeft.appendChild(elems.extraLogtimeSideLeft);
	elems.extraLogtimeLeft.appendChild(elems.extraLogtimeSideRight);

	elems.blockLogtimeLeft.appendChild(elems.labelLogtimeRemaining);
	elems.blockLogtimeLeft.appendChild(elems.blockLogtimeLine);
	elems.blockLogtimeLeft.appendChild(elems.extraLogtimeLeft);


	elems.blockLogtimeRight = document.createElement("div");
	elems.blockLogtimeRight.className = "block-logtime-side";

	elems.labelLogtimeEstimation = document.createElement("p");
	elems.labelLogtimeEstimation.className = "small-title-info";
	elems.resultLogtimeEstimation = document.createElement("p");
	elems.resultLogtimeEstimation.className = "number-result";
	elems.resultLogtimeEstimation.innerText = "00:00";
	elems.labelLogtimeEstimation.style.display = "none";
	elems.resultLogtimeEstimation.style.display = "none";

	elems.labelLogtimeNumberDay = document.createElement("p");
	elems.labelLogtimeNumberDay.className = "small-title-info";
	elems.resultLogtimeNumberDay = document.createElement("div");
	elems.resultLogtimeNumberDay.className = "number-result";
	elems.resultLogtimeNumberDay.innerText = "0";
	elems.labelLogtimeNumberDay.style.display = "none";
	elems.resultLogtimeNumberDay.style.display = "none";


	elems.blockLogtimeRight.appendChild(elems.labelLogtimeEstimation);
	elems.blockLogtimeRight.appendChild(elems.resultLogtimeEstimation);
	elems.blockLogtimeRight.appendChild(elems.labelLogtimeNumberDay);
	elems.blockLogtimeRight.appendChild(elems.resultLogtimeNumberDay);

	elems.lineLogtime.appendChild(elems.titleLogtime);
	elems.lineLogtime.appendChild(elems.questionLogtime);

	elems.blockLogtime.appendChild(elems.blockLogtimeLeft);
	elems.blockLogtime.appendChild(elems.blockLogtimeRight);

	elems.logtimeContainer.appendChild(elems.lineLogtime);
	elems.logtimeContainer.appendChild(elems.blockLogtime);
	elems.logtimeContainer.appendChild(elems.middleLine3);

	if (data.session.logAtSchool)
	{
		elems.labelLogtimeEstimation.style.display = "flex";
		elems.resultLogtimeEstimation.style.display = "flex";
		elems.labelLogtimeNumberDay.style.display = "none";
		elems.resultLogtimeNumberDay.style.display = "none";

		data.session.logtimeMode = REMAINING;
		elems.resultLogtimeRemaining.innerText = "0h00";
	}
	else
	{
		elems.labelLogtimeEstimation.style.display = "none";
		elems.resultLogtimeEstimation.style.display = "none";
		elems.labelLogtimeNumberDay.style.display = "flex";
		elems.resultLogtimeNumberDay.style.display = "flex";

		data.session.logtimeMode = EACH;	
	}

	if (data.student.addBoostHalf || data.student.addBoostFull)
	{
		elems.extraLogtimeLeft.style.opacity = "1";
	}
	else
	{
		elems.extraLogtimeLeft.style.opacity = "0";
	}
	

	//////////////////////////////////////////////////////////////////////  SALARY CONTAINER
	elems.salaryContainer = document.createElement("div");
	elems.salaryContainer.className = "salary-container";

	elems.mainTitleInfo = document.createElement("p");
	elems.mainTitleInfo.className = "main-title-info";

	elems.lineLabelEarn = document.createElement("div");
	elems.lineLabelEarn.className = "line-label";

	elems.lineLabelEarn.appendChild(elems.mainTitleInfo);

	elems.lineThisSelection = document.createElement("div");
	elems.lineThisSelection.className = "line-this-selection";

	elems.containerDivMonthFutur = document.createElement("div");
	// elems.containerDivMonth.style.display = "flex";
	// elems.containerDivMonth.style.justifyContent = "space-between";
	elems.containerDivMonthFutur.style.display = "none";

	elems.divMonthsFutur = [];
	for (var i = 0; i < popup.months.nbMonth; i++)
	{
		var tmpMonth = document.createElement("div");
		tmpMonth.className = "this-button";
		tmpMonth.innerText = popup.months[i].nameShort;
		if (i == popup.months.indexArray)
		{
			tmpMonth.style.display = "flex";
			tmpMonth.style.color = "#191919";
			tmpMonth.style.backgroundColor = "white";
		}
		elems.divMonthsFutur.push(tmpMonth);
		elems.containerDivMonthFutur.appendChild(tmpMonth);
	}

	elems.selectionArrowRight = document.createElement("div");
	elems.selectionArrowRight.className = "selection-arrow-right";
	elems.selectionArrowLeft = document.createElement("div");
	elems.selectionArrowLeft.className = "selection-arrow-left";

	elems.selectionArrowRight.addEventListener("click", function(e) {

		data.session.onCurrentMonth = false;
		elems.selectionArrowRight.style.opacity = "0";
		elems.selectionArrowRight.style.cursor = "default";
		elems.selectionArrowRight.style.pointerEvents = "none";

		elems.selectionArrowLeft.style.opacity = "1";
		elems.selectionArrowLeft.style.cursor = "pointer";
		elems.selectionArrowLeft.style.pointerEvents = "all";

		elems.containerDivMonth.style.display = "none";
		elems.containerDivMonthFutur.style.display = "flex";
	});

	elems.selectionArrowLeft.addEventListener("click", function(e) {

		data.session.onCurrentMonth = true;
		elems.selectionArrowLeft.style.opacity = "0";
		elems.selectionArrowLeft.style.cursor = "default";
		elems.selectionArrowLeft.style.pointerEvents = "none";

		elems.selectionArrowRight.style.opacity = "1";
		elems.selectionArrowRight.style.cursor = "pointer";
		elems.selectionArrowRight.style.pointerEvents = "all";

		elems.containerDivMonth.style.display = "flex";
		elems.containerDivMonthFutur.style.display = "none";
	});

	elems.lineThisSelection.addEventListener("mouseover", function(e) {

		if (data.session.onCurrentMonth)
		{
			elems.selectionArrowRight.style.opacity = "1";
			elems.selectionArrowRight.style.cursor = "pointer";
			elems.selectionArrowRight.style.pointerEvents = "all";
		}
		else
		{
			elems.selectionArrowLeft.style.opacity = "1";
			elems.selectionArrowLeft.style.cursor = "pointer";
			elems.selectionArrowLeft.style.pointerEvents = "all";
		}
	});

	elems.lineThisSelection.addEventListener("mouseout", function(e) {
		
		if (data.session.onCurrentMonth)
		{
			elems.selectionArrowRight.style.opacity = "0";
			elems.selectionArrowRight.style.cursor = "default";
			elems.selectionArrowRight.style.pointerEvents = "none";
		}
		else
		{
			elems.selectionArrowLeft.style.opacity = "0";
			elems.selectionArrowLeft.style.cursor = "default";
			elems.selectionArrowLeft.style.pointerEvents = "none";
		}
	});

	initDivMonths(elems, popup.months);
	elems.lineThisSelection.appendChild(elems.selectionArrowLeft);
	elems.lineThisSelection.appendChild(elems.containerDivMonth);
	elems.lineThisSelection.appendChild(elems.containerDivMonthFutur);
	elems.lineThisSelection.appendChild(elems.selectionArrowRight);

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
	elems.salaryEuroSign.innerText = "€";								// DEVISE
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
	// elems.salaryContainer.appendChild(elems.lineThisSelection);

	elems.habitContainer.appendChild(elems.lineLabelHabit);
	elems.habitContainer.appendChild(elems.lineThisSelection);
	elems.habitContainer.appendChild(elems.monthContainer);

	elems.salaryContainer.appendChild(elems.salaryCircleContainer);
	elems.popMiddleDivRight.appendChild(elems.logtimeContainer);
	// elems.popMiddleDivRight.appendChild(elems.middleLine3);
	elems.popMiddleDivRight.appendChild(elems.salaryContainer);
	
	
	///////////////////////////////////////////////////////////////////////// GRAPH SLIDE
	elems.salaryGraphContainer = document.createElement("div");
	elems.salaryGraphContainer.className = "salary-graph-container";
	elems.graphEmptyLine = document.createElement("div");
	elems.graphEmptyLine.className = "graph-empty-line";

	elems.salaryContainer.appendChild(elems.graphEmptyLine);
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

				if (data.student.months[popup.months.indexArray].salary !== "0" && data.student.months[popup.months.indexArray].salary !== 0)
					elems.tooltipBottomText.innerText = e.target.getAttribute("salary") + "€";
				else
					elems.tooltipBottomText.innerText = e.target.getAttribute("timeDOne");
	
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

	elems.popProgressTitle = document.createElement("p");
	elems.popProgressTitle.className = "main-title-info";

	elems.popProgressContainer.appendChild(elems.popProgressTitle);
	elems.popProgressContainer.appendChild(elems.containerLogcash);

	

	//////////////////////////////////////////////////////////////////////  BOTTOM DIV
	// elems.popBottomContainer = document.createElement("div");
	// elems.popBottomContainer.className = "pop-bottom-container";
	
	elems.popBottomDiv = document.createElement("div");
	elems.popBottomDiv.className = "pop-bottom-div";

	elems.resultsContainer = document.createElement("div");
	elems.resultsContainer.className = "results-container";

	elems.resultsDiv = document.createElement("div");
	elems.resultsDiv.className = "results-div";

	elems.mainTitleDays = document.createElement("p");
	elems.mainTitleDays.className = "main-title-info";
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

	/////////////// SET STYLE CHECKBOX BOOST WITH DATA.STUDENT
	if (data.student.addBoostHalf)
	{
		elems.buttonBoostMin.style.borderColor = "rgb(0, 186, 188)";
		elems.buttonBoostMin.style.backgroundColor = "#373c48";
		elems.buttonBoostMin.style.color = "white";
	}
	else if (data.student.addBoostFull)
	{
		elems.buttonBoostMax.style.borderColor = "rgb(0, 186, 188)";
		elems.buttonBoostMax.style.backgroundColor = "#373c48";
		elems.buttonBoostMax.style.color = "white";
	}
	elems.boostLockContainer.appendChild(elems.mainTitleBoost);

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

	
	elems.popMiddleDiv.appendChild(elems.popMiddleDivLeft);
	elems.popMiddleDiv.appendChild(elems.popMiddleDivRight);
	elems.popMiddleDivLeft.appendChild(elems.middleLine1);
	// elems.popMiddleDivLeft.appendChild(elems.middleLine3);
	elems.popMiddleDivLeft.appendChild(elems.middleLine2);
	elems.middleLine1.appendChild(elems.inputContainerSalary);
	elems.middleLine1.appendChild(elems.inputContainerHours);
	
	elems.inputContainerSalary.appendChild(elems.lineLabelSalary);
	elems.inputContainerSalary.appendChild(elems.inputSalary);
	
	elems.inputContainerHours.appendChild(elems.lineLabelHours);
	elems.inputContainerHours.appendChild(elems.inputDeducted);

	elems.middleLine2.appendChild(elems.habitContainer);

	elems.popupRemaining.appendChild(elems.popMiddleDiv);
	elems.popupRemaining.appendChild(elems.popProgressContainer);
	document.body.appendChild(elems.popupRemaining);

	initText(elems, arrayLanguages[data.student.language]);
	updatePanelSize(elems);

	if (!data.student.popupVisible)
		hidePopup(elems);
	else
		showPopup(elems);
	elems.panelSizeFontValue.innerText = data.student.sizePanel.toFixed(1);
	setPopupPosition(elems);
}

function disableTextSelection() {

	document.body.style.MozUserSelect = "none";
	document.body.style.WebkitUserSelect = "none";
	document.body.style.KhtmlUserSelect = "none";
	document.body.style.MsUserSelect = "none";
	document.body.style.UserSelect = "none";
}

popup.setStyle = function(elems) {

	elems.popupRemaining.style.opacity = "0";
	elems.popupRemaining.style.display = "flex";
	elems.popupRemaining.style.position = "absolute";
	elems.popupRemaining.style.borderRadius = "4px";
	elems.popupRemaining.style.zIndex = "1000";
	elems.popupRemaining.style.backgroundColor = "rgba(37, 41, 50, 0.9)";
	elems.popupRemaining.style.border = "1px solid #2d313c";
	elems.popupRemaining.style.boxShadow = "0px 10px 15px #12141a3a";
	elems.popupRemaining.style.backdropFilter = "blur(6px)";
	elems.popupRemaining.style.transition = "ease 0.2s opacity";

	elems.popupTopDiv.style.cursor = "move";
	elems.popupTopDiv.style.height = "fit-content";
	elems.popupTopDiv.style.borderRadius = "4px";
	elems.popupTopDiv.style.display = "flex";
	elems.popupTopDiv.style.justifyContent = "flex-start";
	elems.popupTopDiv.style.color = "#9b9b9b";
	elems.popupTopDiv.style.whiteSpace = "nowrap";
	elems.popupTopDiv.style.padding = "2px 2px";
	elems.popupTopDiv.style.borderBottom = "1px solid rgb(45, 49, 60)";

	elems.popupTopRightText.className = "popup-top-right-text";
	elems.popupTopRightText.style.margin = "2px 2px";
	elems.popupTopRightText.style.padding = "2px 4px";
	elems.popupTopRightText.style.width = "fit-content";
	elems.popupTopRightText.style.borderRadius = "2px";
	elems.popupTopRightText.style.textShadow = "rgb(0, 0, 0) 0px 0px 3px";
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
	var actualDay = data.session.date.getDay();
	var useAll = isCheckboxUse();
	var openDays = 0;
	var totalDays = 0;
	var indexHabit = actualDay;

	if (data.session.logAtSchool)
	{
		var i = numberDay - 1;

		if (useAll)
		{
			totalDays++; 
			if (actualDay >= 1 && actualDay <= 5)
			openDays++;
		}
	}
	else
		var i = numberDay;

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
	if (!useAll)
		return ({open: openDays, total: openDays});
	return ({open: openDays, total: totalDays});
}

function getTimeFormat(timeNumber, separator) {

	var timeHour = Math.trunc(timeNumber);
	var timeMin = (timeNumber - timeHour) * 60;
	var timeMinFloat = (timeMin - Math.trunc(timeMin));
	var tmpTime = "";

	if (timeMinFloat > 0.5 || timeMinFloat.toFixed(1) === "0.5")
		timeMin = Math.ceil(timeMin);
	else
		timeMin = Math.floor(timeMin);
	if (timeMin === 60)
	{
		timeHour += 1;
		timeMin = 0;
	}
	if (separator === ":" && timeHour < 10)
		tmpTime = "0";
	if (timeHour < 0 || timeMin < 0)
		tmpTime += "0" + separator + "00";
	else if (timeMin < 10)
		tmpTime += timeHour + separator + "0" + timeMin;
	else
		tmpTime += timeHour + separator + timeMin;
	return tmpTime;
}

function setSalaryValue(elems, integerSalary, floatSalary, percentSalary) {

	elems.salaryInteger.innerText = integerSalary;
	elems.salaryFloat.innerText = "." + floatSalary.toFixed(2).split('.')[1];
	elems.salaryPercent.innerText = percentSalary.toFixed(1) + '%';
	if (percentSalary < 0.1)
	{
		elems.salarySlide.style.borderTop = "1px solid rgba(0, 186, 188, 0.0)";
		elems.salarySlide.style.backgroundColor = "rgba(0, 186, 188, 0.00)";
	}
	else
	{
		elems.salarySlide.style.borderTop = "1px solid rgba(0, 186, 188, 0.70)";
		elems.salarySlide.style.backgroundColor = "rgba(0, 186, 188, 0.80)";
	}
	elems.salarySlide.style.height = percentSalary + "%";
}

function calculLogtimeValue(numberDays) {

	var actualHourDone = popup.months[popup.months.nbMonth - 1].days[popup.numberDay - 1].hourDone;
	var actualMinuteDone = popup.months[popup.months.nbMonth - 1].days[popup.numberDay - 1].minuteDone;
	var dayTimeDone = actualHourDone + actualMinuteDone * (1 / 60);

	var hourRem = popup.months[popup.months.nbMonth - 1].nbHourRem;
	var minRem = popup.months[popup.months.nbMonth - 1].nbMinRem;
	var totalTimeRem = hourRem + minRem * (1 / 60);

	data.session.eachDayLockOff = 0;
	data.session.eachDayLockMin = 0;
	data.session.eachDayLockMax = 0;

	var add = 0;
	if (data.student.addBoostHalf)
		add = 0.7;
	else if (data.student.addBoostFull)
		add = 1.4;

	if (totalTimeRem - (add * numberDays.total) > 0)
	{
		if (data.session.logAtSchool)
		{
			totalTimeRem += dayTimeDone;
		}

		if (totalTimeRem > 0 && numberDays.total > 0)
		{
			data.session.eachDayLockOff = totalTimeRem / numberDays.total;
			data.session.eachDayLockMin = totalTimeRem / numberDays.total;
			data.session.eachDayLockMax = totalTimeRem / numberDays.total;
			if (data.session.eachDayLockMin > 0.7)
				data.session.eachDayLockMin -= 0.7;
			if (data.session.eachDayLockMax > 1.4)
				data.session.eachDayLockMax -= 1.4;
		}
	}
	data.session.remTodayLockOff = data.session.eachDayLockOff - dayTimeDone;
	data.session.remTodayLockMin = data.session.eachDayLockMin - dayTimeDone;
	data.session.remTodayLockMax = data.session.eachDayLockMax - dayTimeDone;
}

function setLogtimeValue(remToday, eachDay, elems) {

	var hourRem = popup.months[popup.months.nbMonth - 1].nbHourRem;
	var minRem = popup.months[popup.months.nbMonth - 1].nbMinRem;
	var totalTimeRem = hourRem + minRem * (1 / 60);

	if (remToday.toFixed(2) <= 0)
	{
		elems.resultLogtimeRemaining.innerText = arrayLanguages[data.student.language].done;
		elems.resultLogtimeRemaining.style.color = "rgb(0, 186, 188)";
		elems.resultLogtimeEstimation.style.color = "rgb(0, 186, 188)";
		if (data.session.logAtSchool)
		{
			elems.miniLogtimeValueLock.style.color = "rgb(0, 186, 188)";
			elems.miniLogtimeValueRemaining.style.color = "rgb(0, 186, 188)";
			elems.miniLogtimeValueRemaining.innerText = arrayLanguages[data.student.language].done;
			eachDay += remToday / (data.session.numberDays.total - 1);
		}
	}
	else
	{
		var remaining = getTimeFormat(remToday, "h");

		elems.resultLogtimeRemaining.innerText = remaining;
		elems.resultLogtimeRemaining.style.color = "white";
		elems.resultLogtimeEstimation.style.color = "white";
		elems.miniLogtimeValueRemaining.style.color = "white";
		elems.miniLogtimeValueRemaining.innerText = remaining;
		elems.miniLogtimeValueLock.style.color = "white";
	}

	if (eachDay > 0)
	{
		if (data.session.logAtSchool)
		{
			elems.resultLogtimeEach.innerText = "/ " + getTimeFormat(eachDay, "h");
			elems.resultLogtimeEach.style.color = "rgb(180, 180, 180)";
		}
		else
		{
			elems.resultLogtimeEach.innerText = getTimeFormat(eachDay, "h");
			elems.resultLogtimeEach.style.color = "white";
			elems.miniLogtimeValueRemaining.innerText = getTimeFormat(eachDay, "h");
			elems.miniLogtimeValueRemaining.style.color = "white";
		}
	}
	else
	{
		if (data.session.logAtSchool)
			elems.resultLogtimeEach.innerText = "/ " + arrayLanguages[data.student.language].done;
		else
			elems.resultLogtimeEach.innerText = arrayLanguages[data.student.language].done;
		elems.miniLogtimeValueRemaining.innerText = arrayLanguages[data.student.language].done;
		elems.miniLogtimeValueRemaining.style.color = "rgb(0, 135, 136)";
		elems.resultLogtimeEach.style.color = "rgb(0, 135, 136)";
	}

	if (data.session.logtimeMode === REMAINING)
	{
		if (data.session.remTodayLockOff <= 0)
		{
			elems.extraLogtimeSideRight.innerText = arrayLanguages[data.student.language].done;
			elems.extraLogtimeSideRight.style.color = "rgb(0 126 127)";
		}
		else
		{
			elems.extraLogtimeSideRight.innerText = getTimeFormat(data.session.remTodayLockOff, "h");
			elems.extraLogtimeSideRight.style.color = "rgb(140, 140, 140)";
		}
	}
	else if (data.session.logtimeMode === EACH)
	{
		if (data.session.logAtSchool)
			var eachBoostValue = (hourRem + minRem * (1 / 60)) / (data.session.numberDays.total - 1);
		else
			var eachBoostValue = totalTimeRem / data.session.numberDays.total;

		if (eachBoostValue <= 0)
		{
			elems.extraLogtimeSideRight.innerText = arrayLanguages[data.student.language].done;
			elems.extraLogtimeSideRight.style.color = "rgb(0, 126, 127)";
		}
		else
		{
			elems.extraLogtimeSideRight.innerText = getTimeFormat(eachBoostValue, "h");
			elems.extraLogtimeSideRight.style.color = "rgb(140, 140, 140)";
		}
	}
	elems.resultLogtimeNumberDay.innerText = data.session.numberDays.total;
	elems.resultLogtime1.innerText = getTimeFormat(eachDay, "h");
}

function getLogoutTime(timeEnd) {

	if (timeEnd.toFixed(2) >= 24)
		return "IMPOSSIBLE";
	return getTimeFormat(timeEnd, ":");
}

function setLogtimeEstimation(elems) {
		
	actualTimeNumber = popup.numberHour + (popup.numberMinutes * (1 / 60));
	var timeLockOff = getLogoutTime(actualTimeNumber + data.session.remTodayLockOff);

	if (data.student.addBoostHalf)
	{
		data.session.timeLock = getLogoutTime(actualTimeNumber + data.session.remTodayLockMin);
	}
	else if (data.student.addBoostFull)
	{
		data.session.timeLock = getLogoutTime(actualTimeNumber + data.session.remTodayLockMax);
	}
	else
	{
		data.session.timeLock = timeLockOff;
	}
	
	if (data.session.timeLock === "IMPOSSIBLE")
		elems.resultLogtimeEstimation.style.fontSize = 12 * data.student.sizePanel + "px";
	else
		elems.resultLogtimeEstimation.style.fontSize = 16 * data.student.sizePanel + "px";

	elems.resultLogtimeEstimation.innerText = data.session.timeLock;

	if (data.session.logAtSchool)
		elems.miniLogtimeValueLock.innerText = data.session.timeLock;
	else
		elems.miniLogtimeValueLock.innerText = data.session.numberDays.total;
}

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

	data.session.numberDays = numberDays;
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

	setSalaryValue(elems, integerSalary, floatSalary, percentSalary);

	calculLogtimeValue(numberDays);

	if (data.student.addBoostHalf)
		setLogtimeValue(data.session.remTodayLockMin, data.session.eachDayLockMin, elems);
	else if (data.student.addBoostFull)
		setLogtimeValue(data.session.remTodayLockMax, data.session.eachDayLockMax, elems);
	else
		setLogtimeValue(data.session.remTodayLockOff, data.session.eachDayLockOff, elems);

	setLogtimeEstimation(elems);
}

function clickMonthlyHabit(e) {
	
	const index = parseInt(e.target.id) - 1;

	if (data.student.monthlyHabit[index])
	{
		data.student.monthlyHabit[index] = false;
		e.target.style.borderColor = "rgb(45, 49, 60)";
		e.target.style.backgroundColor = "#373c48";
	}
	else
	{
		data.student.monthlyHabit[index] = true;
		e.target.style.borderColor = "rgb(0, 186, 188)";
		e.target.style.backgroundColor = "#373c48";
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

	// popup.date = new Date("2024-01-20");
	// popup.date = new Date("2023-12-28");
	// popup.date = new Date("2024-01-03T00:10");

	popup.numberYear = data.session.date.getFullYear();
	popup.numberMonth = data.session.date.getMonth();
	popup.numberDay = data.session.date.getDate();

	popup.numberHour = data.session.date.getHours();
	popup.numberMinutes = data.session.date.getMinutes();

	var mouseDown = false,
		popupOffset = [0, 0];

	popup.createElems(elems);
	popup.setStyle(elems);
	popup.setData(elems);
	disableTextSelection();

	function doMouseDown(e) {

		var arrayElems = ["popup-top-left-text", "popup-top-right-text", "top-div-setting-block", "popup-top-div", "top-div-right"];
	
		for (var i = 0; i < arrayElems.length; i++)
		{
			if (e.target.className === arrayElems[i])
				return true;
		}
		return false;
	}

	elems.popupTopDiv.addEventListener("mousedown", function(e) {

		if (doMouseDown(e))
		{
			mouseDown = true;
			popupOffset = [elems.popupRemaining.offsetLeft - e.clientX, elems.popupRemaining.offsetTop - e.clientY];
		}
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
		clearTimeout(resizeTimeout);
		resizeTimeout = setTimeout(savePosition, 400);
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
			var numberMonthHours = popup.months[popup.months.indexArray].openDaysTotal * 7;

			if (parseInt(e.target.value) > numberMonthHours)
				data.student.months[popup.months.indexArray].hoursDeducted = numberMonthHours;
			else
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

	setTimeout(function() {
		elems.popupRemaining.style.opacity = "1";
	}, 200);
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
