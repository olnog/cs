class Game{
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
  comingToService = []
  currentlyAt = null
  groups = { }
  houses = {
    x: [],
    y: [],
    door2door: [],
    knockedToday: [],
    occupants: [],
    opened: [],
    visited: [],
  }


  livingAt = null
  log = []
  maxInventorySize = 7
  money = 0
  numOfGroups = 10
  optionalBiases = ['psych', 'substance', 'disability', 'citizenship']
  social = {
    comingToService: []
  }
  songs = []
  time = 8
  yourIdentity = []



  constructor(){
    this.songs.push(song.random())
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

  knock(houseNum){
    console.log(this.houses.door2door[houseNum])
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

  randomIdentity(){
    let myIdentity = {}
    for (let category in game.demographics){
      let categoryArr = game.demographics[category]
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

  loseTime(timeSpent){
    this.time = this.time - timeSpent
    if (this.time <= 0){
      this.day()
    }
  }

}
