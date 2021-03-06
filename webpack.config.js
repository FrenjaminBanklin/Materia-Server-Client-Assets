const glob = require('glob');
const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin')
const jsPath = path.join(__dirname, 'src', 'js')
const cssPath = path.join(__dirname, 'src', 'css')
const outPath = path.join(__dirname, 'dist')

// Create object with:
// Key = output name, Value = sass file
// for every scss file in the directory
// EX: { 'css/<filename>.css' : './src/css/filename.scss', ...}
let cssEntries = {}
glob.sync(path.join(cssPath, '*.scss')).forEach(function(file){
  cssEntries['css/'+path.basename(file, '.scss')+'.css'] = file
})

module.exports = {
  stats: { children: false, modules: false }, // reduce noising webpack print output
  entry: {...cssEntries, ...{
    // materia.js present on every page on the server except inside widget iframe & error pages
    // contains common libs used by other scripts
    // contains everything needed by all pages that don't require a login
    'js/materia.js':[
      // polyfills
      "core-js/es6/array",
      "core-js/fn/array/includes",
      "core-js/es6/symbol",
      "core-js/es6/promise",
      "core-js/fn/object/assign",
      "core-js/fn/string/includes",
      "core-js/web/dom-collections",
      "whatwg-fetch",
      // end polyfills
      jsPath+'/materia-namespace.js',
      jsPath+'/materia/materia.coms.json.js',
      jsPath+'/materia/materia.flashcheck.js',
      jsPath+'/materia/materia.image.js',
      jsPath+'/materia/materia.page.default.js',
      jsPath+'/materia/materia.set.throbber.js',
      jsPath+'/materia/materia.store.slideshow.js',
      jsPath+'/materia/materia.user.js',
      jsPath+'/materia/materia.util.js',
      jsPath+'/materia/materia.validate.textfield.js',
      jsPath+'/materia-constants.js',
      jsPath+'/controllers/ctrl-alert.js',
      jsPath+'/controllers/ctrl-current-user.js',
      jsPath+'/controllers/ctrl-help.js',
      jsPath+'/controllers/ctrl-login.js',
      jsPath+'/controllers/ctrl-notification.js',
      jsPath+'/controllers/ctrl-spotlight.js',
      jsPath+'/controllers/ctrl-widget-catalog.js',
      jsPath+'/controllers/ctrl-widget-details.js',
      jsPath+'/services/srv-datetime.js',
      jsPath+'/services/srv-please.js',
      jsPath+'/services/srv-selectedwidget.js',
      jsPath+'/services/srv-user.js',
      jsPath+'/services/srv-widget.js',
      'ngmodal/dist/ng-modal.min.js'
    ],
    // student.js - all the stuff needed to be a student. play, view scores, profile
    'js/student.js': [
      jsPath+'/controllers/ctrl-player.js',
      jsPath+'/controllers/ctrl-profile.js',
      jsPath+'/controllers/ctrl-scores.js',
      jsPath+'/controllers/ctrl-settings.js',
      jsPath+'/directives/dir-beardable.js',
      jsPath+'/directives/dir-datatable.js',
      jsPath+'/directives/dir-date-validation.js',
      jsPath+'/directives/dir-fullscreen.js',
      jsPath+'/directives/dir-ngenter.js',
      jsPath+'/directives/dir-scoregraph.js',
      jsPath+'/directives/dir-scoretable.js',
      jsPath+'/materia/materia.scores.scoregraphics.js',
      jsPath+'/services/srv-api.js',
      jsPath+'/services/srv-scores.js',
    ],
    // author.js - all scripts for creating content: my widgets, widget authoring, lti picker
    'js/author.js': [
      jsPath+'/controllers/ctrl-collaboration.js',
      jsPath+'/controllers/ctrl-create.js',
      jsPath+'/controllers/ctrl-export-scores.js',
      jsPath+'/controllers/ctrl-lti.js',
      jsPath+'/controllers/ctrl-media-import.js',
      jsPath+'/controllers/ctrl-my-widgets.js',
      jsPath+'/controllers/ctrl-question-import.js',
      jsPath+'/controllers/ctrl-selectedwidget.js',
      jsPath+'/controllers/ctrl-widget-settings.js',
      jsPath+'/directives/dir-beardable.js',
      jsPath+'/directives/dir-datatable.js',
      jsPath+'/directives/dir-date-validation.js',
      jsPath+'/directives/dir-filedropper.js',
      jsPath+'/directives/dir-fileonchange.js',
      jsPath+'/directives/dir-ngenter.js',
      jsPath+'/directives/dir-scoredata.js',
      jsPath+'/directives/dir-scoregraph.js',
      jsPath+'/directives/dir-scoretable.js',
      jsPath+'/filters/filter-escape.js',
      jsPath+'/filters/filter-highlight.js',
      jsPath+'/filters/filter-multiword.js',
      jsPath+'/materia/materia.mywidgets.statistics.js',
      jsPath+'/services/srv-api.js',
      jsPath+'/services/srv-beard.js',
      jsPath+'/services/srv-scores.js',
    ],
    // only used on admin interface pages
    'js/admin.js':[
      jsPath+'/controllers/ctrl-admin-user.js',
      jsPath+'/controllers/ctrl-admin-widget.js',
      jsPath+'/services/srv-admin.js',
    ],
    'js/materia.creatorcore.js': [
      jsPath+'/materia-namespace.js',
      jsPath+'/materia/materia.creatorcore.js',
    ],
    'js/materia.enginecore.js': [
      jsPath+'/materia-namespace.js',
      jsPath+'/materia/materia.enginecore.js',
      jsPath+'/materia/materia.score.js',
      jsPath+'/materia/materia.storage.manager.js',
      jsPath+'/materia/materia.storage.table.js',
    ],
    'js/materia.scorecore.js': [
      jsPath+'/materia-namespace.js',
      jsPath+'/materia/materia.scorecore.js',
    ]
  }},
  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: 'pre',
        use: ['webpack-strip-block']
      },
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  targets: {
                    browsers: [
                      ">0.25%",
                      "not ie 10",
                      "not op_mini all"
                    ]
                  },
                }
              ]
            ],
            plugins: [
              require('babel-plugin-angularjs-annotate'),]
          }
        }
      },
      // SASS files
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          use: [
            'css-loader?url=false', // disable the css-loaders' function of locating image urls
            'sass-loader'
          ]
        })
      }
    ]
  },
  output: {
    path: outPath,
    filename: '[name]'
  },
  plugins: [
    new CleanWebpackPlugin(), // clear the dist folder before build
    new ExtractTextPlugin('[name]'), // pull the css out of webpack
  ],
  resolve: {
      alias: {
          // allow the code to require from node_modules
          'node_modules': path.join(__dirname, 'node_modules')
      }
  }
};
