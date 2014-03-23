module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    smash: {
      all: {
        src: 'src/index.js',
        dest: './xm-el.js'
      }
    },

    uglify: {
      prod: {
        files: {
          './xm-el.min.js': ['./xm-el.js']
        }
      }
    },

    nodeunit: {
      all: ['test/**/*_test.js']
    }

  });

  grunt.loadNpmTasks('grunt-smash');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  grunt.registerTask('default', ['smash', 'uglify', 'nodeunit']);
  grunt.registerTask('test', ['nodeunit']);
};
