var table = document.getElementById("table");
var score = document.getElementById("score");
var bestScore = document.getElementById("best-score");
var reset = document.getElementById("reset");
var data = [];
function init() {
    var fragment = document.createDocumentFragment();
    [1, 2, 3, 4].forEach(function() {
        var cloneData = [];
        data.push(cloneData);
        var tr = document.createElement('tr');
        [1, 2, 3, 4].forEach(function() {
            cloneData.push(0);
            var td = document.createElement('td');
            tr.appendChild(td);
        });
        fragment.appendChild(tr);
    });
    table.appendChild(fragment);
}

reset.addEventListener("click", function() {
    table.innerHTML = "";
    if(score.innerHTML > bestScore.innerHTML) {
        bestScore.innerHTML = score.textContent;
    }
    data = [];
    score.innerHTML = 0;
    init();
});


function random() {
    var blank = [];
    data.forEach(function(cloneData, i) {
        cloneData.forEach(function(rowData, j) {
            if(!rowData) {
                blank.push([i, j]);
                
            }
        });
    });
    if(blank.length === 0) {
        alert("GAMEOVER : "+ score.textContent);
        table.innerHTML = "";
        if(score.innerHTML > bestScore.innerHTML) {
            bestScore.innerHTML = score.textContent;
        }
        data = [];
        score.innerHTML = 0;
        init();
    } else {
        var randomSpace = blank[Math.floor(Math.random() * blank.length)];
        data[randomSpace[0]][randomSpace[1]] = 2;
        drow();
    }
    
}

function drow(){
    data.forEach(function(cloneData, i ) {
        cloneData.forEach(function(rowData, j) {
            if(rowData == 2) {
                table.children[i].children[j].textContent = rowData;
                table.children[i].children[j].style.backgroundColor = "#eee4da"; 
                table.children[i].children[j].style.color = "#2b2724";
            } else if(rowData == 4) {
                table.children[i].children[j].textContent = rowData;
                table.children[i].children[j].style.backgroundColor = "#ede0c8"; 
                table.children[i].children[j].style.color = "#2b2724";
            } else if(rowData == 8) {
                table.children[i].children[j].textContent = rowData;
                table.children[i].children[j].style.backgroundColor = "#f2b179"; 
                table.children[i].children[j].style.color = "#f9f6f2";
            } else if(rowData == 16) {
                table.children[i].children[j].textContent = rowData;
                table.children[i].children[j].style.backgroundColor = "#f6603c"; 
                table.children[i].children[j].style.color = "#f9f6f2";
            } else if(rowData == 32) {
                table.children[i].children[j].textContent = rowData;
                table.children[i].children[j].style.backgroundColor = "#edcf72"; 
                table.children[i].children[j].style.color = "#f9f6f2";
            } else if(rowData == 64) {
                table.children[i].children[j].textContent = rowData;
                table.children[i].children[j].style.backgroundColor = "#ea5a38"; 
                table.children[i].children[j].style.color = "#f9f6f2";
            } else if(rowData == 128) {
                table.children[i].children[j].textContent = rowData;
                table.children[i].children[j].style.backgroundColor = "#f2d04b"; 
                table.children[i].children[j].style.color = "#f9f6f2";
            } else if(rowData == 256) {
                table.children[i].children[j].textContent = rowData;
                table.children[i].children[j].style.backgroundColor = "#edc850"; 
                table.children[i].children[j].style.color = "#f9f6f2";
            } else if(rowData == 512) {
                table.children[i].children[j].textContent = rowData;
                table.children[i].children[j].style.backgroundColor = "#e3ba14"; 
                table.children[i].children[j].style.color = "#f9f6f2";
            } else if(rowData == 1024) {
                table.children[i].children[j].textContent = rowData;
                table.children[i].children[j].style.backgroundColor = "#e0ba11"; 
                table.children[i].children[j].style.color = "#f9f6f2";
            } else if(rowData == 2048) {
                table.children[i].children[j].textContent = rowData;
                table.children[i].children[j].style.backgroundColor = "#e9c500"; 
                table.children[i].children[j].style.color = "#f9f6f2";
            } else if(rowData == 4096) {
                table.children[i].children[j].textContent = rowData;
                table.children[i].children[j].style.backgroundColor = "#5ddb94"; 
                table.children[i].children[j].style.color = "#f9f6f2";
            } else {
                table.children[i].children[j].textContent = '';
                table.children[i].children[j].style.backgroundColor = "#dfdfdf";
            }
        });
    });
}

init();
random();
drow();

