let rowNumberSection = document.querySelector(".row-number-section");

let formulaBarSelectedCellArea = document.querySelector(".selected-cell-div");

let cellSection = document.querySelector(".cell-section");
let columnTagsSection = document.querySelector(".column-tag-section");

let lastCell;
//global Object
let dataObj = {};


cellSection.addEventListener("scroll", function (e) {
  rowNumberSection.style.transform = `translateY(-${e.currentTarget.scrollTop}px)`;

  columnTagsSection.style.transform = `translateX(-${e.currentTarget.scrollLeft}px)`; 
  //console.log("Scrolling");
});


//inside this nested for loop we are creating individual cells UI + cell obj

for (let i = 1; i <= 100; i++) {
  let div = document.createElement("div");
  div.innerText = i;
  div.classList.add("row-number");
  rowNumberSection.append(div);
}

for (let i = 0; i < 26; i++) {
  let asciiCode = 65 + i;

  let reqAlphabet = String.fromCharCode(asciiCode);

  let div = document.createElement("div");
  div.innerText = reqAlphabet;
  div.classList.add("column-tag");
  columnTagsSection.append(div);
}

for (let i = 1; i <= 100; i++) {
  let rowDiv = document.createElement("div");
  rowDiv.classList.add("row");
  //i = 1 [A1,B1..........Z1]
  //i = 2 []
  //.
  //.
  //i = 100 [A100.........z100]

  for (let j = 0; j < 26; j++) {
    //i = 100   j = 25  asciiCode = 65+25=90  alpha = z  cellAdd = Z100
    // A to Z
    let asciiCode = 65 + j;

    let reqAlphabet = String.fromCharCode(asciiCode);

    let cellAddress = reqAlphabet + i;

    let cellDiv = document.createElement("div");

 // Sare cells par data objects bnaya
    dataObj[cellAddress] = {
      value: undefined,
      formula: undefined,
      upstream: [],
      downstream: [],
    };

   
     cellDiv.addEventListener("input", function (e) {
      // jis cell pr type kra uske attribute se maine uska cell address fetch kra
      let currCellAddress = e.currentTarget.getAttribute("data-address");
      //kuki sare cell objects dataObj me store ho rakhe h using their cell address as key
      //maine jis cell pr click krke type kra uska hi address fetch and uska hi object chahiye
      //to wo address as key use krke dataObj se fetch krlia req cellObj ko
      let currCellObj = dataObj[currCellAddress];
       
      currCellObj.value = e.currentTarget.innerText;
      currCellAddress.formula = undefined;  

       //1- Loop on upstream
      //2- for each cell go to its downstream and remove ourself
      //3- apni upstream ko empty array krdo
// ex selected cell(c1) ; upstream ,mein A1 parent-> c1 ,child A1
      let currUpstream = currCellObj.upstream;

      for (let k = 0; k < currUpstream.length; k++) {
        // removeFromDownstream(parent,child)
      
        removeFromDownstream(currUpstream[k], currCellAddress);
      }

      currCellObj.upstream = [];

      console.log(currCellObj);
    });
    
   // cellDiv.contentEditable = true
    cellDiv.setAttribute("contentEditable", true);

    cellDiv.classList.add("cell");

    cellDiv.setAttribute("data-address", cellAddress);

    cellDiv.addEventListener("click", function (e) {
      if (lastCell) {
        lastCell.classList.remove("cell-selected");
      }

      e.currentTarget.classList.add("cell-selected");

      lastCell = e.currentTarget;

      let currCellAddress = e.currentTarget.getAttribute("data-address");

      formulaBarSelectedCellArea.innerText = currCellAddress;
    });

    rowDiv.append(cellDiv);
  }

  cellSection.append(rowDiv);
}

// C1 = Formula(2*A1)
// A1 = parent
// C1 = child

// ex selected cell(c1) ; upstream ,mein A1 parent-> c1 ,child A1

// upstream ->  mere formule ke cells

// downstream ->  jinke formule mein main khud hu


//is function kisi ki upstream se mtlb nhi hai
//iska bs itna kaam h ki parent do and child do , aur mai parent ki downstream se child ko hta dunga
//taki unke bichka connection khtm hojai
//taki agr parent update ho to connection khtm hone ke baad child update na ho
function removeFromDownstream(parentCell, childCell) {
  //1- fetch parentCell's downstream

  let parentDownstream = dataObj[parentCell].downstream;

  //2- filter kro childCell ko parent ki downstream se

  let filteredDownstream = []; //a1

  for (let i = 0; i < parentDownstream.length; i++) { 
    if (parentDownstream[i] != childCell) {
      filteredDownstream.push(parentDownstream[i]);
    }
  }

  //3- filtered upstream ko wapis save krwado dataObj me req cell me
  dataObj[parentCell].downstream = filteredDownstream
}   