'use strict';

import { Data } from './data.js'

window.addEventListener('load', () => {
  const APP_ID = 'VECTOR_SPECIAL_SONY'
  const firstStepActionButtons = [...document.getElementsByClassName('stepButton')]
  const contentWrapper = document.getElementById('contentWrapper')
  const container = document.getElementById('container')
  let seenValues = []
  let currentCategory = ''

  const onButtonClicked = (event) => {
    const [randomItem, isLast] = getRandomItem(event.target.innerHTML)
    currentCategory = event.target.innerHTML
    const wrapper = document.getElementById('firstStep')
    wrapper.classList.add('fadeOut')
    setTimeout(() => {
      wrapper.classList.add('invisible')
      createLogo(randomItem, isLast)
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
            appendDescription(generatedItem)
          }, 200);
    }, 2500);
  }

  const appendImage = (item) => {
    if (item && typeof item === 'object') {
      const wrapper = createElement('div', ['resultWrapper', 'fadeIn'])
      const image = document.createElement('img')
      addIdToElement(wrapper, 'resultWrapper')
      addIdToElement(image, 'mainImage')

      image.setAttribute('src', item.image)
      wrapper.appendChild(image)
      contentWrapper.appendChild(wrapper)
    }
  }

  const appendDescription = (item) => {
    if (item && typeof item === 'object') {
      const wrapper = createElement('div', ['descriptionWrapper', 'fadeIn', 'fullHeight'])
      const moreButton = createElement('button', 'moreButton')
      const newCategoryButton = createElement('button', 'newButton')
      addIdToElement(wrapper, 'descriptionWrapper')

      moreButton.innerHTML = 'Спробувати ще'
      newCategoryButton.innerHTML = 'Нова категорія'

      moreButton.addEventListener('click', onMoreButtonClicked)
      newCategoryButton.addEventListener('click', onNewCategoryClicked)

      const innerElements = [appendDescriptionText(item), moreButton, newCategoryButton]

      innerElements.forEach(el => {
        wrapper.appendChild(el)
      })

      container.appendChild(wrapper)
    }
  }

  const appendDescriptionText = (item, withFadeIn = false) => {
    const wrapper = createElement('div', ['appendedTextWrapper', ...(withFadeIn ? ['fadeIn']  : [])])
    const header = createElement('h4', 'resultHeader')
    const mainText = createElement('p', 'resultText')
    const subText = createElement('p', 'resultText')
    const link = createElement('a', 'resultLink')

    addIdToElement(wrapper, 'appendedTextWrapper')

    link.setAttribute('href', item.link)

    const innerElements = [header, link, mainText, subText]

    header.innerHTML = `${convertTypeToString(item.type)} «${item.name}»`
    mainText.innerHTML = `${item.text}`
    subText.innerHTML = `${item.subText}`
    link.innerHTML = 'Трейлер'

    innerElements.forEach(el => {
      wrapper.appendChild(el)
    })

    return wrapper
  }

  const onMoreButtonClicked = (event) => {
    const [randomItem, isLast] = getRandomItem(currentCategory)
    const textWrapper = document.getElementById(`${APP_ID}_appendedTextWrapper`)
    const resultWrapper = document.getElementById(`${APP_ID}_resultWrapper`)
    const descriptionWrapper = document.getElementById(`${APP_ID}_descriptionWrapper`)
    textWrapper.classList.add('fadeOutText')
    resultWrapper.classList.add('fadeOutText')
    setTimeout(() => {
      textWrapper.remove()
      resultWrapper.remove()
      appendImage(randomItem)
      descriptionWrapper.prepend(appendDescriptionText(randomItem, true))
    }, 300);


    if (isLast) {
      event.target.remove()
    }
  }

  const onNewCategoryClicked = () => {
    seenValues = []
    const firstStep = document.getElementById('firstStep')
    const imageWrapper = document.getElementById(`${APP_ID}_resultWrapper`)
    const textWrapper = document.getElementById(`${APP_ID}_descriptionWrapper`)
    imageWrapper.remove()
    textWrapper.remove()
    firstStep.classList.remove('invisible', 'fadeOut')
  }

  const addIdToElement = (element, idName) => {
    element.setAttribute('id', `${APP_ID}_${idName}`)
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
      const filteredData = Data.filter(dataItem => dataItem.type === filterValue && !seenValues.some(seenName => seenName === dataItem.name))
      const item = filteredData[getRandomInt(0, filteredData.length - 1)]
      seenValues.push(item.name)
      return [item, filteredData.length === 1]

    } else {
      const filteredData = Data.filter(dataItem => !seenValues.some(seenName => seenName === dataItem.name))
      const item = filteredData[getRandomInt(0, Data.length - 1)]
      seenValues.push(item.name)
      return [item, filteredData.length === 1]
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