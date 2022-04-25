class UI {
  captionArr = {
    'askService': "ask them if they'll come to service [-10]",
    'askRefer': "ask them if they have anyone else you can talk to [-5]",
    'askDonation': "ask them for a donation [-25]",
  }
  maxX = null
  maxY = null
  constructor(maxX, maxY){
    this.maxX = maxX
    this.maxY = maxY
    this.displayMap()
    this.refresh()
  }


  displayAskButtons(personID){
    let html = ''
    for (let i in game.asks){
      html += "<button id='interact-" + game.asks[i]
          + "-0-0-" + personID + "' class='m-3 interact btn btn-info'>"
          + this.captionArr[game.asks[i]] + "</button>"
    }
    return html
  }
  displayBiasButton(bias, orientation, personID, caption, alt){
    let buttonClassArr = {bad: 'danger', good: 'success', neutral: 'info'}
    let altID = ""
    if (alt){
      altID = "alternate"
    }
    return "<button id='" + altID + "interact-biases-" + game.biases.indexOf(bias) + "-"
      + orientation + "-" + personID + "' class='interact btn btn-" + buttonClassArr[orientation] + "'>"
      + caption + "</button>"
  }

  displayChurch(){
    $("#comingToChurch").addClass('d-none')
    console.log(game.social.comingToService)
    if (game.social.comingToService.length > 0){
      $("#comingToChurch").removeClass('d-none')
      for (let i in game.social.comingToService){
        html += "<div>" + persons[game.social.comingToService[i]].name + " "
          + persons[game.social.comingToService[i]].surname
          + " (House #" + persons[game.social.comingToService].house + ")"
      }
      $(".comingToChurchContent").html(html)
    }
  }
  displayHome(){
    $("#home").removeClass('d-none')
    $("#buySong").prop('disabled', false)

    if (game.money < 100){
      $("#buySong").prop('disabled', true)
    }
    let html = ""
    for (let i in game.songs){
      html += "<div>" + game.songs[i] + "</div>"
    }
    $("#songList").html(html)
  }

  displayHouse(houseNum){
    $("#house").removeClass('d-none')

    let html = ""
    $(".houseNum").html(houseNum)
    $("#houseVisits").html(game.houses.visited[houseNum])
    $("#noAnswer").addClass('d-none')
    $(".knock").attr('id', 'knock-' + houseNum)
    $("#houseOpened").addClass('d-none')
    $("#houseNew").removeClass('d-none')
    if (game.houses.knockedToday[houseNum]){
      $("#noAnswer").removeClass('d-none')
      $("#houseNew").addClass("d-none")


    }
    if (game.houses.opened[houseNum]){
      $("#houseOpened").removeClass('d-none')
      $("#houseNew").addClass('d-none')
    }
    let badActors = 0
    for (let occupant in game.houses.occupants[houseNum]){
      let badActorClass = ""
      if (persons[game.houses.occupants[houseNum][occupant]].you.maxTrust < 1){
        badActors ++
        badActorClass = ' badActor '
      }
      html += "<div class='" + badActorClass + "'><button id='talkTo-"
        + game.houses.occupants[houseNum][occupant]
        + "' class='talkTo btn btn-outline-dark'>"
        + persons[game.houses.occupants[houseNum][occupant]].name + " "
        + persons[game.houses.occupants[houseNum][occupant]].surname + "</button> "
      html += persons[game.houses.occupants[houseNum][occupant]].you.trust + "/"
        + persons[game.houses.occupants[houseNum][occupant]].you.maxTrust
        + "</div>"

    }
    $("#houseOccupants").html(html)
    $("#numOfBadActors").html(badActors)
    $("#numOfOccupants").html(game.houses.occupants[houseNum].length)
    if (badActors > 0 ){
      $(".badActor").addClass('d-none')
      $("#badActorsDiv").removeClass('d-none')
    }
  }

  displayInventory(personID){
    let biasCaptionArr = {
      '-1': '(bad)', 0: "?", 1:"(good)"
    }
    let captionArr = {
      'askService': "ask them if they'll come to service [-10]",
      'askRefer': "ask them if they have anyone else you can talk to [-5]",
      'askDonation': "ask them for a donation [-25]",
    }
    let html = ''
    html = "<div class='text-center'>"

    html += "</div>"
    let invBiases = game.biases.slice().sort()

    for (let i in game.biasCaptions.people){
      html += "<button id='addBias-" + game.biases.indexOf(i) + "-" + personID
        + "' class='m-3 addBias btn btn-outline-secondary'>"
        + game.biasCaptions.people[i] + "</button>"
    }
    $(".dialogueOptions").html(html)

  }

  displayLog(){
    let html = ""
    for (let i in game.log){
      html += "<div>" +  game.log[i] + "</div>"
    }
    $("#logContent").html(html)
  }

  displayMap(){
    $(".screens").addClass("d-none")
    $("#map").removeClass("d-none")
    let html = ""
    let houseID = 1
    for (let y = 0; y < this.maxY; y++){
      html += "<div>"
      for (let x = 0; x < this.maxX; x++){
        let houseClass = ''
        if (houseID == game.livingAt){
          houseClass = ' home '
        } else if (game.houses.opened[houseID]){
          houseClass = ' opened '
        } else if (game.houses.visited[houseID] > 0){
          houseClass = ' visited '
        }

        let houseCaption = houseID
        if (houseID == game.currentlyAt){
          houseCaption = 'x'
        } else if (houseID == game.livingAt){
          houseCaption = '&#x2302;'


        }
        html += "<span id='map-" + houseID
          + "' class='space " + houseClass + "'><button id='house-" + houseID
          + "' class='house btn btn-dark-outline'>" + houseCaption
          + "</button></span>"
        houseID++
      }
      html += "</html>"
    }
    $("#mapDisplay").html(html)
  }

  displayPerson(personID){
    $(".goHouse").attr ('id', "goHouse-" + persons[personID].house)
    $(".screens").addClass('d-none')
    $("#person").removeClass('d-none')
    let characterization = persons[personID].characterize(personID)
    let html = ""
    for (let i in characterization ){
      html += "<div>"
      let confirmBias = "<button class='btn btn-outline-info' disabled>&#10003;</button>"
      if (!persons[personID].you.knownIdentity.includes(characterization[i])){
        confirmBias = this.displayBiasButton(characterization[i], 'neutral', personID, '?', false)
          + this.displayBiasButton(characterization[i], 'bad', personID, '&#128078;', true)
          + this.displayBiasButton(characterization[i], 'good', personID, '&#128077;', true)
      }
      html += confirmBias + "<span class='ms-3'>"
      + game.biasCaptions.identity[characterization[i]] + "?"
      + "</span>"
      + "</div>"
    }

    $(".personCharacterization").html(html)
    html = ""
    html = persons[personID].name + " " + persons[personID].surname + " <span id='personTrust'>("
      + persons[personID].you.trust + "/" + persons[personID].you.maxTrust + ")</span>"
    $(".personAbout").html(html)
    html = ""
    if (!persons[personID].you.knowStory){
      html += "<button id='confirmStory-" + personID
        + "' class='confirmStory btn btn-info me-3'>?</button>"
    }
    html += persons[personID].story.narration
    $(".personStory").html(html)
    $(".universalInventory").html(ui.displayAskButtons(personID))
    $(".personInventory").html(ui.generateCurrentInventory(personID))
    ui.displayInventory(personID)
    $('.interact').prop('disabled', false)
    if (persons[personID].you.trust == 0){
      $('.interact').prop('disabled', true)
    }
    let knownBiases = persons[personID].fetchKnownBiases()
    let biasedArr = {good: "biased in favor:", bad: 'biased against: '}
    html = ""
    for (let goodOrBad in knownBiases){
      if (knownBiases[goodOrBad].length > 0){
        html += "<div class='fw-bold'>" + biasedArr[goodOrBad] + "</div>"
      }

      for (let i in knownBiases[goodOrBad]){
        html += "<div class='ms-3'>" + knownBiases[goodOrBad][i] + "</div>"
      }
    }
    $("#personKnownBiases").html(html)
  }

  displayTest(){
    let html = "<div class='row'><div class='col'>"
    for (let i in game.demographics){
      let whichDemographic = game.demographics[i]
      let optionalStr = ''
      let optionalInputStr = ''
      if (i == 'age' || i == 'disability'){
        html += "</div><div class='col'>"
      }

      if (game.optionalBiases.includes(i)){
        optionalStr = " (optional)"

      }
      html += "<div class=' mt-3'><span class='fw-bold'>" + i + "</span>"
        + optionalStr + "</div>"
      for (let n in whichDemographic){
        let bias = whichDemographic[n]
        html += "<div class='ms-3'>"
        + "<input type='radio' name='" + i + "' id='identity-" + i + "-"
          + bias + "' class='identity identity-" + i + " me-3' value='"+ bias + "'>"
        + bias
        + "</div>"
      }
    }

    html += "</div>"

    $("#identityTestContent").html(html)
  }

  generateCurrentInventory(personID){
    let biasArr = {
      caption: {'-1': '(bad)', 0: "?", 1:"(good)"},
      orientation: {'-1': "bad", 0: "neutral", 1:"good"},
    }
    let html = ""
    for (let i = 0; i < persons[personID].inventory.biases.length; i++){
      html += "<div class='mb-3'>"
      html += "<button id='removeInv-biases-" + i + "-" + personID
        + "' class='removeInv btn btn-warning me-3'>x</button>"
      html += this.displayBiasButton(persons[personID].inventory.biases[i],
        biasArr.orientation[persons[personID].inventory.orientation[i]],
        personID, "tell them that you think " + game.biasCaptions.people[persons[personID].inventory.biases[i]] + " are "
        + biasArr.orientation[persons[personID].inventory.orientation[i]], false)
      html += "</div>"
    }
    return html
  }

  refresh(){
    $("#time").html((game.time).toLocaleString())
    $("#money").html(game.money)
    $("#dayNum").html(game.dayNum)
    //console.log(game.houses.visited)
    this.displayLog()

  }


  status(msg){

    $("#status").html(msg)
    $("#status").addClass('fw-bold')
    setTimeout(function(){
      $("#status").removeClass('fw-bold')
    }, 1000)
  }
}
