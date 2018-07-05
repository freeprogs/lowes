/*
 * This file is a part of __PROGRAM_NAME__ __PROGRAM_VERSION__
 *
 * __PROGRAM_COPYRIGHT__ __PROGRAM_AUTHOR__ __PROGRAM_AUTHOR_EMAIL__
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

/**
 * Handler for a web-page which contains several text translators.
 *
 * - Topic url from new form to old form
 * - Post message url from new form to old form
 * - Post message url from old syntax to the likes page
 * - An escaper for special characters in a url
 * - An escaper for characters repeats in a message text
 *
 */

"use strict";

var forum_object = {
    init: function() {
        /**
         * Initialize the forum object.
         *
         * Find all forms and set each of them to the ready state.
         * @return {bool} True if no errors.
         */
        var searcher = new NodeSearcher();
        var topicLog = searcher.searchById("forum-topic-log");
        var topicLogger = new LabelLogger(topicLog);
        var msgPostLog = searcher.searchById("forum-msgpost-log");
        var msgPostLogger = new LabelLogger(msgPostLog);
        var msgPostLikesLog = searcher.searchById("forum-msgpostlikes-log");
        var msgPostLikesLogger = new LabelLogger(msgPostLikesLog);
        var escapeUrlLog = searcher.searchById("forum-escapeurl-log");
        var escapeUrlLogger = new LabelLogger(escapeUrlLog);
        var escapeRepeatsLog = searcher.searchById("forum-escaperepeats-log");
        var escapeRepeatsLogger = new LabelLogger(escapeRepeatsLog);

        topicLogger.write("ready");
        msgPostLogger.write("ready");
        msgPostLikesLogger.write("ready");
        escapeUrlLogger.write("ready");
        escapeRepeatsLogger.write("ready");
        return true;
    },

    transTopicUrl: function() {
        /**
         * Translate in the form topic url from new syntax to old syntax.
         *
         * Take the url from the input text field, take the topic
         * number from the url, insert the topic number to the
         * reorganized url and print the new url to the output text
         * field.
         * @return {bool} True if no errors and false if any error.
         */

        var searcher = new NodeSearcher();

        var input = searcher.searchById("forum-topic-in");
        var output = searcher.searchById("forum-topic-out");
        var log = searcher.searchById("forum-topic-log");

        var converter = new UrlConverter();
        var logger = new LabelLogger(log);

        if (!input.value) {
            input.value = "https://forum-beta.sakh.com/t?/"
            logger.write("ready");
            return false;
        }

        var oldUrl = converter.topicNewToOld(input.value);
        if (oldUrl) {
            output.value = oldUrl;
            logger.write("ok");
        }
        else {
            logger.write("error");
        }
        return true;
    },

    transMsgPostUrl: function() {
        /**
         * Translate in the form message post url from new syntax to
         * old syntax.
         *
         * Take the url from the input text field, take the topic and
         * post numbers from the url, insert the topic and post
         * numbers to the reorganized url and print new url to the
         * output text field.
         * @return {bool} True if no errors and false if any error.
         */

        var searcher = new NodeSearcher();

        var input = searcher.searchById("forum-msgpost-in");
        var output = searcher.searchById("forum-msgpost-out");
        var log = searcher.searchById("forum-msgpost-log");

        var converter = new UrlConverter();
        var logger = new LabelLogger(log);

        if (!input.value) {
            input.value = "https://forum-beta.sakh.com/t?/p?/#reply-p?"
            logger.write("ready");
            return false;
        }

        var oldUrl = converter.msgPostNewToOld(input.value);
        if (oldUrl) {
            output.value = oldUrl;
            logger.write("ok");
        }
        else {
            logger.write("error");
        }
        return true;
    },

    transMsgPostUrlToLikesUrl: function() {
        /**
         * Translate in the form message post url from old syntax to
         * the likes url in new syntax.
         *
         * Take the url from the input text field, take the topic and
         * post numbers from the url, insert the topic and post
         * numbers to the reorganized url and print new url to the
         * output text field.
         * @return {bool} True if no errors and false if any error.
         */

        var searcher = new NodeSearcher();

        var input = searcher.searchById("forum-msgpostlikes-in");
        var output = searcher.searchById("forum-msgpostlikes-out");
        var log = searcher.searchById("forum-msgpostlikes-log");

        var converter = new UrlConverter();
        var logger = new LabelLogger(log);

        if (!input.value) {
            input.value = "https://forum.sakh.com/?sub=t?&post=p?#p?"
            logger.write("ready");
            return false;
        }

        var oldUrl = converter.msgPostOldToLikes(input.value);
        if (oldUrl) {
            output.value = oldUrl;
            logger.write("ok");
        }
        else {
            logger.write("error");
        }
        return true;
    },

    escapeUrlForMessage: function() {
        /**
         * Translate in the form any HTTP(S)-url to the url with
         * escaped special characters from the list.
         *
         * Take the url from the input text field, translate special
         * characters in the url, excluding initial Internet protocol
         * and domain name, to hexadecimal codes with the percent
         * character and print the new url to the output text field.
         * The default special characters list is [":", ";", "(", ")"].
         * @return {bool} True if no errors and false if any error.
         */

        var searcher = new NodeSearcher();

        var inputUrl = searcher.searchById("forum-escapeurl-in-url");
        var inputChars = searcher.searchById("forum-escapeurl-in-chars");
        var output = searcher.searchById("forum-escapeurl-out");
        var log = searcher.searchById("forum-escapeurl-log");

        var escaper = new UrlEscaper();
        var logger = new LabelLogger(log);

        var DEFAULT_INPUT_URL = "https://?/?";
        var DEFAULT_INPUT_CHARS = ":;()";

        if (!inputUrl.value) {
            inputUrl.value = DEFAULT_INPUT_URL;
            if (!inputChars.value) {
                inputChars.value = DEFAULT_INPUT_CHARS;
            }
            output.value = "";
            logger.write("ready");
            return false;
        }

        var escapedUrl = escaper.escapeCharsInPath(
            inputUrl.value, inputChars.value.split(""));
        if (escapedUrl) {
            output.value = escapedUrl;
            logger.write("ok");
        }
        else {
            logger.write("error");
        }
        return true;
    },

    escapeRepeatsInTextForMessage: function() {
        /**
         * Translate in the form a message text to the text with
         * repeats escaped by special tags.
         *
         * The text is scanned for characters repeats and every
         * repeating character sequence escaped by tags like [u][/u].
         * For example:
         *   abcaaaaaadef -> abcaaa[u][/u]aa[u][/u]adef
         * @return {bool} True if no errors and false if any error.
         */
        var searcher = new NodeSearcher();

        var input = searcher.searchById("forum-escaperepeats-in");
        var output = searcher.searchById("forum-escaperepeats-out");
        var log = searcher.searchById("forum-escaperepeats-log");

        var converter = new TextConverter();
        var logger = new LabelLogger(log);

        var DEFAULT_ESCAPE_DELIMITERS = ["[u][/u]", "[i][/i]", "[s][/s]"];

        if (!input.value) {
            input.value = "Teeeeeext"
            logger.write("ready");
            return false;
        }

        var escapedText = converter.escapeCharRepeatsByDelimeters(
            input.value, DEFAULT_ESCAPE_DELIMITERS);
        if (escapedText) {
            output.value = escapedText;
            logger.write("ok");
        }
        else {
            logger.write("error");
        }
        return true;
    },
};


