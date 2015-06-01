 /*
  * NSIS Markdown Documentation
  * https://github.com/NSIS-Dev/Documentation
  *
  */

module.exports = function(grunt) {

    var mdfiles = ['**/*.md']

    grunt.initConfig({

        // default task
        mdlint: {
          files: {
            src: mdfiles
          }
        }

    });

    grunt.loadNpmTasks('grunt-mdlint');
    grunt.registerTask('default', 'mdlint');

    // task shortcuts
    grunt.registerTask('lint',   'mdlint');
 };