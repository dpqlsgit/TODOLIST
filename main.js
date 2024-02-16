//유저가 값을 입력한다
// + 버튼을 클릭하면, 할일이 추가된다
// delete버튼을 누르면 할일이 삭제된다
// check버튼을 누르면 할일이 끝나면서 밑줄이 간다
//   1.check 버튼을 클릭하는 순간 false -> true
//   2.true이면 끝난걸로 간주하고 밑줄 보여주기
//   3.false이면 안끝난걸로 간주하고 그대로
// 진행중 끝남 탭을 누르면, 언더바가 이동한다
// 끝남탭은, 끝난 아이템만, 진행중탭은 진행중인 아이템만
// 전체탭을 누르면 다시 전체아이템으로 돌아옴

let taskInput = document.getElementById('task-input')
let addButton = document.getElementById('add-button')
let checkButton = document.getElementById('check-button')
let taskList = [];
let deleteAllButton = document.getElementById('delete-all')
let doneAllButton = document.getElementById('done-all')
// let proceedingTab = document.getElementById('proceeding')
// let completeTab = document.getElementById('complete')
// let copyTaskList = []

//querySelectorAll -> 해당 조건에 만족하는 모든 태그 가져옴
//메뉴들
let tabs = document.querySelectorAll('.task-tabs div')
//초기값은 모두니까
let mode = "all"
let filterList = []
// let list = []

let underLine = document.getElementById('under-line')

//0번째 div태그(under-line)은 필요 없기때문에 1부터 시작
for(let i=1; tabs.length >i; i++) {
  tabs[i].addEventListener('click',function(event){
    filter(event)
  })
}

addButton.addEventListener('click',addTask)
deleteAllButton.addEventListener('click', deleteAll)
doneAllButton.addEventListener('click', doneAll)
// proceedingTab.addEventListener('click', proceeding)
// completeTab.addEventListener('click', complete)

//enter로 할 일 추가
taskInput.addEventListener('keyup', function(){
  if(window.event.keyCode === 13) {
    addTask()
  }
})

function addTask() {
  //할일 input에 아무 내용이 없으면 추가되지 않도록 막음
  if(!taskInput.value) {
    alert('할 일을 입력해주세요!!')
    return;
  }
  // let taskContent = taskInput.value
  let task = {
    //유니크 해야 함
    //generate random id js 검색
    //randomID a unique ID/name ~
    id: randomIDGenerate(),
    taskContent: taskInput.value,
    //할일 완료 되었는지 유무 속성
    isComplete : false,
    isDelete: false,
  }
  // taskList.push(taskContent)
  taskList.push(task)
  render();
  //할일 추가 후 할일 입력 input값 비우기
  taskInput.value = ''
}


/* taskList를 그려줌 / check-button 클릭 이벤트 ui도 여기서 처리 */
function render() {
  let list = []
  //1. 내가 선택한 탭에 따라서
  if(mode === "all") {
    //all taskList
    list = taskList
  } else if(mode === 'ongoing' || mode === 'done') {
    //ongoing, done filterList
    list = filterList
  }
  //2. 리스트를 달리 보여준다
  // all taskList
  // ongoing, done filterList
  let resultHTML = '';
  for(let i=0; list.length > i;i++) {
    if(list[i].isComplete) {
      resultHTML += `
      <div class="task">
      <div class="task-done">${list[i].taskContent}</div>
      <div class="button-box">
        <button onclick="toggleComplete('${list[i].id}')"><i class="fa-solid fa-square-check"></i></button>
        <button onclick="deleteTask('${list[i].id}')"><i class="fa-solid fa-eraser"></i></button>
      </div>
      </div>`
    } else {
      //리스트가 추가될 때마다 생성되어야 하는 태그 안에 내용만 바뀌고
    //+버튼을 누를 때 해당 태그가 추가되니까 index.html에 아래 태그 내용을 생략해도 됨
      //   <div class="task">
    //   <div>task</div>
    //   <div>
    //     <button>check</button>
    //     <button>delete</button>
    //   </div>
    // </div>
      //tackList에 객체가 들어갔으니 해당 객체의
      //taskContent key의 value를 넣어주어야 한다
      
      //check button요소 어떻게 가져와서 사용해야 할지
      // 고민하고 찾아봤었는데 여기서 바로
      // <onclick이벤트>를 설정해주면 되는 것이었다.. 
      // addEventListener와는 다른 방법
      // button click event설정 방법 2가지
      // onclick / addEventListener (차이점 있음)
      
      // 버튼이 생기는 순간 onclick이벤트도 같이 생성됨
      resultHTML += `
      <div class="task">
      <div>${list[i].taskContent}</div>
      <div class="button-box">
        <button onclick="toggleComplete('${list[i].id}')"><i class="fa-solid fa-square-check"></i></button>
        <button onclick="deleteTask('${list[i].id}')"><i class="fa-solid fa-eraser"></i></button>
      </div>
      </div>`
    }
  }
  document.getElementById('task-board').innerHTML = resultHTML
}