function NodeSearcher() {
}

NodeSearcher.prototype.searchById = function(id) {
    /**
     * Search a node in document by element id.
     *
     * @param {string} id Id of container block.
     * @return {object} The first element in the container block.
     */
    var node = document.getElementById(id);
    var out = node.firstElementChild;
    return out;
};


function UrlConverter() {
}

UrlConverter.prototype.topicNewToOld = function(url) {
    /**
     * Convert forum topic url from new syntax to old syntax.
     *
     * @param {string} url The topic url in new format.
     * @return {string} The topic url in old format.
     *
     * Example:
     * In:
     * https://forum-beta.sakh.com/1/
     * Out:
     * https://forum.sakh.com/?sub=1
     */
    if (!url) {
        return null;
    }
    var pat = /^(https:\/\/forum)-beta(\.sakh\.com\/)(\d+)\/$/;
    var parts = url.match(pat);
    if (!parts) {
        return null;
    }
    var out = parts[1] + parts[2] + "?sub=" + parts[3];
    return out;
};

UrlConverter.prototype.msgPostNewToOld = function(url) {
    /**
     * Convert forum msgpost url from new syntax to old syntax.
     *
     * @param {string} url The msgpost url in new format.
     * @return {string} The msgpost url in old format.
     *
     * Example:
     * In:
     * https://forum-beta.sakh.com/123/456/#reply-456
     * Out:
     * https://forum.sakh.com/?sub=123&post=456#456
     */
    if (!url) {
        return null;
    }
    var pat =
        /^(https:\/\/forum)-beta(\.sakh\.com\/)(\d+)\/(\d+)\/#reply-(\d+)$/;
    var parts = url.match(pat);
    if (!parts) {
        return null;
    }
    var out = parts[1] + parts[2] + "?sub=" + parts[3]
        + "&post=" + parts[4] + "#" + parts[5];
    return out;
};

