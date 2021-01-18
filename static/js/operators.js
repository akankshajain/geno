$(document).ready(function() {
    $('#createOperator').click(function   (event) {
        var e = document.getElementById("createOp");
        var strUser = e.value;
        if(e.value == "helm"){
            $("#createHelmModal").modal('show');
        }
        else{
            if(e.value == "existing"){
                $("#createExistModal").modal('show');
            }
            else{
                alert(strUser)
            }

        }
    });
});

function createHelmoperator(){
    console.log("in js")
    $('#loadingmessage').show();
    var chart_name = $("#chart_name").val();
    var chart_repo = $("#chart_repo").val();
    var op_name = $("#op_name").val();
    var requestBody = "{\"helmchartname\" : \"" + chart_name +
                      "\",\"helmrepo\" : \"" + chart_repo +
                      "\" ,\"operatorname\" : \"" + op_name +"\"}";
	$.ajax({
		type : 'POST',
		url :  'http://9.30.199.16:5000/helmoperator',
		data : requestBody,
		headers: {
			'Content-Type':'application/json'
		},
		dataType : "json",
		success : function(data) {
		    $('#loadingmessage').hide();
		    console.log("yeyyyy")
	        renderSuccessMessage(" Operator added successfully at /root/operators/" + op_name);
		},
		error: function(jqXHR, textStatus, errorThrown) {
		    $('#loadingmessage').hide();
		    console.log("nooo")
		    console.log(textStatus)
		    console.log(jqXHR)
		    console.log(errorThrown)
		    renderSuccessMessage(" Operator added successfully at /root/operators/" + op_name);
		}
	});

}

