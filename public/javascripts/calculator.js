function Valuecheck(){


}




function initCalculator() {

	$('.add').click(function() {
		$('.plus').append($('.plus2').html());
			console.log("test");
		});

	$('.add2').click(function() {
		$('.plus3').append($('.plus4').html());
	});


	$('.add3').click(function() {
		$('.plus5').append($('.plus5').html());
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

	$('.del2').click(function() {
		if (confirm("정말 삭제하시겠습니까?")) {
			$('.plus4').appendTo($('.plus4').html());
		}
	});



	$(".pl").hide();

	$(".add3").click(function () {
		console.log('test');
		 $(".pl").show();
	 });







}
