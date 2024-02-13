//유저가 값을 입력한다
// + 버튼을 클릭하면, 할일이 추가된다
// delete버튼을 누르면 할일이 삭제된다
// check버튼을 누르면 할일이 끝나면서 밑줄이 간다
// 진행중 끝남 탭을 누르면, 언더바가 이동한다
// 끝남탭은, 끝난 아이템만, 진행중탭은 진행중인 아이템만
// 전체탭을 누르면 다시 전체아이템으로 돌아옴

let taskInput = document.getElementById('task-input')
let addButton = document.getElementById('add-button')
let taskList = [];

addButton.addEventListener('click',addTask)
taskInput.addEventListener('focus', function() {
  taskInput.value = '';
})

function addTask() {
  let taskContent = taskInput.value
  taskList.push(taskContent)
  console.log(taskList)
  render();
}

/* taskList를 그려줌 */
function render() {
  let resultHTML = '';
  for(let i=0; taskList.length > i;i++) {
  //리스트가 추가될 때마다 생성되어야 하는 태그 안에 내용만 바뀌고
  //+버튼을 누를 때 해당 태그가 추가되니까 index.html에 아래 태그 내용을 생략해도 됨
    //   <div class="task">
  //   <div>task</div>
  //   <div>
  //     <button>check</button>
  //     <button>delete</button>
  //   </div>
  // </div>
    resultHTML += `<div class="task">
    <div>${taskList[i]}</div>
    <div>
      <button>check</button>
      <button>delete</button>
    </div>
  </div>`
  }
  document.getElementById('task-board').innerHTML = resultHTML
}
