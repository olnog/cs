class Song{
  adjective = [
    'Blessed', 'Divine', 'Hallowed', 'Redeemed', 'Resurrected',
    'Exalted', 'Enthroned', 'Consecreated', 'Holy', 'Revered'
  ]
  god = [
    'Father', 'Jehovah', 'Lord', "Son of God", "King of Kings",
    'The Almighty', 'The Maker','Jah', 'Jesus', 'Jesus Christ'
  ]
  exclamation = [
    'Hallelujah!', 'Glory', 'Glory Be', 'Amen', 'Cowabunga',
    'Heaven Of The Highest', 'Greatest Great of Great', 'I Love You', 'I Praise You',
    'America'
  ]

  random(){
    let arr = [
      ['god', 'exclamation'],
      ['exclamation', 'god'],
    ]
    let which = Math.round(Math.random() * (arr.length-1 - 0) + 0)
    let text = ""
    for (let i in arr[which]){
      let randChance = Math.round(Math.random() * 1)
      if (arr[which][i] == 'god' && randChance == 1){
        text += this.adjective[Math.round(Math.random() * (this.adjective.length-1 - 0) + 0)] + " "
      }
      text += this[arr[which][i]][Math.round(Math.random() * (this[arr[which][i]].length-1 - 0) + 0)] + " "
    }
    return text
  }
}