UrlConverter.prototype.msgPostOldToLikes = function(url) {
    /**
     * Convert forum msgpost url from old syntax to the likes page.
     *
     * @param {string} url The msgpost url in old format.
     * @return {string} The likes url.
     *
     * Example:
     * In:
     * https://forum.sakh.com/?sub=123&post=456#456
     * Out:
     * https://forum-beta.sakh.com/likes/reply/456/
     */
    if (!url) {
        return null;
    }
    var pat =
        /^(https:\/\/forum)(\.sakh\.com\/)\?sub=\d+&post=\d+#(\d+)$/
    var parts = url.match(pat);
    if (!parts) {
        return null;
    }
    var out = parts[1] + "-beta" + parts[2] + "likes/reply/" + parts[3] + "/";
    return out;
};


function UrlEscaper() {
}

UrlEscaper.prototype.escapeCharsInPath = function(url, escapeChars) {
    /**
     * Escape characters in the url from character list, excluding
     * initial Internet protocol and domain name.
     *
     * @param {string} url The url with protocol, domain name and path.
     * @param {array} escapeChars Characters for escaping in the url.
     * @return {string} The url with escaped characters from the list.
     *
     * Example:
     * In:
     * https://www.domain.com:12345/abc;def:ghi [":", ";"]
     * Out:
     * https://www.domain.com:12345/abc%3Bdef%3Aghi
     */
    if (!url) {
        return null;
    }
    if (!escapeChars) {
        return null;
    }
    if (!/^https?:\/\/.+\//.test(url)) {
        return null;
    }
    if (escapeChars.length == 0) {
        return url;
    }
    var out;
    var patsplit = /^(https?:\/\/[^\/]+\/)(.*)$/;
    var match = url.match(patsplit);
    var part1 = match[1];
    var part2 = match[2];
    var part2escaped;

    function escapeRegExp(str) {
        return str.replace(/[.*+?^$|{}()\[\]\\]/g, "\\$&");
    }

    function escape(s, chars) {
        var out = s;
        var charHexCode;
        for (var i = 0; i < chars.length; i++) {
            charHexCode = chars[i].charCodeAt(0).toString(16).toUpperCase();
            out = out.replace(new RegExp(escapeRegExp(chars[i]), "g"),
                              "%" + charHexCode);
        }
        return out;
    }

    part2escaped = escape(part2, escapeChars);
    out = part1 + part2escaped;

    return out;
};


function TextConverter() {
}

