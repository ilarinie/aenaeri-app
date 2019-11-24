export const generateSeasonTicks = (): string[] => {
    const arr: string[] = [];
    arr.push(...generateTickForMonth('2019', '10', 31));
    arr.push(...generateTickForMonth('2019', '11', 30));
    arr.push(...generateTickForMonth('2019', '12', 31));
    arr.push(...generateTickForMonth('2020', '1', 31));
    arr.push(...generateTickForMonth('2020', '2', 28));
    arr.push(...generateTickForMonth('2020', '3', 31));
    arr.push(...generateTickForMonth('2020', '4', 4));
    return arr;
};

const generateTickForMonth = (year: string, month: string, numberOfDays: number): string[] => {
    const arr: string[] = [];
    for (let i = 0; i < numberOfDays; i++) {
        arr.push(`${year}-${month}-${i}`);
    }
    return arr;
};
