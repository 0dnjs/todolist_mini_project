class DateUtils {
    static leftPad(value) {
        if(value >= 10) {
            return value;
        }
        // 10보다 작은것은 01,02 이런식으로 0을 붙여주기 위한 코드
        return `0${value}`;  
    }

    static toStringByFormatting(date) {
        const year = date.getFullYear();
        const month = this.leftPad(date.getMonth() + 1);
        const day = this.leftPad(date.getDate());

        return[year, month, day].join("-");
    }
}