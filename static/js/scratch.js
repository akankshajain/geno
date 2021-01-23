$(document).ready(function() {
    var allkinds = [];
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
    var KindObj = [];
    var OperatorsObj = {};


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

    function cleanArrays() {
        Secret = {}
        ConfigMap = {}
        PersistentVolumeClaim = {}
        Service = {}
        Pod = {}
        Deployment = {}
        StatefulSet = {}
        Job = {}
        Cronjob = {}
        Route = {}
        NetworkPolicy = {}
    }

    $('#full_createkind').click(function   (event) {
        var kindVal = $('#full_kind').val();
        var currentKind = {};

        if(Secret != {})
            currentKind[kindVal] = {...currentKind[kindVal],Secret}
        if(ConfigMap != {})
            currentKind[kindVal] = {...currentKind[kindVal],ConfigMap}
        if(PersistentVolumeClaim != {})
            currentKind[kindVal] = {...currentKind[kindVal],PersistentVolumeClaim}
        if(Service != {})
            currentKind[kindVal] = {...currentKind[kindVal],Service}
        if(Pod != {})
            currentKind[kindVal] = {...currentKind[kindVal],Pod}
        if(Deployment != {})
            currentKind[kindVal] = {...currentKind[kindVal],Deployment}
        if(StatefulSet != {})
            currentKind[kindVal] = {...currentKind[kindVal],StatefulSet}
        if(Job != {})
            currentKind[kindVal] = {...currentKind[kindVal],Job}
        if(Cronjob != {})
            currentKind[kindVal] = {...currentKind[kindVal],Cronjob}
        if(Route != {})
            currentKind[kindVal] = {...currentKind[kindVal],Route}
        if(NetworkPolicy != {})
            currentKind[kindVal] = {...currentKind[kindVal],NetworkPolicy}

        cleanArrays();
        $('#full_bar').append('&nbsp;&nbsp;<button class="btn-styled" type="button">' + kindVal + '</button>');
        KindObj.push(currentKind);
        console.log(KindObj);
    });

    $('#full_createop').click(function   (event) {
        var grpName = $('#full_gname').val();
        var domainName = $('#full_dname').val();
        var version = $('#full_vname').val();
        var operatorName = $('#full_operator_name').val();

        var currentOp = {
            Group: grpName,
            Domain: domainName,
            Version: version,
            Operator: operatorName,
            Kinds: KindObj
        };
        KindObj = [];
        OperatorsObj = currentOp;
        console.log(OperatorsObj);
    });

    $('#full_addResource').click(function   (event) {
        var resource = $('#full_resourceType').val();
        $("#"+resource+"").modal("show");
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