(function() {
	'use strict';

	var assert = require('assert');
	//var chai = require('chai');
	var Grid = require('../js/grid.js');
	var logic = require('../js/logic.js');

	var LIVE = Grid.LIVE;
	var DEAD = Grid.DEAD;
	var WALL = Grid.WALL;

	var WIDTH = 200;
	var HEIGHT = 150;
	var myGrid = new Grid(WIDTH, HEIGHT);

	function setGrid(x, y, status) {
		myGrid.grid[x][y] = status;
	}

	describe('Test grid.js', function() {
		describe('Test Grid(width, height)', function() {
			it('after init grid, all elements should be DEAD', function() {
				for (var i = 0; i < WIDTH; ++i) {
					for (var j = 0; j < HEIGHT; ++j) {
						assert.equal(myGrid.grid[i][j], DEAD);
					}
				}
			});
		});
	});

	describe('Test logic.js', function() {
		describe('Test setRandomGrid(dense)', function() {
			it('live cell number should belongs to [cell number * (dense - 0.005), cell number * (dense + 0.005)]', function() {
				for (var dense = 0.15; dense <= 0.85; dense += 0.1) {
					logic.setRandomGrid(myGrid, dense);
					var live_cell_count = 0;
					for (var i = 0; i < WIDTH; ++i) {
						for (var j = 0; j < HEIGHT; ++j) {
							if (myGrid.grid[i][j] === LIVE) {
								++live_cell_count;
							}
						}
					}
					assert.equal((live_cell_count <= (dense + 0.005) * WIDTH * HEIGHT) && (live_cell_count >= (dense - 0.005) * WIDTH * HEIGHT), true);
				}
			});
		});

		describe('Test get_neighbor_count(x, y)', function() {
			it('should get correct neighbor count, btw, if live neighbor > 4, then return 4', function() {
				setGrid(80, 0, DEAD);
				setGrid(80, 1, LIVE);
				setGrid(80, 2, LIVE);
				setGrid(81, 0, DEAD);
				setGrid(82, 0, DEAD);
				setGrid(79, 0, DEAD);
				setGrid(78, 0, DEAD);
				assert.equal(logic.get_neighbor_count(80, 0, myGrid), 2);

				setGrid(20, 20, DEAD);
				setGrid(19, 20, WALL);
				setGrid(18, 20, LIVE);
				setGrid(21, 20, LIVE);
				setGrid(22, 20, LIVE);
				setGrid(20, 19, LIVE);
				setGrid(20, 18, DEAD);
				setGrid(20, 21, WALL);
				setGrid(20, 22, LIVE);
				assert.equal(logic.get_neighbor_count(20, 20, myGrid), 4);

				setGrid(20, 149, DEAD);
				setGrid(19, 149, DEAD);
				setGrid(18, 149, WALL);
				setGrid(21, 149, LIVE);
				setGrid(22, 149, DEAD);
				setGrid(20, 148, DEAD);
				setGrid(20, 147, DEAD);
				assert.equal(logic.get_neighbor_count(20, 149, myGrid), 1);

				setGrid(199, 4, DEAD);
				setGrid(199, 3, DEAD);
				setGrid(199, 2, LIVE);
				setGrid(199, 5, LIVE);
				setGrid(199, 6, DEAD);
				setGrid(198, 4, LIVE);
				setGrid(197, 4, DEAD);
				assert.equal(logic.get_neighbor_count(199, 4, myGrid), 3);

				setGrid(0, 80, DEAD);
				setGrid(0, 81, DEAD);
				setGrid(0, 82, DEAD);
				setGrid(0, 79, DEAD);
				setGrid(0, 78, DEAD);
				setGrid(1, 80, DEAD);
				setGrid(2, 80, WALL);
				assert.equal(logic.get_neighbor_count(0, 80, myGrid), 0);
			});
		});

		describe('Test update()', function() {
			it('should get correct status (live or dead)', function() {
				logic.update(myGrid);
				assert.equal(myGrid.grid[80][0], DEAD);
				assert.equal(myGrid.grid[20][20], DEAD);
				assert.equal(myGrid.grid[20][149], DEAD);
				assert.equal(myGrid.grid[199][4], LIVE);
				assert.equal(myGrid.grid[0][80], DEAD);
			});
		});
	});
})();