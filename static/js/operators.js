$(document).ready(function() {
        listOperators();
});

function listOperators(){
  console.log("list operatorssss")
  var requestBody="{}";
	$.ajax({
		type : 'GET',
		url :  'http://9.30.199.16:5000/list_oper',
		data : requestBody,
		headers: {
			'Content-Type':'application/json'
		},
		dataType : "json",
		success : function(data) {
			devices = data;
			console.log(devices)
			//filldevicesTable();
		},
		error: function(jqXHR, textStatus, errorThrown) {
		    console.log(textStatus)
		    console.log(jqXHR)
		    console.log(errorThrown)
			//displayConsoleMessages(jqXHR, textStatus, errorThrown);
			//renderErrorMessage("There was some error fetching devices.");
		}
	});
}

function createHelmoperator(){
    console.log("in js")
    var chart_name = $("#chart_name").val();
    var chart_repo = $("#chart_repo").val();
    var op_name = $("#op_name").val();
    var requestBody = "{\"helmchartname\" : \"" + chart_name +
                      "\",\"helmrepo\" : " + chart_repo +
                      "\ ,\"operatorname\" : " + op_name +"}";
    console.log(requestBody)
	$.ajax({
		type : 'POST',
		url :  'http://9.30.199.16:5000/helmoperator',
		data : requestBody,
		headers: {
			'Content-Type':'application/json'
		},
		dataType : "json",
		success : function(data) {
		    console.log("yeyyyy")
	            //renderSuccessMessage(" Operator added successfully.");
		},
		error: function(jqXHR, textStatus, errorThrown) {
		    console.log("nooo")
		    //renderErrorMessage(" Failed to add a operator.");
		}
	});

}

