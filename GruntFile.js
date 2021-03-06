module.exports =function(grunt){
     //Configure your tasks
     //matchdep reduces repetitive code by utilizing the package.json file to loadNpmTasks
     require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);
     grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),//load properties from the package as a JSON object
      watch: {
        options:{
          livereload: true
        },
        css:{
          files:   ['site/less/*.less'],
          tasks:   ['less']
        },
        html:{
          files:   ['site/*.jade'],
          tasks:   ['jade']
        }
      },
      copy: {
        main: {
          files:[
            {expand: true,cwd: 'site/images/',src: '**',dest: 'build/img/'},
            {expand: true, cwd: 'site/less',src: '**', dest: 'build/less/'},
            {expand: true, cwd: 'site/scripts',src: '**', dest: 'build/js/'}
          ]
        },
      },
      less:{
        production:{
          files:{
            "build/css/newStyles.css": 'site/less/all.less'
          }
        }
      },
      jade:{
        compile:{
          options: {pretty:true},
          files:[{
            expand: true,
            cwd:    'site/',
            src:    "*.jade",
            ext:    ".html",
            dest:   "build/"
          }]
        }
      }
     });

     //Register (load) the plugins to make them available in Grunt
     //matchdep makes this unnecessary, but it's added here for reference.
     // grunt.loadNpmTasks('grunt-contrib-watch');
     // grunt.loadNpmTasks('grunt-contrib-coffee');
     // grunt.loadNpmTasks('grunt-contrib-stylus');
     // grunt.loadNpmTasks('grunt-contrib-jade');
     // grunt.loadNpmTasks('grunt-contrib-imagemin');
     // grunt.loadNpmTasks('grunt-contrib-uglify');
     // grunt.loadNpmTasks('grunt-contrib-copy');

     //Run the task
     //Copy is registered but not executed. Refer to commented code in the initConfig method for details on how to add it.
     grunt.registerTask('default', ['watch', 'less', 'jade', 'copy']);
     grunt.registerTask('build', ['less','jade', 'copy']);
};
