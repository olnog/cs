class Person{
  biases = {

  }
  group = null
  house = null
  id = null
  identity = null
  inventory = {
    asks: [], biases: [], orientation: []
  }
  name = null
  social = {
    liking: [],
    perception: [],
    familiarity: []
  }
  orientationArr = {
    '-1': 'bad', 1: 'good'
  }
  personality = {
    extraversion: false,
    lonely: false,
  }

  story = {
    narration: null,
    relevant: false,
  }
  surname = null
  you = {
    biasChecks: {
      num: {},
      today: [],
    },
    church: 0,
    comingToService: false,
    daysVisited: [],
    goAway: false,
    interactedToday: 0,
    knownBiases: {
        bad: [],
        good: [],
        neutral: [],
    },
    knowStory: false,
    knownIdentity: [],
    lies: {
        lie: [],
        truth: [],
    },
    maxTrust: 3,
    referrals: [],
    trust: 3,
    unrecognizedBiases: []

  }

  constructor(houseNum){

    this.house = houseNum
    for (let i in game.biases){
      let genOrient = Math.round(Math.random() * (1 - -1) + -1)
      this.biases[game.biases[i]] = genOrient
      if (genOrient == -1){
        this.biases[game.biases[i]] = genOrient = Math.round(Math.random() * (-1 - -6) + -6)
      } else if (genOrient == 1){
        this.biases[game.biases[i]] = genOrient = Math.round(Math.random() * (3 - 1) + 1)
      }
      this.you.biasChecks.num[game.biases[i]] = 0
    }
    this.createIdentity()
    let theirName = personName.fetchRandom(this.identity[2])
    this.name = theirName.name
    this.surname = theirName.surname
    this.group = Math.round(Math.random() * (game.numOfGroups - 1) + 1)
    this.personality.extraversion = Math.round(Math.random() * (4 - 1) + 1) < 4
    this.personality.lonely = Math.round(Math.random() * (3 - 1) + 1) == 1
    for (let i in game.yourIdentity){
      let maxNumOfDistortions = Math.round(Math.random() * (Math.round(game.yourIdentity/2) - 0) + 0)
      while (maxNumOfDistortions > 0){
        let randIdentityBias  = game.yourIdentity[Math.round(Math.random() * ((game.yourIdentity.length-1) - 0) + 0)]
        if (!this.you.unrecognizedBiases.includes(randIdentityBias)){
          this.you.unrecognizedBiases.push(randIdentityBias)
          maxNumOfDistortions--
        }
      }
    }
    this.day()
  }
  createLies(){
    for (let i in this.identity){
      let where = this.findDemographic(this.identity[i])
      if (Math.round(Math.random() * (3 - 1) + 1) == 1){
        this.you.lies.truth.push(this.identity[i])
        let lying = true
        while(lying){
          let demoCategory = game.demographics[this.findDemographic(this.identity[i])]
          let possibleLie = demoCategory[Math.round(Math.random()
            * ((demoCategory.length-1) - 0) + 0)]

          if (possibleLie != this.identity[i]){
            this.you.lies.lie.push(possibleLie)
            lying = false
          }

        }

      }
    }
  }
  adjustTrust(yourPosition, theirPosition, bias){

    if (this.you.biasChecks.num[bias] > 1){
      let trustChance = Math.round(Math.random() * (3 - 1) + 1)
      if (trustChance == 1){
        return " You get the sense they normally feel pretty strongly about this, but today, they're just not interested."
      } else if (trustChance == 3){
        this.bigDislike()
        return " They look at you with distrust, like maybe you're trying to manipulate them and just say what the want to hear."
      }
    }
    if (yourPosition == 0 || theirPosition == 0){
      return ''
    }
    let you = yourPosition > 0
    let status = ''
    let them = theirPosition > 0
    if (you == them){
      this.you.maxTrust += Math.abs(theirPosition)
      status = "They agreed with you on this, so you gained " + Math.abs(theirPosition) + " trust"
    } else {
      this.bigDislike()
      status = "They disagreed with you on this, so you lost 1 trust with them"
    }
    return status
  }

  characterize(personID){
    let characterization = []

    let opinionArr = {
      'bad': 'biased against:', 'good': 'biased towards:', 'neutral': 'irrelevant:'
    }
    //characterization += "<div> They appear to be: </div>"
    for (let i in this.identity){
      if (this.you.knownIdentity.includes(this.identity[i])
        || !this.you.lies.truth.includes(this.identity[i])){
          /*
          characterization += "<div class='ms-3'>"
          if (!this.you.knownIdentity.includes(this.identity[i])){
           characterization += "<button id='interact-biases-"
              + game.biases.indexOf(this.identity[i]) + "-neutral-" + personID
              + "' class='interact btn btn-primary me-3'>?</button>"
          }
          characterization += this.identity[i] + " </div> "
          */
          characterization.push(this.identity[i])
          continue
      }
      characterization.push(this.you.lies.lie[this.you.lies.truth.indexOf(this.identity[i])])
/*
      characterization += "<div class='ms-3'>"
        + "<button id='interact-biases-"
        + game.biases.indexOf(this.you.lies.lie[this.you.lies.truth.indexOf(this.identity[i])])
        + "-neutral-" + personID
        + "' class='interact btn btn-primary me-3'>?</button>"
        + this.you.lies.lie[this.you.lies.truth.indexOf(this.identity[i])]
        + "</div> "
        */
    }

    /*
    for (let opinion in this.you.knownBiases){
      if (this.you.knownBiases[opinion].length > 0){
        characterization += "<div class='fw-bold'>" + opinionArr[opinion] + "</div>"
        for (let i in this.you.knownBiases[opinion]){
          characterization += "<div class='ms-3'>" + this.you.knownBiases[opinion][i]  + "</div>"
        }
      }
    }
*/
    return characterization
  }
  bigDislike(){
    this.you.maxTrust --
    this.you.trust--
    if(this.you.trust < 0){
      this.you.trust = 0
    }
    if(this.you.maxTrust < 0){
      this.you.maxTrust = 0
    }
    game.addLog(this.name + " " + this.surname + " now trusts you " + this.you.trust + "/" + this.you.maxTrust )
  }
  createIdentity (){
    let identityArr = []

    //old: 0, kid: 0, adult: 0,
    let age = 'adult'
    let ageChance  = Math.round(Math.random() * (20 - 1 + 1) + 1)
    if (ageChance < 4){
      age = 'old'
    } else if (ageChance > 16){
      age = 'kid'
    }
    identityArr.push(age)

    //    white: 0, black: 13, asian: 6, indian:1.4, hispanic: 18, arab: 4, native: 2

    let race = 'white'
    let raceChance = Math.round(Math.random() * (100 - 1 + 1) + 1)
    if (raceChance < 3){
      race = 'native'
    } else if (raceChance > 2 && raceChance < 7 ){
      race = 'arab'
    } else if (raceChance == 100 ){
      race = 'indian'
    } else if (raceChance > 6 && raceChance < 13 ){
      race = 'asian'
    } else if (raceChance > 12 && raceChance < 32 ){
      race = 'hispanic'
    } else if (raceChance > 31 && raceChance < 46 ){
      race = 'black'
    }
    identityArr.push(race)

    let sex = 'female'
    let sexChance  = Math.round(Math.random() * (2 - 1 + 1) + 1)
    if (sexChance == 1){
      sex = 'male'
    }
    identityArr.push(sex)

    let religion = 'protestant'
    //religion:     jew: 2, mormon: .9%, catholic: 23%, jehovahWitness: .8, muslim: 1, buddhist: 1, atheist: 23
    let religionChance  = Math.round(Math.random() * (100 - 1 + 1) + 1)
    if (religionChance == 1){
      religion = 'mormon'
    } else if (religionChance == 2){
      religion = 'jehovahWitness'
    } else if (religionChance == 3){
      religion = 'muslim'
    } else if (religionChance == 4){
      religion = 'buddhist'
    } else if (religionChance > 98){
      religion = 'jew'
    } else if (religionChance > 74 && religionChance < 99){
      religion = 'catholic'
    } else if (religionChance > 51 && religionChance < 75){
      religion = 'atheist'
    }
    identityArr.push(religion)

    //trans .33% , bi 1.8%, 1.7% gay, .33% ace  enbie .33%
    let lgbtq = 'straight'
    let lgbtqChance = Math.round(Math.random() * (300 - 1 + 1) + 1)
    if (lgbtqChance == 1){
      lgbtq = 'trans'
    } else if (lgbtqChance == 2){
      lgbtq = 'asexual'
    } else if (lgbtqChance == 3){
      lgbtq = 'nonbinary'
    } else if (lgbtqChance > 3 && lgbtqChance < 10){
      lgbtq = 'bisexual'
    } else if (lgbtqChance > 9 && lgbtqChance < 16){
      lgbtq = 'gay'
    }
    identityArr.push(lgbtq)


    let econClass = 'middleClass'
    //blueCollar: 14, middleclass: 0, rich:2, homeless: 0,

    let econClassChance = Math.round(Math.random() * (500 - 1 + 1) + 1)
    /*if (econClassChance == 1){
      econClass = 'homeless'
    } else
*/
    if (econClassChance > 1 && econClassChance < 12){
      econClass = 'rich'
    } else if (econClassChance > 11 && econClassChance < 83){
      econClass = 'blueCollar'
    }
    identityArr.push(econClass)


    let immigrantChance = Math.round(Math.random() * (100 - 1 + 1) + 1)
    if (immigrantChance < 15 && immigrantChance > 3){
      identityArr.push('immigrant')
    } else if (immigrantChance < 4){
      identityArr.push('undocumented')
    }



    let disabled = false
    let disability = null
    let disabilityChance  = Math.round(Math.random() * (4 - 1 + 1) + 1)
    if (disabilityChance == 1){
      disabled = true
    }
    let disabilityArr = ['wheelchair', 'blind', 'deaf', 'amputee']
    if (disabled){
      disability = disabilityArr[disabilityChance - 1]
      identityArr.push(disability)
    }

    let psych = false
    let psychology = null
    let psychArr = [
      'autism', 'schitzo', 'depressed', 'bipolar', 'borderline', 'narc', 'paranoid', 'downs'
    ]
    let psychChance = Math.round(Math.random() * (8 - 1 + 1) + 1)
    if (psychChance < 3){
      psych = true
    }
    if (psych){
      psychology = psychArr[psychChance - 1]
      identityArr.push(psychology)
    }

    let substanceDisorder = null
    let substanceChance = Math.round(Math.random() * (20 - 1 + 1) + 1)
    if (substanceChance < 3){
      substanceDisorder = 'smoker'
    } else if (substanceChance > 18){
      substanceDisorder = 'addiction'
    } else if (substanceChance == 3){
      substanceDisorder = 'alcohol'
    }
    if (substanceDisorder != null ){
      identityArr.push(substanceDisorder)
    }
    for (let i in identityArr){
      if (this.biases[identityArr[i]]<0){
        this.biases[identityArr[i]] += Math.round(Math.random() * (6 - 1 ) + 1)
      }
    }
    this.identity = identityArr
    this.createLies()
  }

  day(){
    let randBias = this.fetchRandBias()
    let orientation = 'bad'
    if (this.biases[game.biases[randBias]] > 0 ){
      orientation = 'good'
    }
    if (this.you.trust < this.you.maxTrust){
      this.you.trust += this.you.daysVisited.length
      if (this.you.trust > this.you.maxTrust){
        this.you.trust = this.you.maxTrust
      }
      game.addLog(this.name + " " + this.surname +  " now trusts you " + this.you.trust + "/" + this.you.maxTrust )
    }
    this.story = story.fetch(game.biases[randBias], orientation)
    this.you.biasChecks.today = []
  }

  dislike(personID){
    this.social.liking[personID]--
  }

  donate(){
    let donations = {
      blueCollar: 10,
      middleClass: 100,
      rich: 1000,
    }
    game.money += donations[this.identity[5]]
    return " they agreed to donate " + donations[this.identity[5]] + " dollars to your church."
  }

  doTheyKnowAnyoneWith(bias){
    for (let personID in this.social.liking){
      for (let i in persons[personID].identity){
        if (persons[personID].identity[i] == bias){
          return personID
        }
      }
    }
    return null
  }

  fetchKnownBiases(){
    let processedBiases = { bad: [], good: [] }
    for (let i in this.you.knownBiases){
      if (this.biases[this.you.knownBiases[i]] < 0 ){
        processedBiases.bad.push(this.you.knownBiases[i])
      } else if (this.biases[this.you.knownBiases[i]] > 0 ){
        processedBiases.good.push(this.you.knownBiases[i])
      }
    }
    return processedBiases
  }

  fetchRandBias(){
    let fetching = true
    let randBias = null
    while (fetching){

      randBias = Math.round(Math.random() * ((game.biases.length-1) - 0) + 0)
      if (this.biases[game.biases[randBias]] != 0){
        fetching = false
      }
    }

    return randBias
  }

  findDemographic(name){
    for (let whichDemographic in game.demographics){
      for (let i in game.demographics[whichDemographic]){
        if (game.demographics[whichDemographic][i] == name){
          return whichDemographic
        }
      }
    }
    return null
  }

  like(personID){
    this.social.liking[personID]++
  }

  meet(personID, person){
    if (this.social.familiarity[personID] == undefined){
      this.social.familiarity[personID] = 0
      this.social.liking[personID] = 0
      this.social.perception[personID] = this.sociallyPerceive(personID, person)
    }
  }

  meetPC(){
    let score = 0
    for (let i in game.yourIdentity){
      if (this.you.unrecognizedBiases.includes(game.yourIdentity[i])){
        continue
      }
      score += this.biases[game.yourIdentity[i]]
    }
    if (score < 0 ){
      score = 0
    }
    this.you.maxTrust = score
    this.you.trust = score
  }

  refer(){
    let personID = this.whoDoTheyLikeMost()
    game.houses.opened[persons[personID].house] = true
    persons[personID].you.trust++
    persons[personID].you.maxTrust++
    this.you.referrals.push(personID)
    return " they referred you to " + persons[personID].name + " "
      + persons[personID].surname + " who lives in House #" + persons[personID].house
  }

  sociallyPerceive(personID, person){
    let score = 0;
    for (let i in person.identity){
      if (i > this.social.familiarity[personID]){
        continue
      }
      score += this.biases[person.identity[i]]
    }
    return score
  }

  visit(){
    if (!this.you.daysVisited.includes(game.dayNum)){
      this.you.daysVisited.push(game.dayNum)
    }
  }

  youAsk(interactionType){
    if (game.askCost[interactionType] > this.you.trust){
      ui.status("You don't have enough trust with this person to do this.")
      return
    }
    game.loseTime(.1)

    let status = ''
    this.you.maxTrust -= game.askCost[interactionType]
    this.you.trust -= game.askCost[interactionType]
    if (interactionType == 'askService'){
      status = " they are coming to your service this Sunday."
      game.addLog(this.name +  " " + this.surname + " is now coming to Service this Sunday.")
      this.you.comingToService = true
      game.social.comingToService.push(this.name)
    } else if (interactionType == 'askRefer'){
      status = this.refer()
    } else if (interactionType == 'askDonation'){
      status = this.donate()
    }
    ui.status("It cost " + game.askCost[interactionType] + " trust from them, but " + status )
  }

  youBiased(biasID, orientation){
    let relevantBias = game.biases[biasID]
    if (this.you.biasChecks.today.includes(relevantBias)){
      ui.status("You've already done this today.")
      return
    }
    this.you.trust--
    game.loseTime(.1)
    let orientArr = {'bad': -1, 'neutral': 0, 'good': 1}
    let currentOrient = orientArr[orientation]
    let opinion = 'neutral'
    let status = ''
    game.addLog("You told " + this.name + " " + this.surname + " " +  " that "
      + relevantBias + " are " + currentOrient)
    if (this.biases[relevantBias] < 0){
      opinion = 'bad'
    } else if (this.biases[relevantBias] > 0){
      opinion = 'good'
    }
    this.you.biasChecks.num[relevantBias]++
    if (!this.you.biasChecks.today.includes(relevantBias) && currentOrient != 0 &&  this.biases[relevantBias] != 0){
      status = this.adjustTrust(currentOrient, this.biases[relevantBias], relevantBias)
      this.you.biasChecks.today.push(relevantBias)
    }

    if (this.biases[relevantBias] == 0){
      this.neutralBiasCheck(relevantBias, currentOrient)
      status = "They don't really care enough about that particular subject to have an opinion"
    }
    if (!this.you.knownBiases[opinion].includes(relevantBias)){
      this.you.knownBiases[opinion].push(relevantBias)
    }
    if (currentOrient == 0 && !this.you.knownIdentity.includes(relevantBias)){
      status = "You asked them if they were " + relevantBias + "."
      let truthOrLie = "They say yes."
      if (this.you.lies.lie.includes(relevantBias)){
        truthOrLie = " They say no. They're actually " + this.you.lies.truth[this.you.lies.lie.indexOf(relevantBias)]
      }
      this.you.knownIdentity.push(relevantBias)
      status += truthOrLie
    }
    let identityStatus = "."
    if (this.identity.includes(relevantBias) && !this.you.knownIdentity.includes(relevantBias)){
      identityStatus = ", and they reveal that they are also " + game.biasCaptions.identity[relevantBias] + "."
      this.you.knownIdentity.push(relevantBias)
    }
    ui.status(status + identityStatus)
  }



  youConfirm(){
    if (this.you.trust < 1){
      ui.status ("You don't have enough trust with this person to be able to do this right now.")
      return
    }
    this.visit()
    game.loseTime(.1)

    this.you.trust--
    game.time = (game.time - .1).toFixed(1)
    let status = "They were just making small talk. This anecdote has no relevance to their life."
    if (this.story.relevant){
      status = "This is very important to them."
    }
    this.you.knowStory = true
    ui.status(status)
  }

  youInteract(interactionType, biasID, orientation){

    if (this.you.trust < 1){
      ui.status ("You don't have enough trust with this person to be able to do this right now.")
      return
    }
    this.visit()
    if (interactionType != 'biases'){
      this.youAsk(interactionType)
      return
    }
    this.youBiased(biasID, orientation)
  }

  youMeet(){

  }

  neutralBiasCheck(bias, orient){

    let personID = this.doTheyKnowAnyoneWith(bias);
    if (personID == null){
        return " They don't really care about that"
    }
    if (orient == 'bad'){
      this.bigDislike()
      return " They don't personally care about that but they're a little "
        +" offended by that because they know someone who's " + bias
    } else if (orient == 'good'){
      game.houses.opened = true
      return "They don't personally care about " + bias
        + " but they do know someone who is " + bias + ". It's "
        + persons[personID].name + " " + persons[personID].surname
        + " in House #" + persons[personID].house
        + " Maybe you'll get along with them."
    }
  }
  whoDoTheyLikeMost(){
    for (let i in this.social.liking){
      if ((persons[i].you.maxTrust == 0 || persons[i].house != this.house) && !this.you.referrals.includes(i)){
        return i
      }
    }
  }
}
