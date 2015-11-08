/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


var theSymbols = [" ", "!", "\"", "$", "%", "^", "&", "*", "(", ")", "-", "_", "=", "+", "[", "{", "]", "}", ";", ":", "'", "@", "#", "~", "|", ",", "<", ".", ">", "/", "?"]; //Removed "\\", because backslash character can cause problems when passwords are stored.

function GeneratePassword(lengthOfPassword, wantSymbols) {
	var theLetters = "abcdefghijklmnopqrstuvwxyz";
	var StrongPasswordArray = [];
	var capitalise;
	for (var i = 0; i < lengthOfPassword; i++) {
		capitalise = Math.round(Math.random() * 1);
		if (capitalise === 0) {
			StrongPasswordArray[i] = theLetters.charAt(Math.floor(Math.random() * 26)).toUpperCase();
		}
		else {
			StrongPasswordArray[i] = theLetters.charAt(Math.floor(Math.random() * 26));
		}
	}
	var numberOfDigits;
	numberOfDigits = Math.round(Math.random() * (lengthOfPassword - 1)) + 1;
	var positionForNumeric, theNumber;
	for (i = 0; i < numberOfDigits; i++) {
		positionForNumeric = Math.round(Math.random() * (lengthOfPassword - 1));
		theNumber = Math.round(Math.random() * 9);
		StrongPasswordArray[positionForNumeric] = theNumber;
	}
	if (wantSymbols) {
		var numberOfSymbols;
		numberOfSymbols = Math.round(Math.random() * (lengthOfPassword - 1)) + 1;
		var positionForSymbol;
		var locationOfSymbolInArray;
		var theSymbol;
		for (i = 0; i < numberOfSymbols; i++) {
			positionForSymbol = Math.round(Math.random() * (lengthOfPassword - 1));
			locationOfSymbolInArray = Math.round(Math.random() * (theSymbols.length - 1));
			theSymbol = theSymbols[locationOfSymbolInArray];
			StrongPasswordArray[positionForSymbol] = theSymbol;
		}
	}
	return StrongPasswordArray;
}

function Validate(StrongPasswordArray, lengthOfPassword, wantSymbols) {
	var hasAnUpperCaseLetter = false;
	var hasALowerCaseLetter = false;
	var hasANumber = false;
	var hasASymbol = false;
	var correctLength = false;
	for (var i = 0; i < StrongPasswordArray.length; i++) {
		if ("A" <= StrongPasswordArray[i] && StrongPasswordArray[i] <= "Z") {
			hasAnUpperCaseLetter = true;
			break;
		}
	}
	for (i = 0; i < StrongPasswordArray.length; i++) {
		if ("a" <= StrongPasswordArray[i] && StrongPasswordArray[i] <= "z") {
			hasALowerCaseLetter = true;
			break;
		}
	}
	for (i = 0; i < StrongPasswordArray.length; i++) {
		if ("0" <= StrongPasswordArray[i] && StrongPasswordArray[i] <= "9") {
			hasANumber = true;
			break;
		}
	}
	if (wantSymbols) {
		for (i = 0; i < StrongPasswordArray.length; i++) {
			for (var iSymbols = 0; iSymbols < theSymbols.length; iSymbols++) {
				if (StrongPasswordArray[i] == theSymbols[iSymbols]) {
					hasASymbol = true;
					break;
				}
			}
		}
	}
	if (StrongPasswordArray.length == lengthOfPassword) {
		correctLength = true;
	}
	if (!wantSymbols) {
		hasASymbol = true;
	}
	if (!hasAnUpperCaseLetter || !hasALowerCaseLetter || !hasANumber || !hasASymbol || !correctLength) {
		lengthOfPassword = "";
		loop = "";
		hasAnUpperCaseLetter = "";
		hasALowerCaseLetter = "";
		hasANumber = "";
		hasASymbol = "";
		correctLength = "";
		return false;
	}
	else {
		return true;
	}
}

function MakeMnemonic(StrongPasswordArray) {
	var theWords = [];
	theWords = ["alpha", "bravo", "charlie", "delta", "echo", "foxtrot", "golf", "hotel", "india", "juliet", "kilo", "lima", "mike", "november", "oscar", "papa", "quebec", "romeo", "sierra", "tango", "uniform", "victor", "whiskey", "x-ray", "yankee", "zulu"];
	var lettersArray = [];
	lettersArray = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
	var easyToRememberArray = [];
	for (var i = 0; i < StrongPasswordArray.length; i++) {
		for (var iLetters = 0; iLetters < lettersArray.length; iLetters++) {
			if (StrongPasswordArray[i] == lettersArray[iLetters].toUpperCase()) {
				easyToRememberArray[i] = theWords[iLetters].toUpperCase() + "\n";
			}
			if (StrongPasswordArray[i] == lettersArray[iLetters]) {
				easyToRememberArray[i] = theWords[iLetters] + "\n";
			}
		}
		if ("0" <= StrongPasswordArray[i] && StrongPasswordArray[i] <= "9") {
			easyToRememberArray[i] = StrongPasswordArray[i];
		}
		for (var iSymbols = 0; iSymbols < theSymbols.length; iSymbols++) {
			if (StrongPasswordArray[i] == theSymbols[iSymbols]) {
				easyToRememberArray[i] = StrongPasswordArray[i];
				/* use "[space]" to represent a space character */
				if (StrongPasswordArray[i] === " ") {
					easyToRememberArray[i] = "[space]";
				}
			}
		}
	}
	var easyToRemember = "";
	for (i = 0; i < easyToRememberArray.length; i++) {
		easyToRemember += easyToRememberArray[i] + " ";
	}
	return easyToRemember;
}

function displayPassword() {
	var newStrongPasswordArray;
	var passwordIsOK = false;
	while (!passwordIsOK) {
		newStrongPasswordArray = GeneratePassword(8, false);
		passwordIsOK = Validate(newStrongPasswordArray, 8, false);
	}
	var StrongPassword = "";
	for (var i = 0; i < newStrongPasswordArray.length; i++) {
		StrongPassword += newStrongPasswordArray[i];
	}
        var passwordDisplayed = StrongPassword;
        var mnemonicPasswordDisplayed = MakeMnemonic(newStrongPasswordArray);
        
        $('#password').val(passwordDisplayed);
        $('#mnemonic').val(mnemonicPasswordDisplayed);
}

function addEventHandlers() {
	if (document.getElementById) {
		if (document.getElementById("btnGenerate")) {
			document.getElementById("btnGenerate").onclick = displayPassword;
		}
	}
}