console.log("chore(123): (344) 456".match(/\([^()]+\):/g));
console.log("chore(123): (344) 456".match(/[^:(]+/g));

/\([^()]*\)/g.test("chore(123): (344) 456");