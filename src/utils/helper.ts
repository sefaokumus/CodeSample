import moment, { Moment } from 'moment'
import { ColorValue }     from 'react-native'

import { RevisionItem, UserStatsInerface } from '../constants/types'

export const moveRevisionsForward = (revisions : RevisionItem[]) => {
  let oldestDueDate : Moment | null = null

  const today = moment()

  revisions?.forEach((revision) => {
    if ((moment(revision.due_date, 'MM-DD-YYYY').isBefore(today) && !oldestDueDate && (moment(revision.due_date, 'MM-DD-YYYY').isBefore(oldestDueDate)))) {
      oldestDueDate = moment(revision.due_date, 'MM-DD-YYYY')
    }
  })

  if (oldestDueDate) {
    const daysDifference = moment().diff(oldestDueDate, 'days')

    revisions?.forEach((revision) => {
      if ((moment(revision.due_date, 'MM-DD-YYYY').isBefore(today))) {
        revision.due_date = moment(revision.due_date, 'MM-DD-YYYY').add(daysDifference, 'days').format('YYYY-MM-DD')
      }
    })
  }

  return revisions
}

export const closest = (arr: number[],  value:number) =>  arr.reduce((prev, curr) =>  {
  return Math.abs(curr - value) <= Math.abs(prev - value) ? curr : prev
})

export const countDueCards = (cards: RevisionItem[] | null, limit?: number) : RevisionItem[] => {
  if (!cards) return []

  const dueCards = cards ? cards.filter(card => {
    return moment(card.due_date, 'MM-DD-YYYY').startOf('day').isSameOrBefore(moment().endOf('day'))
  }) : []

  if (limit) {
    return (limit <= dueCards.length) ? dueCards.slice(0, limit) : dueCards
  }
  return dueCards
}

export const handleUserStatsUpdate = (stats: UserStatsInerface | null) : UserStatsInerface | null => {
  if (!stats) return null
  const dateString     = moment().format('MM-DD-YYYY')
  const formattedStats =  stats?.cards_per_day?.length > 0 ? stats.cards_per_day.flatMap(card => Object.keys(card))  : []
  const checkSum       = formattedStats.includes(dateString)

  // check if the date is already in the stats
  if (!checkSum) {
    stats.cards_per_day.push({
      [dateString]: 1
    })

    // if stats includes an item yesterday, increase the current streak
    if (formattedStats.includes(moment().subtract(1, 'days').format('MM-DD-YYYY'))) {
      stats.current_streak = stats.current_streak + 1
    } else {
      stats.current_streak = 1
    }
  } else {
    stats.cards_per_day.forEach((stat, index) => {
      if (stat[dateString]) {
        stats.cards_per_day[index][dateString] = stats.cards_per_day[index][dateString] + 1
      }
    })
  }
  if (stats.current_streak > stats.best_streak) stats.best_streak = stats.current_streak

  stats.last_updated = moment().format('MM-DD-YYYY')
  return stats
}

export const removeExtraDataFromRevisionHistory = (revisions: RevisionItem[]): {
  id: string
  deck_id: string
  name: string
  due_date: string
  last_revision_date: string
  type : 'LEARNING' | 'REVISION' | undefined
}[] => {
  return revisions.map(revision => {
    return {
      id: revision.id,
      deck_id: revision.deck_id,
      name: revision.name,
      due_date: revision.due_date,
      last_revision_date: revision.last_revision_date,
      type: revision.type
    }
  })
}

type TRgba = {
   r:number, g:number, b:number, a:number
}
const hexToRgbA = (hex: string, alpha: number): TRgba => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16),
    a: alpha
  } : {
    r: 0,
    g: 0,
    b: 0,
    a: 1
  }
}

// get the contrast color of a ColorValue of react native
export const getContrastColor = (color: string): ColorValue => {
  const rgb = hexToRgbA(color, 1)
  const yiq = ((rgb.r * 299) + (rgb.b * 587) + (rgb.g * 114)) / 1000
  return (yiq >= 128) ? '#000' : '#fff'
}

// generate unique uuid
export const uuid = (): string => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = Math.random() * 16 | 0; const v = c === 'x' ? r : (r & 0x3 | 0x8)
    return v.toString(16)
  }).toUpperCase()
}
