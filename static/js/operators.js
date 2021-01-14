$(document).ready(function() {
        listOperators();
});

function listOperators(){
  console.log("list operatorssss")
  var requestBody="{}";
	$.ajax({
		type : 'GET',
		url :  'http://9.30.199.16:5000/list_opers',
		data : requestBody,
		headers: {
			'Content-Type':'application/json'
		},
		dataType : "json",
		success : function(data) {
			operators = data;
			console.log(operators)
			fillOperatorsTable();
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

function fillOperatorsTable() {

    operatorsArray = operators
    rows_selected = [];

    $("#opsTable tbody").empty();

    opsTable = $("#opsTable").DataTable({
		'columnDefs': [{
			'targets': 0,
			'searchable': false,
			'orderable': false,
			'className': 'dt-body-center',
			'render': function (data, type, full, meta) {
				return '<input type="checkbox" name="id[]" value="' + $('<div/>').text(data).html() + '">';
			},
		}],
		"order": [[1, 'asc']],
        "dom":
			"<'row'<'col-sm-4'l><'col-sm-4'f><'col-sm-4 custom-top-toolbar text-right'>>" +
			"<'row'<'col-sm-12'tr>>" +
			"<'row'<'col-sm-4'i><'col-sm-8 middle'p>",
		'rowCallback': function(row, data, dataIndex){
        // Get row ID
        var rowId = data[0];
        // If row ID is in the list of selected row IDs
        if($.inArray(rowId, rows_selected) !== -1){
          $(row).find('input[type="checkbox"]').prop('checked', true);
          $(row).addClass('selected');
        }
      }
	});

    /*
	 * Render the action buttons template (from the html) into the
	 * custom-top-toolbar div
	 */
	//$( '.custom-top-toolbar' ).append( $('.custom-top-toolbar-template' ) );

    $.each(operatorsArray, function( index, op ) {
		opsTable.row.add(getTableRow(op)).draw(false);
	});
  });

  // Handle click on table cells with checkboxes
  $('#devicesTable').on('click', 'tbody td, thead th:first-child', function(e) {
	  $(this).parent().find('input[type="checkbox"]').trigger('click');
  });

  // Handle click on "Select all" control
  $('#all').on('click', function(e){
	if(this.checked){
	  $('#devicesTable tbody input[type="checkbox"]:not(:checked)').trigger('click');
	} else {
	  $('#devicesTable tbody input[type="checkbox"]:checked').trigger('click');
	}

	// Prevent click event from propagating to parent
	e.stopPropagation();
  });
}

function createHelmoperator(){
    console.log("in js")
    var chart_name = $("#chart_name").val();
    var chart_repo = $("#chart_repo").val();
    var op_name = $("#op_name").val();
    var requestBody = "{\"helmchartname\" : \"" + chart_name +
                      "\",\"helmrepo\" : " + chart_repo +
                      "\" ,\"operatorname\" : " + op_name +"}";
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

