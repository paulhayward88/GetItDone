var movieFire = angular.module("MovieFire", ["firebase"]);
 
function MainController($scope, $firebase) {
    
    

    
    $scope.favMovies = $firebase(new Firebase('https://todotester.firebaseio.com/task/'));
    $scope.CompTask = $firebase(new Firebase('https://todotester.firebaseio.com/complete/'));
    $scope.movies = [];

    
    

    
    $scope.favMovies.$on('value', function() {
        $scope.movies = [];

        var mvs = $scope.favMovies.$getIndex();
        var tms = $scope.favMovies.$getIndex();
        var des = $scope.favMovies.$getIndex();
     //   var com = $scope.favMovies.$getIndex();
        for (var i = 0; i < mvs.length; i++) {
            $scope.movies.push({
                name: $scope.favMovies[mvs[i]].name,
                date: $scope.favMovies[tms[i]].date,
                desc: $scope.favMovies[des[i]].desc,
         //       comb: $scope.favMovies[com[i]].comb,   
                key: mvs[i],
            });
        };
    });
    
    
    
 /*-------------------------------------------------------------------
    Save new Task and time to firebase
---------------------------------------------------------------------*/
    $scope.saveToList = function(event) {
        if (event.which == 13 || event.keyCode == 13) {
            var mvName = $scope.mvName.trim();
            var taskDesc = $scope.taskDesc.trim();
         // var compBy = $scope.completeDate.trim();
            var currentdate = new Date(); 
            var datetime = currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " at "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();
            
                if (mvName.length > 0 ) {
                    $scope.favMovies.$add({
                 
                    name: mvName,
                    date: datetime,
                    desc: taskDesc,
            //        comb: compBy,
                    
                    
                });
                    movieName.value = '';
                    Description.value = '';//movieName is the ID of  input box - Angular rocks!
            }
        }
    }
    
/*-------------------------------------------------------------------
   View Description
---------------------------------------------------------------------*/
    $scope.viewDesc = function(index) {
    	var vd = $scope.movies[index];
        var mv = $scope.movies[index];
        var tm = $scope.movies[index];
        var newDesc = prompt("Update the task description", vd.desc); // to keep things simple and old skool :D
        if (newDesc && newDesc.length > 0) {
            // build the FB endpoint to the item in movies collection
            var updateMovieRef = buildEndPoint(mv.key, $firebase);
            updateMovieRef.$set({
                name: mv.name,
                desc: newDesc,
                date: tm.date
            });
        }
    }   

    
    
  /*-------------------------------------------------------------------
   edit Task on firebase
---------------------------------------------------------------------*/
    $scope.edit = function(index) {
    	var mv = $scope.movies[index];
        var newName = prompt("Update the task name", mv.name); // to keep things simple and old skool :D
        if (newName && newName.length > 0) {
            // build the FB endpoint to the item in movies collection
            var updateMovieRef = buildEndPoint(mv.key, $firebase);
            updateMovieRef.$set({
                name: newName
            });
        }
    }
    
    
  /*-------------------------------------------------------------------
  delete task from firebase
---------------------------------------------------------------------*/
    $scope.del = function(index) {
    	var mv = $scope.movies[index];
        var response = confirm("Are certain about removing \"" + mv.name + "\" from the list?");
        if (response == true) {
            // build the FB endpoint to the item in movies collection
            var deleteMovieRef = buildEndPoint(mv.key, $firebase);
          deleteMovieRef.$remove();        
        }
    }
/*-------------------------------------------------------------------
    Check time Task was created
---------------------------------------------------------------------*/
    $scope.timeCheck = function(index) {
        var tm = $scope.movies[index];
        var cb = $scope.movies[index];
        var response = confirm("This task was created on the \"" + tm.date + "\" Your target date was\"" + cb.comb + "")
        if (response == true) {
 
        }
    }
/*-------------------------------------------------------------------
    Make Task as Completed
---------------------------------------------------------------------*/
    $scope.complete = function(index) {
        var mv = $scope.movies[index];
        var tm = $scope.movies[index];
         var currentdate = new Date(); 
            var datetime = currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " at "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();
        
        var response = confirm("Are certain about removing \"" + mv.name + "\" from the list?");
        if (response == true) {
          $scope.CompTask.$add({
                    name: mv.name,
                    date: tm.date,
                    comp: datetime,
              
                });  
                var deleteMovieRef = buildEndPoint(mv.key, $firebase);
                deleteMovieRef.$remove();
                movieName.value = '';
               
        }
    }
    
/*-------------------------------------------------------------------
 Delete all Incomplete Tasks from Firebase
---------------------------------------------------------------------*/
 $scope.wipeIn = function(index) {
        var mv = $scope.movies[index];
        var response = confirm("REMOVE EVERYTHING IN THE COMPLETED LIST?");
        if (response == true) {
           ref = new Firebase("https://todotester.firebaseio.com/task/")
           ref.remove();       
        }
    } 
        
 /*-------------------------------------------------------------------
 Checking the update
---------------------------------------------------------------------*/
     $scope.saveToList2 = function(event) {
        if (event.which == 13 || event.keyCode == 13) {
            var mvName = $scope.mvName.trim();
            var taskDesc = $scope.taskDesc.trim();
         // var compBy = $scope.completeDate.trim();
            var currentdate = new Date(); 
            
            var datetime = currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " at "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();
            
            var response = confirm("Are you sure you want to add Task \"" + mvName + "\" to the list?")
            if (response == true) {
         
        
                if (mvName.length > 0 ) {
                    $scope.favMovies.$add({
                 
                    name: mvName,   
                    date: datetime,
                    desc: taskDesc,
            //        comb: compBy,
                    
                    
                });
                    movieName.value = '';
                    Description.value = '';//movieName is the ID of  input box - Angular rocks!
            }
        
            }
        
            
    }
}   

    
    
 /*-------------------------------------------------------------------
    Reload page Continuously
---------------------------------------------------------------------*/
        function buildEndPoint(key, $firebase) {
        return $firebase(new Firebase('https://todotester.firebaseio.com/task/' + key));
    }
}

