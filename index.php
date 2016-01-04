<?php require_once __DIR__ . '/application.php'; ?>

<?php
$request = $_GET['request'];
if (strpos($request, '/') !== false) :
    $color_array = explode('/', $request);
else :
	$color = $request;
endif;
?>

<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title>Hue &ndash; CSS Color Converter</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0">
        <link rel="stylesheet" href="<?php echo BASE_URL; ?>/src/css/style.css">
    </head>
    <body>

    	<script>
    	var BASE_URL = '<?php echo BASE_URL; ?>';
    	</script>
		
		<?php if (!isset($color_array)) : ?>

		<div class="convert">
			<div class="center">
				<div class="input">
					<input type="text" name="color" placeholder="Type a color..." value="<?php echo $color; ?>">
				</div>
				<div class="result">
					<div class="hex"></div>
					<div class="rgb"></div>
					<div class="hsl"></div>
					<div class="name"></div>
				</div>
			</div>
		</div>

		<?php else : ?>
		
		<div class="compare">
			<?php foreach ($color_array as $color) : ?>
			<div class="palette" data-color="<?php echo $color; ?>">
				<div class="info">
					<div class="hex"></div>
					<div class="rgb"></div>
					<div class="hsl"></div>
				</div>
			</div>
			<?php endforeach; ?>
		</div>

		<?php endif; ?>
	
		<div class="board">
			<?php if (count($_SESSION['color_array']) > 0) : ?>
			<?php foreach (array_reverse($_SESSION['color_array']) as $color) : ?>
			<div class="palette" data-color="<?php echo $color; ?>">
				<div class="info">
					<div class="hex"></div>
					<div class="rgb"></div>
					<div class="hsl"></div>
				</div>
			</div>
			<?php endforeach; ?>
			<?php endif; ?>
		</div>
	
	<script type="text/javascript" src="<?php echo BASE_URL; ?>/src/plugin/jquery/jquery.js"></script>
	<script type="text/javascript" src="<?php echo BASE_URL; ?>/src/plugin/tinycolor/tinycolor.js"></script>
	<script type="text/javascript" src="<?php echo BASE_URL; ?>/src/plugin/zero_clipboard/zero_clipboard.js"></script>
	<script type="text/javascript" src="<?php echo BASE_URL; ?>/src/script/script.js"></script>
    </body>
</html>