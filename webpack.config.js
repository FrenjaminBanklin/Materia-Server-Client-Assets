const glob = require('glob');
const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const jsPath = path.join(__dirname, 'src', 'js')
const cssPath = path.join(__dirname, 'src', 'css')
const outPath = path.join(__dirname, 'dist')

// Create object with:
// Key = output name, Value = sass file
// for every scss file in the directory
// EX: { 'css/<filename>.css' : './src/css/filename.scss', ...}
let css = {}
glob.sync(path.join(cssPath, '*.scss')).forEach(function(file){
  css['css/'+path.basename(file, '.scss')+'.css'] = file
})

module.exports = {
  stats: {children: false}, // reduce noising webpack print output
  entry: Object.assign(css, {
    'js/student.js': [
      jsPath+'/materia-constants.js',
      jsPath+'/materia-namespace.js',
      jsPath+'/services/srv-user.js',
      jsPath+'/services/srv-api.js',
      jsPath+'/services/srv-datetime.js',
      jsPath+'/services/srv-widget.js',
      jsPath+'/services/srv-selectedwidget.js',
      jsPath+'/services/srv-scores.js',
      jsPath+'/controllers/ctrl-current-user.js',
      jsPath+'/controllers/ctrl-notification.js',
      jsPath+'/controllers/ctrl-login.js',
      jsPath+'/controllers/ctrl-profile.js',
      jsPath+'/controllers/ctrl-scores.js',
      jsPath+'/controllers/ctrl-settings.js',
      jsPath+'/controllers/ctrl-help.js',
      jsPath+'/controllers/ctrl-player.js',
      jsPath+'/directives/dir-beardable.js',
      jsPath+'/directives/dir-datatable.js',
      jsPath+'/directives/dir-date-validation.js',
      jsPath+'/directives/dir-fancybox.js',
      jsPath+'/directives/dir-ngenter.js',
      jsPath+'/directives/dir-scoredata.js',
      jsPath+'/directives/dir-scoregraph.js',
      jsPath+'/directives/dir-scoretable.js',
      jsPath+'/directives/dir-selecteddisplay.js',
    ],
    'js/author.js': [
      jsPath+'/materia-constants.js',
      jsPath+'/materia-namespace.js',
      jsPath+'/filters/filter-escape.js',
      jsPath+'/filters/filter-highlight.js',
      jsPath+'/services/srv-api.js',
      jsPath+'/services/srv-beard.js',
      jsPath+'/services/srv-datetime.js',
      jsPath+'/services/srv-scores.js',
      jsPath+'/services/srv-selectedwidget.js',
      jsPath+'/services/srv-user.js',
      jsPath+'/services/srv-widget.js',
      jsPath+'/controllers/ctrl-current-user.js',
      jsPath+'/controllers/ctrl-notification.js',
      jsPath+'/controllers/ctrl-create.js',
      jsPath+'/controllers/ctrl-lti.js',
      jsPath+'/controllers/ctrl-media-import.js',
      jsPath+'/controllers/ctrl-my-widgets.js',
      jsPath+'/controllers/ctrl-question-import.js',
      jsPath+'/controllers/ctrl-spotlight.js',
      jsPath+'/controllers/ctrl-widget-catalog.js',
      jsPath+'/controllers/ctrl-widget-details.js',
      jsPath+'/controllers/ctrl-selectedwidget.js',
      jsPath+'/controllers/ctrl-widget-settings.js',
      jsPath+'/controllers/ctrl-export-scores.js',
      jsPath+'/controllers/ctrl-collaboration.js',
      jsPath+'/controllers/ctrl-sidebar.js',
      jsPath+'/controllers/ctrl-login.js',
      jsPath+'/directives/dir-beardable.js',
      jsPath+'/directives/dir-datatable.js',
      jsPath+'/directives/dir-date-validation.js',
      jsPath+'/directives/dir-fancybox.js',
      jsPath+'/directives/dir-ngenter.js',
      jsPath+'/directives/dir-scoredata.js',
      jsPath+'/directives/dir-scoregraph.js',
      jsPath+'/directives/dir-scoretable.js',
      jsPath+'/directives/dir-selecteddisplay.js',
    ],
    'js/materia.js':[
      jsPath+'/materia-namespace.js',
      jsPath+'/materia/materia.coms.json.js',
      jsPath+'/materia/materia.creatorcore.js',
      jsPath+'/materia/materia.enginecore.js',
      jsPath+'/materia/materia.flashcheck.js',
      jsPath+'/materia/materia.image.js',
      jsPath+'/materia/materia.mywidgets.statistics.js',
      jsPath+'/materia/materia.mywidgets.tasks.js',
      jsPath+'/materia/materia.page.default.js',
      jsPath+'/materia/materia.score.js',
      jsPath+'/materia/materia.scores.scoregraphics.js',
      jsPath+'/materia/materia.set.throbber.js',
      jsPath+'/materia/materia.store.slideshow.js',
      jsPath+'/materia/materia.user.js',
      jsPath+'/materia/materia.util.js',
      jsPath+'/materia/materia.validate.textfield.js',
      jsPath+'/controllers/ctrl-alert.js',
    ],
    'js/admin.js':[
      jsPath+'/materia-constants.js',
      jsPath+'/materia-namespace.js',
      jsPath+'/controllers/ctrl-admin-user.js',
      jsPath+'/controllers/ctrl-admin-widget.js',
      jsPath+'/materia/materia.coms.json.js',
      jsPath+'/services/srv-admin.js',
    ],
    'js/materia.coms.json.js': [
      jsPath+'/materia-namespace.js',
      jsPath+'/materia/materia.coms.json.js',
    ],
    'js/materia.namespace.js': [
      jsPath+'/materia-namespace.js',
    ],
    'js/materia.creatorcore.js': [
      jsPath+'/materia-namespace.js',
      jsPath+'/materia/materia.creatorcore.js',
    ],
    'js/materia.enginecore.js': [
      jsPath+'/materia-namespace.js',
      jsPath+'/materia/materia.enginecore.js',
      jsPath+'/materia/materia.storage.manager.js',
      jsPath+'/materia/materia.storage.table.js',
    ],
    'js/materia.score.js': [
      jsPath+'/materia-namespace.js',
      jsPath+'/materia/materia.score.js',
    ],
    'js/materia.storage.manager.js': [
      jsPath+'/empty.js', // moved to engine core, still creates file to prevent 404 errors
    ],
    'js/materia.storage.table.js': [
      jsPath+'/empty.js', // moved to engine core, still creates file to prevent 404 errors
    ],
  }),
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env', 'es2015'],
            plugins: [require('babel-plugin-angularjs-annotate')]
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
      },
      // hack to write empty files
      {
        test: /empty\.js/,
        use: ExtractTextPlugin.extract({
          use: ['css-loader']
        })
      }
    ]
  },
  output: {
    path: outPath,
    filename: '[name]'
  },
  plugins: [
    new ExtractTextPlugin('[name]'), // pull the css out of webpack
  ]
};
