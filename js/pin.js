function pinThem(event) {
	event.preventDefault();
	$("#err1").html("");
	$("#err2").html("");

	var token = getCookie("pa-token");
	var source_board = $("#source_board").val();
	var destination_board = $("#destination_board").val();
	var error = 0;
	
	if (source_board.substring(0,6) == "https:") {
		var source_board_parts = source_board.split("/");
		var source_board = source_board_parts[3] + "/" + source_board_parts[4];
	} else if (source_board.replace(/^\/|\/$/g, "").split("/").length == 2) {
		source_board = source_board.replace(/^\/|\/$/g, "");
	} else {
		$("#err1").html("Enter a valid source board");
		error = 1;
	}

	if (destination_board.substring(0,6) == "https:") {
		var destination_board_parts = destination_board.split("/");
		var destination_board = destination_board_parts[3] + "/" + destination_board_parts[4];
	} else if (destination_board.replace(/^\/|\/$/g, "").split("/").length == 2) {
		destination_board = destination_board.replace(/^\/|\/$/g, "");
	} else {
		$("#err2").html("Enter a valid destination board");
		error = 1;
	}

	if (error == 0) {
		$.get("../PinterestAutomatic/extract.php", {token: token, source_board: source_board,destination_board: destination_board}, function(result) {
		console.log(result);
		});
	}
}
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length,c.length);
        }
    }
    return "";
}
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}