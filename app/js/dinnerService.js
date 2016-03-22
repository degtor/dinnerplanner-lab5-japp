// Here we create an Angular service that we will use for our 
// model. In your controllers (or other services) you can include the
// dependency on any service you need. Angular will insure that the
// service is created first time it is needed and then just reuse it
// the next time.
dinnerPlannerApp.factory('Dinner',function ($resource, $cookieStore) {
  var numberOfGuests = 2;
  if ($cookieStore.get('numGuests') != undefined) {
    numberOfGuests = $cookieStore.get('numGuests')
  }

  this.menu = [];
  // TODO in Lab 5: Add your model code from previous labs
  // feel free to remove above example code
  // you will need to modify the model (getDish and getAllDishes) 
  // a bit to take the advantage of Angular resource service
  // check lab 5 instructions for details
  // sV1fPGQKrO0b6oUYb6w9kLI8BORLiWox - BIG KEY

  // Nya API-Callsen istället för getDish och getalldishes.
  this.DishSearch = $resource('http://api.bigoven.com/recipes',{pg:1,rpp:9,api_key:'3stL5NVP4s6ZkmK5gt4dci8a4zOQRpD4'});
  this.Dish = $resource('http://api.bigoven.com/recipe/:id',{api_key:'3stL5NVP4s6ZkmK5gt4dci8a4zOQRpD4'});

  this.setNumberOfGuests = function (num) {
      if (num > 0) {
        numberOfGuests = num;
        $cookieStore.put("numGuests", numberOfGuests);
      }
  };

  // should return
  this.getNumberOfGuests = function () {
    return numberOfGuests;
  };


    //Returns all the dishes on the menu.
    this.getFullMenu = function () {
      return this.menu;
    };

    //Returns all ingredients for all the dishes on the menu.
    this.getAllIngredients = function () {
      var sumIngredients = [];
      for (var dish in this.menu) {
        for (var i in this.menu[dish].Ingredients) {
          sumIngredients.push(this.menu[dish].Ingredients[i]);
        }
      }
      return sumIngredients;
    };

    //Returns the total price of the menu (all the ingredients multiplied by number of guests).
    this.getTotalMenuPrice = function () {
      var totalPrice = 0;
      var ingredients = this.getAllIngredients();
      var guests = this.getNumberOfGuests();
      for (var each in ingredients) {
        totalPrice += 1;
      }
      return totalPrice * guests;
    };

    //Adds the passed dish to the menu. If the dish of that type already exists on the menu
    //it is removed from the menu and the new one added.
    this.addDishToMenu = function (dish) {
      for (var i = 0; i < this.menu.length; i++) {
        console.log(i);
        if (dish.Category === this.menu[i].Category) {
          console.log("dish.Category = " + dish.Category + "this.menu[i] : " + this.menu[i].Category);
          console.log("INDEX IS :" + this.menu.indexOf(dish));
          this.menu.splice(this.menu.indexOf(this.menu[i]), 1);
        }
      }
      this.menu.push(dish);
      var type = dish.Category;
      $cookieStore.put(type, dish.RecipeID);

    };

    //Removes dish from menu
    this.removeDishFromMenu = function (dish) {
      this.menu.splice(this.menu.indexOf(dish), 1);
      $cookieStore.remove(dish.Category);
    };

    this.getDishPrice = function (dish) {
      dishPrice = 0;
      for (i in dish.Ingredients) {
        dishPrice += 1;
      }
      return dishPrice;
    };



  // Angular service needs to return an object that has all the
  // methods created in it. You can consider that this is instead
  // of calling var model = new DinnerModel() we did in the previous labs
  // This is because Angular takes care of creating it when needed.
  return this;

});