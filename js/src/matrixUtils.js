/**
 * Created by luna on 07/09/15.
 */

function getPlainMatrix(cols,rows,defVal){
    var matrix = [];
    for (var i=0;i<rows;i++){
        var col = [];
        for (var j=0;j<cols;j++) {
            col.push(defVal);
        }
        matrix.push(col);
    }
    return matrix;
}

function copyMatrix(matrix){
    var matrixCopy = [];
    for (var i=0;i<matrix.length;i++){
        var col = [];
        for (var j=0;j<matrix[i].length;j++) {
            col.push(matrix[i][j]);

        }
        matrixCopy.push(col);
    }
    return matrixCopy;
}

function getTriangleBottomMatrix(cols,rows,defVal,nullVal){
    var matrix = [];
    var triangleCounter = 0;
    var center = Math.floor(cols/2);
    for (var i=0;i<rows;i++){
        var col = [];
        for (var j=0;j<cols;j++) {
            if ((triangleCounter*2)+1<cols){
                col.push((j<center-triangleCounter)||(j > center+triangleCounter) ? nullVal : defVal);

            } else {
                col.push(defVal);
            }

        }
        triangleCounter++;
        matrix.unshift(col);
    }
    return matrix;
}

function getEmptyRow(cols){
    var row = [];
    for (var j=0;j<cols;j++) {
        row.push(0);
    }
    return row;
}

function getPivot(pieceMatrix,pivotVal){
    pivotVal = pivotVal ? pivotVal : 2;
    for (var j=0;j<pieceMatrix.length;j++){
        for (var i=0;i<pieceMatrix[j].length;i++){
            if (pieceMatrix[j][i]==pivotVal){
                return {i:i,j:j};
            }
        }
    }
}

function correctPivot(matrix1,matrix2){
    var pivot1 = getPivot(matrix1);
    var pivot2 = getPivot(matrix2);
    return {i:pivot1.i-pivot2.i, j:pivot1.j-pivot2.j};
}

var rotateMatrix = function (matrix, direction) {
    //mod
    direction =(((direction % 360) + 360) % 360) || 0;
    var ret = copyMatrix(matrix);

    // Does not work with non-square matricies.
    var transpose1 = function (m) {
        for (var i = 0; i < m.length; i++) {
            for (var j = i; j < m[0].length; j++) {
                var x = m[i][j];
                m[i][j] = m[j][i];
                m[j][i] = x;
            }
        }
        return m;
    };

    // Too slow, builds new array THEN fills in the values.
    var transpose2 = function (m) {
        var result = arrayFilled(m.length, m[0].length, 0);
        for (var i = 0; i < m.length; i++) {
            for (var j = 0; j < m[0].length; j++) {
                result[j][i] = m[i][j];
            }
        }
        return result;
    };

    // Efficiently builds and fills values at the same time.
    var transpose3 = function (m) {
        var result = new Array(m[0].length);
        for (var i = 0; i < m[0].length; i++) {
            result[i] = new Array(m.length - 1);
            for (var j = m.length - 1; j > -1; j--) {
                result[i][j] = m[j][i];
            }
        }
        return result;
    };

    var transpose = function (m) {
        if (m.length === m[0].length) {
            return transpose1(m);
        } else {
            return transpose3(m);
        }
    };

    var reverseRows = function (m) {
        return m.reverse();
    };

    var reverseCols = function (m) {
        for (var i = 0; i < m.length; i++) {
            m[i].reverse();
        }
        return m;
    };

    var rotate90Left = function (m) {
        m = transpose(m);
        m = reverseRows(m);
        return m;
    };

    var rotate90Right = function (m) {
        m = reverseRows(m);
        m = transpose(m);
        return m;
    };

    var rotate180 = function (m) {
        m = reverseCols(m);
        m = reverseRows(m);
        return m;
    };

    if (direction == 90 || direction == -270) {
        return rotate90Left(ret);
    } else if (direction == -90 || direction == 270) {
        return rotate90Right(ret);
    } else if (Math.abs(direction) == 180) {
        return rotate180(ret);
    }

    return matrix;
};


