/**
 * Created by viktorgustafsson on 11/03/16.
 */
dinnerPlannerApp.controller('OverviewCtrl', function ($scope,Dinner, $cookieStore) {

    $scope.numberOfGuests = Dinner.getNumberOfGuests();

/*    var getDishFromCoookies = function (dishId) {
        $scope.status = "Loading dish...";
        Dinner.Dish.get({
            "id": dishId
        },function(data){
            console.log(data);
            $scope.dish = data;
            Dinner.addDishToMenu($scope.dish);
        },function(data){
            $scope.status = "There was an error";
        });
    };

    var categories = {"Appetizers":"", "Main Dish":"", "Desserts":""};
    for (key in categories) {
        if ($cookieStore.get(key) != undefined) {
            getDishFromCoookies($cookieStore.get(key));
        }
    }*/

    $scope.getFullMenu = function() {
        return Dinner.getFullMenu();
    }

    $scope.getDishPrice = function(dish) {
        if (Dinner.getDishPrice(dish) > 0) {
            return Dinner.getDishPrice(dish);
        }
    }

    $scope.getTotalMenuPrice = function() {
        return Dinner.getTotalMenuPrice();
    }

    $scope.getNumberOfGuests = function() {
        return Dinner.getNumberOfGuests();
    }

    // TODO in Lab 5: Implement the methods to get the dinner menu
    // add dish to menu and get total menu price

});