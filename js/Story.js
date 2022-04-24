class Story{
  bad = [
    "there were some door to door salesmen trying to sell solar, but that was a scam",
    "a cult that met at a park instead of going to a church, killed themselves",
    "a cult recently just all committed suicide",
    "if straight couples are so happy, why do they get divorced so often?",
    "a gay pride parade happened recently and they had men shaking their penises at people passing by",
    "a trans woman went into a woman's restroom recently ",
    "if people are attracted to two different genders, doesn't that just mean that can't make up their mind?",
    "they flirted with someone and that person rejected them, saying they were asexual ",
    "they were talking to some girl the other day and she got mad because she said she's nonbinary ",
    "some white guy was rude to them at the store",
    "some black guys broke into a house down the street",
    "some Asian lady was talking in some foreign language while they were at the story yesterday ",
    "they dated an Indian person one time but they had to break up because their family kept trying to culturally erase them",
    "some Mexican guy broke into his friends car recently",
    "some Arab guy was caught with a bomb in his jacket ",
    "their coworker is a native American and also an alcoholic ",
    "an immigrant they used to work with just won the lottery but they've never won the lottery",
    "some illegals were just arrested across town",
    "they had to go to Walmart recently and they're afraid they caught some disease from the people there",
    "some yuppie in the suburbs hit someone with their car while they were drunk and they're pretty sure they're going to get away with it ",
    "a billionaire just laid off a bunch of people at their company despite record quarter profits ",
    "a homeless guy just beat up some lady around the corner while she was walking her dog",
    "a man explained how vaccines work to a woman who was a doctor",
    "a woman rejected a man really rudely even though he asked her out very nicely and respectfully",
    "a coworker who is a senior citizen basically doesn't do anything at work but management won't do anything because they're afraid of an age discrimination lawsuit ",
    "a child was being rude to their neighbor recently for no reason",
    "some high schoolers were being really loud and obnoxious at the movie theater down the street",
    "an adult man was doing really lame stuff like voting ",
    "Palestinians are treated badly in Israel ",
    "a few LDS guys came by on bikes and were knocking on the door for way too long ",
    "the Pope recently said something controversial ",
    "Jehovahs witnesses were here but they left when they lied and said they were disfellowed ",
    "don't understand why Arab women wear those headscarves ",
    "think it's weird that the Dalai Lama cam never have sex",
    "they don't understand how  anyone can go through life thinking there's no afterlife",
    "there were some guys from your local Baptist church protesting the abortion clinic across town ",
    "some kid who was clearly  on the spectrum started yelling and screaming while they were at the store and it was really annoying ",
    "some crazy homeless guy was standing on the street just talking to himself",
    "if people are sad, have they tried not being sad?",
    "their neighbor was nice yesterday and cold today, so they think they might be bipolar",
    "they hate the mother on The Sopranos for some reason ",
    "their child loves looking in the mirror, they're a real narcissist",
    "some lady down the street always locks her front door. Why is she so paranoid?",
    "people who puff on cigarettes smell bad and probably have something wrong with them ",
    "they were wondering why people can't stop doing things that are bad for them and that it seems kinda weak",
    "their neighbor drinks too much, like a drink every night",
    "they don't understand why disabled people need to park closer to the door",
    "someone was claiming to be vision impaired but they were wearing glasses",
    "someone who couldn't hear actually turned down the surgery to restore their hearing",
    "this guy at the state fair was missing a leg and it was really gnarly ",
    ]

  good = [
    "a door-to-door salesman, who was black btw, saved someone in a wheelchair when they got in a car accident",
    "there was a baptist church that they really liked, despite them not meeting in a real church",
    "their friend joined a spiritual group for former addicts and it really helped their recovery",
    "their female friend just got pregnant by their husband and they're really happy because they've been trying for a while",
    "they just elected the first gay mayor in the next town over",
    "another celebrity just came out as trans yesterday",
    "their best friend just broke up with their boyfriend but its cool because they can finally be with the girl they've been in love with since forever",
    "their friend just found someone online who doesn't need sex at all to be in a relationship",
    "their friend just called them and said their parents are using the appropriate pronouns now",
    "christopher colombus was pretty cool",
    "ketanji brown jackson was just appointed to the supreme court",
    "they lived in china for a couple years and it was the most gratifying experience of their life",
    "bollywood films are their favorite genre of musical",
    "they realy want to learn spanish one day",
    "most of the knowledge lost during the Dark Ages was preserved in Arabia",
    "a lot of european colonists would have died without help from native americans",
    "everyone in the USA that isn't native Ameircan is an immigrant",
    "it can take up to 7 years in order to legally become a citizen",
    "they like country music, drinking beer and pick up trucks",
    "the epitome of the american dream is life in the suburbs",
    "the people truly winning in America are billionaires",
    "there should be more outreach to people who are houseless",
    "a strong man can really make a family better",
    "a great wife can really make a family better",
    "senior citizens are some of the most wise individuals living today",
    "children are the future",
    "a high schooler just saved a young girl's life after someone tried to kidnap her",
    'some adult that their friend knows was handing out free video games at the video game store',
    "It's amazing what the Israeli people have accomplished in this past half century",
    "The LDS church does so much in poorer countries ",
    "Mother Teresa was such a great person",
    "Michael Jackson was a jehovas witness ",
    "Mohammed united most of the Middle East ",
    "The Buddha became the leader of the Buddhists because he was enlightened ",
    "Richard Dawkins is their hero ",
    "They really love [famous evangelist]",
    "their favorite movie is Accountant because Ben Affleck was so good in that",
    "how do we know that people that talk to themselves aren't tapping in to some deeper reality?",
    "all of the greatest artists have had struggles and you can't be great without some",
    "their last ex was really boring because of how consistent they were ",
    "someone who says they hate but then asks you not to leave is a sign of a really passionate person",
    "their dream job is to be an influencer ",
    "some people might think they are too security conscious but you can never know who's going to try to hurt you ",
    "did you ever notice how all the coolest celebrities smoke cigarettes?",
    "some people might look down on recreational substances but they think they're fun if done right ",
    "they cannot wait to the nightclub this weekend ",
    "a person in a wheelchair just wheeled themselves across the county for charity ",
    "the TV series See was one of the best shows they've ever seen ",
    "they completely understand why a hearing impaired person wouldn't want their kids to get cochlear implants ",
    "some people might find someone with a missing limb off-putting but they find it very attractive ",





  ]

  constructor (){

  }
  bias(biasType, orientation){
    //need to finish out positive stories
    return this[orientation][game.biases.indexOf(biasType)]
  }
  fetch(biasType, orientation){
    let readyForStory = Math.round(Math.random() * (Math.round(3) - 1) + 1)
    let relevant = false
    let story = this.random()
    if (readyForStory != 1){
      story = this.bias(biasType, orientation)
      relevant = true
    }
    return {narration: story, relevant: relevant}
  }

  integrityCheck(orientation){
    let html = ""
    for (let i in game.biases){
      html += "<div> " + game.biases[i] + " - " + this[orientation][i] + "</div>"
    }
    return html
  }
  random(){
    let randStory = Math.round(Math.random() * ((this.bad.length-1) - 1) + 1)
    let goodOrBad = Math.round(Math.random() * (1 - 0) + 0)
    let goodOrBadArr = ['bad', 'good']
    return this[goodOrBadArr[goodOrBad]][randStory]
  }

}
