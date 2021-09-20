document.addEventListener('DOMContentLoaded', function() {

	scrollLinks();

	initIntersectionObserver();

});

function scrollLinks() {
	document.addEventListener('click', event => {
		const target = event.target.closest('[data-scroll-link]');
		if (!target) return;

		event.preventDefault();

		element = document.querySelector(target.getAttribute('href'));
		element.scrollIntoView({
			behavior: 'smooth',
		});
	});
}

function initIntersectionObserver() {
	const callback = entries => {
		entries.forEach(entry => {
			const target = entry.target;

			if (entry.isIntersecting) {
				target.classList.add('--intersected');
				observer.unobserve(target);
			}
		});
	};

	const observer = new IntersectionObserver(callback, {
		threshold: 1
	});

	const targets = document.querySelectorAll('[data-intersection-observer]');
	targets.forEach(target => observer.observe(target));
}