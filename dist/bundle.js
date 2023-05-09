/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/***/ (() => {

eval("if (\"serviceWorker\" in navigator) {\r\n  window.addEventListener(\"load\", () => {\r\n    navigator.serviceWorker\r\n      .register(\"/service-worker.js\")\r\n      .then((registration) => {\r\n        console.log(\"SW registered: \", registration);\r\n      })\r\n      .catch((registrationError) => {\r\n        console.log(\"SW registration failed: \", registrationError);\r\n      });\r\n  });\r\n}\r\n\n\n//# sourceURL=webpack://pwa-test/./src/app.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/app.js"]();
/******/ 	
/******/ })()
;