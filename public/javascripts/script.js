$(document).ready(function(){
  $.getJSON("/movie/fetch_state",fillState);

function fillState(json)
{
  const data=json.result;
  data.map((item)=>{
    $('#stateid').append(
      $('<option>').text(item.statename).val(item.stateid)
    )
  })
}

$('#stateid').change(function(){
  $.getJSON("/movie/fetch_city",{stateid:$("#stateid").val()},fillCityData)
})

function fillCityData(json)
{console.log(json);
  const data=json.result;
  $("#cityid").empty()
  $("#cityid").append($("<option>").text("-Select City-"));
  data.map((item)=>{
    $("#cityid").append($("<option>").text(item.cityname).val(item.cityid))
  })
}

$.getJSON("/movie/fetch_cinema",fillCinema);

function fillCinema(json)
{
  const data=json.result;
  data.map((item)=>{
    $('#cinemaid').append(
      $('<option>').text(item.cinemaname).val(item.cinemaid)
    )
  })
}

$('#cinemaid').change(function(){
  $.getJSON("/movie/fetch_screen",{cinemaid:$("#cinemaid").val()},fillScreenData)
})

function fillScreenData(json)
{console.log(json);
  const data=json.result;
  $("#screenid").empty()
  $("#screenid").append($("<option>").text("-Select Screen-"));
  data.map((item)=>{
    $("#screenid").append($("<option>").text(item.screenname).val(item.screenid))
  })
}



})
