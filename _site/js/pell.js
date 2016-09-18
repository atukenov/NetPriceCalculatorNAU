function Pell () {}

// values taken from Pell_Grant_Award_Schedule.pdf 2016-2017, full-time part
// cost of attendace is considered as more than 5815
Pell.values = [5815, 5765, 5665, 5565, 5465, 5365, 5265, 5165, 5065, 4965, 4865, 4765, 4665, 4565, 4465, 4365, 4265, 4165, 4065, 3965, 3865, 3765, 3665, 3565, 3465, 3365, 3265, 3165, 3065, 2965, 2865, 2765, 2665, 2565, 2465, 2365, 2265, 2165, 2065, 1965, 1865, 1765, 1665, 1565, 1465, 1365, 1265, 1165, 1065, 965, 865, 765, 665, 598, 0];

Pell.getPell = function () {
        
        var efc = Efc.getEfc();
        
//      alert('efc: ' + efc);
        
        var bracket = 0;
        if (efc >= 4996)
                bracket = 50;
        else if (efc <= 0)
                bracket = -1;
        else
                bracket = Math.floor((efc - 1)/100);    

        bracket++;
        
        return this.values[bracket];
}
