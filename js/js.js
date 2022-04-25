song = new Song()
game = new Game()
story = new Story()
ui = new UI(game.maxX, game.maxY)
personName = new PersonName()

persons = []
ui.displayTest()
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
      game.church.attending.push(persons.length-1)
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
for (let i in game.houses.occupants){
  for (let occupant in game.houses.occupants[i]){
    for (let otherOccupant in game.houses.occupants[i]){
      if (occupant != otherOccupant){
        persons[game.houses.occupants[i][occupant]].meet(game.houses.occupants[i][otherOccupant], persons[game.houses.occupants[i][otherOccupant]])
        persons[game.houses.occupants[i][occupant]].like(game.houses.occupants[i][otherOccupant])
        persons[game.houses.occupants[i][occupant]].like(game.houses.occupants[i][otherOccupant])
      }
    }
    game.meetNeighbors(game.houses.occupants[i][occupant], Number(i))
  }
}

for (let i in game.groups){
  for (let firstPerson in game.groups[i]){
    for (let secondPerson in game.groups[i]){
      if (firstPerson != secondPerson){
        persons[game.groups[i][firstPerson]].meet(game.groups[i][secondPerson],
          persons[game.groups[i][secondPerson]])
        persons[game.groups[i][firstPerson]].like(game.groups[i][secondPerson])
      }
    }
  }
}


//delete this later
game.setRandom()
game.start()
