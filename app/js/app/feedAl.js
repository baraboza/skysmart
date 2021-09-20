document.addEventListener('DOMContentLoaded', function() {
	const 
	pizza = document.querySelector('.feed-al__pizza'),
	pizzaTarget = document.querySelector('.feed-al__target');

	let shiftX, shiftY;

	pizza.addEventListener('mousedown', onMouseDown);

	function onMouseDown(event) {
		event.preventDefault();

		startDrag(event.clientX, event.clientY);
	}

	pizza.addEventListener('touchstart', onTouchStart);

	function onTouchStart(event) {
		event.preventDefault();

		console.log(event);

		startDrag(event.changedTouches[0].clientX, event.changedTouches[0].clientY);
	}

	function startDrag(clientX, clientY) {

		pizza.addEventListener('mousemove', onMouseMove);
		pizza.addEventListener('mouseup', onMouseUp);

		pizza.addEventListener('touchmove', onTouchMove);
		pizza.addEventListener('touchend', onTouchEnd);

		shiftX = clientX - pizza.getBoundingClientRect().left;
		shiftY = clientY - pizza.getBoundingClientRect().top;

		pizza.style.position = 'fixed';

		moveAt(clientX, clientY);
	}

	function onMouseMove(event) {
		moveAt(event.clientX, event.clientY);
	}

	function onTouchMove(event) {
		moveAt(event.changedTouches[0].clientX, event.changedTouches[0].clientY);
	}

	function moveAt(clientX, clientY) {
		let newX = clientX - shiftX;
		let newY = clientY - shiftY;

		if (newY < 0) newY = 0;
		if (newY > document.documentElement.clientHeight - pizza.offsetHeight) {
			newY = document.documentElement.clientHeight - pizza.offsetHeight;
		}

		if (newX < 0) newX = 0;
		if (newX > document.documentElement.clientWidth - pizza.offsetWidth) {
			newX = document.documentElement.clientWidth - pizza.offsetWidth;
		}

		pizza.style.left = newX + 'px';
		pizza.style.top = newY + 'px';
	}

	function onMouseUp(event) {
		finishDrag(event.clientX, event.clientY);
	}

	function onTouchEnd(event) {
		finishDrag(event.changedTouches[0].clientX, event.changedTouches[0].clientY);
	}

	function finishDrag(clientX, clientY) {
		const targetRect = pizzaTarget.getBoundingClientRect();

		if (
			clientX >= targetRect.left &&
			clientX <= targetRect.left + targetRect.width &&
			clientY >= targetRect.top &&
			clientY <= targetRect.top + targetRect.height
		) {
			dragSuccess();
		}

		pizza.style.position = '';

		pizza.removeEventListener('mousemove', onMouseMove);
		pizza.removeEventListener('mouseup', onMouseUp);
		pizza.removeEventListener('touchmove', onTouchMove);
		pizza.removeEventListener('touchend', onTouchEnd);
	}

	function dragSuccess() {
		pizzaTarget.append(pizza);
		pizza.removeEventListener('mousedown', onMouseDown);
		pizza.removeEventListener('touchstart', onTouchStart);
		document.querySelector('.feed-al__box').classList.add('--drag-success');
	}
});