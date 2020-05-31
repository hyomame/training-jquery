'use strict';

const $ = require('jquery')

let $app = $(() => {
  const backImgName = 'card.jpg'
  const frontImgNames = ['chika.jpg', 'riko.jpg', 'kanan.jpg', 'dia.jpg', 'you.jpg', 'yoshiko.jpg', 'hanamaru.jpg', 'mari.jpg', 'ruby.jpg']
  const imgNum = frontImgNames.length
  const motionTime = 100
  const reverseTime = 3000
  let cardLines = []
  let firstChoice = true
  let firstSelectedElementId = -1
  let secondSelectedElementId = -1
  let firstSelectedCard = -1
  let secondSelectedCard = -1
  let pair = 0
  let finished = false

  const cardOpen = (id) => {
    const imgName = frontImgNames[cardLines[id]]
    $(`#${id} img`).attr("src", `img/${imgName}`)
    return new Promise(resolve => {
      setTimeout(() => {
        resolve('OK')
      }, motionTime)
    })
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
    if (firstSelectedCard === secondSelectedCard) {
      $(`#${firstSelectedElementId}, #${secondSelectedElementId}`).addClass("off")
      pair++
      updatePair()
      if (pair === imgNum) {
        finished = true
      }
    } else {
      await new Promise(resolve => {
        setTimeout(() => {
          cardClose(firstSelectedElementId)
          cardClose(secondSelectedElementId)
          resolve('OK')
        }, reverseTime)
      })
    }
    firstSelectedElementId = -1
    secondSelectedElementId = -1
    firstSelectedCard = -1
    secondSelectedCard = -1
    firstChoice = true
    allCardUnlock()
  }

  // HTMLに要素を挿入
  updatePair()
  for(let i=0; i<imgNum*2; i++) {
    $('#cards').append(`<li id="${i}"><img src="img/card.jpg"></li>`)
  }

  for(let i=0; i<imgNum; i++) {
    cardLines.push(i, i)
  }
  cardLines.sort(() => {
    return Math.random() - Math.random()
  })

  $("#cards li").on('click', async function() {
    const id = this.id
    cardLock(id)
    await cardOpen(id)

    if (firstChoice) {
      firstSelectedElementId = id
      firstSelectedCard = cardLines[id]
      firstChoice = false
    } else {
      allCardLock()
      secondSelectedElementId = id
      secondSelectedCard = cardLines[id]
      checkPair()
    }

    if (finished) {
      alert('クリアしました！')
      $("button.reset").show()
    }
  });

  $(("button.reset")).on('click', () => {
    location.reload()
  })
});
