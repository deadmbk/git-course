/**
 * Created by Maciej on 2016-04-10.
 */
module.exports = function(grunt) {
  grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),
      wiredep: {
          task: {
              src: ['index.html'],
              options: {
                  directory: '<%= bower.options.targetDir %>'
              }
          }
      },
      watch: {
          files: ['<%= bower.options.targetDir %>'],
          tasks: ['wiredep']
      },
      bower: {
          install: {},
          options: {
              "targetDir": "./assets/libs",
              "layout": "byComponent",
              "cleanup": true
          }
      }
  });

    grunt.loadNpmTasks('grunt-wiredep');
    grunt.loadNpmTasks('grunt-bower-task');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['bower', 'wiredep']);
    grunt.registerTask('changes', ['watch']);
};