const levelOne = ['1']
const levelTwo = ['1.1', '1.2']
const levelThree = ['1.1.1', '1.1.2', '1.2.1', '1.2.2']
const levelFour = [
  '1.1.1.1',
  '1.1.1.2',
  '1.1.2.1',
  '1.1.2.2',
  '1.2.1.1',
  '1.2.1.2',
  '1.2.2.1',
  '1.2.2.2',
]

const questionIDs = [...levelOne, ...levelTwo, ...levelThree, ...levelFour]
export default questionIDs

// Two LOs
const levelID2 = [1, 2, 2]

// Four LOs
const levelID4 = [...levelID2, 3, 3, 3, 3]

// Five LOs
const levelID5 = [...levelID4, 4, 4]

// Six LOs
const levelID6 = [...levelID5, 4, 4]

// Seven LOs
const levelID7 = [...levelID6, 4, 4]

// Eight LOs
const levelID8 = [...levelID7, 4, 4]

export const getCorrectLevel = (num: number) => {
  if (num === levelID2.length) return levelID2
  if (num === levelID4.length) return levelID4
  if (num === levelID6.length) return levelID6
  if (num === levelID7.length) return levelID7
  if (num === levelID8.length) return levelID8
  if (num === levelID5.length) return levelID5
  return [1]
}
