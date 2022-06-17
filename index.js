const dotRegex = /\.\w*\./;
const doubleOppRegex = /[0-9]$/;
const endNegRegex = /[0-9](-|\+|\*|\/)$/;
const endDoubleSymbRegex = /[^0-9][^0-9]$/;

 class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            number: '0',
            answer: [],
            displayNum: '0',
            doMath: '',
            negative: false
        }
        this.onClick = this.onClick.bind(this);
        this.reset= this.reset.bind(this);
        this.noZero = this.noZero.bind(this);
        this.onOpp = this.onOpp.bind(this);
        this.onEqual = this.onEqual.bind(this);
        this.noDec = this.noDec.bind(this);
    }
    mathFunction () {
        let tempArr = [];
        console.log(this.state.negative)
        if(this.state.negative){
            this.setState({
                negative: false
            })
            tempArr = this.state.answer.concat(parseInt(this.state.number) * -1)
        } else {
            tempArr = this.state.answer.concat(this.state.number)
        }
        //this loop checks for multiplication and performs the opperations if they exist.
        //if there are only multiplication opperations, the function will return the product.
        for (let i = 0; i < tempArr.length; i++){
            if (tempArr[i] == "*" && tempArr.length == 3){
                console.log('im in *');
                return parseFloat(tempArr[i-1]) * parseFloat(tempArr[i+1]);
            } else if (tempArr[i] == "*") {
                let a = parseFloat(tempArr[i-1]);
                let b = parseFloat(tempArr[i+1]);
                a *=b;
                tempArr.splice(i-1,3,a);
                console.log(tempArr);
                console.log(tempArr.length)
                i=0;
            }
        }
        //This loop checks for division and performs the operations if they exist.
        //if there are only multiplication & division opperations, the function will return.
        //this loop will also check if a number is being divided by 0, and will return undefined if it is
        for (let i = 0; i < tempArr.length; i++){
            if (tempArr[i] == "/" && tempArr.length == 3){
                console.log('im in /');
                if (tempArr[i+1] == 0){
                    return "undefined";
                }
                return parseFloat(tempArr[i-1]) / parseFloat(tempArr[i+1])
            } else if (tempArr[i] == "/") {
                if (tempArr[i+1] == 0){
                    return "undefined";
                }
                let a = parseFloat(tempArr[i-1]);
                let b = parseFloat(tempArr[i+1]);
                a /=b;
                tempArr.splice(i-1,3,a);
                console.log(tempArr);
                console.log(tempArr.length)
                i=0;
            }
        }
        //this final loop checks for subtraction.
        // if the input meets the expected values, the loop will return after performing the subtraction.
        //this loop returns 0 if there is an error
        for (let i = 0; i < tempArr.length; i++){
            if (tempArr[i] == "-" && tempArr.length == 3){
                console.log('im in -');
                return parseFloat(tempArr[i-1]) - parseFloat(tempArr[i+1])
            } else if (tempArr[i] == "-") {
                let a = parseFloat(tempArr[i-1]);
                let b = parseFloat(tempArr[i+1]);
                a -=b;
                tempArr.splice(i-1,3,a);
                console.log(tempArr);
                console.log(tempArr.length)
                i=0;
            }
        }
        //this loop checks for addition and performs the operation if it exists.
        // if there are only * / + the function will return.
        for (let i = 0; i < tempArr.length; i++){
            if (tempArr[i] == "+" && tempArr.length == 3){
                console.log('im in +');
                return parseFloat(tempArr[i-1]) + parseFloat(tempArr[i+1]);
            } else if (tempArr[i] == "+") {
                let a = parseFloat(tempArr[i-1]);
                let b = parseFloat(tempArr[i+1]);
                a +=b;
                tempArr.splice(i-1,3,a);
                console.log(tempArr);
                console.log(tempArr.length)
                i=0;
            }
        }
        return undefined;
       }
       
    reset () {
        this.setState({
            number: '0',
            answer: [],
            displayNum: '0',
            doMath: '',
            negative: false
        })
    }
    onEqual (e) {
        this.setState({
            displayNum: this.mathFunction(),
            answer: [],
            number: this.mathFunction(),
            doMath: this.mathFunction()
        })
    }
    onOpp (e) {
        if (doubleOppRegex.test(this.state.number)){
            if(this.state.negative){
                this.setState({
                    displayNum: this.state.displayNum += e,
                    answer: this.state.answer.slice().concat([this.state.number*-1, e]),
                    number: '',
                    negative: false
                })
            } else {
                this.setState({
                    displayNum: this.state.displayNum += e,
                    answer: this.state.answer.slice().concat([this.state.number, e]),
                    number: '',
                    negative: false
                })
            }       
        } else if (endNegRegex.test(this.state.displayNum) && e == "-") {
            console.log("regex works")
            this.setState({
                displayNum: this.state.displayNum += "-",
                negative: true
            })

        } else if (endDoubleSymbRegex.test(this.state.displayNum)) {
            this.setState({
                displayNum: this.state.displayNum.slice(0, this.state.displayNum.length-2).concat(e),
                answer: this.state.answer.slice(0, this.state.answer.length-1).concat(e),
                number: '',
                negative: false
            })
        } else {
            console.log("im here")
            this.setState({
                displayNum: this.state.displayNum.slice(0, this.state.displayNum.length -1).concat(e),
                answer: this.state.answer.slice(0, this.state.answer.length-1).concat(e),
                number: '',
                negative: false
            })
        }
    }
    onClick (e) {
        if (this.state.number == "0" && e != "."){
            this.setState({
                number: e,
                displayNum: e
            })
        } else {
            this.setState({
                number: this.state.number += e,
                displayNum: this.state.displayNum += e,
            })
        }
        this.noZero();
        this.noDec();
    }
    noDec () {
        if(dotRegex.test(this.state.number)){
            for (let i = 0; i < this.state.number.length; i++){
                    this.setState ({
                        number: this.state.number.substring(0, this.state.number.length -1),
                        displayNum: this.state.displayNum.substring(0,this.state.displayNum.length -1)
                    })       
            }
        }
    }
    noZero () {
        if (this.state.number.indexOf("0") === 0 && this.state.number.indexOf("0",1) == 1){
            this.setState ({
                number: this.state.number.substring(1),
                displayNum: this.state.displayNum.substring(0,this.state.displayNum.length -1),
                answer: this.state.answer
            })
        }
    }
    
    render(){
    return (
            <div className="container">
                <div className="grid">
                    <div className="dis"><div id="display">{this.state.displayNum}</div><div id="display">{this.state.doMath}</div></div>
                    <div id="clear" className="inputBtn AC" onClick={this.reset}>AC</div>
                    <div id="divide" className="inputBtn divide" onClick={(e) => this.onOpp("/")}>/</div>
                    <div id="multiply" className="inputBtn multiply" onClick={(e) => this.onOpp("*")}>x</div>
                    <div id="subtract" className="inputBtn minus" onClick={(e) => this.onOpp("-")}>-</div>
                    <div id="add" className="inputBtn plus" onClick={(e) => this.onOpp("+")}>+</div>
                    <div id="equals" className="inputBtn equals" onClick={(e) => this.onEqual("=")}>=</div>
                    <div id="one" className="inputBtn one" onClick={(e) => this.onClick("1")}>1</div>
                    <div id="two" className="inputBtn two" onClick={(e) => this.onClick("2")}>2</div>
                    <div id="three" className="inputBtn three" onClick={(e) => this.onClick("3")}>3</div>
                    <div id="four" className="inputBtn four" onClick={(e) => this.onClick("4")}>4</div>
                    <div id="five" className="inputBtn five" onClick={(e) => this.onClick("5")}>5</div>
                    <div id="six" className="inputBtn six" onClick={(e) => this.onClick("6")}>6</div>
                    <div id="seven" className="inputBtn seven" onClick={(e) => this.onClick("7")}>7</div>
                    <div id="eight" className="inputBtn eight" onClick={(e) => this.onClick("8")}>8</div>
                    <div id="nine" className="inputBtn nine" onClick={(e) => this.onClick("9")}>9</div>
                    <div id="zero" className="inputBtn zero" onClick={(e) => this.onClick("0")}>0</div>
                    <div id="decimal" className="inputBtn decimal" onClick={(e) => this.onClick(".")}>.</div>
                </div>
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById("root"));