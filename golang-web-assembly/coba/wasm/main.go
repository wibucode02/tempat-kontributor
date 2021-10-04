package main

import (
	"fmt"
	"math"
	"strconv"
	"syscall/js"
)

func cariAkar(a float64) float64 {
    return math.Sqrt(a)
}



 
    var jsPangkatkan = js.FuncOf(func(this js.Value, args []js.Value) interface{} {
        a,_ := strconv.ParseFloat(args[0].String(),64)
        return cariAkar(a)
    })


func main() {  
    fmt.Println("Let's Go go go")

    js.Global().Set("goCariAkar", jsPangkatkan)
    <-make(chan bool)
}