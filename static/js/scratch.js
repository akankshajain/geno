$(document).ready(function() {
    var Secret = {}
    var ConfigMap = {}
    var PersistentVolumeClaim = {}
    var Service = {}
    var Pod = {}
    var Deployment = {}
    var StatefulSet = {}
    var Job = {}
    var Cronjob = {}
    var Route = {}
    var NetworkPolicy = {}
    var resourcenames = []
    var kinds = []


    $("#full_kind").keyup(function () {
        //Reference the Button.
        var btnAddRes = $("#full_addResource");
        var btnCreateKind = $("#full_createkind");
        if ($(this).val().trim() != "") {
            btnCreateKind.removeAttr("disabled");
            btnAddRes.removeAttr("disabled");
        } else {
            btnCreateKind.attr("disabled", "disabled");
            btnAddRes.attr("disabled", "disabled");
        }
    });

    $("#full_operator_name").keyup(function () {
        //Reference the Button.
        var btnCreateOP = $("#full_createop");
        if ($(this).val().trim() != "") {
            btnCreateOP.removeAttr("disabled");
        } else {
            btnCreateOP.attr("disabled", "disabled");
        }
    });


    $('#full_createkind').click(function   (event) {
        var kindVal = $('#full_kind').val();
        var kind = {
            name: kindVal,
            "resourcenames": resourcenames
        }
        kinds.push(kind)
        $('#full_bar').append('&nbsp;&nbsp;<button class="btn-styled" type="button">' + kindVal + '</button>');

    });

    $('#full_createop').click(function   (event) {
        var grpName = $('#full_gname').val();
        var domainName = $('#full_dname').val();
        var version = $('#full_vname').val();
        var operatorName = $('#full_operator_name').val();

        var requestBody = "{\"groupname\" : \"" + grpName +
                          "\",\"domainname\" : \"" + domainName +
                          "\",\"operatorname\" : \"" + operatorName +
                          "\",\"version\" : \"" + version +
                          "\" ,\"kinds\" :" +  JSON.stringify(kinds) + "}";
        console.log(requestBody)

    });

    // display modal
    $('#full_addResource').click(function   (event) {
        var resource = $('#full_resourceType').val();
        $("#"+resource+"").modal("show");
    });

    // process add resource button and create
    $('#dep_add').click(function   (event) {
        Deployment = {
            type: "Deployment",
            name : $('#dname').val(),
            port : $('#port').val(),
            image : $('#image').val(),
            label : $('#label').val(),
            replicas: $('#replica').val()

        }
        resourcenames.push(Deployment);
    });

    $('#service_add').click(function   (event) {
        Service = {
            type: "Service",
            name : $('#sname').val(),
            sourceport : $('#sport').val(),
            targetport : $('#tport').val(),
            podselectorlabel : $('#label').val()

        }
        resourcenames.push(Service);
    });

    $('#route_add').click(function   (event) {
        Route = {
            type: "Route",
            name : $('#rname').val(),
            servicename : $('#servicename').val(),
            targetport : $('#targetport').val()
        }
        resourcenames.push(Route);
    });

    $('#Secret_Add').click(function   (event) {
        Secret = {
            name : $('#Secret_Name').val()
        }
        $('#Secret_Name').val('');
    });

    $('#ConfigMap_Add').click(function   (event) {
        ConfigMap = {
            name : $('#ConfigMap_Name').val()
        }
        $('#ConfigMap_Name').val('');
    });

    $('#PersistentVolumeClaim_Add').click(function   (event) {
        PersistentVolumeClaim = {
            name : $('#PersistentVolumeClaim_Name').val()
        }
        $('#PersistentVolumeClaim_Name').val('');
    });

    $('#Pod_Add').click(function   (event) {
        Pod = {
            name : $('#Pod_Name').val()
        }
        $('#Pod_Name').val('');
    });


});