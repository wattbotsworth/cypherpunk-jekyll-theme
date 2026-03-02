// Bitcoin HUD - Live network data from mempool.space
(function () {
  'use strict';

  var API = 'https://mempool.space/api';
  var UPDATE_INTERVAL = 60000;
  var intervalId = null;

  var els = {
    block: function () { return document.getElementById('hud-block'); },
    price: function () { return document.getElementById('hud-price'); },
    fees: function () { return document.getElementById('hud-fees'); },
    status: function () { return document.getElementById('hud-status'); },
    time: function () { return document.getElementById('hud-time'); }
  };

  function flash(el) {
    if (!el) return;
    el.classList.add('updating');
    setTimeout(function () { el.classList.remove('updating'); }, 500);
  }

  function updateTime() {
    var el = els.time();
    if (el) {
      var now = new Date();
      el.textContent = now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      });
    }
  }

  function fetchBlockHeight() {
    fetch(API + '/blocks/tip/height', { cache: 'no-cache' })
      .then(function (r) {
        if (!r.ok) throw new Error(r.status);
        return r.text();
      })
      .then(function (height) {
        var el = els.block();
        if (el) {
          el.textContent = parseInt(height, 10).toLocaleString();
          flash(el);
        }
      })
      .catch(function () {
        var el = els.block();
        if (el) el.textContent = '---';
      });
  }

  function fetchPrice() {
    fetch(API + '/v1/prices', { cache: 'no-cache' })
      .then(function (r) {
        if (!r.ok) throw new Error(r.status);
        return r.json();
      })
      .then(function (data) {
        var el = els.price();
        if (el && data.USD) {
          el.textContent = '$' + parseInt(data.USD, 10).toLocaleString();
          flash(el);
        }
      })
      .catch(function () {
        var el = els.price();
        if (el) el.textContent = '---';
      });
  }

  function fetchFees() {
    fetch(API + '/v1/fees/recommended', { cache: 'no-cache' })
      .then(function (r) {
        if (!r.ok) throw new Error(r.status);
        return r.json();
      })
      .then(function (fees) {
        var el = els.fees();
        if (el) {
          el.textContent = fees.fastestFee + '/' + fees.halfHourFee + '/' + fees.hourFee + ' sat/vB';
          flash(el);
        }
      })
      .catch(function () {
        var el = els.fees();
        if (el) el.textContent = '---';
      });
  }

  function updateAll() {
    fetchBlockHeight();
    fetchPrice();
    fetchFees();
    updateTime();

    var st = els.status();
    if (st) st.textContent = 'mempool.space connected';
  }

  function init() {
    // Only run on pages with the HUD
    if (!document.getElementById('hud-stats')) return;

    updateAll();
    intervalId = setInterval(updateAll, UPDATE_INTERVAL);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  window.addEventListener('beforeunload', function () {
    if (intervalId) clearInterval(intervalId);
  });
})();
