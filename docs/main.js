
///
window.addEventListener('load', function() {
	
	const ulIndex = document.getElementById('ulIndex');
	const divMain = document.getElementById('divMain');
	
	function addTab( name, handler ) {
		
		let li = document.createElement('li');
			li.className = "nav-item";
		
		let a = document.createElement('a');
			a.innerHTML = name;
			a.className = 'nav-link';
			a.href = '#';
			a.onclick = handler;
		
		li.appendChild( a );
		ulIndex.appendChild( li );
		
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
	
	
	addTab( 'Geometry', function() {
		changeIFrame( 'examples/geometry/index.html' );
	});
	
	addTab( 'Voronoi Noise', function() {
		changeIFrame( 'examples/voronoi-noise/index.html' );
	});
	
	addTab( 'Sobel Filter', function() {
		changeIFrame( 'examples/sobel-image/index.html' );
	});
	
	addTab( 'ShaderToy', function() {
		changeIFrame( 'examples/shadertoy/index.html' );
	});
	
	addTab( 'Prism', function() {
		changeIFrame( 'examples/prism/index.html' );
	});
	
	addTab( 'Phong Light', function() {
		changeIFrame( 'examples/phong/index.html' );
	});
	
	
}, false);
