const addTodoButtonOnClickHandle = () => {
    generateTodoObj();
} // 마우스 클릭했을 때

const addTodoOnKeyUpHandle = (event) => {   
    if(event.keyCode === 13) {
        generateTodoObj();
    } // 마우스 엔터쳤을 때
}

const checkedOnChangeHandle = (target) => {
    ToDoListService.getInstance().setCompleStatus(target.value, target.checked);
}

const modifyTodoOnClickHandle = (target) => {
    openModal();
    modifyModal(ToDoListService.getInstance().getTodoById(target.value));
}

const deleteTodoOnClickHandle = (target) => {
    ToDoListService.getInstance().removeTodo(target.value);
}

const generateTodoObj = () => {
    const todoContent = document.querySelector(".todolist-header-items .text-input").value;
    const todoObj = {
        id: 0,
        todoContent: todoContent,
        createDate: DateUtils.toStringByFormatting (new Date()),
        completStatus: false
    };

    ToDoListService.getInstance().addTodo(todoObj);
}

class ToDoListService {
    static #instance = null;

    static getInstance() {
        if(this.#instance === null) {
            this.#instance = new ToDoListService();
        }
        return this.#instance;
    }

    todoList = new Array();
    todoIndex = 1;

    constructor() { // not에 not을 걸었기때문에 true면 ?뒤에껄 실행시키고 그게 아니면 비어있는 배열로 출력함 (삼항연산자)
        this.loadTodoList();
    }
    
    // JSON.parse(제이슨 문자열) -> 제이슨 문자열 -> 객체
    // JSON.stringify(객체) -> 객체 -> 제이슨 문자열

    loadTodoList() {
        this.todoList = !!localStorage.getItem("todoList") ? JSON.parse(localStorage.getItem("todoList")) : new Array();
        this.todoIndex = !!this.todoList[this.todoList.length - 1]?.id ? this.todoList[this.todoList.length - 1].id + 1 : 1;
        //.id 앞에 물음표는 값이 있을지 없을지 모르는데 없으면 뒤에 .id를 참조 안하겠다
    }

    saveLocalStorage() {
        localStorage.setItem("todoList", JSON.stringify(this.todoList));
    }

    getTodoById(id) {
        // console.log(this.todoList);
        // console.log(this.todoList.filter(todo => todo.id === parseInt(id)));
        // console.log(this.todoList.filter(todo => todo.id === parseInt(id))[0]);
        
        return this.todoList.filter(todo => todo.id === parseInt(id))[0];
    }

    addTodo(todoObj) {
        const todo = {
            ...todoObj, // 스프레드라고함 깊은 복사
            id : this.todoIndex
        }

        this.todoList.push(todo);

        this.saveLocalStorage();

        this.updateTodoList();

        this.todoIndex++;
    }

    setCompleStatus(id, status){
        this.todoList.forEach((todo, index) => {
            if(todo.id === parseInt(id)) {
                this.todoList[index].completStatus = status;
            }
        });

        this.saveLocalStorage();
    }

    setTodo(todoObj) {
        for(let i = 0; i < this.todoList.length; i++) {
            if(this.todoList[i].id === todoObj.id) {
                this.todoList[i] = todoObj;
                break;
            }
        }

        this.saveLocalStorage();

        this.updateTodoList();
    }

    removeTodo(id) {
        this.todoList = this.todoList.filter(todo =>{
            return todo.id !== parseInt(id);
        });

        this.saveLocalStorage();
        this.updateTodoList();
    }

    updateTodoList() {
        const todoListMainContainer = document.querySelector(".todolist-main-container");

        todoListMainContainer.innerHTML = this.todoList.map(todo => {
            return`<li class="todolist-items">
            <div class="item-left">
                <input type="checkbox" id="complet-chkbox${todo.id}" class="complet-chkboxs" ${todo.completStatus ? "checked" : ""} value="${todo.id}" onchange="checkedOnChangeHandle(this);">
                <label for="complet-chkbox${todo.id}"></label>
            </div>
            <div class="item-center">
                <pre class="todolist-content">${todo.todoContent}</pre>
            </div>
            <div class="item-right">
                <p class="todolist-date">${todo.createDate}</p>
                <div class="todolist-item-buttons">
                    <button class="btn btn-edit" value="${todo.id}" onclick ="modifyTodoOnClickHandle(this);">수정</button>
                    <button class="btn btn-remove" value="${todo.id}" onclick ="deleteTodoOnClickHandle(this);">삭제</button>
                </div>
            </div>
        </li>
        `;
        }).join("");
    }

}