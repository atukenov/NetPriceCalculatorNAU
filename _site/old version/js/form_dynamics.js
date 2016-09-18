
function FormDynamics() {}
	
FormDynamics.showHideClasses = function (showClass, hideClass, flag) {
	if (flag) {
		$('.' + showClass).show();
		$('.' + hideClass).hide();	
	}
	else {
		$('.' + showClass).hide();
		$('.' + hideClass).show();
	}
}

FormDynamics.go = function () {
	var US = FormInfo.getSelectOption('nationality')=='US';
	FormDynamics.showHideClasses('US','international',US);
	if (US) {
		var dependent = FormInfo.isDependent();
		FormDynamics.showHideClasses('dependent','independent',dependent);
		if (!dependent) {
			var spouse = FormInfo.hasSpouse();
			FormDynamics.showHideClasses('spouse','nospouse',FormInfo.hasSpouse());
		}
		else {
			if (FormInfo.hasMother())
				$('.mother').show();
			else
				$('.mother').hide();
				
			if (FormInfo.hasFather())
				$('.father').show();
			else
				$('.father').hide();
		}
	}
}
	

$(document).ready(function() {
	
	FormDynamics.go();
	
	$('#i-marital').change(function () {
		FormDynamics.go();
	});
	
	$('#i-birthDay,#i-birthMonth,#i-birthYear,#i-marital,#i-checkChildren,#i-checkMilitary,#i-parents').change(function() {
		FormDynamics.go();
	});
	
	$('#i-nationality').change(function () {
		FormDynamics.go();
	});
	
	
});
