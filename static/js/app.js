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
    var API, MailGun, TabletopHelper;
    API = (function() {
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
    MailGun = (function() {
      class MailGun {
        constructor(url, key) {
          url = new URL(url);
          url.hostname = `${key}@${url.hostname}`;
          this.path = url.toString().replace("%40", "@");
        }

        sendMail(request, callback) {
          var form, iframe, input, item;
          form = document.createElement("form");
          form.setAttribute("method", "post");
          form.setAttribute("action", this.path + "/messages");
          for (item in request) {
            input = document.createElement("input");
            input.setAttribute("type", "hidden");
            input.setAttribute("name", item);
            input.setAttribute("value", request[item]);
            form.appendChild(input);
          }
          iframe = document.createElement("iframe");
          document.body.appendChild(iframe);
          iframe.contentDocument.body.appendChild(form);
          iframe.onload = function(data) {
            data.target.remove();
            return typeof callback === "function" ? callback() : void 0;
          };
          return form.submit();
        }

      };

      MailGun.prototype.path = void 0;

      return MailGun;

    }).call(this);
    TabletopHelper = (function() {
      class TabletopHelper {
        constructor(key, callback) {
          Tabletop.init({
            key: key,
            callback: (data, tabletop) => {
              this.tabletop = tabletop;
              return typeof callback === "function" ? callback(this) : void 0;
            },
            simpleSheet: false
          });
        }

        getModel(key) {
          return this.tabletop.models[key];
        }

      };

      TabletopHelper.prototype.tabletop = {};

      return TabletopHelper;

    }).call(this);
    Laugar.tabletop = new TabletopHelper("1aosZztzhSE4RD7xDBOym0kuI-2aCf6P6FTj91X0SpZM", function() {
      return Laugar.mailgun = (function() {
        var key, url;
        key = new Key("mailgun");
        url = new Key("mailgun-url");
        return new MailGun(url.value, key.value);
      })();
    });
    return Laugar.testMail = {
      from: "a.berzosa.iglesias@gmail.com",
      to: "aberigle@uhurus.com",
      subject: "holi",
      text: "hello world!"
    };
  })();

}).call(this);
