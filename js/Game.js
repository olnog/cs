class Game{
  automatingWork = null
  maxX = 8
  maxY = 8
  asks = ['askDonation', 'askRefer', 'askService' ]
  askCost = {
    'askDonation': 25, 'askRefer': 5, 'askService': 10
  }
  alphaBiases =[]
  biases = [
    'door2door', 'nonChurch', 'nrm',
    'straight', 'gay', 'trans', 'bisexual', 'asexual', 'nonbinary',
    'white', 'black', 'asian', 'indian', 'hispanic', 'arab', 'native',
    'immigrant', 'undocumented',
    'blueCollar', 'middleClass', 'rich', 'homeless',
    'male', 'female',
    'old', 'kid', 'teen', 'adult',
    'jew', 'mormon', 'catholic', 'jehovahWitness', 'muslim', 'buddhist', 'atheist', 'protestant',
    'autism', 'schitzo', 'depression', 'bipolar', 'borderline', 'narc', 'paranoid',
    'smoker', 'addiction', 'alcohol',
    'wheelchair', 'blind', 'deaf', 'amputee'
  ]

  biasCaptions = {
    identity:{
      straight: 'straight', gay: 'gay', bisexual: 'bisexual', trans: 'transgender', asexual: 'asexual', nonbinary: 'nonbinary',
      white: 'white', black: 'black', asian: 'Asian-American', indian: 'Indian-American',
        hispanic: 'Hispanic', arab: 'Middle Eastern', native: 'Native American',
      immigrant: 'immigrant', undocumented: 'undocumented',
      blueCollar: 'poor', middleClass: 'middle class', rich: 'rich', homeless: 'houseless',
      male: 'male', female: 'female',
      old: 'elderly', kid: 'juvenile', teen: 'teenager', adult: 'adult',
      jew: 'Jewish', mormon: 'Mormon', catholic: 'Catholic', jehovahWitness: "Jehovah's Witness",
        muslim: 'Muslim', buddhist: 'Buddhist', atheist: 'Atheist', protestant: 'Protestant',
      autism: 'autistic', schitzo: 'schitzophrenic', bipolar: 'bipolar', borderline: 'borderline',
        depression: 'depressed', narc: 'narcissistic', paranoid: 'paranoid',
      smoker: 'smoker', addiction: 'addict', alcohol: 'alcoholic',
      wheelchair: 'in a wheel chair', blind: 'blind', deaf: 'deaf', amputee: 'amputee',
    },
    people: {
      door2door: "solicitors", nonChurch: "congregations without a church", nrm: 'new religious movements',
      straight: "straight people", gay: "gay people", trans: "transgender people", bisexual: "bisexual people",
      asexual: "asexual people", nonbinary: "nonbinary people",
      white: "white people", black: "black people", asian: "Asian-Americans",
      indian: "Indian-Americans", hispanic: "Hispanics", arab: "Middle Eastern people", native: "Native Americans",
      immigrant: 'immigrants', undocumented: "undocumented immigrants",
      blueCollar: 'poor people', middleClass: "the middle class", rich: "the rich", homeless: "the homeless",
      male: "men", female: "women",
      old: 'elderly people', kid: 'juveniles', teen: 'teenagers', adult: 'adults',
      jew: 'Jewish people', mormon: 'Mormons', catholic: 'Catholics',
        jehovahWitness: "Jehovah's Witnesses", muslim: 'Muslims',
        buddhist: 'Buddhists', atheist: 'Atheists', protestant: "Protestants",
      autism: 'autistic people', schitzo: 'schitzophrenic people',
        depression: 'people with depression',
        bipolar: 'people with bipolar disorder',
        borderline: 'people with borderline personality disorder',
        narc: 'people with narcissistic pesonality disorder',
        paranoid: 'people with paranoid personality disorder',
      smoker: 'smokers', addiction: 'people with substance use disorders', alcohol: 'alcoholics',
      wheelchair: 'people confined to a wheelchair', blind: 'the visually impaired', deaf: 'the hearing impaired', amputee: 'amputees'
    }
  }
  church = {
    attending: [],
    duration: 0,
    maxAttending: 10,
    songs: [],
    reaction: [],
  }
  days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
  dayNum = 1
  demographics = {
    lgbtq:       ['straight', 'gay', 'trans', 'bisexual', 'asexual', 'nonbinary'],
    race:        ['white', 'black', 'asian', 'indian', 'hispanic', 'arab', 'native'],
    citizenship: ['immigrant', 'undocumented'], // possible include citizen
    socialClass: ['blueCollar', 'middleClass', 'rich', 'homeless'],
    sex: ['male', 'female'],
    age: ['old', 'kid', 'teen', 'adult'],
    religion: ['jew', 'mormon', 'catholic', 'jehovahWitness', 'muslim', 'buddhist', 'atheist', 'protestant'],
    psych: ['autism', 'schitzo', 'depression', 'bipolar', 'borderline', 'narc', 'paranoid'],
    substance: ['smoker', 'addiction', 'alcohol'],
    disability: ['wheelchair', 'blind', 'deaf', 'amputee'],
  }
  currentlyAt = null
  groups = { }
  houses = {
    x: [],
    y: [],
    distance: [],
    door2door: [],
    knockedToday: [],
    occupants: [],
    opened: [],
    street: [],
    visited: [],
  }
  livingAt = null
  log = []
  maxInventorySize = 7
  money = 0
  numOfGroups = 10
  optionalBiases = ['psych', 'substance', 'disability', 'citizenship']
  sermon = {
    delivered: false,
    duration: {

      value: .2, //default .2
      work: 0,
    },
    quality: {

      value: 1, //default 1
      work: 0,
    },
    topics: {
      bias: [],
      orientation: [],
      maxNum: 4,
    }
  }
  street = {
    distance: null,
    name: null,
    number: null,

  }
  time = 8
  yourIdentity = []



  constructor(){
    for (let i = 1; i < this.numOfGroups + 1; i++){
      this.groups[i] = []
    }
    this.livingAt = Math.round(Math.random() * ((this.maxX * this.maxY) - 1) + 1)
    this.currentlyAt = this.livingAt
    let peopleCaptions = Object.values(this.biasCaptions.people).slice(0, this.biasCaptions.people.length)
    peopleCaptions.sort()
    let newObjectSortedByValue = {}
    for (let i in peopleCaptions){
      for (let n in this.biasCaptions.people){
        if(this.biasCaptions.people[n] == peopleCaptions[i]){
          newObjectSortedByValue[n] = this.biasCaptions.people[n]
        }
      }
    }
    this.biasCaptions.people = newObjectSortedByValue
  }

  addInventory( inventoryType, biasID, orientation, personID){
    if (persons[personID].inventory.asks.length
      + persons[personID].inventory.biases.length
      >= persons[personID].inventory.max ){
        ui.status("You already have too many dialogue options as it is. Remove some first.")
      return
    }
    if (inventoryType != 'biases'){
      persons[personID].inventory.asks.push(inventoryType)
      return
    }
    let biasesOrientArr = {
      'bad': -1, 'neutral': 0, 'good': 1
    }
    //do check if its already there
    if (persons[personID].inventory.biases.includes(this.biases[biasID])){
      ui.status("You've already added this dialogue option.")
      return
    }
    persons[personID].inventory.biases.push(this.biases[biasID])
    persons[personID].inventory.orientation.push(biasesOrientArr[orientation])
  }

  addLog(msg){
    this.log.push(msg)
  }

  addTopic(biasName, orientation){
    if (this.sermon.topics.bias.length >= this.sermon.topics.maxNum){
      ui.status("That's as many topics as you can put in a sermon.")
      return
    } else if (this.sermon.topics.bias.includes(biasName)){
      ui.status("You're already talking about this topic in your sermon.")
      return
    }
    this.sermon.topics.bias.push(biasName)
    this.sermon.topics.orientation.push(orientation)
    ui.status ("In your sermon, you write about how "
      + this.biasCaptions.people[biasName] + " are " + orientation + ".")
      this.loseTime(.1)
  }

  backHome(){
    this.street.name = null
    this.street.number = null
    ui.status("It took " + this.street.distance + "h to head back home.")
    this.street.distance = null

  }

  churchTime(){
    this.church.duration += .1
  }

  conductSermon(){
    for (let i in this.church.attending){
      let personID = this.church.attending[i]
      let sermonPref = persons[personID].church.sermon
      if (this.sermon.duration.value >= sermonPref.durationMin
        && this.sermon.duration.value <= sermonPref.durationMin){
        this.church.reaction[personID] ++
      } else if (this.sermon.duration.value < sermonPref.durationMin){
        this.church.reaction[personID]--
        game.addLog(persons[personID].fetchName()
          + " didn't like how short the sermon was. (" + this.sermon.duration.value
          + "h)")
      } else if (this.sermon.duration.value > sermonPref.durationMax){
        this.church.reaction[personID]--
        game.addLog(persons[personID].fetchName()
          + " didn't like how long the sermon was. (" + this.sermon.duration.value
          + "h)")
      }
      if (this.sermon.quality.value >= sermonPref.quality){
        this.church.reaction[personID] ++
      } else if (this.sermon.quality.value < sermonPref.quality){
        this.church.reaction[personID] --
        game.addLog(persons[personID].fetchName()
          + " thought your sermon was boring and unoriginal.")
      }
      console.log(this.sermon.topics.bias)
      for (let n in this.sermon.topics.bias){
        let theirOrientation = null
        if (persons[personID].biases[this.sermon.topics.bias[n]] == 0){
          continue
        } else if (persons[personID].biases[this.sermon.topics.bias[n]] > 0){
          theirOrientation = 'good'
        } else if (persons[personID].biases[this.sermon.topics.bias[n]] < 0){
          theirOrientation = 'bad'
        }
        if (this.sermon.topics.orientation[n] == theirOrientation){
          this.church.reaction[personID] += Math.abs(persons[personID].biases[this.sermon.topics.bias[n]])
        } else if (this.sermon.topics.orientation[n] == theirOrientation){
          this.church.reaction[personID] -= Math.abs(persons[personID].biases[this.sermon.topics.bias[n]])
          ui.status ("They really didn't like what you had to say about "
            + this.biasCaptions.people[this.sermon.topics.bias[n]] + " ("
            + this.sermon.topics.orientation[n] + ")")
        }
      }


    }
    this.sermon.delivered = true
    ui.status ("You deliver the sermon that you've been working on all week.")
  }

  day(){
    this.time = 8
    let status = "Day #" + this.dayNum + " ended."
    this.dayNum++
    let homeStatus = ""
    if (this.currentlyAt != this.livingAt){
      this.currentlyAt = this.livingAt
      homeStatus = " You headed home."
    }
    for (let i in this.houses.knockedToday){
      this.houses.knockedToday[i] = false
    }
    for (let i in persons){
      persons[i].day()
    }
    ui.status(status + homeStatus)
    ui.displayMap()

  }


  fetchBiases(){
    return this.biases
  }
  goTo(houseNum){
    if (this.currentlyAt == houseNum){
      return
    }
    let a = this.houses.x[houseNum] - this.houses.x[this.currentlyAt]
    let b = this.houses.y[houseNum] - this.houses.y[this.currentlyAt]

    let c = Math.abs(Math.sqrt( a*a + b*b ))
    let timeSpent = (c*.1).toFixed(1)
    ui.status ("You spent " + timeSpent + " hour(s) walking here.")
    this.currentlyAt = houseNum
    this.houses.visited[houseNum]++
    this.loseTime(timeSpent)
  }

  hitTheStreets(){
    this.street.name = namer.fetchRandomStreet()
    this.street.number =  Math.round(Math.random() * (9999 - 100) + 100)
    let timeCost = Math.round(Math.random() * (5 - 2) + 2) / 10
    this.street.distance = timeCost
    this.loseTime(timeCost)
    ui.status("You head out. It took " + timeCost + "h to get to this house on " + this.street.number + " " + this.street.name)
    this.newHouse()
    this.currentlyAt = this.houses.opened.length - 1
  }

  joinChurch(personID){
    game.church.attending.push(personID)
    game.church.reaction[personID] = 0
  }

  knock(houseNum){
    if (this.houses.door2door[houseNum] >= 0){
      this.houses.opened[houseNum] = true
    } else {
      this.houses.knockedToday[houseNum] = true
    }
  }


  meetNeighbors(personID, houseNum){
    let housePosArr = [-1, 1]
    for (let i in housePosArr){
      if (this.houses[houseNum + housePosArr[i]] != undefined){
        for (let occupant in this.houses[houseNum + housePosArr[i]]){
          persons[personID].meet(this.houses[houseNum + housePosArr[i]][occupant], persons[this.houses[houseNum + housePosArr[i]][occupant]])

          persons[personID].like(this.houses[houseNum + housePosArr[i]][occupant])
        }
      }
    }
  }

  nextDoor(){
    this.street.number++
    this.street.distance = Number(this.street.distance + .1).toFixed(1)
    this.newHouse()
    ui.status("")
    this.currentlyAt = this.houses.opened.length - 1
    this.loseTime(.1)
  }

  newHouse(){
    let door2doorBias = 0
    let householdSize = Math.round(Math.random() * (5 + 1) + 1)
    let occupantsArr = []
    for (let i = 1; i <= householdSize; i++){
      persons.push(new Person(this.houses.opened.length))
      door2doorBias += persons[persons.length-1].biases.door2door
      persons[persons.length-1].id = persons.length-1
      occupantsArr.push(persons.length-1)
    }
    this.houses.street.push({name: this.street.name, number: this.street.number})
    this.houses.occupants.push(occupantsArr)
    this.houses.distance.push( this.street.distance)
    this.houses.door2door.push(Math.round(door2doorBias / householdSize))
    this.houses.knockedToday.push(0)
    this.houses.opened.push(false)
    this.houses.visited.push(0)
  }

  randomIdentity(){
    let myIdentity = {}
    for (let category in this.demographics){
      let categoryArr = this.demographics[category]
      let shouldTheyAssign = true
      if (this.optionalBiases.includes(category)){
        shouldTheyAssign = Math.round(Math.random() * (8 + 1) - 1) == 1
      }
      if (!shouldTheyAssign){
        continue
      }
      let randBias = categoryArr[Math.round(Math.random() * (categoryArr.length-1 - 0) + 0)]
      myIdentity[category] = randBias
    }
    return myIdentity
  }

  removeInventory(invType, id, personID){
    if (invType == 'biases'){
      persons[personID].inventory.biases.splice(id, 1)
      persons[personID].inventory.orientation.splice(id, 1)
      return
    }
    let invPos = persons[personID].inventory.asks.indexOf(invType)
    persons[personID].inventory.asks.splice(invPos, 1)
  }

  setRandom(){
    let identity = this.randomIdentity()
    for (let i in identity ){
      $("#identity-" + i + "-"+ identity[i]).prop('checked', true)
    }
  }

  start(){
    let playerIdentity = []
    for (let i in this.demographics){
      let bias = $(".identity-" + i + ":checked").val()
      if (bias == undefined){
        if (!this.optionalBiases.includes(i)){
          $("#identityTestError").html ("Sorry. You must fill out: " + i )
          return
        }
        continue
      }
      playerIdentity.push(bias)
    }

    this.yourIdentity = playerIdentity
    for (let personID in persons){
      persons[personID].meetPC()
    }
    let logMsg = "You are: "
    for (let i in this.yourIdentity){
      logMsg += this.biasCaptions.identity[this.yourIdentity[i]] + ", "
    }
    this.addLog(logMsg)
  }


  loseTime(timeSpent){
    this.time = this.time - timeSpent
    if (this.time <= 0){
      this.day()
    }
  }

  newSong(){
    this.church.songs.push({
      name: song.random(), sungAtService: false,
    })
    for (let personID in persons){
      let align = Math.round(Math.random() * (1 - -1) + -1)
      if (align == 1 ){
        align += Math.round(Math.random() * (1 - 0) + 0)
      }
      persons[personID].church.feelAboutSong[this.church.songs.length-1] = align
    }

  }

  singSong(songID){
    if (this.church.songs[songID].sungAtService || this.whichDay() != 6){
      return
    }
    this.church.songs[songID].sungAtService = true
    for (let i in this.church.attending){
      let personID = this.church.attending[i]
      this.church.reaction[personID] += persons[personID].church.feelAboutSong[songID]
    }
    ui.status("You lead the congregation in a rendition of '" + this.church.songs[songID].name + "'")
    this.churchTime()
  }

  startService(){

  }

  stopAutomation(){
    clearInterval(this.automatingWork)
    this.automatingWork = null
    $(".workSermon").prop('disabled', false)
    $(".workSermon").removeClass('btn-danger')
    $(".workSermon").addClass('btn-outline-primary')
  }

  whichDay(){
    let whichDay = (this.dayNum % 7) - 1
    if (whichDay == -1){
      whichDay = 6
    }
    return whichDay
  }

  workSermon(workType){
    this.sermon[workType].work += .1
    if (this.sermon[workType].work > this.sermon[workType].value){
      if (workType == 'quality'){
        this.sermon[workType].value++
      } else if (workType == 'duration'){
        this.sermon[workType].value += .1
      }
      this.sermon[workType].work = 0
    }
    this.loseTime(.1)
  }
}
