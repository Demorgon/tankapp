window.Element && !Element.prototype.closest && (Element.prototype.closest = function (e) {
    var t, n = (this.document || this.ownerDocument).querySelectorAll(e),
        o = this;
    do {
        for (t = n.length; 0 <= --t && n.item(t) !== o;);
    } while (t < 0 && (o = o.parentElement));
    return o
}), (function () {
    if ("function" == typeof window.CustomEvent) return;

    function e(e, t) {
        t = t || {
            bubbles: !1,
            cancelable: !1,
            detail: void 0
        };
        var n = document.createEvent("CustomEvent");
        return n.initCustomEvent(e, t.bubbles, t.cancelable, t.detail), n
    }
    e.prototype = window.Event.prototype, window.CustomEvent = e
})(), (function () {
    for (var i = 0, e = ["ms", "moz", "webkit", "o"], t = 0; t < e.length && !window.requestAnimationFrame; ++t) window.requestAnimationFrame = window[e[t] + "RequestAnimationFrame"], window.cancelAnimationFrame = window[e[t] + "CancelAnimationFrame"] || window[e[t] + "CancelRequestAnimationFrame"];
    window.requestAnimationFrame || (window.requestAnimationFrame = function (e, t) {
        var n = (new Date).getTime(),
            o = Math.max(0, 16 - (n - i)),
            a = window.setTimeout((function () {
                e(n + o)
            }), o);
        return i = n + o, a
    }), window.cancelAnimationFrame || (window.cancelAnimationFrame = function (e) {
        clearTimeout(e)
    })
})(), (function (e, t) {
    "function" == typeof define && define.amd ? define([], (function () {
        return t(e)
    })) : "object" == typeof exports ? module.exports = t(e) : e.SmoothScroll = t(e)
})("undefined" != typeof global ? global : "undefined" != typeof window ? window : this, (function (M) {
    "use strict";
    var I = {
            ignore: "[data-scroll-ignore]",
            header: null,
            topOnEmptyHash: !0,
            speed: 500,
            speedAsDuration: !1,
            durationMax: null,
            durationMin: null,
            clip: !0,
            offset: 0,
            easing: "easeInOutCubic",
            customEasing: null,
            updateURL: !0,
            popstate: !0,
            emitEvents: !0
        },
        F = function () {
            var n = {};
            return Array.prototype.forEach.call(arguments, (function (e) {
                for (var t in e) {
                    if (!e.hasOwnProperty(t)) return;
                    n[t] = e[t]
                }
            })), n
        },
        i = function (e) {
            "#" === e.charAt(0) && (e = e.substr(1));
            for (var t, n = String(e), o = n.length, a = -1, i = "", r = n.charCodeAt(0); ++a < o;) {
                if (0 === (t = n.charCodeAt(a))) throw new InvalidCharacterError("Invalid character: the input contains U+0000.");
                1 <= t && t <= 31 || 127 == t || 0 === a && 48 <= t && t <= 57 || 1 === a && 48 <= t && t <= 57 && 45 === r ? i += "\\" + t.toString(16) + " " : i += 128 <= t || 45 === t || 95 === t || 48 <= t && t <= 57 || 65 <= t && t <= 90 || 97 <= t && t <= 122 ? n.charAt(a) : "\\" + n.charAt(a)
            }
            return "#" + i
        },
        L = function () {
            return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight, document.body.offsetHeight, document.documentElement.offsetHeight, document.body.clientHeight, document.documentElement.clientHeight)
        },
        x = function (e) {
            return e ? (t = e, parseInt(M.getComputedStyle(t).height, 10) + e.offsetTop) : 0;
            var t
        },
        H = function (e, t, n, o) {
            if (t.emitEvents && "function" == typeof M.CustomEvent) {
                var a = new CustomEvent(e, {
                    bubbles: !0,
                    detail: {
                        anchor: n,
                        toggle: o
                    }
                });
                document.dispatchEvent(a)
            }
        };
    return function (o, e) {
        var A, a, O, C, q = {};
        q.cancelScroll = function (e) {
            cancelAnimationFrame(C), C = null, e || H("scrollCancel", A)
        }, q.animateScroll = function (r, c, e) {
            q.cancelScroll();
            var s = F(A || I, e || {}),
                u = "[object Number]" === Object.prototype.toString.call(r),
                t = u || !r.tagName ? null : r;
            if (u || t) {
                var l = M.pageYOffset;
                s.header && !O && (O = document.querySelector(s.header));
                var n, o, a, m, i, d, f, h, p = x(O),
                    g = u ? r : (function (e, t, n, o) {
                        var a = 0;
                        if (e.offsetParent)
                            for (; a += e.offsetTop, e = e.offsetParent;);
                        return a = Math.max(a - t - n, 0), o && (a = Math.min(a, L() - M.innerHeight)), a
                    })(t, p, parseInt("function" == typeof s.offset ? s.offset(r, c) : s.offset, 10), s.clip),
                    y = g - l,
                    w = L(),
                    v = 0,
                    S = (n = y, a = (o = s).speedAsDuration ? o.speed : Math.abs(n / 1e3 * o.speed), o.durationMax && a > o.durationMax ? o.durationMax : o.durationMin && a < o.durationMin ? o.durationMin : parseInt(a, 10)),
                    E = function (e, t) {
                        var n, o, a, i = M.pageYOffset;
                        if (e == t || i == t || (l < t && M.innerHeight + i) >= w) return q.cancelScroll(!0), o = t, a = u, 0 === (n = r) && document.body.focus(), a || (n.focus(), document.activeElement !== n && (n.setAttribute("tabindex", "-1"), n.focus(), n.style.outline = "none"), M.scrollTo(0, o)), H("scrollStop", s, r, c), !(C = m = null)
                    },
                    b = function (e) {
                        var t, n, o;
                        m || (m = e), v += e - m, d = l + y * (n = i = 1 < (i = 0 === S ? 0 : v / S) ? 1 : i, "easeInQuad" === (t = s).easing && (o = n * n), "easeOutQuad" === t.easing && (o = n * (2 - n)), "easeInOutQuad" === t.easing && (o = n < .5 ? 2 * n * n : (4 - 2 * n) * n - 1), "easeInCubic" === t.easing && (o = n * n * n), "easeOutCubic" === t.easing && (o = --n * n * n + 1), "easeInOutCubic" === t.easing && (o = n < .5 ? 4 * n * n * n : (n - 1) * (2 * n - 2) * (2 * n - 2) + 1), "easeInQuart" === t.easing && (o = n * n * n * n), "easeOutQuart" === t.easing && (o = 1 - --n * n * n * n), "easeInOutQuart" === t.easing && (o = n < .5 ? 8 * n * n * n * n : 1 - 8 * --n * n * n * n), "easeInQuint" === t.easing && (o = n * n * n * n * n), "easeOutQuint" === t.easing && (o = 1 + --n * n * n * n * n), "easeInOutQuint" === t.easing && (o = n < .5 ? 16 * n * n * n * n * n : 1 + 16 * --n * n * n * n * n), t.customEasing && (o = t.customEasing(n)), o || n), M.scrollTo(0, Math.floor(d)), E(d, g) || (C = M.requestAnimationFrame(b), m = e)
                    };
                0 === M.pageYOffset && M.scrollTo(0, 0), f = r, h = s, u || history.pushState && h.updateURL && history.pushState({
                    smoothScroll: JSON.stringify(h),
                    anchor: f.id
                }, document.title, f === document.documentElement ? "#top" : "#" + f.id), H("scrollStart", s, r, c), q.cancelScroll(!0), M.requestAnimationFrame(b)
            }
        };
        var t = function (e) {
                if (!("matchMedia" in M && M.matchMedia("(prefers-reduced-motion)").matches) && 0 === e.button && !e.metaKey && !e.ctrlKey && "closest" in e.target && (a = e.target.closest(o)) && "a" === a.tagName.toLowerCase() && !e.target.closest(A.ignore) && a.hostname === M.location.hostname && a.pathname === M.location.pathname && /#/.test(a.href)) {
                    var t = i(a.hash),
                        n = A.topOnEmptyHash && "#" === t ? document.documentElement : document.querySelector(t);
                    (n = n || "#top" !== t ? n : document.documentElement) && (e.preventDefault(), (function (e) {
                        if (history.replaceState && e.updateURL && !history.state) {
                            var t = M.location.hash;
                            t = t || M.pageYOffset, history.replaceState({
                                smoothScroll: JSON.stringify(e),
                                anchor: t || M.pageYOffset
                            }, document.title, t || M.location.href)
                        }
                    })(A), q.animateScroll(n, a))
                }
            },
            n = function (e) {
                if (null !== history.state && history.state.smoothScroll && history.state.smoothScroll === JSON.stringify(A)) {
                    var t = history.state.anchor;
                    t && 0 !== t && !(t = document.querySelector(i(history.state.anchor))) || q.animateScroll(t, null, {
                        updateURL: !1
                    })
                }
            };
        return q.destroy = function () {
            A && (document.removeEventListener("click", t, !1), M.removeEventListener("popstate", n, !1), q.cancelScroll(), C = O = a = A = null)
        }, q.init = function (e) {
            if (!("querySelector" in document && "addEventListener" in M && "requestAnimationFrame" in M && "closest" in M.Element.prototype)) throw "Smooth Scroll: This browser does not support the required JavaScript methods and browser APIs.";
            q.destroy(), A = F(I, e || {}), O = A.header ? document.querySelector(A.header) : null, document.addEventListener("click", t, !1), A.updateURL && A.popstate && M.addEventListener("popstate", n, !1)
        }, q.init(e), q
    }
}));
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], function () {
            return factory(root);
        });
    } else if (typeof exports === 'object') {
        module.exports = factory(root);
    } else {
        root.SmoothScroll = factory(root);
    }
})(typeof global !== 'undefined' ? global : typeof window !== 'undefined' ? window : this, function (window) {

    'use strict';

    //
    // Default settings
    //

    var defaults = {

        // Selectors
        ignore: '[data-scroll-ignore]',
        header: null,
        topOnEmptyHash: true,

        // Speed & Duration
        speed: 500,
        speedAsDuration: false,
        durationMax: null,
        durationMin: null,
        clip: true,
        offset: 0,

        // Easing
        easing: 'easeInOutCubic',
        customEasing: null,

        // History
        updateURL: true,
        popstate: true,

        // Custom Events
        emitEvents: true

    };


    //
    // Utility Methods
    //

    /**
     * Check if browser supports required methods
     * @return {Boolean} Returns true if all required methods are supported
     */
    var supports = function () {
        return (
            'querySelector' in document &&
            'addEventListener' in window &&
            'requestAnimationFrame' in window &&
            'closest' in window.Element.prototype
        );
    };

    /**
     * Merge two or more objects together.
     * @param   {Object}   objects  The objects to merge together
     * @returns {Object}            Merged values of defaults and options
     */
    var extend = function () {
        var merged = {};
        Array.prototype.forEach.call(arguments, function (obj) {
            for (var key in obj) {
                if (!obj.hasOwnProperty(key)) return;
                merged[key] = obj[key];
            }
        });
        return merged;
    };

    /**
     * Check to see if user prefers reduced motion
     * @param  {Object} settings Script settings
     */
    var reduceMotion = function (settings) {
        if ('matchMedia' in window && window.matchMedia('(prefers-reduced-motion)').matches) {
            return true;
        }
        return false;
    };

    /**
     * Get the height of an element.
     * @param  {Node} elem The element to get the height of
     * @return {Number}    The element's height in pixels
     */
    var getHeight = function (elem) {
        return parseInt(window.getComputedStyle(elem).height, 10);
    };

    /**
     * Escape special characters for use with querySelector
     * @author Mathias Bynens
     * @link https://github.com/mathiasbynens/CSS.escape
     * @param {String} id The anchor ID to escape
     */
    var escapeCharacters = function (id) {

        // Remove leading hash
        if (id.charAt(0) === '#') {
            id = id.substr(1);
        }

        var string = String(id);
        var length = string.length;
        var index = -1;
        var codeUnit;
        var result = '';
        var firstCodeUnit = string.charCodeAt(0);
        while (++index < length) {
            codeUnit = string.charCodeAt(index);
            // Note: there’s no need to special-case astral symbols, surrogate
            // pairs, or lone surrogates.

            // If the character is NULL (U+0000), then throw an
            // `InvalidCharacterError` exception and terminate these steps.
            if (codeUnit === 0x0000) {
                throw new InvalidCharacterError(
                    'Invalid character: the input contains U+0000.'
                );
            }

            if (
                // If the character is in the range [\1-\1F] (U+0001 to U+001F) or is
                // U+007F, […]
                (codeUnit >= 0x0001 && codeUnit <= 0x001F) || codeUnit == 0x007F ||
                // If the character is the first character and is in the range [0-9]
                // (U+0030 to U+0039), […]
                (index === 0 && codeUnit >= 0x0030 && codeUnit <= 0x0039) ||
                // If the character is the second character and is in the range [0-9]
                // (U+0030 to U+0039) and the first character is a `-` (U+002D), […]
                (
                    index === 1 &&
                    codeUnit >= 0x0030 && codeUnit <= 0x0039 &&
                    firstCodeUnit === 0x002D
                )
            ) {
                // http://dev.w3.org/csswg/cssom/#escape-a-character-as-code-point
                result += '\\' + codeUnit.toString(16) + ' ';
                continue;
            }

            // If the character is not handled by one of the above rules and is
            // greater than or equal to U+0080, is `-` (U+002D) or `_` (U+005F), or
            // is in one of the ranges [0-9] (U+0030 to U+0039), [A-Z] (U+0041 to
            // U+005A), or [a-z] (U+0061 to U+007A), […]
            if (
                codeUnit >= 0x0080 ||
                codeUnit === 0x002D ||
                codeUnit === 0x005F ||
                codeUnit >= 0x0030 && codeUnit <= 0x0039 ||
                codeUnit >= 0x0041 && codeUnit <= 0x005A ||
                codeUnit >= 0x0061 && codeUnit <= 0x007A
            ) {
                // the character itself
                result += string.charAt(index);
                continue;
            }

            // Otherwise, the escaped character.
            // http://dev.w3.org/csswg/cssom/#escape-a-character
            result += '\\' + string.charAt(index);

        }

        // Return sanitized hash
        return '#' + result;

    };

    /**
     * Calculate the easing pattern
     * @link https://gist.github.com/gre/1650294
     * @param {String} type Easing pattern
     * @param {Number} time Time animation should take to complete
     * @returns {Number}
     */
    var easingPattern = function (settings, time) {
        var pattern;

        // Default Easing Patterns
        if (settings.easing === 'easeInQuad') pattern = time * time; // accelerating from zero velocity
        if (settings.easing === 'easeOutQuad') pattern = time * (2 - time); // decelerating to zero velocity
        if (settings.easing === 'easeInOutQuad') pattern = time < 0.5 ? 2 * time * time : -1 + (4 - 2 * time) * time; // acceleration until halfway, then deceleration
        if (settings.easing === 'easeInCubic') pattern = time * time * time; // accelerating from zero velocity
        if (settings.easing === 'easeOutCubic') pattern = (--time) * time * time + 1; // decelerating to zero velocity
        if (settings.easing === 'easeInOutCubic') pattern = time < 0.5 ? 4 * time * time * time : (time - 1) * (2 * time - 2) * (2 * time - 2) + 1; // acceleration until halfway, then deceleration
        if (settings.easing === 'easeInQuart') pattern = time * time * time * time; // accelerating from zero velocity
        if (settings.easing === 'easeOutQuart') pattern = 1 - (--time) * time * time * time; // decelerating to zero velocity
        if (settings.easing === 'easeInOutQuart') pattern = time < 0.5 ? 8 * time * time * time * time : 1 - 8 * (--time) * time * time * time; // acceleration until halfway, then deceleration
        if (settings.easing === 'easeInQuint') pattern = time * time * time * time * time; // accelerating from zero velocity
        if (settings.easing === 'easeOutQuint') pattern = 1 + (--time) * time * time * time * time; // decelerating to zero velocity
        if (settings.easing === 'easeInOutQuint') pattern = time < 0.5 ? 16 * time * time * time * time * time : 1 + 16 * (--time) * time * time * time * time; // acceleration until halfway, then deceleration

        // Custom Easing Patterns
        if (!!settings.customEasing) pattern = settings.customEasing(time);

        return pattern || time; // no easing, no acceleration
    };

    /**
     * Determine the document's height
     * @returns {Number}
     */
    var getDocumentHeight = function () {
        return Math.max(
            document.body.scrollHeight, document.documentElement.scrollHeight,
            document.body.offsetHeight, document.documentElement.offsetHeight,
            document.body.clientHeight, document.documentElement.clientHeight
        );
    };

    /**
     * Calculate how far to scroll
     * Clip support added by robjtede - https://github.com/cferdinandi/smooth-scroll/issues/405
     * @param {Element} anchor       The anchor element to scroll to
     * @param {Number}  headerHeight Height of a fixed header, if any
     * @param {Number}  offset       Number of pixels by which to offset scroll
     * @param {Boolean} clip         If true, adjust scroll distance to prevent abrupt stops near the bottom of the page
     * @returns {Number}
     */
    var getEndLocation = function (anchor, headerHeight, offset, clip) {
        var location = 0;
        if (anchor.offsetParent) {
            do {
                location += anchor.offsetTop;
                anchor = anchor.offsetParent;
            } while (anchor);
        }
        location = Math.max(location - headerHeight - offset, 0);
        if (clip) {
            location = Math.min(location, getDocumentHeight() - window.innerHeight);
        }
        return location;
    };

    /**
     * Get the height of the fixed header
     * @param  {Node}   header The header
     * @return {Number}        The height of the header
     */
    var getHeaderHeight = function (header) {
        return !header ? 0 : (getHeight(header) + header.offsetTop);
    };

    /**
     * Calculate the speed to use for the animation
     * @param  {Number} distance The distance to travel
     * @param  {Object} settings The plugin settings
     * @return {Number}          How fast to animate
     */
    var getSpeed = function (distance, settings) {
        var speed = settings.speedAsDuration ? settings.speed : Math.abs(distance / 1000 * settings.speed);
        if (settings.durationMax && speed > settings.durationMax) return settings.durationMax;
        if (settings.durationMin && speed < settings.durationMin) return settings.durationMin;
        return parseInt(speed, 10);
    };

    var setHistory = function (options) {

        // Make sure this should run
        if (!history.replaceState || !options.updateURL || history.state) return;

        // Get the hash to use
        var hash = window.location.hash;
        hash = hash ? hash : window.pageYOffset;

        // Set a default history
        history.replaceState({
                smoothScroll: JSON.stringify(options),
                anchor: hash ? hash : window.pageYOffset
            },
            document.title,
            hash ? hash : window.location.href
        );

    };

    /**
     * Update the URL
     * @param  {Node}    anchor  The anchor that was scrolled to
     * @param  {Boolean} isNum   If true, anchor is a number
     * @param  {Object}  options Settings for Smooth Scroll
     */
    var updateURL = function (anchor, isNum, options) {

        // Bail if the anchor is a number
        if (isNum) return;

        // Verify that pushState is supported and the updateURL option is enabled
        if (!history.pushState || !options.updateURL) return;

        // Update URL
        history.pushState({
                smoothScroll: JSON.stringify(options),
                anchor: anchor.id
            },
            document.title,
            anchor === document.documentElement ? '#top' : '#' + anchor.id
        );

    };

    /**
     * Bring the anchored element into focus
     * @param {Node}     anchor      The anchor element
     * @param {Number}   endLocation The end location to scroll to
     * @param {Boolean}  isNum       If true, scroll is to a position rather than an element
     */
    var adjustFocus = function (anchor, endLocation, isNum) {

        // Is scrolling to top of page, blur
        if (anchor === 0) {
            document.body.focus();
        }

        // Don't run if scrolling to a number on the page
        if (isNum) return;

        // Otherwise, bring anchor element into focus
        anchor.focus();
        if (document.activeElement !== anchor) {
            anchor.setAttribute('tabindex', '-1');
            anchor.focus();
            anchor.style.outline = 'none';
        }
        window.scrollTo(0, endLocation);

    };

    /**
     * Emit a custom event
     * @param  {String} type    The event type
     * @param  {Object} options The settings object
     * @param  {Node}   anchor  The anchor element
     * @param  {Node}   toggle  The toggle element
     */
    var emitEvent = function (type, options, anchor, toggle) {
        if (!options.emitEvents || typeof window.CustomEvent !== 'function') return;
        var event = new CustomEvent(type, {
            bubbles: true,
            detail: {
                anchor: anchor,
                toggle: toggle
            }
        });
        document.dispatchEvent(event);
    };


    //
    // SmoothScroll Constructor
    //

    var SmoothScroll = function (selector, options) {

        //
        // Variables
        //

        var smoothScroll = {}; // Object for public APIs
        var settings, anchor, toggle, fixedHeader, eventTimeout, animationInterval;


        //
        // Methods
        //

        /**
         * Cancel a scroll-in-progress
         */
        smoothScroll.cancelScroll = function (noEvent) {
            cancelAnimationFrame(animationInterval);
            animationInterval = null;
            if (noEvent) return;
            emitEvent('scrollCancel', settings);
        };

        /**
         * Start/stop the scrolling animation
         * @param {Node|Number} anchor  The element or position to scroll to
         * @param {Element}     toggle  The element that toggled the scroll event
         * @param {Object}      options
         */
        smoothScroll.animateScroll = function (anchor, toggle, options) {

            // Cancel any in progress scrolls
            smoothScroll.cancelScroll();

            // Local settings
            var _settings = extend(settings || defaults, options || {}); // Merge user options with defaults

            // Selectors and variables
            var isNum = Object.prototype.toString.call(anchor) === '[object Number]' ? true : false;
            var anchorElem = isNum || !anchor.tagName ? null : anchor;
            if (!isNum && !anchorElem) return;
            var startLocation = window.pageYOffset; // Current location on the page
            if (_settings.header && !fixedHeader) {
                // Get the fixed header if not already set
                fixedHeader = document.querySelector(_settings.header);
            }
            var headerHeight = getHeaderHeight(fixedHeader);
            var endLocation = isNum ? anchor : getEndLocation(anchorElem, headerHeight, parseInt((typeof _settings.offset === 'function' ? _settings.offset(anchor, toggle) : _settings.offset), 10), _settings.clip); // Location to scroll to
            var distance = endLocation - startLocation; // distance to travel
            var documentHeight = getDocumentHeight();
            var timeLapsed = 0;
            var speed = getSpeed(distance, _settings);
            var start, percentage, position;

            /**
             * Stop the scroll animation when it reaches its target (or the bottom/top of page)
             * @param {Number} position Current position on the page
             * @param {Number} endLocation Scroll to location
             * @param {Number} animationInterval How much to scroll on this loop
             */
            var stopAnimateScroll = function (position, endLocation) {

                // Get the current location
                var currentLocation = window.pageYOffset;

                // Check if the end location has been reached yet (or we've hit the end of the document)
                if (position == endLocation || currentLocation == endLocation || ((startLocation < endLocation && window.innerHeight + currentLocation) >= documentHeight)) {

                    // Clear the animation timer
                    smoothScroll.cancelScroll(true);

                    // Bring the anchored element into focus
                    adjustFocus(anchor, endLocation, isNum);

                    // Emit a custom event
                    emitEvent('scrollStop', _settings, anchor, toggle);

                    // Reset start
                    start = null;
                    animationInterval = null;

                    return true;

                }
            };

            /**
             * Loop scrolling animation
             */
            var loopAnimateScroll = function (timestamp) {
                if (!start) {
                    start = timestamp;
                }
                timeLapsed += timestamp - start;
                percentage = speed === 0 ? 0 : (timeLapsed / speed);
                percentage = (percentage > 1) ? 1 : percentage;
                position = startLocation + (distance * easingPattern(_settings, percentage));
                window.scrollTo(0, Math.floor(position));
                if (!stopAnimateScroll(position, endLocation)) {
                    animationInterval = window.requestAnimationFrame(loopAnimateScroll);
                    start = timestamp;
                }
            };

            /**
             * Reset position to fix weird iOS bug
             * @link https://github.com/cferdinandi/smooth-scroll/issues/45
             */
            if (window.pageYOffset === 0) {
                window.scrollTo(0, 0);
            }

            // Update the URL
            updateURL(anchor, isNum, _settings);

            // Emit a custom event
            emitEvent('scrollStart', _settings, anchor, toggle);

            // Start scrolling animation
            smoothScroll.cancelScroll(true);
            window.requestAnimationFrame(loopAnimateScroll);

        };

        /**
         * If smooth scroll element clicked, animate scroll
         */
        var clickHandler = function (event) {

            // Don't run if the user prefers reduced motion
            if (reduceMotion(settings)) return;

            // Don't run if right-click or command/control + click
            if (event.button !== 0 || event.metaKey || event.ctrlKey) return;

            // Check if event.target has closest() method
            // By @totegi - https://github.com/cferdinandi/smooth-scroll/pull/401/
            if (!('closest' in event.target)) return;

            // Check if a smooth scroll link was clicked
            toggle = event.target.closest(selector);
            if (!toggle || toggle.tagName.toLowerCase() !== 'a' || event.target.closest(settings.ignore)) return;

            // Only run if link is an anchor and points to the current page
            if (toggle.hostname !== window.location.hostname || toggle.pathname !== window.location.pathname || !/#/.test(toggle.href)) return;

            // Get an escaped version of the hash
            var hash = escapeCharacters(toggle.hash);

            // Get the anchored element
            var anchor = settings.topOnEmptyHash && hash === '#' ? document.documentElement : document.querySelector(hash);
            anchor = !anchor && hash === '#top' ? document.documentElement : anchor;

            // If anchored element exists, scroll to it
            if (!anchor) return;
            event.preventDefault();
            setHistory(settings);
            smoothScroll.animateScroll(anchor, toggle);

        };

        /**
         * Animate scroll on popstate events
         */
        var popstateHandler = function (event) {

            // Stop if history.state doesn't exist (ex. if clicking on a broken anchor link).
            // fixes `Cannot read property 'smoothScroll' of null` error getting thrown.
            if (history.state === null) return;

            // Only run if state is a popstate record for this instantiation
            if (!history.state.smoothScroll || history.state.smoothScroll !== JSON.stringify(settings)) return;

            // Only run if state includes an anchor

            // if (!history.state.anchor && history.state.anchor !== 0) return;

            // Get the anchor
            var anchor = history.state.anchor;
            if (anchor && anchor !== 0) {
                anchor = document.querySelector(escapeCharacters(history.state.anchor));
                if (!anchor) return;
            }

            // Animate scroll to anchor link
            smoothScroll.animateScroll(anchor, null, {
                updateURL: false
            });

        };

        /**
         * Destroy the current initialization.
         */
        smoothScroll.destroy = function () {

            // If plugin isn't already initialized, stop
            if (!settings) return;

            // Remove event listeners
            document.removeEventListener('click', clickHandler, false);
            window.removeEventListener('popstate', popstateHandler, false);

            // Cancel any scrolls-in-progress
            smoothScroll.cancelScroll();

            // Reset variables
            settings = null;
            anchor = null;
            toggle = null;
            fixedHeader = null;
            eventTimeout = null;
            animationInterval = null;

        };

        /**
         * Initialize Smooth Scroll
         * @param {Object} options User settings
         */
        smoothScroll.init = function (options) {

            // feature test
            if (!supports()) throw 'Smooth Scroll: This browser does not support the required JavaScript methods and browser APIs.';

            // Destroy any existing initializations
            smoothScroll.destroy();

            // Selectors and variables
            settings = extend(defaults, options || {}); // Merge user options with defaults
            fixedHeader = settings.header ? document.querySelector(settings.header) : null; // Get the fixed header

            // When a toggle is clicked, run the click handler
            document.addEventListener('click', clickHandler, false);

            // If updateURL and popState are enabled, listen for pop events
            if (settings.updateURL && settings.popstate) {
                window.addEventListener('popstate', popstateHandler, false);
            }

        };


        //
        // Initialize plugin
        //

        smoothScroll.init(options);


        //
        // Public APIs
        //

        return smoothScroll;

    };

    return SmoothScroll;

});
