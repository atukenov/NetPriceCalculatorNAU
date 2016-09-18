
function NacAid () {}

NacAid.getNacAid = function (pell) {
	
//	alert('in getNacAid');
	
	var scholarshipName = 'none';
	if (this.isPresidentialQualifier())
		scholarshipName = 'presidential';
	else if (this.isTrusteeQualifier())
		scholarshipName = 'trustee';
	else if (this.isDeanQualifier())
		scholarshipName = 'dean';
	else if (this.isStallionQualifier())
		scholarshipName = 'stallion'
	else if (this.isTexanQualifier())
		scholarshipName = 'texan';
		
//	alert(scholarshipName);
		
	return this.scholarshipAmounts[scholarshipName]
			+ this.getHousingGrant(scholarshipName, pell);
}

NacAid.scholarshipAmounts = {
	presidential: 7000,
	trustee: 6000,
	dean: 5000,
	stallion: 4000,
	texan: 2000,
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
NacAid.isPresidentialQualifier = function () {
	if (FormInfo.getInt('satScore') >= 1500)
		return true;
	if (FormInfo.getInt('actScore') >= 34)
		return true;
		
	var US = FormInfo.getSelectOption('nationality')=='US';
}

/*
 * returns true if the student qualifies for the President's Scholarship; otherwise, returns false.
 */
NacAid.isTrusteeQualifier = function () {
	
	
	
	if (FormInfo.getInt('satScore') >= 1300)
		return true;
	if (FormInfo.getInt('actScore') >= 29)
		return true;
		
	var US = FormInfo.getSelectOption('nationality')=='US';
	if (US) {
		if (FormInfo.getSelectOption('internationalContest') == 'other')
			return true;
		if (FormInfo.getInt('highSchoolClassTopPercent') <= 2)
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

NacAid.isDeanQualifier = function () {
	
	
	
	if (FormInfo.getInt('satScore') >= 1100)
		return true;
	if (FormInfo.getInt('actScore') >= 24)
		return true;
		
	var US = FormInfo.getSelectOption('nationality')=='US';
	if (US) {
		if (FormInfo.getSelectOption('internationalContest') == 'other')
			return true;
		if (FormInfo.getInt('highSchoolClassTopPercent') <= 5)
			return true;
	}
	else {
		if (FormInfo.isChecked('checkNationalContest'))
			return true;
		if (FormInfo.getInt('nationalExamTopPercent') <= 5)
			return true;
	}
	
	return false;
}

NacAid.isStallionQualifier = function () {
	
	
	
	if (FormInfo.getInt('satScore') >= 1000)
		return true;
	if (FormInfo.getInt('actScore') >= 21)
		return true;
		
	var US = FormInfo.getSelectOption('nationality')=='US';
	if (US) {
		if (FormInfo.getSelectOption('internationalContest') == 'other')
			return true;
		if (FormInfo.getInt('highSchoolClassTopPercent') <= 10)
			return true;
	}
	else {
		if (FormInfo.isChecked('checkNationalContest'))
			return true;
		if (FormInfo.getInt('nationalExamTopPercent') <= 10)
			return true;
	}
	
	return false;
}

NacAid.isTexanQualifier = function () {
	
	
	
	if (FormInfo.getInt('satScore') >= 900)
		return true;
	if (FormInfo.getInt('actScore') >= 18)
		return true;
		
	var US = FormInfo.getSelectOption('nationality')=='US';
	if (US) {
		if (FormInfo.getSelectOption('internationalContest') == 'other')
			return true;
		if (FormInfo.getInt('highSchoolClassTopPercent') <= 25)
			return true;
	}
	else {
		if (FormInfo.isChecked('checkNationalContest'))
			return true;
		if (FormInfo.getInt('nationalExamTopPercent') <= 25)
			return true;
	}
	
	return false;
}

