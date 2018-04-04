window.onload = function () {

    class BinaryOperationNode{

        constructor(type) {
            this.type = type;

            this.childNode1;
            this.childNode2;
        }

        getStringValue(){
            return "("+ this.childNode1.getStringValue() + this.type + this.childNode2.getStringValue() + ")";
        }

        calculate(){
            switch (this.type) {
                case "&":
                    if(this.childNode1.calculate() === 1 && this.childNode2.calculate() === 1) return 1;
                    else return 0;
                case "|":
                    if(this.childNode1.calculate() === 1 || this.childNode2.calculate() === 1) return 1;
                    else return 0;
                case "~":
                    if((this.childNode1.calculate() === 1 && this.childNode2.calculate() === 1) ||
                        (this.childNode1.calculate() === 0 && this.childNode2.calculate() === 0)) return 1;
                    else return 0;
                case "->":
                    if(this.childNode1.calculate() === 1 && this.childNode2.calculate() === 0) return 0;
                    else return 1;

            }
        }
    }

    class UnaryOperationNode{

        constructor() {
            this.childNode;
        }

        getStringValue() {
            return "(!" + this.childNode.getStringValue() + ")";
        }

        calculate() {
            return (this.childNode.calculate() === 0) ? 1 : 0;
        }
    }

    class VariableNode{
        constructor(stringValue) {
            this.stringValue = stringValue;
            this.value;
        }

        calculate() {
            return this.value;
        }

        getStringValue() {
            return this.stringValue;
        }
    }

    class ConstNode{
        constructor(value) {
            this.value = value;
        }

        calculate() {
            return this.value;
        }

        getStringValue() {
            return this.value;
        }

    }

    document.getElementById('submit').onclick = function () {
        // constNode1 = new ConstNode(1);
        // constNode0 = new ConstNode(0);
        //
        // unaryOperationNode = new UnaryOperationNode();
        // unaryOperationNode.childNode = constNode0;
        //
        // binaryNode = new BinaryOperationNode("&");
        // binaryNode.childNode1 = constNode1;
        // binaryNode.childNode2 = unaryOperationNode;
        //
        // // alert(binaryNode.getStringValue());
        // // alert(binaryNode.calculate());
        //
        // var a = [];
        // a.push(constNode1);
        // a.push(unaryOperationNode);
        // a.push(binaryNode);
        // for (var i = 0; i < a.length; i++) {
        //     alert(a[i].getStringValue());
        // }

        var stackRPN = [];
        stackRPN.push(new VariableNode("A"));
        stackRPN.push(new VariableNode("B"));
        stackRPN.push(new BinaryOperationNode("~"));
        calculateRPN(stackRPN);
         // var expression = document.forms["input"].elements["text"].value;
         //  createRPN(expression)
    }

    function calculateRPN(stackRPN) {
      var allNodes = [];
      var variableNodes = [];
      var tmpHolder = [];
      while (stackRPN.length !== 0) {
          var node = stackRPN.shift();
          allNodes.push(node);
          if(node instanceof VariableNode){
              tmpHolder.push(node);
              variableNodes.push(node)
          }
          if(node instanceof ConstNode){
              tmpHolder.push(node);
          }
          if(node instanceof UnaryOperationNode){
              node.childNode = tmpHolder.pop();
              tmpHolder.push(node);
          }
          if(node instanceof BinaryOperationNode){
              node.childNode2 = tmpHolder.pop();
              node.childNode1 = tmpHolder.pop();
              tmpHolder.push(node);
          }
      }

      var head = tmpHolder.pop();
      // alert(head.getStringValue());
      // alert(head.calculate());

        calculateAmount(allNodes);
        checkIfPossible(head,variableNodes);
    }

    function calculateAmount(allNodes) {
        var result = [];

        for(var i = 0; i<allNodes.length; i++){
            console.log(allNodes[i].getStringValue());
            if(!result.includes(allNodes[i].getStringValue())){
                result.push(allNodes[i].getStringValue());
            }
        }

        console.log("result " + result.length);
        document.body.innerHTML += "Количетсво подформул " + result.length +"<br>";
    }
    
    function checkIfPossible(head,variableNodes) {
        var result = true;
        for(var i = 0; i<Math.pow(2,variableNodes.length); i++){
            var values = i.toString(2);
            while (values.length < variableNodes.length) {
                values = "0" + values;
            }

            for(var j = 0; j < variableNodes.length; j++){
                variableNodes[j].value = parseInt(values[j]);
            }

            if(head.calculate() === 1){
               result = false;
               break;
            }
        }

        console.log(result);
        document.body.innerHTML += "Формула невыполнима " + result;
    }

    function createRPN(expression) {

    }


}