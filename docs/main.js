
///
window.addEventListener('load', function() {
	
	const ulIndex = document.getElementById('ulIndex');
	const divMain = document.getElementById('divMain');
	
	function addTab( name, handler, active = false ) {
		
		let li = document.createElement('li');
			li.className = "nav-item";
		
		let a = document.createElement('a');
			a.innerHTML = name;
			a.className = 'nav-link';
			a.href = '#';
			a.onclick = handler;
		
		li.appendChild( a );
		ulIndex.appendChild( li );
		
		if( active ) {
			handler({ target: a });
		}
	}
	
	function disableTabs() {
		
		let aList = ulIndex.querySelectorAll('a');
		
		for( let a of aList )
			a.classList.remove('active');
		
	}
	
	function changeIFrame( url ) {
		
		disableTabs();
		
		while( divMain.firstChild ) divMain.firstChild.remove();
		
		let iframe = document.createElement('iframe');
			iframe.src = url;
		
		divMain.appendChild( iframe );
		
	}
	
	addTab( 'Voronoi Noise', function(evt) {
		changeIFrame( 'examples/voronoi-noise/index.html' );
		evt.target.classList.add('active');
	}, true);
	
	addTab( 'Geometry', function(evt) {
		changeIFrame( 'examples/geometry/index.html' );
		evt.target.classList.add('active');
	});
	
	addTab( 'Sobel Filter', function(evt) {
		changeIFrame( 'examples/sobel-image/index.html' );
		evt.target.classList.add('active');
	});
	
	addTab( 'ShaderToy', function(evt) {
		changeIFrame( 'examples/shadertoy/index.html' );
		evt.target.classList.add('active');
	});
	
	addTab( 'Prism', function(evt) {
		changeIFrame( 'examples/prism/index.html' );
		evt.target.classList.add('active');
	});
	
	addTab( 'Phong Light', function(evt) {
		changeIFrame( 'examples/phong/index.html' );
		evt.target.classList.add('active');
	});
	
	
}, false);
