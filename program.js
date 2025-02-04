let gridSize = 5;
      let gridData = [];
      function generateGrid() {
        gridSize = parseInt(document.getElementById("size").value);
        const grid = document.getElementById("grid");
        grid.innerHTML = "";
        gridData = Array.from({ length: gridSize }, () =>
          Array(gridSize).fill(0)
        );
        grid.style.gridTemplateColumns = `repeat(${gridSize}, 30px)`;
        grid.style.gridTemplateRows = `repeat(${gridSize}, 30px)`;
        grid.classList.add("grid");
        for (let r = 0; r < gridSize; r++) {
          for (let c = 0; c < gridSize; c++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.dataset.row = r;
            cell.dataset.col = c;
            cell.addEventListener("click", toggleCell);
            grid.appendChild(cell);
          }
        }
      }
      function toggleCell(event) {
        const cell = event.target;
        const row = cell.dataset.row;
        const col = cell.dataset.col;
        gridData[row][col] = gridData[row][col] === 0 ? 1 : 0;
        cell.classList.toggle("filled");
      }
      function randomizeGrid() {
        document.querySelectorAll(".cell").forEach((cell) => {
          const row = cell.dataset.row;
          const col = cell.dataset.col;
          gridData[row][col] = Math.random() > 0.5 ? 1 : 0;
          cell.classList.toggle("filled", gridData[row][col] === 1);
        });
      }
      function saveGrid() {
        const jsonData = JSON.stringify({ size: gridSize, data: gridData });
        const blob = new Blob([jsonData], { type: "application/json" });
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = `palya_${gridSize}x${gridSize}.json`;
        a.click();
      }
      generateGrid(); 
