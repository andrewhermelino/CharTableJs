
export class CharTableJs {

    constructor(columns) {
        this.columnNames = [];
        this.columnNameAligns = {};
        this.columnValueAligns = {};
        this.rows = [];

        for(const col of columns) {
            if(typeof col == "string") {
                this.columnNames.push(col);
                this.columnNameAligns[col] = "right";
                this.columnValueAligns[col] = "right";
            } else {
                const columnName = Object.keys(col)[0];
                const columnParam = col[columnName];

                this.columnNames.push(columnName);
                if(typeof columnParam == "string") {
                    this.columnNameAligns[columnName] = "right";
                    this.columnValueAligns[columnName] = columnParam.toLowerCase();
                } else if(Array.isArray(columnParam)) {
                    if (columnParam.length == 1) {
                        this.columnNameAligns[columnName] = columnParam[0].toLowerCase();
                        this.columnValueAligns[columnName] = "right";
                    } else if(columnParam.length == 2) {
                        this.columnNameAligns[columnName] = columnParam[0].toLowerCase();
                        this.columnValueAligns[columnName] = columnParam[1].toLowerCase();
                    }
                }

            }
        }
    }

    get colsWidth() {
        const colsWidth = {}

        for(const col of this.columnNames) {
            colsWidth[col] = col.length;
        }

        for(const row of this.rows) {
            for(const col of Object.keys(row)) {
                const currentColLength = row[col].toString().length;
                if(currentColLength > colsWidth[col]) {
                    colsWidth[col] = currentColLength;
                }
            }
        }

        return colsWidth;
    }

    get visualTableStr() {
        let result = "";
        for(const line of this.visualTableArray) {
            result += line+"\n";
        }
        return result
    }

    get visualTableArray() {
        const visualTableArray = [];
        let line = "";

        // Linha de cima do cabeçalho
        line = "+";
        for(const col of this.columnNames) {
            line += this.fillStringLength("", this.colsWidth[col]+2, "center", "-");
            const lastColumn = this.columnNames[this.columnNames.length-1];
            if(col == lastColumn) {
                line += "+";
            } else {
                line += "-";
            }
        }
        visualTableArray.push(line)

        // Cabeçalho
        line = "|";
        for(const col of this.columnNames) {
            line += " " + this.fillStringLength(col, this.colsWidth[col], this.columnNameAligns[col]) + " |";
        }
        visualTableArray.push(line);

        // Linha de baixo do cabeçalho
        line = "|";
        for(const col of this.columnNames) {
            line += this.fillStringLength("", this.colsWidth[col]+2, "center", "-");
            const lastColumn = this.columnNames[this.columnNames.length-1];
            if(col == lastColumn) {
                line += "|";
            } else {
                line += "+";
            }
        }
        visualTableArray.push(line)

        // Linhas da tabela
        for(const row of this.rows) {
            line = "|";
            for(const col of Object.keys(row)) {
                line += " " + this.fillStringLength(row[col], this.colsWidth[col], this.columnValueAligns[col]) + " |";
            }
            visualTableArray.push(line)
        }

        // Linha de baixo da tabela
        line = "+";
        for(const col of this.columnNames) {
            line += this.fillStringLength("", this.colsWidth[col]+2, "center", "-");
            const lastColumn = this.columnNames[this.columnNames.length-1];
            if(col == lastColumn) {
                line += "+";
            } else {
                line += "-";
            }
        }
        visualTableArray.push(line)

        return visualTableArray;
    }

    row(row) {
        if(typeof row == "object") {
            const newRow = {};

            if(Array.isArray(row)) {

                for(const colIndex in this.columnNames) {
                    if(Object.keys(row).includes(colIndex)) {
                        const currentCol = this.columnNames[colIndex];
                        const currentValue = row[colIndex].toString();
                        newRow[currentCol] = currentValue;
                    } else {
                        const currentCol = this.columnNames[colIndex];
                        const currentValue = "";
                        newRow[currentCol] = currentValue;
                    }
                }

            } else {

                for(const currentNewRowCol of this.columnNames) {
                    if(Object.keys(row).includes(currentNewRowCol)) {
                        if(this.columnNames.includes(currentNewRowCol)) {
                            newRow[currentNewRowCol] = row[currentNewRowCol].toString();
                        }
                    } else {
                        newRow[currentNewRowCol] = "";
                    }
                }

            }

            this.rows.push(newRow);
        }
    }

    fillStringLength(string, length, align="right", character=" ") {
        let stringResult = string;
        
        if(length > string.length) {
            if(align == "right") {
                stringResult += character.repeat(length - string.length);
            } else if(align == "left") {
                stringResult = character.repeat(length - string.length) + stringResult;
            } else if (["center", "centerleft", "centerleft"].includes(align)) {
                const lengthOfEachSide = Math.floor((length - string.length)/2);
                stringResult = character.repeat(lengthOfEachSide) + stringResult + character.repeat(lengthOfEachSide);
                if((length - string.length) % 2 != 0) {
                    if(align == "centerleft") {
                        stringResult = character + stringResult;
                    } else {
                        stringResult += character;
                    }
                }
            }
        }

        return stringResult;
    }
}