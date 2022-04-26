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

$(document).on('click', '#addSermonTopic', function(e){
  ui.displaySermonTopics()

})

$(document).on('click', '.addTopic', function(e){
  game.addTopic(e.target.id.split('-')[1], e.target.id.split('-')[2])
  ui.displayHome()
  ui.displaySermonTopics()
})

$(document).on('click', '.backHouse', function(e){
  ui.displayHouse()
})

$(document).on('click', '.backHome', function(e){
  game.backHome()
  ui.displayHome()
})
$(document).on('click', '#buySong', function(e){
  if (game.money < 100){
    return
  }
  game.songs.push(song.random())
  ui.displayHome()
})

$(document).on('click', '#conductSermon', function(e){
  game.conductSermon()
  ui.displayChurch()
})

$(document).on('click', '.confirmStory', function(e){
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

$(document).on('click', '#hitTheStreets', function(e){
  game.hitTheStreets()
  ui.displayHouse()
})

$(document).on('click', '.interact', function(e){
  persons[e.target.id.split('-')[4]]
    .youInteract(e.target.id.split('-')[1], e.target.id.split('-')[2],
    e.target.id.split('-')[3])
  ui.displayPerson(e.target.id.split('-')[4])
})

$(document).on('click', '#nextDoor', function(e){
  game.nextDoor()
  ui.displayHouse(game.houses.visited.length-1)
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

$(document).on('click', '.singSong', function(e){
  game.singSong(e.target.id.split('-')[1])
  ui.displayChurch()
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

$(document).on('click', '.workSermon', function(e){
  if (game.automatingWork == null){
    ui.status("You start working on the " + e.target.id.split('-')[1]
      + " of your sermon for this Sunday. " )
    $(".workSermon").prop('disabled', true)
    $("#" + e.target.id).prop('disabled', false)
    $("#" + e.target.id).removeClass('btn-outline-primary')
    $("#" + e.target.id).addClass('btn-danger')
    game.automatingWork = setInterval(function(){
      game.workSermon(e.target.id.split('-')[1])
      if (game.time < .1 || game.sermon.quality.value >= 10
          || game.sermon.duration.value >= 2){
        game.stopAutomation()
      }
      ui.refresh()
      ui.displayHome()
    }, 2000)
    return
  }
  game.stopAutomation()

})


$(document).on('click', '.space', function(e){
  ui.refresh()
})
$(document).on('click', "button:not(.workSermon)", function(e){
  if (game.automatingWork != null){
    game.stopAutomation()
  }

  ui.refresh()
})
