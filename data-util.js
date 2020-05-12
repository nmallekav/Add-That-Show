var fs = require('fs');
var _ = require("underscore");

function loadData() {
    return JSON.parse(fs.readFileSync('data.json'));
}

function saveData(data) {
    var obj = {
        anime_post: data
    };

    fs.writeFileSync('data.json', JSON.stringify(obj));
}

function getNames(data) {
    var allNames = [];

    for (var i  = 0; i < data.length; i++) {
        allNames[i] = data[i].username;
    }

    const uniqueSet = new Set(allNames);
    const backToArray = [...uniqueSet];

    return backToArray;
}

function getAllData(data) {
    var names = getNames(data);
    let shows = [];
    var find = [];

    for (i = 0; i < names.length; i++) {
        //var find = _.where(data, {username: "${names[i]}"});

        for (var j = 0; j < data.length; j++) {
            if (data[j].username == names[i]) {
                find.push(data[j]);
            }
        }

       shows.push({name: names[i], restOfData: find});
       find = [];
    }
   
   return shows; 
}

function getSpecificData(data, type) {

    var find = [];
    if (data.length == 0) {
        find.push("No data available");
        return find;
    }
    else if (type == "user") {
        return getNames(data);
    }
    else if (type == "action") {
        for (i = 0; i < data.length; i++) {
            if (data[i].type == "action") 
                find.push(data[i].title);
        }

        const uniqueSet = new Set(find);
        const backToArray = [...uniqueSet];

        return backToArray;
    }
    else if (type == "comedy") {
        for (i = 0; i < data.length; i++) {
            if (data[i].type == "comedy") 
                find.push(data[i].title);
        }

        const uniqueSet = new Set(find);
        const backToArray = [...uniqueSet];

        return backToArray;
    }
    else if (type == "alphabetical") {
        for (i = 0; i < data.length; i++) {
            find.push(data[i].title);
        }

        const uniqueSet = new Set(find);
        const backToArray = [...uniqueSet];

        return backToArray.sort(function(a, b){
            if(a.charAt(0) < b.charAt(0)) { return -1; }
            if(a.charAt(0) > b.charAt(0)) { return 1; }
            return 0;
        });
    }
    else if (type == "longestAnime") {
        
        var longest = 0;
        var title = data[0].title;

        for (i = 0; i < data.length; i++) {
            var episodes = parseInt(data.episodes);
            var seasons = parseInt(data.seasons);

            if (seasons * episodes > longest) {
                title = data[i].title
            }
        }

        find.push(title);

        return find;
    }

    return null;
}


function getDataOnUser(data, name) {
    let shows = [];
    var find = [];

    for (var j = 0; j < data.length; j++) {
        if (data[j].username == name)
                find.push(data[j]);
    }
   
   return find; 
}

module.exports = {
    loadData: loadData,
    saveData: saveData,
    getNames : getNames,
    getGroupedData : getAllData,
    getDataOnUser : getDataOnUser,
    getSpecificData : getSpecificData
}
