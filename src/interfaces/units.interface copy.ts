import { ApiResponse } from './api-response.interface'

export interface HouseHoldUnits {
  name: string
  abbreviation: string
}

export type HouseHoldUnitsResponse = ApiResponse<HouseHoldUnits[]>
