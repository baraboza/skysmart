document.addEventListener('DOMContentLoaded', function() {
	const 
		box = document.querySelector('.videos__box'),
		video = box.querySelector('video'),
		soundToggle = box.querySelector('.videos__sound-toggle'),
		tabsList = document.querySelector('.videos__tabs-list');

	const observer = new IntersectionObserver(entries => {
		if (entries[0].isIntersecting) {
			video.play();
		} else {
			video.pause();
		}
	}, {
		threshold: 0.75
	});

	observer.observe(box);

	soundToggle.addEventListener('click', function() {
		if (this.classList.contains('--on')) {
			video.muted = true;
		} else {
			video.muted = false;
		}

		this.classList.toggle('--on');
	});

	tabsList.addEventListener('click', event => {
		const target = event.target.closest('.videos__tab');
		if (!target) return;

		event.preventDefault();

		if (target.classList.contains('--active')) return;

		tabsList.querySelector('.videos__tab.--active').classList.remove('--active');
		target.classList.add('--active');

		video.src = target.getAttribute('href');
		video.play();
	});
});