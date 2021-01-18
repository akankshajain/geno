$(document).ready(function() {
        listOperators();
});

function listOperators(){
  var requestBody="{}";
	$.ajax({
		type : 'GET',
		url :  'http://9.30.199.16:5000/list_opers',
		data : requestBody,
		headers: {
			'Content-Type':'application/json'
		},
		dataType : "json",
		success : function(response
			operators = response.operators;
			var trHTML = '';
        $.each(operators, function (i, item) {
               trHTML += '<tr><td><input name=\"\" value=\"\" type=\"checkbox\"></td><td>' + item.oper_name +
                '</td><td>' + item.oper_path + '</td><td>' + item.oper_source + '</td><td>' + item.create_time +
                '</td><td><a href="#"><span class=\"glyphicon glyphicon-download-alt\"></span>&ensp;<span class=\"glyphicon glyphicon-edit\"></span></td></tr>';
        });
        $('#opsTable').append(trHTML);
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