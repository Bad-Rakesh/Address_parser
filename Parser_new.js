function myFunction() {
    //Getting the input from the form to String format
    let addressToParse = document.getElementById("myText").value;

    // JSON to store the street and housenumber
    let address = {
        street: "",
        housenumber: ""
    };

    //Tokenizing the address string
    let tokens = addressToParse.split(" ");
    let newTokens = new Array();

    //Removing special characters like comma
    tokens.forEach(token => {
        if (token.endsWith(",")) {
            token = token.substring(0, token.length - 1)
        }
        newTokens.push(token);
    });
    let tokenLength = tokens.length;

    //If address contains only two words
    if (tokenLength === 2) {
        let lastToken = newTokens.pop();
        //If the last word is a number or alphanumeric, then it should be the house number
        if (!isNaN(lastToken) || /\d/.test(lastToken)) {
            address.housenumber = lastToken;
            lastToken = newTokens.pop();
            address.street = lastToken;
        }
        else {
            //If the last word is not a number or alphanumeric/first word should be the house number
            address.street = lastToken;
            lastToken = newTokens.pop();
            address.housenumber = lastToken;
        }
    }
    //If address contains more than 2 words
    else {
        let lastToken = newTokens.pop();
        //if last word is a number or alphanumeric, then it should be the house number
        if (!isNaN(lastToken) || /\d/.test(lastToken)) {
            //For special cases such as "Calle 39 No 1540"
            //Note : There can be many more types of special cases like this, I have only included the one given in the example.
            let secondLastToken = newTokens[newTokens.length - 1];
            if (secondLastToken.localeCompare("No") === 0) {
                secondLastToken = newTokens.pop();
                address.housenumber = secondLastToken.concat(" ").concat(lastToken);
                address.street = newTokens.join(" ");
            }
            else {
                //For regular cases
                address.housenumber = lastToken;
                address.street = newTokens.join(" ");
            }
        }
        else {
            //Putting the last token back to the array
            newTokens.push(lastToken);
            //If first word is a number or alphanumeric, then it should be the house number
            let firstToken = newTokens.shift();
            if (!isNaN(firstToken) || /\d/.test(firstToken)) {
                address.housenumber = firstToken;
                address.street = newTokens.join(" ");
            }
            else {
                //Putting the first token back to the array
                newTokens.unshift(firstToken);
                //Finding the house number from the address
                let indexHn = newTokens.findIndex(token => !isNaN(token));
                //Assuming that the rest of the string after the number is part of the house number. Ex "Auf der Vogelwiese 23 b"
                //Splitting the string into house number and street
                let houseNumberTokens = newTokens.splice(indexHn);
                address.housenumber = houseNumberTokens.join(" ");
                address.street = newTokens.join(" ");
            }
        }

    }
    //Displaying the output JSON object
    document.getElementById("demo").innerHTML = JSON.stringify(address);
}