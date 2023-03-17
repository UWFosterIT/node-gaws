export interface IIdOptions {
  id: number,
}

export interface IProgramOptions {
  gradProgId: number,
  quarter: 1 | 2 | 3 | 4,
  year: number,
}

export interface IApplication {
  id: number,
  user: Object,
}
