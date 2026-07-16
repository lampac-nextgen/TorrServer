export default ({ cacheMap, preloadPiecesAmount, piecesInOneRow }) => {
  if (!piecesInOneRow || piecesInOneRow < 1) return []

  const cacheMapWithoutEmptyBlocks = cacheMap.filter(({ percentage }) => percentage > 0)

  const getFullAmountOfBlocks = amountOfBlocks => {
    // counts existing blocks plus empty fillers so the last row is complete
    if (amountOfBlocks % piecesInOneRow === 0) return Math.max(amountOfBlocks - 1, 0)
    return amountOfBlocks + piecesInOneRow - (amountOfBlocks % piecesInOneRow) - 1 || 0
  }

  const amountOfBlocksToRenderInShortView = getFullAmountOfBlocks(preloadPiecesAmount)
  const scalableAmountOfBlocksToRenderInShortView = getFullAmountOfBlocks(cacheMapWithoutEmptyBlocks.length)

  const finalAmountOfBlocksToRenderInShortView = Math.max(
    scalableAmountOfBlocksToRenderInShortView,
    amountOfBlocksToRenderInShortView,
  )

  const extraBlocksAmount = finalAmountOfBlocksToRenderInShortView - cacheMapWithoutEmptyBlocks.length + 1
  const extraEmptyBlocksForFillingLine = extraBlocksAmount > 0 ? new Array(extraBlocksAmount).fill({}) : []

  return [...cacheMapWithoutEmptyBlocks, ...extraEmptyBlocksForFillingLine]
}
