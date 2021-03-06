export const isNotError = (obj) => {
    return !(Object.prototype.toString.call(obj) === "[object Error]");
}

 export const setCookie = (name, value, hoursToLive) => {
    // Encode value in order to escape semicolons, commas, and whitespace
    let cookie = name + "=" + encodeURIComponent(value);
    
    if(typeof hoursToLive === "number") {
        /* Sets the max-age attribute so that the cookie expires
        after the specified number of hours */
        cookie += ";path=/;max-age=" + (hoursToLive*60*60);
        
        document.cookie = cookie;
    }
}

export const getCookie= (name) => {
    // Split cookie string and get all individual name=value pairs in an array
    let cookieArr = document.cookie.split(";");
    //console.log("cookieArr : ",cookieArr)
    
    // Loop through the array elements
    for(let i = 0; i < cookieArr.length; i++) {
        let cookiePair = cookieArr[i].split("=");
        
        /* Removing whitespace at the beginning of the cookie name
        and compare it with the given string */
        if(name === cookiePair[0].trim()) {
            // Decode the cookie value and return
            return decodeURIComponent(cookiePair[1]);
        }
    }
    
    // Return null if not found
    return null;
}