// 드래그 시작 여부
var dragStart = false;
var draging = false;
// 시작 좌표
var startIocation = [];
// 끝 좌표
var endIocation = [];
//마우스 스와이프(드래그)
window.addEventListener('mousedown', function(e) {
    // console.log('mousedown', e);
    dragStart = true;
    startIocation = [e.clientX, e.clientY];
});

window.addEventListener('mousemove', function(e) {
    if(dragStart) {
        draging = true;

    }
    
});

window.addEventListener('mouseup', function(e) {
    endIocation = [e.clientX, e.clientY];        
    var way;
    var endX = endIocation[0] - startIocation[0];
    var endY = endIocation[1] - startIocation[1];    

    if(endX === 0 && endY === 0){
        return;
    }
    
    if(draging) {

        
        
        if(endX < 0 && Math.abs(endX) / Math.abs(endY) > 1) {
            way = "왼쪽";
        } else if(endX > 0 && Math.abs(endX) / Math.abs(endY) > 1) {
            way = "오른쪽";
        } else if(endY > 0 && Math.abs(endX) / Math.abs(endY) < 1) {
            way = "아래";
        } else if(endY < 0 && Math.abs(endX) / Math.abs(endY) < 1) {
            way = "위";
        }
    }
    //x좌표 y좌표가 끝날때의 차이
    
    dragStart = false;
    draging = false;
    switch(way) {
        case "왼쪽" :
                var newData = [
                    [],
                    [],
                    [],
                    []
                ];
                data.forEach(function(cloneData, i) {
                    cloneData.forEach(function(rowData, j) {
                        if(rowData) {
                            if(newData[i][newData[i].length - 1] && newData[i][newData[i].length - 1] === rowData) {
                                newData[i][newData[i].length - 1] *= 2;
                                var nowScore = parseInt(score.textContent, 10);
                                score.textContent = nowScore + newData[i][newData[i].length - 1];
                            } else {
                                newData[i].push(rowData);
                            }
                        
                        }
                    });
                });
                [1, 2, 3, 4].forEach(function(cloneData, i) {
                    [1, 2, 3, 4].forEach(function(rowData, j) {
                        data[i][j] = newData[i][j] || 0;
                    });
                });
            break;
        case "오른쪽" :
                var newData = [
                    [],
                    [],
                    [],
                    []
                ];
                data.forEach(function(cloneData, i) {
                    cloneData.forEach(function(rowData, j) {
                        if(rowData) {
                            if(newData[i][0] && newData[i][0] === rowData) {
                                newData[i][0] *= 2;
                                var nowScore = parseInt(score.textContent, 10);
                                score.textContent = nowScore + newData[i][0];
                            } else {
                                newData[i].unshift(rowData);
                            }
                        
                        }
                    });
                });
                [1, 2, 3, 4].forEach(function(cloneData, i) {
                    [1, 2, 3, 4].forEach(function(rowData, j) {
                        data[i][3 - j] = newData[i][j] || 0;
                    });
                });
            break;
        case "위" :
            var newData = [
                [],
                [],
                [],
                []
            ];
            data.forEach(function(cloneData, i) {
                cloneData.forEach(function(rowData, j) {
                    if(rowData) {
                        if(newData[j][newData[j].length - 1] && newData[j][newData[j].length - 1] === rowData) {
                            newData[j][newData[j].length - 1] *= 2;
                            var nowScore = parseInt(score.textContent, 10);
                            score.textContent = nowScore + newData[j][newData[j].length - 1];
                        } else {
                            newData[j].push(rowData);
                        }
                    }
                });
            });
            [1, 2, 3, 4].forEach(function(rowData, i) {
                [1, 2, 3, 4].forEach(function(cloneData, j) {
                    data[j][i] = newData[i][j] || 0;
                });
            });
            break;
        case "아래" :
                var newData = [
                    [],
                    [],
                    [],
                    []
                ];
                data.forEach(function(cloneData, i) {
                    cloneData.forEach(function(rowData, j) {
                        if(rowData) {
                            if(newData[j][0] && newData[j][0] === rowData) {
                                newData[j][0] *= 2;
                                var nowScore = parseInt(score.textContent, 10);
                                score.textContent = nowScore + newData[j][0];
                            } else {
                                newData[j].unshift(rowData);
                            }
                        }
                    });
                });
                [1, 2, 3, 4].forEach(function(rowData, i) {
                    [1, 2, 3, 4].forEach(function(cloneData, j) {
                        data[3 - j][i] = newData[i][j] || 0;
                    });
                });
            break;
    }
    random();
});
