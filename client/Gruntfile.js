module.exports = function(grunt) {
    grunt.initConfig({
        jasmine : {
            pivotal: {
                src: 'js/**/*.js',
                options: {
                    specs: 'js/**/*test.js'
                }
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-jasmine');
}