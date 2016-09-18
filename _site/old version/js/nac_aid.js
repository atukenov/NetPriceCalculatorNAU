
function NacAid () {}

NacAid.getNacAid = function (pell) {
	
//	alert('in getNacAid');
	
	var scholarshipName = 'none';
	if (this.isFoundationQualifier())
		scholarshipName = 'foundation';
	else if (this.isPresidentQualifier())
		scholarshipName = 'president';
	else if (this.isNacQualifier())
		scholarshipName = 'nac';
		
//	alert(scholarshipName);
		
	return this.scholarshipAmounts[scholarshipName]
			+ this.getHousingGrant(scholarshipName, pell);
}

NacAid.scholarshipAmounts = {
	foundation: 10950,
	internationalMerit: 10950,
	president: 7000,
	nac: 4000,
	none: 0
}

/*
 * returns the amount of the Housing Residents' Financial Aid Matching Grant
 * parameters:
 * scholarshipName = the name of the merit scholarship qualified for
 * pell = the amount of the Pell grant
 */
NacAid.getHousingGrant = function (scholarshipName, pell) {
	if (FormInfo.getSelectOption('housing') != 'oncampus')
		return 0;
	
	if (scholarshipName == 'nac')
		return Math.min(5050, 0.91 * pell);
	if (scholarshipName == 'president')
		return Math.min(2050, 0.369 * pell);
	return 0;
}

/*
 * returns true if the student qualifies for the Foundation Scholarship; otherwise, returns false.
 */
NacAid.isFoundationQualifier = function () {
	if (FormInfo.getInt('satScore') >= 1300)
		return true;
	if (FormInfo.getInt('actScore') >= 29)
		return true;
		
	var US = FormInfo.getSelectOption('nationality')=='US';
	if (US) {
		if (FormInfo.getSelectOption('internationalContest') == 'olympiad')
			return true;
		if (FormInfo.getInt('highSchoolClassTopPercent') <= 5)
			return true;
	}
	else {
		if (FormInfo.getSelectOption('internationalContest') != 'no')
			return true;
		if (FormInfo.getInt('nationalExamTopPercent') <= 1)
			return true;
	}
	
	return false;
}

/*
 * returns true if the student qualifies for the President's Scholarship; otherwise, returns false.
 */
NacAid.isPresidentQualifier = function () {
	
	
	
	if (FormInfo.getInt('satScore') >= 1200)
		return true;
	if (FormInfo.getInt('actScore') >= 26)
		return true;
		
	var US = FormInfo.getSelectOption('nationality')=='US';
	if (US) {
		if (FormInfo.getSelectOption('internationalContest') == 'other')
			return true;
		if (FormInfo.getInt('highSchoolClassTopPercent') <= 20)
			return true;
	}
	else {
		if (FormInfo.isChecked('checkNationalContest'))
			return true;
		if (FormInfo.getInt('nationalExamTopPercent') <= 2)
			return true;
	}
	
	return false;
}

/*
 * returns true if the student qualifies for the NAC Scholarship; otherwise, returns false.
 */
NacAid.isNacQualifier = function () {
	return true;
}
