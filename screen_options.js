(function(){
	
	const BOSize = getBOSize();
	
	let values = {
		'so_swidth': window.screen.width,
		'so_sheight': window.screen.height,
		'so_scdepth': window.screen.colorDepth,
		'so_spdepth': window.screen.pixelDepth,
		'so_ratio': window.devicePixelRatio,
		'so_sawidth': window.screen.availWidth,
		'so_saheight': window.screen.availHeight,
		'so_saleft': window.screen.availLeft,
		'so_satop': window.screen.availTop,
		'so_app': window.navigator.appName,
		'so_appc': window.navigator.appCodeName,
		'so_appv': window.navigator.appVersion,
		'so_appp': window.navigator.oscpu,
		'so_appu': window.navigator.userAgent,
		'so_wiwidth': window.innerWidth,
		'so_wiheight': window.innerHeight,
		'so_wowidth': window.outerWidth,
		'so_woheight': window.outerHeight,
		'so_bowidth': BOSize.width,
		'so_boheight': BOSize.height,
		'so_scrollbar': getScrollbarSize()
	};
	
	for (let key in values) document.getElementById(key).innerText = values[key];
	
	function getBOSize(){
		document.body.style.margin = '0';
		let res = { width: document.body.offsetWidth, height: document.body.offsetHeight };
		document.body.style.margin = '';
		return res;
	}
	
	function getScrollbarSize(){
		let div = document.createElement('div');
		div.style.width = '1000px';
		div.style.height = '100px';
		document.body.appendChild(div);
		let box = document.createElement('div');
		box.innerHTML = 'hello';
		div.appendChild(box);
		let res = box.offsetWidth;
		div.style.overflow = 'scroll';
		res -= box.offsetWidth;
		document.body.removeChild(div);
		return res;
	}
	
})();