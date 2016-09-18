
/*
 * This script is based on the document "The EFC Formula, 2011-2012" and 
 * references page numbers in that document.
 */

function Efc() {}

// page 2
Efc.getEfc = function () {
	
//	alert("in big efc");
	
	if (FormInfo.isDependent()) {
		return this.getEfc_regularWorksheetA();
	}
	else if (FormInfo.isChecked('checkDependents')) {
		return this.getEfc_regularWorksheetC();
	}
	else {
		return this.getEfc_regularWorksheetB();
	}
}

// pages 9-10
Efc.getEfc_regularWorksheetA = function () {
	
//	alert('in efc function');
	
	var motherWorkIncome = FormInfo.getInt('motherWorkIncome');
	var fatherWorkIncome = FormInfo.getInt('fatherWorkIncome');
	
	var lines = new Array();
	
	lines[1] = FormInfo.getParentAgi();
		if (lines[1] < 0) lines[1] = 0;
	lines[2] = fatherWorkIncome + motherWorkIncome;
	lines[3] = lines[1];
	lines[4] = FormInfo.getInt('parentUntaxed');
	lines[5] = lines[3] + lines[4];
	lines[6] = FormInfo.getInt('parentAdditional');
	lines[7] = lines[5] - lines[6];
//	alert('line 7, parent total income: ' + lines[7]);
	
	lines[8] = FormInfo.getInt('parentIncomeTax');
		if (lines[8] < 0) lines[8] = 0;
	lines[9] = this.getTableA1(lines[7]);
	lines[10] = this.getTableA2(fatherWorkIncome);
	lines[11] = this.getTableA2(motherWorkIncome);
	lines[12] = this.getTableA3();
	
	// line 13
	var line13_workIncome = 0;
	if (FormInfo.getNParent() == 2)
		line13_workIncome = Math.min(fatherWorkIncome, motherWorkIncome);
	else if (FormInfo.getNParent() == 1) {
		if (FormInfo.hasMother())
			line13_workIncome = motherWorkIncome;
		else if (FormInfo.hasFather())
			line13_workIncome = fatherWorkIncome;
	}
	lines[13] = line13_workIncome * 0.35;
	if (lines[13] > 3500)
		lines[13] = 3500;
		
	lines[14] = lines[8] + lines[9] + lines[10] + lines[11] + lines[12] + lines[13];
	
	lines[15] = lines[7] - lines[14];
//	alert('line 15, parent available income: ' + lines[15]);
	
	lines[16] = FormInfo.getInt('parentRegularAssets');
	lines[17] = FormInfo.getInt('parentInvestments');
		if (lines[17] < 0) lines[17] = 0;
	lines[18] = FormInfo.getInt('parentBusinessesAndFarms');
		if (lines[18] < 0) lines[18] = 0;
	lines[19] = this.getTableA4(lines[18]);
	lines[20] = lines[16] + lines[17] + lines[19];
	lines[21] = this.getTableA5();
	lines[22] = lines[20] - lines[21];
	lines[23] = 0.12;
	lines[24] = lines[22] * lines[23];
		if (lines[24] < 0) lines[24] = 0;
//	alert('line 24, parent contribution from assets: ' + lines[24]);
	
	lines[25] = lines[15] + lines[24];
	lines[26] = this.getTableA6(lines[25]);
	lines[27] = FormInfo.getInt('nInCollege');
	lines[28] = lines[26] / lines[27];
		if (lines[28] < 0) lines[28] = 0;
//	alert('line 28, parent contribution: ' + lines[28]);
	
	lines[29] = FormInfo.getStudentAgi();
		if (lines[29] < 0) lines[29] = 0;
	lines[30] = FormInfo.getInt('studentWorkIncome');
	lines[31] = lines[29];
	lines[32] = FormInfo.getInt('studentUntaxed');
	lines[33] = lines[31] + lines[32];
	lines[34] = FormInfo.getInt('studentAdditional');
	lines[35] = lines[33] - lines[34];
//	alert('line 35, student total income: ' + lines[35]);
	
	lines[36] = FormInfo.getInt('studentIncomeTax');
	lines[37] = this.getTableA7(lines[35]);
	lines[38] = this.getTableA2(lines[30]);
	lines[39] = 5250;
	lines[40] = lines[25] < 0 ? -lines[25] : 0;
	lines[41] = lines[36] + lines[37] + lines[38] + lines[39] + lines[40];
	
	lines[42] = lines[35] - lines[41];
	lines[43] = 0.50;
	lines[44] = lines[42] * lines[43];
		if (lines[44] < 0) lines[44] = 0;
//	alert('line 44, student contribution from ai: ' + lines[44]);

	lines[45] = FormInfo.getInt('studentRegularAssets');
	lines[46] = FormInfo.getInt('studentInvestments');
		if (lines[46] < 0) lines[46] = 0;
	lines[47] = FormInfo.getInt('studentBusinessesAndFarms');
	lines[48] = lines[45] + lines[46] + lines[47];
	lines[49] = 0.20;
	lines[50] = lines[48] * lines[49];
	
	lines[51] = lines[28] + lines[44] + lines[50];
		if (lines[51] < 0) lines[51] = 0;
		
//	alert('line 51, efc: ' + lines[51]);
		
	return lines[51];

}

