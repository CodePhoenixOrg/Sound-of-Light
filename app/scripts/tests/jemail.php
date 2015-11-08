<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>Makes "field" required and an email address.</title>
<link rel="stylesheet" href="http://jquery.bassistance.de/validate/demo/site-demos.css">
</head>
<body>
<form id="myform">
<label for="field">Required, email: </label>
<input class="left" id="field" name="field">
<br/>
<input type="submit" value="Validate!">
</form>
<script src="http://code.jquery.com/jquery-1.9.1.min.js"></script>
<script src="http://jquery.bassistance.de/validate/jquery.validate.js"></script>
<script src="http://jquery.bassistance.de/validate/additional-methods.js"></script>
<script>
// just for the demos, avoids form submit
jQuery.validator.setDefaults({
debug: true,
success: "valid"
});
$( "#myform" ).validate({
rules: {
field: {
required: true,
email: true
}
}
});
</script>
</body>
</html>