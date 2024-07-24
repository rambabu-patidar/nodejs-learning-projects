const deleteProduct = (btn) => {
	const prodId = btn.parentElement.querySelector("[name=productId]").value;
	const csrf = btn.parentElement.querySelector("[name=_csrf]").value;

	const productContainer = btn.closest("article");
	fetch(`/admin/product/${prodId}`, {
		method: "DELETE",
		headers: {
			"csrf-token": csrf,
		},
	})
		.then((result) => {
			return result.json();
		})
		.then((data) => {
			productContainer.remove();
			console.log(data);
		})
		.catch((err) => {
			console.log(err);
		});
};
