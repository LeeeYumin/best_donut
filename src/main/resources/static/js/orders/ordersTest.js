Swal.fire({
	title: "해당 주문을 삭제하시겠습니까?",
	text: "삭제 후엔 복구가 불가능합니다.",
	icon: "warning",
	showCancelButton: true,
	confirmButtonColor: "#3085d6",
	cancelButtonColor: "#d33",
	confirmButtonText: "삭제",
	cancelButtonText: '취소'
}).then((result) => {
	if (result.isConfirmed) {
		Swal.fire({
			position: "center",
			icon: "success",
			title: "주문삭제 완료!",
			text: "주문삭제가 정상적으로 처리되었습니다.",
			showConfirmButton: false,
			timer: 1500
		});
	}
});