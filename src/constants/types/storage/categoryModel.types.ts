
type CategoryData = {
  id: number
}

export interface CategoryModel{
  data: CategoryData | null
  isLoading: boolean
  isLoaded: boolean
  error: any
}
