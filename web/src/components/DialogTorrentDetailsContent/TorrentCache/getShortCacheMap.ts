import type { CacheMapItem } from 'types/api'

interface GetShortCacheMapArgs {
  cacheMap: CacheMapItem[]
  preloadPiecesAmount: number
  piecesInOneRow: number
}

export default ({ cacheMap, preloadPiecesAmount, piecesInOneRow }: GetShortCacheMapArgs): CacheMapItem[] => {
  if (!piecesInOneRow || piecesInOneRow < 1) return []

  const cacheMapWithoutEmptyBlocks = cacheMap.filter(
    ({ percentage, isReader, isReaderRange }) => percentage > 0 || isReader || isReaderRange,
  )

  const getFullAmountOfBlocks = (amountOfBlocks: number) => {
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
  const extraEmptyBlocksForFillingLine =
    extraBlocksAmount > 0 ? (new Array(extraBlocksAmount).fill({}) as CacheMapItem[]) : []

  return [...cacheMapWithoutEmptyBlocks, ...extraEmptyBlocksForFillingLine]
}
