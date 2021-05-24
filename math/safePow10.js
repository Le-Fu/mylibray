/**
 * 解决js计算浮点数的十进制换算会有误差
 * @param {number} num 
 * @param {number} time 
 * @returns string
 */
export const safePow10 = (num, time) => {
    // if (num === undefined || num === null) {
    //     return
    // }
    if (isNaN(num) || isNaN(parseFloat(num))) {
        // throw new Error('Invalid number')
        console.error('Invalid number', num);
        return 0
    }

    let isNav = parseFloat(num) < 0

    num = Math.abs(num)

    num = parseInt(num) === parseFloat(num) ? num + '.0' : num

    let numArr = `${num}`.split('')
    let needReverse = time < 0

    if (needReverse) {
        numArr = numArr.reverse()
    }

    let dotIndex = numArr.indexOf('.')

    if (dotIndex < 0) {
        return num * Math.pow(10, time)
    }

    let i = dotIndex
    time = Math.abs(time)
    for (; time > 0; i++, time--) {
        let cur = numArr[i]
        let temp = typeof numArr[i + 1] === 'string' ? numArr[i + 1] : '0'
        numArr[i + 1] = cur
        numArr[i] = temp
    }

    if (needReverse) {
        return isNav ? parseFloat(numArr.reverse().join('')) * -1 : parseFloat(numArr.reverse().join(''));
    } else {
        return isNav ? parseFloat(numArr.join('')) * -1 : parseFloat(numArr.join(''));
    }
}