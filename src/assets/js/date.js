export  function dateFormat(dateStr, pattern = '') {
    var dt = new Date(dateStr)

    //   yyyy-mm-dd
    var y = dt.getFullYear()
    var m = (dt.getMonth() + 1).toString().padStart(2, '0')
    var d = dt.getDate().toString().padStart(2, '0')

    if (pattern.toLowerCase() === 'yyyy-mm-dd') {
      return `${y}-${m}-${d}`
    } else {
      var hh = dt.getHours().toString().padStart(2, '0')
      var mm = dt.getMinutes().toString().padStart(2, '0')
      var ss = dt.getSeconds().toString().padStart(2, '0')

      return `${y}-${m}-${d} ${hh}:${mm}:${ss} ~~~~~~~`
    } 
}