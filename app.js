'use strict';

import { Data } from './data.js'

window.addEventListener('load', () => {
  const firstStepActionButtons = [...document.getElementsByClassName('stepButton')]
  const contentWrapper = document.getElementById('contentWrapper')
  const container = document.getElementById('container')

  const onButtonClicked = (event) => {
    const randomItem = getRandomItem(event.target.innerHTML)
    const wrapper = document.getElementById('firstStep')
    wrapper.classList.add('fadeOut')
    setTimeout(() => {
      wrapper.classList.add('invisible')
      createLogo(randomItem)
    }, 450);
  }

  const createLogo = (generatedItem) => {
    const wrapper = createElement('div', 'logoWrapper')
    const image = createElement('img')
    image.setAttribute('src', 'logo.png')
    wrapper.appendChild(image)
    contentWrapper.appendChild(wrapper)

    setTimeout(() => {
      wrapper.classList.add('fadeOutLogo')
          setTimeout(() => {
            wrapper.classList.add('invisible')
            appendImage(generatedItem)
            appendText(generatedItem)
          }, 200);
    }, 2500);
  }

  const appendImage = (item) => {
    if (item && typeof item === 'object') {
      const wrapper = createElement('div', ['resultWrapper', 'fadeIn'])
      const image = document.createElement('img')
      
      wrapper.setAttribute('id', 'resultWrapper')

      image.setAttribute('src', item.image)
      
      wrapper.appendChild(image)
      contentWrapper.appendChild(wrapper)
    }
  }

  const appendText = (item) => {
    if (item && typeof item === 'object') {
      const wrapper = createElement('div', ['descriptionWrapper', 'fadeIn', 'fullHeight'])
      const header = createElement('h4', 'resultHeader')
      const mainText = createElement('p', 'resultText')
      const subText = createElement('p', 'resultText')
      const moreButton = createElement('button', 'moreButton')
      const link = createElement('a', 'resultLink')

      link.setAttribute('href', item.link)
      
      wrapper.setAttribute('id', 'descriptionWrapper')

      header.innerHTML = `${convertTypeToString(item.type)} «${item.name}»`
      mainText.innerHTML = `${item.text}`
      subText.innerHTML = `${item.subText}`
      moreButton.innerHTML = 'Спробувати ще'
      link.innerHTML = 'Трейлер'

      moreButton.addEventListener('click', onMoreButtonClicked)

      const innerElements = [header, link, mainText, subText, moreButton]

      innerElements.forEach(el => {
        wrapper.appendChild(el)
      })

      container.appendChild(wrapper)
    }
  }

  const onMoreButtonClicked = () => {
    const firstStep = document.getElementById('firstStep')
    const imageWrapper = document.getElementById('resultWrapper')
    const textWrapper = document.getElementById('descriptionWrapper')
    imageWrapper.remove()
    textWrapper.remove()
    firstStep.classList.remove('invisible', 'fadeOut')
  }

  const createElement = (tag = 'p', classNames = []) => {
    const element = document.createElement(tag)
    if (classNames && typeof classNames === 'object') {
      classNames.forEach(name => {
        element.classList.add(name)
      })
    } else {
      element.classList.add(classNames)
    }
    return element
  }

  const convertTypeToString = (type) => {
    if (type && type.length) {
      switch(type) {
        case 'TV_SERIAL':
          return 'Серіал'
        case 'SHOW':
          return 'Шоу'
        case 'MOVIE':
            return 'Фільм'
        default:
          return ''
      }
    }
  }

  const getRandomItem = (buttonText) => {
    let filterValue = ''
    switch(buttonText) {
      case 'Кіно':
        filterValue = 'MOVIE'
        break;
      case 'Шоу':
        filterValue = 'SHOW'
        break;
      case 'Серіали':
        filterValue = 'TV_SERIAL'
        break;
      default:
        filterValue = ''
    }

    if (filterValue.length) {
      const filteredData = Data.filter(dataItem => dataItem.type === filterValue)
      return filteredData[getRandomInt(0, filteredData.length - 1)]
    } else {
      return Data[getRandomInt(0, Data.length - 1)]
    }
  }

  const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  firstStepActionButtons.forEach(button => {
    button.addEventListener('click', onButtonClicked)
  })
})