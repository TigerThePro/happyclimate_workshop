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
co2.set("bottom", 9);
co2.set("dresses_suits", 16);
// travel
co2.set("driving", 21.008) // 0.404*52
co2.set("carpool", 21.008) // 0.404*y*52*(x-1)
// x*(y*28.834+102.06) for flight

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

// diet_yes
document.getElementById("diet_yes").addEventListener("click", function(e) {
  var input = this.value;
  document.getElementById("diet_ouput").innerHTML = calc_carbon(input, 1, "plant_diet");
})

// diet_no
document.getElementById("diet_no").addEventListener("click", function(e) {
  document.getElementById("diet_ouput").innerHTML = 0
})


// all normal class
var normal_inputs = document.getElementsByClassName("normal");
for (i = 0; i < normal_inputs.length; i++) {
  normal_inputs[i].addEventListener("input", function(e) {
    var x = this.value;
    var id = this.id;
    var output = id+"_"+"output";
    document.getElementById(output).innerHTML = calc_carbon(x, 1, id);
  })
}

// flight x
document.getElementById("flight_x").addEventListener("input", function(e) {
  var x = this.value;
  var y = document.getElementById("flight_y").value;
  document.getElementById("flight_output").innerHTML = calc_carbon(x, y, "flight");
})

// flight y
document.getElementById("flight_y").addEventListener("input", function(e) {
  var x = document.getElementById("flight_x").value;
  var y = this.value;
  document.getElementById("flight_output").innerHTML = calc_carbon(x, y, "flight");
})

// carpool x
document.getElementById("carpool_x").addEventListener("input", function(e) {
  var x = this.value;
  var y = document.getElementById("carpool_y").value;
  document.getElementById("carpool_output").innerHTML = calc_carbon(x, y, "carpool");
})

// carpool y
document.getElementById("carpool_y").addEventListener("input", function(e) {
  var x = document.getElementById("carpool_x").value;
  var y = this.value;
  document.getElementById("carpool_output").innerHTML = calc_carbon(x, y, "carpool");
})
