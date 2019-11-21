const format = {
    filters: {
        formatNumber(val) {
            if (!val) return ''
            return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        },
        formatStaff(val) {
            if(!val) return ''
            let str = val.split('|').join(', ')
            return str.substring(0, (str.length - 2))
        }
    }
}

export {
    format
}