
function initCalculator() {

	$('.add').click(function() {
		$('.plus').append($('.plus').html());
	});

	$('.add2').click(function() {
		$('.plus2').append($('.plus2').html());
	});

	/*
	$('.add').click(function() {
		$('.plus').addClass("active");
	});*/
	$('.del').click(function() {
		if (confirm("정말 삭제하시겠습니까?")) {
			var $els = $(".dd input[type='checkbox']:checked");
      $els.each(function(idx, el) {
        $(el).parents(".dd").empty();
      });
		}
	});
}
