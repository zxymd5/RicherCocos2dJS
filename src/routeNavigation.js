var RouteNavigation = {
    GO_UP: 0,
    GO_DOWN: 1,
    GO_LEFT: 2,
    GO_RIGHT: 3,

    arrPathCols: [],
    arrPathRows: [],

    getPath: function (player, stepsCount, canPassGrid, gridRowsCount, gridColsCount) {
        this.arrPathCols = []
        this.arrPathRows = []

        var nextCol, nextRow
        var currentCol, currentRow
        var x = player.getPositionX()
        var y = player.getPositionY()
        currentCol = x / GameBaseLayer.tiledHeight
        currentRow = (y - GameBaseLayer.tiledWidth) / GameBaseLayer.tiledWidth

        this.arrPathCols.push(currentCol)
        this.arrPathRows.push(currentRow)

        var canPassGridCopy = []
        for (var i = 0; i < gridRowsCount; i++) {
            canPassGridCopy.push([])
        }

        for (var row = 0; row < gridRowsCount; row++) {
            for (var col = 0; col < gridColsCount; col++) {
                canPassGridCopy[row][col] = canPassGrid[row][col];
            }
        }

        var rowtemp = player.comeFromRow
        var coltemp = player.comeFromCol
        if (rowtemp <= -1 || coltemp <= -1) {
            player.comeFromCol = currentCol
            player.comeFromeRow = currentRow
        }

        canPassGridCopy[player.comeFromeRow][player.comeFromCol] = false

        var direction_4 = []
        var canPassDirVector_temp = []

        var hasGoneNumber = 0
        while (hasGoneNumber < stepsCount) {
            direction_4 = [false, false, false, false]
            canPassDirVector_temp = []

            direction_4[this.GO_UP] = this.isCanGoByColRow(currentRow, currentCol, this.GO_UP, canPassGridCopy);
            direction_4[this.GO_DOWN] = this.isCanGoByColRow(currentRow, currentCol, this.GO_DOWN, canPassGridCopy);
            direction_4[this.GO_LEFT] = this.isCanGoByColRow(currentRow, currentCol, this.GO_LEFT, canPassGridCopy);
            direction_4[this.GO_RIGHT] = this.isCanGoByColRow(currentRow, currentCol, this.GO_RIGHT, canPassGridCopy);

            for (var i = 0; i < 4; i++) {
                if (direction_4[i]) {
                    canPassDirVector_temp.push(i);
                }
            }

            if (canPassDirVector_temp.length === 0)
                return;

            var _rand = (Math.random() * canPassDirVector_temp.length) | 0

            switch (canPassDirVector_temp[_rand]) {
                case this.GO_UP: {
                    nextRow = currentRow - 1;
                    nextCol = currentCol;
                    break;
                }

                case this.GO_DOWN: {
                    nextRow = currentRow + 1;
                    nextCol = currentCol;
                    break;
                }
                case this.GO_LEFT: {
                    nextRow = currentRow;
                    nextCol = currentCol - 1;
                    break;
                }
                case this.GO_RIGHT: {
                    nextRow = currentRow;
                    nextCol = currentCol + 1;
                    break;
                }
            }
            this.arrPathCols.push(nextCol)
            this.arrPathRows.push(nextRow)
            canPassGridCopy[currentRow][currentCol] = false;

            currentCol = nextCol;
            currentRow = nextRow;

            hasGoneNumber++;
        }
        player.comeFromCol = this.arrPathCols[this.arrPathCols.length - 2]
        player.comeFromeRow = this.arrPathRows[this.arrPathRows.length - 2]


    },
    isCanGoByColRow: function (row, col, direction, canPassGrid) {
        switch (direction) {
            case this.GO_UP: {
                return canPassGrid[row - 1][col]
            }
            case this.GO_DOWN: {
                return canPassGrid[row + 1][col]
            }
            case this.GO_LEFT: {
                return canPassGrid[row][col - 1]
            }
            case this.GO_RIGHT: {
                return canPassGrid[row][col + 1]
            }
        }

        return false;
    }
}