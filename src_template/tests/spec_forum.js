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

describe("UrlConverter methods", function() {

    describe("Method topicNewToOld()", function() {

        var func = (new UrlConverter()).topicNewToOld;

        it("Returns new url on correct old url", function() {
            var i = "https://forum-beta.sakh.com/1/";
            var o = "https://forum.sakh.com/?sub=1";
            assert.equal(func(i), o);
        });

        it("Returns null on undefined url", function() {
            assert.isNull(func());
        });

        it("Returns null on empty url", function() {
            assert.isNull(func(""));
        });

        it("Returns null on one character url", function() {
            assert.isNull(func("x"));
        });

        it("Returns null on simple http url", function() {
            var i = "http://forum-beta.sakh.com/1/";
            assert.isNull(func(i));
        });

        it("Returns null on non-digits in topic number in url", function() {
            var i = "https://forum-beta.sakh.com/123a456/";
            assert.isNull(func(i));
        });

        it("Returns null on url without trailing slash", function() {
            var i = "https://forum-beta.sakh.com/1";
            assert.isNull(func(i));
        });

    });

    describe("Method msgPostNewToOld()", function() {

        var func = (new UrlConverter()).msgPostNewToOld;

        it("Returns null on undefined url", function() {
            assert.isNull(func());
        });

        it("Returns null on empty url", function() {
            assert.isNull(func(""));
        });

        it("Returns null on one character url", function() {
            assert.isNull(func("x"));
        });

        it("Returns null on simple http url", function() {
            var i = "http://forum-beta.sakh.com/123/456/#reply-789";
            assert.isNull(func(i));
        });

        it("Returns new url on correct old url", function() {
            var i = "https://forum-beta.sakh.com/123/456/#reply-789";
            var o = "https://forum.sakh.com/?sub=123&post=456#789";
            assert.equal(func(i), o);
        });

    });

    describe("Method msgPostOldToLikes()", function() {

        var func = (new UrlConverter()).msgPostOldToLikes;

        it("Returns null on undefined url", function() {
            assert.isNull(func());
        });

        it("Returns null on empty url", function() {
            assert.isNull(func(""));
        });

        it("Returns null on one character url", function() {
            assert.isNull(func("x"));
        });

        it("Returns null on simple http url", function() {
            var i = "http://forum.sakh.com/?sub=123&post=456#789"
            assert.isNull(func(i));
        });

        it("Returns likes url on correct old url", function() {
            var i = "https://forum.sakh.com/?sub=123&post=456#789";
            var o = "https://forum-beta.sakh.com/likes/reply/789/";
            assert.equal(func(i), o);
        });

    });

});

describe("UrlEscaper methods", function() {

    describe("Method escapeCharsInPath()", function() {

        var func = (new UrlEscaper()).escapeCharsInPath;

        it("Returns null on undefined url", function() {
            assert.isNull(func(undefined, [":"]));
        });

        it("Returns null on undefined characters list", function() {
            var i1 = "https://www.domain.com:12345/abc;def:ghi";
            assert.isNull(func(i1, undefined));
        });

        it("Returns null on empty url", function() {
            assert.isNull(func("", [":"]));
        });

        it("Returns null on one character url", function() {
            assert.isNull(func("x", [":"]));
        });

        it("Returns unchanged url on empty characters list", function() {
            var i1 = "https://www.domain.com:12345/abc;def:ghi";
            var i2 = [];
            var o = i1;
            assert.equal(func(i1, i2), o);
        });

        it("Returns escaped url on url without port", function() {
            var i1 = "https://www.domain.com/abc;def:ghi";
            var i2 = [":", ";"];
            var o = "https://www.domain.com/abc%3Bdef%3Aghi";
            assert.equal(func(i1, i2), o);
        });

        it("Returns escaped url on url with port", function() {
            var i1 = "https://www.domain.com:12345/abc;def:ghi";
            var i2 = [":", ";"];
            var o = "https://www.domain.com:12345/abc%3Bdef%3Aghi";
            assert.equal(func(i1, i2), o);
        });

        it("Can escape several repetitions of a character in url", function() {
            var i1 = "https://www.domain.com:12345/a;b:c;d:e";
            var i2 = [":", ";"];
            var o = "https://www.domain.com:12345/a%3Bb%3Ac%3Bd%3Ae";
            assert.equal(func(i1, i2), o);
        });

        it("Replaces only charachers in character list", function() {
            var i1;
            var i2;
            var o;

            i1 = "https://www.domain.com:12345/abc;def:ghi";
            i2 = [":", ";"];
            o = "https://www.domain.com:12345/abc%3Bdef%3Aghi";
            assert.equal(func(i1, i2), o);

            i1 = "https://www.domain.com:12345/abc;def:ghi";
            i2 = [":"];
            o = "https://www.domain.com:12345/abc;def%3Aghi";
            assert.equal(func(i1, i2), o);
        });

    });

});
