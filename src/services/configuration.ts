
export interface IConf {
  host: string
  port: number
  api: string
}

export const dev: IConf = {
  host: '0.0.0.0',
  port: 3000,
  api: ''
};

export const pro: IConf = {
  host: '0.0.0.0',
  port: 3000,
  api: ''
};

export function getConfig(): IConf {
  if (process.env.NODE_ENV === "production") {
    return pro;
  }
  return dev;
}
