var co2 = new Map();
// food
co2.set("plant_diet", 940);
co2.set("red_meat", 237.12); // 4.56*52
co2.set("other_meat", 36.4);   // 0.70*52
co2.set("cheese", 14.04);  // 0.27*52
co2.set("dairy_milk", 28.6);   // 0.55*52
co2.set("chocolate", 48.88);  // 0.94*52
co2.set("coffee", 8.84);   // 0.17*52
// shopping
co2.set("phone", 72);
co2.set("laptop", 185);
co2.set("tv", 824);
co2.set("jeans", 33);
co2.set("shoes", 14);
co2.set("tops", 10);
co2.set("bottoms", 9);
co2.set("dresses_suits", 16);
// travel
co2.set("driving", 21.008) // 0.404*52
co2.set("carpool", 21.008) // 0.404*y*52*(x-1)
// x*(y*28.834+102.06) for flight

// clear localstorage
function clear_storage() {
  // food
  localStorage.setItem("diet", 0);
  localStorage.setItem("red_meat", 0);
  localStorage.setItem("other_meat", 0);
  localStorage.setItem("cheese", 0);
  localStorage.setItem("dairy_milk", 0);
  localStorage.setItem("chocolate", 0);
  localStorage.setItem("coffee", 0);
  // shopping
  localStorage.setItem("phone", 0);
  localStorage.setItem("laptop", 0);
  localStorage.setItem("tv", 0);
  localStorage.setItem("jeans", 0);
  localStorage.setItem("shoes", 0);
  localStorage.setItem("tops", 0);
  localStorage.setItem("bottoms", 0);
  localStorage.setItem("dresses_suits", 0);
  // travel
  localStorage.setItem("driving", 0);
  localStorage.setItem("flight", 0);
  localStorage.setItem("carpool", 0);
}


// helper function to calculate
function calc_carbon(x, y, category) {
  if (category == "flight") {
    return x * ((y * 28.834) + 102.06);
  } else if (category == "carpool") {
    return x * y * co2.get("carpool");
  } else if (category == "plant_diet"){
    if (x == "yes") {
      return co2.get(category);
    } else {
      return 0;
    }
  } else {
    return x * co2.get(category);
  }
}

if (document.getElementById("diet_yes") && document.getElementById("diet_no")) {
  // diet_yes
  document.getElementById("diet_yes").addEventListener("click", function(e) {
    var input = this.value;
    var result = calc_carbon(input, 1, "plant_diet");
    document.getElementById("diet_output").innerHTML = result;
    localStorage.setItem("diet", result);
  })

  // diet_no
  document.getElementById("diet_no").addEventListener("click", function(e) {
    document.getElementById("diet_output").innerHTML = 0
    localStorage.setItem("diet", 0);
  })
}


// all normal class
var normal_inputs = document.getElementsByClassName("normal");
for (i = 0; i < normal_inputs.length; i++) {
  normal_inputs[i].addEventListener("input", function(e) {
    var x = this.value;
    var id = this.id;
    var output = id+"_"+"output";
    var result = calc_carbon(x, 1, id);
    document.getElementById(output).innerHTML = result;
    localStorage.setItem(id, result);
  })
}

if (document.getElementById("flight_x") && document.getElementById("flight_y")) {
  // flight x
  document.getElementById("flight_x").addEventListener("input", function(e) {
    var x = this.value;
    var y = document.getElementById("flight_y").value;
    var result = calc_carbon(x, y, "flight");
    document.getElementById("flight_output").innerHTML = result;
    localStorage.setItem("flight", result);
  })

  // flight y
  document.getElementById("flight_y").addEventListener("input", function(e) {
    var x = document.getElementById("flight_x").value;
    var y = this.value;
    var result = calc_carbon(x, y, "flight");
    document.getElementById("flight_output").innerHTML = result;
    localStorage.setItem("flight", result);
  })
}


if (document.getElementById("carpool_x") && document.getElementById("carpool_y")) {
  // carpool x
  document.getElementById("carpool_x").addEventListener("input", function(e) {
    var x = this.value;
    var y = document.getElementById("carpool_y").value;
    var result = calc_carbon(x, y, "carpool");
    document.getElementById("carpool_output").innerHTML = result;
    localStorage.setItem("carpool", result);
  })

  // carpool y
  document.getElementById("carpool_y").addEventListener("input", function(e) {
    var x = document.getElementById("carpool_x").value;
    var y = this.value;
    var result = calc_carbon(x, y, "carpool");
    document.getElementById("carpool_output").innerHTML = result;
    localStorage.setItem("carpool", result);
  })
}


// run when report page loaded
function make_report() {
  report_food();
}

// report food
function report_food() {

    // var nm = new Map();
    // nm.set("a", 0);
    // nm.set("a", 2);
    // console.log(nm.get("a"));

  var food_total = 0;
  food_total += Number(localStorage.getItem("diet"));
  console.log(food_total);
  food_total += Number(localStorage.getItem("red_meat"));
  food_total += Number(localStorage.getItem("other_meat"));
  food_total += Number(localStorage.getItem("cheese"));
  food_total += Number(localStorage.getItem("dairy_milk"));
  food_total += Number(localStorage.getItem("chocolate"));
  food_total += Number(localStorage.getItem("coffee"));
  
  document.getElementById("food_report").innerHTML = food_total;
}
