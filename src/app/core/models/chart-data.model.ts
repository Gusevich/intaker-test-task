export interface ChartData {
  datasets: ChartViewData[],
  labels: string[]
}

export interface ChartViewData {
  borderColor: string,
  tension: number,
  data: number[],
  label: string,
  fill: boolean
}
