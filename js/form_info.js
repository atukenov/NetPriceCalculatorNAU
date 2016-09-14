
function FormInfo () {}

FormInfo.isDependent = function () {
	var birthCutoff = new Date(1988,0,1);
	if (this.getBirthdate().getTime() < birthCutoff.getTime())
		return false;
	
	var marital = FormInfo.getSelectOption('marital');
	if (marital == 'married' || marital == 'separated')
		return false;
		
	if (FormInfo.getSelectOption('parents') == 'none')
		return false;
	
	if (FormInfo.isChecked('checkChildren'))
		return false;
	
	if (FormInfo.isChecked('checkMilitary'))
		return false;
	
	return true;
}

FormInfo.getBirthdate = function () {
//	alert('in getBirthdate');
	var birthdate = new Date(0,0,0);
	try {
		birthdate.setFullYear(FormInfo.getInt('birthYear'));
		birthdate.setMonth(FormInfo.getSelectOption('birthMonth'));
		birthdate.setDate(FormInfo.getInt('birthDay'));
		return birthdate;
	} 
	catch (err) {
		return birthdate;
	}
}

FormInfo.hasSpouse = function () {
	if ($('#i-marital option:selected').val() == 'married') {
		return true;
	}
	return false;
}

FormInfo.getInt = function (id_suffix) {
	var specials = new Array("motherWorkIncome","fatherWorkIncome",
							"studentWorkIncome","spouseWorkIncome");
	if ($.inArray(id_suffix,specials) >= 0) {
//		alert('in getInt specials ' + id_suffix);
		var v = $('input[id="i-' + id_suffix + '"]').valid();
		if (!v)
			return 0;	
	}
	
	if (id_suffix == 'motherWorkIncome' && !this.hasMother()
		|| id_suffix == 'fatherWorkIncome' && !this.hasFather()
		|| id_suffix == 'spouseWorkIncome' && !this.hasSpouse()) {
			
		return 0;
	}
	
	return parseInt($('#i-'+id_suffix).val().split(',').join(''));
}

FormInfo.getSelectOption = function (id_suffix) {
	return $('#i-'+id_suffix+" option:selected").val();
}

FormInfo.isChecked = function (id_suffix) {
	return $('#i-'+id_suffix).is(':checked');
}

FormInfo.getState = function () {
	return $('#i-state option:selected').val();
}

FormInfo.getNParent = function () {
	var p = FormInfo.getSelectOption('parents');
	if (p == 'none')
		return 0;
	if (p == 'both')
		return 2;
	else
		return 1;
	return ans;
}

FormInfo.hasMother = function () {
	var p = FormInfo.getSelectOption('parents');
	return p == 'mother' || p == 'both';
}

FormInfo.hasFather = function () {
	var p = FormInfo.getSelectOption('parents');
	return p == 'father' || p == 'both';
}

FormInfo.getParentAgi = function () {
	return FormInfo.getInt('parentAgi');
}
FormInfo.getStudentAgi = function() {
	return FormInfo.getInt('studentAgi');
}
