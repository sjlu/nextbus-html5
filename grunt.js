module.exports = function(grunt) {
	grunt.loadNpmTasks('grunt-recess');
	grunt.loadNpmTasks('grunt-shell');
	grunt.loadNpmTasks('grunt-contrib');

	var recessOptions = function(bool) {
		bool = ((typeof bool === 'undefined')? false : bool);
		var config = {
			compile: true,
			compress: bool,
			noIDs: false,
			noJSPrefix: false,
			noOverqualifying: false,
			noUnderscores: false,
			noUniversalSelectors: false,
			prefixWhitespace: false,
			strictPropertyOrder: false,
			zeroUnits: false
		};

		return config;
	}

	grunt.initConfig({
		pkg: '<json:package.json>',
		meta: {},
		server: {
			port: 8000,
			base: 'public/'
		},
		concat: {
			js: {
				src: ['public/assets/js/*.js', 'public/assets/raw/twitter-bootstrap/js/*.js'],
				dest: 'public/assets/js/app.js'
			}
		},
		min: {
			js: {
				src: ['public/assets/js/*.js'],
				dest: 'public/assets/js/app.min.js'
			}
		},
		shell: {
			rsync: {
				command: 'rsync -r --exclude-from="exclude.rsync" --delete . public/',
				stdout: true
			}
		},
		recess: {
			max: {
				src: ['public/assets/less/base.less'],
				dest: 'public/assets/css/style.css',
				options: recessOptions(false)
			},
			min: {
				src: ['public/assets/less/base.less'],
				dest: 'public/assets/css/style.min.css',
				options: recessOptions(true)
			}
		},
		watch: {
			less: {
				files: ['assets/less/*.less', '/less/**/*.less'],
				tasks: 'shell:rsync concat min recess'
			},
			js: {
				files: 'assets/js/*.js',
				tasks: 'shell:rsync concat min recess'
			}
		},
		jshint: {
			options: {
				curly: true,
				eqeqeq: true,
				immed: true,
				latedef: true,
				newcap: true,
				noarg: true,
				sub: true,
				undef: true,
				boss: true,
				eqnull: true,
				browser: true
			}
		},
		uglify: {}
	});

	// Default task.
	grunt.registerTask('default', 'shell:rsync recess concat min');
   grunt.registerTask('server', 'shell:rsync recess concat min server watch');
};
