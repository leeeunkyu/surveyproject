
function initCalculator() {

	$('.add').click(function() {
		$('.plus').append($('.plus2').html());
			console.log("test");
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



			$('.plus2').appendTo($('.plus2').html());



		}
	});
}
