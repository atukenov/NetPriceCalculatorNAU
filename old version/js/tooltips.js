
$(document).ready(function () {
	$('#i-parentAgi,#i-studentAgi,#i-parentAdditional,#i-studentAdditional').focus(function () {
		$(this).siblings('.tooltip').fadeIn().css('display','inline');
	});
	$('#i-parentAgi,#i-studentAgi,#i-parentAdditional,#i-studentAdditional').blur(function () {
		$(this).siblings('.tooltip').fadeOut();
	});
	
	$('#i-idkParentAgi').click(function () {
		var val1 = FormInfo.getInt('motherWorkIncome');
		var val2 = FormInfo.getInt('fatherWorkIncome');
		$('#i-parentAgi').val(Math.round(val1 + val2));
	});
	$('#i-idkStudentAgi').click(function () {
		var val1 = FormInfo.getInt('studentWorkIncome');
		var val2 = FormInfo.getInt('spouseWorkIncome');
		$('#i-studentAgi').val(Math.round(val1 + val2));
	});	
	$('#i-idkParentAdditional').click(function() {
		$('#i-parentAdditional').val(0);
	});
	$('#i-idkStudentAdditional').click(function() {
		$('#i-studentAdditional').val(0);
	});
});