// page 17
Efc.getTableA1 = function (income) {
	var bracketCutoff = 15000;
	bracket1 = {
		AL: 3,
		AK: 2,
		AZ: 5,
		AR: 4,
		CA: 8,
		CO: 5,
		CT: 7,
		DE: 5,
		DC: 7,
		FL: 4,
		GA: 6,
		HI: 4,
		ID: 5,
		IL: 6,
		IN: 4,
		IA: 5,
		KS: 5,
		KY: 5,
		LA: 3,
		ME: 6,
		MD: 8,
		MA: 6,
		MI: 5,
		MN: 6,
		MS: 3,
		MO: 5,
		MT: 5,
		NE: 5,
		NV: 4,
		NH: 5,
		NJ: 10,
		NM: 3,
		NY: 9,
		NC: 6,
		ND: 3,
		OH: 6,
		OK: 4,
		OR: 8,
		PA: 5,
		RI: 7,
		SC: 5,
		SD: 2,
		TN: 2,
		TX: 3,
		UT: 5,
		VT: 6,
		VA: 6,
		WA: 4,
		WV: 3,
		WI: 7,
		WY: 2,
		other: 3
	};
	// bracket2 is always bracket1 minus 1
	
	var p1 = bracket1[FormInfo.getState()];
	var p2 = p1 - 1;
	p1 /= 100;
	p2 /= 100;
	
	if (income < bracketCutoff)
		return p1 * income;
	return p1 * bracketCutoff + p2 * (income - bracketCutoff);
}

// page 18
Efc.getTableA2 = function (workIncome) {
	if (workIncome <= 106800)
		return 0.0765 * workIncome;
	return 8170.2 + 0.0145 * (workIncome - 106800);
}
Efc.getTableA3 = function () {
	var arr = new Array();
	// a two dimensional array:
	// number in household, number of college students in household

	arr[2] = [0,16230,13450];
	arr[3] = [0,20210,17450,14670];
	arr[4] = [0,24970,22190,19430,16650];
	arr[5] = [0,29460,26680,23920,21140,18380];
	arr[6] = [0,34460,31680,28920,26140,23380];
	
	var a = FormInfo.getInt('nHouseholdMember');
	var b = FormInfo.getInt('nInCollege');
	var ans = 0;
	
	// the 'For each additional...' notes at the bottom
	if (a > 6) {
		ans += (a - 6) * 3890;
		a = 6;
	}
	if (b > 5) {
		ans -= (b - 5) * 2760;
		b = 5;
	}
	
	// the main number
	ans += arr[a][b];
	
	return ans;
}
Efc.getTableA4 = function (worth) {
	if (worth > 580000)
		return 302000 + worth - 580000;
	else if (worth > 345000)
		return 161000 + 0.6*(worth - 345000);
	else if (worth > 115000)
		return 46000 + 0.5*(worth - 115000);
	else if (worth > 0)
		return 0.4*worth;
	return 0;
}

