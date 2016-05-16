/** Created by Maciej on 2016-04-10. */
module.exports = function(grunt) {
  grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),

      php: {
          dist: {
              options: {
                  port: 5000,
                  keepalive: true,
                  open: true,
                  silent: false
              }
          }
      },

      wiredep: {
          task: {
              src: ['index.html'],
              options: {
                  devDependencies: true
              }
          }
      },

      includeSource: {
          options: {
              ordering: 'top-down'
          },
          myTarget: {
            files: {"index.html" : "index.html"}
          }
      },

      watch: {
          libs: {
              files: ['bower_components/*'],
              tasks: ['includeSource', 'wiredep'],
              options: {
                  event: ['added', 'deleted']
              }
          }
      }
  });

    grunt.loadNpmTasks('grunt-wiredep');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-include-source');
    grunt.loadNpmTasks('grunt-php');

    grunt.registerTask('default', ['wiredep', 'includeSource']);
    grunt.registerTask('changes', ['watch']);
    grunt.registerTask('start', ['php:dist']);
};