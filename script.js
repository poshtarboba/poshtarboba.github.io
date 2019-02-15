(function () {

	/* slideToggle init */
	const SLIDE_DURATION = 400;
	slideToggleInit();
	

	/* slideToggle functions */
	function slideToggleInit(){
		document.querySelectorAll('.js-slide-handle').forEach(function (handle) {
			let targetSelector = handle.dataset.target;
			if (targetSelector) {
				document.querySelectorAll(targetSelector).forEach(function (targetBox) {
					if (!targetBox.classList.contains('slide-shown')) targetBox.style.display = 'none';
				});
			}
			handle.addEventListener('click', clickOnSlideToggleHandle);
		});
	}
	function clickOnSlideToggleHandle() {
		let targetSelector = this.dataset.target;
		if (!targetSelector) return;
		document.querySelectorAll(targetSelector).forEach(function (targetBox) {
			slideToggleStop(targetBox);
			targetBox.classList.toggle('slide-shown');
			let timeStart = Date.now();
			let maxHeight;
			targetBox.style.boxSizing = 'border-box';
			targetBox.style.overflow = 'hidden';
			if (targetBox.classList.contains('slide-shown')) {
				targetBox.style.position = 'absolute';
				targetBox.style.display = 'block';
				targetBox.style.height = '';
				maxHeight = targetBox.offsetHeight;
				targetBox.style.height = '0';
				targetBox.style.position = '';
				targetBox.dataset.tid = setInterval(slideToggleInterval, 20, targetBox, timeStart, maxHeight);
			} else {
				maxHeight = targetBox.offsetHeight;
				targetBox.dataset.tid = setInterval(slideToggleInterval, 20, targetBox, timeStart, maxHeight);
			}
		});
	}
	function slideToggleStop(targetBox){
		let tid = targetBox.dataset.tid;
		if (tid) clearInterval(+tid);
	}
	function slideToggleInterval(targetBox, timeStart, maxHeight){
		let shown = targetBox.classList.contains('slide-shown');
		let progress = Math.min((Date.now() - timeStart) / SLIDE_DURATION, 1);
		targetBox.style.height = (shown ? progress : 1 - progress) * maxHeight + 'px';
		if (progress === 1) {
			slideToggleStop(targetBox);
			targetBox.style.boxSizing = '';
			targetBox.style.height = '';
			targetBox.style.overflow = '';
			if (!shown) targetBox.style.display = 'none';
		}
	}

})();