//함수에 내가 어떤 아이템을 선택했는지 알려줘야 함
//아이템 하나하나를 구별하기 위해 id가 필요함
//  => task객체에 id속성값 부여
function toggleComplete(id) {
  for(let i=0; taskList.length > i; i++) {
    if(taskList[i].id == id) {
      //계속 true 적용 -> 계속 밑줄 적용
      // taskList[i].isComplete = true
      // switch처럼 왔다갔다 하는 값 -> ! 사용
      taskList[i].isComplete = !taskList[i].isComplete
      break;// for문 종료 -> 찾는 순간 종료
    }
  }
  //이 함수를 호출해야 위에 적용한 ui적 요소 적용
  render()
}

function deleteTask(id) {
  for(let i=0; taskList.length > i; i++) {
    // if(deleteList[i].id == id) {
      if(taskList[i].id == id) {
        //선택된 행의 id값과 같은 id값을 가진
        // index에 위치한 taskList 행을 삭제한다
        taskList.splice(i,1)
        break;
        //맨처음에 taskList[i].splice이렇게 작성했을때 에러났는데 
        //이러면 객체에 배열 메소드(splice)를 적용하는 경우이기 때문에
        //말이 안된다
      }
    // }
  }
  filter()
}

// function proceeding() {
//   let proceedingList = []
//   for(let i=0; taskList.length > i;i++) {
//     if(!taskList[i].isComplete) {
//       proceedingList.push(taskList[i])
//     }
//   }
//   taskList = proceedingList
//   render();
// }

// function complete() {
//   let completeList = []
//   for(let i=0; taskList.length > i; i++) {
//     if(taskList[i].isComplete) {
//       completeList.push(taskList[i])
//     }
//   }
//   taskList = completeList
//   render();
// }

//전체 삭제
function deleteAll() {
  if(taskList.length > 0) {
    taskList = [];
    filter();
  }
}

function doneAll() {
  if(taskList.length > 0) {
    for(let i=0; taskList.length > i; i++) {
      taskList[i].isComplete =true
    }
  }
  render();
}

//event로 내가 클릭한 tab정보를 알 수 있음
function filter(event) {
  if(event) {
    mode = event.target.id
    underLine.style.left = event.currentTarget.offsetLeft + 'px' // x좌표
    underLine.style.width = event.currentTarget.offsetWidth + 'px' // width
    underLine.style.top = 
    // event.currentTarget.offsetTop + event.currentTarget.offsetHeight + 'px' // y좌표
    event.target.offsetTop + (event.target.offsetHeight - 4) + "px";
  }

  filterList = []
  //event에 내가 선택한 target / id값만 필요
  // console.log('filter', event.target.id)
  // if(mode == 'all') {
  //   //전체 리스트를 보여준다
  //   render();
  // } 
  
  if(mode == 'ongoing') {
    //진행중인 아이템을 보여준다
    //task.isComplete = false
    for(let i=0; taskList.length > i;i++) {
      if(!taskList[i].isComplete) {
        filterList.push(taskList[i])
      }
    }
  } else if(mode == 'done'){
    //끝나는 케이스
    //task.isComplete = true
    for(let i=0; taskList.length >i; i++) {
      if(taskList[i].isComplete) {
        filterList.push(taskList[i])
      }
    }
  }
  render();
}

function randomIDGenerate() {
  //함수의 결과물이 다른 곳에서 바로 쓰임
  return '_' + Math.random().toString(36).substr(2, 9);
}

//<i class="fa-solid fa-share"></i>

/* <span id="check-button"><i class="fa-solid fa-square-check"></i></span>
<span id="delete-button"><i class="fa-solid fa-trash"></i></span> */