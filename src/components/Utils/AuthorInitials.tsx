import * as React from 'react'
import decorate from 'style'
import Avatar from 'material-ui/Avatar'
import * as baseColors from 'material-ui/colors/'
import { Color } from 'material-ui/'
const seedrandom = require('seedrandom')
interface Props {
  author: string
}

const getInitials = (name: string) => {
  const initials = name.trim().split(' ').map(n => n[0].toUpperCase())
  return initials.length === 1 ? [initials[0]] : [initials[0], initials[initials.length - 1]]
}

const colorForName = (colors: Color[], name: string) => {
  var myrng = seedrandom(name)
  const randomSeededColor = colors[Math.round(myrng() * colors.length - 1)]
  return randomSeededColor[800]
}

const colorList = Object.keys(baseColors).map(key => baseColors[key])

export const AuthorInitials = decorate<Props>((props) => {
  const { author } = props
  const initials = getInitials(author)
  const authorColor = colorForName(colorList, author)
  return (
    <Avatar style={{display: 'inline-flex', color: '#fff', backgroundColor: authorColor }}>{initials}</Avatar>)
})
