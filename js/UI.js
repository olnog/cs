class UI {
  captionArr = {
    'askService': "ask them if they'll come to service",
    'askRefer': "ask them if they have anyone else you can talk to",
    'askDonation': "ask them for a donation",
  }
  maxX = null
  maxY = null
  constructor(maxX, maxY){
    this.maxX = maxX
    this.maxY = maxY
  }


  displayAskButtons(personID){
    let disabledClass = ""
    let html = ''
    for (let i in game.asks){
      if (persons[personID].trust < game.askCost[game.asks[i]]){
        disabledClass = ' disabled '
      }
      let chance = persons[personID].you.trust / game.askCost[game.asks[i]] * 100
      html += "<button id='interact-" + game.asks[i]
          + "-0-0-" + personID + "' class='m-3 interact btn btn-info " + disabledClass + "'>"
          + this.captionArr[game.asks[i]] + " (" + chance +  "%) </button>"
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
    $(".screens").addClass('d-none')
    $("#church").removeClass('d-none')
    $("#churchDuration").html(game.church.duration)
    $("#skip").addClass('d-none')
    $("#numOfAttending").html(game.church.attending.length)
    $("#maxAttending").html(game.church.maxAttending)
    let html = ""
    for (let i in game.church.attending){
      html += "<div>" + persons[game.church.attending[i]].fetchName() + " ("
      + game.church.reaction[game.church.attending[i]] + ")</div>"
    }
    $("#congregation").html(html)
    html = ""
    for (let i in game.church.songs){
      let disabledClass = ''
      if (game.church.songs[i].sungAtService){
        disabledClass = ' disabled '
      }
      html += "<button id='singSong-" + i + "' class='btn btn-secondary ms-3 singSong"
        + disabledClass + "'>sing '" + game.church.songs[i].name + "'</button>"
    }

    $("#churchSongs").html(html)
    if (game.sermon.delivered){
      $("#conductSermon").addClass('d-none')
    }
  }

  displayChurchAttendees(){
    $("#comingToChurch").addClass('d-none')
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
    $(".screens").addClass('d-none')
    $("#home").removeClass('d-none')
    $("#buySong").prop('disabled', false)
    if (game.money < 100){
      $("#buySong").prop('disabled', true)
    }
    let html = ""
    for (let i in game.church.songs){
      html += "<div>" + game.church.songs[i].name + "</div>"
    }
    $("#songList").html(html)
    $("#sermonQualityProgress").css('width', (game.sermon.quality.value * 10) + "%")
    $("#sermonQualityWorkProgress").css('width', (game.sermon.quality.work / game.sermon.quality.value * 100) + "%")
    $("#sermonDurationWorkProgress").css('width', (game.sermon.duration.work / game.sermon.duration.value * 100) + "%")
    $("#sermonDuration").html(game.sermon.duration.value.toFixed(1))
    $("#maxNumOfTopics").html(game.sermon.topics.maxNum)
    $("#numOfTopics").html(game.sermon.topics.bias.length)
    html = ""
    for(let i in game.sermon.topics.bias){
      html += "<div>" + game.biasCaptions.people[game.sermon.topics.bias[i]]
        + " are " + game.sermon.topics.orientation[i] + "</div>"
    }
    $("#topicsIncludedInSermon").html(html)
  }

  displayHouse(){
    let houseNum = game.currentlyAt
    $(".screens").addClass('d-none')
    $("#house").removeClass('d-none')
    let html = ""
    $("#address").html(game.houses.street[houseNum].number + " " + game.houses.street[houseNum].name)
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
    $(".personOrientation").addClass('d-none')
    if (persons[personID].house == game.currentlyAt){
      $(".personAtAddress").removeClass('d-none')
      $("#personAddress").html(game.houses.street[persons[personID].house].number + " "
        + game.houses.street[persons[personID].house].name)
    } else {
      $(".personAtHome").removeClass('d-none')
    }
    let characterization = persons[personID].characterize(personID)
    let html = ""
    for (let i in characterization ){
      html += "<div>"
      let confirmBias = ""
      let unsure = ""
      let confirmedBoldClass =' fw-bold '
      if (!persons[personID].you.knownIdentity.includes(characterization[i])){
        confirmedBoldClass = ''
        unsure = "?"
        confirmBias = this.displayBiasButton(characterization[i], 'neutral', personID, '?', false)
          + this.displayBiasButton(characterization[i], 'bad', personID, '&#128078;', true)
          + this.displayBiasButton(characterization[i], 'good', personID, '&#128077;', true)
      }
      html += confirmBias + "<span class='ms-3 " + confirmedBoldClass  + "'>"
      + game.biasCaptions.identity[characterization[i]] + unsure
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
        $('.personStory').prop('disabled', true)
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

  displaySermonTopics(){
    let html = ""
    for (let i in game.biasCaptions.people){
      if (game.sermon.topics.bias.includes(i)){
        continue
      }
      html += "<div class='fw-bold'>"  + game.biasCaptions.people[i]
        + "</div><div class='mb-1'>"
        +"<button id='addTopic-" + i
        + "-bad' class='addTopic btn btn-danger m-1'>"
        + game.biasCaptions.people[i] + " are bad</button>"
        + "<button id='addTopic-" + i
        + "-good' class='addTopic btn btn-success m-1'>"
        + game.biasCaptions.people[i] + " are good</button></div>"
    }
    $("#sermonTopics").html(html)
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
    this.displayLog()
    $("#dayOfTheWeek").html(game.days[game.whichDay()])
    if (game.whichDay() == 6){
      ui.displayChurch()
    }
  }


  status(msg){

    $("#status").html(msg)
    $("#status").addClass('fw-bold')
    setTimeout(function(){
      $("#status").removeClass('fw-bold')
    }, 1000)
  }
}
