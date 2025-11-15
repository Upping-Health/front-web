export interface ReportsDash {
  overview: Overview
  revenue_growth: RevenueGrowth
  expenses_summary: ExpensesSummary
  monthly_trends: MonthlyTrends
  recent_activity: RecentActivity
}

export interface Overview {
  net_amount: number
  total_income: number
  total_expenses: number
  transaction_count: number
}
export interface RevenueGrowth {
  current_period: number
  previous_period: number
  growth_amount: number
  growth_percentage: number
  trend: 'up' | 'down' | 'flat'
}

export interface ExpensesSummary {
  total_expenses: number
  expenses_count: number
}
export interface MonthlyTrends {
  months: Record<string, MonthlyTrendMonth>
  total_months: number
}

export interface MonthlyTrendMonth {
  period: string
  summary: MonthlySummary
  transaction_count: number
}

export interface MonthlySummary {
  total_income: number
  total_expenses: number
  net_amount: number
  transaction_count: number
  positive_count: number
  negative_count: number
}
export interface RecentActivity {
  last_transactions: Transaction[]
}

export interface Transaction {
  uuid: string
  amount_cents: number
  currency: string
  installment: boolean
  type: 'in' | 'out'
  status: 'completed' | 'pending' | 'failed'
  gateway: string
  payment_method: string
  metadata: TransactionMetadata | null
  created_at: string
  updated_at: string
  client: TransactionClient
}

export type TransactionMetadata = Record<string, any> | any[] | null

export interface TransactionClient {
  uuid: string
  name: string
  email: string
  type: 'company' | 'person' | string
  document: string
  phone: string
  address: string
  city: string
  state: string
  zip_code: string
  country: string
  status: boolean
  logo: string | null
}

interface ReportsDashApiResponse {
  data: ReportsDash
}