// page 19
Efc.getTableA5 = function () {
	var age = FormInfo.getInt('olderParentAge');
	var nParent = FormInfo.getNParent();
	
	// taking care of '25 or less' and '65 or over'
	if (age < 25)
		age = 25;
	if (age > 65)
		age = 65;
	
	// arrays a and b are the values divided by 100
	var b = new Array();
		b[25] = 0;
		b[26] = 25;
		b[27] = 51;
		b[28] = 76;
		b[29] = 102;
		b[30] = 127;
		b[31] = 153;
		b[32] = 178;
		b[33] = 204;
		b[34] = 229;
		b[35] = 255;
		b[36] = 280;
		b[37] = 306;
		b[38] = 331;
		b[39] = 257;
		b[40] = 382;
		b[41] = 289;
		b[42] = 299;
		b[43] = 409;
		b[44] = 419;
		b[45] = 429;
		b[46] = 440;
		b[47] = 451;
		b[48] = 462;
		b[49] = 474;
		b[50] = 488;
		b[51] = 500;
		b[52] = 512;
		b[53] = 528;
		b[54] = 543;
		b[55] = 556;
		b[56] = 573;
		b[57] = 587;
		b[58] = 604;
		b[59] = 622;
		b[60] = 640;
		b[61] = 658;
		b[62] = 677;
		b[63] = 700;
		b[64] = 720;
		b[65] = 740;
	var a = new Array();
		a[25] = 0;
		a[26] = 9;
		a[27] = 18;
		a[28] = 27;
		a[29] = 35;
		a[30] = 44;
		a[31] = 53;
		a[32] = 62;
		a[33] = 71;
		a[34] = 80;
		a[35] = 89;
		a[36] = 98;
		a[37] = 106;
		a[38] = 115;
		a[39] = 124;
		a[40] = 133;
		a[41] = 136;
		a[42] = 139;
		a[43] = 142;
		a[44] = 145;
		a[45] = 149;
		a[46] = 152;
		a[47] = 155;
		a[48] = 159;
		a[49] = 163;
		a[50] = 167;
		a[51] = 171;
		a[52] = 175;
		a[53] = 180;
		a[54] = 184;
		a[55] = 188;
		a[56] = 193;
		a[57] = 198;
		a[58] = 203;
		a[59] = 208;
		a[60] = 214;
		a[61] = 220;
		a[62] = 226;
		a[63] = 232;
		a[64] = 238;
		a[65] = 245;
		
	if (nParent == 1)
		return a[age] * 100;
	else
		return b[age] * 100;
}
Efc.getTableA6 = function (aai) {
	if (aai < -3409)
		return -750;
	else if (aai <= 14500)
		return 0.22*aai;
	else if (aai <= 18200)
		return 3190 + 0.25*(aai - 14500);
	else if (aai <= 21900)
		return 4115 + 0.29*(aai - 18200);
	else if (aai <= 25600)
		return 5188 + 0.34*(aai - 21900);
	else if (aai <= 29300)
		return 6446 + 0.40*(aai - 25600);
	else
		return 7926 + 0.47*(aai - 29300);
	
}

// page 20
Efc.getTableA7 = function (income) {
	
//	alert('in table a7');
	
	percentages = {
		AL: 2,
		AK: 0,
		AZ: 3,
		AR: 3,
		CA: 5,
		CO: 3,
		CT: 4,
		DE: 3,
		DC: 6,
		FL: 1,
		GA: 4,
		HI: 4,
		ID: 4,
		IL: 2,
		IN: 3,
		IA: 3,
		KS: 3,
		KY: 4,
		LA: 2,
		ME: 4,
		MD: 6,
		MA: 4,
		MI: 3,
		MN: 4,
		MS: 3,
		MO: 3,
		MT: 3,
		NE: 3,
		NV: 1,
		NH: 1,
		NJ: 5,
		NM: 2,
		NY: 6,
		NC: 4,
		ND: 1,
		OH: 4,
		OK: 3,
		OR: 5,
		PA: 3,
		RI: 4,
		SC: 3,
		SD: 1,
		TN: 1,
		TX: 1,
		UT: 4,
		VT: 3,
		VA: 4,
		WA: 1,
		WV: 2,
		WI: 4,
		WY: 1,
		other: 2
	};
	
	
	var p = percentages[FormInfo.getState()] / 100;
	return p * income;
}

