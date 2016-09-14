/*
 * This script is based on the document "The EFC Formula, 2011-2012" and 
 * references page numbers in that document.
 */

function Efc() {}

// page 2
Efc.getEfc = function () {
        
//      alert("in big efc");
        
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
        
//      alert('in efc function');
        
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
//      alert('line 7, parent total income: ' + lines[7]);
        
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
        if (lines[13] > 3600)
                lines[13] = 3600;
                
        lines[14] = lines[8] + lines[9] + lines[10] + lines[11] + lines[12] + lines[13];                
        
        
        lines[15] = lines[7] - lines[14];
//      alert('line 15, parent available income: ' + lines[15]);
        
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
//      alert('line 24, parent contribution from assets: ' + lines[24]);
        
        lines[25] = lines[15] + lines[24];
        lines[26] = this.getTableA6(lines[25]);
        lines[27] = FormInfo.getInt('nInCollege');
        lines[28] = lines[26] / lines[27];
                if (lines[28] < 0) lines[28] = 0;
//      alert('line 28, parent contribution: ' + lines[28]);
        
        lines[29] = FormInfo.getStudentAgi();
                if (lines[29] < 0) lines[29] = 0;
        lines[30] = FormInfo.getInt('studentWorkIncome');
        lines[31] = lines[29];
        lines[32] = FormInfo.getInt('studentUntaxed');
        lines[33] = lines[31] + lines[32];
        lines[34] = FormInfo.getInt('studentAdditional');
        lines[35] = lines[33] - lines[34];
//      alert('line 35, student total income: ' + lines[35]);
        
        lines[36] = FormInfo.getInt('studentIncomeTax');
        lines[37] = this.getTableA7(lines[35]);
        lines[38] = this.getTableA2(lines[30]);
        lines[39] = 6000;
        lines[40] = lines[25] < 0 ? -lines[25] : 0;
        lines[41] = lines[36] + lines[37] + lines[38] + lines[39] + lines[40];
        
        lines[42] = lines[35] - lines[41];
        lines[43] = 0.50;
        lines[44] = lines[42] * lines[43];
                if (lines[44] < 0) lines[44] = 0;
//      alert('line 44, student contribution from ai: ' + lines[44]);

        lines[45] = FormInfo.getInt('studentRegularAssets');
        lines[46] = FormInfo.getInt('studentInvestments');
                if (lines[46] < 0) lines[46] = 0;
        lines[47] = FormInfo.getInt('studentBusinessesAndFarms');
        lines[48] = lines[45] + lines[46] + lines[47];
        lines[49] = 0.20;
        lines[50] = lines[48] * lines[49];
        
        lines[51] = lines[28] + lines[44] + lines[50];
                if (lines[51] < 0) lines[51] = 0;
                
//      alert('line 51, efc: ' + lines[51]);
                
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
                CA: 7,
                CO: 4,
                CT: 8,
                DE: 5,
                DC: 7,
                FL: 3,
                GA: 5,
                HI: 5,
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
                MI: 4,
                MN: 6,
                MS: 3,
                MO: 4,
                MT: 4,
                NE: 5,
                NV: 2,
                NH: 5,
                NJ: 9,
                NM: 3,
                NY: 9,
                NC: 5,
                ND: 2,
                OH: 5,
                OK: 3,
                OR: 7,
                PA: 2,
                RI: 7,
                SC: 4,
                SD: 2,
                TN: 2,
                TX: 3,
                UT: 5,
                VT: 6,
                VA: 6,
                WA: 3,
                WV: 3,
                WI: 7,
                WY: 1,
                other: 2
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
        if (workIncome <= 118500)
                return 0.0765 * workIncome;
        return 9065.25 + 0.0145 * (workIncome - 118500);
}
Efc.getTableA3 = function () {
        var arr = new Array();
        // a two dimensional array:
        // number in household, number of college students in household

        arr[2] = [0,17840,14790];
        arr[3] = [0,22220,19180,16130];
        arr[4] = [0,27440,24390,21350,18300];
        arr[5] = [0,32380,29320,26290,23240,20200];
        arr[6] = [0,37870,34820,31780,28730,25690];
        
        var a = FormInfo.getInt('nHouseholdMember');
        var b = FormInfo.getInt('nInCollege');
        var ans = 0;
        
        // the 'For each additional...' notes at the bottom
        if (a > 6) {
                ans += (a - 6) * 4270;
                a = 6;
        }
        if (b > 5) {
                ans -= (b - 5) * 3040;
                b = 5;
        }
        
        // the main number
        ans += arr[a][b];
        
        return ans;
}
Efc.getTableA4 = function (worth) {
        if (worth > 635000)
                return 330500 + worth - 635000;
        else if (worth > 380000)
                return 177500 + 0.6*(worth - 380000);
        else if (worth > 125000)
                return 50000 + 0.5*(worth - 125000);
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
                b[26] = 10;
                b[27] = 21;
                b[28] = 31;
                b[29] = 41;
                b[30] = 52;
                b[31] = 62;
                b[32] = 72;
                b[33] = 83;
                b[34] = 93;
                b[35] = 103;
                b[36] = 114;
                b[37] = 124;
                b[38] = 134;
                b[39] = 145;
                b[40] = 155;
                b[41] = 159;
                b[42] = 163;
                b[43] = 166;
                b[44] = 170;
                b[45] = 174;
                b[46] = 178;
                b[47] = 183;
                b[48] = 187;
                b[49] = 192;
                b[50] = 197;
                b[51] = 202;
                b[52] = 207;
                b[53] = 213;
                b[54] = 218;
                b[55] = 224;
                b[56] = 230;
                b[57] = 237;
                b[58] = 243;
                b[59] = 250;
                b[60] = 257;
                b[61] = 264;
                b[62] = 272;
                b[63] = 279;
                b[64] = 288;
                b[65] = 296;
        var a = new Array();
                a[25] = 0;
                a[26] = 5;
                a[27] = 11;
                a[28] = 16;
                a[29] = 21;
                a[30] = 26;
                a[31] = 32;
                a[32] = 37;
                a[33] = 42;
                a[34] = 47;
                a[35] = 53;
                a[36] = 58;
                a[37] = 63;
                a[38] = 68;
                a[39] = 74;
                a[40] = 79;
                a[41] = 81;
                a[42] = 83;
                a[43] = 85;
                a[44] = 86;
                a[45] = 88;
                a[46] = 90;
                a[47] = 92;
                a[48] = 94;
                a[49] = 97;
                a[50] = 99;
                a[51] = 101;
                a[52] = 104;
                a[53] = 106;
                a[54] = 109;
                a[55] = 111;
                a[56] = 114;
                a[57] = 117;
                a[58] = 120;
                a[59] = 123;
                a[60] = 126;
                a[61] = 129;
                a[62] = 132;
                a[63] = 136;
                a[64] = 139;
                a[65] = 143;
                
        if (nParent == 1)
                return a[age] * 100;
        else
                return b[age] * 100;
}
Efc.getTableA6 = function (aai) {
        if (aai < -3409)
                return -750;
        else if (aai <= 15900)
                return 0.22*aai;
        else if (aai <= 20000)
                return 3498 + 0.25*(aai - 15900);
        else if (aai <= 24100)
                return 4523 + 0.29*(aai - 20000);
        else if (aai <= 28200)
                return 5712 + 0.34*(aai - 24100);
        else if (aai <= 32200)
                return 7106 + 0.40*(aai - 28200);
        else
                return 8706 + 0.47*(aai - 32200);
        
}