/*-------------------------------------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------------------------------------
--------------------------------------------------------Second-Controller--------------------------------------------------------
---------------------------------------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------------------------------------*/
function secondController($scope, $firebase) {
    
    $scope.CompTask.$on('value', function() {
        $scope.movies = [];
        var mvs = $scope.CompTask.$getIndex();
        var tms = $scope.CompTask.$getIndex();
        var com = $scope.CompTask.$getIndex();
        for (var i = 0; i < mvs.length; i++) {
            $scope.movies.push({
                name: $scope.CompTask[mvs[i]].name,
                date: $scope.CompTask[tms[i]].date,
                comp: $scope.CompTask[tms[i]].comp,
                key: mvs[i]
            });
        };
    });
/*-------------------------------------------------------------------
   edit Task on firebase
---------------------------------------------------------------------*/
 $scope.editTask = function(index) {
    	var mv = $scope.movies[index];
        var newName = prompt("Update the task name", mv.name); // to keep things simple and old skool :D
        if (newName && newName.length > 0) {
            // build the FB endpoint to the item in movies collection
            
            var updateMovieRef = buildEndPoint(mv.key, $firebase);
            updateMovieRef.$update({
                name: newName
            });
        }
    }
/*-------------------------------------------------------------------
   Mark completed Task as incomplete
---------------------------------------------------------------------*/ 
    $scope.Incomplete = function(index) {
        var mv = $scope.movies[index];
        var tm = $scope.movies[index];
        var response = confirm("Are certain about removing \"" + mv.name + "\" from the list?");
        if (response == true) {
          $scope.favMovies.$add({
                    name: mv.name,
                    date: tm.date,
                });     
                var deleteMovieRef = buildEndPoint(mv.key, $firebase);
                deleteMovieRef.$remove();
        }
 }
/*-------------------------------------------------------------------
 Delete Task from Firebase
---------------------------------------------------------------------*/
        $scope.delo = function(index) {
    	var mv = $scope.movies[index];
        var response = confirm("Are certain about removing \"" + mv.name + "\" from the list?");
        if (response == true) {
            var deleteMovieRef = buildEndPoint(mv.key, $firebase);
          deleteMovieRef.$remove();        
        }
    }
        
/*-------------------------------------------------------------------
    Check time Task was created
---------------------------------------------------------------------*/
    $scope.timeComplete = function(index) {
        var tm = $scope.movies[index];
        var co = $scope.movies[index];
        var response = confirm("This task created on \"" + tm.date + "\" and marked completed on \"" + co.comp + "\" " );
        if (response == true) {
 
        }
    }    
/*-------------------------------------------------------------------
 Delete all Tasks from Firebase
---------------------------------------------------------------------*/
 $scope.wipe = function(index) {
        var mv = $scope.movies[index];
        var response = confirm("REMOVE EVERYTHING IN THE COMPLETED LIST?");
        if (response == true) {
           ref = new Firebase("https://todotester.firebaseio.com/complete/")
           ref.remove();       
        }
    } 
        
        
        
        
        
/*-------------------------------------------------------------------
   Reload Data Continuously
---------------------------------------------------------------------*/
        function buildEndPoint(key, $firebase) {
            return $firebase(new Firebase('https://todotester.firebaseio.com/complete/' + key));
     }
}