// page 21
Efc.getEfc_regularWorksheetB = function () {
		
//	alert('in efc function');
	
	var studentWorkIncome = FormInfo.getInt('studentWorkIncome');
	var spouseWorkIncome = 0;
		if (FormInfo.hasSpouse()) spouseWorkIncome = FormInfo.getInt('spouseWorkIncome');
	
	var lines = new Array();
	
	lines[1] = FormInfo.getStudentAgi();
		if (lines[1] < 0) lines[1] = 0;
	lines[2] = studentWorkIncome + spouseWorkIncome;
	lines[3] = lines[1];
	lines[4] = FormInfo.getInt('studentUntaxed');
	lines[5] = lines[3] + lines[4];
	lines[6] = FormInfo.getInt('studentAdditional');
	lines[7] = lines[5] - lines[6];
//	alert('line 7, student total income: ' + lines[7]);
	
	lines[8] = FormInfo.getInt('studentIncomeTax');
		if (lines[8] < 0) lines[8] = 0;
	lines[9] = this.getTableB1(lines[7]);
//	alert('line 9: ' + lines[9]);
	lines[10] = this.getTableB2(studentWorkIncome);
//	alert('line 10: ' + lines[10]);
	lines[11] = this.getTableB2(spouseWorkIncome);
//	alert('line 11: ' + lines[11]);
	
	// line 12
	if (FormInfo.hasSpouse() && !FormInfo.isChecked('spouseEnroll')) {
		lines[12] = 13710;
	}
	else {
		lines[12] = 8550;
	}
	
	// line 13
	if (FormInfo.hasSpouse()) {
		lines[13] = Math.min( 0.35 * Math.min(studentWorkIncome, spouseWorkIncome), 3500 );
	}
	else {
		lines[13] = 0
	}
	
	lines[14] = lines[8] + lines[9] + lines[10] + lines[11] + lines[12] + lines[13];
//	alert('line 14, total allowances: ' + lines[14]);
	
	lines[15] = lines[7] - lines[14];
	lines[16] = 0.50;
	lines[17] = lines[15] * lines[16];
//	alert('line 17, contribution from available income: ' + lines[17]);
	
	lines[18] = FormInfo.getInt('studentRegularAssets');
	lines[19] = FormInfo.getInt('studentInvestments');
		if (lines[19] < 0) lines[19] = 0;
	lines[20] = FormInfo.getInt('studentBusinessesAndFarms');
		if (lines[20] < 0) lines[20] = 0;
	lines[21] = this.getTableB3(lines[20]);
	lines[22] = lines[18] + lines[19] + lines[21];
	lines[23] = this.getTableB4();
	lines[24] = lines[22] - lines[23];
	lines[25] = 0.20;
	lines[26] = lines[24] * lines[25];
		if (lines[26] < 0) lines[26] = 0;
//	alert('line 26, contribution from assets: ' + lines[26]);
	
	lines[27] = lines[17] + lines[26];
	lines[28] = FormInfo.getInt('nInCollege');
	lines[29] = lines[27] / lines[28];
		if (lines[29] < 0) lines[29] = 0;
//	alert('line 29, efc: ' + lines[29]);
			
	return lines[29];
}

// page 25
Efc.getTableB1 = function (income) {
	return this.getTableA7(income);
}

// page 26
Efc.getTableB2 = function (workIncome) {
//	alert('in getTableB2 ' + workIncome);
	return this.getTableA2(workIncome);
}
Efc.getTableB3 = function (worth) {
	return this.getTableA4(worth);
}

// page 27
Efc.getTableB4 = function () {
	var birthdate = FormInfo.getBirthdate();
	var endOfYear = new Date(2011,12,31);
	var millisecondsInYear = 1000 * 60 * 60 * 24 * 365.25;
	var age = Math.floor((birthdate.getTime() - endOfYear.getTime()) / millisecondsInYear);
	var isMarried = FormInfo.getSelectOption('marital') == 'married';
	
	// taking care of '25 or less' and '65 or over'
	if (age < 25)
		age = 25;
	if (age > 65)
		age = 65;
	
	// arrays a and b are the values divided by 100
	var b = new Array();
		b[25] = 0;
		b[26] = 25;
		b[27] = 51;
		b[28] = 76;
		b[29] = 102;
		b[30] = 127;
		b[31] = 153;
		b[32] = 178;
		b[33] = 204;
		b[34] = 229;
		b[35] = 255;
		b[36] = 280;
		b[37] = 306;
		b[38] = 331;
		b[39] = 257;
		b[40] = 382;
		b[41] = 289;
		b[42] = 299;
		b[43] = 409;
		b[44] = 419;
		b[45] = 429;
		b[46] = 440;
		b[47] = 451;
		b[48] = 462;
		b[49] = 474;
		b[50] = 488;
		b[51] = 500;
		b[52] = 512;
		b[53] = 528;
		b[54] = 543;
		b[55] = 556;
		b[56] = 573;
		b[57] = 587;
		b[58] = 604;
		b[59] = 622;
		b[60] = 640;
		b[61] = 658;
		b[62] = 677;
		b[63] = 700;
		b[64] = 720;
		b[65] = 740;
	var a = new Array();
		a[25] = 0;
		a[26] = 9;
		a[27] = 18;
		a[28] = 27;
		a[29] = 35;
		a[30] = 44;
		a[31] = 53;
		a[32] = 62;
		a[33] = 71;
		a[34] = 80;
		a[35] = 89;
		a[36] = 98;
		a[37] = 106;
		a[38] = 115;
		a[39] = 124;
		a[40] = 133;
		a[41] = 136;
		a[42] = 139;
		a[43] = 142;
		a[44] = 145;
		a[45] = 149;
		a[46] = 152;
		a[47] = 155;
		a[48] = 159;
		a[49] = 163;
		a[50] = 167;
		a[51] = 171;
		a[52] = 175;
		a[53] = 180;
		a[54] = 184;
		a[55] = 188;
		a[56] = 193;
		a[57] = 198;
		a[58] = 203;
		a[59] = 208;
		a[60] = 214;
		a[61] = 220;
		a[62] = 226;
		a[63] = 232;
		a[64] = 238;
		a[65] = 245;
		
	if (isMarried)
		return a[age] * 100;
	else
		return b[age] * 100;
}

