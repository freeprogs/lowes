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
 *
 */

var forum = {
    init: function() {
        var searcher = new NodeSearcher();
        var topicLog = searcher.searchById("forum-topic-log");
        var topicLogger = new LabelLogger(topicLog);
        var msgPostLog = searcher.searchById("forum-msgpost-log");
        var msgPostLogger = new LabelLogger(msgPostLog);

        topicLogger.write("ready");
        msgPostLogger.write("ready");
        return true;
    },

    transTopicUrl: function() {
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
    }
}


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
}


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
}

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
}


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
}


function main() {
    forum.init();
}
