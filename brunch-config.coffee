module.exports = config:
    server:
        path: 'app.js'
        run: yes
    files:
        javascripts:
            joinTo:
                'assets/javascripts/app.js': /^app/
                'assets/javascripts/vendor.js': /^(vendor|bower_components)/
        stylesheets: joinTo: 'assets/stylesheets/app.css'
    plugins:
        babel:
            ignore: /^(bower_components|vendor)/
            pattern: /\.(es6|jsx)$/
        gzip:
          paths:
            javascript: 'assets/javascripts'
            stylesheet: 'assets/stylesheets'
          removeOriginalFiles: false
          renameGzipFilesToOriginalFiles: false
        imageoptimizer:
          smushit: false # if false it use jpegtran and optipng, if set to true it will use smushit
          path: 'images' # your image path within your public folder
        jsdoc:
          input: 'app/javascripts'
          recursive: false
          enabled: false
