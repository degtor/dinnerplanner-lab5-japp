// Dinner controller that we use whenever we want to display detailed
// information for one dish
dinnerPlannerApp.controller('DishCtrl', function ($scope,$routeParams,Dinner) {
  
  // TODO in Lab 5: you need to get the dish according to the routing parameter
    var dishId = $routeParams.dishId;
    $scope.status = "Loading dish...";
    Dinner.Dish.get({
            "id": dishId
        },function(data){
            console.log(data);
            $scope.dish = data;
        },function(data){
            $scope.status = "There was an error";
        });

    $scope.addDish = function(dish) {
        Dinner.addDishToMenu(dish);
    }
});