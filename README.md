# Webpack study

Some simple codes for studying webpack, README.md is the study note.

**NOTE**:
- In order to make webpack.config.js portable, please use path.resolve, Linux path separator is not recognized in Windows.
- webpack gets poor error reporter, `--display-error-details` can give you more details.
- `--progress` is a little helpful.

# Env

webpack-dev-server@1.14.1
webpack@1.13.1

# Configuration

By default, configuration is stored in a file named `webpack.config.js`, but you can specify any file with `--config`. Configuration file is separated into three parts: `entry`, `output`, `module`.

See [Configuration](http://webpack.github.io/docs/configuration.html) for details.


## `entry`

`entry` means the entry point for the bundle. `entry` is a little complicated, the value can be 3 types:
1. a **string** which is resolved to a module(a file or a directory) loaded upon startup.

2. an **array** which contains several modules loaded upon startup. The last one is exported which can be used in `output.filename` as `[name]`.  // TODO: to practice.

3. a **object** whose key is chunk name which can be used in `output.filename` as `[name]`, value can be a string or an array. It means multiple entry bundles are created.  //  TODO: to practice.


## `output`

`output` affects the output of the compilation. `path`, `filename` and `publicPath` is the most important parts in `output`.


### `output.path`

`path` means output directory, `[hash]` in `path` will be replaced by the hash of the compilation.


### `output.filename`

`filename` specifies the name of each output file. You **MUST NOT** specify an absolute path here because of `output.path` option!!!
If **multiple** chunk (as with multiple entries or when using plugins like `CommonsChunkPlugin`) are created, you should use substitutions below to ensure that each file has a unique name:
  * `[name]`: the name of the chunk.
  * `[hash]`: the hash of the compilation.
  * `[chunkhash]`: the hash of the chunk.


### `output.publicPath`

`publicPath` specifies the public URL address of the output files when referenced in a browser.
`publicPath` is not necessary at compile time, set `__webpack_public_path__` dynamically at runtime in the entry point file is fine.


### `output.chunkFilename`

`chunkFilename` specifies the filename of non-entry chunks as relative path inside the `output.path` directory.
  * `[id]` is replaced by the id of the chunk.
  * `[name]` is replaced by the name of the chunk or with the id when the chunk has no name.
  * `[hash]` is replaced by the hash of the compilation.
  * `[chunkhash]` is replaced by the hash of the chunk.

If any hashing is used make sure to have a consistent ordering of modules. Use the `OccurenceOrderPlugin` or `recordsPath`.


## module

`module` specifies options affecting normal modules.


### `module.loaders`
What's `loader`? `Webpack` can only process JavaScript natively, `loader`s are used to transform other resources to JavaScript. By doing so, every resource forms a module.

`module.loaders` is an array of loaders, each item can have these properties:
* `test`: A condition must be met, usually a `RegExp`.
* `loader`: loaders combined with ! sign.
* `loaders`: an other style for loaders.
* `exclude`: A condition must not be met.
* `include`: A condition must be met.

A condition may be a `RegExp`(tested against absolute path),  a `string` containing the absolute path, a `function(absPath): bool`, or a array of one of these combined with 'and' is fine.

NOTE: Like function composition, loaders are always evaluated from right to left and from bottom to top(separate definitions).


### `module.preLoaders`/`module.postLoaders`

Just like `module.loaders`.


## Other useful configuration


### `debug`

Switch loaders to debug mode.


### `resolve.extensions`
An array of extensions that should be used to resolve modules. For example, in order to discover CoffeeScript, your array should contain `".coffee"`. Empty string means to require a module with extensions is fine.
> Default: ["", ".webpack.js", ".web.js", ".js"]

**IMPORTANT**: Setting this option will override the default, meaning that `webpack` will no longer try to resolve modules using by default extensions.


### `devtool`

Choose a developer tool to enhance debugging. See [devtool](http://webpack.github.io/docs/configuration.html#devtool) for details.


### `devServer`

Configure the behaviour of `webpack-dev-server` when the webpack config is passed to webpack-dev-server CLI.


### `plugins`

Add additional plugins to compiler, an array of plugin instance. See [List of plugins](http://webpack.github.io/docs/list-of-plugins.html) for details.


# Much More About Loaders

## Loader parameters

loader can also receive query parameters via a query string like normal URL in the WEB, For example:
~~~JavaScript
//...
loader: [
  {
    test: /\.png$/,
    loader: `url-loader?limit=60000`
  }
]
///
~~~
this config means a image whose size is smaller than the `limit` parameter can be transformed to dataURL. If the parameter is a boolean, the value can be ignored like `css-loader?modules`.

Note: The format of the query string is up to the loader. See format in the loader documentation. Most loaders accept parameters in the normal query format (?key=value&key2=value2) and as JSON object (?{"key":"value","key2":"value2"}).


## style Loaders

To transform stylesheet to a module, two loader is needed. First `css-loader` to read css, second, `style-loader` to insert `<style>` tag into the page. If scss is used, other loader should be installed. see [demo1-css](demo1-css/).

## loaders in require

It’s possible to specify the loaders in the `require` statement (or `define`, `require.ensure`, etc.). Just separate loaders from resource with `!`. Each part is resolved relative to the current directory.

It’s possible to overwrite any loaders in the configuration by prefixing the entire rule with `!`.

~~~JavaScript
require("./loader!./dir/file.txt");
// => uses the file "loader.js" in the current directory to transform
//    "file.txt" in the folder "dir".

require("jade!./template.jade");
// => uses the "jade-loader" (that is installed from npm to "node_modules")
//    to transform the file "template.jade"
//    If configuration has some transforms bound to the file, they will still be applied.

require("!style!css!less!bootstrap/less/bootstrap.less");
// => the file "bootstrap.less" in the folder "less" in the "bootstrap"
//    module (that is installed from github to "node_modules") is
//    transformed by the "less-loader". The result is transformed by the
//    "css-loader" and then by the "style-loader".
//    If configuration has some transforms bound to the file, they will not be applied.
~~~


## loaders in CLI

You can bind loaders to an extension via CLI:
~~~bash
webpack --module-bind 'css=style!css' --module-bind jade
~~~
This uses `jade` for `.jade` files and the loaders `style` and `css` for `.css` files.


# Template -- React

~~~JavaScript
module.exports = {
  // ...
  resolve: {
    extensions: ["", ".js", ".jsx"],
    // ...
  }
  // ...
}
~~~

~~~JavaScript
{
  "presets": ["react", "es2015"]  // es2015 is optional
}
~~~


# Shimming Modules

Some old libraries do not support AMD/CommonJS. Here is some solutions:

* [imports-loader](https://github.com/webpack/imports-loader): allows you to put some modules or arbitrary JavaScript onto a local variable of the file. `require("imports?$=jquery!./file.js")`
* [webpack.ProvidePlugin](http://webpack.github.io/docs/list-of-plugins.html#provideplugin)

see [Shimming modules#Importing](http://webpack.github.io/docs/shimming-modules.html#importing) or [Webpack傻瓜式指南（二）#加载jQuery plugin或者其他legacy第三方库](https://zhuanlan.zhihu.com/p/20397902?refer=FrontendMagazine)


# Code split

Webpack just supports CommonJS style and AMD style so far.

CommonJS style:

~~~JavaScript
require.ensure(["module-a", "module-b"], function(require) {
  var a = require("module-a");
  // ...
})
~~~

Note: require.ensure only loads the modules, it doesn't evaluate them.

AMD style:

~~~JavaScript
require(["module-a", "module-b"], function(a, b) {
  // ...
})
~~~

Note: It's allowed to omit the callback.

## Chunk Type

- Entry chunks. contain Webpack runtime and modules it then loads.  usually only one entry chunk per page.
- Normal chunks. don't contain Webpack runtime, it only contains a bunch of modules. These can be loaded dynamically while the application is running. A suitable wrapper (JSONP for example) is generated for these.
- Initial chunks. normal chunks that count towards initial loading time. These are generated by the `CommonsChunkPlugin`.

## plugins

- `CommonsChunkPlugin` for JavaScript.
- `extract-text-webpack-plugin` for css.

see [code splitting](http://webpack.github.io/docs/code-splitting.html) and [stylesheets#separate CSS bundle](http://webpack.github.io/docs/stylesheets.html#separate-css-bundle) for details.


# webpack-dev-server and Hot Module Replace

To enable HMR for `webpack-dev-server` two conditions must be met:
1. use either `HotModuleReplacementPlugin` in configuration or `--hot` option, never both at the same time as in that case, _the HMR plugin will actually be added twice, breaking the setup._
2. a entry point named `webpack/hot/dev-server`. If `--inline` option is specific, CLI will automatically add to this special entry point to configuration.

So the easiest way is to use `webpack-dev-server --hot --inline`.

You should see the following messages in the browser log:

> [HMR] Waiting for update signal from WDS...
> [WDS] Hot Module Replacement enabled.


In practice, to avoid commandline arguments, you should modify config file as below:

~~~JavaScript
const webpack = require("webpack");

// ...

module.exports = {
  // ...
  plugins: [
    //...
    new webpack.HotModuleReplacementPlugin()
    //...
  ],
  devServer: {
    hot: true,
    inline: true,
    // ...
  }
}
~~~

NOTE: When using the CLI it's possible to have the `webpack-dev-server` options in the configuration file under the key `devServer`. Options passed via CLI arguments override options in configuration file.

IMPORTANT: According to the official documentation

>  there is no `inline: true` in the `webpack-dev-server` configuration, because the `webpack-dev-server` module has no access to the webpack configuration. Instead the user must add the `webpack-dev-server` client entry point to the webpack configuration.

> To do this just add webpack-dev-server/client?http://<path>:<port>/ to (all) entry point(s).

However, HMR must work with `inline: true` flags without commandline arguments in practice.

Much more see [Webpack dev Sever](http://webpack.github.io/docs/webpack-dev-server.html)
and [Hot Module Replacement with Webpack](http://webpack.github.io/docs/hot-module-replacement-with-webpack.html)


# Environment variables in webpack

We can access environment variables through `process.env.Name`, this helps a lot for developing or deploying program. And we can use `webpack.DefinePlugin({name: "value"})` to define variables used in modules.


# Reference

* [webpack-demo](https://github.com/ruanyf/webpack-demos)
* [Webpack傻瓜式指南（一）](https://zhuanlan.zhihu.com/p/20367175?refer=FrontendMagazine)
* [Webpack傻瓜式指南（二）](https://zhuanlan.zhihu.com/p/20397902?refer=FrontendMagazine)
* [Learn Webpack and React(free edition online)](http://survivejs.com/webpack/introduction/)
* [Webpack your bags](https://blog.madewithlove.be/post/webpack-your-bags/)

* [what is webpack](http://webpack.github.io/docs/what-is-webpack.html)
* [using-loaders](http://webpack.github.io/docs/using-loaders.html)
* [configuration](http://webpack.github.io/docs/configuration.html)
* [list of loaders](http://webpack.github.io/docs/list-of-loaders.html)
* [list of plugins](http://webpack.github.io/docs/list-of-plugins.html)
* [Shimming modules](http://webpack.github.io/docs/shimming-modules.html)
* [code splitting](http://webpack.github.io/docs/code-splitting.html)
* [stylesheets](http://webpack.github.io/docs/stylesheets.html)
* [Webpack dev Sever](http://webpack.github.io/docs/webpack-dev-server.html)
* [Hot Module Replacement with Webpack](http://webpack.github.io/docs/hot-module-replacement-with-webpack.html)
