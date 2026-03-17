import { exampleUtil } from "../../src/shared/utils.js"

function assertEqual(a,b){
  if(a!==b){
    throw new Error(`${a} !== ${b}`)
  }
}

// exampleUtil
assertEqual(exampleUtil(" hello "), "hello")
assertEqual(exampleUtil("no spaces"), "no spaces")
assertEqual(exampleUtil(""), "")
assertEqual(exampleUtil(null), "")
assertEqual(exampleUtil(undefined), "")
assertEqual(exampleUtil(42), "")

// Note: storage.js and messaging.js depend on Chrome APIs and are not unit-tested here.
// Test them via manual loading or integration tests in a browser environment.

console.log("shared tests passed")
