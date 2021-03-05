/*load all data and make sure it works*/

var setBanner = function(message)
{
    d3.select("#banner").text(message);    
}

/*table work*/

var sortColumn = function(results,col,accessor)
{
      d3.select(col)
        .on("click",function()
    {
        results.sort(function(a,b) 
        { 
            return (accessor(a)-accessor(b));
        })
        makeTable(results, "ALL");
    })
}

var makeTableHeader = function(results)
{   
    sortColumn(results,"#familyName",function(r){return r.results.familyName});
    sortColumn(results,"#givenName",function(r){return r.results.givenName});
    sortColumn(results,"#gender",function(r){return r.results.gender}); 
    sortColumn(results,"#awardYear",function(r){return r.results.awardYear}); 
    sortColumn(results,"#category",function(r){return r.results.catagory});
    sortColumn(results,"#affiliations",function(r){return r.results.affiliations});
}
    
var addCol = function(rows,fcn)
{
    rows.append("td").text(fcn);
}

var makeTable = function(results,mode)
{
    d3.selectAll("tbody *").remove();
console.log ("table doone", results)
    var rows = d3.select("tbody")
    .selectAll("tr")
    .data(results)
    .enter()
    .append("tr");
    
    
    addCol(rows,function(results){return results.familyName})        
    addCol(rows,function(results){return results.givenName})
    addCol(rows,function(results){return results.gender})
    addCol(rows,function(results){return results.awardYear})
    addCol(rows,function(results){return results.category})
    addCol(rows,function(results){return results.affiliations})
}

var drawDetails = function(results)
{
    d3.selectAll("#nobel_info *").remove();
    
    
    var box = d3.select("#nobel_info");
    
        box.append("div").attr("class","familyName").text(familyName)
    
    var info  = box.append("div").attr("class","info")

        info.append("div").text(givenName);
        info.append("div").text(gender);
        info.append("div").text(awardYear);
        info.append("div").text(category);
        info.append("div").text(affiliations);  
    
}

var laureatesPromise = 
             d3.json("https://api.nobelprize.org/2.0/laureates?_ga=2.219546010.2082255857.1614878764-198687587.1614878764")
             
console.log ("looking", laureatesPromise)

    laureatesPromise.then(function(results)
    { 
console.log ("got ittt", results)
      setBanner("Ready to Explore");
      makeTableHeader(results.results.laureates);
      makeTable(results.results.laureates, "ALL")
    },
      function(err)
      {
        setBanner ("Lists are unavailable");
      });

