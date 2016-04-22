// ** Room constructor function
function Room(id, rate, number, hotelId) {
    this.id = id;
    this.rate = rate;
    this.number = number;
    this.hotelId = hotelId;
    this.status = 'available';
}

Room.prototype.displayRoom = function() {
  return $("<tr>").append(
      $("<td>").text(this.id),
      $("<td>").text(this.rate),
      $("<td>").text(this.number),
      $("<td>").text(this.hotelId),
      $("<td>").text(this.status)
  );
}

// The list of all available rooms
var CURRENT_ROOMS = [

];

$(function(){
  // 1.
  getRooms();

  // ** Added if-else statement to more clear status text
  function getRooms() {
    var ajaxObject = {
        url: 'https://dbc-sinatra-api.herokuapp.com/rooms/all',
        method: 'get'
    };

    var onSuccess = function(response){
        CURRENT_ROOMS = $.map(response.data, function(room){
          return new Room(room.id, room.rate, room.number, room.hotel_id)
        })
        console.log('we got the rooms', CURRENT_ROOMS)
        updateRoomsTable(CURRENT_ROOMS)
    };

    var onFail = function(error) {
        console.error(error);
    };

    var request = $.ajax(ajaxObject);

    // BIG CALLBACK TALK
    request.done(onSuccess);
    request.fail(onFail);
  }

  var updateRoomsTable = function(rooms) {
    $.fn.append.apply($('#tbody'), $.map(rooms, function(room){
      return room.displayRoom()
    }));
  };

  // Clears the data in the form so that it's easy to enter a new project.
  // Added new fields
  // var resetForm = function($form) {
  //     $form.find("#project-type").val("");
  //     $form.find("#project-name").val("");
  //     $form.find("#project-reference-type").val(""),
  //     $form.find("#project-reference").val(""),
  //     $form.find("input:first").focus();
  // };

  // // ** Changes the color of status values to green or red
  // var changeFormat = function(){
  //     $("table tr").each(function() {
  //     var status = $(this).children("td").eq(6).text()
  //         if(status === "Pull or rebase"){
  //             $(this).children("td").eq(6).addClass("red");
  //         }else{
  //             $(this).children("td").eq(6).addClass("green");
  //         }
  //     });
  // };

  // // ** Select base to compare commits and defines variable base
  // $("#select-base-form").submit(function(e){
  //     var $form = $(this);

  //     // Bad global variable setting
  //     base = $form.find("#project-base-line").val(),

  //     $("#base").text(base)
  //     e.preventDefault();
  // });

  // // ** Updates the values of status of each project
  // $("#update").click(function(){
  //     $("#tbody").empty();
  //     updateProjects($projectTable, CURRENT_PROJECTS);
  //     changeFormat();
  // });

});
