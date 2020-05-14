'use strict';

let $ = require('jquery')

let $app = $(() => {
  /*const aqours = {
    1: 'chika',
    2: 'riko',
    3: 'kanan',
    4: 'dia',
    5: 'you',
    6: 'yoshiko',
    7: 'hanamaru',
    8: 'mari',
    9: 'ruby'
  }*/
  const backImgName = 'card.jpg'
  const frontImgNames = ['chika.jpg', 'riko.jpg', 'kanan.jpg', 'dia.jpg', 'you.jpg', 'yoshiko.jpg', 'hanamaru.jpg', 'mari.jpg', 'ruby.jpg']
  const imgNum = frontImgNames.length
  const reverseTime = 3000
  let cardNumbers = []
  let first = true
  let id1 = -1
  let id2 = -1
  let card1 = -1
  let card2 = -1
  let pair = 0
  let clear = false

  const cardOpen = (id) => {
    const imgName = frontImgNames[cardNumbers[id]]
    $(`#${id} img`).attr("src", `img/${imgName}`)
  }

  const cardClose = (id) => {
    $(`#${id} img`).attr("src", `img/${backImgName}`)
  }

  const cardLock = (id) => {
    $(`#${id}`).addClass("lock")
  }

  const allCardLock = () => {
    $("#cards li").addClass("lock")
  }

  const allCardUnlock = () => {
    $("#cards li").removeClass("lock")
  }

  const updatePair = () => {
    $('#pair').html(`現在のペア数 : ${pair}`)
  }

  const checkPair = async () => {
    console.log(id1, id2, card1, card2)
    if (card1 === card2) {
      $(`#${id1}, #${id2}`).addClass("off")
      pair++
      updatePair()
      if (pair === imgNum) {
        clear = true
      }
    } else {
      await new Promise(resolve => {
        setTimeout(() => {
          cardClose(id1)
          cardClose(id2)
          resolve('OK')
        }, reverseTime)
      })
    }
    id1 = -1
    id2 = -1
    card1 = -1
    card2 = -1
    first = true
    allCardUnlock()
  }

  // HTMLに要素を挿入
  updatePair()
  for(let i=0; i<imgNum*2; i++) {
    $('#cards').append(`<li id="${i}"><img src="img/card.jpg"></li>`)
  }

  for(let i=0; i<imgNum; i++) {
    cardNumbers.push(i, i)
  }
  cardNumbers.sort(() => {
    return Math.random() - Math.random()
  })

  $("#cards li").on('click', function() {
    const id = this.id
    cardLock(id)
    cardOpen(id)

    if (first) {
      id1 = id
      card1 = cardNumbers[id]
      first = false
    } else {
      allCardLock()
      id2 = id
      card2 = cardNumbers[id]
      checkPair()
    }

    if (clear) {
      alert('クリアしました！')
      $("button.reset").show()
    }
  });

  $(("button.reset")).on('click', () => {
    location.reload()
  })
});
