let submit = document.querySelector("svg")

let errorcolor = "hsl(0, 100%, 67%)"

function errorchange(condition, v) {
    if (condition) {
        v.style.border = `1px solid ${errorcolor}`
        v.parentElement.querySelector("label").style.color = errorcolor
        v.parentElement.querySelector(`.error`).style.color = errorcolor
    } else {
        v.style.border = `1px solid hsl(0, 0%, 86%)`
        v.parentElement.querySelector("label").style.color = "hsl(0, 1%, 44%)"
        v.parentElement.querySelector(`.error`).style.color = errorcolor
    }
}

function check(data) {
    let val = parseInt(data.value)
    let x = data.id

    let year = new Date().getFullYear()
    switch (true) {
        case typeof val != "number" || isNaN(val):
            return "Give a number"
    }
    if (x == "d") {
        switch (true) {
            case val > 31 || val < 1:
                return "Give a valid day"
        }
    } else if (x == "m") {
        switch (true) {
            case val > 12 || val < 1:
                return "Give a valid month"
        }
    } else if (x == "y") {
        switch (true) {
            case val > year || val < 1:
                return "Give a valid year"
        }
    }
    return ""
}

let data = {
    d: document.querySelector("#d"),
    m: document.querySelector("#m"),
    y: document.querySelector("#y")
}

submit.addEventListener("click", function(event) {
    let target = event.target

    let valid = 0
    for (let [k,v] of Object.entries(data)) {
        let msg = check(v)

        document.querySelector(`.${k}x`).innerHTML = msg
        if (msg != "") {
            errorchange(true, v)
        } else {
            valid++
            errorchange(false, v)
        }
    }
    for (let [k,v] of Object.entries(data)) {
        if (valid == 3) {
            let val  = {
                dx: data.d.value,
                mx: data.m.value,
                yx: data.y.value
            }
            let cur = new Date()
    
            let day = cur.getDate()
            let month = cur.getMonth() + 1
            let year = cur.getFullYear()
    
            let box = document.querySelector(`.output .set${k}`)
            let boxval = box.querySelector("span")

            let time = new Date(`${val.yx}-${val.mx}-${val.dx}`)
            const timeDifference = cur - time;
            const daysDifference = timeDifference / (1000 * 60 * 60 * 24);
          
            const yearsDifference = Math.floor(daysDifference / 365.25);
          
            const remainingDays = daysDifference - (yearsDifference * 365.25);
 
            const monthsDifference = Math.floor(remainingDays / 30.44);
          
            const finalDays = Math.floor(remainingDays - (monthsDifference * 30.44));

            let past = {
                dp: finalDays,
                mp: monthsDifference,
                yp : yearsDifference
            }
            boxval.innerHTML = past[`${k}p`]
        }
    }
})