// page 31
Efc.getEfc_regularWorksheetC = function () {
		
//	alert('in efc function');
	
	var studentWorkIncome = FormInfo.getInt('studentWorkIncome');
	var spouseWorkIncome = 0;
		if (FormInfo.hasSpouse()) spouseWorkIncome = FormInfo.getInt('spouseWorkIncome');
	
	var lines = new Array();
	
	lines[1] = FormInfo.getStudentAgi();
		if (lines[1] < 0) lines[1] = 0;
	lines[2] = studentWorkIncome + spouseWorkIncome;
	lines[3] = lines[1];
	lines[4] = FormInfo.getInt('studentUntaxed');
	lines[5] = lines[3] + lines[4];
	lines[6] = FormInfo.getInt('studentAdditional');
	lines[7] = lines[5] - lines[6];
//	alert('line 7, student total income: ' + lines[7]);
	
	lines[8] = FormInfo.getInt('studentIncomeTax');
		if (lines[8] < 0) lines[8] = 0;
	lines[9] = this.getTableC1(lines[7]);
	lines[10] = this.getTableC2(studentWorkIncome);
	lines[11] = this.getTableC2(spouseWorkIncome);
	lines[12] = this.getTableC3();
	
	// line 13
	if (FormInfo.hasSpouse()) {
		lines[13] = Math.min( 0.35 * Math.min(studentWorkIncome, spouseWorkIncome), 3500 );
	}
	else {
		lines[13] = Math.min( 0.35 * studentWorkIncome , 3500 );
	}
	
	lines[14] = lines[8] + lines[9] + lines[10] + lines[11] + lines[12] + lines[13];
	
	lines[15] = lines[7] - lines[14];
//	alert('line 15, available income: ' + lines[17]);
	
	lines[16] = FormInfo.getInt('studentRegularAssets');
	lines[17] = FormInfo.getInt('studentInvestments');
		if (lines[17] < 0) lines[17] = 0;
	lines[18] = FormInfo.getInt('studentBusinessesAndFarms');
		if (lines[18] < 0) lines[18] = 0;
	lines[19] = this.getTableC4(lines[18]);
	lines[20] = lines[16] + lines[17] + lines[19];
	lines[21] = this.getTableC5();
	lines[22] = lines[20] - lines[21];
	lines[23] = 0.07;
	lines[24] = lines[22] * lines[23];
		if (lines[24] < 0) lines[24] = 0;
//	alert('line 24, contribution from assets: ' + lines[24]);
	
	lines[25] = lines[15] + lines[24];
	lines[26] = this.getTableC6(lines[25]);
	lines[27] = FormInfo.getInt('nInCollege');
	lines[28] = lines[26] / lines[27];
		if (lines[28] < 0) lines[28] = 0;
//	alert('line 28, efc: ' + lines[28]);
			
	return lines[28];
}

// page 33
Efc.getTableC1 = function (income) {
	return this.getTableA1(income);
}

// page 34
Efc.getTableC2 = function (workIncome) {
	return this.getTableA2(workIncome);
}

Efc.getTableC3 = function () {
	var arr = new Array();
	// a two dimensional array:
	// number in household, number of college students in household

	arr[2] = [0,21660,17960];
	arr[3] = [0,26960,23280,19580];
	arr[4] = [0,33300,29600,25920,22210];
	arr[5] = [0,39300,35590,31900,28200,24520];
	arr[6] = [0,45950,42250,38580,34860,31190];
	
	var a = FormInfo.getInt('nHouseholdMember');
	var b = FormInfo.getInt('nInCollege');
	var ans = 0;
	
	// the 'For each additional...' notes at the bottom
	if (a > 6) {
		ans += (a - 6) * 5180;
		a = 6;
	}
	if (b > 5) {
		ans -= (b - 5) * 3690;
		b = 5;
	}
	
	// the main number
	ans += arr[a][b];
	
	return ans;
}

Efc.getTableC4 = function (worth) {
	return this.getTableA4(worth);
}

Efc.getTableC5 = function () {
	return this.getTableB4();
}

Efc.getTableC6 = function (aai) {
	return Efc.getTableA6(aai);
}
