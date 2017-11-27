
# lowes

Local web site with different features controlled through a browser.

It makes a local service in systemd and opens port 5080. Then you can open
http://localhost:5080 in your browser to use the application.

---

### Requirements

This application has tested in Linux Fedora 26 with Python 3.6 and Flask 0.11.1.
And Mozilla Firefox 54 was used to watch the application.


### Building

Build the docs and read the README file in _build/docs_.

To build run:

```sh
$ ./configure
$ make
```

### Testing

After building has done go to _build/tests_ and open page test_all.html in the browser.

If tests don't work, install testing components:

| name                         | description                                    |
|:-----------------------------|:-----------------------------------------------|
| [mocha](http://mochajs.org/) | functions describe(), it() and so on for TDD   |
| [chai](http://chaijs.com/)   | different assert functions for tests           |
| [sinon](http://sinonjs.org/) | mocks and stubs for tests                      |

You can load three js-files and connect document paths to them. Everything should work.


### Installation

To install run:

```sh
$ sudo make install
```

To uninstall run:

```sh
$ sudo make uninstall
```

---
