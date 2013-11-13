$(function() {
	var KICK_0 = 0;
	var KICK_1 = 1;
	var KICK_2 = 2;
	var KICK_3 = 3;
	var KICK_4 = 4;
	var SPEED = 2;
	var PROGRESS_MIN = 30;
	var current_state = 0;
	var current_image = 0;
	var $progress = $('#progress');
	var $progress_container = $('#progress_container');
	var $img = $('img#game');
	var $ball = $('img#ball');
	var $banner = $('#banner');
	
	var timer = null;
	var direction = 0;
	
	var update = function() {
		if (direction === 0) {
			current_state = KICK_0;
			return;
		}
		if (direction === null) {
			var l_px = $ball.css('left').replace("px", "");
			var left = 1 + parseInt(l_px) + "px";
			$ball.css('left', left);
		}
		if ($progress.width() < 1) {
			$progress.width(1);
			direction = 0;
			current_state = KICK_0;
		}
		if ($progress.width() > $progress_container.width()) {
			direction = -direction;
		}
		$progress.width($progress.width() + direction);
		
		if (current_state == KICK_2 && $progress.width() < $progress_container.width() / 2) {
			current_state = KICK_3;
		}
		if (current_state != current_image) {
			$img.attr('src', current_state+".png");
			current_image = current_state;
		}
	}
	var interval = setInterval(update, SPEED);
	var power;
	var accuracy;
	// debug interval
	setInterval(function() {
		console.log(direction);
		console.log("current_state", current_state);
	}, 250);
	$(document).click(function(e) {
		e.preventDefault();
		switch (current_state) {
			case KICK_0:
				power = -$progress_container.width();
				accuracy = 0;
				current_state = KICK_1;
				direction = 1;
			break;
			case KICK_1:
				power = power + $progress.width();
				direction = -1;
				current_state = KICK_2;
			break;
			case KICK_2:
				current_state  = KICK_3;
				direction = 0;
			break;
			case KICK_3:
				accuracy = PROGRESS_MIN - $progress.width();
				direction = null;
				$ball.hide(2000);
				$banner.show(2000);
				current_state = KICK_4;
			break;
		}
	});
});