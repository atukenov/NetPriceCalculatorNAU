
function Pell () {}

// values taken from Pell_Grant_Award_Schedule.pdf 2011-2012
Pell.values = [5550, 5500, 5400, 5300, 5200, 5100, 5000, 4900, 4800, 4700, 4600, 4500, 4400, 4300, 4200, 4100, 4000, 3900, 3800, 3700, 3600, 3500, 3400, 3300, 3200, 3100, 3000,
2900, 2800, 2700, 2600, 2500, 2400, 2300, 2200, 2100, 2000, 1900, 1800, 1700, 1600, 1500, 1400, 1300, 1200, 1100, 1000, 900, 800, 700, 600, 555, 555, 555, 0];

Pell.getPell = function () {
	
	var efc = Efc.getEfc();
	
//	alert('efc: ' + efc);
	
	var bracket = 0;
	if (efc >= 5274)
		bracket = 53;
	else if (efc <= 0)
		bracket = -1;
	else
		bracket = Math.floor(efc/100);
	
	bracket++;	
	
	return this.values[bracket];
}
