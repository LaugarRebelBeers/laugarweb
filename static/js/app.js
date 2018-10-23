(function() {
  (function() {
    var Laugar;
    Laugar = (function() {
      class Laugar {
        /*tuk : TukTuk*/
        constructor() {}

        onload(fn) {
          return this.loaders.push(fn);
        }

        init() {
          var fn, i, len, ref, results;
          ref = this.loaders;
          results = [];
          for (i = 0, len = ref.length; i < len; i++) {
            fn = ref[i];
            results.push(typeof fn === "function" ? fn() : void 0);
          }
          return results;
        }

      };

      Laugar.prototype.loaders = [];

      return Laugar;

    }).call(this);
    /*prompt  : (args...) -> TukTuk.Modal.prompt args...
    alert   : (args...) -> TukTuk.Modal.alert args...
    confirm : (message, true_cb, false_cb) ->
    TukTuk.Modal.confirm message, true_cb, false_cb*/
    return window.Laugar = new Laugar;
  })();

  $(function() {
    return Laugar.init();
  });

  window.Key = (function() {
    class Key {
      constructor(key) {
        var model, models;
        models = Laugar.tabletop.getModel(this.constructor.MODEL);
        model = models.all().filter(function(item) {
          return item.key === key;
        })[0];
        this.key = model.key;
        this.value = model.value;
      }

    };

    Key.MODEL = "keys";

    Key.prototype.key = void 0;

    Key.prototype.value = void 0;

    return Key;

  }).call(this);

  (function() {
    var API;
    return API = (function() {
      class API {
        constructor(path1) {
          this.path = path1;
        }

        execute(message = {}, path, method, callback) {
          var xhr;
          xhr = new XMLHttpRequest;
          xhr.onreadystatechange = function(event) {
            if (xhr.readyState === 4) {
              return typeof callback === "function" ? callback(event.target) : void 0;
            }
          };
          xhr.open(method, this.path + path, true);
          if (method === "POST" || method === "PUT" || method === "PATCH") {
            return xhr.send(JSON.stringify(message));
          } else {
            return xhr.send();
          }
        }

        _get(path, callback) {
          return this.execute(null, path, "GET", callback);
        }

        _post(message, path, callback) {
          return this.execute(message, path, "POST", callback);
        }

        _put(message, path, callback) {
          return this.execute(message, path, "PUT", callback);
        }

        _del(path, callback) {
          return this.execute(null, path, "DELETE", callback);
        }

      };

      API.prototype.path = "";

      return API;

    }).call(this);
  })();

}).call(this);
