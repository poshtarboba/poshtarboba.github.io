(function (){

	let TAGS = {};
	let PROJECTS = [];

	let tagCloud = document.getElementById('tagCloud');
	let projectList = document.getElementById('projectList');

	loadTagsAndProjects();




	function loadTagsAndProjects(){
		let xhr = new XMLHttpRequest();
		xhr.onreadystatechange = xhrReadyLoad;
		xhr.open('GET', 'tags.json');
		xhr.send();
		function xhrReadyLoad(){
			if (xhr.readyState != 4) return;
			if (xhr.status != 200) return;
			TAGS = JSON.parse(xhr.responseText);
			loadProjects();
		}
	}

	function loadProjects(){
		let xhr = new XMLHttpRequest();
		xhr.onreadystatechange = xhrReadyLoad;
		xhr.open('GET', 'projects.json');
		xhr.send();
		function xhrReadyLoad(){
			if (xhr.readyState != 4) return;
			if (xhr.status != 200) return;
			PROJECTS = JSON.parse(xhr.responseText);
			calcTagsCount();
		}
	}

	function calcTagsCount(){
		PROJECTS.forEach(function (project){
			let tags = project.tags.split(', ');
			tags.forEach(function (tag){
				if (!TAGS[tag]) return;
				if (TAGS[tag].count) TAGS[tag].count++;
				else TAGS[tag].count = 1;
			});
		});
		createTagCloud();
	}

	function createTagCloud(){
		let html = '', em;
		for (let key in TAGS){
			if (!TAGS[key].count) continue;
			em = ' <em>' + TAGS[key].count + '</em>';
			html += '<span class="" title="' + TAGS[key].title + '">' + key + em + '</span> ';
		}
		tagCloud.innerHTML = html;
		/* !!!!!!!!! */createProjectList(PROJECTS);
	}

	function createProjectList(projects){
		let html = '', tags, img, links, linksStart = '<p class="links">Додаткові посилання:<br>';
		projects.forEach(function (project){
			img = project.img ? '<img src="thumb/' + project.img + '" alt="' + project.name + '"> ' : '';
			tags = project.tags.split(', ').reduce(getTagsHtmlForProjectList, '');
			links = (project.links && project.links.length) ? project.links.reduce(getLinksHtmlForProjectList, linksStart) + '</p>' : '';
			html += '<div class="project-item' + (img ? ' with-img' : '') + '">';
			html += '<h2><a href="' + project.link + '" target="_blank">' + img + project.name + '</a></h2>';
			html += '<p class="date-tags">' + project.date + tags + '</p>';
			html += '<p class="descr">' + project.descr + '</p>' + links + '</div>';
		});
		projectList.innerHTML = html;
	}

	function getTagsHtmlForProjectList(acc, tag){
		let em = TAGS[tag] ? ' <em>' + TAGS[tag].count + '</em>' : '';
		acc += ', <span>' + tag + em + '</span>';
		return acc;
	}
	function getLinksHtmlForProjectList(acc, link){
		let n = link.indexOf(' - ');
		let url = n < 0 ? link : link.substr(0, n);
		let text = n < 0 ? link : link.substr(n + 3);
		acc += '<a href="' + url + '">' + text + '</a><br>';
		return acc;
	}

})();