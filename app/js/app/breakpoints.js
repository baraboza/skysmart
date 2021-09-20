window.breakpoints = [0, 576, 768, 992, 1200];

setBreakpoint();
window.addEventListener('resize', setBreakpoint);

function setBreakpoint() {
	for (let i = window.breakpoints.length; i >= 0; i--) {
		if (window.matchMedia(`(min-width: ${window.breakpoints[i]}px)`).matches) {
			window.breakpoint = i;
			break;
		}
	}
}