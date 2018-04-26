# sis-frontend
A student information system made for a software engineering course.

## Priprava local devel okolja:
* `cd src`
* `npm install`
* `npm start`

za nodemon (v `src` direktoriju):

* `sudo npm install -g nodemon`
* `nodemon`


## Development

### Osnovna struktura view-a
```
<sis-navbar></sis-navbar>

<div class="container">
  * vsebina viewa, karkoli že je *
</div>
```

### Bootstrap tema

[Flatly for Bootstrap 3](https://bootswatch.com/3/flatly/)

### Dodatne AngularJS direktive

[UI Bootstrap for AngularJS](http://angular-ui.github.io/bootstrap/) (Modalna okna, progress bari, itd.)

### Student import:

use: doc/exampleStudents.txt

### Selenium testi (avtomatizacija klikov)

- Prenesi si Katalon Recorder plugin (za [Chrome](https://chrome.google.com/webstore/detail/katalon-recorder-selenium/ljdobmomdgdljniojadhoplhkpialdid), [Firefox](https://addons.mozilla.org/en-US/firefox/addon/katalon-automation-record/)) - jaz sem delal v Firefoxu

- V `doc/selenium` so na voljo predpripravljeni *Test Suiti* (.html datoteke) in njihovi opisi.

- [Podrobnejša navodila za Katalon Recorder](https://docs.katalon.com/display/KD/Katalon+Recorder)