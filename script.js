window.onload = function () {
    class Node{
        getStringValue();
        calculate();
    }
    class OperationNode extends Node{

    }

    class VariableNode extends Node{
        value;
        stringValue;
        constructor(stringValue) {
            super();
            this.stringValue = stringValue;
        }

        calculate(){
            return this.value;
        }
    }

    class ConstNode extends Node{
        value;
        constructor(value) {
            super();
            this.value = value;
        }

        calculate(){
            return this.value;
        }

    }

    document.getElementById('submit').onclick = function () {
        node = new ConstNode(1);
        var expression = document.forms["input"].elements["text"].value;
        createRPN(expression)
    }

    function createRPN(expression) {
        alert("function " + expression);
        var fixedExp = expression.replace(/->/g, "-");
        alert("after " + fixedExp);
    }
    

}