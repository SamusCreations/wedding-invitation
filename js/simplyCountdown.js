(function (exports) {
  "use strict";

  var extend, createCountdownElt, simplyCountdown;

  // Función para combinar parámetros predeterminados con los personalizados
  extend = function (out) {
    var i, obj, key;
    out = out || {};

    for (i = 1; i < arguments.length; i += 1) {
      obj = arguments[i];

      if (obj) {
        for (key in obj) {
          if (obj.hasOwnProperty(key)) {
            if (typeof obj[key] === "object") {
              extend(out[key], obj[key]);
            } else {
              out[key] = obj[key];
            }
          }
        }
      }
    }

    return out;
  };

  // Función que actualiza los valores en los contenedores personalizados
  simplyCountdown = function (elt, args) {
    var parameters = extend(
        {
          year: 2015,
          month: 6,
          day: 9,
          hours: 0,
          minutes: 0,
          seconds: 0,
          words: {
            days: "día",
            hours: "hora",
            minutes: "minuto",
            seconds: "segundo",
            pluralLetter: "s",
          },
          plural: true,
          inline: false,
          enableUtc: true,
          onEnd: function () {
            return;
          },
          refresh: 1000,
          zeroPad: false,
        },
        args
      ),
      interval,
      targetDate,
      targetTmpDate,
      now,
      nowUtc,
      secondsLeft,
      days,
      hours,
      minutes,
      seconds;

    targetTmpDate = new Date(
      parameters.year,
      parameters.month,
      parameters.day,
      parameters.hours,
      parameters.minutes,
      parameters.seconds
    );

    if (parameters.enableUtc) {
      targetDate = new Date(
        targetTmpDate.getUTCFullYear(),
        targetTmpDate.getUTCMonth(),
        targetTmpDate.getUTCDate(),
        targetTmpDate.getUTCHours(),
        targetTmpDate.getUTCMinutes(),
        targetTmpDate.getUTCSeconds()
      );
    } else {
      targetDate = targetTmpDate;
    }

    var countdownDays = document.querySelector(".simply-countdown-day");
    var countdownHours = document.querySelector(".simply-countdown-hour");
    var countdownMinutes = document.querySelector(".simply-countdown-minute");
    var countdownSeconds = document.querySelector(".simply-countdown-second");

    var refresh = function () {
      now = new Date();
      if (parameters.enableUtc) {
        nowUtc = new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate(),
          now.getHours(),
          now.getMinutes(),
          now.getSeconds()
        );
        secondsLeft = (targetDate - nowUtc.getTime()) / 1000;
      } else {
        secondsLeft = (targetDate - now.getTime()) / 1000;
      }

      if (secondsLeft > 0) {
        days = parseInt(secondsLeft / 86400, 10);
        secondsLeft = secondsLeft % 86400;

        hours = parseInt(secondsLeft / 3600, 10);
        secondsLeft = secondsLeft % 3600;

        minutes = parseInt(secondsLeft / 60, 10);
        seconds = parseInt(secondsLeft % 60, 10);
      } else {
        days = 0;
        hours = 0;
        minutes = 0;
        seconds = 0;
        window.clearInterval(interval);
        parameters.onEnd();
      }

      // Actualizando el contenido de los contenedores
      countdownDays.textContent =
        (parameters.zeroPad && days.toString().length < 2 ? "0" : "") + days;
      countdownHours.textContent =
        (parameters.zeroPad && hours.toString().length < 2 ? "0" : "") + hours;
      countdownMinutes.textContent =
        (parameters.zeroPad && minutes.toString().length < 2 ? "0" : "") +
        minutes;
      countdownSeconds.textContent =
        (parameters.zeroPad && seconds.toString().length < 2 ? "0" : "") +
        seconds;
    };

    // Refrescar de inmediato para evitar el Flash of Unstyled Content
    refresh();
    interval = window.setInterval(refresh, parameters.refresh);
  };

  exports.simplyCountdown = simplyCountdown;
})(window);
