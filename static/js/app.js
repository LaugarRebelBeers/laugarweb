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

  (function() {
    var ShopifyBuyInit, loadScript, scriptURL;
    scriptURL = 'https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js';
    loadScript = function() {
      var script;
      script = document.createElement('script');
      script.async = true;
      script.src = scriptURL;
      (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(script);
      script.onload = ShopifyBuyInit;
    };
    ShopifyBuyInit = function() {
      var client;
      client = ShopifyBuy.buildClient({
        domain: 'laugar-brewery.myshopify.com',
        storefrontAccessToken: 'b6b67d2c4354b03026a66c75f4e79381'
      });
      ShopifyBuy.UI.onReady(client).then(function(ui) {
        var id, prod;
        prod = document.querySelector('[id^=\'product-component-\']');
        if (prod) {
          // let prod_comp = prod.id.split('-')[2];
          id = prod.getAttribute('data-id');
          ui.createComponent('product', {
            id: id,
            node: prod,
            moneyFormat: '%E2%82%AC%7B%7Bamount_with_comma_separator%7D%7D',
            options: {
              'product': {
                'styles': {
                  'product': {
                    '@media (min-width: 601px)': {
                      'max-width': 'calc(25% - 20px)',
                      'margin-left': '20px',
                      'margin-bottom': '50px'
                    }
                  },
                  'button': {
                    'font-size': '16px',
                    'text-transform': 'uppercase',
                    'font-weight': 'bold',
                    'padding-top': '15px',
                    'padding-bottom': '15px',
                    ':hover': {
                      'background-color': '#e60000'
                    },
                    'background-color': '#ff0000',
                    ':focus': {
                      'background-color': '#e60000'
                    },
                    'border-radius': '0',
                    'padding-left': '30px',
                    'padding-right': '30px',
                    'float': 'left'
                  },
                  'quantityInput': {
                    'font-size': '16px',
                    'padding-top': '15px',
                    'padding-bottom': '15px'
                  }
                },
                'buttonDestination': 'modal',
                'contents': {
                  'img': false,
                  'title': false,
                  'price': false,
                  'options': false
                },
                'text': {
                  'button': 'Comprar'
                }
              },
              'productSet': {
                'styles': {
                  'products': {
                    '@media (min-width: 601px)': {
                      'margin-left': '-20px'
                    }
                  }
                }
              },
              'modalProduct': {
                'contents': {
                  'img': false,
                  'imgWithCarousel': true,
                  'button': false,
                  'buttonWithQuantity': true
                },
                'styles': {
                  'product': {
                    '@media (min-width: 601px)': {
                      'max-width': '100%',
                      'margin-left': '0px',
                      'margin-bottom': '0px'
                    }
                  },
                  'button': {
                    'font-size': '16px',
                    'text-transform': 'uppercase',
                    'font-weight': 'bold',
                    'padding-top': '15px',
                    'padding-bottom': '15px',
                    ':hover': {
                      'background-color': '#e60000'
                    },
                    'background-color': '#ff0000',
                    ':focus': {
                      'background-color': '#e60000'
                    },
                    'border-radius': '0',
                    'padding-left': '30px',
                    'padding-right': '30px'
                  },
                  'quantityInput': {
                    'font-size': '16px',
                    'padding-top': '15px',
                    'padding-bottom': '15px',
                    'border-radius': '0'
                  },
                  'price': {
                    'font-size': '16px'
                  },
                  'compareAt': {
                    'font-size': '14px'
                  },
                  'unitPrice': {
                    'font-size': '14px'
                  }
                },
                'text': {
                  'button': 'Añadir al carrito'
                }
              },
              'cart': {
                'styles': {
                  'button': {
                    'font-size': '16px',
                    'text-transform': 'uppercase',
                    'font-weight': 'bold',
                    'padding-top': '15px',
                    'padding-bottom': '15px',
                    ':hover': {
                      'background-color': '#e60000'
                    },
                    'background-color': '#ff0000',
                    ':focus': {
                      'background-color': '#e60000'
                    },
                    'border-radius': '0'
                  }
                },
                'text': {
                  'total': 'Subtotal',
                  'button': 'Pagar'
                }
              },
              'toggle': {
                'styles': {
                  'toggle': {
                    'background-color': '#ff0000',
                    ':hover': {
                      'background-color': '#e60000'
                    },
                    ':focus': {
                      'background-color': '#e60000'
                    }
                  },
                  'count': {
                    'font-size': '16px'
                  }
                }
              }
            }
          });
        }
      });
    };
    if (window.ShopifyBuy) {
      if (window.ShopifyBuy.UI) {
        ShopifyBuyInit();
      } else {
        loadScript();
      }
    } else {
      loadScript();
    }
  })();

  // ---
// generated by js2coffee 2.2.0

}).call(this);
