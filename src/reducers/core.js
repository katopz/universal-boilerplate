const numDataPoints = 50;
const randomNum = () => Math.floor(Math.random() * 1000);
const randomDataSet = () => Array.apply(null, { length: numDataPoints }).map(() => [randomNum(), randomNum()]);

export const randomizeData = () => ({ data: randomDataSet() });
