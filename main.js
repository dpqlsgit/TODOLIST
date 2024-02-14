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

addButton.addEventListener('click',addTask)

function addTask() {
  //할일 input에 아무 내용이 없으면 추가되지 않도록 막음
  if(!taskInput.value) {
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
  let resultHTML = '';
  for(let i=0; taskList.length > i;i++) {
    if(taskList[i].isComplete) {
      resultHTML += `<div class="task">
      <div class="task-done">${taskList[i].taskContent}</div>
      <div>
        <button onclick="toggleComplete('${taskList[i].id}')">check</button>
        <button onclick="deleteTask('${taskList[i].id}')">delete</button>
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
      resultHTML += `<div class="task">
      <div>${taskList[i].taskContent}</div>
      <div>
        <button onclick="toggleComplete('${taskList[i].id}')">check</button>
        <button onclick="deleteTask('${taskList[i].id}')">delete</button>
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
    if(taskList[i].id == id) {
      //선택된 행의 id값과 같은 id값을 가진
      // index에 위치한 taskList 행을 삭제한다
      taskList.splice(i,1)
      break;
      //맨처음에 taskList[i].splice이렇게 작성했을때 에러났는데 
      //이러면 객체에 배열 메소드(splice)를 적용하는 경우이기 때문에
      //말이 안된다
    }
  }
  render()
}

function randomIDGenerate() {
  //함수의 결과물이 다른 곳에서 바로 쓰임
  return '_' + Math.random().toString(36).substr(2, 9);
}

//<i class="fa-solid fa-share"></i>

/* <span id="check-button"><i class="fa-solid fa-square-check"></i></span>
<span id="delete-button"><i class="fa-solid fa-trash"></i></span> */