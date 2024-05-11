export const MONTH_DAYS = [31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 29];
export const HOURS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
export const SECOUND_HOURS = [13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 0];
export const MONTH_NAMES = [
    "فروردین",
    "اردیبهشت",
    "خرداد",
    "تیر",
    "مرداد",
    "شهریور",
    "مهر",
    "آبان",
    "آذر",
    "دی",
    "بهمن",
    "اسفند",
];
export const YEARS = (currentYear: number): number[] => {
    let ys: number[] = [];
    for (let y = currentYear + 10; y > 1300; y--) {
        ys.push(y);
    }
    return ys;
};

export const MINUTES = (): number[] => {
    let minutes: number[] = [];
    for (let m = 1; m < 60; m++) {
        minutes.push(m);
    }
    minutes.push(0);
    return minutes;
};

export const zeroLeading = (str: string): string => {
    if (str && str.length === 1) {
        return `0${str}`;
    }
    return str;
};
