type DeckStructureData = {
  id: number
}

export interface DeckStructureModel{
  data: DeckStructureData | null
  isLoading: boolean
  isLoaded: boolean
  error: any
}
