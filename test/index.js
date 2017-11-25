define(function(){var require = WILTON_requiresync;var module = {exports: {}};var exports = module.exports;

var assert = require('assert')
var describe = require("tape-compat")
var it = describe.it;

var db = require('mime-db')

describe('mime-db', function () {
/*
  it('should not contain types not in src/', function () {
    var path = join(__dirname, '..', 'src')
    var types = []

    // collect all source types
    fs.readdirSync(path).forEach(function (file) {
      if (!/-types\.json$/.test(file)) return
      types.push.apply(types, Object.keys(require(path + '/' + file)))
    })

    Object.keys(db).forEach(function (name) {
      assert.ok(types.indexOf(name) !== -1, 'type "' + name + '" should be in src/')
    })
  })
*/

  it('should all be mime types', function () {
    assert(Object.keys(db).every(function (name) {
      return ~name.indexOf('/') || console.log(name)
    }))
  })

  it('should not have any uppercased letters in names', function () {
    Object.keys(db).forEach(function (name) {
      assert.equal(name, name.toLowerCase(), 'type "' + name + '" should be lowercase')
    })
  })

  it('should have .json and .js as having UTF-8 charsets', function () {
    assert.equal('UTF-8', db['application/json'].charset)
    assert.equal('UTF-8', db['application/javascript'].charset)
  })

  it('should set audio/x-flac with extension=flac', function () {
    assert.equal('flac', db['audio/x-flac'].extensions[0])
  })

  it('should have guessed application/mathml+xml', function () {
    // because it doesn't have a "template"
    assert(db['application/mathml+xml'])
  })

  it('should not have an empty .extensions', function () {
    assert(Object.keys(db).every(function (name) {
      var mime = db[name]
      if (!mime.extensions) return true
      return mime.extensions.length
    }))
  })

  it('should have the default .extension as the first', function () {
    assert.equal(db['text/plain'].extensions[0], 'txt')
    assert.equal(db['video/x-matroska'].extensions[0], 'mkv')
  })
})

return module.exports;});
