/** Created by Maciej on 2016-04-10. */
module.exports = function(grunt) {
  grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),

      wiredep: {
          task: {
              src: ['index.html'],
              options: {
                  devDependencies: true
              }
          }
      },
      includeSource: {
          options: {},
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
    grunt.loadNpmTasks('grunt-bower-task');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-include-source');

    grunt.registerTask('default', ['wiredep', 'includeSource']);
    grunt.registerTask('changes', ['watch']);
};