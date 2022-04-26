song = new Song()
game = new Game()
story = new Story()
ui = new UI(game.maxX, game.maxY)
namer = new Namer()

persons = []
/*
for (let houseNum = 1; houseNum < 101; houseNum++){
  let door2doorBias = 0
  let householdSize = Math.round(Math.random() * (6 + 1) + 1)
  for (let i = 1; i <= householdSize; i++){
    if (houseNum == game.livingAt){
      continue
    }
    persons.push(new Person(houseNum))
    door2doorBias += persons[persons.length-1].biases.door2door
    persons[persons.length-1].id = persons.length-1
    if (game.church.attending.length < game.church.maxAttending){
      game.joinChurch(persons.length-1)
    }
  }
  let houseX = Math.abs((houseNum % game.maxX))
  if (houseX == 0){
    houseX = game.maxX
  }
  game.houses.x[houseNum] = houseX
  game.houses.y[houseNum] = Math.round((houseNum)/game.maxX)
  game.houses.door2door[houseNum] = Math.round(door2doorBias / householdSize)
  game.houses.knockedToday[houseNum] = 0
  game.houses.opened[houseNum] = false
  game.houses.visited[houseNum] = 0
}

for (let i in persons){
  if (game.houses.occupants[persons[i].house] == undefined){
    game.houses.occupants[persons[i].house] = [i]
  } else {
    game.houses.occupants[persons[i].house].push(i)
  }
  //console.log(persons[i].group)
  game.groups[persons[i].group].push(i)
}

*/

//delete this later
game.setRandom()
game.start()
game.newSong()
ui.displayHome()
ui.refresh()
