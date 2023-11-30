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

export const levelIDs = [...levelOne, ...levelTwo, ...levelThree, ...levelFour]
export default {
  levelIDs,
}
