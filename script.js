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
        constNode1 = new ConstNode(1);
        constNode0 = new ConstNode(0);

        unaryOperationNode = new UnaryOperationNode();
        unaryOperationNode.childNode = constNode0;

        binaryNode = new BinaryOperationNode("&");
        binaryNode.childNode1 = constNode1;
        binaryNode.childNode2 = unaryOperationNode;

        // alert(binaryNode.getStringValue());
        // alert(binaryNode.calculate());

        var a = [];
        a.push(constNode1);
        a.push(unaryOperationNode);
        a.push(binaryNode);
        for (var i = 0; i < a.length; i++) {
            alert(a[i].getStringValue());
        }
        // var expression = document.forms["input"].elements["text"].value;
        //  createRPN(expression)
    }

    function createRPN(expression) {
        alert("function " + expression);
        var fixedExp = expression.replace(/->/g, "-");

        alert("after " + fixedExp);
    }


}