// page 20
Efc.getTableA7 = function (income) {
        
//      alert('in table a7');
        
        percentages = {
                AL: 2,
                AK: 0,
                AZ: 2,
                AR: 3,
                CA: 5,
                CO: 3,
                CT: 5,
                DE: 3,
                DC: 5,
                FL: 1,
                GA: 3,
                HI: 4,
                ID: 3,
                IL: 3,
                IN: 3,
                IA: 3,
                KS: 3,
                KY: 4,
                LA: 2,
                ME: 4,
                MD: 5,
                MA: 4,
                MI: 3,
                MN: 4,
                MS: 2,
                MO: 3,
                MT: 3,
                NE: 3,
                NV: 1,
                NH: 1,
                NJ: 4,
                NM: 2,
                NY: 6,
                NC: 4,
                ND: 1,
                OH: 3,
                OK: 2,
                OR: 5,
                PA: 1,
                RI: 3,
                SC: 3,
                SD: 1,
                TN: 1,
                TX: 1,
                UT: 3,
                VT: 3,
                VA: 4,
                WA: 1,
                WV: 2,
                WI: 4,
                WY: 1,
                other: 1
        };
        
        
        var p = percentages[FormInfo.getState()] / 100;
        return p * income;
}

// page 21
Efc.getEfc_regularWorksheetB = function () {
                
//      alert('in efc function');
        
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
//      alert('line 7, student total income: ' + lines[7]);
        
        lines[8] = FormInfo.getInt('studentIncomeTax');
                if (lines[8] < 0) lines[8] = 0;
        lines[9] = this.getTableB1(lines[7]);
//      alert('line 9: ' + lines[9]);
        lines[10] = this.getTableB2(studentWorkIncome);
//      alert('line 10: ' + lines[10]);
        lines[11] = this.getTableB2(spouseWorkIncome);
//      alert('line 11: ' + lines[11]);
        
        // line 12
        if (FormInfo.hasSpouse() && !FormInfo.isChecked('spouseEnroll')) {
                lines[12] = 15960;
        }
        else {
                lines[12] = 9960;
        }
        
        // line 13
        if (FormInfo.hasSpouse()) {
                lines[13] = Math.min( 0.35 * Math.min(studentWorkIncome, spouseWorkIncome), 3600 );
        }
        else {
                lines[13] = 0;
        }
        
        lines[14] = lines[8] + lines[9] + lines[10] + lines[11] + lines[12] + lines[13];
//      alert('line 14, total allowances: ' + lines[14]);
        
        lines[15] = lines[7] - lines[14];
        lines[16] = 0.50;
        lines[17] = lines[15] * lines[16];
//      alert('line 17, contribution from available income: ' + lines[17]);
        
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
//      alert('line 26, contribution from assets: ' + lines[26]);
        
        lines[27] = lines[17] + lines[26];
        lines[28] = FormInfo.getInt('nInCollege');
        lines[29] = lines[27] / lines[28];
                if (lines[29] < 0) lines[29] = 0;
//      alert('line 29, efc: ' + lines[29]);
                        
        return lines[29];
}