TextConverter.prototype.escapeCharRepeatsByDelimeters = function(text, delimiters) {
    /**
     * Escape in text repeating characters groups by delimiters.
     *
     * When there is a repeating group of one character is found in
     * the text it is escaped by some algorithm:
     * Every delimiter inserted after N characters where N is taken
     * from the list [3, 2, 1, 2, 3, 1, 2, 1, 3, 2]. When the first
     * delimiter went over all numbers list the second delimiter
     * starts the numbers list from the beginning. When all delimiters
     * from the delimiters list are used they are started again from
     * the beginning. The delimiters list is cycled and the numbers
     * list is cycled.
     *
     * @param {string} text The text with/without repeating characters groups.
     * @param {string} delimiters List of delimiters for insertions into the text.
     * @return {string} The text with characters repeats escaped by delimiters.
     *
     * Example:
     * In:
     *
     * text:
     * abcaaaaaaaaadef
     * abcbbbbbbbbbbbbbbbdef
     * abc111111111111111111111def
     *
     * delimiters:
     * ["|"]
     *
     * Out:
     *
     * abcaaa|aa|a|aa|adef
     * abcbbb|bb|b|bb|bbb|b|bb|bdef
     * abc111|11|1|11|111|1|11|1|111|11|1def
     *
     */
    if (text == undefined) {
        return null;
    }
    if (delimiters == undefined) {
        return null;
    }
    if (delimiters.length == 0) {
        return text;
    }
    var escaper = new StringEscaper();
    return text.replace(/(.)\1{3,}/g, function(match) {
        return escaper.escapeByStringsAndAmounts(
            match,
            delimiters,
            [3, 2, 1, 2, 3, 1, 2, 1, 3, 2]);
    });
};


function StringEscaper() {
}

StringEscaper.prototype.escapeByStringsAndAmounts = function(s, strings, amounts) {
    /**
     * Escape in string s all characters, inserting strings over amounts.
     *
     * The string is escaped by the algorithm:
     * In the s string every string from the strings array inserted
     * after N characters where N is taken from the amounts
     * array. When the first string went over the amounts array the
     * second string starts the amount array from the beginning. When
     * all strings from the strings array are used they are started
     * again from the beginning. The strings array is cycled and the
     * amounts array is cycled.
     *
     * @param {string} s The input string.
     * @param {object} strings Array of strings for insertions into the input string.
     * @param {object} amounts Array of numbers for insertion gaps.
     * @return {string} The input string with strings inserted over amounts.
     *
     * Example:
     * In:  abcdefghij ["|", "@"] [1, 2]
     * Out: a|bc|d@ef@g|hi|j
     */
    if (s == undefined) {
        return null;
    }
    if (strings == undefined) {
        return null;
    }
    if (amounts == undefined) {
        return null;
    }
    var state = 0;
    var scuri = 0;
    var acuri = 0;
    var out = "";

    while (s) {
        if (s.length <= amounts[acuri]) {
            out += s;
            s = "";
            break;
        }
        else {
            out += s.slice(0, amounts[acuri]) + strings[scuri];
            s = s.slice(amounts[acuri]);
        }
        acuri++;
        if (acuri >= amounts.length) {
            scuri = (scuri + 1 < strings.length) ? scuri + 1 : 0;
            acuri = 0;
        }
    }
    return out;
};


function LabelLogger(node) {
    /**
     * Create a logger writing to the node element.
     *
     * @param {object} node Node element for writing.
     */
    this.node = node;
}

LabelLogger.prototype.write = function(text) {
    /**
     * Write text to the label.
     *
     * @param {string} text Text for writing.
     */
    this.node.innerHTML = text;
};


function forum_main() {
    /**
     * Run main function of the forum page.
     */
    forum_object.init();
    forum_connectButtons();
    forum_connectForms();
    forum_connectAbout();
}

