<? switch($_SERVER['REQUEST_METHOD']): case 'GET': ?>
<!DOCTYPE html>
<html>
<head>
	<title>Blob/FormData Test</title>
	<link rel="stylesheet" href="app.css">
</head>
<body>
  <div>
  	<div><progress id="download-progress" min="0" max="100" value="0"></progress> download</div>
  	<div><progress id="upload-progress" min="0" max="100" value="0"></progress> upload</div>
  </div>

	<input type="file" id="file-picker" multiple>
  <div id="dropzone" class="dropzone"></div>
  
  <div>
    <div>post_max_size: <?= ini_get('post_max_size'); ?></div>
    <div>upload_max_filesize: <?= ini_get('upload_max_filesize'); ?></div>
    <div>memory_limit: <?= ini_get('memory_limit'); ?></div>
    <div>max_file_uploads: <?= ini_get('max_file_uploads'); ?></div>
  </div>
  
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js"></script>
	<script src="app.js"></script>
	<script>
	var app = new App;
	$(app.init);
	</script>
</body>
</html>
<? break; case 'POST': ?>
<? if (!$_FILES && !$_POST): ?><div>Maximum file size exceeded?</div><? endif; ?>
<? 
print_r(array(
  //'POST' => $_POST,
  'FILES' => $_FILES,
  'mem' => memory_get_usage(true),
  'max' => memory_get_peak_usage(true),
));
?>
<? break; endswitch; ?>