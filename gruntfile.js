/** Created by Maciej on 2016-04-10. */
module.exports = function(grunt) {
  grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),
      bower: {
          install: {},
          options: {
              targetDir: "assets/libs",
              layout: "byComponent",
              cleanBowerDir: true
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
              files: ['<%= bower.options.targetDir %>'],
              tasks: ['includeSource'],
              options: {
                  event: ['added', 'deleted']
              }
          }
      }
  });

    grunt.loadNpmTasks('grunt-bower-task');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-include-source');

    grunt.registerTask('default', ['bower', 'includeSource']);
    grunt.registerTask('changes', ['watch']);
};