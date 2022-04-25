$(document).on('click', '.space', function(e){
  $('.screens').addClass('d-none')
  game.goTo(e.target.id.split('-')[1])
  if (game.livingAt == e.target.id.split('-')[1]){
    ui.displayHome()
    return
  }
  ui.displayHouse(e.target.id.split('-')[1])

})

$(document).on('click', '.addBias', function(e){
  let biasID = e.target.id.split('-')[1]
  let personID = e.target.id.split('-')[2]
  let html = ""
  html += "<button id='addInv-biases-" + biasID + "-bad-" + personID
    + "' class='addInv btn btn-outline-secondary m-3'>"
    + game.biasCaptions.people[game.biases[biasID]] + " are bad</div>"

  html += "<button id='addInv-biases-" + biasID + "-good-" + personID
    + "' class='addInv btn btn-outline-secondary m-3'>"
    + game.biasCaptions.people[game.biases[biasID]] + " are good</div>"
  $(".dialogueOptions").html(html)
})

$(document).on('click', '.addInv', function(e){
  game.addInventory(e.target.id.split('-')[1], e.target.id.split('-')[2],
    e.target.id.split('-')[3], e.target.id.split('-')[4])
  ui.displayPerson(e.target.id.split('-')[4])
})


$(document).on('click', '.back', function(e){
  $('.screens').addClass('d-none')
  $("#map").removeClass('d-none')
  ui.displayMap(game.maxX, game.maxY)
})

$(document).on('click', '#buySong', function(e){
  if (game.money < 100){
    return
  }
  game.songs.push(song.random())
  ui.displayHome()
})

$(document).on('click', '.confirmStory', function(e){
  console.log('hello2')
  persons[e.target.id.split('-')[1]].youConfirm()
  ui.displayPerson(e.target.id.split('-')[1])
})

$(document).on('click', '#doIt', function(e){
  let parsedText = $("#fromText").val()
  let html = ""
  for (let line in parsedText.split('\n')){
    html += "\"" + parsedText.split('\n')[line] + "\", "
  }
  $("#toText").val(html)
})

$(document).on('click', '.interact', function(e){
  persons[e.target.id.split('-')[4]]
    .youInteract(e.target.id.split('-')[1], e.target.id.split('-')[2],
    e.target.id.split('-')[3])
  ui.displayPerson(e.target.id.split('-')[4])
})

$(document).on('click', '.showInventory', function(e){
  if ($('.dialogueOptions').hasClass('d-none')){
    $('.dialogueOptions').removeClass('d-none')
  } else {
    $('.dialogueOptions').addClass('d-none')

  }

})
$(document).on('click', '.knock', function(e){
  game.knock(e.target.id.split('-')[1])
  ui.displayHouse(e.target.id.split('-')[1])
})

$(document).on('click', '.goHouse', function(e){
  $(".screens").addClass("d-none")
  $("#house").removeClass("d-none")
  ui.displayHouse(e.target.id.split('-')[1])
})

$(document).on('click', '#random', function(e){
  game.setRandom()
})

$(document).on('click', '.removeInv', function(e){
  game.removeInventory(e.target.id.split('-')[1], e.target.id.split('-')[2], e.target.id.split('-')[3])
  ui.displayPerson(e.target.id.split('-')[3])
})

$(document).on('click', '.talkTo', function(e){
  persons[e.target.id.split('-')[1]].visit()
  game.loseTime(.1)
  ui.displayPerson(e.target.id.split('-')[1])
})

$(document).on('click', '#showLog', function(e){
  $(".screens").addClass('d-none')
  $("#log").removeClass('d-none')
})

$(document).on('click', '#skipDay', function(e){
  game.day()
})

$(document).on('click', '#skipSunday', function(e){
  let howManyDays = 6 - game.whichDay()
  for (let i = 0; i < howManyDays; i++){
    game.day()
  }

})
$(document).on('click', '#start', function(e){
  game.start()
  $("#identityTest").addClass('d-none')
  $("#game").removeClass('d-none')
})

$(document).on('click', '.space', function(e){
  ui.refresh()
})
$(document).on('click', 'button', function(e){
  ui.refresh()
})
