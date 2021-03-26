// Render function on-screen
function renderApp(app, mount) {
  mount = document.querySelector(mount);
  if (typeof app == "function") {
    if (typeof app == "undefined") {
      var funcApp = eval(`app()`);
      mount.innerHTML = mount.innerHTML + funcApp;
    } else {
      eval(`app()`);
    }
  } else {
    mount.innerHTML = mount.innerHTML + app;
  }
}

// Initialize Kode Project and store variables for later use
function appData(data) {
  var dataVariable = Object.keys(data);
  var dataVariableValue = Object.values(data);
  if (typeof dataVariableValue == "string") {
    if (!isNaN(parseInt(dataVariable))) {
      eval(`globalThis.${dataVariable} = ${dataVariableValue}`);
    } else {
      eval(`globalThis.${dataVariable} = '${dataVariableValue}'`);
    }
  } else if (typeof dataVariableValue == "object") {
    [`${dataVariableValue}`].forEach((element) => {
      var el = element.split(",");
      var l = [];
      el.forEach((part) => {
        l.push(part);
        eval(`globalThis.${dataVariable} = l`);
      });
    });
  }

  console.log("show:", eval(show));

  // Interpolation
  [...document.querySelectorAll("[i]")].forEach((span) => {
    globalThis.match = span.textContent.match(/{{ (.*?) }}/);
    span.setAttribute("interpolation", "interpolating");
    span.setAttribute("kode-content", match);
    if (typeof dataVariableValue == "object") {
      for (var i = 0; i < dataVariableValue.length; i++) {
        if (typeof dataVariableValue[i + 1] != "undefined") {
          document.write(
            `<script>document.querySelector("[interpolation]").innerText =  '${
              dataVariableValue[i] + dataVariableValue[i + 1]
            }'</script>`
          );
          console.log(dataVariableValue[i] + dataVariableValue[i + 1]);
        } else {
          document.write(
            `<script>document.querySelector("[interpolation]").innerText =  '${dataVariableValue[i]}'</script>`
          );
        }
      }
    }
  });
}

// console.log(show);

// State object [fill state properties]
var state = {};

// State Functions
var State = (function () {
  function save() {
    for (var i = 0; i < arguments.length; i++) {
      if (!isNaN(parseInt(arguments[i]))) {
        arguments[i] = parseInt(arguments[i]);
        document.querySelector("[interpolation]").innerText = parseInt(
          arguments[i]
        );
      } else {
        document.querySelector("[interpolation]").innerText = parseInt(
          arguments[i]
        );
      }
    }
  }

  state.save = save;
})();

/* Components */
var Component = function (element, component) {
  component.data = {};
  Object.keys(component).forEach((item) => {
    console.log(item);
  });
  // var template = component
  // document.querySelector(element).innerHTML =
};

/* Events */

// Click
var click = document.querySelector("[click]");

if (click) {
  click.addEventListener("click", () => {
    eval(click.getAttribute("click"));
  });
}

// Load
var load = document.querySelector("[load]");

if (load) {
  load.onload = () => {
    eval(load.getAttribute("load"));
  };
}

var key = document.querySelector("[key]");
var doAttr = document.querySelector("[do]");

if (key && doAttr) {
  document.onkeypress = function (e) {
    var keyKode = e.code;
    // console.log(ke);
    if (key.getAttribute("key") == keyKode) {
      eval(doAttr.getAttribute("do"));
    } else {
      return false;
    }
  };
}

// Dynamic Classes
var kClass = document.querySelector("[k-class]");

if (kClass) {
  // console.log(
  //   Object.keys(JSON.parse(kClass.getAttribute("k-class"))),
  // );
  function getKeyByValue(object, value) {
    for (var prop in object) {
      if (object.hasOwnProperty(prop)) {
        if (object[prop] === value) return prop;
      }
    }
  }
  try {
    var s = JSON.parse(kClass.getAttribute("k-class"));
    for (var k = 0; k < Object.keys(s).length; k++) {
      for (var v = 0; v < Object.values(s).length; v++) {
        eval(`var ${Object.keys(s)[k]} = ${Object.values(s)[k]}`);
        // console.log(Object.values(s)[v]);
        // console.log(eval(Object.values(s)[v]));
        if (eval(Object.values(s)[v])) {
          var ans = getKeyByValue(s, Object.values(s)[v]);
          kClass.className = ans;
        }
      }
    }
    // console.log(kClass.className);
    // console.log(eval(`${Object.keys(kClass.getAttribute("k-class"))[i]}`));
  } catch (err) {
    var classToApply = eval(kClass.getAttribute("k-class"));
    kClass.className = classToApply;
  }
}

var kIf = document.querySelector("[if]");
var kElseIf = document.querySelector("[else-if]");
var kElse = document.querySelector("[else]");

// if (kIf) {
//   if (eval(kIf.getAttribute("if"))) {
//     kIf.innerHTML = kIf.innerHTML = eval(kIf.innerHTML);
//   } else if (kElseIf && eval(kElseIf.getAttribute("else-if"))) {
//     kIf.style.display = "none";
//     kElseIf.innerHTML = kElseIf.innerHTML;
//   } else if (
//     kElse &&
//     eval(kElse.getAttribute("else"))
//   ) {
//     kIf.style.display = "none";
//     kElseIf.style.display = "none";
//     kElse.innerHTML = kElse.innerHTML;
//   }
//   if (!kIf.getAttribute("if")) {
//     kIf.style.display = "none";
//   }
//   if (kElse && !kElseIf.getAttribute("else-if")) {
//     kElseIf.style.display = "none";
//   }
//   if (kElse && !kElse.getAttribute("else")) {
//     kElse.style.display = "none";
//   }
//   // } else if (!kIf.getAttribute("if") && !kElseIf.getAttribute("else-if") && !kElse.getAttribute("else")) {
//   //   kIf.style.display = "none";
//   //   kElseIf.style.display = "none";
//   //   kElse.style.display = "none";
//   // }
// }

if (kIf) {
  if (eval(kIf.getAttribute('if'))) {
    kIf.innerHTML = kIf.innerHTML
  } 
  else {
    kIf.style.display = 'none';
  }
}

// More events...