// page 25
Efc.getTableB1 = function (income) {
        return this.getTableA7(income);
}

// page 26
Efc.getTableB2 = function (workIncome) {
//      alert('in getTableB2 ' + workIncome);
        return this.getTableA2(workIncome);
}
Efc.getTableB3 = function (worth) {
        return this.getTableA4(worth);
}

// page 27
Efc.getTableB4 = function () {
        var birthdate = FormInfo.getBirthdate();
        var endOfYear = new Date(2012,12,31);
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
                b[26] = 10;
                b[27] = 21;
                b[28] = 31;
                b[29] = 41;
                b[30] = 52;
                b[31] = 62;
                b[32] = 72;
                b[33] = 83;
                b[34] = 93;
                b[35] = 103;
                b[36] = 114;
                b[37] = 124;
                b[38] = 134;
                b[39] = 145;
                b[40] = 155;
                b[41] = 159;
                b[42] = 163;
                b[43] = 166;
                b[44] = 170;
                b[45] = 174;
                b[46] = 178;
                b[47] = 183;
                b[48] = 187;
                b[49] = 192;
                b[50] = 197;
                b[51] = 202;
                b[52] = 207;
                b[53] = 213;
                b[54] = 218;
                b[55] = 224;
                b[56] = 230;
                b[57] = 237;
                b[58] = 243;
                b[59] = 250;
                b[60] = 257;
                b[61] = 264;
                b[62] = 272;
                b[63] = 279;
                b[64] = 288;
                b[65] = 296;
        var a = new Array();
                a[25] = 0;
                a[26] = 5;
                a[27] = 11;
                a[28] = 16;
                a[29] = 21;
                a[30] = 26;
                a[31] = 32;
                a[32] = 37;
                a[33] = 42;
                a[34] = 47;
                a[35] = 53;
                a[36] = 58;
                a[37] = 63;
                a[38] = 68;
                a[39] = 74;
                a[40] = 79;
                a[41] = 81;
                a[42] = 83;
                a[43] = 85;
                a[44] = 86;
                a[45] = 88;
                a[46] = 90;
                a[47] = 92;
                a[48] = 94;
                a[49] = 97;
                a[50] = 99;
                a[51] = 101;
                a[52] = 104;
                a[53] = 106;
                a[54] = 109;
                a[55] = 111;
                a[56] = 114;
                a[57] = 117;
                a[58] = 120;
                a[59] = 123;
                a[60] = 126;
                a[61] = 129;
                a[62] = 132;
                a[63] = 136;
                a[64] = 139;
                a[65] = 143;
                
        if (isMarried)
                return a[age] * 100;
        else
                return b[age] * 100;
}

// page 31
Efc.getEfc_regularWorksheetC = function () {
                
//      alert('in efc function');
        
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
//      alert('line 7, student total income: ' + lines[7]);
        
        lines[8] = FormInfo.getInt('studentIncomeTax');
                if (lines[8] < 0) lines[8] = 0;
        lines[9] = this.getTableC1(lines[7]);
        lines[10] = this.getTableC2(studentWorkIncome);
        lines[11] = this.getTableC2(spouseWorkIncome);
        lines[12] = this.getTableC3();
        
        // line 13
        if (FormInfo.hasSpouse()) {
                lines[13] = Math.min( 0.35 * Math.min(studentWorkIncome, spouseWorkIncome), 4000 );
        }
        else {
                lines[13] = Math.min( 0.35 * studentWorkIncome , 4000 );
        }
        
        lines[14] = lines[8] + lines[9] + lines[10] + lines[11] + lines[12] + lines[13];
        
        lines[15] = lines[7] - lines[14];
//      alert('line 15, available income: ' + lines[17]);
        
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
//      alert('line 24, contribution from assets: ' + lines[24]);
        
        lines[25] = lines[15] + lines[24];
        lines[26] = this.getTableC6(lines[25]);
        lines[27] = FormInfo.getInt('nInCollege');
        lines[28] = lines[26] / lines[27];
                if (lines[28] < 0) lines[28] = 0;
//      alert('line 28, efc: ' + lines[28]);
                        
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

        arr[2] = [0,25210,20900];
        arr[3] = [0,31390,27100,22790];
        arr[4] = [0,38760,34460,30170,25850];
        arr[5] = [0,45740,41420,37130,32830,28540];
        arr[6] = [0,53490,49190,44910,40580,36300];
        
        var a = FormInfo.getInt('nHouseholdMember');
        var b = FormInfo.getInt('nInCollege');
        var ans = 0;
        
        // the 'For each additional...' notes at the bottom
        if (a > 6) {
                ans += (a - 6) * 6040;
                a = 6;
        }
        if (b > 5) {
                ans -= (b - 5) * 4290;
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
