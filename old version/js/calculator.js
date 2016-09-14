
function Calculator () {}

Calculator.calculate = function () {
	
	var housing = FormInfo.getSelectOption('housing');
	
	var remainingNeed = 0;
	
	var tuitionAndFees = 10950;
	var roomAndBoard;
		if (housing == 'oncampus') roomAndBoard = 7050;
		if (housing == 'other') roomAndBoard = 2400;
		if (housing == 'offcampus') roomAndBoard = 7500;
	var booksAndSupplies = 1100;
	var transportationAndOther = 1800;
		if (housing == 'oncampus') transportationAndOther = 1000;
	var costOfAttendance = tuitionAndFees + roomAndBoard + booksAndSupplies + transportationAndOther;
	
	remainingNeed += costOfAttendance;
	
	var federalGrant = 0;
		if (FormInfo.getSelectOption('nationality') == 'US') federalGrant = Math.round(Pell.getPell());
	remainingNeed -= federalGrant;
	
	var nacAid = Math.round(NacAid.getNacAid(federalGrant));
	remainingNeed -= nacAid;
	
	// in the rare case that NAC aid and the Pell grant together exceed the cost of attendance, the excess is cut off from the Pell grant
	if (remainingNeed < 0) {
		federalGrant += remainingNeed;
		remainingNeed = 0;
	}
	
	var maxFederalLoan = 5500;
	if (!FormInfo.isDependent()) {
		maxFederalLoan += 4000;
	}
	var federalLoan = Math.min(remainingNeed, maxFederalLoan);
	remainingNeed -= federalLoan;
	
	var familyContribution = remainingNeed;
	remainingNeed -= familyContribution;
		
	var netPrice = remainingNeed;
	
	$('#tr-tuitionAndFees td:nth-child(2)').html(this.comma(tuitionAndFees));
	$('#tr-roomAndBoard td:nth-child(2)').html(this.comma(roomAndBoard));
	$('#tr-booksAndSupplies td:nth-child(2)').html(this.comma(booksAndSupplies));
	$('#tr-transportationAndOther td:nth-child(2)').html(this.comma(transportationAndOther));
	$('#tr-costOfAttendance td:nth-child(2)').html(this.comma(costOfAttendance));
	$('#tr-federalGrant td:nth-child(2)').html(this.comma(federalGrant));
	$('#tr-federalLoan td:nth-child(2)').html(this.comma(federalLoan));
	$('#tr-nacAid td:nth-child(2)').html(this.comma(nacAid));
	$('#tr-familyContribution td:nth-child(2)').html(this.comma(familyContribution));
	$('#tr-netPrice td:nth-child(2)').html(this.comma(netPrice));
	
	$('#slide-results table tr td:nth-child(2)').prepend('$');
	$('#slide-results table tr.negative  td:nth-child(2)').prepend('(');
	$('#slide-results table tr.negative  td:nth-child(2)').append(')');
	
	
	// pie graph
	var data = [];
	data.push({label: 'Grants and Scholarships', data: (federalGrant + nacAid)});
	data.push({label: 'Loans', data: federalLoan});
	data.push({label: 'Family and Student Contribution', data: familyContribution});
	
    $.plot($("#results-pie-graph"), data, 
	{
		series: {
			pie: { 
				show: true,
				radius: 1,
				label: {
					show: true,
					radius: 0.6,
					formatter: function(label, series){
						return '<div class="pie-chart-label">'+label+'<br/>$'+Calculator.comma(Math.round(series.data[0][1]))+'</div>';
					},
					background: { opacity: 0.8 }
				}
			}
		},
		legend: {
			show: false
		}
	});
}


Calculator.comma = function(n) {
    if (!isFinite(n)) {
        return n;
    }

    var s = ""+n, abs = Math.abs(n), _, i;

    if (abs >= 1000) {
        _  = (""+abs).split(/\./);
        i  = _[0].length % 3 || 3;

        _[0] = s.slice(0,i + (n < 0)) +
               _[0].slice(i).replace(/(\d{3})/g,',$1');

        s = _.join('.');
    }

    return s;
}