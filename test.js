// Abhi, abhi.it@gmail.com
// Oct 21, 2014

// Modified Hash table Data structure (in case of key collision, it creates an array in place of value)
var oHashList = {};

// Hash table that stores  n! / ((n-r)!*r!) entries with keys as sum of possible combinations of 2 list members 
var oHashSumList = {};


// Insert an entry into oHashList
// Key : Value field of objects from original sample array
// Value : Array of id(s) having above key
// Example : 
// { 
//	'1': [ 'map7' ],
//  '3': [ '3dat' ],
//	'-1': [ 'r37x' ],
//  '-2': [ 'yy15' ] 
// }
function insertEntry(entry) {
	//Check for its presence
	if (oHashList[entry.value] == undefined) {
		//Simple add, key will be entry and value will also be entry
		oHashList[entry.value] = [entry.id];
	} else {
		// Collision detected
		oHashList[entry.value].push(entry.id);
	}
}


// Create Hash Sum List with :
// Key : Sum of two keys of oHashList
// Value : Array of ids of the pair forming above sum
// Example : 
// { 
//	'0': [ [ 'r37x', 'map7' ] ],
//  '1': [ [ '3dat', 'yy15' ] ],
//  '2': [ [ 'r37x', '3dat' ] ],
//  '4': [ [ '3dat', 'map7' ] ],
//  '-3': [ [ 'r37x', 'yy15' ] ],
//  '-1': [ [ 'yy15', 'map7' ] ] 
// }
function createHashSumList(arr) {
	//Combinations rule
	for (var i = 0; i<arr.length; i++) {
		//Insert into Hash List
		insertEntry(arr[i]);
		//Proceed with curating Hash Sum List
		for (var j=i+1; j<arr.length; j++) {
				var key = arr[i].value+arr[j].value;
				if (oHashSumList[key] == undefined) {
					//Simple add, key will be entry and value will also be entry
					oHashSumList[key] = [[arr[i].id, arr[j].id]];
				} else {
					// Collision detected
					oHashSumList[key].push([arr[i].id, arr[j].id]);
				}
		}
	}
}


function mainFunction() {
	// NOTE : id of each entry has to be unique
	// Value may be same
	var sample = [{id : 'r37x',value :1}, {id : '3dat',value :3}, {id : 'yy15',value :-2}, {id : 'map7',value :-1}, {id : 'm8p1',value :2}, {id : 'tap3',value :-4}];
	var flagResult = "Result : not found";
	//Sample is provided
	console.log("You have entered : ");
	console.dir(sample);

	//Perform operation(s)
	createHashSumList(sample);


	console.log("\nHASH LIST ====");
	console.dir(oHashList);
	console.log("\nHASH SUM LIST ====");
	console.dir(oHashSumList);
	

	console.log("\n====== RESULT ======");

	// Remove redundant pairs
	var finalResult = {};

	//Smart looping choice : oHashList will always be smaller than oHashSumList
	for (var key in oHashList) {
        if (oHashList.hasOwnProperty(key)) {
        	//Note : hasOwnProperty() has complexity of O(1)
        	if(oHashSumList[-(key)] != undefined) {
        		// This for loop is just syntactic sugar to print result in readable format
        		for(var i = 0; i < oHashSumList[-(key)].length; i++) {
        			//Skip for repetitive results
        			if(oHashList[key] != oHashSumList[-(key)][i][0] && oHashList[key] != oHashSumList[-(key)][i][1]) {
        				var sortedResult = [oHashSumList[-(key)][i][0], oHashSumList[-(key)][i][1], oHashList[key]];
        				sortedResult = sortedResult.sort();
        				var tmp = sortedResult.join('_');
                        sortedResult = sortedResult.join();
        				finalResult[tmp] = sortedResult;
                        sortedResult = null;
        			}
        		}
        		flagResult = "Result : found";
        	}
        }
    }
    if(flagResult != "Result : found") {
    	console.log(flagResult);
    } else {
    	console.dir(finalResult);
    }

}

// Entry point
mainFunction();