function forum_connectButtons() {
    /**
     * Connect buttons by events to forms and help area.
     *
     * A button can show and hide connected form by click. When mouse
     * is over the button the help message about button action is
     * printed in the help area.
     */
    function Button(node) {
        this.node = node;
        this.img = node.querySelector("img");
        this.isPushed = undefined;
    }
    Button.prototype.push = function() {
        this.isPushed = true;
        this.img.src = this.img.getAttribute("data-state-on");
    }
    Button.prototype.release = function() {
        this.isPushed = false;
        this.img.src = this.img.getAttribute("data-state-off");
    }
    Button.prototype.getDescription = function() {
        return this.node.getAttribute("data-info");
    }
    Button.prototype.toggle = function() {
        if (this.isPushed) {
            this.release();
        }
        else {
            this.push();
        }
    }

    function Form(node) {
        this.node = node;
        this.isHidden = undefined;
    }
    Form.prototype.hide = function() {
        this.isHidden = true;
        this.node.style.display = "none";
    }
    Form.prototype.show = function() {
        this.isHidden = false;
        this.node.style.display = "block";
    }
    Form.prototype.toggle = function() {
        if (this.isHidden) {
            this.show();
        }
        else {
            this.hide();
        }
    }

    var buttons = Array.prototype.slice.call(
        document.querySelectorAll(".forms-list-button"), 0).map(function(e) {
            return new Button(e);
    });
    var forms = [document.querySelector(".form1-container"),
                 document.querySelector(".form2-container"),
                 document.querySelector(".form3-container"),
                 document.querySelector(".form4-container"),
                 document.querySelector(".form5-container")].map(function(e) {
        return new Form(e);
    });
    var info = document.querySelector(".forms-help-info");
    var buttonFormPairs;

    buttons.forEach(function(e) { e.release(); });
    forms.forEach(function(e) { e.hide(); });

    buttonFormPairs = buttons.map(function(e, i) { return [e, forms[i]]; });
    buttonFormPairs.map(function([button, form]) {
        button.node.addEventListener("click", function(event) {
            button.toggle();
            form.toggle();
        });
        button.node.addEventListener("mouseover", function(event) {
            info.innerHTML = button.getDescription();
        });
        button.node.addEventListener("mouseout", function(event) {
            info.innerHTML = "";
        });
    });
}

function forum_connectForms() {
    /**
     * Connect forms' actions to js-functions.
     *
     * Every form is connected to its js-function. On submit the form
     * is running the function which does all work.
     */

    var forms = [document.querySelector(".form1-container > form"),
                 document.querySelector(".form2-container > form"),
                 document.querySelector(".form3-container > form"),
                 document.querySelector(".form4-container > form"),
                 document.querySelector(".form5-container > form")]

    forms[0].addEventListener("submit", function(event) {
        forum_object.transTopicUrl();
        event.preventDefault();
    });
    forms[1].addEventListener("submit", function(event) {
        forum_object.transMsgPostUrl();
        event.preventDefault();
    });
    forms[2].addEventListener("submit", function(event) {
        forum_object.transMsgPostUrlToLikesUrl();
        event.preventDefault();
    });
    forms[3].addEventListener("submit", function(event) {
        forum_object.escapeUrlForMessage();
        event.preventDefault();
    });
    forms[4].addEventListener("submit", function(event) {
        forum_object.escapeRepeatsInTextForMessage();
        event.preventDefault();
    });
}

function forum_connectAbout() {
    /**
     * Connect about info to hidden data.
     */

    var aboutLink = document.querySelector(".about > .about-link");
    var aboutLinkA = aboutLink.querySelector("a");
    var aboutVersion = document.querySelector(".about > .about-version");

    aboutLinkA.addEventListener("mousedown", function(event) {
        aboutLink.style.display = "none";
        aboutVersion.style.display = "block";
    });
    aboutVersion.addEventListener("click", function(event) {
        aboutLink.style.display = "block";
        aboutVersion.style.display = "none";
    });
}


(function() {
    /**
     * Connect loaded window to the main js-function.
     */
    window.addEventListener("load", function(event) {
        forum_main();
    });
})();
